// ===============================================================
// User Group Constants
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';

export class UserGroupConstant {
    public static employee: UserGroupDTO = {
        code: '889f7c6d-7373-4edc-a3cb-c7be522ec41c',
        description: 'Warga LKIM',
    };
    public static contractor: UserGroupDTO = {
        code: 'ff063e92-84be-45cb-bb27-7c0f96cfdc00',
        description: 'Kontraktor',
    };
    public static candidate: UserGroupDTO = {
        code: 'f82fe23c-d4fd-4d61-9267-b16555c9db12',
        description: 'Calon',
    };
    public static clinic: UserGroupDTO = {
        code: '9428f85f-5bf0-4a7a-bd4c-261f3b25e491',
        description: 'Klinik Panel',
    };
    public static list: UserGroupDTO[] = [
        this.employee,
        this.candidate,
        this.contractor,
        this.clinic,
    ];
}
