/* eslint-disable @typescript-eslint/no-unused-vars */
interface IntActingBatch {
    batchId: number;
    type: string;
    date: string;
    candidateCount: number;
    status: string;
}

interface IntActingIndividual {
    candidateId: number;
    batchId: number;
    employeeId: number;
    employeeName: string;
    employeeIDNumber: string;
    actingGrade: string;
    actingPosition: string;
    qualifierMeetingName: string;
    qualifierMeetingDate: string;
    qualifierMeetingResult: string;
    qualifierMeetingResultApproval: string;
    qualifierMeetingResultApprover: string;
    qualifierMeetingResultSupport: string;
    qualifierMeetingResultSupporter: string;
    interviewDate: string;
    interviewTime: string;
    interviewVenue: string;
    interviewMarks: string;
    interviewResult: string;
    promotionMeetingName: string;
    promotionMeetingDate: string;
    promotionMeetingResult: string;
    suggestedReportingDate: string;
    suggestedPlacement: string;
    postponementApplication: boolean;
    postponementReason: string;
    postponementResult: string;
    requestedReportingDate: string;
    requestedPlacement: string;
    decidedReportingDate: string;
    decidedPlacement: string;
    finalResultApproval: string;
    finalResultApprover: string;
    finalResultSupport: string;
    finalResultSupporter: string;
}
