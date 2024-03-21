// ================================================================
// Service Allowance Common DTO
// ================================================================

// TODO 1: Service Allowance List Item DTO
export interface ServiceAllowanceListItemDTO {
    allowanceId: string | null;
    employeeId: string | null;
    employeeNumber: string | null;
    name: string | null;
    identityCardNumber: string | null;
    allowanceType: string | null;
    allowanceTypeCode: string | null;
    category: string | null;
    applicationDate: Date | null;
    total: number | null;
    status: string | null;
    remark: null | null;
}

export interface ServiceAllowanceListFilterDTO {
    employeeNumber?: string | null;
    name?: string | null;
    allowanceType?: string | null;
    applicationDate?: string | null;
    status?: string | null;
}

// TODO 2: Service Allowance Endorsement DTO
export interface ServiceAllowanceEndorsementDTO {
    allowanceId?: number | null;
    allowanceTypeCode?: string | null;
    name?: string | null;
    remark?: string | null;
    status?: boolean | null;
    statusDescription?: string | null;
}

// TODO 3: Service Allowance
export interface ServiceAllowanceEndorserDetailDTO {
    allowanceId?: number | null;
    allowanceTypeCode?: string | null;
    supporter?: string | null;
    approver?: string | null;
}

// TODO : Service Allowance Document DTO
export interface ServiceAllowanceDocumentDTO {
    name: string;
    base64: string;
}

// TODO: Service Allowance Family Detail DTO
export interface ServiceAllowanceFamilyDetailDTO {
    name?: string;
    age?: number;
    relationshipCode?: string;
}

// ================================================================
// Service Allowance Info DTO
// ================================================================
// Bantuan Pakaian Istiadat
export interface ServiceAllowanceInfoCeremonyDressDTO {
    documents?: Document[] | File[];
    allowanceId?: number | null;
    allowanceTypeCode?: string | null;
    allowanceType?: string | null;
    reason?: string | null;
    personal?: number | null;
    partner?: number | null;
}

// Bantuan Pakaian Panas
export interface ServiceAllowanceInfoWarmClothesDTO {}

// Tambang Mengunjungi Wilayah Asal
export interface ServiceAllowanceInfoHometownVisitDTO {}

// Bantuan Mengurus Jenazah
export interface ServiceAllowanceInfoFuneralDTO {}

// Tabung Kebajikan Kakitangan
export interface ServiceAllowanceInfoWelfareFundDTO {}

// Perpindahan Rumah
export interface ServiceAllowanceInfoHouseMovingDTO {}

// Bayaran Balik Passport
export interface ServiceAllowanceInfoPassportClaimDTO {}

// Bayaran Balik Insurans Kesihatan
export interface ServiceAllowanceInfoHealthInsuranceDTO {}

//  Bayaran Balik Pengangkutan Barang Melalui Jalan Darat
export interface ServiceAllowanceShippingClaimDTO {}

// ================================================================
// Service Allowance Applciation DTO
// ================================================================
export interface ServiceAllowanceApplicationDTO {
    applicationDetail?:
        | ServiceAllowanceInfoCeremonyDressDTO
        | ServiceAllowanceInfoWarmClothesDTO
        | ServiceAllowanceInfoHometownVisitDTO
        | ServiceAllowanceInfoFuneralDTO
        | ServiceAllowanceInfoWelfareFundDTO
        | ServiceAllowanceInfoHouseMovingDTO
        | ServiceAllowanceInfoPassportClaimDTO
        | ServiceAllowanceInfoHealthInsuranceDTO
        | ServiceAllowanceShippingClaimDTO
        | null;
    directorSupport?: ServiceAllowanceEndorsementDTO | null;
    verification?: ServiceAllowanceEndorsementDTO | null;
    supportApprover?: ServiceAllowanceEndorserDetailDTO | null;
    support?: ServiceAllowanceEndorsementDTO | null;
    approval?: ServiceAllowanceEndorsementDTO | null;
    secretaryVerification?: ServiceAllowanceEndorsementDTO | null;
    confirmation?: ServiceAllowanceEndorsementDTO | null;
}
