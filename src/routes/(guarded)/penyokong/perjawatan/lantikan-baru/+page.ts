import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { NewHireSupporterTableListRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-supporter-table-list-request.model';
import type {
    NewHire,
    NewHireSupporterTableListResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-supporter-table-list-response.model';

export async function load() {
    const newHireSupporterList: NewHireSupporterTableListRequestBody = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            identityCard: undefined,
            staffNo: undefined,
            staffName: undefined,
            dateRequest: undefined,
            dateHire: undefined,
            status: undefined,
        },
    };

    const response: NewHireSupporterTableListResponse =
        await EmployeeService.getSupporterListOfCandidates(
            newHireSupporterList,
        );

    const newHireLists: NewHire[] = response?.data?.newHires;

    return {
        newHireLists,
    };
}
