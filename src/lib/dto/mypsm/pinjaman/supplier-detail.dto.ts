export interface suppliers {
    id:        number;
    suppliers: Supplier[];
}

export interface Supplier {
    name:    string;
    address: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): suppliers {
        return JSON.parse(json);
    }

    public static toJson(value: suppliers): string {
        return JSON.stringify(value);
    }
}