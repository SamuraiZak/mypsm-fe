export interface EditNewContractEmployeeDetailDTO {
    genderId:                 number;
    nationalityId:            number;
    religionId:               number;
    raceId:                   number;
    phoneNumber:              string;
    titleId?:                  number | null;
    ethnicId:                 number;
    maritalId:                number;
    birthCountryId:           number;
    birthStateId:             number;
    assetDeclarationStatusId?: number | null;
    name:                     string;
    alternativeName:          string;
    identityDocumentColor:    string;
    identityDocumentNumber:   string;
    email:                    string;
    propertyDeclarationDate?:  Date | null;
    birthDate:                Date | string;
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
    isInternalRelationship?:   boolean | null;
    employeeNumber?:           string | null;
    relationshipId?:           number | null;
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