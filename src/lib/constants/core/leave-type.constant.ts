// ===============================================================
// Leave Type Constant
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class LeaveTypeConstant {
    public static replacementLeave: LookupDTO = {
        id: 1,
        code: 'LT01',
        description: 'cuti_gantian',
    };
    public static unrecordedLeave: LookupDTO = {
        id: 2,
        code: 'LT02',
        description: 'cuti_tanpa_rekod',
    };
    public static halfPaidLeave: LookupDTO = {
        id: 3,
        code: 'LT03',
        description: 'cuti_separuh_gaji',
    };
    public static unpaidLeave: LookupDTO = {
        id: 4,
        code: 'LT04',
        description: 'cuti_tanpa_gaji',
    };
    public static earlyMaternityLeave: LookupDTO = {
        id: 5,
        code: 'LT05',
        description: 'cuti_bersalin_awal',
    };
    public static officerMaternityLeave: LookupDTO = {
        id: 6,
        code: 'LT06',
        description: 'cuti_bersalin_pegawai',
    };
    public static partnerMaternityLeave: LookupDTO = {
        id: 7,
        code: 'LT07',
        description: 'cuti_isteri_bersalin',
    };
    public static hajiLeave: LookupDTO = {
        id: 8,
        code: 'LT08',
        description: 'cuti_haji',
    };
    public static quarantineLeave: LookupDTO = {
        id: 9,
        code: 'LT09',
        description: 'cuti_kuarantin',
    };
    public static unpaidNurseryLeave: LookupDTO = {
        id: 10,
        code: 'LT10',
        description: 'cuti_menjaga_anak_tanpa_gaji',
    };
    public static studyLeave: LookupDTO = {
        id: 11,
        code: 'LT11',
        description: 'cuti_kursus_sambilan',
    };
    public static absenceLeave: LookupDTO = {
        id: 12,
        code: 'LT12',
        description: 'cuti_perakuan_tidak_hadir_ke_pejabat',
    };
    public static extendedSickLeave: LookupDTO = {
        id: 13,
        code: 'LT13',
        description: 'cuti_sakit_lanjutan',
    };
    public static unpaidFollowPartnerLeave: LookupDTO = {
        id: 14,
        code: 'LT14',
        description: 'cuti_tanpa_gaji_mengikut_pasangan',
    };
    public static cancerLeave: LookupDTO = {
        id: 15,
        code: 'LT15',
        description: 'cuti_penyakit_barah_dan_kusta',
    };
    public static tbLeave: LookupDTO = {
        id: 16,
        code: 'LT16',
        description: 'cuti_penyakit_tibi',
    };

    public static list: LookupDTO[] = [
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
