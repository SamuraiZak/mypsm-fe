import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import type { Input } from 'ky';
import http from "../../service-provider.service";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import { invalidateAll } from "$app/navigation";
import { SupporterApproverDetailDTOConvert, type SupporterApproverDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-supporter-approver.dto";
import { VoluntaryRetirementDateDetailDTOConvert, type VoluntaryRetirementDateDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary-retirement-date.dto";
import { VoluntaryDetailDTOConvert, type VoluntaryDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary.dto";
import { VoluntaryStatusDetailDTOConvert, type VoluntaryStatusDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-status-voluntary.dto";
import { VoluntaryViewDetailDTOConvert, type VoluntaryViewDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary-view.dto";
import { ForceViewDetailDTOConvert, type ForceViewDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-force-view.dto";
import { ForceStatusDetailDTOConvert, type ForceStatusDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-status-force.dto";
import { UnspecifyAddDetailDTOConvert, type UnspecifyAddDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-unspecify-add-detail.dto";
import { UnspecifyUpdateDetailDTOConvert, type UnspecifyUpdateDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-unspecify-update.dto";

export class retirementServices {

    //=====================================================
    //================== Table ============================
    //=====================================================

    //=====================================================
    //================== Voluntary ========================
    //=====================================================


    static async getVoluntaryListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/retirement/voluntary/list';

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
    // ================== Employee List ========================

    static async getVoluntaryListEmployeeDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/retirement/voluntary/list_employee';

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


    //=====================================================
    //================== Forced ===========================
    //=====================================================


    static async getForceListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/retirement/force/list';

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

    // ================== Employee List ========================

    static async getForceListEmployeeDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/retirement/force/list_employee';

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


    //=====================================================
    //================== Unspecify ========================
    //=====================================================

    static async getUnspecifyListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/retirement/unspecify/list';

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
    // ================== Employee List ========================

    static async getUnspecifyListEmployeeDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'employment/retirement/unspecify/list_employee';

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

    //=====================================================
    //================== Voluntary ========================
    //=====================================================

    // =====================================================
    // ================= Get Retirement Date ===============

    static async getRetirementDateDetails(param: VoluntaryRetirementDateDetailDTO) {
        try {
            let url: Input = 'loan/personal_detail/get';

            const response: Response = await http
                .get(url, {
                    body: VoluntaryRetirementDateDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ================= Add Voluntary  ====================

    static async addVoluntaryDetail(param: VoluntaryDetailDTO) {
        try {
            let url: Input = 'loan/detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: VoluntaryDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Voluntary Certification ==============

    static async addVoluntaryCertificationDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'loan/detail/add';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Voluntary Confirmation =================

    static async addVoluntaryConfirmationDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'loan/detail/add';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Voluntary Support Approver =================

    static async addVoluntarSupportApproverDetail(param: SupporterApproverDetailDTO) {
        try {
            let url: Input = 'loan/detail/add';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: SupporterApproverDetailDTOConvert.toJson(param),
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
    // =====================================================
    // ============== Voluntary First Support =================

    static async addVoluntarFirstSupporterDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/first_supporter';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Voluntary Second Support =================

    static async addVoluntarSecondSupporterDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/second_supporter';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Voluntary AppointedApproval =================

    static async addVoluntarAppointedApprovalDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/appointed_approval';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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


    // =====================================================
    // ============== Voluntary  SecretaryApproval =================

    static async addVoluntarSecretaryApprovalDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/secretary_approval';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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



    // =====================================================
    // ============== Voluntary  DocumentCertification =================

    static async addVoluntarDocumentCertificationDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/document_certification';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Voluntary  Letter Certification =================

    static async addVoluntarLetterCertificationDetail(param: VoluntaryStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/letter_certification';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: VoluntaryStatusDetailDTOConvert.toJson(param),
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

    // ==================================================
    // ============ view detail Voluntary ==================

    static async viewVoluntaryDetail(param: VoluntaryViewDetailDTO) {

        try {
            let url: Input = 'employment/retirement/voluntary/view';

            const response: Response = await http
                .post(url, {
                    body: VoluntaryViewDetailDTOConvert.toJson(param),
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

     //=====================================================
    //================== Force ========================
    //=====================================================

    // ==================================================
    // ============ view detail Force ==================

    static async viewForceDetail(param: ForceViewDetailDTO) {

        try {
            let url: Input = 'employment/retirement/force/view';

            const response: Response = await http
                .post(url, {
                    body:ForceViewDetailDTOConvert.toJson(param),
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
    // =====================================================
    // ============== Force Certification =================

    static async addForceCertificationDetail(param: ForceStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/letter_certification';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ForceStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Force Confirmation =================

    static async addForceConfirmationDetail(param: ForceStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/force/confirmation';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ForceStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Document =================

    // =====================================================
    // ============== Force Document Certification =================

    static async addForceDocumentCertificationDetail(param: ForceStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/force/documents_certification';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ForceStatusDetailDTOConvert.toJson(param),
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

    // =====================================================
    // ============== Force Letter Certification =================

    static async addForceLetterCertificationDetail(param: ForceStatusDetailDTO) {
        try {
            let url: Input = 'employment/retirement/force/letter_certification';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ForceStatusDetailDTOConvert.toJson(param),
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

    //=====================================================
    //================== Unspecify ========================
    //=====================================================

     // =====================================================
    // ============== Add Unspecify =================

    static async addUnspecifyDetail(param: UnspecifyAddDetailDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/add';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: UnspecifyAddDetailDTOConvert.toJson(param),
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

    
     // =====================================================
    // ============== Update Unspecify =================

    static async updateUnspecifyDetail(param: UnspecifyUpdateDetailDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/update';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: UnspecifyUpdateDetailDTOConvert.toJson(param),
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