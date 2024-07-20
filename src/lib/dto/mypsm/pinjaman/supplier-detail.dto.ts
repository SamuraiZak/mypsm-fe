

export interface Supplier {
    id:        number;
    suppliers: SupplierElement[];
}

export interface SupplierElement {
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