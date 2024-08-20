import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type { TransferApplicationDetailsRequestDTO } from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { toasterCommon } from '$lib/helpers/core/french-toast.helper';
import type {
    TransferApplicationAcceptanceLetterDetailType,
    TransferApplicationAssignDirectorType,
    TransferApplicationAssignPostponeApproverType,
    TransferApplicationConfirmationType,
    TransferApplicationDirectorSupportType,
    TransferApplicationEndorsementType,
    TransferApplicationEndorserDetailType,
    TransferApplicationMeetingResultType,
    TransferApplicationPostponeDetailType,
    TransferApplicationPostponeLetterDetailType,
    TransferApplicationTransferDetailType,
    TransferApplicationTransferDocumentType,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class TransferServices {
    // get the application list submitted
    static async getApplicationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/self_transfer/list';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get current employee detail
    static async getCurrentEmployeeDetail() {
        try {
            const url: Input = 'employment/self_transfer/get_personal_detail';

            const response: Response = await http.get(url).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get current employee service detail
    static async getCurrentEmployeeServiceDetail() {
        try {
            const url: Input = 'employment/self_transfer/get_service_detail';

            const response: Response = await http.get(url).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add transfer details
    static async addTransferDetail(
        param: TransferApplicationTransferDetailType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/application_details/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add confirmation
    static async addApplicationConfirmation(
        param: TransferApplicationConfirmationType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/application_confirmation/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add assign director
    static async addAssignDirector(
        param: TransferApplicationAssignDirectorType,
    ) {
        try {
            const url: Input = 'employment/self_transfer/assign_director/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    static async addDirectorSupport(
        param: TransferApplicationDirectorSupportType,
    ) {
        try {
            const url: Input = 'employment/self_transfer/director_support/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add meeting result
    static async addMeetingResult(param: TransferApplicationMeetingResultType) {
        try {
            const url: Input = 'employment/self_transfer/meeting_result/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add acceptance letter details
    static async addAcceptanceLetterDetail(
        param: TransferApplicationAcceptanceLetterDetailType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/accept_letter_details/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add postpone detail
    static async addPostponeDetail(
        param: TransferApplicationPostponeDetailType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/postpone_application_details/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add assign postpone approver
    static async addAssignPostponeApprover(
        param: TransferApplicationAssignPostponeApproverType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/assign_postpone_approver/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add postpone approval
    static async addPostponeApproval(
        param: TransferApplicationEndorsementType,
    ) {
        try {
            const url: Input = 'employment/self_transfer/postpone_approval/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add postpone letter detail
    static async addPostponeLetterDetail(
        param: TransferApplicationPostponeLetterDetailType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/postpone_letter_details/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add transfer document
    static async addTransferDocument(
        param: TransferApplicationTransferDocumentType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/transfer_documents/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // add endorser detail
    static async addEndorserDetail(
        param: TransferApplicationEndorserDetailType,
    ) {
        try {
            const url: Input = 'employment/self_transfer/endorser_details/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // supporter feedback
    static async addSupporterFeedback(
        param: TransferApplicationEndorsementType,
    ) {
        try {
            const url: Input =
                'employment/self_transfer/supporter_feedback/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // approver feedback
    static async addApproverFeedback(
        param: TransferApplicationEndorsementType,
    ) {
        try {
            const url: Input = 'employment/self_transfer/approver_feedback/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // approver feedback
    static async getApplicationDetails(
        param: TransferApplicationDetailsRequestDTO,
    ) {
        try {
            const url: Input = 'employment/self_transfer/get';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // approver feedback
    static async getAssignedList(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/self_transfer/assigned_list';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    
}
