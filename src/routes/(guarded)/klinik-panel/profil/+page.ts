import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicPanelProfile } from "$lib/dto/mypsm/perubatan/clinic-panel-profile.dto";
import { _editClinicProfileSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {

    let profile = {} as ClinicPanelProfile;

    const clinicPanelProfileResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelProfile()
    profile =
        clinicPanelProfileResponse.data?.details as ClinicPanelProfile;

    const clinicPanelProfile = await superValidate(profile, zod(_editClinicProfileSchema))
    
    return {
        clinicPanelProfile,
    }
}

export const _submit = async (formData: ClinicPanelProfile) => {
    const form = await superValidate(formData, zod(_editClinicProfileSchema));
    if (form.valid) {

        let response: CommonResponseDTO = {}

        response = await MedicalServices.editClinicPanelProfile(form.data
        )
        if (response.status == 'success') {

            return response
        }
    }
};