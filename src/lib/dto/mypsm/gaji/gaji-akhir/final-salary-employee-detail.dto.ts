export interface FinalSalaryEmployeeDetail {
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
    propertyDeclarationDate:  string;
    birthDate:                string;
    homeAddress:              string;
    homeCountryId:            string;
    homeStateId:              string;
    homeCityId:               string;
    homePostcode:             string;
    mailAddress:              string;
    mailCountryId:            string;
    mailStateId:              string;
    mailCityId:               string;
    mailPostcode:             string;
    isExPoliceOrSoldier:      boolean;
    isInternalRelationship:   boolean;
    employeeNumber:           string;
    employeeName:             string;
    employeePosition:         string;
    relationshipId:           number;
}

// Converts JSON strings to/from your types
export class FinalSalaryEmployeeDetailConvert {
    public static fromJson(json: string): FinalSalaryEmployeeDetail {
        return JSON.parse(json);
    }

    public static toJson(value: FinalSalaryEmployeeDetail): string {
        return JSON.stringify(value);
    }
}