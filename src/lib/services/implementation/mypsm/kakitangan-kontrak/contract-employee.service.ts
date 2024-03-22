// ===============================================================
// Contract Employee Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CandidateIDRequestBodyConvert, type CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { AddNewContractEmployeeAcademicDTOConvert, type AddNewContractEmployeeAcademicDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto';
import { AddNewContractEmployeeActivityDTOConvert, type AddNewContractEmployeeActivityDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto';
import { AddNewContractEmployeeDependencyDTOConvert, type AddNewContractEmployeeDependencyDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto';
import { AddNewContractEmployeeExperienceDTOConvert, type AddNewContractEmployeeExperienceDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto';
import { AddContractNextOfKinDTOConvert, type AddContractNextOfKinDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-next-of-kin.dto';
import { AddContractApproverSupporterDTOConvert, type AddContractApproverSupporterDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-supproter-approver.dto';
import { AddNewContractEmployeeDTOConvert, type AddNewContractEmployeeDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-new-contract-employee.dto';
import { EditNewContractEmployeeDetailDTOConvert, type EditNewContractEmployeeDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto';
import { RenewContractAddPerfomanceConvert, type RenewContractAddPerfomance } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-performance.dto';
import { RenewContractAddDTOConvert, type RenewContractAddDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-add.dto';
import { EditContractDetailSecretaryDTOConvert, type EditContractDetailSecretaryDTO } from '$lib/dto/mypsm/kakitangan-kontrak/update-contract-detail-secretary.dto';
import { ContractCommonRoleResultDTOConvert, type ContractCommonRoleResultDTO } from '$lib/dto/mypsm/kakitangan-kontrak/update-contract-secretary-result.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';
import { RenewContractMeetingConvert, type RenewContractMeeting } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-meeting.dto';
import { RenewContractSupporterApproverConvert, type RenewContractSupporterApprover, type RenewContractSuppAppApproval, RenewContractSuppAppApprovalConvert } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-supp-app.dto';
import { RenewContractSecretaryUpdateConvert, type RenewContractSecretaryUpdate } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-secretary-update.dto';
import { ContractEmployeeDocumentConvert, type ContractEmployeeDocument } from '$lib/dto/mypsm/kakitangan-kontrak/contract-document.dto';

export class ContractEmployeeServices {

    // get contract employee list
    static async getContractEmployeeList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'contracts/list';

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
    // get contract employee offer
    static async getContractEmployeeOfferList() {
        try {
            const url: Input = 'contracts/personal_detail/get';

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
    // get contract employee personal detail
    static async getContractPersonalDetail(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'contracts/personal_detail/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add new contract employee
    static async addNewContractEmployee(param: AddNewContractEmployeeDTO) {
        try {
            let url: Input = 'contracts/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get new contract for edit
    static async getCurrentContractDetail(param: CandidateIDRequestBody) {
        try {
            const url: Input = 'contracts/detail';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //edit current contract
    static async editCurrentContract(param: AddNewContractEmployeeDTO) {
        try {
            let url: Input = 'contracts/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: AddNewContractEmployeeDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //edit new contract employee personal detail
    static async editNewContractEmployeeDetail(param: EditNewContractEmployeeDetailDTO) {
        try {
            let url: Input = 'contracts/personal_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EditNewContractEmployeeDetailDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //edit new contract employee academic
    static async addNewContractEmployeeAcademic(param: AddNewContractEmployeeAcademicDTO) {
        try {
            let url: Input = 'contracts/academic/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeAcademicDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract academic detail
    static async getContractAcademicDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/academic/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add contract employee experiences
    static async addNewContractEmployeeExperience(param: AddNewContractEmployeeExperienceDTO) {
        try {
            let url: Input = 'contracts/experience/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeExperienceDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract experience detail
    static async getContractExperienceDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/experience/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add contract employee activities
    static async addNewContractEmployeeActivity(param: AddNewContractEmployeeActivityDTO) {
        try {
            let url: Input = 'contracts/activity/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeActivityDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract experience detail
    static async getContractActivityDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/activity/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add contract employee family
    static async addNewContractEmployeeFamily(param: AddNewContractEmployeeDependencyDTO) {
        try {
            let url: Input = 'contracts/family/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeDependencyDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract experience detail
    static async getContractFamilyDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/family/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add contract employee dependency
    static async addNewContractEmployeeDependency(param: AddNewContractEmployeeDependencyDTO) {
        try {
            let url: Input = 'contracts/dependant/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeDependencyDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract non family detail
    static async getContractNonFamilyDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/dependant/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add contract employee next of kin
    static async addNewContractEmployeeNextOfKin(param: AddContractNextOfKinDTO) {
        try {
            let url: Input = 'contracts/next_of_kin/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddContractNextOfKinDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract next of kin detail
    static async getContractNextOfKinDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/next_of_kin/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    // add contract employee documents //multipart form
    static async addNewContractEmployeeDocument(param: string) {
        try {
            const url: Input = 'contracts/document/add';

            // param.append('key', 'document');
            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();
            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // download documents
    static async downloadContractAttachment(param: string) {
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

    //get contract document detail
    static async getContractDocument(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/document/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //edit contract detail secretary
    static async updateContractDetail(param: EditContractDetailSecretaryDTO) {
        try {
            let url: Input = 'contracts/secretary_update/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EditContractDetailSecretaryDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract secretary update detail
    static async getContractSecretaryUpdate(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/secretary_update/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add secretary result
    static async addContractSecretaryResult(param: ContractCommonRoleResultDTO) {
        try {
            let url: Input = 'contracts/secretary_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ContractCommonRoleResultDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract secretary result
    static async getContractSecretaryResult(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/secretary_approval/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add approver and supporter
    static async addContractApproverSupporter(param: AddContractApproverSupporterDTO) {
        try {
            let url: Input = 'contracts/set_approver_supporter/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddContractApproverSupporterDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
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

    //get contract assigned supporter and approver
    static async getContractSupporterApprover(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/set_approver_supporter/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get supporter waiting for approval table
    static async getContractSupporterTable(param: CommonListRequestDTO) {
        try {
            let url: Input = 'contracts/supporter_approval/list';

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
    //add supporter result
    static async addContractSupporterResult(param: ContractCommonRoleResultDTO) {
        try {
            let url: Input = 'contracts/supporter_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ContractCommonRoleResultDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract supporter result
    static async getContractSupporterResult(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/supporter_approval/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get approver waiting for approval table
    static async getContractApproverTable(param: CommonListRequestDTO) {
        try {
            let url: Input = 'contracts/approver_approval/list';

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
    //add approver result
    static async addContractApproverResult(param: ContractCommonRoleResultDTO) {
        try {
            let url: Input = 'contracts/approver_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ContractCommonRoleResultDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get contract approver result
    static async getContractApproverResult(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/approver_approval/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add employee number
    static async getContractEmployeeNumber(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/employee/get';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    // ====================================================================
    // renew contract services
    // ====================================================================
    static async getRenewContractList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'contracts/renew/list';

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

    //add selected contract for renew
    static async addRenewContract(param: RenewContractAddDTO) {
        try {
            let url: Input = 'contracts/renew/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractAddDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get renew contract employee table
    static async getRenewContractEmployeeTable(param: CommonListRequestDTO) {
        try {
            let url: Input = 'contracts/renew/personal_detail/list';

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

    //get renew contract personal detail
    static async getRenewContractPersonalDetail(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/personal_detail';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get renew contract academic detail
    static async getRenewContractAcademic(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/academic';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get renew contract experience detail
    static async getRenewContractExperience(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/experience';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get renew contract activity detail
    static async getRenewContractActivity(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/activities';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get renew contract family detail
    static async getRenewContractFamily(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/family';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get renew contract non family detail
    static async getRenewContractNonFamily(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/dependent';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //get renew contract next of kin detail
    static async getRenewContractNextOfKin(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/next_of_kin';

            const response: Response = await http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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
    //get renew contract document
    static async getRenewContractDocument(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/document';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    //get renew contract information (old contract details)
    static async getRenewContractInfo(param: CandidateIDRequestBody) {
        try {
            let url: Input = 'contracts/renew/contract_information';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add renew contract performance
    static async addRenewContractPerformance(param: RenewContractAddPerfomance) {
        try {
            let url: Input = 'contracts/renew/performance/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractAddPerfomanceConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get renew contract performance
    static async getRenewContractPerformance(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/performance';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add renew contract meeting details
    static async addRenewContractMeeting(param: RenewContractMeeting) {
        try {
            let url: Input = 'contracts/renew/meeting/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractMeetingConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get renew contract meeting details
    static async getRenewContractMeeting(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/meeting';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add renew contract supporter and approver
    static async addRenewContractSupporterApprover(param: RenewContractSupporterApprover) {
        try {
            let url: Input = 'contracts/renew/set_supporter_approver/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractSupporterApproverConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get renew contract meeting details
    static async getRenewContractSupporterApprover(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/set_supporter_approver';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // assigned supporter table list
    static async getRenewContractSupporterTable(param: CommonListRequestConvert) {
        try {
            let url: Input = 'contracts/renew/supporter/list';

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

    // add assigned supporter approval
    static async addRenewContractSupporterApproval(param: RenewContractSuppAppApproval) {
        try {
            let url: Input = 'contracts/renew/supporter/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractSuppAppApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get assigned supporter approval detail
    static async getRenewContractSupporterApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/supporter/detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // assigned approver table list
    static async getRenewContractApproverTable(param: CommonListRequestConvert) {
        try {
            let url: Input = 'contracts/renew/approver/list';

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

    // add assigned approver approval
    static async addRenewContractApproverApproval(param: RenewContractSuppAppApproval) {
        try {
            let url: Input = 'contracts/renew/approver/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractSuppAppApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get assigned approver approval detail
    static async getRenewContractApproverApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/approver/detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // add secretary contract update
    static async addRenewContractSecretaryUpdate(param: RenewContractSecretaryUpdate) {
        try {
            let url: Input = 'contracts/renew/new/contract/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractSecretaryUpdateConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get secretary contract update
    static async getRenewContractSecretaryUpdate(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/new/contract/detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // add secretary approval
    static async addRenewContractSecretaryApproval(param: RenewContractSuppAppApproval) {
        try {
            let url: Input = 'contracts/renew/secretary/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: RenewContractSuppAppApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get secretary approval
    static async getRenewContractSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/secretary/detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // add contract document
    static async addRenewContractDocument(param: string) {
        try {
            let url: Input = 'contracts/renew/new/document/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get uploaded document
    static async getRenewContractUploadedDocument(param: commonIdRequestDTO) {
        try {
            let url: Input = 'contracts/renew/new/document/detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

}
