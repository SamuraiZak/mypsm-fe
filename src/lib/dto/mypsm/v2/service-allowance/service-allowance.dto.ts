export interface ServiceAllowanceListItemDTO {
    allowanceId:       number | null;
    name:              string | null;
    allowanceType:     string | null;
    allowanceTypeCode: string | null;
    applicationDate:   string | null;
    total:             number | null;
    status:            string | null;
    remark:            string | null;
}

export interface ServiceAllowanceListFilterDTO {
    employeeNumber:         string | null;
    name:                   string | null;
    identityDocumentNumber: string | null;
    allowanceType:          string | null;
    applicationDate:        string | null;
    status:                 string | null;
}
