import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicApplicationList } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let clinicApplicationList: ClinicApplicationList[] = [];
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };

    const clinicApplicationListResponse: CommonResponseDTO =
        await MedicalServices.getClinicApplication(param);
    clinicApplicationList = 
        clinicApplicationListResponse.data?.dataList as ClinicApplicationList [];

    return {
        currentRoleCode,
        param,
        clinicApplicationListResponse,
        clinicApplicationList,
    }
}
//update employee list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getClinicApplication(param);
    return {
        props: {
            param,
            response,
        },
    };
}