// ===============================================================
// LookupHelper
// ===============================================================

import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import { TextAppearanceHelper } from './text-appearance.helper';

export class LookupHelper {
    static toDropdown(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.code,
            name: lookup.description,
        }));

        return dropdownList;
    }
    static toDropdownProper(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.code,
            name: TextAppearanceHelper.toProper(lookup.description),
        }));

        return dropdownList;
    }

    static toDropdownId(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.description,
        }));

        return dropdownList;
    }

    static toDropdownDescription(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.description,
            name: lookup.description,
        }));

        return dropdownList;
    }

    static toDropdownNameIsCode(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.code,
        }));

        return dropdownList;
    }
}
