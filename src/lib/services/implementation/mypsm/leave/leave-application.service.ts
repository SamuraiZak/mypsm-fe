import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
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
    static async addHeadOfDirectorFeedback(param: LeaveEndorsmentDTO) {
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
    static async addDirectorFeedback(param: LeaveEndorsmentDTO) {
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
    static async addSecretaryVerification(param: LeaveEndorsmentDTO) {
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
    static async addSupporterFeedback(param: LeaveEndorsmentDTO) {
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
    static async addApproverFeedback(param: LeaveEndorsmentDTO) {
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
    static async addManagementFeedback(param: LeaveEndorsmentDTO) {
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
    static async addEndorserDetails(param: LeaveEndorserDetailsDTO) {
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

    static async uploadDocument(param: string, currentType: LookupDTO) {
        try {
            let url: Input = '';

            switch (currentType.code) {
                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'leave/extended_sick_leave/upload';
                    break;
                case LeaveTypeConstant.studyLeave.code:
                    url = 'leave/extra_course_leave/upload';
                    break;
                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'leave/maternity_leave/upload';
                    break;
                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'leave/maternity_leave/upload';
                    break;
                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'leave/paternity_leave/upload';
                    break;
                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'leave/other_leave/upload';
                    break;
                case LeaveTypeConstant.absenceLeave.code:
                    url = 'leave/other_leave/upload';
                    break;
                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'leave/other_leave/upload';
                    break;
                case LeaveTypeConstant.cancerLeave.code:
                    url = 'leave/other_leave/upload';
                    break;
                case LeaveTypeConstant.tbLeave.code:
                    url = 'leave/other_leave/upload';
                    break;
                case LeaveTypeConstant.hajiLeave.code:
                    url = 'leave/remote_religious_leave/upload';
                    break;
                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'leave/without_pay_leave/upload';
                    break;

                default:
                    url = 'leave/extended_sick_leave/upload';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .put(url, {
                    body: param,
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
}
