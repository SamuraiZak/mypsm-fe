// ===============================================================
// Lookup Item DTO
// ===============================================================

export interface LookupItemDTO {
    // general
    id?: number | null;
    code?: string | null;
    description?: string | null;
    typeCode?: string | null;
    // employment status
    occSectorCode?: string | null;
    occSectorName?: string | null;
    // grades
    ssmCode?: string | null;
    minimumSalary?: number | null;
    maximumSalary?: number | null;
    annualIncrementRate?: number | null;
    // sections
    departmentCode?: string | null;
    // units
    sectionCode?: string | null;
}

export interface LookupTypeDTO {
    name: string;
    typeCode: string;
    get: string;
    filterUrl: string;
    add: string;
    edit: string;
}
