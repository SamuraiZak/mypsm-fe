export interface CandidatePersonalDetailsResponse {
    status: number;
    message: string;
    data: CandidatePersonalData;
}

export interface CandidatePersonalData {
    id: number;
    genderId: number;
    nationalityId: number;
    religionId: number;
    raceId: number;
    titleId: number;
    ethnicId: number;
    maritalId: number;
    birthCountryId: number;
    birthStateId: number;
    assetDeclarationStatusId: number;
    name: string;
    alternativeName: string;
    identityDocumentColor: string;
    identityDocumentNumber: string;
    email: string;
    propertyDeclarationDate: Date;
    birthDate: Date;
    homeAddress: string;
    homeCountryId: number;
    homeStateId: number;
    homeCityId: number;
    homePostcode: string;
    mailAddress: string;
    mailCountryId: number;
    mailStateId: number;
    mailCityId: number;
    mailPostcode: string;
    isExPoliceOrSoldier: boolean;
    isInternalRelationship: boolean;
    employeeNumber: string;
    employeeName: string;
    employeePosition: string;
    relationshipId: number;
    isReadonly: boolean;
}
