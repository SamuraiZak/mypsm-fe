import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { ClinicPanelClaimHistory } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-history.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let claimHistoryList: ClinicPanelClaimHistory[] = [];

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    };

    const claimHistoryListResponse =
        await MedicalServices.getClinicPanelClaimHistory(param);
    claimHistoryList =
        claimHistoryListResponse.data?.dataList as ClinicPanelClaimHistory[];

    return {
        claimHistoryList,
        param,
        claimHistoryListResponse,
    }
}