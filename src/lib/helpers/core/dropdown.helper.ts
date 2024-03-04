// ===============================================================
// Dropdown Helper
// ===============================================================

import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';

export class DropdownHelper {
    static getYearDropdown() {
        // prepate empty dropdown list
        let yearDropdownList: DropdownDTO[] = [];
        // get current year
        const currentYear = new Date().getFullYear();

        let indexYear = currentYear;

        while (indexYear !== currentYear - 10) {
            const tempYear: DropdownDTO = {
                value: indexYear,
                name: indexYear.toString(),
            };

            yearDropdownList.push(tempYear);

            indexYear = indexYear - 1;
        }

        return yearDropdownList;
    }

    static getLeaveStatusDropdown() {
        let leaveStatusDropdown: DropdownDTO[] = [
            {
                value: 'LULUS',
                name: 'Lulus',
            },
            {
                value: 'LAIN-LAIN',
                name: 'Lain-lain',
            },
            {
                value: 'SEMUA',
                name: 'Semua',
            },
        ];

        return leaveStatusDropdown;
    }
}
