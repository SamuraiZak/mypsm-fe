
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { KPEmployeeListDTO } from '$lib/dto/mypsm/medical/klinik-panel/kp-employee-list.dto';
import { NewHireServices } from '$lib/services/implementations/mypsm/employment/new-hire/new-hire.service';
import { MedicalServices } from '$lib/services/implementations/mypsm/medical/medical.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import type { NewHireListRequestViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-request.view-model';
import type { NewHireListResponseViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-response.view-model';


export async function load() {
    showLoadingOverlay.set(true);

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
    };

    const response: CommonResponseDTO = await MedicalServices.getKPEmployeeList(param);
    const employeeList: KPEmployeeListDTO[] = response.data?.dataList as KPEmployeeListDTO[]; 

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            response,
            employeeList,
            param,
        },
    };
}

