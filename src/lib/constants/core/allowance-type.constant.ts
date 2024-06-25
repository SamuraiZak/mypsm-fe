import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';

export class AllowanceTypeConstant {
    public static ceremonyClothing: AllowanceTypeDTO = {
        id: 1,
        code: '6b8fc037-ad27-455e-8819-e85452a2f3f5',
        description: 'Bantuan Pakaian Istiadat',
        url: 'ceremony_clothing',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static winterClothing: AllowanceTypeDTO = {
        id: 2,
        code: 'd9139301-9dcc-4411-9618-4864d3cf5b33',
        description: 'Bantuan Pakaian Panas',
        url: 'winter_clothing',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static stateVisit: AllowanceTypeDTO = {
        id: 3,
        code: '70bb8321-0b38-4498-97a7-24b02ac2dd41',
        description: 'Tambang Mengunjungi Wilayah Asal',
        url: 'state_visit',
        stepper: {
            detail: true,
            upload: true,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static funeralArrangement: AllowanceTypeDTO = {
        id: 4,
        code: '61ed6a0e-3ce7-437c-8a91-bf57ca714e6a',
        description: 'Bantuan Mengurus Jenazah',
        url: 'funeral_arrangement',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: false,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: true,
            confirmation: true,
        },
    };

    public static welfareFund: AllowanceTypeDTO = {
        id: 5,
        code: 'a048246c-5a4c-44a9-9fe5-15d7f7da0a12',
        description: 'Tabung Kebajikan Kakitangan',
        url: 'welfare_fund',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static houseMoving: AllowanceTypeDTO = {
        id: 6,
        code: '3cf3f415-e2a3-4e74-bc92-3fbdf74e2260',
        description: 'Perpindahan Rumah',
        url: 'house_moving',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static passportPayment: AllowanceTypeDTO = {
        id: 7,
        code: 'e4003ad1-b0d9-4f14-90f9-86ca3799c4d4',
        description: 'Pembayaran Balik Passport',
        url: 'passport_payment',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static insurancePayment: AllowanceTypeDTO = {
        id: 8,
        code: 'c6a10d4f-75d5-4704-a58a-a12de70d1edb',
        description: 'Insurans Perjalanan',
        url: 'insurance_payment',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: false,
            secretaryCheck: true,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static cargoShipping: AllowanceTypeDTO = {
        id: 9,
        code: '256427cf-519a-4a51-9fdd-00007f65e1ba',
        description: 'Bayaran Balik Pengangkutan Barang Melalui Jalan Laut',
        url: 'cargo_shipping',
        stepper: {
            detail: true,
            upload: false,
            directorFeedback: false,
            secretaryCheck: false,
            endorserDetail: true,
            supporterFeedback: true,
            approverFeedback: true,
            secretaryVerification: false,
            confirmation: false,
        },
    };

    public static list: AllowanceTypeDTO[] = [
        this.ceremonyClothing,
        this.winterClothing,
        this.stateVisit,
        this.funeralArrangement,
        this.welfareFund,
        this.houseMoving,
        this.passportPayment,
        this.insurancePayment,
        this.cargoShipping,
    ];
}
