import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { ApcDTO } from '$lib/dto/mypsm/lnpt/apc.dto';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';

const guard: string[] = [UserRoleConstant.urusSetiaLnpt.code];

export async function load() {
    // filter
    const filter: CommonFilterDTO = {
        program: 'SEMUA',
        identityDocumentNumber: null,
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

    // convert to apcdto
    const employeeList: CommonEmployeeDTO[] = response.data
        ?.dataList as CommonEmployeeDTO[];

    return {
        props: {
            param,
            response,
            employeeList,
        },
    };
}

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    return {
        props: {
            param,
            response,
        },
    };
}
