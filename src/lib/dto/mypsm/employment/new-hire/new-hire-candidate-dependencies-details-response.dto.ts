export interface DependenciesData {
    dependenciesList: DependenciesList[];
    isReadonly: boolean;
}

export interface DependenciesList {
    birthCountryId: number;
    birthStateId: number;
    relationshipId: number;
    educationLevelId: number;
    raceId: number;
    nationalityId: number;
    maritalId: number;
    genderId: number;
    name: string;
    alternativeName: string;
    identityDocumentColor: string;
    identityDocumentNumber: string;
    address: string;
    postcode: string;
    birthDate: Date;
    workAddress: string;
    workPostcode: string;
    phoneNumber: string;
    marriageDate: Date;
    inSchool: boolean;
}
