export interface EmployeeFinalSalaryDetailDTO {
    id:                       number;
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
    propertyDeclarationDate:  Date;
    birthDate:                Date;
    homeAddress:              string;
    homeCountryId:            null;
    homeStateId:              null;
    homeCityId:               null;
    homePostcode:             string;
    mailAddress:              string;
    mailCountryId:            null;
    mailStateId:              null;
    mailCityId:               null;
    mailPostcode:             string;
    isExPoliceOrSoldier:      boolean;
    isInternalRelationship:   boolean;
    employeeNumber:           string;
    employeeName:             string;
    employeePosition:         string;
    relationshipId:           null;
}

// Converts JSON strings to/from your types
export class EmployeeFinalSalaryDetailDTOConvert {
    public static toEmployeeFinalSalaryDetailDTO(json: string): EmployeeFinalSalaryDetailDTO {
        return JSON.parse(json);
    }

    public static employeeFinalSalaryDetailDTOToJson(value: EmployeeFinalSalaryDetailDTO): string {
        return JSON.stringify(value);
    }
}
