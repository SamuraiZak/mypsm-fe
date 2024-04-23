export interface PersonalDetailDTO {
    employeeNo: string;
    name: string;
    otherName: string;
    identityCard: string;
    identityCardColor: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    race: string;
    religion: string;
    gender: string;
    status: string;
    homeAddress: string;
    mailAddress: string;
    homeNo: string;
    mobileNo: string;
    housing: string;
    houseLoan: string;
    isExPolice: string;
}

export interface ServiceDetailDTO {
    grade: string;
    position: string;
    placement: string;
    serviceLevel: string;
    retirementType: string;
    EPFNumber: string;
    SOCSONumber: string;
    incomeNumber: string;
    bankName: string;
    bankAccount: string;
    program: string;
    leaveEntitlement: number;
    hireByGovermentDate: Date;
    hireByLKIMDate: Date;
    currentServiceStartDate: Date;
    firstServiceConfirmedDate: Date;
    currentServiceConfirmedDate: Date;
    currentActing: string;
    lastSalary: number;
    lastPromotion: string;
    retirementDate: Date;
}


export interface SalaryDetailDTO {
    effectiveDate: Date;
    baseSalary: number;
    ITKA: string;
    ITP: number;
    EPW: number;
    COLA: string;
}


export interface PensionDetailDTO {
    id: number;
    employeeId: number;
    PTBDate: string;
    referenceNumber: string;
    referenceDate: string;
    pensionNumber: string;
    KWAPEmailDate: string;
}

export interface SupportDetailDTO {

    id: number;
    status: boolean;
    remark: string;
 
}

export interface ApproveDetailDTO {
    id: number;
    status: boolean;
    remark: string;
}

// roles Related
export interface AssignRolesRelatedDTO{
    id:            number;
    supporterName: string;
    approverName:  string;
}
export interface RolesRelatedDTO {
    supporterName:   string;
    supportedStatus: string;
    supportedRemark: string;
    supportedDate:   Date;
    approverName:    string;
    approvedStatus:  string;
    approvedRemark:  string;
    approvedDate:    Date;
}

// detail request DTO
export interface ptbKwapApplicationDetailRequestDTO {
    id?: number;
}


export interface ptbKwapApplicationDetail {
    personalDetail: PersonalDetailDTO | null;
    serviceDetail: ServiceDetailDTO | null;
    salaryDetail: SalaryDetailDTO | null;
    pensionDetail: PensionDetailDTO | null;
    supportDetail: SupportDetailDTO | null;
    approveDetail: ApproveDetailDTO | null;
    assignRolesRelated: AssignRolesRelatedDTO | null;

}
