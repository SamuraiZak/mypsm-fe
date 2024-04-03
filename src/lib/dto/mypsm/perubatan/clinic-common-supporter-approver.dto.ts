export interface ClinicSetSupporterApprover {
    id:            number;
    supporterName: string;
    approverName:  string;
}

// Converts JSON strings to/from your types
export class ClinicSetSupporterApproverConvert {
    public static fromJson(json: string): ClinicSetSupporterApprover {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicSetSupporterApprover): string {
        return JSON.stringify(value);
    }
}