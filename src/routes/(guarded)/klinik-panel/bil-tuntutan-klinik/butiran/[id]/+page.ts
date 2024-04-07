import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js'
import type { ClinicPanelClaimDetail } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-detail.dto.js'
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service.js';

export const load = async ({params}) => {
    let clinicId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let claimDetail = {} as ClinicPanelClaimDetail;

    const claimDetailResponse = 
        await MedicalServices.getClinicPanelClaimDetail(clinicId);
    claimDetail =
        claimDetailResponse.data?.details as ClinicPanelClaimDetail;

    return {
        claimDetail,
    }
}