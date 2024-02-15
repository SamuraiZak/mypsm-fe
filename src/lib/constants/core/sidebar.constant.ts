// ===============================================================
// Sidebar Constant
// ===============================================================

import type { SidebarDTO } from '$lib/dto/core/sidebar/sidebar.dto';

export class SidebarConstant {
    public static sidebar: SidebarDTO[] = [
        {
            role: 'Kakitangan',
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
            ],
        },
    ];
}
