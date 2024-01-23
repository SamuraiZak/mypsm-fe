import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/ptb-dan-kwap.js';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service.js';
import type {
    PensionDetail,
    PensionTableFilter,
    PensionTableResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/list-Pension-Detail.view-model';

export async function load({ params }) {
    const data: PtbAndKwap[] = mockPTBdanKWAP;

    const requestBody: PensionTableFilter = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };
    const response: PensionTableResponse =
        await EmployeeService.getPensionRecord(requestBody);
        const record: PensionDetail[] = response.data.pensionDetails

    return { record };
}
