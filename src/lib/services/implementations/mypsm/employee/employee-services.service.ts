// ===============================================================
// Employee Module Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import { EmployeesListResponseConvert } from '$lib/view-models/mypsm/employee/employee-list-response';
import { type NewHireActivity } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
import type { CandidateAcademicDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-response.model';
import type { CandidateExperienceDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-respone.model';
import type { CandidatePersonalDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model';

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
        formData: object,
    ): Promise<CandidatePersonalDetailsResponse> {
        const response: CandidatePersonalDetailsResponse = await http
            .post(`employments/new-hire-personal-detail/`, {
                body: JSON.stringify(formData),
            })
            .json();

        return response;
    }

    // get list of employee's academic details
    static async getCurrentCandidateAcademic(
        formData: object,
    ): Promise<CandidateAcademicDetailsResponse> {
        const response: CandidateAcademicDetailsResponse = await http
            .post(`employments/new-hire-academic/`, {
                body: JSON.stringify(formData),
            })
            .json();

        return response;
    }

    // get list of employee's experience details
    static async getCurrentCandidateExperience(
        formData: object,
    ): Promise<CandidateExperienceDetailsResponse> {
        const response: CandidateExperienceDetailsResponse = await http
            .post(`employments/new-hire-experience/`, {
                body: JSON.stringify(formData),
            })
            .json();

        return response;
    }

    // get list of employee's activity
    static async getCurrentCandidateActivities(
        formData: object,
    ): Promise<NewHireActivity> {
        const response: NewHireActivity = await http
            .post(`employments/new-hire-academic/`, {
                body: JSON.stringify(formData),
            })
            .json();

        return response;
    }
}
