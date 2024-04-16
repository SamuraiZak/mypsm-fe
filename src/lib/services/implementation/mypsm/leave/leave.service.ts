import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    LeaveAddEndorsementDTO,
    LeaveAddExtendedSickDTO,
    LeaveAddHalfPayDTO,
    LeaveAddUnrecordedDTO,
    LeaveEndorsementRequestDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class LeaveServices {
    // get leave entitlement list
    static async getEntitlementList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'leave/report/entitlement';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
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

    // get leave application list
    static async getLeaveApplicationList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'leave/application_list';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
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

    static async viewApplicationDetails(
        param: LeaveEndorsementRequestDTO,
        type: LookupDTO,
    ) {
        try {
            let url: Input = '';

            switch (type.code) {
                case LeaveTypeConstant.unrecordedLeave.code:
                    url =
                        'leave/alternate_untracked_leave/get_alternate_untracked_leave';
                    break;

                default:
                    url =
                        'leave/alternate_untracked_leave/get_alternate_untracked_leave';
                    break;
            }

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

    // add director feedback
    static async addDirectorFeedback(
        param: LeaveAddEndorsementDTO,
        type: LookupDTO,
    ) {
        try {
            let url: Input = '';

            switch (type.code) {
                case LeaveTypeConstant.unrecordedLeave.code:
                    url =
                        'leave/alternate_untracked_leave/update_director_supporter';
                    break;

                default:
                    url =
                        'leave/alternate_untracked_leave/update_director_supporter';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // view director feedback
    static async viewDirectorFeedback(
        param: LeaveEndorsementRequestDTO,
        type: LookupDTO,
    ) {
        try {
            let url: Input = '';

            switch (type.code) {
                case LeaveTypeConstant.unrecordedLeave.code:
                    url =
                        'leave/alternate_untracked_leave/get_director_supporter';
                    break;

                default:
                    url =
                        'leave/alternate_untracked_leave/get_director_supporter';
                    break;
            }

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

    // view secretary verification
    static async viewSecretaryVerification(
        param: LeaveEndorsementRequestDTO,
        type: LookupDTO,
    ) {
        try {
            let url: Input = '';

            switch (type.code) {
                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'leave/alternate_untracked_leave/get_verifier_detail';
                    break;

                default:
                    url = 'leave/alternate_untracked_leave/get_verifier_detail';
                    break;
            }

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

    // add unrecorded leave
    static async addUnrecordedLeave(param: LeaveAddUnrecordedDTO) {
        try {
            let url: Input =
                'leave/alternate_untracked_leave/add_alternate_untracked_leave';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // view unrecorded leave details
    static async viewDetailUnrecordedLeave(param: LeaveEndorsementRequestDTO) {
        try {
            let url: Input =
                'leave/alternate_untracked_leave/get_alternate_untracked_leave';

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

    // add extended sick leave
    static async addExtendedSickLeave(param: LeaveAddExtendedSickDTO) {
        try {
            let url: Input = 'leave/extended_sick_leave/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // add half pay leave
    static async addHalfPayLeave(param: LeaveAddHalfPayDTO) {
        try {
            let url: Input = 'leave/half_pay_leave/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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
