import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingAccusationListDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
import type { ProceedingSentencingMeetingRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-create-sentencing-meeting-request.dto';
import type { ProceedingEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-detail-response.dto';
import type {
    ProceedingIntegrityIdRequestDTO,
    ProceedingStaffDetailRequestDTO,
} from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import type { ProceedingTypeChargeDetailViewResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-type-charge-detail-view-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _chargesListSchema,
    _proceedingApproverSchema,
    _proceedingChargeMeetingRequestSchema,
    _proceedingSentencingMeetingSchema,
    _proceedingStaffDetailResponseSchema,
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

    console.log(proceedingSentencingMeetingForm.data)

    const proceedingSentencingConfirmationForm = await superValidate(
        proceedingTypeChargeDetailView.sentencingConfirmation,
        zod(_proceedingApproverSchema),
        { errors: false },
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
                result: false,
                sentencing: [
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

    const penaltyTypeLookup: DropdownDTO[] = [
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

    // ===========================================================================

    return {
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
        },
        lookups: {
            identityCardColorLookup,
            generalLookup,
            penaltyTypeLookup,
        },
    };
}

export const _addSentencingMeeting = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_proceedingSentencingMeetingSchema),
    );

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityProceedingServices.createProceedingSentencing(
            form.data as ProceedingSentencingMeetingRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto(`../../prosiding`);
        }, 1500);

    return { response };
};
