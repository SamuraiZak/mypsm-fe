import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';

export async function load({ params }) {
    // =====================================================================
    // Step 1: Get allowance type lookup
    // =====================================================================
    let allowanceTypeDropdown: DropdownDTO[] = [];

    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        allowanceTypeDropdown =
            LookupHelper.toDropdownProper(allowanceTypeLookup);
    }

    // =====================================================================
    // Step 2: Setting up the page content based on the id slug
    // =====================================================================
    if (params.id == 'baru') {
        // if this is a new application
        // get current role code
        let currentRoleCode: string =
            localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
            'unknown';
    } else {
        // if this is an existing application
    }

    return {
        props: {
            allowanceTypeDropdown,
        },
    };
}
