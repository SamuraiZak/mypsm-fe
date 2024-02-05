import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert, type CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { AddSalaryMovementRequestDTOConvert ,type AddSalaryMovementRequestDTO } from "$lib/dto/mypsm/salary/salary-movement/add-salary-movement-request.dto";
import { AddSalaryMovementResponseDTOConvert, type AddSalaryMovementResponseDTO } from "$lib/dto/mypsm/salary/salary-movement/add-salary-movement-response.dto";
import { AddSalaryMovementApprovalRequestDTOConvert ,type AddSalaryMovementApprovalRequestDTO } from "$lib/dto/mypsm/salary/salary-movement/add-salary-movement-approval-request.dto";
import  { AddSalaryMovementApprovalResponseDTOConvert } from "$lib/dto/mypsm/salary/salary-movement/add-salary-movement-approval-response.dto";
import http from "$lib/services/provider/service-provider.service";
import { DetailSalaryMovementRequestDTOConvert, type DetailSalaryMovementRequestDTO } from "$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-request.dto";
import { EmployeeFinalSalaryDetailRequestDTOConvert, type EmployeeFinalSalaryDetailRequestDTO } from "$lib/dto/mypsm/salary/final-payslip/employee-final-salary-detail-request.dto";
import { GetSalaryMovementScheduleRequestDTOConvert, type GetSalaryMovementScheduleRequestDTO } from "$lib/dto/mypsm/salary/salary-movement/get-salary-movement-schedule-request.dto";
import { DetailSalaryMovementApprovalRequestDTOConvert, type DetailSalaryMovementApprovalRequestDTO } from "$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-approval-request.dto";

export class SalaryServices {

    // default @ urus setia
    static async getSalaryMovementList(param: CommonListRequestDTO) {
        // fetch data
        const response: Response = await http.post('salaries/salary-movements', {
            body: CommonListRequestConvert.toJson(param)
        }).json();
        // let result : CommonResponseDTO =  CommonResponseConvert.fromResponse(response);
        // let salaryMovementList : SalaryMovementListDTO[] = result.data?.dataList as SalaryMovementListDTO[]
        // return salaryMovementList;
        return CommonResponseConvert.fromResponse(response)
    }

    //detail
    static async getSalaryMovementDetail(param: DetailSalaryMovementRequestDTO){
        const response: Response = await http.post('salaries/get-salary-movement', {
            body: DetailSalaryMovementRequestDTOConvert.toJson(param)
        }).json();
        return CommonResponseConvert.fromResponse(response)
    }

    //add salary movement
    static async addSalaryMovement(param: AddSalaryMovementRequestDTO){
        const response: CommonResponseDTO = await http.post('salaries/add-salary-movement', {
            body: JSON.stringify(param)
        }).json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    //salary movement schedule
    static async getSalaryMovementSchedule(param: GetSalaryMovementScheduleRequestDTO){
        const response: Response = await http.post('salaries/get-salary-movement-schedule', {
            body: GetSalaryMovementScheduleRequestDTOConvert.toJson(param)
        }).json();
        return CommonResponseConvert.fromResponse(response)
    }
    

    // approval @ pengarah khidmat pengurusan
    static async getSalaryMovementApprovalList(param: CommonListRequestDTO){
        const response: Response = await http.post('salaries/salary-movement-approvals', {
            body: CommonListRequestConvert.toJson(param)
        }).json();
        return CommonResponseConvert.fromResponse(response)
    }


    static async getSalaryMovementApprovalDetail(param: DetailSalaryMovementApprovalRequestDTO){
        const response: Response = await http.post('salaries/get-salary-movement-approval', {
            body: DetailSalaryMovementApprovalRequestDTOConvert.toJson(param)
        }).json();
        return CommonResponseConvert.fromResponse(response)
    }

    static async addSalaryMovementApproval(param: AddSalaryMovementApprovalRequestDTO){
        // const response: Response = await http.post('salaries/add-salary-movement', {
        //     body: AddSalaryMovementApprovalRequestDTOConvert.addSalaryMovementApprovalDTOToJson(param)
        // }).json();
        // return AddSalaryMovementApprovalResponseDTOConvert.toAddSalaryMovementApprovalResponseDTO(response)
        const response: CommonResponseDTO = await http.post('salaries/add-salary-movement-approval', {
            body: JSON.stringify(param)
        }).json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }
   
    //============================ Salary Allowance



    // =============================== Final Payslip
    static async getFinalPayslipList(param: CommonListRequestDTO) {
    
        const response: Response = await http.post('salaries/final-salaries', {
            body: CommonListRequestConvert.toJson(param)
        }).json();
        // let result : CommonResponseDTO =  CommonResponseConvert.fromResponse(response);
        // let salaryMovementList : SalaryMovementListDTO[] = result.data?.dataList as SalaryMovementListDTO[]
        // return salaryMovementList;
        return CommonResponseConvert.fromResponse(response)
    }

    static async getPayslipEmployeeDetail(param: EmployeeFinalSalaryDetailRequestDTO){
        const response: Response = await http.post('salaries/get-final-salary-employee-detail', {
            body: EmployeeFinalSalaryDetailRequestDTOConvert.toJson(param)
        }).json();
        return CommonResponseConvert.fromResponse(response)
    }
}