export interface PromotionCommonEmployee {
    employeeId:       number;
    employeeNo:       string;
    employeeName:     string;
    identityCardNo:   string;
    programme:        string;
    scheme:           string;
    grade:            string;
    position:         string;
    currentPlacement: string;
    assetDeclaration: string;
}

// Converts JSON strings to/from your types
export class PromotionCommonEmployeeConvert {
    public static fromJson(json: string): PromotionCommonEmployee[] {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionCommonEmployee[]): string {
        return JSON.stringify(value);
    }
}

export interface PromotionCertificationEmployee {
    employeeNo:             string;
    employeeName:           string;
    identityCardNo:         string;
    meetingResult:          string | null;
    integrityCertification: string;
    directionCertification: string;
}