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
import { AddNewContractEmployeeAcademicDTOConvert, type AddNewContractEmployeeAcademicDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto';
import { AddNewContractEmployeeActivityDTOConvert, type AddNewContractEmployeeActivityDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto';
import { AddNewContractEmployeeDependencyDTOConvert, type AddNewContractEmployeeDependencyDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto';
import { AddNewContractEmployeeExperienceDTOConvert, type AddNewContractEmployeeExperienceDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto';
import { AddContractApproverSupporterDTOConvert, type AddContractApproverSupporterDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-supproter-approver.dto';
import { AddNewContractEmployeeDTOConvert, type AddNewContractEmployeeDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-new-contract-employee.dto';
import { EditNewContractEmployeeDetailDTOConvert, type EditNewContractEmployeeDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto';
import { EditContractDetailSecretaryDTOConvert, type EditContractDetailSecretaryDTO } from '$lib/dto/mypsm/kakitangan-kontrak/update-contract-detail-secretary.dto';
import { ContractCommonRoleResultDTOConvert, type ContractCommonRoleResultDTO } from '$lib/dto/mypsm/kakitangan-kontrak/update-contract-secretary-result.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

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

    //edit new contract employee detail
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

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CandidateIDRequestBodyConvert.toJson(param),
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

    //add contract employee dependency
    static async addNewContractEmployeeDependency(param: AddNewContractEmployeeDependencyDTO) {
        try {
            let url: Input = 'contracts/next_of_kin/add';

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

    //add contract employee next of kin
    static async addNewContractEmployeeNextOfKin(param: AddNewContractEmployeeDependencyDTO) {
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

    // create contract employee documents //multipart form
    static async addNewContractEmployeeDocument(param: FormData) {
        try {
            const url: Input = 'contracts/document/add';

            param.append('key', 'document');

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                    headers: {
                        Accept: 'multipart/form-data',
                        'Content-type': 'multipart/form-data;',
                    },
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
                invalidateAll()
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
}
