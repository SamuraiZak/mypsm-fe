export const sidebarUrusSetiaPinjamanDanKuarters = [
    {
        name: 'Halaman Utama',
        redirect: '/urus-setia/halaman-utama',
    },
    {
        name: 'Pinjaman & Kuarters',
        dropdown: [
            {
                name: 'Pinjaman Komputer, Telefon Pintar dan Kenderaan',
                redirect: '/urus-setia/pinjaman-kuarters/pinjaman',
            },
            {
                name: 'Kuarters - Permohonan Menduduki Kuarter',
                redirect:
                    '/urus-setia/pinjaman-kuarters/permohonan-menduduki-kuarter',
            },
            {
                name: 'Kuarters - Permohonan Keluar Kuarter',
                redirect:
                    '/urus-setia/pinjaman-kuarters/permohonan-keluar-kuarter',
            },
        ],
    },
];
