export interface AllowanceApplicationListDTO {
    allowanceId: string;
    employeeId: string;
    employeeNumber: string;
    name: string;
    identityCardNumber: string;
    allowanceType: string;
    allowanceTypeCode: string;
    category: string;
    applicationDate: string;
    total: number;
    status: string;
    remark: string | null;
}

export interface AllowanceApplicationFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    allowanceType: string | null;
    applicationDate: string | null;
    status: string | null;
}

export interface AllowanceStepperDTO {
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

export interface AllowanceTypeDTO{
    id: number;
    code: string;
    description: string;
    url: string;
    stepper: AllowanceStepperDTO;
}
