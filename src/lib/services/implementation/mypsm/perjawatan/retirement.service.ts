import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import type { Input } from 'ky';
import http from "../../service-provider.service";
import { VoluntaryRetirementDateDetailDTOConvert, type VoluntaryRetirementDateDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary-retirement-date.dto";
import { VoluntaryDetailDTOConvert, type VoluntaryDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary.dto";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import { invalidateAll } from "$app/navigation";
import { VoluntaryStatusDetailDTOConvert, type VoluntaryStatusDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-status-voluntary.dto";
import { SupporterApproverDetailDTOConvert, type SupporterApproverDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-supporter-approver.dto";

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

}