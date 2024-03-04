import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';

export async function load({ params }) {
    // get allowance type
    let allowanceTypeDropdown: DropdownDTO[] = [];

    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        allowanceTypeDropdown =
            LookupHelper.toDropdownProper(allowanceTypeLookup);
    }

    if (params.id == 'baru') {
        // get current role code
        let currentRoleCode: string =
            localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
            'unknown';
    } else {
    }

    return {
        props: {
            allowanceTypeDropdown,
        },
    };
}
