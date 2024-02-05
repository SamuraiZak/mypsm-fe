import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { LeaveEntitlementListResponse } from '$lib/dto/mypsm/leave/report-leave/leave-entitlement-list-response.dto';
import type { LeaveHistoryListResponse } from '$lib/dto/mypsm/leave/report-leave/leave-history-list-response.dto';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';
import { loadingState } from '$lib/stores/globalState';

export const load = async () => {
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            employeeNumber: '',
            name: '',
            identityCard: '',
            program: '',
            scheme: '',
            grade: '',
            position: '',
        },
    };

    const leaveHistoryListResponse: CommonResponseDTO =
        await LeaveServices.getLeaveHistoryList(param);

    const leaveHistoryList: LeaveHistoryListResponse[] =
        leaveHistoryListResponse.data?.dataList as LeaveHistoryListResponse[];

    return {
        leaveHistoryListResponse,
        leaveHistoryList,
        param,
    };
};

export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);

    const response: CommonResponseDTO =
    await LeaveServices.getLeaveHistoryList(param);

    loadingState.set(false);

    return {
        props: {
            param,
            response,
        },
    };
}
