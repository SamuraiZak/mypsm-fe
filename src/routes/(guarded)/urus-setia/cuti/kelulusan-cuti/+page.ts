import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { LeaveEntitlementListResponse } from '$lib/dto/mypsm/leave/report-leave/leave-entitlement-list-response.dto';
import type { LeaveHistoryListResponse } from '$lib/dto/mypsm/leave/report-leave/leave-history-list-response.dto';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';

export const load = async () => {
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
    };

    const leaveHistoryListResponse: CommonResponseDTO =
        await LeaveServices.getLeaveHistoryList(param);

    const leaveHistoryList: LeaveHistoryListResponse[] =
        leaveHistoryListResponse.data?.dataList as LeaveHistoryListResponse[];

    return {
        leaveHistoryList,
        param,
    };
};
