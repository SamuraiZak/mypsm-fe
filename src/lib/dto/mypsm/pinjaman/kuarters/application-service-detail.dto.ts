export interface QuartersServiceDetail {
    id: number;
    positionId: number;
    gradeId: number;
    workAddress: number;
    paymentAddress: number;
    bank: string;
    salary: number;
}

// Converts JSON strings to/from your types
export class QuartersServiceDetailConvert {
    public static fromJson(json: string): QuartersServiceDetail {
        return JSON.parse(json);
    }

    public static toJson(value: QuartersServiceDetail): string {
        return JSON.stringify(value);
    }
}
