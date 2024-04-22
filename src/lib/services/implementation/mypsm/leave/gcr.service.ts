import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type {
    GCRAccumulationAddDetailDTO,
    GCRAccumulationDetailRequestDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type {
    GcrEndorsement,
    GcrWithdrawalDetailAdd,
} from '$lib/schemas/mypsm/leave/gcr.schema';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class GCRServices {
    // get accumulation list
    static async getGCRAccumulationList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'leave/gcr/accumulation/list';

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

    // get accumulation application detail
    static async getAccumulationApplicationDetail(
        param: GCRAccumulationDetailRequestDTO,
    ) {
        try {
            let url: Input = 'leave/gcr/accumulation/detail';

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
    static async addAccumulationDetail(param: GCRAccumulationAddDetailDTO) {
        try {
            let url: Input = 'leave/gcr/accumulation/add';

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

    // add section lead feedback
    static async addAccumulationSectionLeadFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/accumulation/lead';

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

    // add director feedback
    static async addAccumulationDirectorFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/accumulation/director';

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

    // add secretary feedback
    static async addAccumulationSecretaryFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/accumulation/secretary';

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

    // =======================================================
    // WITHDRAWAL
    // =======================================================

    // get withdrawal history
    static async getGCRWithdrawalList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'leave/gcr/withdrawal/list';

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

    // get withdrawal application detail
    static async getWithdrawalApplicationDetail(
        param: GCRAccumulationDetailRequestDTO,
    ) {
        try {
            let url: Input = 'leave/gcr/withdrawal/detail';

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

    // add withdrawal detail
    static async addWithdrawalDetail(param: GcrWithdrawalDetailAdd) {
        try {
            let url: Input = 'leave/gcr/withdrawal/add';

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

    // upload withdrawal document
    static async uploadWithdrawalDocument(param: string) {
        try {
            let url: Input = 'leave/gcr/withdrawal/document';

            const promiseResponse: Promise<Response> = http
                .post(url, {
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

    // add director feedback
    static async addWithdrawalDirectorFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/withdrawal/director';

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

    // add secretary feedback
    static async addWithdrawalSecretaryFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/withdrawal/secretary';

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

    // add integrity secretary feedback
    static async addWithdrawalIntegrityFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/withdrawal/secretary';

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

    // add director feedback
    static async addWithdrawalChiefDirectorFeedback(param: GcrEndorsement) {
        try {
            let url: Input = 'leave/gcr/withdrawal/chief_director';

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

    static async getSelfDetail() {
        try {
            let url: Input = 'employee/detail';

            const response: Response = await http.get(url).json();

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
