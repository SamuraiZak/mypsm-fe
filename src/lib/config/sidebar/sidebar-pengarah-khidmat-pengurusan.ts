export const sidebarPengarahKhidmatPengurusan = [
    {
        name: 'Halaman Utama',
        redirect: '/pengarah-khidmat-pengurusan/halaman-utama',
    },
    {
        name: 'Perjawatan',
        dropdown: [
            {
                name: 'Tanggung Kerja',
                redirect:
                    '/pengarah-khidmat-pengurusan/perjawatan/tanggung-kerja',
            },
        ],
    },
    {
        name: 'Cuti',
        dropdown: [
            {
                name: 'Permohonan Cuti',
                redirect: '/pengarah-khidmat-pengurusan/cuti/permohonan-cuti',
            },
        ],
    },
    {
        name: 'Gaji',
        dropdown: [
            {
                name: 'Pergerakan Gaji',
                redirect: '/pengarah-khidmat-pengurusan/gaji/pergerakan-gaji',
            },
            {
                name: 'Gaji & Elaun-elaun Kakitangan',
                redirect:
                    '/pengarah-khidmat-pengurusan/gaji/gaji-elaun-kakitangan',
            },
        ],
    },
];
