import type { RadioDTO } from "$lib/dto/core/radio/radio.dto";

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
