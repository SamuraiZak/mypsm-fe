import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant.js';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { PermissionConstant } from '$lib/constants/core/permission.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    LeaveCommonDetailsSchema,
    LeaveDeliveryDetailsSchema,
    LeaveEndorsementSchema,
    LeaveEndorserDetailsSchema,
    LeaveReplacementDetailsSchema,
    LeaveStudyDetailsSchema,
    LeaveUnrecordedDetailsSchema,
} from '$lib/schemas/mypsm/leave/leave.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // ================================================================
    // PAGE SETUP
    // ================================================================

    // get the current role code
    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    // get the current role
    const currentRole: UserRoleDTO =
        UserRoleConstant.list.find((item) => item.code == currentRoleCode) ??
        UserRoleConstant.kakitangan;

    // set the default application id
    let currentApplicationId: number = 0;

    // set the actual application id
    if (params.id !== 'baru') {
        currentApplicationId;
    }

    // set the default application type
    let currentApplicationType: LookupDTO = LeaveTypeConstant.unrecordedLeave;

    // set the default permission
    let currentPermission: LookupDTO = PermissionConstant.employee;

    switch (currentRole) {
        case UserRoleConstant.kakitangan:
            currentPermission = PermissionConstant.employee;
            break;
        case UserRoleConstant.urusSetiaCuti:
            currentPermission = PermissionConstant.secretary;
            break;
        case UserRoleConstant.ketuaPengarah:
            currentPermission = PermissionConstant.headOfDirector;
            break;
        case UserRoleConstant.pengarahBahagian:
            currentPermission = PermissionConstant.director;
            break;
        case UserRoleConstant.pengarahNegeri:
            currentPermission = PermissionConstant.director;
            break;
        case UserRoleConstant.penyokong:
            currentPermission = PermissionConstant.supporter;
            break;
        case UserRoleConstant.pelulus:
            currentPermission = PermissionConstant.approver;
            break;
        case UserRoleConstant.pengarahKhidmatPengurusan:
            currentPermission = PermissionConstant.management;
            break;

        default:
            currentPermission = PermissionConstant.employee;
            break;
    }

    // ================================================================
    // ENUMS
    // ================================================================

    // get leave type dropdown
    let leaveTypeDropdown: DropdownDTO[] = [];

    let leaveTypeList: LookupDTO[] = [];

    const leaveTypeResponse: CommonResponseDTO =
        await LookupServices.getLeaveTypeEnums();

    if (leaveTypeResponse.status == 'success') {
        leaveTypeList = leaveTypeResponse.data?.dataList as LookupDTO[];
    } else {
        leaveTypeList = LeaveTypeConstant.list;
    }

    leaveTypeList = leaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    leaveTypeDropdown = LookupHelper.toDropdownProper(leaveTypeList);

    // get half day option dropdown
    const halfDayOptionDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // get halfday type dropdown
    const halfDayTypeDropdown: DropdownDTO[] = [
        {
            value: 'Pagi',
            name: 'Pagi',
        },
        {
            value: 'Petang',
            name: 'Petang',
        },
    ];

    // get unrecorded leave type
    let unrecordedLeaveTypeDropdown: DropdownDTO[] = [];
    let unrecordedLeaveTypeList: LookupDTO[] = [];

    const unrecordedLeaveTypeResponse: CommonResponseDTO =
        await LookupServices.getUnrecordedLeaveTypeEnums();

    if (unrecordedLeaveTypeResponse.status == 'success') {
        unrecordedLeaveTypeList = unrecordedLeaveTypeResponse.data
            ?.dataList as LookupDTO[];
    } else {
        leaveTypeList = LeaveTypeConstant.list;
    }

    unrecordedLeaveTypeList = unrecordedLeaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    unrecordedLeaveTypeDropdown = LookupHelper.toDropdownProper(
        unrecordedLeaveTypeList,
    );

    // get endorser dropdown
    let endorserDropdown: DropdownDTO[] = [];

    const endorserRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: 'TETAP',
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    };
    const endorserResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(endorserRequest);

    if (endorserResponse.status == 'success') {
        endorserDropdown =
            LookupServices.setSelectOptionSupporterAndApproverKP(
                endorserResponse,
            );
    }

    // get endorsement dropdown
    let endorsementDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // ================================================================
    // CREATE FORM
    // ================================================================

    // create leave detail form
    // 1. leave common form
    const leaveCommonForm = await superValidate(zod(LeaveCommonDetailsSchema));

    // 2. leave unrecorded form
    const leaveUnrecordedForm = await superValidate(
        zod(LeaveUnrecordedDetailsSchema),
    );

    // 3. leave delivery form
    const leaveDeliveryForm = await superValidate(
        zod(LeaveDeliveryDetailsSchema),
    );

    // 4. leave study form
    const leaveStudyForm = await superValidate(zod(LeaveStudyDetailsSchema));

    // 5. leave replacement form
    const leaveReplacementForm = await superValidate(
        zod(LeaveReplacementDetailsSchema),
    );

    // create document upload form

    // create head of director feedback form
    const headOfDirectorFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // create director feedback form
    const directorFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // create secretary check form
    let secretaryVerificationForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // create endorser detail form
    const endorserDetailForm = await superValidate(
        zod(LeaveEndorserDetailsSchema),
    );

    // create supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // create approver feedback form
    const approverFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // create pkp form
    const managementFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // ================================================================
    // RETURN VALUE
    // ================================================================
    return {
        props: {
            currentRoleCode,
            currentRole,
            currentPermission,
            currentApplicationId,
            currentApplicationType,
            leaveTypeDropdown,
            halfDayOptionDropdown,
            halfDayTypeDropdown,
            endorserDropdown,
            endorsementDropdown,
        },
        forms:{
            leaveCommonForm,
            leaveUnrecordedForm,
            leaveDeliveryForm,
            leaveStudyForm,
            leaveReplacementForm,
            headOfDirectorFeedbackForm,
            directorFeedbackForm,
            secretaryVerificationForm,
            endorserDetailForm,
            supporterFeedbackForm,
            approverFeedbackForm,
            managementFeedbackForm,
        }
    };
}
