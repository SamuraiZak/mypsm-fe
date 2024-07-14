export interface GetContractPersonalDetailDTO {
    id?:                       number;
    genderId:                 number;
    nationalityId:            number;
    religionId:               number;
    raceId:                   number;
    titleId:                  number;
    ethnicId:                 number;
    maritalId:                number;
    birthCountryId:           number;
    birthStateId:             number;
    assetDeclarationStatusId: number;
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
    employeeNumber?:           string | null;
    employeeName:            string | null;
    employeePosition?:        string | null;
    relationshipId:           number | null;
    phoneNumber?:              string;
    isReadonly?:              boolean;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class GetContractPersonalDetailDTOConvert {
    public static fromJson(json: string): GetContractPersonalDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: GetContractPersonalDetailDTO): string {
        return JSON.stringify(value);
    }
}