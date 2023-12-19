/* eslint-disable @typescript-eslint/no-unused-vars */
interface IntPromotion {
    grade: string;
    groupId: string;
    date: string;
    candidateAmount: number;
    status: string;
}
interface IntPromotionCandidate {
    promotionId: number;
    employeeNumber: string;
    name: string;
    identityDocumentNumber: string;
    program: string;
    scheme: string;
    gradeId: number;
    positionId: number;
    placement: string;
    assetDeclaration: string;
    academicLoanPledge: string;
    meetingResult: string;
    integritySecretariatCertification: string;
    districtOrStateDirectorCertification: string;
    currentPlacement: string;
}

interface IntPromotionCandidateDetail {
    id: number;
    employeeNumber: string;
    employeeName: string;
    identityDocumentNumber: string;
    secretariatConfirmation: string;
    supporterSupport: string;
    approverApproval: string;
}

interface IntPromotionCandidateSupporterView {
    id: number;
    employeeNumber: string;
    employeeName: string;
    identityDocumentNumber: string;
    scheme: string;
    grade: string;
    currentPlacement: string;
    employeeProfile: string;
    status: string;
    remark: string;
}
