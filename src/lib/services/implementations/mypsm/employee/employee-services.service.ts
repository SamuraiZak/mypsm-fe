// ===============================================================
// Employee Module Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import type { AddApprovalResultRequestBody } from '$lib/view-models/mypsm/common/add-approval-results-request.model';
import type { DocumentData } from '$lib/view-models/mypsm/common/add-documents-request.model';
import type { CandidateIDRequestBody } from '$lib/view-models/mypsm/common/candidate-id-request.view-model';
import { EmployeesListResponseConvert } from '$lib/view-models/mypsm/employee/employee-list-response';
import type {
    PensionTableFilter,
    PensionTableResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/list-Pension-Detail.view-model';
import type { CandidateActivityRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-request.view-model';
import { type NewHireActivity } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
import type { NewHireApproverTableListRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-approver-table-list-request.model';
import type { NewHireApproverTableListResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-approver-table-list-response.model';
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
import type { NewHireApproverResultResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-approver-result-response.model';
import type { NewHireGetApproversResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-approvers-response.model';
import type { NewHireDocumentsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-document-response.view-model';
import type { NewHireSupporterResultResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-supporter-result-response.model';
import type { NewHireSecretaryAddUpdateRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-add-update-request.model';
import type { NewHireSecretaryApprovalResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-approval-response.model';
import type { NewHireSecretaryUpdateResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-update-response.model';
import type { NewHireSetApproversRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-set-approvers-request.model';
import type { NewHireSupporterTableListRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-supporter-table-list-request.model';
import type { NewHireSupporterTableListResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-supporter-table-list-response.model';
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

    // get employee documents
    static async getCurrentCandidateDocuments(
        param: CandidateIDRequestBody,
    ): Promise<NewHireDocumentsResponse> {
        const response: NewHireDocumentsResponse = await http
            .post(`employments/get-new-hire-document`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee documents
    static async createCurrentCandidateDocuments(
        param: DocumentData,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-document`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get new hire get secretary update
    static async getCurrentCandidateSecretaryUpdate(
        param: CandidateIDRequestBody,
    ): Promise<NewHireSecretaryUpdateResponse> {
        const response: NewHireSecretaryUpdateResponse = await http
            .post(`employments/get-new-hire-secretary-update`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create new hire secretary update
    static async createCurrentCandidateSecretaryUpdate(
        param: NewHireSecretaryAddUpdateRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-secretary-update`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // get new hire approvers
    static async getCurrentCandidateApprovers(
        param: CandidateIDRequestBody,
    ): Promise<NewHireGetApproversResponse> {
        const response: NewHireGetApproversResponse = await http
            .post(`employments/get-new-hire-set-supporter-approver`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create new hire approvers
    static async createCurrentCandidateApprovers(
        param: AddApprovalResultRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-secretary-approval`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    //  get chosen approvers
    static async getCurrentCandidateSecretaryApproval(
        param: CandidateIDRequestBody,
    ): Promise<NewHireSecretaryApprovalResponse> {
        const response: NewHireSecretaryApprovalResponse = await http
            .post(`employments/get-new-hire-secretary-approval`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create employee set approvers
    static async createCurrentCandidateSecretaryApproval(
        param: NewHireSetApproversRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-set-supporter-approver`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    //  get supporter list of candidates
    static async getSupporterListOfCandidates(
        param: NewHireSupporterTableListRequestBody,
    ): Promise<NewHireSupporterTableListResponse> {
        const response: NewHireSupporterTableListResponse = await http
            .post(`employments/new-hire-supporter-approvals`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    //  get chosen supporter
    static async getCurrentCandidateSupporter(
        param: CandidateIDRequestBody,
    ): Promise<NewHireSupporterResultResponse> {
        const response: NewHireSupporterResultResponse = await http
            .post(`employments/get-new-hire-secretary-approval`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create supporter approval
    static async createCurrentCandidateSupporterApproval(
        param: AddApprovalResultRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-secretary-approval`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    //  get approver list of candidates
    static async getApproverListOfCandidates(
        param: NewHireApproverTableListRequestBody,
    ): Promise<NewHireApproverTableListResponse> {
        const response: NewHireApproverTableListResponse = await http
            .post(`employments/new-hire-approver-approvals`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    //  get chosen approver
    static async getCurrentCandidateApprover(
        param: CandidateIDRequestBody,
    ): Promise<NewHireApproverResultResponse> {
        const response: NewHireApproverResultResponse = await http
            .post(`employments/get-new-hire-approver-approval`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // create approver approval
    static async createCurrentCandidateApproverApproval(
        param: AddApprovalResultRequestBody,
    ): Promise<RequestSuccessBody> {
        const response: RequestSuccessBody = await http
            .post(`employments/add-new-hire-secretary-approval`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    //PTB table
    static async getPensionRecord(
        formData: PensionTableFilter,
    ): Promise<PensionTableResponse> {
        const response: PensionTableResponse = await http
            .post(`employments/pension-details`, {
                body: JSON.stringify(formData),
            })
            .json();

        return response;
    }
}
