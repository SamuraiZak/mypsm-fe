import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { GCRWithdrawalResponse } from '$lib/dto/mypsm/leave/gcr/gcr-withdrawal-list-response.dto';
// import api from '$lib/services/core/ky.service';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';
// import { showLoadingOverlay } from '$lib/stores/globalState';
import type { LeaveHistoryListRequestViewModel } from '$lib/view-models/mypsm/leave/report/history/leave-history-list-request.view-model';
// import type { LeaveHistoryListResponseViewModel } from '$lib/view-models/mypsm/leave/report/history/leave-history-list-response.view-model';

export const load = async () => {
    // show loading screen
    // showLoadingOverlay.set(true);

    const param: LeaveHistoryListRequestViewModel = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
    };

    const gcrWithdrawalAnnualLeaveListResponse: CommonResponseDTO =
        await LeaveServices.getGCRWithdrawalAnnualLeaves(param);

    const gcrWithdrawalAnnualLeaveList = gcrWithdrawalAnnualLeaveListResponse
        .data?.dataList as GCRWithdrawalResponse[];

    // setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        gcrWithdrawalAnnualLeaveList,
        param,
    };
};
