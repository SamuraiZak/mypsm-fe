export interface AddContractCandidateDetailDTO {
    genderId:                 number;
    nationalityId:            number;
    religionId:               number;
    raceId:                   number;
    titleId:                  number;
    ethnicId:                 number;
    maritalId:                number;
    birthCountryId:           number;
    birthStateId:             number;
    assetDeclarationStatusId?: number;
    name:                     string;
    alternativeName?:          string;
    identityDocumentColor:    string;
    identityDocumentNumber:   string;
    email:                    string;
    propertyDeclarationDate?:  Date;
    birthDate:                Date;
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
    isInternalRelationship?:   boolean;
    employeeNumber:           string;
    relationshipId:           number;
}

// Converts JSON strings to/from your types
export class AddContractCandidateDetailDTOConvert {
    public static fromResponse(json: string): AddContractCandidateDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddContractCandidateDetailDTO): string {
        return JSON.stringify(value);
    }
}