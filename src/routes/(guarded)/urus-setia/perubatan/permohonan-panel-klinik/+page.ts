import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { MedicalServices } from '$lib/services/implementations/mypsm/medical/medical.service';
import { loadingState } from '$lib/stores/globalState';

export async function load() {
    // ceating parameter
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: '',
        filter: {
            code: '',
            name: '',
            state: '',
            status: '',
        },
    };

    const response: CommonResponseDTO =
        await MedicalServices.getClinicApplicationList(param);

    return {
        props: {
            param,
            response,
        },
    };
}

export async function _updateTable(params: CommonListRequestDTO) {
    console.log(params.pageSize);
    loadingState.set(true);

    const response: CommonResponseDTO =
        await MedicalServices.getClinicApplicationList(params);

    setTimeout(() => {
        loadingState.set(false);
    }, 2000);

    return {
        props: {
            response,
        },
    };
}
