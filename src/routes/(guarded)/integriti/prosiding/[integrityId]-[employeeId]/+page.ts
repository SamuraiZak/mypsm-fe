import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-detail-response.dto';
import type { ProceedingStaffDetailRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-staff-detail-request.dto';
import { _proceedingStaffDetailResponseSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
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

    const idRequestBody: ProceedingStaffDetailRequestDTO = {
        integrityId: Number(params.integrityId),
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
        proceedingStaffDetailResponse,
        proceedingStaffInfoForm,
        lookups: {
            identityCardColorLookup,
            generalLookup,
        },
    };
}
