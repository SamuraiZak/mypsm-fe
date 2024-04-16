

export interface Supplier {
    name:    string;
    address: string;
}

// Converts JSON strings to/from your types
export class suppliersConvert {
    public static fromJson(json: string): Supplier {
        return JSON.parse(json);
    }

    public static toJson(value: Supplier): string {
        return JSON.stringify(value);
    }
}