import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { LookupTypeDTO } from '$lib/dto/core/lookup/lookup-item.dto';

const guard: string[] = [UserRoleConstant.admin.code];

export async function load() {
    let typeList: LookupTypeDTO[] = LookupItemConstant.list
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        props: {
            typeList,
        },
    };
}
