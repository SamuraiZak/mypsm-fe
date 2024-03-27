import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto.js";
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto";
import type { MedicalClinicApplication } from "$lib/dto/mypsm/perubatan/medical-clinic-application.dto";
import { _addClinicApplicationSchema } from "$lib/schemas/mypsm/medical/medical-schema.js";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const isViewOnly: boolean = getViewType(params.id)
    const lookup = getLookup();


    //supervalidate
    const clinicApplicationForm = await superValidate(zod(_addClinicApplicationSchema));
    return {
        currentRoleCode,
        lookup,
        isViewOnly,
        clinicApplicationForm,
    }
}

export const _submitClinicApplicationForm = async (formData: MedicalClinicApplication) => {
    const form = await superValidate(formData, zod(_addClinicApplicationSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicApplication(form.data as MedicalClinicApplication)

        if (response.status == "success") {
            return { response }
        }
    }
}


const getLookup = () => {
    const verifyOption: RadioDTO[] = [
        { name: "Sah", value: true },
        { name: "Tidak Sah", value: false }
    ]
    const supportOption: RadioDTO[] = [
        { name: "Sokong", value: true },
        { name: "Tidak Sokong", value: false }
    ]
    const approveOption: RadioDTO[] = [
        { name: "Lulus", value: true },
        { name: "Tidak Lulus", value: false }
    ]

    return {
        verifyOption,
        supportOption,
        approveOption,
    }
}

const getViewType = (viewType: string) => {
    if (viewType === "baru")
        return false
    else
        return true
}