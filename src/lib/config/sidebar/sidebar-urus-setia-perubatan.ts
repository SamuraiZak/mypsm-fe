export const sidebarUrusSetiaPerubatan = [
    {
        name: 'Halaman Utama',
        redirect: '/urus-setia/halaman-utama',
    },
    {
        name: 'Perubatan',
        dropdown: [
            {
                name: 'Perkhidmatan (Permohonan Panel Klinik)',
                redirect: '/urus-setia/perubatan/permohonan-panel-klinik',
            },
            {
                name: 'Perkhidmatan (Bil Tuntutan Klinik)',
                redirect: '/urus-setia/perubatan/bil-tuntutan-klinik',
            },
            {
                name: 'Perkhidmatan (Bil Tuntutan Kakitangan)',
                redirect: '/urus-setia/perubatan/bil-tuntutan-kakitangan',
            },
        ],
    },
];
