import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type {
    ConfirmationApprovalDTO,
    ConfirmationMeetingResultRequestDTO,
} from '$lib/dto/mypsm/employment/confirmation/confirmation_request_response.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ConfirmationServices {
    // get list of confirmation - urus setia perjawatan
    static async getConfirmationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/confirmation/list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // get list of confirmation - state director
    static async getConfirmationStateDirectorList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/confirmation/director/list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // get list of confirmation - integrity director
    static async getConfirmationIntegrityDirectorList(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/confirmation/integrity/list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // get list of confirmation - audit director
    static async getConfirmationAuditDirectorList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/confirmation/audit/list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // get confirmation full detail
    static async getConfirmationFullDetail(param: {applicationId: number, employeeId: number }) {
        try {
            const url: Input = 'employment/confirmation/detail';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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

    // update employment secretary result
    static async createConfirmationEmploymentSecretaryResult(
        param: ConfirmationApprovalDTO,
    ) {
        try {
            const url: Input = 'employment/confirmation/secretary/add';

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

    // update state director result
    static async createConfirmationStateDirectorResult(
        param: ConfirmationApprovalDTO,
    ) {
        try {
            const url: Input = 'employment/confirmation/director/add';

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

    // update integrity director result
    static async createConfirmationIntegrityDirectorResult(
        param: ConfirmationApprovalDTO,
    ) {
        try {
            const url: Input = 'employment/confirmation/integrity/add';

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

    // update audit director result
    static async createConfirmationAuditDirectorResult(
        param: ConfirmationApprovalDTO,
    ) {
        try {
            const url: Input = 'employment/confirmation/audit/add';

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

    // update meeting result
    static async createConfirmationMeetingResult(
        param: ConfirmationMeetingResultRequestDTO,
    ) {
        try {
            const url: Input = 'employment/confirmation/meeting/add';

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
