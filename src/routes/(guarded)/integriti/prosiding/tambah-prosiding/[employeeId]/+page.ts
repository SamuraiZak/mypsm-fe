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
} from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    // const currentRoleCode = localStorage.getItem(
    //     LocalStorageKeyConstant.currentRoleCode,
    // );

    // const isCourseSecretaryRole =
    //     currentRoleCode === RoleConstant.urusSetiaLatihan.code;

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
        },
    };
}

export const _addStateUnitSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_proceedingChargeMeetingRequestSchema),
    );

    console.log(form);

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