import http from '$lib/services/core/http.service';
import api from '$lib/services/core/ky.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import { EmployeesListResponseConvert, type EmployeesListResponseViewModel } from '$lib/view-models/mypsm/employee/employee-list-response';

export async function load() {
    showLoadingOverlay.set(true);

    const request: EmployeesListRequestViewModel = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
        },
    };
    const response: Response = await api
        .post('api/v1/employees/employees', {
            body: JSON.stringify(request),
        })
        .json();

    const employeeListResponse: EmployeesListResponseViewModel =
        EmployeesListResponseConvert.fromJson(JSON.stringify(response));

    const employeeList = employeeListResponse.data;

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            employeeList,
            request,
        },
    };
}
