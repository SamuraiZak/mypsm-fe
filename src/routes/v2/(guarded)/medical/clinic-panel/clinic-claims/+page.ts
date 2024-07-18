import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelClaimList } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-list.dto";
import type { ClinicAllocation } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-allocation.dto";
import { _editAllocations } from "$lib/schemas/mypsm/medical/medical-schema";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({parent}) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
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

    const allocationForm = await superValidate(zod(_editAllocations))

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
        allocationForm,
    }
}
