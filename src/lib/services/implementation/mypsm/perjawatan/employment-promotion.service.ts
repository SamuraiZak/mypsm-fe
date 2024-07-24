import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { Input } from "ky";
import http from '$lib/services/implementation/service-provider.service';
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { invalidateAll } from "$app/navigation";
import { getGeneralToast } from "$lib/helpers/core/toast.helper";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { AddNewPromotionConvert, type AddNewPromotion } from "$lib/dto/mypsm/employment/promotion/add-promotion.dto";
import { PromotionCertificationConvert, PromotionCommonApprovalConvert, PromotionEmployeeEditConvert, PromotionIntegrityApprovalConvert, PromotionPlacementEditConvert, type PromotionCertification, type PromotionCommonApproval, type PromotionEmployeeEdit, type PromotionIntegrityApproval, type PromotionPlacementEdit } from "$lib/dto/mypsm/employment/promotion/promotion-form.dto";
import { PromotionCertificationGetConvert, type PromotionCertificationGet } from "$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto";


export class EmploymentPromotionServices {
    //table for 154
    static async get154List(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/154s/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get tbk12 promotion table
    static async getTbk12List(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/tbk12s/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get main promotion table
    static async getMainList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/mains/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //add employee for kenaikan pangkat
    static async addNewPromotion (param: AddNewPromotion) {
        try{
            const url: Input = 'employment/promotion/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewPromotionConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get employee list table (add to new promotion)
    static async getEmployeeList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employee/acting';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get certification table
    static async getCertificationList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/certifications/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get promotion meeting table (2nd stepper)
    static async getPromotionMeetingList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/promotion_meetings/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //edit certification
    static async editCertification (param: PromotionCertification) {
        try{
            const url: Input = 'employment/promotion/certifications/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionCertificationConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get certification detail
    static async getCertificationDetail(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/certifications/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get placement table
    static async getPlacementList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/placement_meetings/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get placement detail
    static async getPlacementDetail(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/placement_meeting_details/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //edit placement
    static async editPlacement (param: PromotionPlacementEdit) {
        try{
            const url: Input = 'employment/promotion/placement_meeting_details/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionPlacementEditConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get salary adjustment table
    static async getSalaryAdjustmentTable(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/placement_meeting_salary_adjustments/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get salary adjustment detail
    static async getSalaryAdjustmentDetail(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/placement_meeting_salary_adjustments/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get promotion employee table
    static async getPromotionEmployeeList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/employee_promotions/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get promotion final result table
    static async getPromotionFinalResultList(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/final_result/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get promotion employee detail
    static async getPromotionEmployeeDetail(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/employee_promotions/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //edit employee promotion
    static async editEmployeePromotion (param: PromotionEmployeeEdit) {
        try{
            const url: Input = 'employment/promotion/employee_promotions/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionEmployeeEditConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }  
    
    //add director approval
    static async addDirectorApproval (param: PromotionCommonApproval) {
        try{
            const url: Input = 'employment/promotion/director_certifies/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionCommonApprovalConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get director approval
    static async getDirectorApproval(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/director_certifies/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    } 
    
    //add integrity approval
    static async addIntegrityApproval (param: PromotionIntegrityApproval) {
        try{
            const url: Input = 'employment/promotion/integrity_certifies/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionIntegrityApprovalConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    } 

    // get integrity approval
    static async getIntegrityApproval(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/integrity_certifies/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    } 

    //add supporter approval
    static async addSupporterApproval (param: PromotionCommonApproval) {
        try{
            const url: Input = 'employment/promotion/supports/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionCommonApprovalConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get psupporter approval
    static async getSupporterApproval(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/supports/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    } 

    //add approver approval
    static async addAppproverApproval (param: PromotionCommonApproval) {
        try{
            const url: Input = 'employment/promotion/approves/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: PromotionCommonApprovalConvert.toJson(param),
                })
                .json();

                const reponse: Response = await getGeneralToast(promiseRes);

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    await invalidateAll();
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get approver approval
    static async getApproverApproval(param: PromotionCertificationGet) {
        try{
            const url: Input = 'employment/promotion/approves/get';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: PromotionCertificationGetConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }  

    // get director approval
    static async getEmployeePromotionOffer(param: CommonListRequestDTO) {
        try{
            const url: Input = 'employment/promotion/employee/list';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

                const reponse: Response = await promiseRes;

                const result = CommonResponseConvert.fromResponse(reponse);

                if(result.status == 'success') {
                    return result;
                } else {
                    return CommonResponseConstant.httpError;
                }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    } 
}