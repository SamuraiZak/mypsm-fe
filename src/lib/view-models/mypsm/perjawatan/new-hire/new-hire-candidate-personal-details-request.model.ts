export interface CandidatePersonalDetailsRequestBody {
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
    isExPoliceOrSoldier: boolean;
    isInternalRelationship: boolean;
    employeeNumber: string;
    relationshipId: number;
}
