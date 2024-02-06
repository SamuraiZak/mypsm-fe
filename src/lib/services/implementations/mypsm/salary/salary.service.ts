import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import {
    AddSalaryMovementApprovalRequestDTOConvert,
    type AddSalaryMovementApprovalRequestDTO,
} from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-approval-request.dto';
import { AddSalaryMovementApprovalResponseDTOConvert } from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-approval-response.dto';
import {
    AddSalaryMovementRequestDTOConvert,
    type AddSalaryMovementRequestDTO,
} from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-request.dto';
import {
    AddSalaryMovementResponseDTOConvert,
    type AddSalaryMovementResponseDTO,
} from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-response.dto';
import http from '$lib/services/provider/service-provider.service';

import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import type { CommonApprovalDTO } from '$lib/dto/core/common/common-approval-request.dto';
import {
    AddSalaryDTOConvert,
    type AddSalaryDTO,
} from '$lib/dto/mypsm/salary/final-payslip/add-salary.dto';
import {
    EmployeeFinalSalaryDetailRequestDTOConvert,
    type EmployeeFinalSalaryDetailRequestDTO,
} from '$lib/dto/mypsm/salary/final-payslip/employee-final-salary-detail-request.dto';
import {
    FinalPayslipRequestDTOConvert,
    type FinalPayslipRequestDTO,
} from '$lib/dto/mypsm/salary/final-payslip/final-payslip-request.dto';
import {
    SalaryDetailRequestDTOConvert,
    type SalaryDetailRequestDTO,
} from '$lib/dto/mypsm/salary/final-payslip/salary-detail-request.dto';
import {
    DetailAllowanceRequestConvert,
    type DetailAllowanceRequestDTO,
} from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-request.dto';
import {
    DetailSalaryMovementApprovalRequestDTOConvert,
    type DetailSalaryMovementApprovalRequestDTO,
} from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-approval-request.dto';
import {
    DetailSalaryMovementRequestDTOConvert,
    type DetailSalaryMovementRequestDTO,
} from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-request.dto';
import {
    GetSalaryMovementScheduleRequestDTOConvert,
    type GetSalaryMovementScheduleRequestDTO,
} from '$lib/dto/mypsm/salary/salary-movement/get-salary-movement-schedule-request.dto';
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

    //add salary movement
    static async addSalaryMovement(param: AddSalaryMovementRequestDTO) {
        const response: CommonResponseDTO = await http
            .post('salaries/add-salary-movement', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    //salary movement schedule
    static async getSalaryMovementSchedule(
        param: GetSalaryMovementScheduleRequestDTO,
    ) {
        const response: Response = await http
            .post('salaries/get-salary-movement-schedule', {
                body: GetSalaryMovementScheduleRequestDTOConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    // approval @ pengarah khidmat pengurusan
    static async getSalaryMovementApprovalList(param: CommonListRequestDTO) {
        const response: Response = await http
            .post('salaries/salary-movement-approvals', {
                body: CommonListRequestConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    static async getSalaryMovementApprovalDetail(
        param: DetailSalaryMovementApprovalRequestDTO,
    ) {
        const response: Response = await http
            .post('salaries/get-salary-movement-approval', {
                body: DetailSalaryMovementApprovalRequestDTOConvert.toJson(
                    param,
                ),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    static async addSalaryMovementApproval(
        param: AddSalaryMovementApprovalRequestDTO,
    ) {
        // const response: Response = await http.post('salaries/add-salary-movement', {
        //     body: AddSalaryMovementApprovalRequestDTOConvert.addSalaryMovementApprovalDTOToJson(param)
        // }).json();
        // return AddSalaryMovementApprovalResponseDTOConvert.toAddSalaryMovementApprovalResponseDTO(response)
        const response: CommonResponseDTO = await http
            .post('salaries/add-salary-movement-approval', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    //============================ Salary Allowance

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

    static async getFinalPayslipServiceDetail(
        param: EmployeeFinalSalaryDetailRequestDTO,
    ) {
        const response: Response = await http
            .post('salaries/get-final-salary-service-detail', {
                body: EmployeeFinalSalaryDetailRequestDTOConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    static async getFinalPayslipSalaryDetail(param: SalaryDetailRequestDTO) {
        const response: Response = await http
            .post('salaries/get-final-salary-salary-detail', {
                body: SalaryDetailRequestDTOConvert.toJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    static async createFinalPayslipSalary(param: AddSalaryDTO) {
        const response: Response = await http
            .post('salaries/add-final-salary-salary-detail', {
                body: AddSalaryDTOConvert.addSalaryDTOToJson(param),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

    static async getFinalSalaryPayslip(param: FinalPayslipRequestDTO) {
        const response: Response = await http
            .post('salaries/get-final-salary-final-payslip', {
                body: FinalPayslipRequestDTOConvert.FinalPayslipRequestDTOToJson(
                    param,
                ),
            })
            .json();
        return CommonResponseConvert.fromResponse(response);
    }

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

    static async getSalaryAllowancePengarahList(param: CommonListRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/allowance-approvals';

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
    static async getSalaryAllowanceActing(param: DetailAllowanceRequestDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/get-allowance-acting';

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
    static async getSalaryAllowanceAdjustment(
        param: DetailAllowanceRequestDTO,
    ) {
        try {
            // Change the url here
            const url: Input = 'salaries/get-allowance-adjustment';

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
    static async addSalaryAllowanceAdjustment(
        param: DetailAllowanceRequestDTO,
    ) {
        try {
            // Change the url here
            const url: Input = 'salaries/add-allowance-adjustment';

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
    static async addSalaryAllowanceApproval(param: CommonApprovalDTO) {
        try {
            // Change the url here
            const url: Input = 'salaries/add-allowance-approval';

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
