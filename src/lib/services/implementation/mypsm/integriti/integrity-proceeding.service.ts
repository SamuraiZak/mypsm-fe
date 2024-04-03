// ===============================================================
// Integrity - proceeding Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { ProceedingAppealResultDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-appeal.dto';
import type { ProceedingApproverResultDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-approver-result.dto';
import type { ProceedingCreateChargeRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-create-charges-request.dto';
import type { ProceedingSentencingMeetingRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-create-sentencing-meeting-request.dto';
import type { ProceedingSuspensionRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-create-suspension-request.dto';
import type {
    ProceedingIntegrityIdRequestDTO,
    ProceedingStaffDetailRequestDTO,
} from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class IntegrityProceedingServices {
    // get list of proceeding - employee
    static async getEmployeeList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'integrity/proceeding/employee_list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // get list of proceeding - charge
    static async getProceedingChargeRecordList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'integrity/proceeding/accusation/list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // get course proceeding - staff details
    static async getProceedingStaffDetail(
        param: ProceedingStaffDetailRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/employee_details';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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

    // get course proceeding - type charges details view
    static async getProceedingTypeChargesnDetailsView(
        param: ProceedingIntegrityIdRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/accusation/view';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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

    // create proceeding - add charge meeting result
    static async createProceedingChargeMeetingResult(
        param: ProceedingCreateChargeRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/accusation/add';

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
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // =====================================================
    // create proceeding - get charge meeting result
    // =====================================================

    // create proceeding - add integrity director result
    static async createProceedingChargesIntegrityDirectorResult(
        param: ProceedingApproverResultDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/accusation/confirmation';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: JSON.stringify(param),
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

    // get list of charger
    static async getProceedingListOfCharges<T>(param: T) {
        try {
            const url: Input =
                'integrity/proceeding/sentencing/accusation_list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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

    // create proceeding - add sentencing result
    static async createProceedingSentencing(
        param: ProceedingSentencingMeetingRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/sentencing/add';

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
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create proceeding - add integrity director result - sentencing
    static async createProceedingSentencingIntegrityDirectorResult(
        param: ProceedingApproverResultDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/sentencing/confirmation';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: JSON.stringify(param),
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

    // create proceeding - add appeal
    static async createProceedingAppeal(param: ProceedingAppealResultDTO) {
        try {
            const url: Input = 'integrity/proceeding/appeal/add';

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
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create proceeding - add integrity director result - appeal
    static async createProceedingAppealIntegrityDirectorResult(
        param: ProceedingApproverResultDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/appeal/confirmation';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: JSON.stringify(param),
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

    // create proceeding - add suspension
    static async createProceedingSuspension(
        param: ProceedingSuspensionRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/suspension/add';

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
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // create proceeding - add criminal suspension
    static async createProceedingCriminal(
        param: ProceedingSuspensionRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/criminal/add';

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
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get list of proceeding - suspension
    static async getProceedingSuspensionRecordList(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/proceeding/suspension/list';

            // get the promise response
            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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
