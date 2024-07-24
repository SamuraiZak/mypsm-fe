export interface AddNewPromotion {
    employeeIds:   number[];
    promotionType: string;
    grade: string;
}

// Converts JSON strings to/from your types
export class AddNewPromotionConvert {
    public static fromJson(json: string): AddNewPromotion {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewPromotion): string {
        return JSON.stringify(value);
    }
}
