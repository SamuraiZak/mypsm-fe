import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { FinalPayslipList, FinalPayslipListFilter } from "$lib/dto/mypsm/gaji/gaji-akhir/final-payslip-list.dto"
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let finalPayslipList: FinalPayslipList[] = [];
    let finalPayslipListResponse: CommonResponseDTO = {};

    const finalPayslipListFilter: FinalPayslipListFilter = {
        type: 0,
        employeeNumber: "",
        name: "",
        identityCardNumber: "",
        retirementType: "",
        status: "",
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: finalPayslipListFilter,

    }

    if (currentRoleCode == UserRoleConstant.urusSetiaGaji.code) {
        finalPayslipListResponse =
            await SalaryServices.getFinalPayslipList(param);
        finalPayslipList =
            finalPayslipListResponse.data?.dataList as FinalPayslipList[];
    }

    return {
        currentRoleCode,
        finalPayslipList,
        finalPayslipListResponse,
        param,
    }
}

//update employee list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await SalaryServices.getFinalPayslipList(param);
    return {
        props: {
            param,
            response,
        },
    };
}