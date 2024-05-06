import type { ModuleDTO } from '$lib/dto/core/setup/setup.dto';
import { UserRoleConstant } from './user-role.constant';

export class ModuleConstant {
    // halaman utama
    public static homePage: ModuleDTO = {
        name: 'Halaman Utama',
        url: '/halaman-utama',
        roles: [],
    };

    // tetapan akaun
    public static accountSetting: ModuleDTO = {
        name: 'Tetapan Akaun',
        url: 'abc',
        roles: [],
        description: 'Kemaskini tetapan akaun anda.',
        icon: 'preference',
    };

    // pengurusan sistem
    public static systemManagement: ModuleDTO = {
        name: 'Pengurusan Sistem',
        url: 'abc',
        roles: [
            UserRoleConstant.admin,
            UserRoleConstant.superAdmin,
            UserRoleConstant.audit,
        ],
        description: 'Kemaskini tetapan sistem atau lihat log audit sistem.',
        icon: 'setting',
    };

    // profil
    public static profile: ModuleDTO = {
        name: 'Profil',
        url: '/profile',
        roles: [UserRoleConstant.kakitangan],
        description: 'Lihat dan kemaskini profil anda.',
        icon: 'user',
    };

    // perjawatan
    public static employment: ModuleDTO = {
        name: 'Perjawatan',
        url: 'abc',
        description: 'Uruskan perihal perjawatan kakitangan.',
        icon: 'tie',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaPerjawatan,
            UserRoleConstant.pelulus,
            UserRoleConstant.penyokong,
            UserRoleConstant.calon,
            UserRoleConstant.ketuaSeksyen,
        ],
        subModules: [
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Pengesahan Dalam Perkhidmatan',
                url: 'abc',
                roles: [UserRoleConstant.kakitangan],
            },
            {
                name: 'Pemangkuan',
                url: 'abc',
                roles: [UserRoleConstant.kakitangan],
            },
            {
                name: 'Pengesahan Kenaikan Pangkat',
                url: 'abc',
                roles: [UserRoleConstant.kakitangan],
            },
            {
                name: 'Tawaran Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Tanggung Kerja',
                url: 'abc',
                roles: [
                    UserRoleConstant.ketuaSeksyen,
                    UserRoleConstant.kakitangan,
                ],
            },
            {
                name: 'Pertukaran',
                url: 'abc',
                roles: [UserRoleConstant.kakitangan],
            },
            {
                name: 'PTB dan KWAP',
                url: 'abc',
                roles: [UserRoleConstant.kakitangan],
            },
            {
                name: 'Persaraan',
                url: 'abc',
                roles: [UserRoleConstant.kakitangan],
            },
        ],
    };

    // kontrak
    public static contract: ModuleDTO = {
        name: 'Kontrak',
        url: '',
        description:
            'Uruskan hal-hal berkaitan kontrak bagi kakitangan kontrak.',
        icon: 'contract',
        roles: [
            UserRoleConstant.kakitanganKontrak,
            UserRoleConstant.calonKontrak,
        ],
    };

    // cuti
    public static leave: ModuleDTO = {
        name: 'Cuti',
        url: '/cuti/permohonan',
        description: 'Lihat laporan cuti, memohon cuti dan pengeluaran GCR.',
        icon: 'calendar',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaCuti,
            UserRoleConstant.penyokong,
            UserRoleConstant.pelulus,
        ],
    };

    // integriti
    public static integrity: ModuleDTO = {
        name: 'Integriti',
        url: '',
        description: 'Prosiding, Rayuan dan Surcaj',
        icon: 'justice',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaIntegriti,
        ],
    };

    // lnpt
    public static performance: ModuleDTO = {
        name: 'Laporan Nilaian Prestasi Tahunan (LNPT)',
        url: '',
        description: 'Nilaian Prestasi dan Anugerah Pekerja Cemerlang.',
        icon: 'performance',
        roles: [UserRoleConstant.urusSetiaLnpt],
    };

    // Elaun
    public static allowance: ModuleDTO = {
        name: 'Elaun',
        url: '',
        description: 'Uruskan permohonan elaun-elaun kakitangan.',
        icon: 'allowance',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaElaunElaunPerkhidmatan,
        ],
    };

    // pinjaman dan kuarters
    public static loan: ModuleDTO = {
        name: 'Pinjaman dan Kuarters',
        url: '',
        description: 'Uruskan perihal pinjaman atau kuarters.',
        icon: 'loan',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaPentadbiran,
        ],
    };

    // gaji
    public static salary: ModuleDTO = {
        name: 'Gaji',
        url: '',
        description:
            'Lihat pergerakan gaji, gaji dan elaun atau sijil gaji akhir kakitangan.',
        icon: 'salary',
        roles: [UserRoleConstant.kakitangan, UserRoleConstant.urusSetiaGaji],
    };

    // perubatan
    public static medical: ModuleDTO = {
        name: 'Perubatan',
        url: '',
        description: 'Uruskan perihal tuntutan bil atau pembayaran rawatan.',
        icon: 'medical',
        roles: [
            UserRoleConstant.klinikPanel,
            UserRoleConstant.unitBahagian,
            UserRoleConstant.unitNegeri,
        ],
    };

    // latihan
    public static training: ModuleDTO = {
        name: 'Latihan',
        url: '',
        description:
            'Uruskan perihal permohonan pembiayaan atau pendaftaran peperiksaan.',
        icon: 'academic',
        roles: [],
    };

    // rekod perkhidmatan
    public static record: ModuleDTO = {
        name: 'Rekod Perkhidmatan',
        url: '',
        description: 'Lihat rekod perkhidmatan kakitangan.',
        icon: 'record',
        roles: [],
    };

    // list
    public static moduleList: ModuleDTO[] = [
        this.accountSetting,
        this.systemManagement,
        this.profile,
        this.employment,
        this.contract,
        this.leave,
        this.integrity,
        this.performance,
        this.allowance,
        this.loan,
        this.salary,
        this.medical,
        this.training,
        this.record,
    ];
}
