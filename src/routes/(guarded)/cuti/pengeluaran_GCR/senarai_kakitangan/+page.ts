import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type {
    GCRWithdrawalHistoryDTO,
    GCRWithdrawalHistoryFilterDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';

export async function load() {
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    let employeeList: CommonEmployeeDTO[] = [];

    const filter: CommonFilterDTO = {
        program: 'SEMUA',
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    // request body
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    // fetch apc history
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    if (response.status == 'success') {
        employeeList = response.data?.dataList as CommonEmployeeDTO[];
    }

    return {
        props: {
            employeeList,
            param,
            response,
            filter,
            currentRoleCode,
        },
    };
}
