import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelClaimList } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let clinicPanelClaimList: ClinicPanelClaimList[] = [];

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    };

    const clinicPanelClaimListResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimList(param);
    clinicPanelClaimList =
        clinicPanelClaimListResponse.data?.dataList as ClinicPanelClaimList[];

    return {
        param,
        clinicPanelClaimListResponse,
        clinicPanelClaimList,
    }
}