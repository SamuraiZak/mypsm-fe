import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto.js';
import type {
    TransferApplicationDetailsDTO,
    TransferApplicationDetailsRequestDTO,
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
    type TransferApplicationDirectorSupportType,
    type TransferApplicationEmployeeDetailType,
    type TransferApplicationEndorsementType,
    type TransferApplicationEndorserDetailType,
    type TransferApplicationMeetingResultType,
    type TransferApplicationPostponeDetailType,
    type TransferApplicationPostponeLetterDetailType,
    type TransferApplicationServiceDetailType,
    type TransferApplicationTransferDetailType,
    type TransferApplicationTransferDocumentType,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, parent }) {
    const { layoutData } = await parent();

    console.log('loading');

    // get application id from pass parameters
    const currentApplicationId: number = parseInt(params.id);

    // ==========================================================
    // FORMS
    // ==========================================================

    // create employee detail form
    const employeeDetailForm = await superValidate(
        zod(TransferApplicationEmployeeDetailSchema),
    );

    // create service detail form
    const serviceDetailForm = await superValidate(
        zod(TransferApplicationServiceDetailSchema),
    );

    // create transfer detail form
    const transferDetailForm = await superValidate(
        zod(TransferApplicationTransferDetailSchema),
    );

    // create confirmation form
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

    // this is where i fetch the data starts
    let currentApplicationDetails = {} as TransferApplicationDetailsDTO;

    // create a request body to fetch the data
    const tempApplicationDetailRequest: TransferApplicationDetailsRequestDTO = {
        applicationId: currentApplicationId,
    };

    // send a request to fetch the data
    const tempApplicationDetailsResponse: CommonResponseDTO =
        await TransferServices.getApplicationDetails(
            tempApplicationDetailRequest,
        );

    // checks if the response is successful by checking the "status" value in the response body
    if (tempApplicationDetailsResponse.status == 'success') {
        // set the applicationDetails value
        currentApplicationDetails = tempApplicationDetailsResponse.data
            ?.details as TransferApplicationDetailsDTO;

        // assign value employeedetailForm
        employeeDetailForm.data =
            currentApplicationDetails.employeeDetails as TransferApplicationEmployeeDetailType;

        // assign value serviceDetailsForm
        serviceDetailForm.data =
            currentApplicationDetails.serviceDetails as TransferApplicationServiceDetailType;

        // assign value transferDetailForm
        transferDetailForm.data =
            currentApplicationDetails.transferDetails as TransferApplicationTransferDetailType;

        // assign value applicationConfirmationForm
        if (currentApplicationDetails.confirmation) {
            // assign the updated data for "confirmation" form
            applicationConfirmationForm.data =
                currentApplicationDetails.confirmation;
        } else {
            applicationConfirmationForm.data.applicationId =
                currentApplicationId;
        }

        // assign value assignDirector
        if (currentApplicationDetails.assignDirector !== null) {
            assignDirectorForm.data = currentApplicationDetails.assignDirector;
        } else {
            assignDirectorForm.data.applicationId = currentApplicationId;
        }

        // assign value directorSupport
        if (currentApplicationDetails.directorSupport !== null) {
            directorSupportForm.data =
                currentApplicationDetails.directorSupport;
        } else {
            directorSupportForm.data.applicationId = currentApplicationId;
        }

        // assign value meetingResult
        if (currentApplicationDetails.meetingResult !== null) {
            meetingResultForm.data = currentApplicationDetails.meetingResult;
        } else {
            meetingResultForm.data.applicationId = currentApplicationId;
        }

        // assign value acceptanceLetterDetails
        if (currentApplicationDetails.acceptanceLetterDetails !== null) {
            acceptanceLetterDetailForm.data =
                currentApplicationDetails.acceptanceLetterDetails;
        } else {
            acceptanceLetterDetailForm.data.applicationId =
                currentApplicationId;
        }

        // assign value postponeDetail
        if (currentApplicationDetails.postponeDetails !== null) {
            postponeDetailForm.data = currentApplicationDetails.postponeDetails;
        } else {
            postponeDetailForm.data.applicationId = currentApplicationId;
        }

        // assign value postponeLetterDetail
        if (currentApplicationDetails.postponeLetterDetails !== null) {
            postponeLetterDetailForm.data =
                currentApplicationDetails.postponeLetterDetails;
        } else {
            postponeLetterDetailForm.data.applicationId = currentApplicationId;
        }

        // assign value postponeApproverDetail
        if (currentApplicationDetails.assignPostponeApprover !== null) {
            assignPostponeApproverForm.data =
                currentApplicationDetails.assignPostponeApprover;
        } else {
            assignPostponeApproverForm.data.applicationId =
                currentApplicationId;
        }

        // assign value postponeApproval
        if (currentApplicationDetails.postponeApproval !== null) {
            postponeApprovalForm.data =
                currentApplicationDetails.postponeApproval;
        } else {
            postponeApprovalForm.data.applicationId = currentApplicationId;
        }

        // assign value postponeLetterDetail
        if (currentApplicationDetails.postponeLetterDetails !== null) {
            postponeLetterDetailForm.data =
                currentApplicationDetails.postponeLetterDetails;
        } else {
            postponeLetterDetailForm.data.applicationId = currentApplicationId;
        }

        // assign value assignEndorser
        if (currentApplicationDetails.assignEndorser !== null) {
            endorserDetailForm.data = currentApplicationDetails.assignEndorser;
        } else {
            endorserDetailForm.data.applicationId = currentApplicationId;
        }

        // assign value support
        if (currentApplicationDetails.support !== null) {
            supporterFeedbackForm.data = currentApplicationDetails.support;
        } else {
            supporterFeedbackForm.data.applicationId = currentApplicationId;
        }

        // assign value approval
        if (currentApplicationDetails.approval !== null) {
            approverFeedbackForm.data = currentApplicationDetails.approval;
        } else {
            approverFeedbackForm.data.applicationId = currentApplicationId;
        }
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
            currentApplicationDetails,
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

export async function _getEndorserDropdown(roleCode: string) {
    let options: DropdownDTO[] = [];

    const filter = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
        grade: null,
        role: roleCode,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 3000,
        orderBy: 'name',
        orderType: 0,
        filter: filter,
    };

    const response: CommonResponseDTO =
        await LookupServices.getEndorserDropdown(request);

    const dataList: EmployeeLookupItemDTO[] = response.data
        ?.dataList as EmployeeLookupItemDTO[];

    options = LookupHelper.employeeToDropdown(dataList);

    return options;
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

        return response;
    } else {
        return CommonResponseConstant.httpError;
    }
}

// add confirmation
export const _applicationConfirmationSubmit = async (
    params: TransferApplicationConfirmationType,
) => {
    const form = await superValidate(
        params,
        zod(TransferApplicationConfirmationSchema),
    );

    if (form.valid) {
        const response: CommonResponseDTO =
            await TransferServices.addApplicationConfirmation(form.data);
        console.log('submitted');
        return response;
    } else {
        return CommonResponseConstant.httpError;
    }
};

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

// directorSupport
export async function _directorSupportSubmit(
    params: TransferApplicationDirectorSupportType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationDirectorSupportSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addDirectorSupport(form.data);

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

// postponeApproval
export async function _postponeApprovalSubmit(
    params: TransferApplicationEndorsementType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationEndorsementSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addPostponeApproval(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// postponeLetterDetail
export async function _postponeLetterDetailSubmit(
    params: TransferApplicationPostponeLetterDetailType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationPostponeLetterDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addPostponeLetterDetail(
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

// transferDocument
export async function _transferDocumentSubmit(
    params: TransferApplicationTransferDocumentType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationTransferDocumentSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addTransferDocument(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// endorserDetail
export async function _endorserDetailSubmit(
    params: TransferApplicationEndorserDetailType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationEndorserDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addEndorserDetail(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// supporterFeedback
export async function _supporterFeedbackSubmit(
    params: TransferApplicationEndorsementType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationEndorsementSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addSupporterFeedback(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// approverFeedback
export async function _approverFeedbackSubmit(
    params: TransferApplicationEndorsementType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationEndorsementSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addApproverFeedback(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}
