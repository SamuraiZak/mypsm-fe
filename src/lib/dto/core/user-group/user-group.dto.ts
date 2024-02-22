// ===============================================================
// User Group DTO
// ===============================================================

import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
import type { DropdownDTO } from '../dropdown/dropdown.dto';

export interface UserGroupDTO {
    id?: number;
    code: string;
    description: string;
}

// Converts JSON strings to/from your types
export class UserGroupConvert {
    public static fromJson(json: string): UserGroupDTO {
        return JSON.parse(json);
    }

    public static toJson(value: UserGroupDTO): string {
        return JSON.stringify(value);
    }

    // convert list of groups to dropdown
    static toDropdown(groupList: UserGroupDTO[]) {
        const dropdownList: DropdownDTO[] = groupList.map((group) => ({
            value: group.code,
            name: TextAppearanceHelper.toCamelCase(group.description),
        }));
        return dropdownList;
    }
}
