// ===============================================================
// Quarters Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { QuartersAddConfirmationConvert, type QuartersAddConfirmation } from '$lib/dto/mypsm/pinjaman/kuarters/application-confirmation.dto';
import { QuarterCommonApprovalConvert, type QuarterCommonApproval } from '$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto';
import { QuarterDetailsConvert, type QuarterDetails } from '$lib/dto/mypsm/pinjaman/kuarters/quarter-details.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class QuartersServices {
    //get moving in list
    static async getMovingInList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/list';

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

    // apply quarters
    static async addMovingInApplication() {
        try {
            const url: Input = 'quarter/moving_in/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url).json();

            // await toast for resolved or rejected state
            // const response: Response = await getPromiseToast(promiseRes);
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

    //get moving in personal detail
    static async getApplicationPersonalDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/personal_detail';

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
    //get moving in service detail
    static async getApplicationServiceDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/service_detail';

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

    //get moving in partner detail
    static async getApplicationPartnerDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/partner_detail';

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

    //add application confirmation
    static async addApplicationConfirmation(param: QuartersAddConfirmation) {
        try {
            let url: Input = 'quarter/moving_in/confirmation/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuartersAddConfirmationConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get application confirmation
    static async getApplicationConfirmationDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/confirmation/get';

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

    // add quarters document
    static async addUploadDocument(param: string) {
        try {
            let url: Input = 'quarter/moving_in/document/upload';
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get application documents
    static async getApplicationDocuments(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/document/download';

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

    //add application secretary approval
    static async addApplicationSecretaryApproval(param: QuarterCommonApproval) {
        try {
            let url: Input = 'quarter/moving_in/secretary_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get application secretary approval
    static async getApplicationSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/secretary_approval/get';

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

    //add quarter details
    static async addApplicationQuarterDetails(param: QuarterDetails) {
        try {
            let url: Input = 'quarter/moving_in/quarter_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterDetailsConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get quarters detail
    static async getApplicationQuarterDetails(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/quarter_detail/get';

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

    //add application director approval
    static async addApplicationDirectorApproval(param: QuarterCommonApproval) {
        try {
            let url: Input = 'quarter/moving_in/director_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get director approval
    static async getApplicationDirectorApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/director_approval/get';

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
}
