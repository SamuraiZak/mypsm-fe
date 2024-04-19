export interface QuartersServiceDetail {
    id: number;
    positionId: number;
    gradeId: number;
    workAddress: number;
    paymentAddress: number;
    bank: string;
    salary: number;
}

export interface OutsiderServiceDetail {
    outsiderId: number;
    gradeId: number | null;
    position: string | null;
    officeAddress: string | null;
    employerOfficeAddress: string | null;
    bankName: string | null;
    currentSalary: number | null;
    ITP: number | null;
    COLA: number | null;
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
export class OutsiderServiceDetailDetailConvert {
    public static fromJson(json: string): OutsiderServiceDetail {
        return JSON.parse(json);
    }

    public static toJson(value: OutsiderServiceDetail): string {
        return JSON.stringify(value);
    }
}
