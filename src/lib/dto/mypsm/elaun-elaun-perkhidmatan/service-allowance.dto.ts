import type { ServiceAllowanceBantuanMengurusJenazahDetailDTO } from './bantuan-mengurus-jenazah/bantuan-mengurus-jenazah.dto';
import type { ServiceAllowanceBantuanPakaianIstiadatDetailDTO } from './bantuan-pakaian-istiadat/bantuan-pakaian-istiadat.dto';
import type { ServiceAllowanceBantuanPakaianPanasDetailDTO } from './bantuan-pakaian-panas/bantuan-pakaian-panas.dto';
import type { ServiceAllowanceBayaranBalikShippingDetailDTO } from './bayaran-balik-pengangkutan-barang-melalui-jalan-laut/bayaran-balik-shipping.dto';
import type { ServiceAllowanceInsuransKesihatanDetailDTO } from './insurans-kesihatan/insurans-kesihatan.dto';
import type { ServiceAllowanceBayaranBalikPassportDetailDTO } from './pembayaran-balik-passport/bayaran-balik-passport.dto';
import type { ServiceAllowancePerpindahanRumahDetailDTO } from './perpindahan-rumah/perpindahan-rumah.dto';
import type { ServiceAllowanceApproverFeedbackDTO } from './shared/service-allowance-app-feedback.dto';
import type { ServiceAllowanceConfirmationDTO } from './shared/service-allowance-confirmation.dto';
import type { ServiceAllowanceDirectorFeedbackDTO } from './shared/service-allowance-director-feedback.dto';
import type { ServiceAllowanceDownloadDTO } from './shared/service-allowance-download.dto';
import type { ServiceAllowanceSuppAppDetailDTO } from './shared/service-allowance-supp-app-detail.dto';
import type { ServiceAllowanceSuppFeedbackDTO } from './shared/service-allowance-supp-feedback.dto';
import type { ServiceAllowanceVerificationDTO } from './shared/service-allowance-verification.dto';
import type { ServiceAllowanceTabungKebajikanDetailDTO } from './tabung-kebajikan-kakitangan/tabung-kebajikan-kakitangan.dto';
import type { ServiceAllowanceTambangMengunjungiWilayahAsalDetailDTO } from './tambang-mengunjungi-wilayah-asal/tambang-mengunjungi-wilayah-asal.dto';

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

// bantuan mengurus jenazah
export interface ServiceAllowanceBantuanMengurusJenazahApplicationDTO {
    applicationDetail: ServiceAllowanceBantuanMengurusJenazahDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    confirmation: ServiceAllowanceConfirmationDTO | null;
    verification: ServiceAllowanceVerificationDTO;
    supportApprover: ServiceAllowanceSuppAppDetailDTO;
    support: ServiceAllowanceSuppFeedbackDTO;
    approval: ServiceAllowanceApproverFeedbackDTO;
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

// bantuan pakaian panas
export interface ServiceAllowanceBantuanPakaianPanasApplicationDTO {
    applicationDetail: ServiceAllowanceBantuanPakaianPanasDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    directorSupport: ServiceAllowanceDirectorFeedbackDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// bayaran balik shipping
export interface ServiceAllowanceBayaranBalikShippingApplicationDTO {
    applicationDetail: ServiceAllowanceBayaranBalikShippingDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    supporterApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// insurans kesihatan
export interface ServiceAllowanceInsuransKesihatanApplicationDTO {
    applicationDetail: ServiceAllowanceInsuransKesihatanDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// bayaran balik passport
export interface ServiceAllowanceBayaranBalikPassportApplicationDTO {
    applicationDetail: ServiceAllowanceBayaranBalikPassportDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    directorSupport: ServiceAllowanceDirectorFeedbackDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// perpindahan rumah
export interface ServiceAllowancePerpindahanRumahApplicationDTO {
    applicationDetail: ServiceAllowancePerpindahanRumahDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    confirmation: ServiceAllowanceConfirmationDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// tabung kebajikan kakitangan
export interface ServiceAllowanceTabungKebajikanKakitanganApplicationDTO {
    applicationDetail: ServiceAllowanceTabungKebajikanDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    directorSupport: ServiceAllowanceDirectorFeedbackDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}

// tambang mengunjungi wilayah asal
export interface ServiceAllowanceTambangMengunjungiWilayahAsalApplicationDTO {
    applicationDetail: ServiceAllowanceTambangMengunjungiWilayahAsalDetailDTO | null;
    download: ServiceAllowanceDownloadDTO | null;
    verification: ServiceAllowanceVerificationDTO | null;
    supportApprover: ServiceAllowanceSuppAppDetailDTO | null;
    support: ServiceAllowanceSuppFeedbackDTO | null;
    approval: ServiceAllowanceApproverFeedbackDTO | null;
}
