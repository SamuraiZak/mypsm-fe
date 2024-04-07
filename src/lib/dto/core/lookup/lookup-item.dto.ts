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

export interface LookupDetailsDTO{
    // common
    id?: number;
    code?: string;
    description: string;

    // district
    divisionCode?: string;

    // meeting
    module?: string;
    subModule?: string;

    // relationship
    isFamily?: boolean;

    // country
    countryId?: string;

    // employment status
    occSectorCode?: string;
    occSectorName?: string;

    // grade
    ssmCode?: string;
    minimumSalary?: number;
    maximumSalary?: number;
    annualIncrementRate?: number;

    // section
    departmentCode?: string;
    
}
export interface LookupFilterDTO{
    // common
    id?: number | null;
    code?: string | null;
    description: string | null;

    // district
    divisionCode?: string | null;

    // meeting
    module?: string | null;
    subModule?: string | null;

    // relationship
    isFamily?: boolean | null;

    // country
    countryId?: string | null;

    // employment status
    occSectorCode?: string | null;
    occSectorName?: string | null;

    // grade
    ssmCode?: string | null;
    minimumSalary?: number | null;
    maximumSalary?: number | null;
    annualIncrementRate?: number | null;

    // section
    departmentCode?: string | null;
    
}

export interface LookupTypeDTO {
    name: string;
    typeCode: string;
    get: string;
    filterUrl: string;
    add: string;
    edit: string;
}

export interface LookupCategoryDTO {
    name: string;
    url: string;
}
