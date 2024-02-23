import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { NewHireAddCandidateDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-create-candidate.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _addNewHireSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
    const candidateForm = await superValidate(_addNewHireSchema);

    return { candidateForm };
};

//==================================================
//=============== Submit Functions =================
//==================================================
export const _submitCandidateForm = async (formData: object) => {
    const form = await superValidate(formData, _addNewHireSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createNewHireCandidate(
            form.data as NewHireAddCandidateDTO,
        );

    return { response };
};
