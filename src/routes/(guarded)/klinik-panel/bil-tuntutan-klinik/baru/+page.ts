import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelClaimDetail } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-detail.dto";
import type { ClinicPanelProfile } from "$lib/dto/mypsm/perubatan/clinic-panel-profile.dto";
import { _clinicClaimDetailSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
    let profile = {} as ClinicPanelProfile;

    const clinicPanelProfileResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelProfile()
    profile =
        clinicPanelProfileResponse.data?.details as ClinicPanelProfile;

    const claimDetailForm = await superValidate(zod(_clinicClaimDetailSchema))

    return {
        profile,
        claimDetailForm,
    }
}

export const _submitClaimDetailForm = async (formData: ClinicPanelClaimDetail) => {
    const form = await superValidate(formData, zod(_clinicClaimDetailSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimDetail(form.data as ClinicPanelClaimDetail)

        return { response }
    }
}