// ===============================================================
// Employment Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { CandidateAcademicDetailRequestDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details.dto';
import type { Dependency } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details.dto';
import type { Experience } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details.dto';
import type { Family } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details.dto';
import type { NextOfKin } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details.dto';
import type { CandidatePersonalRequestDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto';
import type { NewHireAddCandidateDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-create-candidate.dto';
import type { CandidateNewHireApproverResultDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approver-result.dto';
import type { NewHireSecretaryServiceUpdateRequestDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-service-update.dto';
import type { NewHireSetApproversDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-set-approvers.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class EmploymentServices {
    static async method(param: CommonListRequestDTO) {
        try {
            const url: Input = '';

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

    static async createNewHireCandidate(param: NewHireAddCandidateDTO) {
        try {
            const url: Input = 'employment/new_hire/add';

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

    static async getNewHireList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/new_hire/list';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            // await toast for resolved or rejected state
            // const response: Response = await getPromiseToast(promiseRes);
            const response: Response = await promiseRes;

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

    static async getCandidateListView() {
        try {
            const url: Input = 'employment/new_hire/personal_detail/list';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            // const response: Response = await getPromiseToast(promiseRes);
            const response: Response = await promiseRes;

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

    // get new hire status
    static async getNewHireStatus(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
            const url: Input = 'employment/new_hire/personal_detail/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: CandidatePersonalRequestDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/personal_detail/add';

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
    static async getCurrentCandidateAcademic(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/academic/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: CandidateAcademicDetailRequestDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/academic/add';

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
    static async getCurrentCandidateExperience(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/experience/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
    static async createCurrentCandidateExperienceDetails(param: Experience) {
        try {
            const url: Input = 'employment/new_hire/experience/add';

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
    static async getCurrentCandidateActivities(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/activity/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
    static async createCurrentCandidateActivityDetails(param: CandidateAcademicDetailRequestDTO) {
        try {
            const url: Input = 'employment/new_hire/activity/add';

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
    static async getCurrentCandidateFamily(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/family/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
    static async createCurrentCandidateFamilyDetails(param: Family) {
        try {
            const url: Input = 'employment/new_hire/family/add';

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
    ) {
        try {
            const url: Input = 'employment/new_hire/dependant/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
    static async createCurrentCandidateDependenciesDetails(param: Dependency) {
        try {
            const url: Input = 'employment/new_hire/dependant/add';

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
    static async getCurrentCandidateNextOfKin(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/next_of_kin/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
    static async createCurrentCandidateNextOfKinDetails(param: NextOfKin) {
        try {
            const url: Input = 'employment/new_hire/next_of_kin/add';

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
    static async getCurrentCandidateDocuments(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/document/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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

    // download documents
    static async downloadAttachment(param: string) {
        try {
            const url: Input = param;

            // get the promise response
            const promiseRes = await http.get(url, {
                prefixUrl: '',
                headers: {
                    Accept: 'application/pdf',
                    'Content-type': 'application/pdf',
                },
            });

            if (promiseRes.status == 200) {
                window.open(promiseRes.url);
                return promiseRes.url;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create employee documents //multipart form
    static async createCurrentCandidateDocuments(param: FormData) {
        try {
            const url: Input = 'employment/new_hire/document/add';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                    headers: {
                        'Content-type': '',
                    },
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
    ) {
        try {
            const url: Input = 'employment/new_hire/secretary_update/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: NewHireSecretaryServiceUpdateRequestDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/secretary_update/add';

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

    //  get secretary approval status
    static async getCurrentCandidateSecretaryApproval(
        param: CandidateIDRequestBody,
    ) {
        try {
            const url: Input = 'employment/new_hire/secretary_approval/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: CandidateNewHireApproverResultDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/secretary_approval/add';

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
    static async getCurrentCandidateApprovers(param: CandidateIDRequestBody) {
        try {
            const url: Input =
                'employment/new_hire/set_supporter_approver/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: NewHireSetApproversDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/set_supporter_approver/add';

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
    static async getSupporterListOfCandidates(param: CommonListRequestDTO) {
        try {
            const url: Input =
                'employment/new_hire/get_supporter_approval/list';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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

    //  get supporter approval status
    static async getCurrentCandidateSupporterApproval(
        param: CandidateIDRequestBody,
    ) {
        try {
            const url: Input =
                'employment/new_hire/get_supporter_approval/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: CandidateNewHireApproverResultDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/get_supporter_approval/add';

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
    static async getApproverListOfCandidates(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/new_hire/get_approver_approval/list';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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

    //  get approver approval status
    static async getCurrentCandidateApproverApproval(
        param: CandidateIDRequestBody,
    ) {
        try {
            const url: Input =
                'employment/new_hire/get_approver_approval/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
        param: CandidateNewHireApproverResultDTO,
    ) {
        try {
            const url: Input = 'employment/new_hire/get_approver_approval/add';

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

    // get mypsm ID
    static async getCurrentCandidateMypsmID(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'employment/new_hire/employee/detail';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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
