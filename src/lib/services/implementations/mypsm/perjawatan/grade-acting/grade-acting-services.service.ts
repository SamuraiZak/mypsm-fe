// ===============================================================
// Pemangkuan Module Services
// ===============================================================
import http from '$lib/services/provider/service-provider.service';
import type { ListGradeActingType154Request } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-154-request.view-model';
import type { ListGradeActingType154Response } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-154-response.view-model';
import type { ListGradeActingTypeFlexi41Request } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-flexi41-request.view-model';
import type { ListGradeActingTypeFlexi41Response } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-flexi41-response.view-model';
import type { ListGradeActingTypeMainRequest } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-main-request.view-model';
import type { ListGradeActingTypeMainResponse } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-main-response.view-model';
import type { ListEmployeeListRequest } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-employee-list-request.view-model';
import type { ListEmployeeListResponse } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-employee-list-response.view-model';
import type { ListChosenEmployeeListRequest } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-chosen-employee-list-request.view-model';
import type { ListChosenEmployeeListResponse } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-chosen-employee-list-response.view-model';

export class GradeActingService {

    // Grade 1-54 Table
    static async getActingGrade154Record(
        params: ListGradeActingType154Request,
    ): Promise<ListGradeActingType154Response> {
        const response: ListGradeActingType154Response = await http
            .post(`employments/grade-acting-type-1-54s`, {
                body: JSON.stringify(params),
            })
            .json();

        return response;
    }

    // Grade Flexi 41 Table
    static async getActingGradeFlexi41Record(
        params: ListGradeActingTypeFlexi41Request,
    ): Promise<ListGradeActingTypeFlexi41Response> {
        const response: ListGradeActingTypeFlexi41Response = await http
            .post(`employments/grade-acting-type-flexi-41s`, {
                body: JSON.stringify(params),
            })
            .json();

        return response;
    }

    //Grade Main Table
    static async getActingGradeMainRecord(
        params: ListGradeActingTypeMainRequest,
    ): Promise<ListGradeActingTypeMainResponse> {
        const response: ListGradeActingTypeMainResponse = await http
            .post(`employments/grade-acting-type-mains`, {
                body: JSON.stringify(params),
            })
            .json();

        return response;
    }

    //Employee List Table
    static async getActingEmployeeRecord(
        params: ListEmployeeListRequest,
    ): Promise<ListEmployeeListResponse> {
        const response: ListEmployeeListResponse = await http
            .post(`employments/grade-acting-type-employee-lists`, {
                body: JSON.stringify(params),
            })
            .json();

        return response;
    }

    //Chosen Employee List Table
    static async getActingChosenEmployeeRecord(
        params: ListChosenEmployeeListRequest,
    ): Promise<ListChosenEmployeeListResponse> {
        const response: ListChosenEmployeeListResponse = await http
            .post(`employments/grade-acting-type-chosen-employee-lists`, {
                body: JSON.stringify(params),
            })
            .json();

        return response;
    }
}
