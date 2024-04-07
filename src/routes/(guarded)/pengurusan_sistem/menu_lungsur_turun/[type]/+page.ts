import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { LookupCategoryConstant } from '$lib/constants/core/lookup-category.constant.js';
import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    LookupCategoryDTO,
    LookupFilterDTO,
} from '$lib/dto/core/lookup/lookup-item.dto';
import type { TableSettingDTO } from '$lib/dto/core/table/table.dto.js';
import {
    LookupCommonSchema,
    LookupDistrictSchema,
    LookupEmploymentStatusSchema,
    LookupGradeSchema,
    LookupMeetingSchema,
    LookupRelationshipSchema,
} from '$lib/schemas/core/lookup.schema.js';
import { LookupManagementServices } from '$lib/services/implementation/core/lookup/lookup-management.services.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const guard: string[] = [UserRoleConstant.admin.code];

export async function load({ params }) {
    // cross check the type
    const currentCategory: LookupCategoryDTO =
        LookupCategoryConstant.list.find(
            (item) => item.name == params.type.replaceAll('_', ' '),
        ) ?? LookupCategoryConstant.city;

    let isFamilyDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // create filter
    const filter: LookupFilterDTO = {
        // common
        id: null,
        code: '',
        description: '',

        // district
        divisionCode: '',

        // meeting
        module: '',
        subModule: '',

        // relationship
        isFamily: false,

        // country
        countryId: '',

        // employment status
        occSectorCode: '',
        occSectorName: '',

        // grade
        ssmCode: '',
        minimumSalary: null,
        maximumSalary: null,
        annualIncrementRate: null,

        // section
        departmentCode: '',
    };

    // creating request parameter
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    // fetch the data
    const response: CommonResponseDTO =
        await LookupManagementServices.getLookupList(
            listParam,
            currentCategory,
        );

    // create common form
    const formCommon = await superValidate(zod(LookupCommonSchema));

    // create District form
    const formDistrict = await superValidate(zod(LookupDistrictSchema));

    // create Meeting form
    const formMeeting = await superValidate(zod(LookupMeetingSchema));

    // create Relationship form
    const formRelationship = await superValidate(zod(LookupRelationshipSchema));

    // create EmploymentStatus form
    const formEmploymentStatus = await superValidate(
        zod(LookupEmploymentStatusSchema),
    );

    // create Grade form
    const formGrade = await superValidate(zod(LookupGradeSchema));

    return {
        props: {
            currentCategory,
            listParam,
            response,
            isFamilyDropdown,
        },
        forms: {
            formCommon,
            formDistrict,
            formMeeting,
            formRelationship,
            formEmploymentStatus,
            formGrade,
        },
    };
}

export async function _submitForm(
    params: object,
    currentCategory: LookupCategoryDTO,
    isNew: boolean,
    tableData: TableSettingDTO,
) {
    let form: any;

    // reset the form data
    switch (currentCategory) {
        case LookupCategoryConstant.district:
            form = await superValidate(params, zod(LookupDistrictSchema));
            break;
        case LookupCategoryConstant.meetingType:
            form = await superValidate(params, zod(LookupMeetingSchema));
            break;
        case LookupCategoryConstant.relationship:
            form = await superValidate(params, zod(LookupMeetingSchema));
            break;
        case LookupCategoryConstant.employmentStatus:
            form = await superValidate(
                params,
                zod(LookupEmploymentStatusSchema),
            );
            break;
        case LookupCategoryConstant.grade:
            form = await superValidate(params, zod(LookupGradeSchema));
            break;

        default:
            form = await superValidate(params, zod(LookupCommonSchema));
            break;
    }

    let newData: CommonResponseDTO = CommonResponseConstant.httpError;
    if (form.valid) {
        let response: CommonResponseDTO = CommonResponseConstant.httpError;
        // creating request parameter
        const listParam: CommonListRequestDTO = {
            pageNum: tableData.param.pageNum,
            pageSize: tableData.param.pageSize,
            orderBy: tableData.param.orderBy,
            orderType: tableData.param.orderType,
            filter: tableData.param.filter,
        };

        if (isNew) {
            response = await LookupManagementServices.add(
                form.data,
                currentCategory,
            );
        } else {
            response = await LookupManagementServices.edit(
                form.data,
                currentCategory,
            );
        }

        if (response.status == 'success') {
            // fetch the data
            newData = await LookupManagementServices.getLookupList(
                tableData.param,
                currentCategory,
            );
        }
        return { response, newData };
    } else {
        const response = CommonResponseConstant.httpError;
        return { response, newData };
    }
}
