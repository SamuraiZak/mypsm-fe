import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingCreateChargeRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-create-charges-request.dto';
import type { ProceedingEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-detail-response.dto';
import type { ProceedingStaffDetailRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _proceedingAccusationSchema,
    _proceedingChargeMeetingRequestSchema,
    _proceedingStaffDetailResponseSchema,
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
export async function load({ params, parent }) {
    const { roles } = await parent();

    if (roles.isStaffRole) {
        error(401, { message: 'Akses ditolak' });
    }

    const idRequestBody: ProceedingStaffDetailRequestDTO = {
        integrityId: 0,
        employeeId: Number(params.employeeId),
    };

    const proceedingStaffDetailResponse: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingStaffDetail(
            idRequestBody,
        );

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
        zod(_proceedingChargeMeetingRequestSchema),
        { errors: false },
    );

    const proceedingAccusationModal = await superValidate(
        zod(_proceedingAccusationSchema),
        { errors: false },
    );

    const proceedingSuspensionMeetingForm = await superValidate(
        zod(_proceedingSuspensionSchema),
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

    const suspensionTypeLookup: DropdownDTO[] = [
        {
            value: 'Tahan Kerja - Penyiasatan',
            name: 'Tahan Kerja - Penyiasatan',
        },
        {
            value: 'Tahan Kerja - Prosiding Jenayah',
            name: 'Tahan Kerja - Prosiding Jenayah',
        },
    ];

    // ===========================================================================

    return {
        params,
        proceedingStaffDetailResponse,
        forms: {
            proceedingStaffInfoForm,
            proceedingChargesMeetingForm,
            proceedingSuspensionMeetingForm,
            proceedingAccusationModal,
        },
        lookups: {
            identityCardColorLookup,
            generalLookup,
            suspensionTypeLookup,
        },
    };
}

export const _addChargeDetailForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_proceedingChargeMeetingRequestSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingChargeMeetingResult(
            form.data as ProceedingCreateChargeRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto(`../../prosiding`);
        }, 1500);

    return { response };
};

export const _addSuspensionDetailForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_proceedingSuspensionSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const notGuiltyMeetingDTO = {
        employeeId: form.data.employeeId,
        meetingDate: form.data.meetingDate,
        meetingName: form.data.meetingName,
        meetingCount: form.data.meetingCount,
        meetingCode: form.data.meetingCode,
        suspendMeetingResult: form.data.suspendMeetingResult,
    };

    const suspendedMeetingDTO = {
        employeeId: form.data.employeeId,
        meetingDate: form.data.meetingDate,
        meetingName: form.data.meetingName,
        meetingCount: form.data.meetingCount,
        meetingCode: form.data.meetingCode,
        suspendMeetingResult: form.data.suspendMeetingResult,
        suspensionType: form.data.suspensionType,
        startDate: form.data.startDate,
        endDate: form.data.endDate,
        eligibleEmolumen: form.data.eligibleEmolumen,
    };

    const criminalMeetingDTO = {
        employeeId: form.data.employeeId,
        meetingDate: form.data.meetingDate,
        meetingName: form.data.meetingName,
        meetingCount: form.data.meetingCount,
        meetingCode: form.data.meetingCode,
        suspendMeetingResult: form.data.suspendMeetingResult,
        suspensionType: form.data.suspensionType,
        startDate: form.data.startDate,
        eligibleEmolumen: form.data.eligibleEmolumen,
    };

    const response: CommonResponseDTO = !form.data.suspendMeetingResult
        ? await IntegrityProceedingServices.createProceedingSuspensionNotGuilty(
              notGuiltyMeetingDTO,
          )
        : form.data.suspensionType === 'Tahan Kerja - Penyiasatan'
          ? await IntegrityProceedingServices.createProceedingSuspension(
                suspendedMeetingDTO,
            )
          : await IntegrityProceedingServices.createProceedingCriminal(
                criminalMeetingDTO,
            );

    if (response.status === 'success')
        setTimeout(() => {
            goto(`../../prosiding`);
        }, 1500);

    return { response };
};
