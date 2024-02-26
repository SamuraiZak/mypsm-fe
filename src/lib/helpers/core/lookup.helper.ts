// ===============================================================
// LookupHelper
// ===============================================================

import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class LookupHelper {
    static toDropdown(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.code,
            name: lookup.description,
        }));

        return dropdownList;
    }

    static toDropdownId(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.id,
            name: lookup.description,
        }));

        return dropdownList;
    }
}
