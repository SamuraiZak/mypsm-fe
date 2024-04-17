import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type {
    LeaveApplicationDetailRequestDTO,
    LeaveCommonDetailsDTO,
    LeaveDeliveryDetailsDTO,
    LeaveEndorserDetailsDTO,
    LeaveEndorsmentDTO,
    LeaveStudyDetailsDTO,
    LeaveUnrecordedDetailsDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class LeaveApplicationServices {
    // ======================================================
    // Add application details
    // ======================================================
    // common leave
    static async addCommonLeave(param: LeaveCommonDetailsDTO) {
        try {
            let url: Input = 'leave/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // delivery leave
    static async addDeliveryLeave(param: LeaveDeliveryDetailsDTO) {
        try {
            let url: Input = 'leave/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // unrecorded leave
    static async addUnrecordedLeave(param: LeaveUnrecordedDetailsDTO) {
        try {
            let url: Input = 'leave/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // study leave
    static async addStudyLeave(param: LeaveStudyDetailsDTO) {
        try {
            let url: Input = 'leave/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // ======================================================
    // Processes
    // ======================================================
    // head of director feedback
    static async addHeadOfDirectorFeedback(
        param: LeaveEndorsmentDTO,
    ) {
        try {
            let url: Input = 'leave/hod_feedback';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // director feedback
    static async addDirectorFeedback(
        param: LeaveEndorsmentDTO,
    ) {
        try {
            let url: Input = 'leave/director_feedback';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // secretary verification
    static async addSecretaryVerification(
        param: LeaveEndorsmentDTO,
    ) {
        try {
            let url: Input = 'leave/secretary_verification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // supporter feedback
    static async addSupporterFeedback(
        param: LeaveEndorsmentDTO,
    ) {
        try {
            let url: Input = 'leave/supporter_feedback';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // approver feedback
    static async addApproverFeedback(
        param: LeaveEndorsmentDTO,
    ) {
        try {
            let url: Input = 'leave/approver_feedback';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // management feedback
    static async addManagementFeedback(
        param: LeaveEndorsmentDTO,
    ) {
        try {
            let url: Input = 'leave/management_feedback';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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

    // add endorser details
    static async addEndorserDetails(
        param: LeaveEndorserDetailsDTO,
    ) {
        try {
            let url: Input = 'leave/endorser';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

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
    

    // get application detail
    static async getApplicationDetail(param: LeaveApplicationDetailRequestDTO) {
        try {
            let url: Input = 'leave/view';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

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
