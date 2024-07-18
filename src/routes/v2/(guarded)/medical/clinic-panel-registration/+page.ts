import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicApplicationList } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async ({parent}) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let clinicApplicationList: ClinicApplicationList[] = [];
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
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