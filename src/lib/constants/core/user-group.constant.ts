// ===============================================================
// User Group Constants
// ===============================================================

import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';

export class UserGroupConstant {
    public static userGroup: UserGroupDTO[] = [
        {
            value: 'employee',
            name: 'Kakitangan',
        },
        {
            value: 'candidate',
            name: 'Calon',
        },
        {
            value: 'clinic',
            name: 'Klinik Panel',
        },
    ];
}
