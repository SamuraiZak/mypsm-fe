import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface AddNewContractEmployeeAcademicDTO {
    academics: ContractAcademic[];
    isDraft: boolean;
}

export interface ContractAcademic {
    majorId:          number;
    minorId:          number;
    countryId:        number;
    institutionId:    number;
    educationLevelId: number;
    sponsorshipId:    number;
    name:             string;
    completionDate:   string;
    finalGrade:       string;
    field:            string;
    document: DocumentBase64RequestDTO;
}

// Converts JSON strings to/from your types
export class AddNewContractEmployeeAcademicDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeAcademicDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeAcademicDTO): string {
        return JSON.stringify(value);
    }
}