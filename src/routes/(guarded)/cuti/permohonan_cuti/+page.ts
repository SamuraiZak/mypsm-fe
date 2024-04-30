import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto';
import type {
    LeaveApplicationDTO,
    LeaveApplicationFilterDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { LeaveServices } from '$lib/services/implementation/mypsm/leave/leave.service';

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
    let applicationList: LeaveApplicationDTO[] = [];

    // set the filter
    const applicationListFilter: LeaveApplicationFilterDTO = {
        year: new Date().getFullYear(),
        employeeName: null,
        leaveType: null,
        status: null,
    };

    // set the request body
    const applicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: applicationListFilter,
    };

    // fetch the data
    const applicationListResponse: CommonResponseDTO =
        await LeaveServices.getLeaveApplicationList(applicationListRequest);

    // assign the new value to application list
    if (applicationListResponse.status == 'success') {
        applicationList = applicationListResponse.data
            ?.dataList as LeaveApplicationDTO[];
    }

    // ============================================================
    // RETURN VALUE
    // ============================================================
    return {
        props: {
            currentRoleCode,
            currentRole,
            applicationList,
            applicationListFilter,
            applicationListRequest,
            applicationListResponse,
        },
    };
}
