export interface GetPersonalFamilyResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    familyList: FamilyList[];
}

export interface FamilyList {
    id:                     string;
    birthCountry:           string;
    birthState:             string;
    relationship:           string;
    educationLevel:         string;
    race:                   string;
    nationality:            string;
    marital:                string;
    gender:                 string;
    name:                   null | string;
    alternativeName:        string;
    identityDocumentColor:  string;
    identityDocumentNumber: null | string;
    address:                string;
    postcode:               string;
    birthDate:              Date;
    workAddress:            string;
    workPostcode:           string;
    phoneNumber:            string;
    marriageDate:           Date;
    inSchool:               boolean;
}
