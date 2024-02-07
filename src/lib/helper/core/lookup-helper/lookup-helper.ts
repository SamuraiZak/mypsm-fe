// ===============================================================
// Object Helper Functions
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
import type { RoleOption } from '$lib/view-models/core/role-option/role-option.view-model';
import { TextHelper } from '../text-helper/text-helper';

export class LookupHelper {
    static toDropdown(lookupList: LookupDTO[]) {
        const dropdownList: DropdownOptionsInterface[] = lookupList.map(
            (lookup) => ({
                value: Number(lookup.id),
                name: lookup.description ?? '',
            }),
        );

        return dropdownList;
    }

    static toStringDropdown(lookupList: LookupDTO[]) {
        const dropdownList: DropdownOptionsInterface[] = lookupList.map(
            (lookup) => ({
                value: lookup.description ?? '',
                name: lookup.description ?? '',
            }),
        );

        return dropdownList;
    }
    static toRoleOption(lookupList: LookupDTO[]) {
        let roles: RoleOption[] = [];

        lookupList.forEach((element) => {
            let tempRole: RoleOption = {
                value: element.name ?? '',
                name: TextHelper.toCamelCase(element.name!) ?? '',
            };

            roles.push(tempRole);
        });

        return roles;
    }
}
