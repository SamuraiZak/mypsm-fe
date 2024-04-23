export interface PromotionCertification {
    id:               number;
    promotionType:    string;
    meetingNameCount: string;
    meetingResult:    boolean;
    meetingRemark:    string;
    meetingDate:      string;
    confirmedDate:    string;
    actingEndDate:    string;
    gradeRevertDate:  string;
    newPlacement:     string;
}

// Converts JSON strings to/from your types
export class PromotionCertificationConvert {
    public static fromJson(json: string): PromotionCertification {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionCertification): string {
        return JSON.stringify(value);
    }
}

export interface PromotionPlacementEdit {
    id:                  number;
    promotionType:       string;
    promotionDate:       string;
    salaryMovementMonth: string;
    newGrade:            string;
    newPlacement:        string;
}

// Converts JSON strings to/from your types
export class PromotionPlacementEditConvert {
    public static fromJson(json: string): PromotionPlacementEdit {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionPlacementEdit): string {
        return JSON.stringify(value);
    }
}

export interface PromotionEmployeeEdit {
    id:            number;
    promotionType: string;
    confirmedDate: string;
    supporterName: string;
    approverName:  string;
    confirmation:  boolean;
    remark:        string;
}

// Converts JSON strings to/from your types
export class PromotionEmployeeEditConvert {
    public static fromJson(json: string): PromotionEmployeeEdit {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionEmployeeEdit): string {
        return JSON.stringify(value);
    }
}