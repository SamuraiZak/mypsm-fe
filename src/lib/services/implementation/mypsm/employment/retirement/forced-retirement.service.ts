import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { ForcedRetirementDetailRequestDTO } from '$lib/dto/mypsm/employment/retirement-new/force-retirement.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { ForcedRetirementEndorsement } from '$lib/schemas/mypsm/employment/retirement/forced-retirement.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ForcedRetirementServices {
    // get list of forced retirement
    static async getApplicationList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'employment/retirement/force/list';

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

    // get application detail
    static async getApplicationDetail(param: ForcedRetirementDetailRequestDTO) {
        try {
            let url: Input = 'employment/retirement/force/view';

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

    // add certification
    static async addCertification(param: ForcedRetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/certification';

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

    // add confirmation
    static async addConfirmation(param: ForcedRetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/confirmation';

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

    // get empty form list
    static async getFormList() {
        try {
            let url: Input = 'employment/retirement/force/document_list';

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

    // upload competed form
    static async uploadForms(param: string) {
        try {
            let url: Input = 'employment/retirement/force/upload';

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

    // add approval
    static async addApproval(param: ForcedRetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/documents_certification';

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
