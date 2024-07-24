import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { Input } from "ky";
import http from '$lib/services/implementation/service-provider.service';
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { getGeneralToast } from "$lib/helpers/core/toast.helper";
import { invalidateAll } from "$app/navigation";
import { EmployeeInterimApplicationDetailRequestDTOConvert, type EmployeeInterimApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto";
import { InterimChecklistConvert, InterimViewAssignConvert, type InterimChecklist, type ViewAssign } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-application-detail-response.dto";
import type { InterimApplicationResponse } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-application-response.dto";
import { InterimCommonApprovalConvert, type InterimCommonApproval } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-common-approval.dto";
import { TerminationSuppAppConvert, type TerminationSuppApp } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-termination.dto";
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto";


export class EmploymentInterimServices {

    //Employees' POV: View Application Table
    static async getEmployeeApplicationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/interim/application/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const reponse: Response = await promiseRes;

            const result = CommonResponseConvert.fromResponse(reponse);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //Other than Employees' POV: View Application Table
    static async getApplicationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/interim/application/list'

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const reponse: Response = await promiseRes;

            const result = CommonResponseConvert.fromResponse(reponse);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //add new tanggung kerja application
    static async addNewInterimApplication(param: InterimApplicationResponse) {
        try {
            const url: Input = 'employment/interim/application/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    static async getEmployeeDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/interim/application/employee_details';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const reponse: Response = await promiseRes;

            const result = CommonResponseConvert.fromResponse(reponse);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //add new application (second stepper)
    static async getEmployeeNewInterimApplicationDetail(param: EmployeeInterimApplicationDetailRequestDTO) {
        try {
            let url: Input = 'employment/interim/application/employee_details';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EmployeeInterimApplicationDetailRequestDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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

    //view application detail (all roles)
    static async getInterimApplicationDetail(param: EmployeeInterimApplicationDetailRequestDTO) {
        try {
            let url: Input = 'employment/interim/application/view';

            const response: Response = await http
                .post(url, {
                    body: EmployeeInterimApplicationDetailRequestDTOConvert.toJson(param),
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

    // add interim document
    static async addInterimUploadDocument(param: string) {
        try {
            let url: Input = 'employment/interim/application/upload';
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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

    //add interim skipping
    static async addInterimSkipping(param: InterimCommonApproval) {
        try {
            let url: Input = 'employment/interim/application/skipping';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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

    //add interim director approval
    static async addInterimDirectorApproval(param: InterimCommonApproval) {
        try {
            let url: Input = 'employment/interim/application/support';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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

    //add interim checklist
    static async addChecklist(param: InterimChecklist) {
        try {
            let url: Input = 'employment/interim/application/checklist';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimChecklistConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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
    //add interim approver approval
    static async addInterimApproverApproval(param: InterimCommonApproval) {
        try {
            let url: Input = 'employment/interim/application/approval';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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

    //add interim approver approval
    static async addDirector(param: ViewAssign) {
        try {
            let url: Input = 'employment/interim/application/assign_director';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimViewAssignConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
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

    // ============================================================
    // Termination @ Penamatan Tanggung Kerja
    // ============================================================
    static async getTerminationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/interim/termination/list'

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const reponse: Response = await promiseRes;

            const result = CommonResponseConvert.fromResponse(reponse);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get all related data
    static async getTerminationDetail(param: EmployeeInterimApplicationDetailRequestDTO) {
        try {
            const url: Input = 'employment/interim/termination/view'

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EmployeeInterimApplicationDetailRequestDTOConvert.toJson(param),
                })
                .json();

            const reponse: Response = await promiseRes;

            const result = CommonResponseConvert.fromResponse(reponse);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //add termination secretary approval
    static async addTerminationSecretaryApproval(param: InterimCommonApproval) {
        try {
            let url: Input = 'employment/interim/termination/verification';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //add termination secretary approval
    static async addTerminationSuppApp(param: TerminationSuppApp) {
        try {
            let url: Input = 'employment/interim/termination/supporter_approver';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: TerminationSuppAppConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //add termination supporter approval
    static async addTerminationSupporterApproval(param: InterimCommonApproval) {
        try {
            let url: Input = 'employment/interim/termination/support';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //add termination Approver approval
    static async addTerminationApproverApproval(param: InterimCommonApproval) {
        try {
            let url: Input = 'employment/interim/termination/approval';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: InterimCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getGeneralToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}