export interface NewOfferEmployeeListDetailResponse {
    employees: Employee[];
}

export interface Employee {
    employeeNumber: string;
    employeeName: string;
    alternativeName: string;
    workStatus: string;
    identityDocumentNumber: string;
    identityDocumentColor: string;
    birthDate: Date;
    birthCountry: string;
    birthState: string;
    nationality: string;
    race: string;
    religion: string;
    gender: string;
    marital: string;
    email: string;
    homeNumber: null;
    phoneNumber: string;
    eligibleLeaveCount: number;
    isExPoliceOrSoldier: boolean;
    isInternalRelationship: boolean;
    relationEmployeeNumber: null;
    relationName: null;
    relationPosition: null;
    relationship: null;
}
