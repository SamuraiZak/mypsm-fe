// ===============================================================
// RetirementBenefit Constants
// ===============================================================

import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';

export class RetirementBenefitDropdownConstant {
    public static kwsp: DropdownDTO = {
        value: 'kwsp',
        name: 'KWSP',
    };
    public static pencen: DropdownDTO = {
        value: 'pencen',
        name: 'Pencen',
    };

    public static list: DropdownDTO[] = [this.kwsp, this.pencen];
}
