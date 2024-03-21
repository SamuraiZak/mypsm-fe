// ===============================================================
// Service Allowance Type Constant
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    ServiceAllowanceStepperDTO,
    ServiceAllowanceURLDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance-stepper.dto';

export class ServiceAllowanceTypeConstant {
    public static bantuanPakaianIstiadat: LookupDTO = {
        id: 1,
        code: '6b8fc037-ad27-455e-8819-e85452a2f3f5',
        description: 'Bantuan Pakaian Istiadat',
        url: 'bantuan-pakaian-istiadat',
    };
    public static bantuanPakaianPanas: LookupDTO = {
        id: 2,
        code: 'd9139301-9dcc-4411-9618-4864d3cf5b33',
        description: 'Bantuan Pakaian Panas',
        url: 'bantuan-pakaian-panas',
    };
    public static tambangMengunjungiWilayahAsal: LookupDTO = {
        id: 3,
        code: '70bb8321-0b38-4498-97a7-24b02ac2dd41',
        description: 'Tambang Mengunjungi Wilayah Asal',
        url: 'tambang-mengunjungi-wilayah-asal',
    };
    public static bantuanMengurusJenazah: LookupDTO = {
        id: 4,
        code: '61ed6a0e-3ce7-437c-8a91-bf57ca714e6a',
        description: 'Bantuan Mengurus Jenazah',
        url: 'bantuan-mengurus-jenazah',
    };
    public static tabungKebajikanKakitangan: LookupDTO = {
        id: 5,
        code: 'a048246c-5a4c-44a9-9fe5-15d7f7da0a12',
        description: 'Tabung Kebajikan Kakitangan',
        url: 'tabung-kebajikan-kakitangan',
    };
    public static perpindahanRumah: LookupDTO = {
        id: 6,
        code: '3cf3f415-e2a3-4e74-bc92-3fbdf74e2260',
        description: 'Perpindahan Rumah',
        url: 'perpindahan-rumah',
    };
    public static pembayaranBalikPassport: LookupDTO = {
        id: 7,
        code: 'e4003ad1-b0d9-4f14-90f9-86ca3799c4d4',
        description: 'Pembayaran Balik Passport',
        url: 'pembayaran-balik-passport',
    };
    public static insuransKesihatan: LookupDTO = {
        id: 8,
        code: 'c6a10d4f-75d5-4704-a58a-a12de70d1edb',
        description: 'Insurans Kesihatan',
        url: 'insurans-kesihatan',
    };
    public static bayaranBalikPengangkutanBarang: LookupDTO = {
        id: 9,
        code: '256427cf-519a-4a51-9fdd-00007f65e1ba',
        description: 'Bayaran Balik Pengangkutan Barang Melalui Jalan Laut',
        url: 'bayaran-balik-pengangkutan-barang-melalui-jalan-laut',
    };

    public static list: LookupDTO[] = [
        this.bantuanPakaianIstiadat,
        this.bantuanPakaianPanas,
        this.tambangMengunjungiWilayahAsal,
        this.bantuanMengurusJenazah,
        this.tabungKebajikanKakitangan,
        this.perpindahanRumah,
        this.pembayaranBalikPassport,
        this.insuransKesihatan,
        this.bayaranBalikPengangkutanBarang,
    ];
}

export class ServiceAllowanceStepperConstant {
    public static ceremonyDress: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: false,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static warmClothes: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: true,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static hometownVisit: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: true,
        directorFeedback: true,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static funeral: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: false,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: true,
        confirmation: true,
    };
    public static welfareFund: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: true,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static houseMoving: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: true,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static passportClaim: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: true,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static healthInsurance: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: false,
        secretaryCheck: true,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
    public static shippingClaim: ServiceAllowanceStepperDTO = {
        detail: true,
        upload: false,
        directorFeedback: false,
        secretaryCheck: false,
        endorserDetail: true,
        supporterFeedback: true,
        approverFeedback: true,
        secretaryVerification: false,
        confirmation: false,
    };
}

// Service Allowance API constant
export class ServiceAllowanceAPIConstant {
    public static ceremonyDress: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/ceremony_clothing/add_base64',
        upload: '',
        directorFeedback:
            'service_allowance/ceremony_clothing/director_support',
        secretaryCheck: 'service_allowance/ceremony_clothing/verification',
        endorserDetail:
            'service_allowance/ceremony_clothing/supporter_approver',
        supporterFeedback:
            'service_allowance/ceremony_clothing/appointed_support',
        approverFeedback: 'service_allowance/ceremony_clothing/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static warmClothes: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/winter_clothing/add',
        upload: '',
        directorFeedback: 'service_allowance/winter_clothing/director_support',
        secretaryCheck: 'service_allowance/winter_clothing/verification',
        endorserDetail: 'service_allowance/winter_clothing/supporter_approver',
        supporterFeedback:
            'service_allowance/winter_clothing/appointed_support',
        approverFeedback: 'service_allowance/winter_clothing/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static hometownVisit: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/state_visit/add',
        upload: 'service_allowance/state_visit/upload',
        directorFeedback: '',
        secretaryCheck: 'service_allowance/state_visit/verification',
        endorserDetail: 'service_allowance/state_visit/supporter_approver',
        supporterFeedback: 'service_allowance/state_visit/support',
        approverFeedback: 'service_allowance/state_visit/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static funeral: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/funeral_arrangement/add',
        upload: '',
        directorFeedback: '',
        secretaryCheck: 'service_allowance/funeral_arrangement/verification',
        endorserDetail:
            'service_allowance/funeral_arrangement/supporter_approver',
        supporterFeedback: 'service_allowance/funeral_arrangement/support',
        approverFeedback: 'service_allowance/funeral_arrangement/approval',
        secretaryVerification:
            'service_allowance/funeral_arrangement/secretary_verification',
        confirmation: 'service_allowance/funeral_arrangement/confirmation',
    };
    public static welfareFund: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/welfare_fund/add',
        upload: '',
        directorFeedback: 'service_allowance/welfare_fund/director_support',
        secretaryCheck: 'service_allowance/welfare_fund/verification',
        endorserDetail: 'service_allowance/welfare_fund/supporter_approver',
        supporterFeedback: 'service_allowance/welfare_fund/appointed_support',
        approverFeedback: 'service_allowance/welfare_fund/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static houseMoving: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/house_moving/add',
        upload: '',
        directorFeedback: 'service_allowance/house_moving/confirmation',
        secretaryCheck: 'service_allowance/house_moving/verification',
        endorserDetail: 'service_allowance/house_moving/supporter_approver',
        supporterFeedback: 'service_allowance/house_moving/support',
        approverFeedback: 'service_allowance/house_moving/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static passportClaim: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/passport_payment/add',
        upload: '',
        directorFeedback: 'service_allowance/passport_payment/director_support',
        secretaryCheck: 'service_allowance/passport_payment/verification',
        endorserDetail: 'service_allowance/passport_payment/supporter_approver',
        supporterFeedback:
            'service_allowance/passport_payment/appointed_support',
        approverFeedback: 'service_allowance/passport_payment/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static healthInsurance: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/insurance_payment/add',
        upload: '',
        directorFeedback: '',
        secretaryCheck: 'service_allowance/insurance_payment/verification',
        endorserDetail:
            'service_allowance/insurance_payment/supporter_approver',
        supporterFeedback: 'service_allowance/insurance_payment/support',
        approverFeedback: 'service_allowance/insurance_payment/approval',
        secretaryVerification: '',
        confirmation: '',
    };
    public static shippingClaim: ServiceAllowanceURLDTO = {
        detail: 'service_allowance/cargo_shipping/add',
        upload: '',
        directorFeedback: '',
        secretaryCheck: '',
        endorserDetail: 'service_allowance/cargo_shipping/supporter_approver',
        supporterFeedback: 'service_allowance/cargo_shipping/support',
        approverFeedback: 'service_allowance/cargo_shipping/approval',
        secretaryVerification: '',
        confirmation: '',
    };
}
