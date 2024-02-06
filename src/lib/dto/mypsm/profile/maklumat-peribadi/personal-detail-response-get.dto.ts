export interface GetPersonalDetailResponse {
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


// Converts JSON strings to/from your types
export class GetPersonalDetailResponseConvert {
    public static fromResponse(json: string): GetPersonalDetailResponse {
        return JSON.parse(json);
    }

    public static toJson(value: GetPersonalDetailResponse): string {
        return JSON.stringify(value);
    }
}
