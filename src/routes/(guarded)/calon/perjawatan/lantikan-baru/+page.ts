import http from '$lib/services/provider/service-provider.service';
import type {
    NewHireData,
    NewHireListResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-response.view-model';

export const load = async () => {
    const getNewApplication = {
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

    const getSubmitted = {
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

    const response: NewHireListResponse = await http
        .post('employments/new-hires', {
            body: JSON.stringify(getNewApplication),
        })
        .json();

    const submittedResponse: NewHireListResponse = await http
        .post('employments/new-hires', {
            body: JSON.stringify(getSubmitted),
        })
        .json();

    const newRecord: NewHireData[] = response.data?.newHires;
    const submittedRecord: NewHireData[] = submittedResponse.data?.newHires;

    return {
        newRecord,
        submittedRecord,
    };
};
