import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type {
    ServiceAllowanceApplicationDetailRequestDTO,
    ServiceAllowanceEmployeeDetailRequestDTO,
} from '$lib/dto/mypsm/service-allowance/service-allowance.dto';
import { toasterCommon } from '$lib/helpers/core/french-toast.helper';
import type {
    ServiceAllowanceAssignDirectorType,
    ServiceAllowanceCeremonyClothingDetailType,
    ServiceAllowanceEndorsementType,
    ServiceAllowanceEndorserDetailType,
    ServiceAllowanceFuneralDetailType,
    ServiceAllowanceHouseMovingDetailType,
    ServiceAllowanceInsuranceDetailType,
    ServiceAllowanceOtherAllowanceDetailType,
    ServiceAllowancePassportPaymentDetailType,
    ServiceAllowanceSecretaryConfirmationType,
    ServiceAllowanceWinterClothingDetailType,
} from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ServiceAllowanceServices {
    // get list of service allowance application
    static async getApplicationList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'service_allowance/list';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get service allowance application detail
    static async getApplicationDetails(
        param: ServiceAllowanceApplicationDetailRequestDTO,
    ) {
        try {
            const url: Input = 'service_allowance/view';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    static async getEmployeeDetails(
        param: ServiceAllowanceEmployeeDetailRequestDTO,
    ) {
        try {
            const url: Input = 'service_allowance/employee_details';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit application details by type
    // 1. ceremony clothing
    static async addCeremonyClothing(
        param: ServiceAllowanceCeremonyClothingDetailType,
    ) {
        try {
            const url: Input = 'service_allowance/ceremony_clothing/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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
    
    // 2. pasport payment
    static async addPassportPayment(
        param: ServiceAllowancePassportPaymentDetailType,
    ) {
        try {
            const url: Input = 'service_allowance/passport_payment/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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
    
    // 3. other
    static async addOtherAllowance(
        param: ServiceAllowanceOtherAllowanceDetailType,
    ) {
        try {
            const url: Input = 'service_allowance/others/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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
    
    // 4. other
    static async addHouseMoving(
        param: ServiceAllowanceHouseMovingDetailType,
    ) {
        try {
            const url: Input = 'service_allowance/house_moving/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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
    
    // 5. winter clothing
    static async addWinterClothing(
        param: ServiceAllowanceWinterClothingDetailType,
    ) {
        try {
            const url: Input = 'service_allowance/winter_clothing/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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

    static async addFuneral(param: ServiceAllowanceFuneralDetailType) {
        try {
            const url: Input = 'service_allowance/funeral_arrangement/add';
    
            const promiseResponse: Promise<Response> = http.post(url, {
                body: JSON.stringify(param),
            }).json();
    
            const response = await toasterCommon(promiseResponse);
    
            const result: CommonResponseDTO = CommonResponseConvert.fromResponse(response);
    
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
    
    static async addInsurance(param: ServiceAllowanceInsuranceDetailType) {
        try {
            const url: Input = 'service_allowance/insurance_payment/add';
    
            const promiseResponse: Promise<Response> = http.post(url, {
                body: JSON.stringify(param),
            }).json();
    
            const response = await toasterCommon(promiseResponse);
    
            const result: CommonResponseDTO = CommonResponseConvert.fromResponse(response);
    
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

    // submit assign director
    static async addAssignDirector(param: ServiceAllowanceAssignDirectorType) {
        try {
            const url: Input = 'service_allowance/assign_director';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit director support
    static async addDirectorSupport(param: ServiceAllowanceEndorsementType) {
        try {
            const url: Input = 'service_allowance/director_support';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit secretary verification
    static async addSecretaryVerification(
        param: ServiceAllowanceEndorsementType,
    ) {
        try {
            const url: Input = 'service_allowance/verification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit endorser detail
    static async addEndorserDetail(param: ServiceAllowanceEndorserDetailType) {
        try {
            const url: Input = 'service_allowance/supporter_approver';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit supporter feedback
    static async addSupporterFeedback(param: ServiceAllowanceEndorsementType) {
        try {
            const url: Input = 'service_allowance/supporter';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit approver feedback
    static async addApproverFeedback(param: ServiceAllowanceEndorsementType) {
        try {
            const url: Input = 'service_allowance/approver';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // submit secretary confirmation
    static async addSecretaryConfirmation(
        param: ServiceAllowanceSecretaryConfirmationType,
    ) {
        try {
            const url: Input = 'service_allowance/confirmation';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterCommon(promiseResponse);

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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
