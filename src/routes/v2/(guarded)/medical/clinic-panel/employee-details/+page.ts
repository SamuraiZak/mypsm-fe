import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelEmployeeList } from "$lib/dto/mypsm/perubatan/clinic-panel-employee-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let clinicPanelEmployeeList: ClinicPanelEmployeeList[] = [];

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    };

    const clinicPanelEmployeeResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelEmployeeList(param)
    clinicPanelEmployeeList =
        clinicPanelEmployeeResponse.data?.dataList as ClinicPanelEmployeeList[]

    return {
        param,
        clinicPanelEmployeeResponse,
        clinicPanelEmployeeList,
    }
}