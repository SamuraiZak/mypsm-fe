export interface PromotionCommonList {
    groupId?:        number;
    promotionId?:    number;
    promotionType:  string;
    date:           string;
    candidateCount?: number;
    status:         string;
}

// Converts JSON strings to/from your types
export class PromotionCommonListConvert {
    public static toPromotionCommonList(json: string): PromotionCommonList[] {
        return JSON.parse(json);
    }

    public static promotionCommonListToJson(value: PromotionCommonList[]): string {
        return JSON.stringify(value);
    }
}