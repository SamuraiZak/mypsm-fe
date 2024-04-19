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

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let clinicPanelClaimList: ClinicPanelClaimList[] = [];
    let clinicPanelClaimListResponse: CommonResponseDTO = {};
    let clinicPanelAllocations: ClinicAllocation = {
        year: 0,
        currentAllocation: 0,
        remainingAllocation: 0,
        newAllocation: 0,
    }

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

        if (currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code) {
            const clinicPanelAllocationResponse: CommonResponseDTO =
                await MedicalServices.getClinicPanelAllocations();
            clinicPanelAllocations =
                clinicPanelAllocationResponse.data?.details as ClinicAllocation;
            allocationForm.data = clinicPanelAllocations
        }
    }


    return {
        currentRoleCode,
        param,
        clinicPanelClaimListResponse,
        clinicPanelClaimList,
        allocationForm,
    }
}

export const _submit = async (formData: ClinicAllocation) => {
    const form = await superValidate(formData, zod(_editAllocations));

    if (form.valid) {
        const { year, ...tempObj } = form.data;

        const response: CommonResponseDTO =
            await MedicalServices.editAllocations(tempObj as ClinicAllocation)

            return { response }
    }
}