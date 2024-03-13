// ===============================================================
// Service Allowance Service - Bantuan Pakaian Istiadat
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
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
    ServiceAllowanceDirectorFeedbackConvert,
    type ServiceAllowanceDirectorFeedbackDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-director-feedback.dto';
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
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class ServiceAllowanceBantuanPakaianIstiadatService {
    // get application details
    static async get(param: ServiceAllowanceApplicationDetailRequestDTO) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/view';

            const response: Response = await http
                .post(url, {
                    body: ServiceAllowanceApplicationDetailRequestConvert.toJson(
                        param,
                    ),
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

    //  add new application
    static async add(param: FormData) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/add';

            const response: Response = await http
                .post(url, {
                    body: param,
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

    //  verify application
    static async verify(param: ServiceAllowanceVerificationDTO) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/verification';

            const responsePromise: Promise<Response> = http
                .put(url, {
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
    static async addSupporterApproverDetail(
        param: ServiceAllowanceSuppAppDetailDTO,
    ) {
        try {
            let url: Input =
                'service_allowance/ceremony_clothing/supporter_approver';

            const responsePromise: Promise<Response> = http
                .put(url, {
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

    // add director feedback
    static async directorFeedback(param: ServiceAllowanceDirectorFeedbackDTO) {
        try {
            let url: Input =
                'service_allowance/ceremony_clothing/director_support';

            const responsePromise: Promise<Response> = http
                .put(url, {
                    body: ServiceAllowanceDirectorFeedbackConvert.toJson(param),
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
    static async supporterFeedback(param: ServiceAllowanceSuppFeedbackDTO) {
        try {
            let url: Input =
                'service_allowance/ceremony_clothing/appointed_support';

            const responsePromise: Promise<Response> = http
                .put(url, {
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
    static async approverFeedback(param: ServiceAllowanceApproverFeedbackDTO) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/approval';

            const responsePromise: Promise<Response> = http
                .put(url, {
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
