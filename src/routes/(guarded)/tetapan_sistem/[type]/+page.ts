import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    LookupItemDTO,
    LookupTypeDTO,
} from '$lib/dto/core/lookup/lookup-item.dto';
import {
    LookupDepartmentSchema,
    LookupEmploymentStatusSchema,
    LookupGradeSchema,
    LookupPlacementSchema,
    LookupPositionSchema,
    LookupProgramSchema,
    LookupSchemeSchema,
    LookupSectionSchema,
    LookupServiceGroupSchema,
    LookupServiceTypeSchema,
    LookupUnitSchema,
} from '$lib/schemas/core/lookup.schema.js';
import { LookupManagementServices } from '$lib/services/implementation/core/lookup/lookup-management.services.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const guard: string[] = [UserRoleConstant.admin.code];

export async function load({ params }) {
    const currentType: LookupTypeDTO =
        LookupItemConstant.list.find((item) => item.name == params.type) ??
        LookupItemConstant.department;

    const filter: LookupItemDTO = {
        // general
        id: null,
        code: null,
        description: null,
        typeCode: null,
        // employment status
        occSectorCode: null,
        occSectorName: null,
        // grades
        ssmCode: null,
        minimumSalary: null,
        maximumSalary: null,
        annualIncrementRate: null,
        // sections
        departmentCode: null,
        // units
        sectionCode: null,
    };

    // get list
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let lookupList: LookupItemDTO[] = [];

    const response: CommonResponseDTO =
        await LookupManagementServices.filterList(listParam, currentType);

    if (response.status == 'success') {
        lookupList = response.data?.dataList as LookupItemDTO[];
    }

    // create form
    const gradeForm = await superValidate(zod(LookupGradeSchema));

    // department
    const departmentForm = await superValidate(zod(LookupDepartmentSchema));

    // employment status
    const employmentStatusForm = await superValidate(
        zod(LookupEmploymentStatusSchema),
    );

    // placement
    const placementForm = await superValidate(zod(LookupPlacementSchema));

    // position
    const positionForm = await superValidate(zod(LookupPositionSchema));

    // programme
    const programmeForm = await superValidate(zod(LookupProgramSchema));

    // scheme
    const schemeForm = await superValidate(zod(LookupSchemeSchema));

    // section
    const sectionForm = await superValidate(zod(LookupSectionSchema));

    // service
    const serviceGroupForm = await superValidate(zod(LookupServiceGroupSchema));

    // service
    const serviceTypeForm = await superValidate(zod(LookupServiceTypeSchema));

    // unit
    const unitForm = await superValidate(zod(LookupUnitSchema));

    return {
        props: {
            currentType,
            lookupList,
            listParam,
            response,
            gradeForm,
            departmentForm,
            employmentStatusForm,
            placementForm,
            positionForm,
            programmeForm,
            schemeForm,
            sectionForm,
            serviceGroupForm,
            serviceTypeForm,
            unitForm,
        },
    };
}

export async function _updateTable(
    param: CommonListRequestDTO,
    type: LookupTypeDTO,
) {
    const response: CommonResponseDTO =
        await LookupManagementServices.filterList(param, type);

    return {
        props: {
            param,
            response,
        },
    };
}

export async function _submitForm(
    type: LookupTypeDTO,
    formData: LookupItemDTO,
    isNew: boolean,
) {
    let result: CommonResponseDTO = CommonResponseConstant.httpError;

    if (isNew) {
        result = await LookupManagementServices.add(formData, type);
    } else {
        result = await LookupManagementServices.edit(formData, type);
    }

    const currentType: LookupTypeDTO = type;

    const filter: LookupItemDTO = {
        // general
        id: null,
        code: null,
        description: null,
        typeCode: null,
        // employment status
        occSectorCode: null,
        occSectorName: null,
        // grades
        ssmCode: null,
        minimumSalary: null,
        maximumSalary: null,
        annualIncrementRate: null,
        // sections
        departmentCode: null,
        // units
        sectionCode: null,
    };

    // get list
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let lookupList: LookupItemDTO[] = [];

    let response: CommonResponseDTO = await LookupManagementServices.filterList(
        listParam,
        currentType,
    );
    if (response.status == 'success') {
        lookupList = response.data?.dataList as LookupItemDTO[];
    }

    return {
        props: {
            currentType,
            lookupList,
            listParam,
            response,
            result,
        },
    };
}
