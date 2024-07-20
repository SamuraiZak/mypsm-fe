

export interface Supplier {
    id:        number;
    price:     number;
    suppliers: SupplierElement[];
}

export interface SupplierElement {
    name:    string;
    address: string;
    price:     number;
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