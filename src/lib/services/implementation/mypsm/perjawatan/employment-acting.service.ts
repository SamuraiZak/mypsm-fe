import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { Input } from "ky";
import http from '$lib/services/implementation/service-provider.service';
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { AddChosenActingEmployeeDTOConvert, UpdateChosenEmployeeConvert, type AddChosenActingEmployeeDTO, type UpdateChosenEmployee } from "$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import { invalidateAll } from "$app/navigation";
import { UpdateActingInterviewConvert, type UpdateActingInterview } from "$lib/dto/mypsm/employment/acting/update-interview-detail.dto";
import { UpdateInterviewResultConvert, type UpdateInterviewResult } from "$lib/dto/mypsm/employment/acting/update-interview-result.dto";
import { PlacementMeetingDetailConvert, PlacementResultConvert, PromotionMeetingResultConvert, UpdatePromotionMeetingConvert, type PlacementMeetingDetail, type PlacementResult, type PromotionMeetingResult, type UpdatePromotionMeeting } from "$lib/dto/mypsm/employment/acting/update-promotion-meeting.dto";
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto";
import { ActingDetailsConvert, type ActingDetails } from "$lib/dto/mypsm/employment/acting/acting-result.dto";
import { UpdateMainPromotionMeetingConvert, type UpdateMainPromotionMeeting } from "$lib/dto/mypsm/employment/acting/main-update-promotion-meeting.dto";
import { EmployeePostponeConvert, PostponeDetailResultConvert, type EmployeePostpone, type PostponeDetailResult } from "$lib/dto/mypsm/employment/acting/acting-employee-form.dto";
import { CertifySelectedConvert, MainActingDetailEditConvert, MainMeetingResultConvert, type CertifySelected, type MainActingDetailEdit, type MainMeetingResult } from "$lib/dto/mypsm/employment/acting/main-acting-form.dto";
import { ActingCommonBatchIdConvert, ActingFinalResultIdConvert, type ActingCommonBatchId, type ActingFinalResultId } from "$lib/dto/mypsm/employment/acting/acting-batchid.dto";
import { ActingCommonApprovalConvert, type ActingCommonApproval } from "$lib/dto/mypsm/employment/acting/acting-approval.dto";


export class EmploymentActingServices {
    //table for 154
    static async get154List(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/154s/list';

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

    //table for flexi 41
    static async getFlexi41List(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/flexi41s/list';

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

    //table for gred utama
    static async getMainList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/list';

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
    //table for employee acting offer
    static async getEmployeeActingOffer(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/employee/list';

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

    //employee list for new pemangkuan (add list)
    static async getActingEmployeeList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/employee_lists/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const response: Response = await promiseRes;

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

    //add employee for pemangkuan
    static async addChosenActingEmployee(param: AddChosenActingEmployeeDTO) {
        try {
            const url: Input = 'employment/acting/chosen_employee_lists/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddChosenActingEmployeeDTOConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get chosen employee list (butiran)
    static async getChosenEmployees(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/chosen_employee_lists/list'

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

    //update chosen employee
    static async updateChosenEmployee(param: UpdateChosenEmployee) {
        try {
            const url: Input = 'employment/acting/candidate_selection_meetings/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: UpdateChosenEmployeeConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get interview info
    static async getInterviewInfo(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/interview_infos/list'

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
    // get interview general detail
    static async getInterviewGeneralInfo(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/interview_infos/get'

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

    //update interview detail
    static async updateInterviewDetail(param: UpdateActingInterview) {
        try {
            const url: Input = 'employment/acting/interview_infos/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: UpdateActingInterviewConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get interview result table 154
    static async getInterviewResult(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/interview_result_marks/list'

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

    //update interview detail
    static async updateInterviewResult(param: UpdateInterviewResult) {
        try {
            const url: Input = 'employment/acting/interview_result_marks/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: UpdateInterviewResultConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //update promotion meeting
    static async updateDirectorApproval(param: ActingCommonApproval) {
        try {
            const url: Input = 'employment/acting/director_certifies/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingCommonApprovalConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    //update integrity approval
    static async updateIntegrityApproval(param: ActingCommonApproval) {
        try {
            const url: Input = 'employment/acting/integrity_certifies/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingCommonApprovalConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get promotion meeting detail
    static async getPromotionMeetingDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_results/detail'

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


    //get promotion meeting result table
    static async getPromotionMeetingResult(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_results/list'

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

    //get placement meeting  detail
    static async getPlacementMeetingResultDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_placements/detail'

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

    //update promotion meeting
    static async updatePromotionMeeting(param: UpdatePromotionMeeting) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_results/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: UpdatePromotionMeetingConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get promotion meeting table detail
    static async getPromotionTableDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_results/get'

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

    //edit promotion result
    static async editPromotionResult(param: PromotionMeetingResult) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_results/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionMeetingResultConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get placement table
    static async getPlacementList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_placements/list'

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

    //add palcement detail
    static async addPlacementMeeting(param: PlacementMeetingDetail) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_placements/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PlacementMeetingDetailConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    // update placement result
    static async editPlacementResult(param: PlacementResult) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_placements/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PlacementResultConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

     //get placement result detail
    static async getPlacementMeetingResult(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/promotion_meeting_placements/get'

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

    //get postpone table
    static async getPostponeList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/postpones/list'

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

    //get postpone detail
    static async getPostponeDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/postpones/get'

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

    //get postpone result table
    static async getPostponeResult(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/postpone_results/list'

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
    //get acting result table
    static async getActingResult(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/acting_results/get'

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

    // update acting result
    static async addActingResult(param: ActingDetails) {
        try {
            const url: Input = 'employment/acting/acting_results/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingDetailsConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    //get acting confirmation table
    static async getActingConfirmation(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/acting_confirmations/list'

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
    //get acting confirmation detail
    static async getActingConfirmationDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/acting_confirmations/get'

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
    //get director approval
    static async getDirectorApproval(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/director_certifies/get'

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
    //get integirty approval
    static async getIntegrityApproval(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/integrity_certifies/get'

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
    //get Supporter approval
    static async getSupporterApproval(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/supports/get'

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
    //get Approver approval
    static async getApproverApproval(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/approves/get'

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
    // update supporter approval
    static async addSupporterApproval(param: ActingCommonApproval) {
        try {
            const url: Input = 'employment/acting/supports/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingCommonApprovalConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    // update approver approval
    static async addApproverApproval(param: ActingCommonApproval) {
        try {
            const url: Input = 'employment/acting/approves/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingCommonApprovalConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    // update postpone result
    static async updatePostponeResult(param: PostponeDetailResult) {
        try {
            const url: Input = 'employment/acting/postpones/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PostponeDetailResultConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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


    // ======================== Gred Utama
    //get main certification 
    static async getMainCertification(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/certifications/list'

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
    //get main promotion table 
    static async getMainPromotionTable(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/promotion_meetings/list'

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
    //get main promotion meeting detail
    static async getMainPromotionMeeting(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/promotion_meetings/get'

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
    // update main promotion meeting
    static async addMainPromotionMeeting(param: UpdateMainPromotionMeeting) {
        try {
            const url: Input = 'employment/acting/mains/promotion_meetings/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: UpdateMainPromotionMeetingConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get employee meeting detail
    static async getEmployeeMeetingDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/employee/meeting_detail/get'

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

    //get employee interview docs
    static async getEmployeeInterviewDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/employee/meeting_documents/download'

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

    // update employee postpone form
    static async editPostponeStatus(param: EmployeePostpone) {
        try {
            const url: Input = 'employment/acting/employee/postpone_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: EmployeePostponeConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get employee postpone detail
    static async getEmployeePostponeDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/employee/postpone_detail/get'

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

    //get employee postpone result
    static async getEmployeePostponeResult(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/employee/updated_detail/get'

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

    //get employee acting final result
    static async getEmployeeActingResult(param: ActingFinalResultId) {
        try {
            const url: Input = 'employment/acting/employee/final_result/get'

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ActingFinalResultIdConvert.toJson(param),
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

    //==================================== main v2
    //certify selected
    static async addCertifySelected(param: CertifySelected) {
        try {
            const url: Input = 'employment/acting/mains/certifications/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CertifySelectedConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    static async addMainMeetingResult(param: MainMeetingResult) {
        try {
            const url: Input = 'employment/acting/mains/promotion_meetings/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: MainMeetingResultConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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

    //get main acting details table
    static async getMainActingInfo(param: CommonListRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/acting_infos/list'

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
    //get main promotion meeting
    static async getMainPromotionMeetingDetail(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/promotion_meetings/detail'

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

    //get main acting info
    static async getMainActingDetails(param: commonIdRequestDTO) {
        try {
            const url: Input = 'employment/acting/mains/acting_infos/get'

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
    //edit main acting detail
    static async addMainActingDetail(param: MainActingDetailEdit) {
        try {
            const url: Input = 'employment/acting/mains/acting_infos/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: MainActingDetailEditConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    //edit main acting detail
    static async addMainActingSupporter(param: ActingCommonApproval) {
        try {
            const url: Input = 'employment/acting/mains/support/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingCommonApprovalConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
    //edit main acting detail
    static async addMainActingApprover(param: ActingCommonApproval) {
        try {
            const url: Input = 'employment/acting/mains/approve/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ActingCommonApprovalConvert.toJson(param),
                })
                .json();

            const reponse: Response = await getPromiseToast(promiseRes);

            const result = CommonResponseConvert.fromResponse(reponse);

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
}