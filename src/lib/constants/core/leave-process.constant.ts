import type { LeaveApplicationProcessDTO } from '$lib/dto/mypsm/leave/leave.dto';
import { LeaveTypeConstant } from './leave-type.constant';

export class LeaveProcessConstant {
    public static replacementLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.replacementLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        managementFeedback: false,
        meeting: false,
        document: false,
    };
    public static unrecordedLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.unrecordedLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        managementFeedback: false,
        meeting: false,
        document: false,
    };
    public static halfPaidLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.halfPaidLeave,
        applicationDetail: true,
        headOfDirectorFeedback: true,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: false,
        meeting: true,
        document: false,
    };
    public static unpaidLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.unpaidLeave,
        applicationDetail: true,
        headOfDirectorFeedback: true,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static earlyMaternityLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.earlyMaternityLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: false,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static officerMaternityLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.officerMaternityLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: false,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static partnerMaternityLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.partnerMaternityLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static hajiLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.hajiLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static quarantineLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.quarantineLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static unpaidNurseryLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.unpaidNurseryLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: false,
        secretaryVerification: false,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: false,
        meeting: false,
        document: false,
    };
    public static studyLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.studyLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static absenceLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.absenceLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static extendedSickLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.extendedSickLeave,
        applicationDetail: true,
        headOfDirectorFeedback: false,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: true,
        meeting: false,
        document: true,
    };
    public static unpaidFollowPartnerLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.unpaidFollowPartnerLeave,
        applicationDetail: true,
        headOfDirectorFeedback: true,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: false,
        meeting: false,
        document: true,
    };
    public static cancerLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.cancerLeave,
        applicationDetail: true,
        headOfDirectorFeedback: true,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: false,
        meeting: false,
        document: true,
    };
    public static tbLeave: LeaveApplicationProcessDTO = {
        type: LeaveTypeConstant.tbLeave,
        applicationDetail: true,
        headOfDirectorFeedback: true,
        directorFeedback: true,
        secretaryVerification: true,
        endorserDetail: false,
        supporterFeedback: false,
        approverFeedback: false,
        managementFeedback: false,
        meeting: false,
        document: true,
    };

    public static list: LeaveApplicationProcessDTO[] = [
        this.replacementLeave,
        this.unrecordedLeave,
        this.halfPaidLeave,
        this.unpaidLeave,
        this.earlyMaternityLeave,
        this.officerMaternityLeave,
        this.partnerMaternityLeave,
        this.hajiLeave,
        this.quarantineLeave,
        this.unpaidNurseryLeave,
        this.studyLeave,
        this.absenceLeave,
        this.extendedSickLeave,
        this.unpaidFollowPartnerLeave,
        this.cancerLeave,
        this.tbLeave,
    ];
}
