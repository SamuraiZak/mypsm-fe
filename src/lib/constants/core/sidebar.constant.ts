// ===============================================================
// Sidebar Constant
// ===============================================================

import type { SidebarDTO } from '$lib/dto/core/sidebar/sidebar.dto';
import { RoleConstant } from './role.constant';

export class SidebarConstant {
    public static sidebar: SidebarDTO[] = [
        // Kakitangan
        {
            role: RoleConstant.kakitangan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'PTB dan KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ],
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Laporan Cuti',
                            path: '/cuti/laporan-cuti',
                        },
                        {
                            name: 'Cuti Rehat, Kecemasan, Sakit',
                            path: '/cuti/cuti-rehat-kecemasan-sakit',
                        },
                        {
                            name: 'Gantian Cuti Rehat',
                            path: '/cuti/gantian-cuti-rehat',
                        },
                        {
                            name: 'Permohonan Cuti',
                            path: '/cuti/permohonan-cuti',
                        },

                    ]
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Rekod Elaun Kakitangan',
                            path: '/elaun/rekod',
                        },
                        {
                            name: 'Permohonan Elaun Perkhidmatan',
                            path: '/elaun/permohonan',
                        },
                    ]
                },
                {
                    name: 'Integriti',
                    path: '',
                    subItems: [
                        {
                            name: 'Surcaj',
                            path: '/integriti/surcaj',
                        },
                        {
                            name: 'Prosiding Tatatertib',
                            path: '/integriti/prosiding',
                        },
                        {
                            name: 'Prosiding Tatatertib - Rayuan',
                            path: '/integriti/rayuan',
                        },

                    ]
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Rekod Latihan Kakitangan',
                            path: '/latihan/rekod',
                        },
                        {
                            name: 'Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                    ]
                },
                {
                    name: 'Pinjaman & Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman',
                            path: '/pinjaman-kuarters/pinjaman',
                        },
                        {
                            name: 'Kuarters',
                            path: '/pinjaman-kuarters/kuarters',
                        },

                    ]
                },
                {
                    name: 'Perubatan',
                    path: '/perubatan',
                },

                {
                    name: 'Rekod Perkhidmatan',
                    path: '/rekod-perkhidmatan',

                },


            ],
        },

        // Admin
        {
            role: RoleConstant.admin.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Log Audit Sistem',
                    path: '/log-audit-sistem',
                },

            ]
        },

        //Audit
        {
            role: RoleConstant.audit.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Log Audit Sistem',
                    path: '/log-audit-sistem',
                },

            ]
        },

        //Calon
        {
            role: RoleConstant.calon.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Lantikan Baru',
                    path: ' /perjawatan/lantikan-baru ',
                },
                {
                    name: 'Maklumat Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Perlantikan Baru (Kontrak)',
                            path: '/maklumat-kontrak/lantikan-baru',
                        },
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/maklumat-kontrak/pembaharuan'
                        }
                    ]
                },


            ]
        },

        //Ketua Pengarah
        {
            role: RoleConstant.ketuaPengarah.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama'
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Pengeluaran Gantian Cuti Rehat (GCR) Awal',
                            path: '/cuti/pengeluaran-gantian-cuti-rehat-awal'
                        },
                        {
                            name: 'Permohonan Cuti',
                            path: '/cuti/permohonan-cuti'
                        },

                    ]

                }
            ]

        },

        // Ketua Seksyen
        {
            role:RoleConstant.ketuaSeksyen.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Penempatan Tanggung Kerja',
                            path: '/perjawatan/penamatan-tanggung-kerja',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: ' Gantian Cuti Rehat',
                            path: '/cuti/gantian-cuti-rehat'
                        }
                    ]
                },
                {
                    name: 'Pinjaman',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman',

                        }
                    ]
                },

            ]
        },

        // Klinik Panel
        {
            role: RoleConstant.klinikPanel.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: ' Maklumat Bil Rawatan',
                    path: '/maklumat-bil-rawatan',

                },
                {
                    name: 'Maklumat Kakitangan',
                    path: '/maklumat-kakitangan',
                },
                {
                    name: 'Sejarah Tuntutan',
                    path: '/sejarah-tuntutan',
                },
                {
                    name: 'Bil Tuntutan Panel Klinik',
                    path: '/bil-tuntutan-panel-klinik',
                },
                {
                    name: 'Profil',
                    path: '/profil',
                }

            ]
        },

        // Pelulus
        {
            role: RoleConstant.pelulus.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Lantikan Baru',
                            path: '/perjawatan/lantikan-baru',
                        },
                        {
                            name: 'Tawaran Baru',
                            path: '/perjawatan/tawaran-baru',
                        },
                        {
                            name: 'PTB & KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan'
                        },
                    ]
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Perlantikan Baru (Kontrak)',
                            path: '/kakitangan-kontrak/lantikan-baru',
                        },
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ]
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-panel-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/perubatan/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Cuti',
                            path: '/cuti/permohonan-cuti',
                        },
                    ]
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Senarai Permohonan Elaun-elaun',
                            path: '/elaun/senarai-permohonan',
                        },
                    ]
                },
                {
                    name: 'Pinjaman dan Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-kuarters/pinjaman',
                        },
                    ]
                },
            ]
        },

        // Pengarah Audit
        {
            role: RoleConstant.pengarahAudit.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Pengesahan Dalam Perkhidmatan',
                            path: 'perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                    ]
                }
            ]
        },

        // Pengarah Bahagian Negeri
        {
            role: RoleConstant.pengarahBahagian.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Pengesahan dalam Perkhidmatan',
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Cuti',
                            path: '/cuti/permohonan-cuti',
                        },
                        {
                            name: 'Pengumpulan Gantian Cuti Rehat',
                            path: '/cuti/pengumpulan-gantian-cuti-rehat',
                        },
                        {
                            name: 'Pengeluaran Gantian Cuti Rehat Awal',
                            path: '/cuti/pengeluaran-gantian-cuti-rehat-awal',
                        },
                    ]
                },
                {
                    name: 'Elaun',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Elaun',
                            path: '/elaun/permohonan',
                        },
                    ]
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                    ]
                },
                {
                    name: 'Pinjaman',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Kuarters',
                            path: '/pinjaman/permohonan-kuarters',
                        },
                    ]
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Pembaharuan Kakitangan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },

                    ]
                },
            ]
        },

        // Pengarah Pengarah Integriti
        {
            role: RoleConstant.pengarahIntegriti.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama'
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Pengesahan Dalam Perkhidmatan',
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                    ]
                },
                {
                    name: 'Integriti',
                    path: '',
                    subItems: [
                        {
                            name: 'Surcaj',
                            path: '/integriti/surcaj',
                        },
                        {
                            name: 'Prosiding Tatatertib',
                            path: '/integriti/prosiding',
                        },
                        {
                            name: 'Prosiding Tatatertib - Rayuan',
                            path: '/integriti/rayuan',
                        },
                    ]
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                    ]
                },
            ]
        },

        // Pengarah Perkhidmatan khidmat pengurusan
        {
            role: RoleConstant.pengarahKhidmatPengurusan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Cuti',
                            path: '/cuti/permohonan-cuti',
                        },
                    ]
                },
                {
                    name: 'Gaji',
                    path: '',
                    subItems: [
                        {
                            name: 'Pergerakan Gaji',
                            path: '/gaji/pergerakan-gaji',
                        },
                        {
                            name: 'Gaji & Elaun-elaun Kakitangan',
                            path: '/gaji/gaji-elaun-kakitangan',
                        },
                    ]
                },
            ]
        },

        // Penyokong
        {
            role: RoleConstant.penyokong.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Latiham Baru',
                            path: '/perjawatan/lantikan-baru',
                        },
                        {
                            name: 'Tawaran Baru',
                            path: '/perjawatan/tawaran-baru',
                        },
                        {
                            name: 'PTB & KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Cuti',
                            path: '/cuti/permohonan-cuti',
                        },
                    ]
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems:[
                        {
                            name: 'Senarai Permohonan Elaun-elaun',
                            path: '/elaun/senarai-permohonan',
                        }
                        
                    ]
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: ' Perlantikan Baru (Kontrak)',
                            path: '/kakitangan-kontrak/lantikan-baru',
                        },
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ]
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-panel-klinik',
                        },
                        {
                            name: 'Perkhidmatan ( Bil Tuntutan Klinik)',
                            path: '/perubatan/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan ( Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ]
                },
            ]
        },
        
        // Super Admin
        {
            role: RoleConstant.superAdmin.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Log Audit Sistem',
                    path: '/log-audit-sistem',
                },
            ]
        },

        // Timbalan Ketua Seksyen
        {
            role: RoleConstant.timbalanKetuaSeksyen.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Penamatan Tanggung Kerja',
                            path: '/perjawatan/penamatan-tanggung-kerja',
                        },
                    ]
                },
               
            ]
        },

        // Unit Bahagian
        {
            role: RoleConstant.unitBahagian.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems:[
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-panel-klinik',
                        },
                    ]
                },
            ]
        },

        // Unit Bahagian Negeri
        {
            role: RoleConstant.unitBahagian.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Lantikan Baru',
                            path: '/perjawatan/lantikan-baru',
                        },
                        {
                            name: 'Tawaran Baru',
                            path: '/perjawatan/tawaran-baru',
                        },
                        {
                            name: 'Pengesahan dalam Perkhidmatan',
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'PTB & KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Cuti (Rehat, Kecemasan, Sakit)',
                            path: '/cuti/cuti-rehat-kecemasan-sakit',
                        },
                        {
                            name: 'Pengumpulan Gantian Cuti Rehat',
                            path: '/cuti/pengumpulan-gantian-cuti-rehat',
                        },
                        {
                            name: 'Pengeluaran Gantian Cuti Rehat Awal',
                            path: '/cuti/pengeluaran-gantian-cuti-rehat-awal',
                        },
                        {
                            name: 'Kelulusan Cuti',
                            path: '/cuti/kelulusan-cuti',
                        },
                    ]
                },
                {
                    name: 'Gaji',
                    path:'',
                    subItems: [
                        {
                            name: 'Pergerakan Gaji',
                            path: '/gaji/pergerakan-gaji',
                        },
                        {
                            name: 'Gaji dan Elaun-elaun',
                            path: '/gaji/gaji-elaun',
                        },
                        {
                            name: 'Gaji Akhir',
                            path: '/gaji/gaji-akhir',
                        },
                        {
                            name: 'Sijil Gaji Akhir',
                            path: '/gaji/sijil-gaji-akhir',
                        },
                    ]
                },
                {
                    name: ' Integriti',
                    path: '',
                    subItems: [
                        {
                            name: 'Surcaj',
                            path: '/integriti/surcaj',
                        },
                        {
                            name: 'Prosiding Tatatertib',
                            path: '/integriti/prosiding',
                        },
                        {
                            name: 'Prosiding Tatatertib - Rayuan',
                            path: '/integriti/rayuan',
                        },
                    ]
                },
                {
                    name: 'LNPT',
                    path: '',
                    subItems: [
                        {
                            name: 'LNPT (Purata LNPT)',
                            path: '/lnpt/purata-lnpt',
                        },
                        {
                            name: 'Purata LNPT (Pengeshan Lantikan Baharu)',
                            path: '/lnpt/pengesahan-lantikan-baharu',
                        },
                        {
                            name: 'LNPT (Sejarah APC)',
                            path: '/lnpt/sejarah-apc'
                        }
                    ]
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Latihan (Kemaskini Peperiksaan dalam Jabatan LKIM)',
                            path: '/latihan/kemaskini-peperiksaan',
                        },
                        {
                            name: 'Latihan (Rekod Peperiksaan)',
                            path: 'latihan/rekod-peperiksaan',
                        },
                        {
                            name: 'Latihan (Permohonan Pembiayaan Pembelajaran)',
                            path: '/latihan/pembiayaan',
                        },
                        {
                            name: 'Latihan (Permohonan Tuntutan Pembiayaan Yuran Pengajian)',
                            path: '/latihan/tuntutan-yuran',
                        },
                    ]
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Perlantikan Baru (Kontrak)',
                            path: '/kakitangan-kontrak/perlantikan',
                        },
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ]
                },
                {
                    name: 'Pinjaman & Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-kuarters/pinjaman',
                        },
                        {
                            name: 'Kuarters - Permohonan Menduduki Kuarter',
                            path: '/pinjaman-kuarters/permohonan-menduduki-kuarter',
                        },
                        {
                            name: 'Kuarters - Permohonan Keluar Kuarter',
                            path: '/pinjaman-kuarters/permohonan-keluar-kuarter',
                        },
                    ]
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-panel-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/perubatan/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: 'perubatan/bil-tuntutan-kakitangan',
                        },
                        
                    ]
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Senarai Permohonan Elaun-elaun',
                            path: '/elaun/senarai-permohonan',
                        }
                    ]
                },
            ]
        },
        // Unit Pengurusan Fasiliti
        {
            role: RoleConstant.unitPengurusanFasiliti.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Pinjaman & Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-kuarters/pinjaman', 
                        },
                        {
                            name: 'Kuarters - Permohonan Menduduki Kuarter',
                            path:'/pinjaman-kuarters/permohonan-menduduki-kuarter',
                        },
                        {
                            name: 'Kuarters - Permohonan Keluar Kuarter',
                            path:'/pinjaman-kuarters/permohonan-keluar-kuarter',
                        },
                    ]
                },
            ]
        },

        // Urus Setia Cuti
        {
            role: RoleConstant.urusSetiaCuti.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems:[
                        {
                            name: 'Cuti (Rehat, Kecemasan, Sakit)',
                            path: '/cuti/cuti-rehat-kecemasan-sakit',
                        },
                        {
                            name: 'Pengumpulan Gantian Cuti Rehat',
                            path: '/cuti/pengumpulan-gantian-cuti-rehat',
                        },
                        {
                            name: 'Pengeluaran Gantian Cuti Rehat Awal',
                            path:'/cuti/pengeluaran-gantian-cuti-rehat-awal',
                        },
                        {
                            name: 'Kelulusan Cuti',
                            path: '/cuti/kelulusan-cuti',
                        },
                    ]
                }
            ]
        },
        // Urus Setia Elaun
        {
            role: RoleConstant.urusSetiaElaunElaunPerkhidmatan.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path:'',
                    subItems: [
                        {
                            name: 'Senarai Permohonan Elaun-elaun',
                            path: '/elaun/senarai-permohonan',
                        }
                    ]
                }
            ]
        },
        // Urus Setia Gaji
        {
            role: RoleConstant.urusSetiaGaji.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Gaji',
                    path: '',
                    subItems:[
                        {
                            name: 'Pergerakan Gaji',
                            path: '/gaji/pergerakan-gaji',
                        },
                        {
                            name: 'Gaji dan Elaun-elaun',
                            path: '/gaji/gaji-elaun',
                        },
                        {
                            name: 'Gaji Akhir',
                            path: '/gaji/gaji-akhir',
                        },
                        {
                            name: 'Sijil Gaji Akhir',
                            path: '/gaji/sijil-gaji-akhir',
                        },
                    ]
                },
            ]
        },
        // Urus Setia Integriti
        {
            role: RoleConstant.urusSetiaIntegriti.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Lantikan Baru',
                            path: '/perjawatan/lantikan-baru',
                        },
                        {
                            name: 'Tawaran Baru',
                            path: '/perjawatan/tawaran-baru',
                        },
                        {
                            name: 'Pengesahan dalam Perkhidmatan',
                            path:
                                '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'PTB dan KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ]
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Cuti (Rehat, Kecemasan, Sakit)',
                            path: '/cuti/cuti-rehat-kecemasan-sakit',
                        },
                        {
                            name: 'Pengumpulan Gantian Cuti Rehat',
                            path: '/cuti/pengumpulan-gantian-cuti-rehat',
                        },
                        {
                            name: 'Pengeluaran Gantian Cuti Rehat Awal',
                            path:
                                '/cuti/pengeluaran-gantian-cuti-rehat-awal',
                        },
                        {
                            name: 'Kelulusan Cuti',
                            path: '/cuti/kelulusan-cuti',
                        },
                    ]
                },
                {
                    name: 'Gaji',
                    path: '',
                    subItems: [
                        {
                            name: 'Pergerakan Gaji',
                            path: '/gaji/pergerakan-gaji',
                        },
                        {
                            name: 'Gaji dan Elaun-elaun',
                            path: '/gaji/gaji-elaun',
                        },
                        {
                            name: 'Gaji Akhir',
                            path: '/gaji/gaji-akhir',
                        },
                        {
                            name: 'Sijil Gaji Akhir',
                            path: '/gaji/sijil-gaji-akhir',
                        },
                    ]
                },
                {
                    name: 'Integriti',
                    path:'',
                    subItems: [
                        {
                            name: 'Surcaj',
                            path: '/integriti/surcaj',
                        },
                        {
                            name: 'Prosiding Tatatertib',
                            path: '/integriti/prosiding',
                        },
                        {
                            name: 'Prosiding Tatatertib - Rayuan',
                            path: '/integriti/rayuan',
                        },
                    ]
                },
                {
                    name: 'LNPT',
                    path: '',
                    subItems: [
                        {
                            name: 'LNPT (Purata LNPT)',
                            path: '/lnpt/purata-lnpt',
                        },
                        {
                            name: 'Purata LNPT (Pengesahan Lantikan Baharu)',
                            path: '/lnpt/pengesahan-lantikan-baharu',
                        },
                        {
                            name: 'LNPT (Sejarah APC)',
                            path: '/lnpt/sejarah-apc',
                        },
                    ]
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Latihan (Kemaskini Peperiksaan dalam Jabatan LKIM)',
                            path: '/latihan/kemaskini-peperiksaan',
                        },
                        {
                            name: 'Latihan (Rekod Peperiksaan)',
                            path: '/latihan/rekod-peperiksaan',
                        },
                        {
                            name: 'Latihan (Permohonan Pembiayaan Pembelajaran)',
                            path: '/latihan/pembiayaan',
                        },
                        {
                            name: 'Latihan (Permohonan Tuntutan Pembiayaan Yuran Pengajian)',
                            path: '/latihan/tuntutan-yuran',
                        },
                    ]
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Perlantikan Baru (Kontrak)',
                            path: '/kakitangan-kontrak/perlantikan',
                        },
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ]
                },
                {
                    name: 'Pinjaman & Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-kuarters/pinjaman',
                        },
                        {
                            name: 'Kuarters - Permohonan Menduduki Kuarter',
                            path: '/pinjaman-kuarters/permohonan-menduduki-kuarter',
                        },
                        {
                            name: 'Kuarters - Permohonan Keluar Kuarter',
                            path: '/pinjaman-kuarters/permohonan-keluar-kuarter',
                        },
                    ]
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-panel-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/perubatan/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ]
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Senarai Permohonan Elaun-elaun',
                            path: '/elaun/senarai-permohonan',
                        },
                    ]
                }

            ]
        },
  
        // Urus Setia Latihan
        {
            role: RoleConstant.urusSetiaLatihan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Latihan (Kemaskini Peperiksaan dalam Jabatan LKIM)',
                            path: '/latihan/kemaskini-peperiksaan',
                        },
                        {
                            name: 'Latihan (Rekod Peperiksaan)',
                            path: '/latihan/rekod-peperiksaan',
                        },
                        {
                            name: 'Latihan (Permohonan Pembiayaan Pembelajaran)',
                            path: '/latihan/pembiayaan',
                        },
                        {
                            name: 'Latihan (Permohonan Tuntutan Pembiayaan Yuran Pengajian)',
                            path: '/latihan/tuntutan-yuran',
                        },
                    ]
                }
            ]
        },
        // Urus Setia LNPT
        {
            role: RoleConstant.urusSetiaLnpt.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'LNPT',
                    path: '',
                    subItems: [
                        {
                            name: 'LNPT (Purata LNPT)',
                            path: '/lnpt/purata-lnpt',
                        },
                        {
                            name: 'Purata LNPT (Pengesahan Lantikan Baharu)',
                            path: '/lnpt/pengesahan-lantikan-baharu',
                        },
                        {
                            name: 'LNPT (Sejarah APC)',
                            path: '/lnpt/sejarah-apc',
                        },
                    ]
                },
            ]
        },
        // Urus Setia Perjawatan
        {
            role: RoleConstant.urusSetiaPerjawatan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Lantikan Baru',
                            path: '/perjawatan/lantikan-baru',
                        },
                        {
                            name: 'Tawaran Baru',
                            path: '/perjawatan/tawaran-baru',
                        },
                        {
                            name: 'Pengesahan dalam Perkhidmatan',
                            path:
                                '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'PTB dan KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ]
                },
            ]
        },
        // Urus Setia Persaraan
        {
            role: RoleConstant.urusSetiaPersaraan.code,
            navItems:[
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Lantikan Baru',
                            path: '/perjawatan/lantikan-baru',
                        },
                        {
                            name: 'Tawaran Baru',
                            path: '/perjawatan/tawaran-baru',
                        },
                        {
                            name: 'Pengesahan dalam Perkhidmatan',
                            path:
                                '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'PTB dan KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ]
                },
            ]
        },
        // Urus Setia Perubatan
        {
            role:RoleConstant.urusSetiaPerubatan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-panel-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/perubatan/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ]
                },
            ]
        },

        // Urus Setia Pentadbiran
        // urus Seta Tatatertib
        // unit negeri


    ];
}
