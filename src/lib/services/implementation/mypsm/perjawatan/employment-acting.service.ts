import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { Input } from "ky";
import http from '$lib/services/implementation/service-provider.service';
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { AddChosenActingEmployeeDTOConvert, type AddChosenActingEmployeeDTO } from "$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import { invalidateAll } from "$app/navigation";


export class EmploymentActingServices {
    //table for 154
    static async get154List(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/acting/154s/list';

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

    //table for flexi 41
    static async getFlexi41List(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/acting/flexi41s/list';

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

    //table for gred utama
    static async getMainList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/acting/mains/list';

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

    //employee list for new pemangkuan
    static async getActingEmployeeList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/acting/employee_lists/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const response: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(response);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    
    //add employee for pemangkuan
    static async addChosenActingEmployee (param: AddChosenActingEmployeeDTO) {
        try{
            const url: Input = 'employment/acting/chosen_employee_lists/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddChosenActingEmployeeDTOConvert.toJson(param),
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

    //get chosen employee list (butiran)
    static async getChosenActingEmployeeList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/acting/chosen_employee_lists/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const response: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(response);

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