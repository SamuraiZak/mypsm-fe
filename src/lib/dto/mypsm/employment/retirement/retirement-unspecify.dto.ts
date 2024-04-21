// ======================================================
//  ADD FORCED
// ======================================================


export interface AddRetirementUnspecifyDetail {
    details: Details;
}

export interface Details {
    groupID:      number;
    employeeList: number[];
}

// ======================================================
// UPDATE FORCED
// ======================================================

export interface UpdtaeRetirementUnspecifyDetail {
    updateList: UpdateList[];
}

export interface UpdateList {
    groupID:            number;
    employeeID:         number;
    employeeNumber:     string;
    employeeName:       string;
    identityCardNumber: string;
    retirementTypeID:   number;
    retirementDate:     Date;
}


// ======================================================
// DOCUMENT CERTIFICATION
// ======================================================

export interface UpdateRetirementUnspecifyDocumentDetail {
    details: DocumentDetails;
}

export interface DocumentDetails {
    updateList: DocumentUpdateList[];
}

export interface DocumentUpdateList {
    groupID:    number;
    employeeID: number;
    remark:     string;
    status:     boolean;
}