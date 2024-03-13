import type { ServiceAllowanceBantuanPakaianIstiadatDetailDTO } from './bantuan-pakaian-panas/bantuan-pakaian-panas.dto';
import type { ServiceAllowanceApproverFeedbackDTO } from './shared/service-allowance-app-feedback.dto';
import type { ServiceAllowanceDirectorFeedbackDTO } from './shared/service-allowance-director-feedback.dto';
import type { ServiceAllowanceDownloadDTO } from './shared/service-allowance-download.dto';
import type { ServiceAllowanceSuppAppDetailDTO } from './shared/service-allowance-supp-app-detail.dto';
import type { ServiceAllowanceSuppFeedbackDTO } from './shared/service-allowance-supp-feedback.dto';
import type { ServiceAllowanceVerificationDTO } from './shared/service-allowance-verification.dto';

export interface ServiceAllowanceDTO {
    allowanceId: string;
    employeeID: string;
    name: string;
    identityCardNumber: string;
    allowanceType: string;
    allowanceTypeCode: string | null;
    category: string;
    applicationDate: string;
    total: number;
    status: string;
    remark: string | null;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceConvert {
    public static fromJson(json: string): ServiceAllowanceDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceDTO): string {
        return JSON.stringify(value);
    }
}

// bantuan pakaian istiadat application dto
export interface ServiceAllowanceBantuanPakaianIstiadatApplicationDTO {
    applicationDetail: ServiceAllowanceBantuanPakaianIstiadatDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    directorSupport: ServiceAllowanceDirectorFeedbackDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// bantuan pakaian panas application dto
export interface ServiceAllowanceBantuanPakaianPanasApplicationDTO {
    applicationDetail: ServiceAllowanceBantuanPakaianIstiadatDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    directorSupport: ServiceAllowanceDirectorFeedbackDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}
