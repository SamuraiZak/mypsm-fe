import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { LookupTypeDTO } from '$lib/dto/core/lookup/lookup-item.dto';
import type { ApcDTO } from '$lib/dto/mypsm/lnpt/apc.dto';
import { LNPTServices } from '$lib/services/implementation/mypsm/lnpt/lnpt.service';
import { error } from '@sveltejs/kit';

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
