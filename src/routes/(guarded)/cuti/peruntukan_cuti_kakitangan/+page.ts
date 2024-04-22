import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import { EmployeeServices } from "$lib/services/implementation/mypsm/shared/employee.service";

export async function load() {
    // prepare empty employee list
    let employeeList: CommonEmployeeDTO[] = [];

    // prepare employee list filter
    const employeeListFilter: CommonFilterDTO = {
        program: 'SEMUA',
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    // prepare employee list request body
    const employeeListRequestBody: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: employeeListFilter,
    };

    // fetch employee list
    const employeeListResponse: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(employeeListRequestBody);

    if (employeeListResponse.status == 'success') {
        employeeList = employeeListResponse.data
            ?.dataList as CommonEmployeeDTO[];
    }

    return {
        props: {
            employeeList,
            employeeListFilter,
            employeeListRequestBody,
            employeeListResponse,
        },
    };
}
