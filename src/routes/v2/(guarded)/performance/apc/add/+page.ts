import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';

export async function load() {
    // get list of employee
    let employeeList: CommonEmployeeDTO[] = [];

    const employeeListFilter: CommonFilterDTO = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityDocumentNumber: null,
        scheme: null,
        grade: null,
        position: null,
    };

    const employeeListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: employeeListFilter,
    };

    const employeeListResponse: CommonResponseDTO =
        await AdminServices.getEmployeeList(employeeListRequest);

    if (employeeListResponse.status == 'success') {
        employeeList = employeeListResponse.data
            ?.dataList as CommonEmployeeDTO[];
    }
    return {
        props: {
            employeeList,
            employeeListRequest,
            employeeListResponse,
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
