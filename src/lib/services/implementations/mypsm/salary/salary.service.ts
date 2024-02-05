import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import {
    EmployeeFinalSalaryDetailRequestDTOConvert,
    type EmployeeFinalSalaryDetailRequestDTO,
} from '$lib/dto/mypsm/salary/final-payslip/employee-final-salary-detail-request.dto';
import {
    DetailAllowanceRequestConvert,
    type DetailAllowanceRequestDTO,
} from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-request.dto';
import {
    DetailSalaryMovementRequestDTOConvert,
    type DetailSalaryMovementRequestDTO,
} from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-request.dto';
import http from '$lib/services/provider/service-provider.service';
import type { Input } from 'ky';

export class SalaryServices {
    // default @ urus setia
    static async getSalaryMovementList(param: CommonListRequestDTO) {
        // fetch data
        const response: Response = await http
            .post('salaries/salary-movements', {
                body: CommonListRequestConvert.toJson(param),
            })
            .json();
        // let result : CommonResponseDTO =  CommonResponseConvert.fromResponse(response);
        // let salaryMovementList : SalaryMovementListDTO[] = result.data?.dataList as SalaryMovementListDTO[]
        // return salaryMovementList;
        return CommonResponseConvert.fromResponse(response);
    }

    static async getSalaryMovementDetail(
        param: DetailSalaryMovementRequestDTO,
    ) {
        const response: Response = await http
            .post('salaries/get-salary-movement', {
                body: DetailSalaryMovementRequestDTOConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    // static async addSalaryMovement(param: AddSalaryMovementRequestDTO){
    //     const response: Response = await http.post('salaries/add-salary-movement', {
    //         body: AddSalaryMovementRequestDTOConvert.addSalaryMovementDTOToJson(param)
    //     }).json();
    //     return AddSalaryMovementResponseDTOConvert.toAddSalaryMovementResponseDTO(response)
    // }

    //salary movement schedule
    static async getSalaryMovementSchedule(param: CommonListRequestDTO) {
        const response: Response = await http
            .post('salaries/get-salary-movement-schedule', {
                body: CommonListRequestConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    // approval @ pengarah khidmat pengurusan
    static async getSalaryMovementApprovalList(param: CommonListRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'performance/allowances';

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

    static async getSalaryMovementApprovalDetail(param: CommonListRequestDTO) {
        const response: Response = await http
            .post('salaries/get-salary-movement-approval', {
                body: CommonListRequestConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    // static async addSalaryMovement(param: AddSalaryMovementApprovalRequestDTO){
    //     const response: Response = await http.post('salaries/add-salary-movement', {
    //         body: AddSalaryMovementApprovalRequestDTOConvert.addSalaryMovementApprovalDTOToJson(param)
    //     }).json();
    //     return AddSalaryMovementApprovalResponseDTOConvert.toAddSalaryMovementApprovalResponseDTO(response)
    // }

    //============================ Salary Allowance

    static async getSalaryAllowanceList(param: CommonListRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/allowances';

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
    static async getSalaryAllowance(param: DetailAllowanceRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/get-allowance';

            const response: Response = await http
                .post(url, {
                    body: DetailAllowanceRequestConvert.toJson(param),
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
    static async getSalaryAllowanceDetail(param: DetailAllowanceRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/get-allowance-detail';

            const response: Response = await http
                .post(url, {
                    body: DetailAllowanceRequestConvert.toJson(param),
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
    static async getSalaryAllowanceOther(param: DetailAllowanceRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/get-allowance-other';

            const response: Response = await http
                .post(url, {
                    body: DetailAllowanceRequestConvert.toJson(param),
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
    static async getSalaryAllowancePublic(param: DetailAllowanceRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/get-allowance-public';

            const response: Response = await http
                .post(url, {
                    body: DetailAllowanceRequestConvert.toJson(param),
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

    // =============================== Final Payslip
    static async getFinalPayslipList(param: CommonListRequestDTO) {
        const response: Response = await http
            .post('salaries/final-salaries', {
                body: CommonListRequestConvert.toJson(param),
            })
            .json();
        // let result : CommonResponseDTO =  CommonResponseConvert.fromResponse(response);
        // let salaryMovementList : SalaryMovementListDTO[] = result.data?.dataList as SalaryMovementListDTO[]
        // return salaryMovementList;
        return CommonResponseConvert.fromResponse(response);
    }

    static async getPayslipEmployeeDetail(
        param: EmployeeFinalSalaryDetailRequestDTO,
    ) {
        const response: Response = await http
            .post('salaries/get-final-salary-employee-detail', {
                body: EmployeeFinalSalaryDetailRequestDTOConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }
}
