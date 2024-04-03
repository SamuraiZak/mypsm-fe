// ===============================================================
// Salary Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { AddNewSalaryMovementConvert, type AddNewSalaryMovement } from '$lib/dto/mypsm/gaji/pergerakan-gaji/add-new-salary-movement.dto';
import { SalaryMovementDirectorApprovalConvert, type SalaryMovementDirectorApproval } from '$lib/dto/mypsm/gaji/pergerakan-gaji/add-salary-movement-director-approval.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class SalaryServices {
    //=========================================
    // pergerakan gaji services
    //=========================================
    //get salary movement list
    static async getSalaryMovementList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'salary/movement/list';

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

    //add new salary movement
    static async addNewSalaryMovement(param: AddNewSalaryMovement) {
        try {
            let url: Input = 'salary/movement/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewSalaryMovementConvert.toJson(param),
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

    //get selected salary movement detail
    static async getSalaryMovementDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/movement/detail';

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

    //get selected salary movement schedule
    static async getSalaryMovementSchedule(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/movement/schedule';

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

    //Pengarah POV: Get salary movement table
    static async getDirectorSalaryMovementList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'salary/movement/approval/list';

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
    //Get salary movement approval
    static async getSalaryMovementApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/movement/approval/detail';

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
    //Pengarah POV: Add approval
    static async addSalaryMovementApproval(param: SalaryMovementDirectorApproval) {
        try {
            let url: Input = 'salary/movement/approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: SalaryMovementDirectorApprovalConvert.toJson(param),
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

    //=========================================
    // gaji elaun services
    //=========================================


    //=========================================
    // gaji akhir
    //=========================================


    //=========================================
    // sijil gaji akhir
    //=========================================
    static async getFinalPayslipList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'salary/final_payslip/list';

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

    //get maklumat kakitangan
    static async getEmployeePersonalDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/final_payslip/employee_detail';

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
    //get maklumat perkhidmatan
    static async getEmployeeServiceDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/final_payslip/service_detail';

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
    //get maklumat gaji
    static async getEmployeeSalaryDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/final_payslip/salary_detail';

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
    //add maklumat gaji
    static async addEmployeeFinalPayslip(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/final_payslip/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
     //get payslip
     static async getFinalpayslip(param: commonIdRequestDTO) {
        try {
            let url: Input = 'salary/final_payslip/slip';

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
