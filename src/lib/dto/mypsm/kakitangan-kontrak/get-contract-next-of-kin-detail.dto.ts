export interface GetContractNextOfKinDetailDTO {
    nextOfKinList: NextOfKinList[];
    isReadonly:    boolean;
}

export interface NextOfKinList {
    birthCountryId:         number;
    birthStateId:           number;
    relationshipId:         number;
    educationLevelId:       number;
    raceId:                 number;
    nationalityId:          number;
    maritalId:              number;
    genderId:               number;
    name:                   string;
    alternativeName:        null;
    identityDocumentColor:  string;
    identityDocumentNumber: string;
    address:                string;
    postcode:               string;
    birthDate:              Date;
    workAddress:            string;
    workPostcode:           string;
    phoneNumber:            string;
    marriageDate:           Date;
    inSchool:               boolean;
}
