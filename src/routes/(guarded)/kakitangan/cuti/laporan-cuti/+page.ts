import api from '$lib/services/core/ky.service';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import type { LeaveHistoryListRequestViewModel } from '$lib/view-models/mypsm/leave/report/history/leave-history-list-request.view-model';
import type { LeaveHistoryListResponseViewModel } from '$lib/view-models/mypsm/leave/report/history/leave-history-list-response.view-model';

export const load = async () => {

    // show loading screen
    showLoadingOverlay.set(true);

    const param: LeaveHistoryListRequestViewModel = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
    };

    const leaveHistoryList: LeaveHistoryListResponseViewModel = await LeaveServices.getLeaveHistoryList(param);

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            leaveHistoryList,
            param,
        },
    };
};
