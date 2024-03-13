// ===============================================================
// Fund Reimbursement Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import type { CourseFundReimbursementApprovalDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-approval.dto';
import type { CourseFundReimbursementUploadDocumentsRequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-document.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class CourseFundReimbursementServices {
    // get list of fund reimbursements
    static async getCourseFundReimbursementList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'course/fund_reimbursement/list';

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

    // get course fund reimbursements details
    static async getCourseFundReimbursementDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'course/fund_reimbursement/get';

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

    // create fund reimbursements record
    static async createCourseFundReimbursement<T>(param: T) {
        try {
            const url: Input = 'course/fund_reimbursement/add';

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

    
    // get employee documents
    static async getCurrentCandidateDocuments(param: commonIdRequestDTO) {
        try {
            const url: Input = 'course/fund_reimbursement/document/get';

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

    // download documents
    static async downloadAttachment(param: string) {
        try {
            const url: Input = param;

            // get the promise response
            const promiseRes = await http.get(url, {
                prefixUrl: '',
                headers: {
                    Accept: 'application/pdf',
                    'Content-type': 'application/pdf',
                },
            });

            if (promiseRes.status == 200) {
                window.open(promiseRes.url);
                return promiseRes.url;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create fund reimbursements employee documents //multipart form
    static async uploadFundReimbursementEmployeeDocument(
        param: CourseFundReimbursementUploadDocumentsRequestDTO,
    ) {
        try {
            const url: Input = 'course/fund_reimbursement/document/add';

            // param.append('key', 'document');
            const params = new FormData();
            params.append('id', param.id.toString());
            // Append each file
            param.documents.forEach((file) => {
                params.append('files', file);
            });

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: params,
                    headers: {
                        Accept: 'multipart/form-data',
                        'Content-type': 'multipart/form-data;',
                    },
                })
                .json();
            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);
            console.log(result);
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


    // get personal detail fund reimbursement details
    static async getCourseFundReimbursementPersonalDetail(
        param: commonIdRequestDTO,
    ) {
        try {
            const url: Input = 'course/fund_reimbursement/personal_detail';

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

    // get service detail fund reimbursement details
    static async getCourseFundReimbursementServiceDetail(
        param: commonIdRequestDTO,
    ) {
        try {
            const url: Input = 'course/fund_reimbursement/employee_detail';

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

    // set secretary approval for fund reimbursement
    static async setCourseFundReimbursementSecretaryApproval(
        param: CourseFundReimbursementApprovalDTO,
    ) {
        try {
            const url: Input =
                'course/fund_reimbursement/secretary_approval/add';

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

    // get secretary approval exam application
    static async getCourseFundReimbursementSecreataryApproval(
        param: commonIdRequestDTO,
    ) {
        try {
            const url: Input =
                'course/fund_reimbursement/secretary_approval/get';

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
}
