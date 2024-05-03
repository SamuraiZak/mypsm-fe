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
                    name: 'Profil',
                    path: '/profile',
                },
                {
                    name: 'Perjawatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Pengesahan dalam Perkhidmatan',
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
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
                            path: '/perjawatan/proses_pertukaran',
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
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                        {
                            name: 'Cuti Rehat, Kecemasan dan Sakit (HRMIS)',
                            path: '/cuti/cuti_rehat,_kecemasan_dan_sakit',
                        },
                        {
                            name: 'Pengumpulan GCR',
                            path: '/cuti/pengumpulan_GCR',
                        },
                        {
                            name: 'Pengeluaran GCR',
                            path: '/cuti/pengeluaran_GCR',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
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
                    ],
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Rekod Latihan Kakitangan',
                            path: '/latihan/rekod-peperiksaan',
                        },
                        {
                            name: 'Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                        {
                            name: 'Tuntutan Pembiayaan Yuran Pengajian',
                            path: '/latihan/tuntutan-yuran',
                        },
                    ],
                },
                {
                    name: 'Pinjaman & Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman',
                            path: '/pinjaman-dan-kuarters/pinjaman',
                        },
                        {
                            name: 'Kuarters (Permohonan Masuk)',
                            path: '/pinjaman-dan-kuarters/permohonan-masuk-kuarters',
                        },
                        {
                            name: 'Kuarters (Permohonan Keluar)',
                            path: '/pinjaman-dan-kuarters/permohonan-keluar-kuarters',
                        },
                    ],
                },
                {
                    name: 'Perubatan',
                    path: '/perubatan',
                },

                {
                    name: 'Rekod Perkhidmatan',
                    path: '/rekod-perkhidmatan',
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
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
                    name: 'Pengurusan Sistem',
                    path: '/pengurusan_sistem',
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                            path: '/maklumat-kontrak/pembaharuan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        //Kakitangan Kontrak
        {
            role: RoleConstant.kakitanganKontrak.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Maklumat Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ],
                },
            ],
        },

        //Calon Kakitangan Kontrak
        {
            role: RoleConstant.calonKontrak.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Maklumat Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Perlantikan Baru (Kontrak)',
                            path: '/kakitangan-kontrak/lantikan-baru',
                        },
                    ],
                },
            ],
        },

        //Ketua Pengarah
        {
            role: RoleConstant.ketuaPengarah.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                        {
                            name: 'Pengeluaran GCR',
                            path: '/cuti/pengeluaran_GCR',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Ketua Seksyen
        {
            role: RoleConstant.ketuaSeksyen.code,
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
                    ],
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Pengumpulan GCR',
                            path: '/cuti/pengumpulan_GCR',
                        },
                    ],
                },
                {
                    name: 'Pinjaman',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-dan-kuarters/pinjaman',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                    path: '/klinik-panel/maklumat-bil-rawatan',
                },
                {
                    name: 'Maklumat Kakitangan',
                    path: '/klinik-panel/maklumat-kakitangan',
                },
                {
                    name: 'Sejarah Tuntutan',
                    path: '/klinik-panel/sejarah-tuntutan',
                },
                {
                    name: 'Bil Tuntutan Klinik',
                    path: '/klinik-panel/bil-tuntutan-klinik',
                },
                {
                    name: 'Profil',
                    path: '/klinik-panel/profil',
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Urusetia Pendatdiran
        {
            role: RoleConstant.urusSetiaPentadbiran.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Pinjaman dan Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-dan-kuarters/pinjaman',
                        },
                    ],
                },
            ],
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
                            path: '/perjawatan/proses_pertukaran',
                        },
                        {
                            name: 'Persaraan',
                            path: '/perjawatan/persaraan',
                        },
                    ],
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
                    ],
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-klinik-panel',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/klinik-panel/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ],
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Pinjaman dan Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-dan-kuarters/pinjaman',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Pengarah Bahagian Bahagian
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
                            path: '/perjawatan/proses_pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                    ],
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                        {
                            name: 'Pengumpulan GCR',
                            path: '/cuti/pengumpulan_GCR',
                        },
                        {
                            name: 'Pengeluaran GCR',
                            path: '/cuti/pengeluaran_GCR',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                    ],
                },
                {
                    name: 'Pinjaman dan Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Masuk Kuarters',
                            path: '/pinjaman-dan-kuarters/permohonan-masuk-kuarters',
                        },
                        {
                            name: 'Permohonan Keluar Kuarters',
                            path: '/pinjaman-dan-kuarters/permohonan-keluar-kuarters',
                        },
                    ],
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Pembaharuan Kakitangan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Pengarah Bahagian Negeri
        {
            role: RoleConstant.pengarahNegeri.code,
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
                            path: '/perjawatan/proses_pertukaran',
                        },
                        {
                            name: 'Tanggung Kerja',
                            path: '/perjawatan/tanggung-kerja',
                        },
                    ],
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                        {
                            name: 'Pengumpulan GCR',
                            path: '/cuti/pengumpulan_GCR',
                        },
                        {
                            name: 'Pengeluaran GCR',
                            path: '/cuti/pengeluaran_GCR',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                    ],
                },
                {
                    name: 'Pinjaman dan Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Kuarters',
                            path: '/pinjaman-dan-kuarters/permohonan-masuk-kuarters',
                        },
                        {
                            name: 'Permohonan Keluar Kuarters',
                            path: '/pinjaman-dan-kuarters/permohonan-keluar-kuarters',
                        },
                    ],
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Pembaharuan Kakitangan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Pengarah Pengarah Integriti
        {
            role: RoleConstant.pengarahIntegriti.code,
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
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                    ],
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
                    ],
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan Pembiayaan Pembelajaran',
                            path: '/latihan/pembiayaan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                    ],
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                    ],
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
                            path: '/gaji/gaji-elaun',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Penyokong
        {
            role: RoleConstant.penyokong.code,
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
                            name: 'Latihan Baru',
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
                            path: '/perjawatan/proses_pertukaran',
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
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
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
                    ],
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-klinik-panel',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/klinik-panel/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                            path: '/perjawatan/tanggung-kerja',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-klinik-panel',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Unit Bahagian Negeri
        {
            role: RoleConstant.unitBahagian.code,
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
                            path: '/perjawatan/proses_pertukaran',
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
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                    ],
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
                    ],
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
                    ],
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
                            path: '/lnpt/sejarah-apc',
                        },
                    ],
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
                    ],
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
                    ],
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
                    ],
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-klinik-panel',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Unit Pengurusan Fasiliti
        {
            role: RoleConstant.unitPengurusanFasiliti.code,
            navItems: [
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
                            path: '/pinjaman-dan-kuarters/pinjaman',
                        },
                        {
                            name: 'Kuarters - Permohonan Menduduki Kuarter',
                            path: '/pinjaman-dan-kuarters/permohonan-menduduki-kuarters',
                        },
                        {
                            name: 'Kuarters - Permohonan Keluar Kuarter',
                            path: '/pinjaman-dan-kuarters/permohonan-keluar-kuarters',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Urus Setia Cuti
        {
            role: RoleConstant.urusSetiaCuti.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Cuti',
                    path: '',
                    subItems: [
                        {
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan_cuti_kakitangan',
                        },
                        {
                            name: 'Permohonan',
                            path: '/cuti/permohonan',
                        },
                        {
                            name: 'Cuti Rehat, Kecemasan dan Sakit (HRMIS)',
                            path: '/cuti/cuti_rehat,_kecemasan_dan_sakit',
                        },
                        {
                            name: 'Pengumpulan GCR',
                            path: '/cuti/pengumpulan_GCR',
                        },
                        {
                            name: 'Pengeluaran GCR',
                            path: '/cuti/pengeluaran_GCR',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Urus Setia Elaun
        {
            role: RoleConstant.urusSetiaElaunElaunPerkhidmatan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Urus Setia Gaji
        {
            role: RoleConstant.urusSetiaGaji.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
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
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Urus Setia Khidmat Sokongan
        {
            role: RoleConstant.urusSetiaKhidmatSokongan.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Pembaharuan Kontrak',
                            path: '/kakitangan-kontrak/pembaharuan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Urus Setia Integriti
        {
            role: RoleConstant.urusSetiaIntegriti.code,
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
                            path: '/perjawatan/proses_pertukaran',
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
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                        {
                            name: 'Pengeluaran GCR',
                            path: '/cuti/pengeluaran_GCR',
                        },
                    ],
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
                    ],
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
                    ],
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
                    ],
                },
                {
                    name: 'Latihan',
                    path: '',
                    subItems: [
                        {
                            name: 'Latihan (Permohonan Pembiayaan Pembelajaran)',
                            path: '/latihan/pembiayaan',
                        },
                    ],
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
                    ],
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
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
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
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
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
                            path: '/perjawatan/proses_pertukaran',
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
                    name: 'Kakitangan Kontrak',
                    path: '',
                    subItems: [
                        {
                            name: 'Perlantikan Baru (Kontrak)',
                            path: '/kakitangan-kontrak/lantikan-baru',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Urus Setia Persaraan
        {
            role: RoleConstant.urusSetiaPersaraan.code,
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
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'PTB dan KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan/urus-setia',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/proses_pertukaran',
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
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
        // Urus Setia Perubatan
        {
            role: RoleConstant.urusSetiaPerubatan.code,
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
                            name: 'Perkhidmatan (Permohonan Klinik Panel)',
                            path: '/perubatan/permohonan-klinik-panel',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                            path: '/klinik-panel/bil-tuntutan-klinik',
                        },
                        {
                            name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                            path: '/perubatan/bil-tuntutan-kakitangan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },

        // Urus Setia Pentadbiran
        {
            role: 'Urus Setia Pentadbiran',
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Pinjaman',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                            path: '/pinjaman-kuarters/pinjaman',
                        },
                    ],
                },
            ],
        },
        // urus Seta Tatatertib
        {
            role: RoleConstant.urusSetiaTatatertib.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Integriti',
                    path: '',
                    subItems: [
                        {
                            name: 'Prosiding Tatatertib',
                            path: '/integriti/prosiding',
                        },
                        {
                            name: 'Prosiding Tatatertib - Rayuan',
                            path: '/integriti/rayuan',
                        },
                    ],
                },
            ],
        },

        //Urus Setia Peringkat Negeri
        {
            role: RoleConstant.urusSetiaPeringkatNegeri.code,
            navItems: [
                {
                    name: 'Halaman Utama',
                    path: '/halaman-utama',
                },
                {
                    name: 'Pinjaman & Kuarters',
                    path: '',
                    subItems: [
                        {
                            name: 'Pinjaman',
                            path: '/pinjaman-dan-kuarters/pinjaman',
                        },
                        {
                            name: 'Kuarters (Permohonan Masuk)',
                            path: '/pinjaman-dan-kuarters/permohonan-masuk-kuarters',
                        },
                        {
                            name: 'Kuarters (Permohonan Keluar)',
                            path: '/pinjaman-dan-kuarters/permohonan-keluar-kuarters',
                        },
                    ],
                },
            ],
        },

        // unit negeri
        {
            role: RoleConstant.unitNegeri.code,
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
                            path: '/perjawatan/pengesahan-dalam-perkhidmatan',
                        },
                        {
                            name: 'PTB & KWAP',
                            path: '/perjawatan/PTB-dan-KWAP',
                        },
                        {
                            name: 'Pemangkuan',
                            path: '/perjawatan/pemangkuan/urus-setia',
                        },
                        {
                            name: 'Kenaikan Pangkat',
                            path: '/perjawatan/kenaikan-pangkat',
                        },
                        {
                            name: 'Pertukaran',
                            path: '/perjawatan/proses_pertukaran',
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
                            name: 'Peruntukan',
                            path: '/cuti/peruntukan',
                        },
                    ],
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
                    ],
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
                    ],
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
                            path: '/lnpt/sejarah-apc',
                        },
                    ],
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
                    ],
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
                    ],
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
                    ],
                },
                {
                    name: 'Perubatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Perkhidmatan (Permohonan Panel Klinik)',
                            path: '/perubatan/permohonan-klinik-panel',
                        },
                    ],
                },
                {
                    name: 'Elaun-elaun Perkhidmatan',
                    path: '',
                    subItems: [
                        {
                            name: 'Permohonan',
                            path: '/elaun-elaun_perkhidmatan/permohonan',
                        },
                    ],
                },
                {
                    name: 'Tetapan Akaun',
                    path: '/tetapan',
                },
            ],
        },
    ];
}
