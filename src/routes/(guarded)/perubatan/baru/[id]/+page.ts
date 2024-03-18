import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"

export const load = async ({params}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;

    if(currentRoleCode == UserRoleConstant.kakitangan.code){
        const employeeDetailResponse: CommonResponseDTO =
            await MedicalServices.getMedicalEmployeeDetail(employeeId)
        employeeDetail =
            employeeDetailResponse.data?.details as MedicalEmployeeDetail;
    }

    return {
        currentRoleCode,
        employeeDetail,
    }
}