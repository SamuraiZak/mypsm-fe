import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';

export const certifyOptions: RadioDTO[] = [
    {
        value: true,
        name: 'SAH',
    },
    {
        value: false,
        name: 'TIDAK SAH',
    },
];
export const confirmOptions: RadioDTO[] = [
    {
        value: true,
        name: 'PERAKU',
    },
    {
        value: false,
        name: 'TIDAK PERAKU',
    },
];

export const approveOptions: RadioDTO[] = [
    {
        value: true,
        name: 'LULUS',
    },
    {
        value: false,
        name: 'TIDAK LULUS',
    },
];

export const eligibleOptions: RadioDTO[] = [
    {
        value: true,
        name: 'LAYAK',
    },
    {
        value: false,
        name: 'TIDAK LAYAK',
    },
];

export const supportOptions: RadioDTO[] = [
    {
        value: true,
        name: 'SOKONG',
    },
    {
        value: false,
        name: 'TIDAK SOKONG',
    },
];

export const integrityOptions: RadioDTO[] = [
    {
        value: true,
        name: 'BEBAS',
    },
    {
        value: false,
        name: 'TIDAK BEBAS',
    },
];

export const commonOptions: RadioDTO[] = [
    {
        value: true,
        name: 'YA',
    },
    {
        value: false,
        name: 'TIDAK',
    },
];

export const proceedingMeetingOptions: RadioDTO[] = [
    {
        value: true,
        name: 'BERSALAH',
    },
    {
        value: false,
        name: 'TIDAK BERSALAH',
    },
];

export const certifySurcajOptions: RadioDTO[] = [
    {
        value: false,
        name: 'SAH',
    },
    {
        value: true,
        name: 'TIDAK SAH',
    },
];

export const existOptions: RadioDTO[] = [
    {
        value: false,
        name: 'ADA',
    },
    {
        value: true,
        name: 'TIDAK ADA',
    },
];