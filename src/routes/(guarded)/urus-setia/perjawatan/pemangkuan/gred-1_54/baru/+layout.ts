import { GradeActingService } from '$lib/services/implementations/mypsm/perjawatan/grade-acting/grade-acting-services.service';
import type { ListEmployeeListRequest } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-employee-list-request.view-model';
import type { ListEmployeeListResponse, EmployeeListResponse } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-employee-list-response.view-model';

export async function load() {
    const employeeRequestBody: ListEmployeeListRequest = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };
    const employeeResponse: ListEmployeeListResponse =
        await GradeActingService.getActingEmployeeRecord(employeeRequestBody);
    const employeeRecord: EmployeeListResponse[] = employeeResponse.data.employeeLists

    return { employeeRecord };
}