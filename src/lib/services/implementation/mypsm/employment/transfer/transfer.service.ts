import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type {
    TransferApplicationDetailRequestDTO,
    TransferCommonDetailDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type {
    TransferCommonDetail,
    TransferCommonEndorsement,
    TransferCommonEndorserDetail,
    TransferCommonMeeting,
    TransferCommonPostponeApplication,
    TransferCommonPostponeResult,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class TransferApplicationServices {
    // get history list
    static async getCommonHistory(param: CommonListRequestDTO) {
        try {
            let url: Input = 'employment/forced_transfer/list';

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

    static async getCommonApplicationDetail(
        param: TransferApplicationDetailRequestDTO,
    ) {
        try {
            let url: Input = 'employment/forced_transfer/get';

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

    // add common transfer application
    static async addCommonDetail(param: TransferCommonDetail) {
        try {
            let url: Input = 'employment/forced_transfer/add';

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

    // add common transfer meeting result
    static async addCommonMeeting(param: TransferCommonMeeting) {
        try {
            let url: Input = 'employment/forced_transfer/add_meeting';

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

    // add common transfer postponement application
    static async addCommonPostponeApplication(
        param: TransferCommonPostponeApplication,
    ) {
        try {
            let url: Input = 'employment/forced_transfer/add_postpone';

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

    // add common transfer postpone result
    static async addCommonPostponeResult(param: TransferCommonPostponeResult) {
        try {
            let url: Input = 'employment/forced_transfer/add_postpone_result';

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

    // add common transfer postpone result
    static async addCommonPostponeApproval(param: TransferCommonEndorsement) {
        try {
            let url: Input = 'employment/forced_transfer/add_postpone_result';

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

    // add common transfer postpone result
    static async addCommonEndorserDetail(param: TransferCommonEndorserDetail) {
        try {
            let url: Input = 'employment/forced_transfer/add_endorser';

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

    // add common transfer supporter feedback
    static async addCommonSupporterFeedback(param: TransferCommonEndorsement) {
        try {
            let url: Input =
                'employment/forced_transfer/add_supporter_approval';

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

    // add common transfer supporter feedback
    static async addCommonApproverFeedback(param: TransferCommonEndorsement) {
        try {
            let url: Input =
                'employment/forced_transfer/add_supporter_approval';

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
}
