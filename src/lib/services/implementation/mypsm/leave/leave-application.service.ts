import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type {
    LeaveCommonDetailsDTO,
    LeaveDeliveryDetailsDTO,
    LeaveEndorserDetailsDTO,
    LeaveEndorsmentDTO,
    LeaveStudyDetailsDTO,
    LeaveUnrecordedDetailsDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class LeaveApplicationServices {
    // ======================================================
    // Add application details
    // ======================================================
    // common leave
    static async addCommonLeave(
        param: LeaveCommonDetailsDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // delivery leave
    static async addDeliveryLeave(
        param: LeaveDeliveryDetailsDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // unrecorded leave
    static async addUnrecordedLeave(param: LeaveUnrecordedDetailsDTO) {
        try {
            let url: Input = '';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // study leave
    static async addStudyLeave(param: LeaveStudyDetailsDTO) {
        try {
            let url: Input = '';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // ======================================================
    // Processes
    // ======================================================
    // head of director feedback
    static async addHeadOfDirectorFeedback(
        param: LeaveEndorsmentDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // director feedback
    static async addDirectorFeedback(
        param: LeaveEndorsmentDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // secretary verification
    static async addSecretaryVerification(
        param: LeaveEndorsmentDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // supporter feedback
    static async addSupporterFeedback(
        param: LeaveEndorsmentDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // approver feedback
    static async addApproverFeedback(
        param: LeaveEndorsmentDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // management feedback
    static async addManagementFeedback(
        param: LeaveEndorsmentDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // add endorser details
    static async addEndorserDetails(
        param: LeaveEndorserDetailsDTO,
        typeCode: string,
    ) {
        try {
            let url: Input = '';

            switch (typeCode) {
                case LeaveTypeConstant.replacementLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unrecordedLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.halfPaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.hajiLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.quarantineLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidNurseryLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.absenceLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.extendedSickLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.unpaidFollowPartnerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.cancerLeave.code:
                    url = 'abc';
                    break;

                case LeaveTypeConstant.tbLeave.code:
                    url = 'abc';
                    break;

                default:
                    url = 'abc';
                    break;
            }

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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
}
