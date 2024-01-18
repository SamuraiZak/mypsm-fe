// ===============================================================
// Service Allowance Module Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import type { AllowanceRecordListRequestViewModel } from "$lib/view-models/mypsm/service-allowance/default/allowance-list-request.view-model";
import { AllowanceRecordListResponseConvert } from "$lib/view-models/mypsm/service-allowance/default/allowance-list-response.view-model";
import { AllowanceEmployeeInfoRequestConvert, type AllowanceEmployeeInfoRequestViewModel } from "$lib/view-models/mypsm/service-allowance/detail/allowance-employee-info-request.view-model";

export class ServiceAllowanceService {

    // get list of allowance record
    static async getAllowanceRecordList(param: AllowanceRecordListRequestViewModel){

        // fetching data
        const response: Response = await http
        .post('service-allowances/record-list', {
            body: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return AllowanceRecordListResponseConvert.fromResponse(response);
    }

    // get allowance record detail
    static async getAllowanceRecordDetails(){

    }

    // get allowance employee info
    static async getAllowanceEmployeeInfo(param: AllowanceEmployeeInfoRequestViewModel){

        // fetching data
        const response: Response = await http
        .post('service-allowances/employee-info', {
            body: AllowanceEmployeeInfoRequestConvert.toJson(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return AllowanceRecordListResponseConvert.fromResponse(response);
    }

    // get allowance application info
    static async getAllowanceApplicationInfo(){

    }

    // add/edit allowance application info
    static async addAllowanceApplicationInfo(){

    }

    // get allowance supporting info
    static async getAllowanceSupportingInfo(){

    }

    // get allowance verification info
    static async getAllowanceVerificationInfo(){

    }

    // add/edit allowance verification info
    static async addAllowanceVerificationInfo(){

    }

    // get allowance supporter and approver info
    static async getAllowanceSupporterAndApproverInfo(){

    }

    // add/edit allowance supporter and approver info
    static async addAllowanceSupporterAndApproverInfo(){
       
    }

    // update allowance supporter and approver info
    static async updateAllowanceSupporterAndApproverInfo(){

    }

    // update allowance supporting result
    static async updateAllowanceSupportingResult(){

    }

    // update allowance approval result
    static async updateAllowanceApprovalResult(){

    }

    // get allowance application result
    static async getAllowanceApplicationResult(){

    }
}