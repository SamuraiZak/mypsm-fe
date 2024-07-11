import type { ModuleDTO } from '$lib/dto/core/system/system.dto';

export class SystemConstant {
    public static systemModules: ModuleDTO[] = [
        {
            moduleName: 'Halaman Utama',
            url: '/v2/dashboard',
            color: 'text-blue-500',
            child: [],
        },
        {
            moduleName: 'Tetapan Akaun',
            url: '/v2/account-setting',
            color: 'text-gray-500',
            child: [
                {
                    moduleName: 'Kemaskini Kata Laluan',
                    url: '/v2/account-setting/password',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Pengurusan Sistem',
            url: '/v2/system-setting',
            color: 'text-red-500',
            child: [
                {
                    moduleName: 'Log Audit Sistem',
                    url: '/v2/system-setting/system-log',
                    child: [],
                },
                {
                    moduleName: 'Pengurusan Dropdown',
                    url: '/v2/system-setting/dropdown',
                    child: [],
                },
                {
                    moduleName: 'Pengurusan Peranan',
                    url: '/v2/system-setting/role',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Profil',
            url: '/v2/profile',
            color: 'text-yellow-500',
            child: [],
        },
        {
            moduleName: 'Perjawatan',
            url: '/v2/employment',
            color: 'text-green-500',
            child: [
                {
                    moduleName: 'Lantikan Baru',
                    url: '/v2/employment/new-hire',
                    child: [],
                },
                {
                    moduleName: 'Tawaran Baru',
                    url: '/v2/employment/new-offer',
                    child: [],
                },
                {
                    moduleName: 'Pemangkuan',
                    url: '/v2/employment/acting',
                    child: [],
                },
                {
                    moduleName: 'Pengesahan dalam Perkhidmatan',
                    url: '/v2/employment/confirmation',
                    child: [],
                },
                {
                    moduleName: 'Pengesahan Kenaikan Pangkat',
                    url: '/v2/employment/promotion',
                    child: [],
                },
                {
                    moduleName: 'Persaraan',
                    url: '/v2/employment/retirement',
                    child: [],
                },
                {
                    moduleName: 'Pertukaran',
                    url: '/v2/employment/transfer',
                    child: [],
                },
                {
                    moduleName: 'PTB dan KWAP',
                    url: '/v2/employment/ptb',
                    child: [],
                },
                {
                    moduleName: 'Tanggung Kerja',
                    url: '/v2/employment/interim',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Kakitangan Kontrak',
            url: '/v2/contractor',
            color: 'text-indigo-500',
            child: [
                {
                    moduleName: 'Lantikan Baru',
                    url: '/v2/contractor/new-hire',
                    child: [],
                },
                {
                    moduleName: 'Pembaharuan Kontrak',
                    url: '/v2/contractor/contract-renewal',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Integriti',
            url: '/v2/integrity',
            color: 'text-purple-500',
            child: [
                {
                    moduleName: 'Surcaj',
                    url: '/v2/integrity/surcharge',
                    child: [],
                },
                {
                    moduleName: 'Prosiding',
                    url: '/v2/integrity/proceeding',
                    child: [],
                },
                {
                    moduleName: 'Rayuan',
                    url: '/v2/integrity/appeal',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Cuti',
            url: '/v2/leave',
            color: 'text-orange-500',
            child: [
                {
                    moduleName: 'Kelayakan',
                    url: '/v2/leave/entitlement',
                    child: [],
                },
                {
                    moduleName: 'Permohonan',
                    url: '/v2/leave/application',
                    child: [],
                },
                {
                    moduleName: 'Gantian Cuti Rehat',
                    url: '/v2/leave/gcr',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'LNPT',
            url: '/v2/peformance',
            color: 'text-teal-500',
            child: [
                {
                    moduleName: 'LNPT - Semua Kakitangan',
                    url: '/v2/peformance/all',
                    child: [],
                },
                {
                    moduleName: 'LNPT - Pengesahan Dalam Pekhidmatan',
                    url: '/v2/peformance/confirmation',
                    child: [],
                },
                {
                    moduleName: 'APC',
                    url: '/v2/peformance/apc',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Elaun',
            url: '/v2/service-allowance',
            color: 'text-pink-500',
            child: [
                {
                    moduleName: 'Permohonan',
                    url: '/v2/service-allowance/application',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Pinjaman dan Kuarters',
            url: '/v2/loan-and-quarters',
            color: 'text-cyan-500',
            child: [
                {
                    moduleName: 'Masuk Kuarters',
                    url: '/v2/loan-and-quarters/quarters-entry',
                    child: [],
                },
                {
                    moduleName: 'Keluar Kuarters',
                    url: '/v2/loan-and-quarters/quarters-exit',
                    child: [],
                },
                {
                    moduleName: 'Pinjaman',
                    url: '/v2/loan-and-quarters/loan',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Gaji',
            url: '/v2/salary',
            color: 'text-amber-500',
            child: [
                {
                    moduleName: 'Gaji dan Elaun',
                    url: '/v2/salary/allowance',
                    child: [],
                },
                {
                    moduleName: 'Pergerakan Gaji',
                    url: '/v2/salary/movement',
                    child: [],
                },
                {
                    moduleName: 'Sijil Gaji Akhir',
                    url: '/v2/salary/final-salary-cert',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Perubatan',
            url: '/v2/medical',
            color: 'text-lime-500',
            child: [
                {
                    moduleName: 'Kelayakan',
                    url: '/v2/medical/entitlement',
                    child: [],
                },
                {
                    moduleName: 'Tuntutan Bil Kakitangan',
                    url: '/v2/medical/claims-employee',
                    child: [],
                },
                {
                    moduleName: 'Tuntutan Bil Klinik Panel',
                    url: '/v2/medical/claims-clinic',
                    child: [],
                },
                {
                    moduleName: 'Permohonan Klinik Panel',
                    url: '/v2/medical/clinic-application',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Latihan',
            url: '/v2/training',
            color: 'text-fuchsia-500',
            child: [
                {
                    moduleName: 'Rekod Latihan',
                    url: '/v2/training/record',
                    child: [],
                },
                {
                    moduleName: 'Pembiayaan',
                    url: '/v2/training/scholarship',
                    child: [],
                },
                {
                    moduleName: 'Tuntutan',
                    url: '/v2/training/claims',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Rekod Perkhidmatan',
            url: '/v2/service-record',
            color: 'text-emerald-500',
            child: [],
        },
    ];
}
