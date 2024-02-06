export interface GetPersonalDetailResponse {
    status: string;
    data:   Data;
}

export interface Data {
    details: Details;
}

export interface Details {
    employeeNumber:     string;
    identityCardNumber: string;
    fullName:           string;
    alternativeName:    string;
    icColour:           string;
    birthDate:          Date;
    birthplace:         string;
    nationality:        string;
    race:               string;
    ethnic:             string;
    religion:           string;
    gender:             string;
    marital:            string;
    email:              string;
    homeAddress:        string;
    mailAddress:        string;
    houseLoanType:      null;
    houseLoan:          null;
    vehicleLoan:        number;
    isExPolice:         boolean;
    isRelatedToLKIM:    boolean;
    relationDetail:     RelationDetail;
}

export interface RelationDetail {
}
