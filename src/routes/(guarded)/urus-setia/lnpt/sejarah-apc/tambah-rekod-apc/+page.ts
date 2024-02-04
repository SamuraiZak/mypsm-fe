import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/mypsm/common/employee/employee.dto';
import type { ApcEmployeeDTO } from '$lib/dto/mypsm/lnpt/apc/apc-employee.dto';
import { mockLnptApc } from '$lib/mocks/lnpt/lnptApc';
import { EmployeeServices } from '$lib/services/implementations/mypsm/employee/employee.service';
import { LNPTServices } from '$lib/services/implementations/mypsm/lnpt/lnpt.service';
import { loadingState } from '$lib/stores/globalState';

export async function load() {
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            dataType: 2,
        },
    };

    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    const employeeList: CommonEmployeeDTO[] = response.data
        ?.dataList as CommonEmployeeDTO[];

    return {
        props: {
            param,
            employeeList,
            response,
        },
    };
}

export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);

    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    const employeeList: CommonEmployeeDTO[] = response.data
        ?.dataList as CommonEmployeeDTO[];

    loadingState.set(false);

    return {
        props: {
            param,
            employeeList,
            response,
        },
    };
}
