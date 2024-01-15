import http from '$lib/services/core/http.service';
import api from '$lib/services/core/ky.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import {
    NewHireListRequestConvert,
    type NewHireListRequest,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-request.view-model';
import {
    NewHireListResponseConvert,
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
    const response: Response = await api
        .post('api/v1/employments/new-hires', {
            body: JSON.stringify(request),
        })
        .json();

    const newHireLists: NewHireListResponse = response.data.newHires.filter(
        (record) => record.candidateId === '13457',
    );
    const registeredLists: NewHireListResponse = response.data.newHires;

    showLoadingOverlay.set(false);
    return {
        props: {
            registeredLists,
            newHireLists,
        },
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
            body: NewHireListRequestConvert.toJson(request),
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

    showLoadingOverlay.set(false);
    return {
        props: {
            newHireLists: data,
        },
    };
}
