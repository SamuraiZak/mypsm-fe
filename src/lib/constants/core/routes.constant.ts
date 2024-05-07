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
        url: '/tetapan',
        roles: [],
        description: 'Kemaskini tetapan akaun anda.',
        icon: 'preference',
    };

    // pengurusan sistem
    public static systemManagement: ModuleDTO = {
        name: 'Pengurusan Sistem',
        url: 'pengurusan_sistem',
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

    // perjawatan (checked)
    public static employment: ModuleDTO = {
        name: 'Perjawatan',
        url: '/perjawatan/lantikan-baru',
        description: 'Uruskan perihal perjawatan kakitangan.',
        icon: 'tie',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaPerjawatan,
            UserRoleConstant.pelulus,
            UserRoleConstant.penyokong,
            UserRoleConstant.calon,
            //tanggung kerja
            UserRoleConstant.ketuaSeksyen,
            UserRoleConstant.timbalanKetuaSeksyen,
            UserRoleConstant.pengarahKhidmatPengurusan,
            //acting and promotion
            UserRoleConstant.urusSetiaIntegriti,
            UserRoleConstant.pengarahBahagian,
            UserRoleConstant.pengarahNegeri,
            //pengesahan dalam perkhidmatan
            UserRoleConstant.pengarahIntegriti,
            UserRoleConstant.pengarahAudit,
            //persaraan
            UserRoleConstant.urusSetiaPersaraan,
            UserRoleConstant.unitIntegriti,
        ],
        subModules: [
            {
                name: 'Lantikan Baru',
                url: '/perjawatan/lantikan-baru',
                roles: [
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.calon,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Pengesahan Dalam Perkhidmatan',
                url: '/perjawatan/pengesahan-dalam-perkhidmatan',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.pengarahIntegriti,
                    UserRoleConstant.pengarahAudit,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                ],
            },
            {
                name: 'Pemangkuan',
                url: '/perjawatan/pemangkuan',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.urusSetiaIntegriti,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Pengesahan Kenaikan Pangkat',
                url: '/perjawatan/kenaikan-pangkat',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.urusSetiaIntegriti,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Tawaran Baru',
                url: '/perjawatan/tawaran-baru',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Tanggung Kerja',
                url: '/perjawatan/tanggung-kerja',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                    UserRoleConstant.timbalanKetuaSeksyen,
                    UserRoleConstant.ketuaSeksyen,
                    UserRoleConstant.pengarahKhidmatPengurusan,
                ],
            },
            {
                name: 'Pertukaran',
                url: '/perjawatan/proses_pertukaran',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'PTB dan KWAP',
                url: '/perjawatan/PTB-dan-KWAP',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                    UserRoleConstant.urusSetiaPerjawatan,
                ],
            },
            {
                name: 'Persaraan',
                url: '/perjawatan/persaraan',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.unitIntegriti,
                    UserRoleConstant.urusSetiaPersaraan,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                    UserRoleConstant.urusSetiaIntegriti,
                ],
            },
        ],
    };

    // kontrak (checked)
    public static contract: ModuleDTO = {
        name: 'Kontrak',
        url: '/kakitangan-kontrak/lantikan-baru',
        description:
            'Uruskan hal-hal berkaitan kontrak bagi kakitangan kontrak.',
        icon: 'contract',
        roles: [
            UserRoleConstant.kakitanganKontrak,
            UserRoleConstant.calonKontrak,
            UserRoleConstant.urusSetiaPerjawatan,
            UserRoleConstant.urusSetiaKhidmatSokongan,
            UserRoleConstant.penyokong,
            UserRoleConstant.pelulus,
            UserRoleConstant.pengarahKhidmatPengurusan,
        ],
        subModules: [
            {
                name: 'Pelantikan Baru (Kontrak)',
                url: '/kakitangan-kontrak/lantikan-baru',
                roles: [
                    UserRoleConstant.calonKontrak,
                    UserRoleConstant.urusSetiaPerjawatan,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Pembaharuan Kontrak',
                url: '/kakitangan-kontrak/pembaharuan',
                roles: [
                    UserRoleConstant.kakitanganKontrak,
                    UserRoleConstant.urusSetiaKhidmatSokongan,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                    UserRoleConstant.pengarahKhidmatPengurusan,
                ],
            },
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

    // integriti (checked)
    public static integrity: ModuleDTO = {
        name: 'Integriti',
        url: '/integriti/surcaj',
        description: 'Prosiding, Rayuan dan Surcaj',
        icon: 'justice',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaIntegriti,
            UserRoleConstant.urusSetiaTatatertib,
        ],
        subModules: [
            {
                name: 'Surcaj',
                url: '/integriti/surcaj',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaIntegriti,
                ],
            },
            {
                name: 'Prosiding',
                url: '/integriti/prosiding',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaTatatertib,
                    UserRoleConstant.urusSetiaIntegriti,
                ],
            },
            {
                name: 'Rayuan',
                url: '/integriti/rayuan',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaTatatertib,
                ],
            },
        ],
    };

    // lnpt (checked)
    public static performance: ModuleDTO = {
        name: 'Laporan Nilaian Prestasi Tahunan (LNPT)',
        url: '/lnpt/sejarah-apc',
        description: 'Nilaian Prestasi dan Anugerah Pekerja Cemerlang.',
        icon: 'performance',
        roles: [UserRoleConstant.urusSetiaLnpt],
        subModules: [
            {
                name: 'Pengesahan Lantikan Baharu',
                url: '/lnpt/pengesahan-lantikan-baharu',
                roles: [UserRoleConstant.urusSetiaLnpt],
            },
            {
                name: 'Purata LNPT',
                url: '/lnpt/purata-lnpt',
                roles: [UserRoleConstant.urusSetiaLnpt],
            },
            {
                name: 'Sejarah APC',
                url: '/lnpt/sejarah-apc',
                roles: [UserRoleConstant.urusSetiaLnpt],
            },
        ],
    };

    // Elaun
    public static allowance: ModuleDTO = {
        name: 'Elaun',
        url: '/elaun-elaun_perkhidmatan/permohonan',
        description: 'Uruskan permohonan elaun-elaun kakitangan.',
        icon: 'allowance',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaElaunElaunPerkhidmatan,
        ],
    };

    // pinjaman dan kuarters (checked)
    public static loan: ModuleDTO = {
        name: 'Pinjaman dan Kuarters',
        url: '/pinjaman-dan-kuarters/pinjaman',
        description: 'Uruskan perihal pinjaman atau kuarters.',
        icon: 'loan',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaPentadbiran,
            UserRoleConstant.urusSetiaPeringkatNegeri,
            UserRoleConstant.unitPengurusanFasiliti,
            UserRoleConstant.pengarahBahagian,
            UserRoleConstant.pengarahNegeri,
            UserRoleConstant.ketuaSeksyen,
            UserRoleConstant.pelulus,
        ],
        subModules: [
            {
                name: 'Permohonan Masuk Kuarters',
                url: '/pinjaman-dan-kuarters/permohonan-masuk-kuarters',
                roles: [
                    UserRoleConstant.urusSetiaPeringkatNegeri,
                    UserRoleConstant.unitPengurusanFasiliti,
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                ],
            },
            {
                name: 'Permohonan Keluar Kuarters',
                url: '/pinjaman-dan-kuarters/permohonan-keluar-kuarters',
                roles: [
                    UserRoleConstant.urusSetiaPeringkatNegeri,
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                ],
            },
            {
                name: 'Pinjaman',
                url: '/pinjaman-dan-kuarters/pinjaman',
                roles: [
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaPentadbiran,
                    UserRoleConstant.ketuaSeksyen,
                    UserRoleConstant.pelulus,
                ],
            },
        ],
    };

    // gaji (checked)
    public static salary: ModuleDTO = {
        name: 'Gaji',
        url: '/gaji/pergerakan-gaji',
        description:
            'Lihat pergerakan gaji, gaji dan elaun atau sijil gaji akhir kakitangan.',
        icon: 'salary',
        roles: [
            UserRoleConstant.urusSetiaGaji,
            UserRoleConstant.pengarahKhidmatPengurusan,
        ],
        subModules: [
            {
                name: 'Pergerakan Gaji',
                url: '/gaji/pergerakan-gaji',
                roles: [
                    UserRoleConstant.urusSetiaGaji,
                    UserRoleConstant.pengarahKhidmatPengurusan,
                ],
            },
            {
                name: 'Gaji Elaun',
                url: '/gaji/gaji-elaun',
                roles: [
                    UserRoleConstant.urusSetiaGaji,
                    UserRoleConstant.pengarahKhidmatPengurusan,
                ],
            },
            {
                name: 'Gaji Akir',
                url: '/gaji/gaji-akhir',
                roles: [UserRoleConstant.urusSetiaGaji],
            },
            {
                name: 'Sijil Gaji Akhir',
                url: '/gaji/sijil-gaji-akhir',
                roles: [UserRoleConstant.urusSetiaGaji],
            },
        ],
    };

    // perubatan (checked)
    public static medical: ModuleDTO = {
        name: 'Perubatan',
        url: '/perubatan',
        description: 'Uruskan perihal tuntutan bil atau pembayaran rawatan.',
        icon: 'medical',
        roles: [
            UserRoleConstant.klinikPanel,
            UserRoleConstant.unitBahagian,
            UserRoleConstant.unitNegeri,
            UserRoleConstant.urusSetiaPerubatan,
            UserRoleConstant.kakitangan,
            UserRoleConstant.penyokong,
            UserRoleConstant.pelulus,
        ],
        subModules: [
            {
                name: 'Permohonan Klinik Panel',
                url: '/perubatan/permohonan-klinik-panel',
                roles: [
                    UserRoleConstant.urusSetiaPerubatan,
                    UserRoleConstant.unitBahagian,
                    UserRoleConstant.unitNegeri,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Bil Tuntutan Kakitangan',
                url: '/perubatan/bil-tuntutan-kakitangan',
                roles: [
                    UserRoleConstant.urusSetiaPerubatan,
                    UserRoleConstant.penyokong,
                    UserRoleConstant.pelulus,
                ],
            },
            {
                name: 'Perubatan',
                url: '/perubatan',
                roles: [UserRoleConstant.kakitangan],
            },
            {
                name: 'Bil Tuntutan Klinik',
                url: '/klinik-panel/bil-tuntutan-klinik',
                roles: [
                    UserRoleConstant.klinikPanel,
                    UserRoleConstant.urusSetiaPerubatan,
                    UserRoleConstant.pelulus,
                    UserRoleConstant.penyokong,
                ],
            },
            {
                name: 'Maklumat Bil Rawatan',
                url: '/klinik-panel/maklumat-bil-rawatan',
                roles: [UserRoleConstant.klinikPanel],
            },
            {
                name: 'Maklumat Kakitangan',
                url: '/klinik-panel/maklumat-kakitangan',
                roles: [UserRoleConstant.klinikPanel],
            },
            {
                name: 'Sejarah Tuntutan',
                url: '/klinik-panel/sejarah-tuntutan',
                roles: [UserRoleConstant.klinikPanel],
            },
        ],
    };

    // latihan (checked)
    public static training: ModuleDTO = {
        name: 'Latihan',
        url: '/latihan/rekod-peperiksaan',
        description:
            'Uruskan perihal permohonan pembiayaan atau pendaftaran peperiksaan.',
        icon: 'academic',
        roles: [
            UserRoleConstant.urusSetiaLatihan,
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaIntegriti,
            UserRoleConstant.pengarahBahagian,
            UserRoleConstant.pengarahNegeri,
        ],
        subModules: [
            {
                name: 'Kemaskini Peperiksaan',
                url: '/latihan/kemaskini-peperiksaan',
                roles: [UserRoleConstant.urusSetiaLatihan],
            },
            {
                name: 'Rekod Peperiksaan',
                url: '/latihan/rekod-peperiksaan',
                roles: [
                    UserRoleConstant.urusSetiaLatihan,
                    UserRoleConstant.kakitangan,
                ],
            },
            {
                name: 'Pembiayaan Pembelajaran',
                url: '/latihan/pembiayaan',
                roles: [
                    UserRoleConstant.urusSetiaLatihan,
                    UserRoleConstant.kakitangan,
                    UserRoleConstant.urusSetiaIntegriti,
                    UserRoleConstant.pengarahBahagian,
                    UserRoleConstant.pengarahNegeri,
                ],
            },
            {
                name: 'Tuntutan Yuran',
                url: '/latihan/pembiayaan',
                roles: [
                    UserRoleConstant.urusSetiaLatihan,
                    UserRoleConstant.kakitangan,
                ],
            },
        ],
    };

    // rekod perkhidmatan (checked)
    public static record: ModuleDTO = {
        name: 'Rekod Perkhidmatan',
        url: '/rekod-perkhidmatan',
        description: 'Lihat rekod perkhidmatan kakitangan.',
        icon: 'record',
        roles: [UserRoleConstant.kakitangan],
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
