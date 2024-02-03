export interface AddOtherLeavesRequest {
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    academicQualification?: string;
    professionalQualification?: string;
    courseTaken?: string;
    institution?: string;
}
