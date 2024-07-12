import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { toasterCommon } from '$lib/helpers/core/french-toast.helper';
import type { AllowanceCeremonyClothingRequestDTO } from '$lib/schemas/v2/mypsm/service-allowance/service-allowance.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ServiceAllowanceServices {
    // get application list
    static async getApplicationList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'service_allowance/list';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterCommon(promiseResponse);
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

    // submit ceremony clothing form
    static async addCeremonyClothingDetail(param: string) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/add';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterCommon(promiseResponse);
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

    static async ceremonyClothingDetailsSubmit(
        param: AllowanceCeremonyClothingRequestDTO,
    ) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/add';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterCommon(promiseResponse);
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
