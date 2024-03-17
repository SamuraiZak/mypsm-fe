import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
 
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    };

    return {
    }
}