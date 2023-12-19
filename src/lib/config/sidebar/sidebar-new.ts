export const sidebarNew = [
    {
        name: 'Halaman Utama',
        redirect: '/halaman-utama',
    },
    {
        name: 'Perjawatan',
        dropdown: [
            {
                name: 'Lantikan Baru',
                redirect: '/perjawatan/lantikan',
            },
            {
                name: 'Tawaran Baru',
                redirect: '/perjawatan/tawaran',
            },
            {
                name: 'Pengesahan dalam Perkhidmatan',
                redirect: '/perjawatan/pengesahan',
            },
            {
                name: 'PTB & KWAP',
                redirect: '/perjawatan/PTB-dan-KWAP',
            },
            {
                name: 'Pemangkuan',
                redirect: '/perjawatan/pemangkuan',
            },
            {
                name: 'Kenaikan Pangkat',
                redirect: '/perjawatan/naik-pangkat',
            },
            {
                name: 'Pertukaran',
                redirect: '/perjawatan/pertukaran',
            },
            {
                name: 'Tanggung Kerja',
                redirect: '/perjawatan/tanggung-kerja',
            },
            {
                name: 'Persaraan',
                redirect: '/perjawatan/persaraan',
            },
            {
                name: 'Kelayakan Gaji Baru',
                redirect: '/perjawatan/kelayakan',
            },
        ],
    },
    {
        name: 'Cuti',
        dropdown: [
            {
                name: 'Cuti Rehat, Kecemasan, Sakit',
                redirect: '/cuti/jenis-cuti',
            },
            {
                name: 'Pengumpulan Gantian Cuti Rehat',
                redirect: '/cuti/ganti',
            },
            {
                name: 'Pengumpulan Gantian Cuti Rehat Awal',
                redirect: '/cuti/pengumpulan',
            },
            {
                name: 'Pelulusan Cuti',
                redirect: '/cuti/pelulusan',
            },
        ],
    },
    {
        name: 'Gaji',
        dropdown: [
            {
                name: 'Pergerakan Gaji',
                redirect: '/cuti/pergerakan',
            },
            {
                name: 'Gaji & Elaun-elaun',
                redirect: '/cuti/gaji-elaun',
            },
            {
                name: 'Gaji Akhir',
                redirect: '/cuti/gaji-akhir',
            },
            {
                name: 'Sijil Gaji Akhir',
                redirect: '/cuti/sijil-gaji-akhir',
            },
        ],
    },
    {
        name: 'Integriti',
        dropdown: [
            {
                name: 'Surcaj',
                redirect: '/integriti/surcaj',
            },
            {
                name: 'Prosiding Tatatertib',
                redirect: '/integriti/prosiding',
            },
            {
                name: 'Prosiding Tatatertib - Rayuan',
                redirect: '/integriti/prosiding-rayuan',
            },
        ],
    },
    {
        name: 'LNPT',
        dropdown: [
            {
                name: 'LNPT (Purata LNPT)',
                redirect: '/lnpt/purata',
            },
            {
                name: 'Purata LNPT (Pengesahan Lantikan Baharu)',
                redirect: '/lnpt/purata-pengesahan',
            },
            {
                name: 'LNPT (Sejarah APC)',
                redirect: '/lnpt/sejarah-apc',
            },
        ],
    },
    {
        name: 'Latihan',
        dropdown: [
            {
                name: 'Latihan (Kemaskini Peperiksaan dalam Jabatan LKIM)',
                redirect: '/latihan/kemaskini-peperiksaan',
            },
            {
                name: 'Latihan (Rekod Peperiksaan)',
                redirect: '/latihan/rekod',
            },
            {
                name: 'Latihan (Pemohonan Pembiayaan Pembelajaran)',
                redirect: '/latihan/pemohonan-pembiayaan',
            },
            {
                name: 'Latihan (Pemohonan Tuntutan Pembiayaan Yuran Pengajian)',
                redirect: '/latihan/pemohonan-tuntutan',
            },
        ],
    },
    {
        name: 'Kakitangan Kontrak',
        dropdown: [
            {
                name: 'Pelantikan Baru (Kontrak)',
                redirect: '/kakitangan-kontrak/pelantikan-baru',
            },
            {
                name: 'Pembaharuan Kontrak',
                redirect: '/kakitangan-kontrak/pembaharuan',
            },
        ],
    },
    {
        name: 'Pinjaman & Kuarters',
        dropdown: [
            {
                name: 'Pinjaman Komputer, Telefon Pintar & Kenderaan',
                redirect: '/pinjaman-kuarters/pekakas-kenderaan',
            },
            {
                name: 'Kuarters - Pemohonan Menduduki Kuarter',
                redirect: '/pinjaman-kuarters/pemohonan-menduduki',
            },
            {
                name: 'Kuarters - Pemohonan Keluar Kuarter',
                redirect: '/pinjaman-kuarters/pemohonan-keluar',
            },
        ],
    },
    {
        name: 'Perubatan',
        dropdown: [
            {
                name: 'Perkhidmatan (Pemohonan Panel Klinik)',
                redirect: '/perubatan/pemohonan',
            },
            {
                name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                redirect: '/perubatan/bil-klinik',
            },
            {
                name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                redirect: '/perubatan/bil-kakitangan',
            },
        ],
    },
    {
        name: 'Elaun-elaun Perkhidmatan',
        dropdown: [
            {
                name: 'Senarai Pemohonan Elaun-elaun',
                redirect: '/elaun/senarai',
            },
        ],
    },
];
