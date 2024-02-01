// ===============================================================
// Object Helper Functions
// ===============================================================

import type { LookupDTO } from "$lib/dto/core/lookup/lookup.dto";
import type { DropdownOptionsInterface } from "$lib/interfaces/common/dropdown-option";

export class LookupHelper {

    static toDropdown(lookupList: LookupDTO[]){
        const dropdownList: DropdownOptionsInterface[] = 
        lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.description,
        }));

        return dropdownList;
    }
}