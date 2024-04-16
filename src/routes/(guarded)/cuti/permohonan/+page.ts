// on page load function starts here

import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    LeaveApplicationDTO,
    LeaveApplicationFilterDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { LeaveServices } from '$lib/services/implementation/mypsm/leave/leave.service';

export async function load() {
    // check for the current role code
    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        RoleConstant.kakitangan.code;

    // get current year
    const currentYear = new Date().getFullYear();

    // get leave application list
    let leaveApplicationList: LeaveApplicationDTO[] = [];

    const leaveApplicationFilter: LeaveApplicationFilterDTO = {
        year: currentYear,
        employeeName: null,
        leaveType: null,
        status: null,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: leaveApplicationFilter,
    };

    const response: CommonResponseDTO =
        await LeaveServices.getLeaveApplicationList(request);

    if (response.status == 'success') {
        leaveApplicationList = response.data?.dataList as LeaveApplicationDTO[];
    }

    return {
        props: {
            currentRoleCode,
            leaveApplicationList,
            leaveApplicationFilter,
            request,
            response,
        },
    };
}
