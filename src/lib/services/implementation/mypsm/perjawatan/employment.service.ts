// ===============================================================
// Employment Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';
import type { CandidateIDRequestBody } from '$lib/services/implementation/mypsm/common/candidate-id-request.view-dto';
import type { CandidatePersonalDetailsRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details-request.dto';
import type { AddApprovalResultRequestBody } from '../common/add-approval-results-request.dto';
import type { CandidateExperienceDetailsRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details-request.dto';
import type { CandidateAcademiceDetailsRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details-request.dto';
import type { CandidateActivityRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-activity-request.dto';
import type { CandidateFamilyDetailsRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details-request.dto';
import type { CandidateDependenciesDetailRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details-request.dto';
import type { CandidateNextOfKinDetailsRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details-request.dto';
import type { DocumentData } from '../common/add-documents-request.dto';
import type { NewHireSecretaryAddUpdateRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-add-update-request.dto';
import type { NewHireSetApproversRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-set-approvers-request.dto';

export class EmploymentServices {
    static async method(param: CommonListRequestDTO) {
        try {
            let url: Input = '';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    static async getNewHireList(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employments/new-hires';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get list of employee's personal details
    static async getCurrentCandidatePersonalDetails(
        param: CandidateIDRequestBody,
    ) {

        try {
            const url: Input = 'employments/get-new-hire-personal-detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee personal details
    static async createCurrentCandidatePersonalDetails(
        param: CandidatePersonalDetailsRequestBody,
    ){
        try {
            const url: Input = 'employments/add-new-hire-personal-detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get list of employee's academic details
    static async getCurrentCandidateAcademic(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-academic';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee academic details
    static async createCurrentCandidateAcademicDetails(
        param: CandidateAcademiceDetailsRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-academic';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get list of employee's experience details
    static async getCurrentCandidateExperience(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-experience';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee academic details
    static async createCurrentCandidateExperienceDetails(
        param: CandidateExperienceDetailsRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-experience';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get list of employee's activity
    static async getCurrentCandidateActivities(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-activity';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee activity details
    static async createCurrentCandidateActivityDetails(
        param: CandidateActivityRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-activity';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get employee family details
    static async getCurrentCandidateFamily(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-family';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee family details
    static async createCurrentCandidateFamilyDetails(
        param: CandidateFamilyDetailsRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-family';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get employee dependencies details
    static async getCurrentCandidateDependencies(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-dependent';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee dependencies details
    static async createCurrentCandidateDependenciesDetails(
        param: CandidateDependenciesDetailRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-dependent';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get employee next of kin details
    static async getCurrentCandidateNextOfKin(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-next-of-kin';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee next of kin details
    static async createCurrentCandidateNextOfKinDetails(
        param: CandidateNextOfKinDetailsRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-next-of-kin';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get employee documents
    static async getCurrentCandidateDocuments(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-document';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee documents
    static async createCurrentCandidateDocuments(
        param: DocumentData,
    ){
          try {
            const url: Input = 'employments/add-new-hire-document';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get new hire get secretary update
    static async getCurrentCandidateSecretaryUpdate(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-secretary-update';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create new hire secretary update
    static async createCurrentCandidateSecretaryUpdate(
        param: NewHireSecretaryAddUpdateRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-secretary-update';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create new hire secretary result
    static async createCurrentCandidateSecretaryApproval(
        param: AddApprovalResultRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-secretary-approval';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  get chosen approvers
    static async getCurrentCandidateSecretaryApproval(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-secretary-approval';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get new hire approvers
    static async getCurrentCandidateApprovers(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-set-supporter-approver';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee set approvers
    static async createCurrentCandidateApprovers(
        param: NewHireSetApproversRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-set-supporter-approver';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  get supporter list of candidates
    static async getSupporterListOfCandidates(
        param: CommonListRequestDTO,
    ){
          try {
            const url: Input = 'employments/new-hire-supporter-approvals';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  get chosen supporter
    static async getCurrentCandidateSupporterApproval(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-supporter-approval';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create supporter approval
    static async createCurrentCandidateSupporterApproval(
        param: AddApprovalResultRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-supporter-approval';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  get approver list of candidates
    static async getApproverListOfCandidates(
        param: CommonListRequestDTO,
    ){
          try {
            const url: Input = 'employments/new-hire-approver-approvals';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  get chosen approver
    static async getCurrentCandidateApproverApproval(
        param: CandidateIDRequestBody,
    ){
          try {
            const url: Input = 'employments/get-new-hire-approver-approval';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create approver approval
    static async createCurrentCandidateApproverApproval(
        param: AddApprovalResultRequestBody,
    ){
          try {
            const url: Input = 'employments/add-new-hire-approver-approval';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}
