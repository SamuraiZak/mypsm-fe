// ===============================================================
// Employee Module Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import { EmployeesListResponseConvert } from "$lib/view-models/mypsm/employee/employee-list-response";

export class EmployeeService {

    // get list of employee
    static async getEmployeeList(param: EmployeesListRequestViewModel){
        const response: Response = await http
        .post('employees/employees', {
            body: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return EmployeesListResponseConvert.fromResponse(response);
    }
}