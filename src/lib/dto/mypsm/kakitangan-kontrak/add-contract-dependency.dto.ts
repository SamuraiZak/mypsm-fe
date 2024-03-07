export interface AddNewContractEmployeeDependencyDTO {
    dependencies: ContractDependency[];
}

export interface ContractDependency {
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
export class AddNewContractEmployeeDependencyDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeDependencyDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeDependencyDTO): string {
        return JSON.stringify(value);
    }
}