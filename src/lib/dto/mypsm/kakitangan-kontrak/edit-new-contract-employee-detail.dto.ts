export interface EditNewContractEmployeeDetailDTO {
    genderId:                 number;
    nationalityId:            number;
    religionId:               number;
    raceId:                   number;
    titleId:                  number;
    ethnicId:                 number;
    maritalId:                number;
    birthCountryId:           number;
    birthStateId:             number;
    phoneNumber:              string;
    assetDeclarationStatusId: number | null;
    name:                     string;
    alternativeName:          string;
    identityDocumentColor:    string;
    identityDocumentNumber:   string;
    email:                    string;
    propertyDeclarationDate:  string | null;
    birthDate:                string;
    homeAddress:              string;
    homeCountryId:            number;
    homeStateId:              number;
    homeCityId:               number;
    homePostcode:             string;
    mailAddress:              string;
    mailCountryId:            number;
    mailStateId:              number;
    mailCityId:               number;
    mailPostcode:             string;
    isExPoliceOrSoldier:      boolean;
    isInternalRelationship:   boolean;
    employeeNumber:           string | null;
    relationshipId:           number | null;
    isReadonly?:                boolean;
}

// Converts JSON strings to/from your types
export class EditNewContractEmployeeDetailDTOConvert {
    public static fromJson(json: string): EditNewContractEmployeeDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EditNewContractEmployeeDetailDTO): string {
        return JSON.stringify(value);
    }
}