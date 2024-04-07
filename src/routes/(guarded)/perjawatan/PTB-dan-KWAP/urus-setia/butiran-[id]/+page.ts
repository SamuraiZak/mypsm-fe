// mport type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { PTBIdRequestDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/PTB-ID-dto";
import type { PTBPersonalDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/PTB-KWAP-personal-detail.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";

export async function load({ params }) {

    // let PTBID: PTBIdRequestDTO = {
    //     PTBId: Number(params.employeeId)
    // }

    let ID: commonIdRequestDTO = {
        id: Number(params.id)
    }

    const PTBDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPPersonalDetails(ID);

    const PTBInfoForm: PTBPersonalDTO = PTBDetailResponse.data?.details as PTBPersonalDTO
    return {
        PTBInfoForm,
    }

}

