import http from '$lib/services/provider/service-provider.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import { type NewHireListRequest } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-request.view-model';
import {
    NewHireListResponseConvert,
    type NewHireData,
    type NewHireListResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-response.view-model';

export async function load() {
    showLoadingOverlay.set(true);

    const request: NewHireListRequest = {
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

    const newAddedHireResponse: NewHireListResponse = await http
        .post('employments/new-hires', {
            body: JSON.stringify(request),
        })
        .json();

    const submittedRequest: NewHireListRequest = {
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

    const submittedFormResponse: NewHireListResponse = await http
        .post('employments/new-hires', {
            body: JSON.stringify(submittedRequest),
        })
        .json();

    const newHireLists: NewHireData[] = newAddedHireResponse.data.newHires;

    const submittedFormLists: NewHireData[] =
        submittedFormResponse.data.newHires;

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        submittedFormLists,
        newHireLists,
    };
}

export async function _sort() {
    showLoadingOverlay.set(true);

    const request: NewHireListRequest = {
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
    const response: Response = await http
        .post('http://127.0.0.1:3333/api/v1/employments/new-hires', {
            body: JSON.stringify(request),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            prefixUrl: '',
        })
        .json();

    const data: NewHireListResponse = NewHireListResponseConvert.fromJson(
        JSON.stringify(response),
    );

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            newHireLists: data,
        },
    };
}
