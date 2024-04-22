import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    GCRWithdrawalHistoryDTO,
    GCRWithdrawalHistoryFilterDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service';

export async function load() {
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    let withdrawalList: GCRWithdrawalHistoryDTO[] = [];

    // get list of gcr accumulation application
    let filter: GCRWithdrawalHistoryFilterDTO = {
        dataType: 0,
        name: null,
        identityCard: null,
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
        await GCRServices.getGCRWithdrawalList(request);

    if (response.status == 'success') {
        withdrawalList = response.data?.dataList as GCRWithdrawalHistoryDTO[];
    }

    return {
        props: {
            withdrawalList,
            request,
            response,
            filter,
            currentRoleCode,
        },
    };
}
