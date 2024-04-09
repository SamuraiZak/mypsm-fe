// mport type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { PTBIdRequestDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/PTB-ID-dto";
import type { PTBPersonalDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/PTB-KWAP-personal-detail.dto";
import type { PTBApproveDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-approves.dto";
import type { PTBPensionDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-pension-detail.dto";
import type { PTBServiceDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-service-detail.dto";
import type { PTBSupportDTO } from "$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-supporter.dto";
import type { PTBRolesRelatedDTO, } from "$lib/dto/mypsm/employment/PTB-KWAP/ptb-roles-related.dto";
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

    const PTBserviceResponse: CommonResponseDTO =
     await PTBKWAPServices.getPTBKWAPServiceDetails(ID);

     const PTBPensionResponse: CommonResponseDTO =
     await PTBKWAPServices.getPTBKWAPpensionDetails(ID);

     const PTBRolesRelatedsResponse: CommonResponseDTO =
     await PTBKWAPServices.getPTBKWAPRolesRelated(ID);

     const PTBSupportResponse: CommonResponseDTO =
     await PTBKWAPServices.getPTBKWAPSupport(ID);

     const PTBApproveResponse: CommonResponseDTO =
     await PTBKWAPServices.getPTBKWAPApprove(ID);



    const PTBInfoForm: PTBPersonalDTO = PTBDetailResponse.data?.details as PTBPersonalDTO
    const PTBServiceForm: PTBServiceDTO = PTBserviceResponse.data?.details as PTBServiceDTO
    const PTBPensionForm: PTBPensionDTO = PTBPensionResponse.data?.details as PTBPensionDTO
    const PTBRolesRelatedsForm: PTBRolesRelatedDTO = PTBRolesRelatedsResponse.data?.details as PTBRolesRelatedDTO
    const PTBSupportForm: PTBSupportDTO = PTBSupportResponse.data?.details as PTBSupportDTO
    const PTBApproveForm: PTBApproveDTO = PTBApproveResponse.data?.details as PTBApproveDTO
   
   
    return {
        PTBInfoForm,
        PTBServiceForm,
        PTBPensionForm,
        PTBRolesRelatedsForm,
        PTBSupportForm,
        PTBApproveForm,
    }

}

//==================================================
//=============== Submit Functions =================
//==================================================

