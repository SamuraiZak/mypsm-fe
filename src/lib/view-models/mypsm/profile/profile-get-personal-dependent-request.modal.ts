export interface GetPersonalDependentResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    dependentList: DependentList[];
}

export interface DependentList {
    id:                     string;
    birthCountry:           string;
    birthState:             string;
    relationship:           string;
    educationLevel:         string;
    race:                   string;
    nationality:            string;
    marital:                string;
    gender:                 string;
    name:                   string;
    alternativeName:        string;
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
