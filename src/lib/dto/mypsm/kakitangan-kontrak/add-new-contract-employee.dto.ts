export interface AddNewContractEmployeeDTO {
    candidateId?:    number;
    id?:            number | null;
    name:           string;
    email:          string;
    startContract:  string;
    endContract:    string;
    identityDocumentNumber: string;
    wageRate:       number;
    designation:    string;
    reportDutyDate: string;
    isDraft: boolean;
}
// Converts JSON strings to/from your types

export class AddNewContractEmployeeDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeDTO): string {
        return JSON.stringify(value);
    }
}
