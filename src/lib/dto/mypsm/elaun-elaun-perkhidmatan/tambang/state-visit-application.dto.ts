import type { ServiceAllowanceApproverFeedbackDTO } from '../shared/service-allowance-app-feedback.dto';
import type { ServiceAllowanceSuppAppDetailDTO } from '../shared/service-allowance-supp-app-detail.dto';
import type { ServiceAllowanceSuppFeedbackDTO } from '../shared/service-allowance-supp-feedback.dto';
import type { ServiceAllowanceVerificationDTO } from '../shared/service-allowance-verification.dto';
import type { ServiceAllowanceStateVisitDetailDTO } from './state-visit-application-detail.dto';

export interface ServiceAllowanceStateVisitApplicationDTO {
    applicationDetail: ServiceAllowanceStateVisitDetailDTO | null;
    download?: any | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}
