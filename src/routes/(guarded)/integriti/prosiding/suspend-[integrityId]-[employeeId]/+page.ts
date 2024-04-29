import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { RadioDTO } from '$lib/dto/core/radio/radio.dto.js';
import type { ProceedingApproverResultDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-approver-result.dto.js';
import type { ProceedingEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-detail-response.dto';
import type {
    ProceedingIntegrityIdRequestDTO,
    ProceedingStaffDetailRequestDTO,
} from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import type {
    ProceedingSuspensionCriminalCancelRequestDTO,
    ProceedingSuspensionCriminalRequestDTO,
} from '$lib/dto/mypsm/integrity/proceeding/proceeding-suspension-criminal.dto';
import type { ProceedingSuspensionViewResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-suspension.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _proceedingApproverSchema,
    _proceedingStaffDetailResponseSchema,
    _proceedingSuspensionCriminalCancelSchema,
    _proceedingSuspensionCriminalDetailSchema,
    _proceedingSuspensionViewSchema,
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

    const proceedingTypeSuspensionDetailViewResponse: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingTypeSuspensionDetailsView(
            integrityId,
        );

    const proceedingTypeSuspensionView: ProceedingSuspensionViewResponseDTO =
        proceedingTypeSuspensionDetailViewResponse.data?.details;

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const proceedingStaffInfoForm = await superValidate(
        proceedingStaffDetailResponse.data
            ?.details as ProceedingEmployeeDetailResponseDTO,
        zod(_proceedingStaffDetailResponseSchema),
        { errors: false },
    );

    const proceedingSuspendsConfirmationForm = await superValidate(
        proceedingTypeSuspensionView.confirmation,
        zod(_proceedingApproverSchema),
        { errors: false, id: 'proceedingSentencingConfirmationFormId' },
    );

    const proceedingSuspensionMeetingForm = await superValidate(
        proceedingTypeSuspensionView,
        zod(_proceedingSuspensionViewSchema),
        { errors: false },
    );

    const proceedingSuspensionCriminalDetailForm = await superValidate(
        proceedingTypeSuspensionView.editCriminalDetail,
        zod(_proceedingSuspensionCriminalDetailSchema),
        { errors: false },
    );

    const proceedingCriminalEndGantungKerjaForm = await superValidate(
        proceedingTypeSuspensionView.cancelCriminalDetail,
        zod(_proceedingSuspensionCriminalCancelSchema),
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
            value: String(month), // Convert month to string if necessary
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
        },
        view: {
            proceedingTypeSuspensionView,
        },
        forms: {
            proceedingStaffInfoForm,
            proceedingSuspendsConfirmationForm,
            proceedingSuspensionMeetingForm,
            proceedingSuspensionCriminalDetailForm,
            proceedingCriminalEndGantungKerjaForm,
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

export const _addSuspendsIntegrityDirectorConfirmation = async (
    formData: object,
) => {
    const form = await superValidate(formData, zod(_proceedingApproverSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createIntegrityDirectorSuspendsConfirmation(
            form.data as ProceedingApproverResultDTO,
        );

    return { response };
};

export const _addCriminalCancelIntegrityDirectorConfirmation = async (
    formData: object,
) => {
    const form = await superValidate(formData, zod(_proceedingApproverSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createIntegrityDirectorCriminalConfirmation(
            form.data as ProceedingApproverResultDTO,
        );

    return { response };
};

export const _updateSuspensionCriminalDetail = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_proceedingSuspensionCriminalDetailSchema),
    );
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.updateProceedingCriminalDetail(
            form.data as ProceedingSuspensionCriminalRequestDTO,
        );

    return { response };
};

export const _updateSuspensionCriminalCancelDetail = async (
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_proceedingSuspensionCriminalCancelSchema),
    );

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.updateProceedingCriminalCancelDetail(
            form.data as ProceedingSuspensionCriminalCancelRequestDTO,
        );

    return { response };
};

export const _addSentencingIntegrityDirectorApproval = async (
    formData: object,
) => {
    const form = await superValidate(formData, zod(_proceedingApproverSchema));

    console.log(form);

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
