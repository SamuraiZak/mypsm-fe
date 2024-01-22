export interface CandidatePersonalDetailsResponse {
    status:  number;
    message: string;
    data:    CandidatePersonalData;
}

export interface CandidatePersonalData {
    id:                       string;
    genderId:                 null;
    nationalityId:            null;
    religionId:               null;
    raceId:                   number;
    titleId:                  null;
    ethnicId:                 null;
    maritalId:                null;
    birthCountryId:           null;
    birthStateId:             null;
    assetDeclarationStatusId: null;
    name:                     string;
    alternativeName:          string;
    identityDocumentColor:    string;
    identityDocumentNumber:   string;
    email:                    string;
    propertyDeclarationDate:  null;
    birthDate:                null;
    isExPoliceOrSoldier:      boolean;
    isInternalRelationship:   boolean;
    employeeNumber:           string;
    employeeName:             string;
    employeePosition:         string;
    relationshipId:           null;
    isReadonly:               boolean;
}
