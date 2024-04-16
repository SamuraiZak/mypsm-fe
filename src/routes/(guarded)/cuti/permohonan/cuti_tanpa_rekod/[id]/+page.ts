import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant.js';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type {
    LeaveEndorsementRequestDTO,
    LeaveViewEndorsementDTO,
    LeaveViewUnrecordedDTO,
} from '$lib/dto/mypsm/leave/leave.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    SchemaLeaveEndorsement,
    SchemaUnrecordedLeave,
} from '$lib/schemas/mypsm/leave/leave.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LeaveServices } from '$lib/services/implementation/mypsm/leave/leave.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // get current role code
    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    let userMode: string = 'kakitangan';

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = 'kakitangan';
            break;
        case UserRoleConstant.pengarahBahagian.code:
            userMode = 'pengarah';
            break;
        case UserRoleConstant.pengarahNegeri.code:
            userMode = 'pengarah';
            break;
        case UserRoleConstant.pengarahKhidmatPengurusan.code:
            userMode = 'pengarah-kp';
            break;
        case UserRoleConstant.urusSetiaCuti.code:
            userMode = 'urusetia';
            break;
        case UserRoleConstant.penyokong.code:
            userMode = 'penyokong';
            break;
        case UserRoleConstant.pelulus.code:
            userMode = 'pelulus';
            break;

        default:
            userMode = 'kakitangan';
            break;
    }

    // get current type name
    const currentType: LookupDTO = LeaveTypeConstant.unrecordedLeave;

    // get current application Id
    const currentApplicationId: number = parseInt(params.id);

    // prep leave details request
    let requestBody: LeaveEndorsementRequestDTO = {
        leaveId: currentApplicationId,
    };

    // ==========================================================
    // props
    // ==========================================================

    // get list of half day option
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

    // get list of half type option
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

    // get list of unrecorded leave type
    let unrecordedLeaveTypeList: LookupDTO[] = [];

    const unrecordedLeaveTypeResponse: CommonResponseDTO =
        await LookupServices.getUnrecordedLeaveTypeEnums();

    if (unrecordedLeaveTypeResponse.status == 'success') {
        unrecordedLeaveTypeList = unrecordedLeaveTypeResponse.data
            ?.dataList as LookupDTO[];
    }

    unrecordedLeaveTypeList = unrecordedLeaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const unrecordedLeaveTypeDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProper(unrecordedLeaveTypeList);

    // ==========================================================
    // create forms
    // ==========================================================

    // detail
    const detailForm = await superValidate(zod(SchemaUnrecordedLeave));

    // director feedback
    const directorFeedbackForm = await superValidate(
        zod(SchemaLeaveEndorsement),
    );

    // secretary verification
    const secretaryVerificationForm = await superValidate(
        zod(SchemaLeaveEndorsement),
    );

    // ==========================================================
    // get application details
    // ==========================================================
    let applicationDetails: LeaveViewUnrecordedDTO | null = null;

    const applicationDetailsResponse: CommonResponseDTO =
        await LeaveServices.viewApplicationDetails(requestBody, currentType);

    if (applicationDetailsResponse.status == 'success') {
        applicationDetails = applicationDetailsResponse.data
            ?.details as LeaveViewUnrecordedDTO;

        detailForm.data = applicationDetails;
    }

    // ==========================================================
    // get director feedback
    // ==========================================================
    let directorFeedback: LeaveViewEndorsementDTO | null = null;

    const directorFeedbackResponse: CommonResponseDTO =
        await LeaveServices.viewDirectorFeedback(requestBody, currentType);

    if (directorFeedbackResponse.status == 'success') {
        directorFeedback = directorFeedbackResponse.data
            ?.details as LeaveViewEndorsementDTO;

        // directorFeedbackForm.data = directorFeedback;
    }

    // ==========================================================
    // get director feedback
    // ==========================================================
    let secretaryVerification: LeaveViewEndorsementDTO | null = null;

    const secretaryVerificationResponse: CommonResponseDTO =
        await LeaveServices.viewSecretaryVerification(requestBody, currentType);

    if (secretaryVerificationResponse.status == 'success') {
        secretaryVerification = secretaryVerificationResponse.data
            ?.details as LeaveViewEndorsementDTO;
    }

    return {
        props: {
            userMode,
            currentRoleCode,
            currentType,
            halfDayOptionDropdown,
            halfDayTypeDropdown,
            unrecordedLeaveTypeDropdown,
        },
        details: {
            applicationDetails,
            directorFeedback,
            secretaryVerification,
        },
        forms: {
            detailForm,
            directorFeedbackForm,
            secretaryVerificationForm,
        },
    };
}
