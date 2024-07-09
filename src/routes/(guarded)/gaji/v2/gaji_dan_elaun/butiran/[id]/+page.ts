import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { SalaryAllowanceList } from '$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-list.dto';
import type { SalaryMovementFilter } from '$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto';
import { SalaryServices } from '$lib/services/implementation/mypsm/gaji/salary.service';

export const load = async () => {
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    let salaryAllowanceList: SalaryAllowanceList[] = [];
    let salaryAllowanceListResponse: CommonResponseDTO = {};
    let currentDate: Date = new Date();

    const salaryAllowanceFilter: SalaryMovementFilter = {
        month: 5,
        year: Number(currentDate.getFullYear()),
    };
    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: salaryAllowanceFilter,
    };

    if (currentRoleCode === UserRoleConstant.urusSetiaGaji.code) {
        salaryAllowanceListResponse =
            await SalaryServices.getSalaryAllowanceList(param);
        salaryAllowanceList = salaryAllowanceListResponse.data
            ?.dataList as SalaryAllowanceList[];
    } else if (
        currentRoleCode === UserRoleConstant.pengarahKhidmatPengurusan.code
    ) {
        salaryAllowanceListResponse =
            await SalaryServices.getDirectorSalaryAllowanceList(param);
        salaryAllowanceList = salaryAllowanceListResponse.data
            ?.dataList as SalaryAllowanceList[];
    }

    return {
        currentRoleCode,
        param,
        salaryAllowanceListResponse,
        salaryAllowanceList,
    };
};
