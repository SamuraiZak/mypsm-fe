import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { SalaryAllowanceList } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-list.dto"
import type { SalaryMovementFilter } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto"
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let salaryAllowanceList: SalaryAllowanceList[] = [];
    let salaryAllowanceListResponse: CommonResponseDTO = {};
    let currentDate: Date = new Date();

    const salaryAllowanceFilter: SalaryMovementFilter = {
        month: Number(currentDate.getMonth() + 1),
        year: Number(currentDate.getFullYear()),
    }
    if (salaryAllowanceFilter.month !== 1 && salaryAllowanceFilter.month !== 4 && salaryAllowanceFilter.month !== 7 && salaryAllowanceFilter.month !== 10) {
        salaryAllowanceFilter.month = 1;
    }
    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: salaryAllowanceFilter
    }

    if (currentRoleCode === UserRoleConstant.urusSetiaGaji.code) {
        salaryAllowanceListResponse =
            await SalaryServices.getSalaryAllowanceList(param)
        salaryAllowanceList =
            salaryAllowanceListResponse.data?.dataList as SalaryAllowanceList[];
    } else if (currentRoleCode === UserRoleConstant.pengarahKhidmatPengurusan.code) {
        salaryAllowanceListResponse =
            await SalaryServices.getDirectorSalaryAllowanceList(param)
        salaryAllowanceList =
            salaryAllowanceListResponse.data?.dataList as SalaryAllowanceList[];
    }


    return {
        currentRoleCode,
        param,
        salaryAllowanceListResponse,
        salaryAllowanceList,
    }
}

//update salary allowance list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await SalaryServices.getSalaryAllowanceList(param);
    return {
        props: {
            param,
            response,
        },
    };
}