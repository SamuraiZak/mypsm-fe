import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { NewHireApproverTableListRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-approver-table-list-request.model';
import type {
    NewHire,
    NewHireApproverTableListResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-approver-table-list-response.model';

export async function load() {
    const newHireApproverList: NewHireApproverTableListRequestBody = {
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

    const response: NewHireApproverTableListResponse =
        await EmployeeService.getApproverListOfCandidates(newHireApproverList);

    const newHireLists: NewHire[] = response?.data?.newHires;

    return {
        newHireLists,
    };
}
