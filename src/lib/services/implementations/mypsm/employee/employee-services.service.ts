// ===============================================================
// Employee Module Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import { EmployeesListResponseConvert } from '$lib/view-models/mypsm/employee/employee-list-response';
import type { CandidateIDRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/candidate-id-request.view-model';
import type { CandidateActivityRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-request.view-model';
import { type NewHireActivity } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
import type { CandidateAcademiceDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-request.model';
import type { CandidateAcademicDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-response.model';
import type { CandidateDependenciesDetailResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-response.model';
import type { CandidateExperienceDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-request.model';
import type { CandidateExperienceDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-respone.model';
import type { CandidateFamilyDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-family-details-request.model';
import type { CandidateFamilyDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-family-details-response.model';
import type { CandidateNextOfKinDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-request.model';
import type { CandidateNextOfKinDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-response.model';
import type { CandidatePersonalDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-request.model';
import type { CandidatePersonalDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model';
import type { RequestSuccessBody } from '$lib/view-models/mypsm/request-success.view-model';

export class EmployeeService {
    // get list of employee
    static async getEmployeeList(param: EmployeesListRequestViewModel) {
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

    // get list of employee's personal details
    static async getCurrentCandidatePersonalDetails(
        param: CandidateIDRequestBody,
    ): Promise<CandidatePersonalDetailsResponse> {
        const response: CandidatePersonalDetailsResponse = await http
            .post(`employments/get-new-hire-personal-detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee personal details
    static async createCurrentCandidatePersonalDetails(
        param: CandidatePersonalDetailsRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-personal-detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get list of employee's academic details
    static async getCurrentCandidateAcademic(
        param: CandidateIDRequestBody,
    ): Promise<CandidateAcademicDetailsResponse> {
        const response: CandidateAcademicDetailsResponse = await http
            .post(`employments/get-new-hire-academic`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee academic details
    static async createCurrentCandidateAcademicDetails(
        param: CandidateAcademiceDetailsRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-academic`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get list of employee's experience details
    static async getCurrentCandidateExperience(
        param: CandidateIDRequestBody,
    ): Promise<CandidateExperienceDetailsResponse> {
        const response: CandidateExperienceDetailsResponse = await http
            .post(`employments/get-new-hire-experience`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee academic details
    static async createCurrentCandidateExperienceDetails(
        param: CandidateExperienceDetailsRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-experience`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get list of employee's activity
    static async getCurrentCandidateActivities(
        param: CandidateIDRequestBody,
    ): Promise<NewHireActivity> {
        const response: NewHireActivity = await http
            .post(`employments/get-new-hire-activity`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee activity details
    static async createCurrentCandidateActivityDetails(
        param: CandidateActivityRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-activity`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get employee family details
    static async getCurrentCandidateFamily(
        param: CandidateIDRequestBody,
    ): Promise<CandidateFamilyDetailsResponse> {
        const response: CandidateFamilyDetailsResponse = await http
            .post(`employments/get-new-hire-family`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee family details
    static async createCurrentCandidateFamilyDetails(
        param: CandidateFamilyDetailsRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-family`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get employee dependencies details
    static async getCurrentCandidateDependencies(
        param: CandidateIDRequestBody,
    ): Promise<CandidateDependenciesDetailResponse> {
        const response: CandidateDependenciesDetailResponse = await http
            .post(`employments/get-new-hire-dependent`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee dependencies details
    static async createCurrentCandidateDependenciesDetails(
        param: CandidateDependenciesDetailResponse,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-dependent`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get employee next of kin details
    static async getCurrentCandidateNextOfKin(
        param: CandidateIDRequestBody,
    ): Promise<CandidateNextOfKinDetailsResponse> {
        const response: CandidateNextOfKinDetailsResponse = await http
            .post(`employments/get-new-hire-next-of-kin`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee next of kin details
    static async createCurrentCandidateNextOfKinDetails(
        param: CandidateNextOfKinDetailsRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-next-of-kin`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }
}
