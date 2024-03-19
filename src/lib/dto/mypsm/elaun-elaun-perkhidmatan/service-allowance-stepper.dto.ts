// ================================================================
// Service Allowance Core DTO
// ================================================================

export interface ServiceAllowanceStepperDTO {
    detail: boolean;
    upload: boolean;
    directorFeedback: boolean;
    secretaryCheck: boolean;
    endorserDetail: boolean;
    supporterFeedback: boolean;
    approverFeedback: boolean;
    secretaryVerification: boolean;
    confirmation: boolean;
}

export interface ServiceAllowanceURLDTO {
    detail: string;
    upload: string;
    directorFeedback: string;
    secretaryCheck: string;
    endorserDetail: string;
    supporterFeedback: string;
    approverFeedback: string;
    secretaryVerification: string;
    confirmation: string;
}
