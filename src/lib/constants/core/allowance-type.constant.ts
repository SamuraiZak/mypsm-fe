import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';

export class AllowanceTypeConstant {
    // 1. Ceremony Clothing
    public static ceremonyClothing: AllowanceTypeDTO = {
        id: 1,
        code: '6b8fc037-ad27-455e-8819-e85452a2f3f5',
        description: 'Bantuan Pakaian Istiadat',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: false,
            paymentConfirmation: false,
        },
    };

    // 2. Warm Clothing
    public static warmClothing: AllowanceTypeDTO = {
        id: 2,
        code: 'd9139301-9dcc-4411-9618-4864d3cf5b33',
        description: 'Bantuan Pakaian Panas',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: false,
            paymentConfirmation: false,
        },
    };

    // 3. Hometown Visit
    public static hometownVisit: AllowanceTypeDTO = {
        id: 3,
        code: '70bb8321-0b38-4498-97a7-24b02ac2dd41',
        description: 'Permohonan Tambang Mengunjungi Wilayah Asal',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: false,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: false,
            paymentConfirmation: false,
        },
    };

    // 4. Funeral Fund
    public static funeralFund: AllowanceTypeDTO = {
        id: 4,
        code: '61ed6a0e-3ce7-437c-8a91-bf57ca714e6a',
        description: 'Bantuan Mengurus Jenazah',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: false,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: false,
            paymentConfirmation: false,
        },
    };

    // 5. Welfare Fund
    public static welfareFund: AllowanceTypeDTO = {
        id: 5,
        code: 'a048246c-5a4c-44a9-9fe5-15d7f7da0a12',
        description: 'Tabung Kebajikan Kakitangan',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: true,
            paymentConfirmation: true,
        },
    };

    // 6. House Moving
    public static houseMoving: AllowanceTypeDTO = {
        id: 6,
        code: '3cf3f415-e2a3-4e74-bc92-3fbdf74e2260',
        description: 'Elaun Perpindahan Rumah',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: true,
            paymentConfirmation: true,
        },
    };

    // 7. Passport Renewal
    public static passportClaim: AllowanceTypeDTO = {
        id: 7,
        code: 'e4003ad1-b0d9-4f14-90f9-86ca3799c4d4',
        description: 'Bayaran Balik Passport',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: true,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: true,
            paymentConfirmation: true,
        },
    };

    // 8. Health Insurance
    public static healthInsurance: AllowanceTypeDTO = {
        id: 8,
        code: 'c6a10d4f-75d5-4704-a58a-a12de70d1edb',
        description:
            'Bayaran Balik Insurans Kesihatan Penjawat Awam Atas Urusan Peribadi',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: true,
            directorFeedback: false,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: false,
            paymentConfirmation: false,
        },
    };

    // 9. Shipping Claim
    public static shippingClaim: AllowanceTypeDTO = {
        id: 9,
        code: '256427cf-519a-4a51-9fdd-00007f65e1ba',
        description: 'Pengangkutan Barang Melalui Jalan Laut',
        suffix: '',
        process: {
            applicationDetail: true,
            documents: false,
            directorFeedback: false,
            secretaryCheck: true,
            endorserDetails: true,
            supporterFeedback: true,
            approverFeedback: true,
            financeLetter: true,
            localOrder: true,
            paymentConfirmation: true,
        },
    };

    public static list: AllowanceTypeDTO[] = [
        this.ceremonyClothing,
        this.warmClothing,
        this.hometownVisit,
        this.funeralFund,
        this.welfareFund,
        this.houseMoving,
        this.passportClaim,
        this.healthInsurance,
        this.shippingClaim,
    ];
}
