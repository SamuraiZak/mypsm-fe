import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { MedicalClinicPanelClaimList, MedicalClinicPanelClaimListFilter } from "$lib/dto/mypsm/perubatan/medical-claim-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);
    let clinicPanelMedicalClaimList: MedicalClinicPanelClaimList[] = [];
    const filter: MedicalClinicPanelClaimListFilter = {
        code: null,
        description: null,
    }
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter
    };

    const clinicPanelMedicalClaimListResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicPanelClaimList(param)
    clinicPanelMedicalClaimList =
        clinicPanelMedicalClaimListResponse.data?.dataList as MedicalClinicPanelClaimList[]

    return {
        currentRoleCode,
        param,
        clinicPanelMedicalClaimListResponse,
        clinicPanelMedicalClaimList,
    }
}