import type { ModuleDTO } from '$lib/dto/core/setup/setup.dto';
import { UserRoleConstant } from './user-role.constant';

export class ModuleConstant {
    public static homePage: ModuleDTO = {
        name: 'Halaman Utama',
        url: '/halaman-utama',
        roles: [],
    };

    public static accountSetting: ModuleDTO = {
        name: 'Tetapan Akaun',
        url: 'abc',
        roles: [],
        description: 'Kemaskini tetapan akaun anda.',
        icon: 'preference',
    };

    public static systemManagement: ModuleDTO = {
        name: 'Pengurusan Sistem',
        url: 'abc',
        roles: [UserRoleConstant.admin],
        description: 'Kemaskini tetapan sistem atau lihat log audit sistem.',
        icon: 'setting',
    };

    public static profile: ModuleDTO = {
        name: 'Profil',
        url: '/profile',
        roles: [UserRoleConstant.kakitangan],
        description: 'Lihat dan kemaskini profil anda.',
        icon: 'user',
    };

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
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
        ],
    };

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

    public static performance: ModuleDTO = {
        name: 'Laporan Nilaian Prestasi Tahunan (LNPT)',
        url: '',
        description: 'Nilaian Prestasi dan Anugerah Pekerja Cemerlang.',
        icon: 'performance',
        roles: [UserRoleConstant.urusSetiaLnpt],
    };

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

    public static salary: ModuleDTO = {
        name: 'Gaji',
        url: '',
        description:
            'Lihat pergerakan gaji, gaji dan elaun atau sijil gaji akhir kakitangan.',
        icon: 'salary',
        roles: [UserRoleConstant.kakitangan, UserRoleConstant.urusSetiaGaji],
    };

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

    public static training: ModuleDTO = {
        name: 'Latihan',
        url: '',
        description:
            'Uruskan perihal permohonan pembiayaan atau pendaftaran peperiksaan.',
        icon: 'academic',
        roles: [],
    };

    public static record: ModuleDTO = {
        name: 'Rekod Perkhidmatan',
        url: '',
        description: 'Lihat rekod perkhidmatan kakitangan.',
        icon: 'record',
        roles: [],
    };

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
