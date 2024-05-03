import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto';
import type {
    HRMISLeaveDTO,
    HRMISLeaveFilterDTO,
} from '$lib/dto/mypsm/leave/hrmis-leave.dto';
import { HRMISLeaveServices } from '$lib/services/implementation/mypsm/leave/hrmis-leave.service';

export async function load() {
    // ============================================================
    // PAGE SETUP
    // ============================================================
    // get current role code
    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    // get current role
    const currentRole: UserRoleDTO =
        UserRoleConstant.list.find((item) => item.code == currentRoleCode) ??
        UserRoleConstant.kakitangan;

    // ============================================================
    // FECTHING DATA
    // ============================================================
    // set default value
    let leaveList: HRMISLeaveDTO[] = [];

    // set the filter
    const leaveListFilter: HRMISLeaveFilterDTO = {
        identityCard: null,
        staffNo: null,
        staffName: null,
        position: null,
        status: null,
    };

    // set the request body
    const leaveListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: leaveListFilter,
    };

    // fetch the data
    const leaveListResponse: CommonResponseDTO =
        await HRMISLeaveServices.getLeaveApplicationList(leaveListRequest);

    if (leaveListResponse.status == 'success') {
        leaveList = leaveListResponse.data?.dataList as HRMISLeaveDTO[];
    }

    // ============================================================
    // RETURN VALUE
    // ============================================================
    return {
        props: {
            currentRoleCode,
            currentRole,
            leaveList,
            leaveListFilter,
            leaveListRequest,
            leaveListResponse,
        },
    };
}
