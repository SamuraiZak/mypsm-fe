import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { KPEmployeeListDTO } from "$lib/dto/mypsm/medical/klinik-panel/kp-employee-list.dto";
import { MedicalServices } from "$lib/services/implementations/mypsm/medical/medical.service";
import { showLoadingOverlay } from "$lib/stores/globalState";

export const load = async () => {

    // show loading screen
    showLoadingOverlay.set(true);

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: '',
    };

    const response: CommonResponseDTO = await MedicalServices.getKPEmployeeList(param);

    const employeeList: KPEmployeeListDTO[] = response.data?.dataList as KPEmployeeListDTO[];

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            employeeList,
            param,
        },
    };
};