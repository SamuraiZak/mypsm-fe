export interface PersonalDetailDTO {
    employeeNo:        string;
    name:              string;
    otherName:         string;
    identityCard:      string;
    identityCardColor: string;
    dateOfBirth:       Date;
    placeOfBirth:      string;
    nationality:       string;
    race:              string;
    religion:          string;
    gender:            string;
    status:            string;
    homeAddress:       string;
    mailAddress:       string;
    homeNo:            string;
    mobileNo:          string;
    housing:           string;
    houseLoan:         string;
    isExPolice:        string;
}

// Converts JSON strings to/from your types
export class PersonalDetailDTOConvert {
    public static fromJson(json: string): PersonalDetailDTOConvert {
        return JSON.parse(json);
    }

    public static toJson(value: PersonalDetailDTOConvert): string {
        return JSON.stringify(value);
    }
}