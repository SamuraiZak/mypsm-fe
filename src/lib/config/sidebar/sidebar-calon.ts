export const sidebarCalon = [
    {
        name: 'Halaman Utama',
        redirect: '/calon/halaman-utama',
    },
    {
        name: 'Lantikan Baru',
        redirect: '/calon/perjawatan/lantikan-baru',
    },
    {
        name: 'Maklumat Kontrak',
        dropdown: [
            {
                name: 'Perlantikan Baru (Kontrak)',
                redirect: '/calon/maklumat-kontrak/lantikan-baru',
            },
            {
                name: 'Pembaharuan Kontrak',
                redirect: '/calon/maklumat-kontrak/pembaharuan',
            },
        ],
    },
];
