import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { NewHireData } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-response.view-model';

export const load = async () => {
    const newApplications: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            dataType: 'New',
            identityCard: null,
            staffNo: null,
            staffName: null,
            dateRequest: null,
            dateHire: null,
            status: null,
        },
    };

    const submittedApplications: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            dataType: 'Submitted',
            identityCard: null,
            staffNo: null,
            staffName: null,
            dateRequest: null,
            dateHire: null,
            status: null,
        },
    };

    const response: CommonResponseDTO =
        await EmployeeService.getNewHireList(newApplications);

    const submittedResponse: CommonResponseDTO =
        await await EmployeeService.getNewHireList(submittedApplications);

    const newRecord: NewHireData[] = response.data?.dataList as NewHireData[];
    const submittedRecord: NewHireData[] = submittedResponse.data
        ?.dataList as NewHireData[];

    console.log('Response:', response);

    return {
        newRecord,
        submittedRecord,
    };
};
