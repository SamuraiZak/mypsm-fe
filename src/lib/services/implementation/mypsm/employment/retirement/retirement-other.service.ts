import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type {
    RetirementOtherAddChosenDTO,
    RetirementOtherChosenAddVerificationDTO,
    RetirementOtherGetChosenListDTO,
    RetirementOtherUpdateList,
    USPRetirementChosenDetailRequestDTO,
} from '$lib/dto/mypsm/employment/retirement/retirement-other.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type {
    RetirementOtherDetail,
    UspRetirementDetail,
    UspRetirementDocumentApproval,
} from '$lib/schemas/mypsm/employment/retirement/retirement-other.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class RetirementOtherServices {
    // get employee list
    static async getEmployeeList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/list_employee';

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

    // add new application
    static async createNewApplication(param: RetirementOtherAddChosenDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/add';

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

    // get chosen list
    static async getChosenList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/chosen_list';

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

    // add new application
    static async updateRetirementDetails(param: UspRetirementDetail) {
        try {
            let url: Input = 'employment/retirement/unspecify/update';

            const promiseResponse: Promise<Response> = http
                .put(url, {
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

    // add verification
    static async addverifications(param: UspRetirementDocumentApproval) {
        try {
            let url: Input =
                'employment/retirement/unspecify/document_certification';

            const promiseResponse: Promise<Response> = http
                .put(url, {
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

    // get application detail
    static async getFullApplicationDetail(
        param: RetirementOtherGetChosenListDTO,
    ) {
        try {
            let url: Input = 'eemployment/retirement/unspecify/view';

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

    // get chosen detail
    static async getChosenDetail(param: USPRetirementChosenDetailRequestDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/single_view';

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
}
