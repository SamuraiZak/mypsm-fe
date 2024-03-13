// ===============================================================
// Radio Option Constant
// ===============================================================

import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';

export class RadioConstant {
    // for application verification
    public static verify: RadioDTO[] = [
        {
            value: true,
            name: 'Sah',
        },
        {
            value: false,
            name: 'Tidak Sah',
        },
    ];

    // for application support
    public static support: RadioDTO[] = [
        {
            value: true,
            name: 'Sokong',
        },
        {
            value: false,
            name: 'Tidak Sokong',
        },
    ];

    public static approve: RadioDTO[] = [
        {
            value: true,
            name: 'Lulus',
        },
        {
            value: false,
            name: 'Tidak Lulus',
        },
    ];
}
