import http from '$lib/services/core/http.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import {
    NewHireListRequestConvert,
    type NewHireListRequest,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-request.view-model';
import {
    NewHireListResponseConvert,
    type NewHireListResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-response.view-model';
import { type SalaryAndAllowanceListResponse, SalaryAndAllowanceListResponseConvert } from '$lib/view-models/mypsm/salary/salary-and-allowance/salary-and-allowancs-list-response.view-model';


export async function load() {
    showLoadingOverlay.set(true);

    const obj:unknown = {
        "status": 201,
        "message": "Record retrieved successfully.",
        "data": {
            "pageNum": 1,
            "totalData": 1,
            "totalPage": 1,
            "allowances": [
                {
                    "employeeId": "2",
                    "employeeName": "Jon Bovi",
                    "baseSalary": 0,
                    "allowance": 100,
                    "salaryDeduction": 100,
                    "status": "New"
                }
            ]
        }
    }

    const response:JSON = <JSON>obj;

    const data: SalaryAndAllowanceListResponse = SalaryAndAllowanceListResponseConvert.fromJson(
        JSON.stringify(response),
    );
    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            salaryAllowanceResult: data,
        },
    };
}
export async function _nope() {
    showLoadingOverlay.set(true);

    const request: NewHireListRequest = {
        pageNum: 1,
        pageSize: 10,
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
    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            newHireLists: data,
        },
    };
}

export async function _sort() {
    showLoadingOverlay.set(true);

    const request: NewHireListRequest = {
        pageNum: 2,
        pageSize: 10,
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
