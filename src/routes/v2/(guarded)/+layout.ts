import { SystemConstant } from '$lib/constants/core/system/system.constant';
import type { ModuleDTO } from '$lib/dto/core/system/system.dto';

export async function load() {
    let modules: ModuleDTO[] = SystemConstant.systemModules;

    return {
        props: {
            modules,
        },
    };
}
