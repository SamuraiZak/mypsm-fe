// =================================================================
// Service Allowance Employee Info Response View Model
// =================================================================

export interface AllowanceEmployeeResponseViewModel {
    status:  number;
    message: string;
    data:    AllowanceEmployeeResponseData;
}

export interface AllowanceEmployeeResponseData {
    fullName:           string;
    alternateName:      string;
    identityCardNumber: string;
    identityCardColor:  string;
    employeeNumber:     string;
    dateOfBirth:        string;
    placeOfBirth:       string;
    citizenship:        string;
    race:               string;
    religion:           string;
    gender:             string;
    maritalStatus:      string;
    homeAddress:        string;
    mailingAddress:     string;
    homePhoneNumber:    string;
    mobilePhoneNumber:  string;
    housingScheme:      string;
    housingLoan:        string;
    vehicleLoan:        string;
    isExMilitary:       boolean;
}

// Converts JSON strings to/from your types
export class AllowanceEmployeeResponseConvert {

    // to model from response
    public static fromResponse(response: Response): AllowanceEmployeeResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): AllowanceEmployeeResponseViewModel {
        return JSON.parse(json);
    }

    // to jsons tring from model
    public static toJson(value: AllowanceEmployeeResponseViewModel): string {
        return JSON.stringify(value);
    }
}