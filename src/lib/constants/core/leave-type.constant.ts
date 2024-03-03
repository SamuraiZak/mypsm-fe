// ===============================================================
// Leave Type Constant
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class LeaveTypeConstant {
    public static replacementLeave: LookupDTO = {
        id: 1,
        code: 'LT01',
        description: 'cuti gantian',
    };
    public static untrackedLeave: LookupDTO = {
        id: 2,
        code: 'LT02',
        description: 'cuti tanpa rekod',
    };
    public static halfpaidLeave: LookupDTO = {
        id: 3,
        code: 'LT03',
        description: 'cuti separuh gaji',
    };
    public static unpaidLeave: LookupDTO = {
        id: 4,
        code: 'LT04',
        description: 'cuti tanpa gaji',
    };
    public static maternityLeaveEarly: LookupDTO = {
        id: 5,
        code: 'LT05',
        description: 'cuti bersalin awal',
    };
    public static maternityLeaveOfficer: LookupDTO = {
        id: 6,
        code: 'LT06',
        description: 'cuti bersalin pegawai',
    };
    public static maternityLeaveWife: LookupDTO = {
        id: 7,
        code: 'LT07',
        description: 'cuti isteri bersalin',
    };
    public static hajiLeave: LookupDTO = {
        id: 8,
        code: 'LT08',
        description: 'cuti haji',
    };
    public static quarantineLeave: LookupDTO = {
        id: 9,
        code: 'LT09',
        description: 'cuti kuarantin',
    };
    public static unpaidNurseryLeave: LookupDTO = {
        id: 10,
        code: 'LT10',
        description: 'cuti menjaga anak tanpa gaji',
    };
    public static partTimeCourseLeave: LookupDTO = {
        id: 11,
        code: 'LT11',
        description: 'cuti kursus sambilan',
    };
    public static absenceLeave: LookupDTO = {
        id: 12,
        code: 'LT12',
        description: 'cuti perakuan tidak hadir ke pejabat',
    };
    public static extendedSickLeave: LookupDTO = {
        id: 13,
        code: 'LT13',
        description: 'cuti sakit lanjutan',
    };
    public static unpaidFollowPartnerLeave: LookupDTO = {
        id: 14,
        code: 'LT14',
        description: 'cuti tanpa gaji mengikut pasangan',
    };
    public static cancerLeave: LookupDTO = {
        id: 15,
        code: 'LT15',
        description: 'cuti penyakit barah dan kusta',
    };
    public static tbLeave: LookupDTO = {
        id: 16,
        code: 'LT16',
        description: 'cuti penyakit tibi',
    };

    public static list: LookupDTO[] = [
        this.replacementLeave,
        this.untrackedLeave,
        this.halfpaidLeave,
        this.unpaidLeave,
        this.maternityLeaveEarly,
        this.maternityLeaveOfficer,
        this.maternityLeaveWife,
        this.hajiLeave,
        this.quarantineLeave,
        this.unpaidNurseryLeave,
        this.partTimeCourseLeave,
        this.absenceLeave,
        this.extendedSickLeave,
        this.unpaidFollowPartnerLeave,
        this.cancerLeave,
        this.tbLeave,
    ];
}
