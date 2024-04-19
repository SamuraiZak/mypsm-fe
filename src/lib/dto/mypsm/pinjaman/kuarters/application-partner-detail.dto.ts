export interface QuartersPartnerDetail {
    id: number;
    name: string;
    phoneNumber: string;
    position: string;
    salary: number;
    numberOfDependents: number;
}

export interface OutsiderFamily {
    outsiderId: number;
    name: string | null;
    phoneNumber: string | null;
    position: string | null;
    currentSalary: number | null;
    totalChildren: string | null;
}

// Converts JSON strings to/from your types
export class QuartersPartnerDetailConvert {
    public static fromJson(json: string): QuartersPartnerDetail {
        return JSON.parse(json);
    }

    public static toJson(value: QuartersPartnerDetail): string {
        return JSON.stringify(value);
    }
}
export class OutsiderFamilyConvert {
    public static fromJson(json: string): OutsiderFamily {
        return JSON.parse(json);
    }

    public static toJson(value: OutsiderFamily): string {
        return JSON.stringify(value);
    }
}