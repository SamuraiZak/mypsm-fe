export interface PromotionGroupID {
    groupId: number;
}

// Converts JSON strings to/from your types
export class PromotionGroupIDConvert {
    public static fromJson(json: string): PromotionGroupID {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionGroupID): string {
        return JSON.stringify(value);
    }
}

export interface PromotionCertificationGet {
    id: number;
    promotionType: string;
}

// Converts JSON strings to/from your types
export class PromotionCertificationGetConvert {
    public static fromJson(json: string): PromotionCertificationGet {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionCertificationGet): string {
        return JSON.stringify(value);
    }
}