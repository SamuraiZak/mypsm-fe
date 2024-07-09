import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    GCRAccumulationHistoryDTO,
    GCRAccumulationHistoryFilterDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service';

export async function load() {
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    let accumulationList: GCRAccumulationHistoryDTO[] = [];

    // get list of gcr accumulation application
    let filter: GCRAccumulationHistoryFilterDTO = {
        name: null,
        identityDocumentNumber: null,
        employeeNumber: null,
        status: null,
    };

    let request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let response: CommonResponseDTO =
        await GCRServices.getGCRAccumulationList(request);

    if (response.status == 'success') {
        accumulationList = response.data
            ?.dataList as GCRAccumulationHistoryDTO[];
    }

    return {
        props: {
            accumulationList,
            request,
            response,
            filter,
            currentRoleCode,
        },
    };
}
