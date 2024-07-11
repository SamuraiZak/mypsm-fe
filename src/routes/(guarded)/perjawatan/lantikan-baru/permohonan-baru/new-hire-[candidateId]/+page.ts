import { goto } from '$app/navigation';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { NewHireAddCandidateDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-create-candidate.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _addNewHireSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async ({ params, parent }) => {
    const candidateIdRequestBody: CandidateIDRequestBody = {
        id: Number(params.candidateId),
    };

    const { roles } = await parent();

    const newHireRecordViewResponse: CommonResponseDTO =
        await EmploymentServices.getNewHireStatus(candidateIdRequestBody);

    const newHireRecordView: NewHireAddCandidateDTO =
        newHireRecordViewResponse.data?.details;

    const candidateForm = await superValidate(
        newHireRecordView,
        zod(_addNewHireSchema),
    );

    return {
        candidateForm,
        roles,
        view: {
            newHireRecordView,
        },
    };
};

//==================================================
//=============== Submit Functions =================
//==================================================
export const _submitCandidateForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addNewHireSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.editNewHireCandidate(
            form.data as NewHireAddCandidateDTO,
        );

    if (response.status === 'success') {
        setTimeout(() => goto('../lantikan-baru'), 1500);
    }

    return { response };
};
