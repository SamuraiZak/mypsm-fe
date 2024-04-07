import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import type { ptbPensionRequestDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/add-ptb-kwap-service-detail.dto';
import type { PTBIDRequestBody } from '$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-employeeid-request.view-dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';




export class PTBKWAPServices {
    

    static async getPTBKWAPListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/pension_detail/list';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

            // parse the json response to object
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
    // ===========================================
    // ============ Personal Detail ==============
    // ===========================================

    static async getPTBKWAPPersonalDetails(param: commonIdRequestDTO) {
        try {
            let url: Input = 'employment/pension_detail/personal_details/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

     // ===========================================
    // ============ Service Detail ==============
    // ===========================================

    static async getPTBKWAPServiceDetails(
        param: PTBIDRequestBody,
    ) {
        try {
            const url: Input = 'employment/pension_detail/services/get';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

            // parse the json response to object
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

     // ===========================================
    // ============ Service Detail ==============
    // ===========================================

    static async getPTBKWAPpensionDetails(
        param: PTBIDRequestBody,
    ) {
        try {
            const url: Input = 'employment/pension_detail/get';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

            // parse the json response to object
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

     // ===========================================
    // ========== Add Service Detail =============
    // ===========================================

    static async addPTBKWAPpensionDetails(
        param: ptbPensionRequestDTO,
    ) {
        try {
            const url: Input = 'employment/pension_detail/add';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
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

    // ===========================================
    // ======== roles Relate Result ==============
    // ===========================================

    static async getPTBKWAPRolesRelated(
        param: PTBIDRequestBody,
    ) {
        try {
            const url: Input = 'employment/pension_detail/roles_relateds/get';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

            // parse the json response to object
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


     // ===========================================
    // ========== edit pension Detail =============
    // ===========================================

    static async editPTBKWAPpensionDetails(
        param: ptbPensionRequestDTO,
    ) {
        try {
            const url: Input = 'employment/pension_detail/edit';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
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

     // ===========================================
    // ======== Support Result ==============
    // ===========================================

    static async getPTBKWAPSupport(
        param: PTBIDRequestBody,
    ) {
        try {
            const url: Input = 'employment/pension_detail/supports/get';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

            // parse the json response to object
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

     // ===========================================
    // ========== add Support Result =============
    // ===========================================

    static async addPTBKWAPSupport(
        param: ptbPensionRequestDTO,
    ) {
        try {
            const url: Input = 'employment/pension_detail/supports/get';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
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

     // ===========================================
    // ======== Approves Result ==============
    // ===========================================

    static async getPTBKWAPApprove(
        param: PTBIDRequestBody,
    ) {
        try {
            const url: Input = 'employment/pension_detail/approves/get';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

            // parse the json response to object
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

    // ===========================================
    // ========== add Approves Result =============
    // ===========================================

    static async addPTBKWAPapprove(
        param: ptbPensionRequestDTO,
    ) {
        try {
            const url: Input = 'employment/pension_detail/approves/edit';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
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
