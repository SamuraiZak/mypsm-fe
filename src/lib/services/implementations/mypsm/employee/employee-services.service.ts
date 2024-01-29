// ===============================================================
// Employee Module Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import type { AddApprovalResultRequestBody } from '$lib/view-models/mypsm/common/add-approval-results-request.model';
import type { DocumentData } from '$lib/view-models/mypsm/common/add-documents-request.model';
import type { CandidateIDRequestBody } from '$lib/view-models/mypsm/common/candidate-id-request.view-model';
import { EmployeesListResponseConvert } from '$lib/view-models/mypsm/employee/employee-list-response';
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
import type { PensionTableFilter } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-details-request.view-model';
import type { PensionTableResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-details-response.view-model';
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

import type { AddPensionDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-add-pension-detail-request.view-model';
import type { AddPensionDetailResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-add-pension-detail-response.view-model';
import type { DetailPensionDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-request.view-model';
import type { DetailPensionDetailResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-response.view-model';
import type { PensionDetailRolesRelatedRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-role-related-request.model';
import type { PensionDetailRolesRelatedResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-role-related-response.model';
import type { PensionDetailSalaryRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-salary-request.view-model';
import type { PensionDetailSalaryResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-salary-response.view-model';
import type { PensionDetailServiceRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-service-request.view-model';
import type { PensionDetailServiceResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-service-response.view-model';
import type { PensionEditApproveRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-approve-request.model';
import type { PensionEditApproveResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-approve-response.model';
import type { PensionEditRolesRelatedRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-detail-role-related-request.model';
import type { PensionEditRolesRelatedResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-detail-role-related-response.model';
import type { EditPensionDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-pension-detail-request.view-model';
import type { EditPensionDetailResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-pension-detail-response.view-model';
import type { PensionListApproveRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-approve-request.model';
import type { PensionListApproveResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-approve-response.model';
import type { PensionListSupportRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-support-request.model';
import type { PensionListSupportResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-support-response.model';
import type { PensionPersonalDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-request.view-model';
import type { PensionPersonalDetailResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-response.view-model';
import type { PensionEditSupportRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-support-request.model';
import type { PensionEditSupportResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-edit-support-response.model';
import type { CandidateDependenciesDetailRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-request.model';


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
        param: CandidateDependenciesDetailRequestBody,
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
    static async createCurrentCandidateSecretaryApprover(
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

    // ===== //
    // Pension//
    // ===== //

    // Detail Personal Detail
    static async PensionPersonalDetail(
        param: PensionPersonalDetailRequest,
    ): Promise<PensionPersonalDetailResponse> {
        const response: PensionPersonalDetailResponse = await http
            .post(`employments/get-pension-detail-personal-detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // Detail Service
    static async PensionDetailService(
        param: PensionDetailServiceRequest,
    ): Promise<PensionDetailServiceResponse> {
        const response: PensionDetailServiceResponse = await http
            .post(`employments/get-pension-detail-service`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // Detail Salary
    static async PensionDetailSalary(
        param: PensionDetailSalaryRequest,
    ): Promise<PensionDetailSalaryResponse> {
        const response: PensionDetailSalaryResponse = await http
            .post(`employments/get-pension-detail-salary`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // detail Pension Detail
    static async DetailPensionDetail(
        param: DetailPensionDetailRequest,
    ): Promise<DetailPensionDetailResponse> {
        const response: DetailPensionDetailResponse = await http
            .post(`employments/get-pension-detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // add Pension Detail
    static async AddPensionDetail(
        param: AddPensionDetailRequest,
    ): Promise<AddPensionDetailResponse> {
        const response: AddPensionDetailResponse = await http
            .post(`employments/add-pension-detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // edit Pension Detail
    static async EditPensionDetail(
        param: EditPensionDetailRequest,
    ): Promise<EditPensionDetailResponse> {
        const response: EditPensionDetailResponse = await http
            .post(`employments/edit-pension-detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // Details Roles Related
    static async PensionDetailRolesRelated(
        param: PensionDetailRolesRelatedRequest,
    ): Promise<PensionDetailRolesRelatedResponse> {
        const response: PensionDetailRolesRelatedResponse = await http
            .post(`employments/get-pension-detail-roles-related`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // Edit Roles Related
    static async PensionEditRolesRelated(
        param: PensionEditRolesRelatedRequest,
    ): Promise<PensionEditRolesRelatedResponse> {
        const response: PensionEditRolesRelatedResponse = await http
            .post(`employments/edit-pension-detail-roles-related`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // List Approve
    static async PensionListApprove(
        param: PensionListApproveRequest,
    ): Promise<PensionListApproveResponse> {
        const response: PensionListApproveResponse = await http
            .post(`employments/pension-detail-approves`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // Edit Approve
    static async PensionEditApprove(
        param: PensionEditApproveRequest,
    ): Promise<PensionEditApproveResponse> {
        const response: PensionEditApproveResponse = await http
            .post(`employments/edit-pension-detail-approve`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // List Support
    static async PensionListSupport(
        param: PensionListSupportRequest,
    ): Promise<PensionListSupportResponse> {
        const response: PensionListSupportResponse = await http
            .post(`employments/pension-detail-supports`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    // edit Support
    static async PensionEditSupport(
        param: PensionEditSupportRequest,
    ): Promise<PensionEditSupportResponse> {
        const response: PensionEditSupportResponse = await http
            .post(`employments/edit-pension-detail-support`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }
}
