// ===============================================================
// User Role DTO
// ===============================================================

import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
import type { DropdownDTO } from '../dropdown/dropdown.dto';

export interface UserRoleDTO {
    id: number;
    code: string;
    description: string;
    userGroupCode: string;
}

// Converts JSON strings to/from your types
export class UserRoleConvert {
    public static fromJson(json: string): UserRoleDTO {
        return JSON.parse(json);
    }

    public static toJson(value: UserRoleDTO): string {
        return JSON.stringify(value);
    }

    // convert list of roles to dropdown
    static toDropdown(roleList: UserRoleDTO[]) {
        const dropdownList: DropdownDTO[] = roleList.map((role) => ({
            value: role.code,
            name: TextAppearanceHelper.toCamelCase(role.description),
        }));

        return dropdownList;
    }
}
