import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { Input } from "ky";
import http from '$lib/services/implementation/service-provider.service';
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { invalidateAll } from "$app/navigation";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { AddNewPromotionConvert, type AddNewPromotion } from "$lib/dto/mypsm/employment/promotion/add-promotion.dto";


export class EmploymentPromotionServices {
    //table for 154
    static async get154List(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/154s/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get tbk12 promotion table
    static async getTbk12List(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/tbk12s/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get main promotion table
    static async getMainList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/mains/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //add employee for kenaikan pangkat
    static async addNewPromotion (param: AddNewPromotion) {
        try{
            const url: Input = 'employment/promotion/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewPromotionConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getPromiseToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get employee list table (add to new promotion)
    static async getEmployeeList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/employee_lists/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get certification table
    static async getCertificationList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/certifications/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}