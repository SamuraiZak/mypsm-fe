import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class TransferTypeConstant {
    public static self: LookupDTO = {
        id: 1,
        code: 'self',
        description: 'permohonan_sendiri',
    };
    public static director: LookupDTO = {
        id: 2,
        code: 'director',
        description: 'arahan_pengarah',
    };
    public static management: LookupDTO = {
        id: 3,
        code: 'management',
        description: 'arahan_pihak_pengurusan',
    };

    public static list: LookupDTO[] = [
        this.self,
        this.director,
        this.management,
    ];
}

export class TransferStatusConstant {
    
    public static step0: LookupDTO = {
        id: 0,
        code: 'step0',
        description: 'Baru',
    };
    public static step1: LookupDTO = {
        id: 1,
        code: 'step1',
        description: 'Menunggu keputusan mesyuarat',
    };
    public static step2: LookupDTO = {
        id: 2,
        code: 'step2',
        description: 'Menunggu maklum balas kakitangan',
    };
    public static step3: LookupDTO = {
        id: 3,
        code: 'step3',
        description:
            'Menunggu surat permohonan penangguhan daripada kakitangan',
    };
    public static step4: LookupDTO = {
        id: 4,
        code: 'step4',
        description: 'Menunggu semakan permohonan penangguhan',
    };
    public static step5: LookupDTO = {
        id: 5,
        code: 'step5',
        description: 'Menunggu keputusan permohonan penangguhan',
    };
    public static step6: LookupDTO = {
        id: 6,
        code: 'step6',
        description: 'Menunggu dokumen pertukaran daripada Urus setia',
    };
    public static step7: LookupDTO = {
        id: 7,
        code: 'step7',
        description: 'Menunggu maklumat penyokong dan pelulus',
    };
    public static step8: LookupDTO = {
        id: 8,
        code: 'step8',
        description: 'Menunggu maklum balas penyokong',
    };
    public static step9: LookupDTO = {
        id: 9,
        code: 'step9',
        description: 'Menunggu maklum balas pelulus',
    };
    public static step10: LookupDTO = {
        id: 10,
        code: 'step10',
        description: 'Selesai',
    };

    public static list: LookupDTO[] = [
        this.step1,
        this.step2,
        this.step3,
        this.step4,
        this.step5,
        this.step6,
        this.step7,
        this.step8,
        this.step9,
        this.step10,
    ];
}
