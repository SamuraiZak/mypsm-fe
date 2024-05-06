import type { DocumentDTO } from '$lib/dto/core/document/document.dto';

export interface ForcedRetirementDetailRequestDTO {
    retirementId: number;
}

// force retirement list item
export interface ForcedRetirementListItemDTO {
    retirementId: number;
    employeeNumber: string;
    position: string;
    name: string;
    retirementDate: string;
    earlyRetirementDate: string;
    currentPlacement: string;
    retirementType: string;
    status: string;
}

// force retirement list filter
export interface ForcedRetirementListFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    identityCardNumber: string | null;
    applicationDate: string | null;
}

// force retirement endorsement
export interface ForcedRetirementEndorsementDTO {
    retirementId: number;
    name: string;
    remark: string;
    status: boolean;
}

// forced retirement application detail
export interface ForcedRetirementApplicationDetailDTO {
    certification: ForcedRetirementEndorsementDTO | null;
    confirmation: ForcedRetirementEndorsementDTO | null;
    forms: DocumentDTO[] | null;
    approval: ForcedRetirementEndorsementDTO | null;
    letter: DocumentDTO | null;
}
