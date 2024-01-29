export interface GetPersonalDetailResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    employeeNumber:     string;
    identityCardNumber: string;
    fullName:           string;
    alternativeName:    string;
    icColour:           string;
    birthDate:          null;
    birthplace:         string;
    nationality:        string;
    race:               string;
    ethnic:             string;
    religion:           string;
    gender:             string;
    marital:            string;
    email:              string;
    houseLoanType:      string;
    houseLoan:          number;
    isExPolice:         boolean;
    isRelatedToLKIM:    boolean;
    relationDetail:     RelationDetail;
}

export interface RelationDetail {
    employeeNumber: string;
    fullName:       string;
    position:       string;
    relationship:   string;
}
