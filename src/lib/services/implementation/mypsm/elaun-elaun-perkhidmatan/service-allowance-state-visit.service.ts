// ===============================================================
// Service Allowance State Visit Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import {
    ServiceAllowanceApproverFeedbackConvert,
    type ServiceAllowanceApproverFeedbackDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-app-feedback.dto';
import {
    ServiceAllowanceApplicationDetailRequestConvert,
    type ServiceAllowanceApplicationDetailRequestDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-application-detail-request.dto';
import {
    ServiceAllowanceSuppAppDetailConvert,
    type ServiceAllowanceSuppAppDetailDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-supp-app-detail.dto';
import {
    ServiceAllowanceSuppFeedbackConvert,
    type ServiceAllowanceSuppFeedbackDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-supp-feedback.dto';
import {
    ServiceAllowanceVerificationConvert,
    type ServiceAllowanceVerificationDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-verification.dto';
import {
    ServAllTambangDetailConvert,
    type ServAllTambangDetailDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/tambang/elaun-tambang-add.dto';
import {
    ServiceAllowanceStateVisitDetailConvert,
    type ServiceAllowanceStateVisitDetailDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/tambang/state-visit-application-detail.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class ServiceAllowanceStateVisitServices {
    // get full application detail
    static async getFullApplicationDetail(
        param: ServiceAllowanceApplicationDetailRequestDTO,
    ) {
        try {
            let url: Input = 'service_allowance/state_visit/view';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ServiceAllowanceApplicationDetailRequestConvert.toJson(
                        param,
                    ),
                })
                .json();

            const response: Response = await getPromiseToast(responsePromise);

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

    // create new application
    static async postDetail(param: ServiceAllowanceStateVisitDetailDTO) {
        try {
            let url: Input = 'service_allowance/state_visit/add';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ServiceAllowanceStateVisitDetailConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(responsePromise);

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

    // verify application
    static async postVerification(param: ServiceAllowanceVerificationDTO) {
        try {
            let url: Input = 'service_allowance/state_visit/verification';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ServiceAllowanceVerificationConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(responsePromise);

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

    // add supporter and approver detail
    static async postSuppAppDetail(param: ServiceAllowanceSuppAppDetailDTO) {
        try {
            let url: Input = 'service_allowance/state_visit/supporter_approver';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ServiceAllowanceSuppAppDetailConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(responsePromise);

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

    // add supporter feedback
    static async postSupporterFeedback(param: ServiceAllowanceSuppFeedbackDTO) {
        try {
            let url: Input = 'service_allowance/state_visit/support';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ServiceAllowanceSuppFeedbackConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(responsePromise);

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

    // add approver feedback
    static async postApproverFeedback(
        param: ServiceAllowanceApproverFeedbackDTO,
    ) {
        try {
            let url: Input = 'service_allowance/state_visit/approval';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ServiceAllowanceApproverFeedbackConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(responsePromise);

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
