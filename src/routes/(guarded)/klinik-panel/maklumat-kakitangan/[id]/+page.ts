import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js'
import type { MedicalEmployeeDetail } from '$lib/dto/mypsm/perubatan/medical-employee-detail.dto';
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service.js';

export const load = async ({params}) => {
    let currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;
    
    const employeeDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimEmployee(currentId)
    employeeDetail =
        employeeDetailResponse.data?.details as MedicalEmployeeDetail;
    return {
        employeeDetail,
    }
}