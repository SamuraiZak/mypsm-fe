import { SystemConstant } from '$lib/constants/core/system/system.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ModuleDTO } from '$lib/dto/core/system/system.dto';
import type { AccountDetailsDTO } from '$lib/dto/core/user-account/user-account.dto';
import { SystemServices } from '$lib/services/implementation/core/system/system.service';

export async function load({ parent }) {
    let modules: ModuleDTO[] = SystemConstant.systemModules;

    const { layoutData } = await parent();

    return {
        props: {
            modules,
            layoutData,
        },
    };
}
