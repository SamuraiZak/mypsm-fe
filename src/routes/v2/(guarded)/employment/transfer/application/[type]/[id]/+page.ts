import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto.js';
import type {
    TransferApplicationPersonalDetailDTO,
    TransferApplicationServiceDetailDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    TransferApplicationAcceptanceLetterDetailSchema,
    TransferApplicationAssignDirectorSchema,
    TransferApplicationAssignPostponeApproverSchema,
    TransferApplicationConfirmationSchema,
    TransferApplicationDirectorSupportSchema,
    TransferApplicationEmployeeDetailSchema,
    TransferApplicationEndorsementSchema,
    TransferApplicationEndorserDetailSchema,
    TransferApplicationMeetingResultSchema,
    TransferApplicationPostponeDetailSchema,
    TransferApplicationPostponeLetterDetailSchema,
    TransferApplicationServiceDetailSchema,
    TransferApplicationTransferDetailSchema,
    TransferApplicationTransferDocumentSchema,
    type TransferApplicationAcceptanceLetterDetailType,
    type TransferApplicationAssignDirectorType,
    type TransferApplicationAssignPostponeApproverType,
    type TransferApplicationConfirmationType,
    type TransferApplicationMeetingResultType,
    type TransferApplicationPostponeDetailType,
    type TransferApplicationTransferDetailType,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, parent }) {
    const { layoutData } = await parent();

    // application id
    const currentApplicationId: number = parseInt(params.id);

    // application type
    const currentApplicationType: string = params.type;

    // ==========================================================
    // FORMS
    // ==========================================================

    // employee detail form
    const employeeDetailForm = await superValidate(
        zod(TransferApplicationEmployeeDetailSchema),
    );

    // service detail form
    const serviceDetailForm = await superValidate(
        zod(TransferApplicationServiceDetailSchema),
    );

    // transfer detail form
    const transferDetailForm = await superValidate(
        zod(TransferApplicationTransferDetailSchema),
    );

    // confirmation form
    const applicationConfirmationForm = await superValidate(
        zod(TransferApplicationConfirmationSchema),
    );

    // assign director form
    const assignDirectorForm = await superValidate(
        zod(TransferApplicationAssignDirectorSchema),
    );

    // directorSupportForm
    const directorSupportForm = await superValidate(
        zod(TransferApplicationDirectorSupportSchema),
    );

    // meeting result form
    const meetingResultForm = await superValidate(
        zod(TransferApplicationMeetingResultSchema),
    );

    // acceptanceLetterDetailForm
    const acceptanceLetterDetailForm = await superValidate(
        zod(TransferApplicationAcceptanceLetterDetailSchema),
    );

    // postponeDetailForm
    const postponeDetailForm = await superValidate(
        zod(TransferApplicationPostponeDetailSchema),
    );

    // AssignPostponeApproverForm
    const assignPostponeApproverForm = await superValidate(
        zod(TransferApplicationAssignPostponeApproverSchema),
    );

    // postponeApprovalForm
    const postponeApprovalForm = await superValidate(
        zod(TransferApplicationEndorsementSchema),
    );

    // postponeLetterDetail
    const postponeLetterDetailForm = await superValidate(
        zod(TransferApplicationPostponeLetterDetailSchema),
    );

    // transferDocument
    const transferDocumentForm = await superValidate(
        zod(TransferApplicationTransferDocumentSchema),
    );

    // endorser detail form
    const endorserDetailForm = await superValidate(
        zod(TransferApplicationEndorserDetailSchema),
    );

    //  Supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(TransferApplicationEndorsementSchema),
    );

    //  approver feedback form
    const approverFeedbackForm = await superValidate(
        zod(TransferApplicationEndorsementSchema),
    );

    // ==========================================================
    // DEFAULT VALUES
    // ==========================================================
    if (currentApplicationId == 0) {
        if (currentApplicationType == 'self') {
            // employee detail
            employeeDetailForm.data = await _getCurrentEmployeeDetails();

            // service detail
            serviceDetailForm.data = await _getCurrentEmployeeServiceDetails();
        }
    }else{
        let tempApplicationDetails:
    }

    // ==========================================================
    // Lookup
    // ==========================================================
    const transferCategoryOption: DropdownDTO[] = [
        {
            name: 'Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah',
            value: 'Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah',
        },
        {
            name: 'Pertukaran Luar Ibu Pejabat/Negeri/Wilayah',
            value: 'Pertukaran Luar Ibu Pejabat/Negeri/Wilayah',
        },
    ];

    const transferReasonOption: DropdownDTO[] = [
        {
            name: 'Mengikut Pasangan',
            value: 'Mengikut Pasangan',
        },
        {
            name: 'Menjaga Ibu/ Bapa yang uzur/sakit',
            value: 'Menjaga Ibu/ Bapa yang uzur/sakit',
        },
        {
            name: 'Kes Kesihatan Kronik Pemohon',
            value: 'Kes Kesihatan Kronik Pemohon',
        },
        {
            name: 'Lain-lain (sila nyatakan)',
            value: 'Lain-lain (sila nyatakan)',
        },
    ];

    const directorFeedbackOption: DropdownDTO[] = [
        {
            name: 'Disokong tanpa pengganti',
            value: 'Disokong tanpa pengganti',
        },
        {
            name: 'Disokong dengan pengganti dihantar serentak',
            value: 'Disokong dengan pengganti dihantar serentak',
        },
        {
            name: 'Disokong dengan pengganti dihantar kemudian',
            value: 'Disokong dengan pengganti dihantar kemudian',
        },
        {
            name: 'Tidak disokong (sila beri ulasan)',
            value: 'Tidak disokong (sila beri ulasan)',
        },
        {
            name: 'Ada tindakan tatatertib (sila berikan senarai laporan)',
            value: 'Ada tindakan tatatertib (sila berikan senarai laporan)',
        },
    ];

    // 3. director dropdown
    const directorDrodpwon: DropdownDTO[] = await _getDirectorDropdown();

    const roleDropdown: DropdownDTO[] = await _getRoleDropdown();

    const placementDropdown: DropdownDTO[] = await _getPlacementDropdown();

    const postponeApproverDropdown: DropdownDTO[] = [];
    const supporterDropdown: DropdownDTO[] = [];
    const approverDropdown: DropdownDTO[] = [];

    return {
        props: {
            currentApplicationId,
            layoutData,
        },
        forms: {
            employeeDetailForm,
            serviceDetailForm,
            transferDetailForm,
            applicationConfirmationForm,
            assignDirectorForm,
            directorSupportForm,
            meetingResultForm,
            acceptanceLetterDetailForm,
            postponeDetailForm,
            assignPostponeApproverForm,
            postponeApprovalForm,
            postponeLetterDetailForm,
            transferDocumentForm,
            endorserDetailForm,
            supporterFeedbackForm,
            approverFeedbackForm,
        },
        lookup: {
            transferCategoryOption,
            transferReasonOption,
            directorFeedbackOption,
            directorDrodpwon,
            roleDropdown,
            postponeApproverDropdown,
            supporterDropdown,
            approverDropdown,
            placementDropdown,
        },
    };
}

export async function _getDirectorDropdown() {
    let directorOption: DropdownDTO[] = [];

    const filter = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
        grade: null,
        role: RoleConstant.pengarahNegeri.code,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 1,
        filter: filter,
    };

    const directorListResponse: CommonResponseDTO =
        await LookupServices.getEndorserDropdown(request);

    const directorList: EmployeeLookupItemDTO[] = directorListResponse.data
        ?.dataList as EmployeeLookupItemDTO[];

    directorOption = LookupHelper.employeeToDropdown(directorList);

    return directorOption;
}

export async function _getRoleDropdown() {
    let roleOption: DropdownDTO[] = [];

    const roleListResponse: CommonResponseDTO =
        await LookupServices.getRoleEnums();

    const roleList: UserRoleDTO[] = roleListResponse.data
        ?.dataList as UserRoleDTO[];

    roleOption = LookupHelper.roleToDropdown(roleList);

    return roleOption;
}

export async function _getPlacementDropdown() {
    let roleOption: DropdownDTO[] = [];

    const roleListResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const roleList: LookupDTO[] = roleListResponse.data
        ?.dataList as LookupDTO[];

    roleOption = LookupHelper.toDropdownDescription(roleList);

    return roleOption;
}

// =====================================================================
// Application flows
// =====================================================================
// 1. get current employee detail
export async function _getCurrentEmployeeDetails() {
    let result: TransferApplicationPersonalDetailDTO = {
        name: 'Tiada Maklumat',
        identityDocumentNumber: 'Tiada Maklumat',
        employeeNumber: 'Tiada Makluamt',
        phone: 'Tiada Maklumat',
        maritalStatus: 'Tiada Maklumat',
        childCount: 1,
        childInSchoolCount: 1,
    };

    const response: CommonResponseDTO =
        await TransferServices.getCurrentEmployeeDetail();

    if (response.status == 'success') {
        result = response.data?.details as TransferApplicationPersonalDetailDTO;
    }

    return result;
}

// 2. get current employee service detail
export async function _getCurrentEmployeeServiceDetails() {
    let result: TransferApplicationServiceDetailDTO = {
        position: 'Tiada Maklumat',
        grade: 'Tiada Maklumat',
        hiringDate: 'Tiada Maklumat',
        officeName: 'Tiada Maklumat',
        officeAddress: 'Tiada Maklumat',
        department: 'Tiada Maklumat',
        servicePeriod: 0,
    };

    const response: CommonResponseDTO =
        await TransferServices.getCurrentEmployeeServiceDetail();

    if (response.status == 'success') {
        result = response.data?.details as TransferApplicationServiceDetailDTO;
    }

    return result;
}

// 3. create application
export async function _applicationDetailSubmit(
    params: TransferApplicationTransferDetailType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationTransferDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addTransferDetail(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// add confirmation
export async function _applicationConfirmationSubmit(
    params: TransferApplicationConfirmationType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationConfirmationSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addApplicationConfirmation(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// assign director
export async function _assignDirectorSubmit(
    params: TransferApplicationAssignDirectorType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationAssignDirectorSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addAssignDirector(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// meetingResult
export async function _meetingResultSubmit(
    params: TransferApplicationMeetingResultType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationMeetingResultSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addMeetingResult(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// acceptanceLetterDetail
export async function _acceptanceLetterDetailSubmit(
    params: TransferApplicationAcceptanceLetterDetailType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationAcceptanceLetterDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addAcceptanceLetterDetail(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// postponeDetail
export async function _postponeDetailSubmit(
    params: TransferApplicationPostponeDetailType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationPostponeDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addPostponeDetail(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// assignPostponeApprover
export async function _assignPostponeApproverSubmit(
    params: TransferApplicationAssignPostponeApproverType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationAssignPostponeApproverSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addAssignPostponeApprover(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

//
