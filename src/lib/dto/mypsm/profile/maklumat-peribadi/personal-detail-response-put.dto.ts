export interface PutPersonalDetailResponse {
    status: string;
    data:   Data;
}

export interface Data {
    details: Details;
}

export interface Details {
    id:              string;
    employeeNumber:  string;
    fullName:        string;
    alternativeName: string;
    icColour:        string;
    birthDate:       Date;
    birthplace:      string;
    nationality:     string;
    race:            string;
    ethnic:          string;
    religion:        string;
    gender:          string;
    marital:         string;
    homeAddress:     string;
    mailAddress:     string;
    houseLoanType:   string;
    houseLoan:       number;
    isExPolice:      null;
    isRelatedToLKIM: boolean;
    relationDetail:  RelationDetail;
}

export interface RelationDetail {
    employeeNumber: string;
    fullName:       string;
    position:       string;
    relationship:   string;
}
