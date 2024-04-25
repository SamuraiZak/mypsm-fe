import type { EmployeeListFilterDTO } from '$lib/dto/core/admin/admin.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service';

export async function load() {
    // get list of employee
    let employeeList: CommonEmployeeDTO[] = [];

    const employeeListFilter: EmployeeListFilterDTO = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
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
            employeeListFilter,
            employeeListRequest,
            employeeListResponse,
        },
    };
}
