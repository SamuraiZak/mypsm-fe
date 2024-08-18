import * as z from 'zod';

// employeen detail
export const TransferApplicationEmployeeDetailSchema = z.object({
    name: z.string(),
    identityDocumentNumber: z.string(),
    employeeNumber: z.string(),
    phone: z.string(),
    maritalStatus: z.string(),
    childCount: z.number(),
    childInSchoolCount: z.number(),
});
export type TransferApplicationEmployeeDetailType = z.infer<
    typeof TransferApplicationEmployeeDetailSchema
>;

// service detail
export const TransferApplicationServiceDetailSchema = z.object({
    position: z.string(),
    grade: z.string(),
    hiringDate: z.string(),
    officeName: z.string(),
    officeAddress: z.string(),
    department: z.string(),
    servicePeriod: z.number(),
});
export type TransferApplicationServiceDetailType = z.infer<
    typeof TransferApplicationServiceDetailSchema
>;

// document
export const DocumentSchema = z.object({
    name: z.string(),
    base64: z.string(),
});
export type DocumentType = z.infer<typeof DocumentSchema>;

// transfer detail
export const TransferApplicationTransferDetailSchema = z.object({
    applicationId: z.number().nullish(),
    category: z.array(z.string()),
    transferType: z.string(),
    employeeId: z.number().nullish(),
    appliedLocation: z.string(),
    reason: z.array(z.string()),
    remark: z.string().nullish(),
    workPlaceDistance: z.number().nullish(),
    employerName: z.string().nullish(),
    startDate: z.string().nullish(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});
export type TransferApplicationTransferDetailType = z.infer<
    typeof TransferApplicationTransferDetailSchema
>;

// confirmation
export const TransferApplicationConfirmationSchema = z.object({
    applicationId: z.number().nullish(),
    status: z.boolean(),
    date: z.string().nullish(), 
});
export type TransferApplicationConfirmationType = z.infer<
    typeof TransferApplicationConfirmationSchema
>;

// assign director
export const TransferApplicationAssignDirectorSchema = z.object({
    applicationId: z.number().nullish(),
    directorName: z.string().nullish(),
    roleCode: z.string().nullish(),
    identityDocumentNumber: z.string(),
    isDraft: z.boolean().nullish(),
});
export type TransferApplicationAssignDirectorType = z.infer<
    typeof TransferApplicationAssignDirectorSchema
>;

// director support
export const EthicalIssueSchema = z.object({
    punishment: z.string(),
    date: z.string(),
});
export type EthicalIssueType = z.infer<typeof EthicalIssueSchema>;

export const TransferApplicationDirectorSupportSchema = z.object({
    applicationId: z.number().nullish(),
    feedback: z.string(),
    remark: z.string(),
    ethicalIssues: z.array(EthicalIssueSchema),
    name: z.string().nullish(),
    identityDocumentNumber: z.string(),
    date: z.string(),
    isDraft: z.boolean(),
});
export type TransferApplicationDirectorSupportType = z.infer<
    typeof TransferApplicationDirectorSupportSchema
>;

// meeting result schema
export const TransferApplicationMeetingResultSchema = z.object({
    applicationId: z.number().nullish(),
    meetingDate: z.string(),
    meetingName: z.string(),
    status: z.boolean().nullish(),
    remark: z.string().nullish(),
});
export type TransferApplicationMeetingResultType = z.infer<
    typeof TransferApplicationMeetingResultSchema
>;

// acceptance letter detail
export const TransferApplicationAcceptanceLetterDetailSchema = z.object({
    applicationId: z.number().nullish(),
    referenceNumber: z.string(),
    referenceDate: z.string(),
    subject: z.string(),
    fromLocation: z.string(),
    toLocation: z.string(),
    additionalNotes: z.string(),
    transferDate: z.string(),
    newLocationAddress: z.string(),
});
export type TransferApplicationAcceptanceLetterDetailType = z.infer<
    typeof TransferApplicationAcceptanceLetterDetailSchema
>;

// posptoneDetails
export const TransferApplicationPostponeDetailSchema = z.object({
    applicationId: z.number().nullish(),
    status: z.boolean(),
    remark: z.string(),
    documents: z.array(DocumentSchema),
    date: z.string().nullish(),
});
export type TransferApplicationPostponeDetailType = z.infer<
    typeof TransferApplicationPostponeDetailSchema
>;

// assign postpone approver
export const TransferApplicationAssignPostponeApproverSchema = z.object({
    applicationId: z.number().nullish(),
    directorName: z.string().nullish(),
    roleCode: z.string().nullish(),
    identityDocumentNumber: z.string(),
});
export type TransferApplicationAssignPostponeApproverType = z.infer<
    typeof TransferApplicationAssignPostponeApproverSchema
>;

// postpone letter detail
export const TransferApplicationPostponeLetterDetailSchema = z.object({
    applicationId: z.number().nullish(),
    referenceNumber: z.string(),
    referenceDate: z.string(),
    subject: z.string(),
    fromLocation: z.string(),
    toLocation: z.string(),
    additionalNotes: z.string(),
    transferDate: z.string(),
    newLocationAddress: z.string(),
    isDraft: z.boolean(),
});
export type TransferApplicationPostponeLetterDetailType = z.infer<
    typeof TransferApplicationPostponeLetterDetailSchema
>;

// transfer document
export const TransferApplicationTransferDocumentSchema = z.object({
    documents: z.array(DocumentSchema),
    applicationId: z.number().nullish(),
    isDraft: z.boolean(),
});
export type TransferApplicationTransferDocumentType = z.infer<
    typeof TransferApplicationTransferDocumentSchema
>;

// endorser detail
export const TransferApplicationEndorserDetailSchema = z.object({
    applicationId: z.number().nullish(),
    supporterName: z.string().nullish(),
    supporterRoleCode: z.string().nullish(),
    supporterIdentityDocumentNumber: z.string(),
    approverName: z.string().nullish(),
    approverRoleCode: z.string().nullish(),
    approverIdentityDocumentNumber: z.string(),
    isDraft: z.boolean(),
});
export type TransferApplicationEndorserDetailType = z.infer<
    typeof TransferApplicationEndorserDetailSchema
>;

// endorsement
export const TransferApplicationEndorsementSchema = z.object({
    applicationId: z.number().nullish(),
    status: z.boolean().nullish(),
    remark: z.string().nullish(),
    name: z.string().nullish(),
    identityDocumentNumber: z.string().nullish(),
    date: z.string().nullish(),
    isDraft: z.boolean(),
});
export type TransferApplicationEndorsementType = z.infer<
    typeof TransferApplicationEndorsementSchema
>;
