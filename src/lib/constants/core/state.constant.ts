// ===============================================================
// State Constant
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class StateConstant {
    public static noData: LookupDTO = {
        id: 1,
        code: '00',
        description: 'Tiada Maklumat',
    };
    public static johor: LookupDTO = {
        id: 2,
        code: '01',
        description: 'Johor',
    };
    public static kedah: LookupDTO = {
        id: 3,
        code: '02',
        description: 'Kedah',
    };
    public static kelantan: LookupDTO = {
        id: 4,
        code: '03',
        description: 'Kelantan',
    };
    public static melaka: LookupDTO = {
        id: 5,
        code: '04',
        description: 'Melaka',
    };
    public static negeriSembilan: LookupDTO = {
        id: 6,
        code: '05',
        description: 'Negeri Sembilan',
    };
    public static pahang: LookupDTO = {
        id: 7,
        code: '06',
        description: 'Pahang',
    };
    public static pulauPinang: LookupDTO = {
        id: 8,
        code: '07',
        description: 'Pulau Pinang',
    };
    public static perak: LookupDTO = {
        id: 9,
        code: '08',
        description: 'Perak',
    };
    public static perlis: LookupDTO = {
        id: 10,
        code: '09',
        description: 'Perlis',
    };
    public static selangor: LookupDTO = {
        id: 11,
        code: '10',
        description: 'Selangor',
    };
    public static terengganu: LookupDTO = {
        id: 12,
        code: '11',
        description: 'Terengganu',
    };
    public static sabah: LookupDTO = {
        id: 13,
        code: '12',
        description: 'Sabah',
    };
    public static sarawak: LookupDTO = {
        id: 14,
        code: '13',
        description: 'Sarawak',
    };
    public static wpKL: LookupDTO = {
        id: 15,
        code: '14',
        description: 'Wilayah Persekutuan Kuala Lumpur',
    };
    public static wpLB: LookupDTO = {
        id: 16,
        code: '15',
        description: 'Wilayah Persekutuan Labuan',
    };
    public static wpPJ: LookupDTO = {
        id: 17,
        code: '16',
        description: 'Wilayah Persekutuan Putrajaya',
    };
    public static list: LookupDTO[] = [
        this.noData,
        this.johor,
        this.kedah,
        this.kelantan,
        this.melaka,
        this.negeriSembilan,
        this.pahang,
        this.pulauPinang,
        this.perak,
        this.perlis,
        this.selangor,
        this.terengganu,
        this.sabah,
        this.sarawak,
        this.wpKL,
        this.wpLB,
        this.wpPJ,
    ];
}
