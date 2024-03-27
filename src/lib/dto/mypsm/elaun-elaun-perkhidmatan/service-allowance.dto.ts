// ================================================================
// Service Allowance DTO
// ================================================================

import type { DocumentDTO } from '$lib/dto/core/document/document.dto';

// TODO: Application List DTO
export interface AllowanceApplicationItemDTO {
    allowanceId?: string | null;
    employeeId?: string | null;
    employeeNumber?: string | null;
    name?: string | null;
    identityCardNumber?: string | null;
    allowanceType?: string | null;
    allowanceTypeCode?: string | null;
    category?: string | null;
    applicationDate?: string | null;
    total?: number | null;
    status?: string | null;
    remark?: string | null;
}

// TODO: Application Detail DTO



// TODO: Application Info DTO
// Bantuan Pakaian Istiadat
export interface AllowanceInfoCeremonyDressDTO {
    documents?: DocumentDTO[] | null;
    allowanceId?: number | null;
    allowanceTypeCode?: string | null;
    allowanceType?: string | null;
    reason?: string | null;
    personal?: number | null;
    partner?: number | null;
}

// Bantuan Pakaian Panas
export interface AllowanceInfoWarmClothesDTO {
    documents?: DocumentDTO[] | null;
    allowanceId?: number | null;
    allowanceTypeCode?: string | null;
    allowanceType?: string | null;
    reason?: string | null;
    personal?: number | null;
    partner?: number | null;
}

// Tambang Mengunjungi Wilayah Asal
export interface AllowanceInfoHometownVisitDTO {
    allowanceTypeCode?: string | null;
    allowanceId?: number | null;
    applyCode?: string;
    stateCode?: string;
    familyDetail?: AllowanceFamilyDTO[];
    documents?: Document[];
}

// Bantuan Mengurus Jenazah
export interface AllowanceInfoFuneralDTO {
    documents?: DocumentDTO[] | null;
    allowanceTypeCode?: string | null;
    allowanceId?: number | null;
    deathDate?: string | null;
    deathTime?: string | null;
}

// Tabung Kebajikan Kakitangan
export interface AllowanceInfoWelfareFundDTO {
    documents?: DocumentDTO[] | null;
    allowanceTypeCode?: string | null;
    allowanceId?: number | null;
    welfareTypeCode?: string | null;
}

// Perpindahan Rumah
export interface AllowanceInfoHouseMovingDTO {
    documents?: DocumentDTO[] | null;
    allowanceTypeCode?: string | null;
    allowanceId?: number | null;
    movingDate?: string | null;
    oldAddress?: string | null;
    newAddress?: string | null;
}

// Bayaran Balik Passport
export interface AllowanceInfoPassportClaimDTO {
    documents?: DocumentDTO[] | null;
    allowanceTypeCode?: string | null;
    allowanceId?: number | null;
    renewDate?: Date | null;
    reason?: string | null;
}

// Bayaran Balik Insurans Kesihatan
export interface AllowanceInfoHealthInsuranceDTO {
    documents?: DocumentDTO[] | null;
    allowanceTypeCode?: string | null;
    allowanceId?: number | null;
    regionCode?: string | null;
    insuranceType?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    reason?: string | null;
}

//  Bayaran Balik Pengangkutan Barang Melalui Jalan Darat
export interface AllowanceShippingClaimDTO {
    allowanceTypeCode?: string | null;
    allowanceId?: string | null;
}

// TODO: Family Detail DTO
export interface AllowanceFamilyDTO {
    name?: string | null;
    age?: string | null;
    relationshipCode?: string | null;
}

// TODO: Application Process DTO
