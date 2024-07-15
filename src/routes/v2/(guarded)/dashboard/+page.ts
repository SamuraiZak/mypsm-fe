import { goto } from '$app/navigation';
import { SystemConstant } from '$lib/constants/core/system/system.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    ModuleDTO,
    NotificationDTO,
} from '$lib/dto/core/system/system.dto';
import type { AccountDetailsDTO } from '$lib/dto/core/user-account/user-account.dto';
import { SystemServices } from '$lib/services/implementation/core/system/system.service';
import { AccountServices } from '$lib/services/implementation/core/user-account/user-account.service.js';

export async function load({ parent }) {
    let modules: ModuleDTO[] = SystemConstant.systemModules;

    const { layoutData } = await parent();

    let notification: NotificationDTO[] = [];

    const notificationResponse: CommonResponseDTO =
        await AccountServices.getNotification();

    if (notificationResponse.status == 'success') {
        notification = notificationResponse.data?.dataList as NotificationDTO[];
    }

    return {
        props: {
            modules,
            layoutData,
            notification,
        },
    };
}
