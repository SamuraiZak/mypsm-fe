import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddClinicAppRequestDTO } from '$lib/dto/mypsm/medical/application/add-clinic-app-request.dto';
import { MedicalServices } from '$lib/services/implementations/mypsm/medical/medical.service';
import { loadingState } from '$lib/stores/globalState';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _addClinicApplicationScheme = z.object({
    district: z.string(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    foundationDate: z.coerce.date(),
    clinicType: z.string(),
    ownershipStatus: z.string(),
    registeredMedicalPractitioner: z.string(),
    branchCount: z.number(),
    clinicOfficeDistance: z.number(),
    nearestClinicDistance: z.number(),
    operationHours: z.string(),
});

export async function load() {
    const form = await superValidate(_addClinicApplicationScheme);

    return { form };
}

export async function _submitForm(formData: AddClinicAppRequestDTO) {
    const form = await superValidate(formData, _addClinicApplicationScheme);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.addClinicApplication(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}
