export interface AddContractNextOfKinDTO {
    nextOfKins: NextOfKin[];
}

export interface NextOfKin {
    birthCountryId:         number;
    birthStateId:           number;
    relationshipId:         number;
    educationLevelId:       number;
    raceId:                 number;
    nationalityId:          number;
    maritalId:              number;
    genderId:               number;
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
    marriageDate:           Date | null;
    inSchool:               boolean;
}

// Converts JSON strings to/from your types
export class AddContractNextOfKinDTOConvert {
    public static fromJson(json: string): AddContractNextOfKinDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddContractNextOfKinDTO): string {
        return JSON.stringify(value);
    }
}