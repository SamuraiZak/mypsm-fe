export interface AddNewContractEmployeeDTO {
    name:           string;
    email:          string;
    identityDocumentNumber: string;
    startContract:  Date | string;
    endContract:    Date | string;
    wageRate:       number;
    designation:    string;
    reportDutyDate: Date | string;
}
// import type { _addNewContractEmployeeSchema } from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas';
// import type { z } from 'zod';
// export type AddNewContractEmployeeDTO = z.infer<typeof _addNewContractEmployeeSchema>;
// Converts JSON strings to/from your types

export class AddNewContractEmployeeDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeDTO): string {
        return JSON.stringify(value);
    }
}
