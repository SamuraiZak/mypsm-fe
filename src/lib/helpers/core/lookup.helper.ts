// ===============================================================
// LookupHelper
// ===============================================================

import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
import type { LookupClinic, LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import { TextAppearanceHelper } from './text-appearance.helper';

export class LookupHelper {

    static toDropdown(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.code,
            name: lookup.description,
        }));

        return dropdownList;
    }
    static employeeToDropdown(lookupList: EmployeeLookupItemDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.identityCard,
            name: lookup.name,
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

    static toDropdownProperId(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.id,
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
    static toDropdownGradeId(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.code+ " - "+lookup.description,
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

    static toDropdownCodeAndDesc(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.code+ " - "+lookup.description,
        }));

        return dropdownList;
    }

    static toDropdownBothAreCode(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.code,
            name: lookup.code,
        }));

        return dropdownList;
    }

    static toDropdownDescriptionWithUrl(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.code,
            name: TextAppearanceHelper.toProper(lookup.description),
            url: lookup.url,
        }));

        return dropdownList;
    }

    static toDropdownSuppporterAndApprover(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.employeeId,
            name: lookup.name,
        }));

        return dropdownList;
    }

    static toDropdownSuppporterAndApproverKP(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.identityCard,
            name: lookup.name,
        }));

        return dropdownList;
    }

    static toDropdownSuppporterAndApproverValueIsName(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: lookup.name,
            name: lookup.name,
        }));

        return dropdownList;
    }

    static toDropdownEmploymentStatus(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.occSectorName,
        }));

        return dropdownList;
    }

    //clinic lookup
    static toDropdownClinicList(lookupList: LookupClinic[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.clinicId),
            name: lookup.clinicName,
        }));

        return dropdownList;
    }

    // relationship lookup based on isFamily
    static toDropdownRelationship(lookupList: LookupDTO[]) {
        const dropdownList: DropdownDTO[] = lookupList.map((lookup) => ({
            value: Number(lookup.id),
            name: lookup.description,
            isFamily: lookup.isFamily,
        }));

        return dropdownList;
    }
}
