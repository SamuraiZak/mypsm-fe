// ===============================================================
// Apply on behalf Constant
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class ApplyOnBehalfConstant {
    public static self: LookupDTO = {
        id: 1,
        code: 'AP01',
        description: 'Diri Sendiri',
    };
    public static selfAndFamily: LookupDTO = {
        id: 2,
        code: 'AP02',
        description: 'Diri Sendiri dan Ahli Keluarga',
    };
    public static family: LookupDTO = {
        id: 3,
        code: 'AP03',
        description: 'Ahli Keluarga',
    };
    public static list: LookupDTO[] = [
        this.self,
        this.selfAndFamily,
        this.family,
    ];
}
