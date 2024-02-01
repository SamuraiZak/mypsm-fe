// ===============================================================
// Service Allowance Module Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import { LeaveHistoryListRequestConvert, type LeaveHistoryListRequestViewModel } from "$lib/view-models/mypsm/leave/report/history/leave-history-list-request.view-model";
import { LeaveHistoryListResponseConvert } from "$lib/view-models/mypsm/leave/report/history/leave-history-list-response.view-model";

export class LeaveServices {

    // get list of leave history
    static async getLeaveHistoryList(param: LeaveHistoryListRequestViewModel) {

        // fetching data
        const response: Response = await http.post('leaves/leaves/history',
            {
                body: LeaveHistoryListRequestConvert.toJson(param),
            }).json();

        return LeaveHistoryListResponseConvert.fromResponse(response);
    }
}