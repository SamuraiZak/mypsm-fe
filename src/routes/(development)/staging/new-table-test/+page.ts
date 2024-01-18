import api from '$lib/services/core/ky.service';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import { EmployeesListResponseConvert, type EmployeesListResponseViewModel } from '$lib/view-models/mypsm/employee/employee-list-response';

export async function load() {
    showLoadingOverlay.set(true);

    const request: EmployeesListRequestViewModel = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'programme',
        orderType: 'asc',
        filter: {
        },
    };

    const employeeList:EmployeesListResponseViewModel = await EmployeeService.getEmployeeList(request);

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            employeeList,
            request,
        },
    };
}
