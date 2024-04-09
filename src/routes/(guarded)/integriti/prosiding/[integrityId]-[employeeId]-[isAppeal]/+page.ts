import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { RadioDTO } from '$lib/dto/core/radio/radio.dto.js';
import type { ProceedingAppealResultDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-appeal.dto';
import type { ProceedingApproverResultDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-approver-result.dto.js';
import type { ProceedingAccusationListDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
import type { ProceedingEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-detail-response.dto';
import type {
    ProceedingIntegrityIdRequestDTO,
    ProceedingStaffDetailRequestDTO,
} from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import type { ProceedingTypeChargeDetailViewResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-type-charge-detail-view-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _chargesListSchema,
    _proceedingAppealSchema,
    _proceedingApproverSchema,
    _proceedingChargeMeetingRequestSchema,
    _proceedingSentencingMeetingSchema,
    _proceedingStaffDetailResponseSchema,
    _proceedingSuspensionCriminalDetailSchema,
    _proceedingSuspensionSchema,
} from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const integrityId: ProceedingIntegrityIdRequestDTO = {
        integrityId: Number(params.integrityId),
    };

    const idRequestBody: ProceedingStaffDetailRequestDTO = {
        integrityId: Number(params.integrityId),
        employeeId: Number(params.employeeId),
    };

    const proceedingStaffDetailResponse: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingStaffDetail(
            idRequestBody,
        );

    const proceedingChargeListResponse: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingListOfCharges(
            integrityId,
        );

    const proceedingTypeChargeDetailViewResponse: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingTypeChargesnDetailsView(
            integrityId,
        );

    const proceedingTypeChargeDetailView: ProceedingTypeChargeDetailViewResponseDTO =
        proceedingTypeChargeDetailViewResponse.data?.details;
    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const proceedingStaffInfoForm = await superValidate(
        proceedingStaffDetailResponse.data
            ?.details as ProceedingEmployeeDetailResponseDTO,
        zod(_proceedingStaffDetailResponseSchema),
        { errors: false },
    );

    const proceedingChargesMeetingForm = await superValidate(
        proceedingTypeChargeDetailView.accusationList,
        zod(_proceedingChargeMeetingRequestSchema),
        { errors: false },
    );

    const proceedingIntegrityDirectorForm = await superValidate(
        proceedingTypeChargeDetailView.confirmation,
        zod(_proceedingApproverSchema),
        { errors: false },
    );

    const proceedingChargesListForm = await superValidate(
        proceedingChargeListResponse.data
            ?.details as ProceedingAccusationListDTO,
        zod(_chargesListSchema),
        { errors: false },
    );

    const proceedingSentencingMeetingForm = await superValidate(
        proceedingTypeChargeDetailView.sentencingDetails,
        zod(_proceedingSentencingMeetingSchema),
        { errors: false },
    );

    const proceedingSentencingConfirmationForm = await superValidate(
        proceedingTypeChargeDetailView.sentencingConfirmation,
        zod(_proceedingApproverSchema),
        { errors: false, id: 'proceedingSentencingConfirmationFormId' },
    );

    // preset sentencing number of charges
    const accusationList = (
        proceedingChargeListResponse.data
            ?.details as ProceedingAccusationListDTO
    )?.accusationList;

    if (accusationList) {
        accusationList.forEach((charge, index) => {
            proceedingSentencingMeetingForm.data.meetingResult[index] = {
                accusationListId: charge.accusationListId,
                result: proceedingTypeChargeDetailView.sentencingDetails
                    ? proceedingSentencingMeetingForm.data.meetingResult[index]
                          .result
                    : false,
                sentencing: proceedingTypeChargeDetailView.sentencingDetails
                    ? proceedingSentencingMeetingForm.data.meetingResult[index]
                          .sentencing
                    : [
                          {
                              emolumenDate: [
                                  {
                                      startDate: null,
                                      endDate: null,
                                  },
                              ],
                          },
                      ],
            };
        });
    }

    const proceedingAppealMeetingForm = await superValidate(
        proceedingTypeChargeDetailView.appealDetails,
        zod(_proceedingAppealSchema),
        { errors: false, id: 'proceedingAppealMeetingFormId' },
    );

    // initializes appeal info with sentencing data
    if (!proceedingTypeChargeDetailView.appealDetails) {
        proceedingAppealMeetingForm.data.result =
            proceedingSentencingMeetingForm.data.meetingResult;
    }

    const proceedingAppealConfirmationForm = await superValidate(
        proceedingTypeChargeDetailView.appealConfirmation,
        zod(_proceedingApproverSchema),
        { errors: false, id: 'proceedingAppealConfirmationFormId' },
    );

    const proceedingSuspensionMeetingForm = await superValidate(
        zod(_proceedingSuspensionSchema),
        { errors: false },
    );

    const proceedingSuspensionCriminalDetailForm = await superValidate(
        zod(_proceedingSuspensionCriminalDetailSchema),
        { errors: false },
    );

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const identityCardColorLookupResponse: CommonResponseDTO =
        await LookupServices.getICTypeEnums();

    const identityCardColorLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            identityCardColorLookupResponse,
        );

    // ===========================================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    // ===========================================================================

    const generalLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    const appealMeetingResultLookup: RadioDTO[] = [
        {
            value: 'Hantar Balik Kes kepada JKTT untuk Dipertimbangkan Semula',
            name: 'Hantar Balik Kes kepada JKTT untuk Dipertimbangkan Semula',
        },
        {
            value: 'Mengesahkan Keputusan JKTT',
            name: 'Mengesahkan Keputusan JKTT',
        },
        {
            value: 'Mengesahkan Keputusan JKTT tetapi Mengubah kepada Hukuman yang Lebih Ringan',
            name: 'Mengesahkan Keputusan JKTT tetapi Mengubah kepada Hukuman yang Lebih Ringan',
        },
    ];

    const proceedingActionOptions: RadioDTO[] = [
        {
            value: 'Batal Tahan Kerja',
            name: 'Batal Tahan Kerja',
        },
        {
            value: 'Prosiding Penentu Hukuman',
            name: 'Prosiding Penentu Hukuman',
        },
        {
            value: 'Rayuan dikemukakan',
            name: 'Rayuan dikemukakan',
        },
    ];

    const salaryMovementCountLookup: DropdownDTO[] = [
        {
            value: 1,
            name: '1',
        },
        {
            value: 2,
            name: '2',
        },
        {
            value: 3,
            name: '3',
        },
    ];

    const salaryMovementDelayMonthCountLookup: DropdownDTO[] = [
        {
            value: 3,
            name: '3',
        },
        {
            value: 6,
            name: '6',
        },
        {
            value: 9,
            name: '9',
        },
        {
            value: 12,
            name: '12',
        },
    ];

    const penaltyCodeLookup: DropdownDTO[] = [
        {
            value: '01',
            name: 'Amaran',
        },
        {
            value: '02',
            name: 'Denda',
        },
        {
            value: '03',
            name: 'Lucut Hak Emolumen',
        },
        {
            value: '04',
            name: 'Tangguh Pergerakan Gaji',
        },
        {
            value: '05',
            name: 'Turun Gaji',
        },
        {
            value: '06',
            name: 'Turun Pangkat',
        },
        {
            value: '07',
            name: 'Buang Kerja',
        },
    ];

    const sentencingMonthLookup: DropdownDTO[] = [];

    for (let month = 12; month <= 36; month++) {
        const option: DropdownDTO = {
            value: month, // Convert month to string if necessary
            name: `${month} bulan`,
        };

        // Add the option to the sentencingMonthLookup array
        sentencingMonthLookup.push(option);
    }

    // ===========================================================================

    return {
        params,
        responses: {
            proceedingStaffDetailResponse,
            proceedingTypeChargeDetailViewResponse,
        },
        view: {
            proceedingTypeChargeDetailView,
        },
        lists: {
            accusationList,
        },
        forms: {
            proceedingStaffInfoForm,
            proceedingChargesMeetingForm,
            proceedingIntegrityDirectorForm,
            proceedingChargesListForm,
            proceedingSentencingMeetingForm,
            proceedingSentencingConfirmationForm,
            proceedingAppealMeetingForm,
            proceedingAppealConfirmationForm,
            proceedingSuspensionMeetingForm,
            proceedingSuspensionCriminalDetailForm,
        },
        lookups: {
            identityCardColorLookup,
            generalLookup,
            penaltyCodeLookup,
            gradeLookup,
            sentencingMonthLookup,
            salaryMovementCountLookup,
            salaryMovementDelayMonthCountLookup,
            appealMeetingResultLookup,
            proceedingActionOptions,
        },
    };
}

export const _addChargeDisciplineSecretaryApproval = async (
    formData: object,
) => {
    const form = await superValidate(formData, zod(_proceedingApproverSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingChargesIntegrityDirectorResult(
            form.data as ProceedingApproverResultDTO,
        );

    return { response };
};

export const _addSentencingMeeting = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_proceedingSentencingMeetingSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const modifiedRequest = {
        integrityId: form.data.integrityId,
        employeeId: form.data.employeeId,
        meetingDate: form.data.meetingDate,
        meetingName: form.data.meetingName,
        meetingCount: form.data.meetingCount,
        meetingCode: form.data.meetingCode,
        meetingResult: [],
    };

    form.data.meetingResult.forEach((val) => {
        const meetingResultItem = {
            accusationListId: val.accusationListId,
            result: val.result,
            sentencing: [],
        };

        val.sentencing.forEach((sentence) => {
            if (sentence.penaltyTypeCode === '01') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                };
                meetingResultItem.sentencing.push(sentencingItem);
            } else if (sentence.penaltyTypeCode === '02') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                    emolumenRight: sentence.emolumenRight,
                };
                meetingResultItem.sentencing.push(sentencingItem);
            } else if (sentence.penaltyTypeCode === '03') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                    emolumenRight: sentence.emolumenRight,
                    emolumenDate: [],
                };

                sentence.emolumenDate.forEach((date) => {
                    const dateItem = {
                        startDate: date.startDate,
                        endDate: date.endDate,
                    };

                    sentencingItem.emolumenDate.push(dateItem);
                });
                meetingResultItem.sentencing.push(sentencingItem);
            } else if (sentence.penaltyTypeCode === '04') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                    duration: sentence.duration,
                };
                meetingResultItem.sentencing.push(sentencingItem);
            } else if (sentence.penaltyTypeCode === '05') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                    salaryMovementCount: sentence.salaryMovementCount,
                    sentencingMonth: sentence.sentencingMonth,
                };
                meetingResultItem.sentencing.push(sentencingItem);
            } else if (sentence.penaltyTypeCode === '06') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                    newGradeCode: sentence.newGradeCode,
                };
                meetingResultItem.sentencing.push(sentencingItem);
            } else if (sentence.penaltyTypeCode === '07') {
                const sentencingItem = {
                    penaltyTypeCode: sentence.penaltyTypeCode,
                    effectiveDate: sentence.effectiveDate,
                };
                meetingResultItem.sentencing.push(sentencingItem);
            }
        });

        modifiedRequest.meetingResult.push(meetingResultItem);
    });

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingSentencing(
            modifiedRequest,
        );

    return { response };
};

export const _addSentencingIntegrityDirectorApproval = async (
    formData: object,
) => {
    const form = await superValidate(formData, zod(_proceedingApproverSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingSentencingIntegrityDirectorResult(
            form.data as ProceedingApproverResultDTO,
        );

    return { response };
};

export const _addSentencingAppealDetail = async (formData: object) => {
    const form = await superValidate(formData, zod(_proceedingAppealSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingAppeal(
            form.data as ProceedingAppealResultDTO,
        );

    return { response };
};

export const _addSentenceAppealConfirmation = async (formData: object) => {
    const form = await superValidate(formData, zod(_proceedingApproverSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingAppealIntegrityDirectorResult(
            form.data as ProceedingApproverResultDTO,
        );

    return { response };
};
