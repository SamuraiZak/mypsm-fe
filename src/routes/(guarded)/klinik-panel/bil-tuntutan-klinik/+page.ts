import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelClaimList } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let clinicPanelClaimList: ClinicPanelClaimList[] = [];
    let clinicPanelClaimListResponse: CommonResponseDTO = {};

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
        filter: {
            status: null,
        }
    };


    if (currentRoleCode == UserRoleConstant.klinikPanel.code) {
        clinicPanelClaimListResponse =
            await MedicalServices.getClinicPanelClaimList(param);
        clinicPanelClaimList =
            clinicPanelClaimListResponse.data?.dataList as ClinicPanelClaimList[];
    } else {
        clinicPanelClaimListResponse =
            await MedicalServices.getClinicPanelClaimOthersTable(param);
        clinicPanelClaimList =
            clinicPanelClaimListResponse.data?.dataList as ClinicPanelClaimList[];
    }


    return {
        currentRoleCode,
        param,
        clinicPanelClaimListResponse,
        clinicPanelClaimList,
    }
}