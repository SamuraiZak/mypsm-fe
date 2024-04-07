import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelTreatmentBillList } from "$lib/dto/mypsm/perubatan/clinic-panel-treatment-bill-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let treatmentBills: ClinicPanelTreatmentBillList[] = [];
 
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    };

    const treatmentBillResponse: CommonResponseDTO = 
        await MedicalServices.getTreatmentBill(param);
    treatmentBills = 
        treatmentBillResponse.data?.dataList as ClinicPanelTreatmentBillList[];

    return {
        param,
        treatmentBillResponse,
        treatmentBills
    }
}

//update allocation list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getTreatmentBill(param);
    return {
        props: {
            param,
            response,
        },
    };
}