import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";
import type { _documentsSchema, _uploadDocumentsSchema } from "$lib/schemas/mypsm/employment/promotion/promotion-schemas";
import type { z } from "zod";

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
    integritySecretaryStatus: string;
    directorStatus: string;
    remark: string;
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
    promotionId:            number;
    employeeId:             number;
    employeeNo:             string;
    employeeName:           string;
    identityCardNo:         string;
    meetingResult?:          string | null;
    integrityCertification?: string;
    directionCertification?: string;
    gradeNo?:                string;
    positionNo?:             string;
    currentPlacement?:       string;
}

export interface PromotionPlacement {
    promotionId:      number;
    employeeId:       number;
    employeeNo:       string;
    employeeName:     string;
    identityCardNo:   string;
    gradeNo:          string;
    positionNo:       string;
    currentPlacement: string;
    status:           string;
}

export interface PromotionPlacementDetail {
    employeeNumber:        string;
    employeeName:          string;
    promotionDate:         string;
    newGrade:              string;
    salaryMovementMonth:   string;
    firstMinimumSalary:    number;
    firstMaximumSalary:    number;
    firstSalaryRaise:      number;
    secondMinimumSalary:   number;
    secondMaximumSalary:   number;
    secondSalaryRaise:     number;
    currentSalary:      string;
    newSalary:          string;
    currentPlacement:      string;
    newPlacement:          string;
}

export type StaffDocumentDTO = z.infer<typeof _documentsSchema>

export type StaffUploadDocumentDTO = 
{
    id: number;
    promotionType: string;
    document: DocumentBase64RequestDTO[];
    isReadonly: boolean;
    isDraft: boolean;
}

export interface PromotionSalaryAdjustment {
    effectiveDate: string | null;
    currentSalary: number | null;
    newSalary:     number | null;
    remark:        null | string;
}

export interface PromotionSalaryAdjustmentDetail {
    promotionDate: string | null;
    currentSalary: number | null;
    newSalary:     string | null;
    remarks:       string | null;
    attachmentSalaryTable: string | null;
    attachmentOfferLetter: string | null;
}

export interface PromotionDetail {
    promotionId:              number;
    promotionType:            number;
    employeeNo:               string;
    employeeName:             string;
    identityCardNo:           string;
    secretariatCertification: string;
    supporterSupport:         string;
    approverApproval:         string;
}

export interface PromotionProcessDetail {
    id:            number;
    confirmedDate: string;
    approverName:  string;
    supporterName: string;
    status:        boolean;
    remark:        string;
}

export interface PromotionCertificationResult {
    meetingNameCount:      string;
    numberOfMeetings: number;
    meetingDate:      string;
    meetingRemarks:   string;
    meetingResult:    boolean;
    confirmedDate:    string;
    actingEndDate:    string | null;
    gradeRevertDate:  string | null;
    newPlacement:     string | null;
    currentSalary:     number | null;
    newSalary:     number | null;
}

