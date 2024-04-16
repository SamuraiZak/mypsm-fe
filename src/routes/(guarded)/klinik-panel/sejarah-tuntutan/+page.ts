import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelClaimHistory, ClinicPanelClaimHistoryFilter } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-history.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let claimHistoryList: ClinicPanelClaimHistory[] = [];

    let paramFilter: ClinicPanelClaimHistoryFilter = {
        name: null,
        patientName: "",
        employeeName: "",
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'claimId',
        orderType: 1,
        filter: paramFilter
    };

    const claimHistoryListResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimHistory(param);
    claimHistoryList =
        claimHistoryListResponse.data?.dataList as ClinicPanelClaimHistory[];

    return {
        claimHistoryList,
        param,
        claimHistoryListResponse,
    }
}

//update employee list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getClinicPanelClaimHistory(param);
    return {
        props: {
            param,
            response,
        },
    };
}