import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingAccusationListDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
import type { ProceedingEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-detail-response.dto';
import type {
    ProceedingIntegrityIdRequestDTO,
    ProceedingStaffDetailRequestDTO,
} from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import {
    _chargesListSchema,
    _proceedingApproverSchema,
    _proceedingChargeMeetingRequestSchema,
    _proceedingSentencingMeetingSchema,
    _proceedingStaffDetailResponseSchema,
    _sentenceSchema,
} from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';
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

    const proceedingIntegrityDirectorForm = await superValidate(
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
        zod(_proceedingSentencingMeetingSchema),
        { errors: false },
    );

    const addSentenceForm = await superValidate(zod(_sentenceSchema), {
        errors: false,
    });

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
                        penaltyTypeCode: '',
                        effectiveDate: new Date().toDateString(),
                        emolumenDate: [
                            {
                                startDate: new Date().toDateString(),
                                endDate: new Date().toDateString(),
                            },
                        ],
                    },
                ],
                // Add other properties if necessary
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
        },
        forms: {
            proceedingStaffInfoForm,
            proceedingChargesMeetingForm,
            proceedingIntegrityDirectorForm,
            proceedingChargesListForm,
            proceedingSentencingMeetingForm,
            addSentenceForm,
        },
        lookups: {
            identityCardColorLookup,
            generalLookup,
            penaltyTypeLookup,
        },
    };
}
