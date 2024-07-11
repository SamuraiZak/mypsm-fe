import type { DocumentDTO } from '$lib/dto/core/document/document.dto';

export interface ServiceAllowanceListItemDTO {
    allowanceId: number | null;
    name: string | null;
    allowanceType: string | null;
    allowanceTypeCode: string | null;
    applicationDate: string | null;
    total: number | null;
    status: string | null;
    remark: string | null;
}

export interface ServiceAllowanceListFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    identityDocumentNumber: string | null;
    allowanceType: string | null;
    applicationDate: string | null;
    status: string | null;
}

// ==================================================
export interface AllowanceCeremonyClothingRequestDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    reason: string;
    personal: number;
    partner: number;
    ceremonyClothingPrevious: boolean;
    ceremonyClothingPreviousDate: string | null;
    blackTiePrevious: boolean;
    blackTiePreviousDate: string | null;
    officialClothingPrevious: boolean;
    officialClothingPreviousDate: string | null;
    isDraft: boolean;
    documents?: DocumentDTO[];
}
