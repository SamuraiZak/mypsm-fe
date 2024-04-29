import { RoleConstant } from '$lib/constants/core/role.constant';
import { ModuleConstant } from '$lib/constants/core/routes.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { ModuleDTO } from '$lib/dto/core/setup/setup.dto';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto';

export async function load() {
    let currentRole: UserRoleDTO = UserRoleConstant.kakitangan;

    let moduleList: ModuleDTO[] = ModuleConstant.moduleList;

    return {
        props: {
            moduleList,
            currentRole,
        },
    };
}
