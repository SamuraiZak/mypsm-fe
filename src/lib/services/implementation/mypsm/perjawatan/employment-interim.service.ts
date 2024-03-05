import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { Input } from "ky";
import http from '$lib/services/implementation/service-provider.service';
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import { invalidateAll } from "$app/navigation";
import type { AddNewInterimApplicationDetailDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-new-application-detail.dto";
import { EmployeeInterimApplicationDetailRequestDTOConvert, type EmployeeInterimApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto";


export class EmploymentInterimServices {

    //Employees' POV: View Application Table
    static async getEmployeeApplicationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/interim/application/list_employee';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const reponse: Response = await promiseRes;

            const result = CommonResponseConvert.fromResponse(reponse);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //add new tanggung kerja application
    static async addNewInterimApplication(param: AddNewInterimApplicationDetailDTO) {
        try {
            const url: Input = 'employment/interim/application/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);

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
    
    //add new application (second stepper)
    static async getEmployeeNewInterimApplicationDetail(param: EmployeeInterimApplicationDetailRequestDTO) {
        try {
            const url: Input = 'employment/interim/application/employee_details';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EmployeeInterimApplicationDetailRequestDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await promiseRes;

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

    //view application detail (all roles)
    static async getInterimApplicationDetail(param: EmployeeInterimApplicationDetailRequestDTO) {
        try {
            const url: Input = 'employment/interim/application/view';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EmployeeInterimApplicationDetailRequestDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await promiseRes;

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