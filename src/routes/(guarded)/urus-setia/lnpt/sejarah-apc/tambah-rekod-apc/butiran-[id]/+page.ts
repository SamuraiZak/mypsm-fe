import { CommonResponseConstant } from '$lib/constants/core/common-response-constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import { type EmployeeDetailRequestDTO } from '$lib/dto/mypsm/common/employee/employee-detail-request.dto.js';
import type { AddAPCRequestDTO } from '$lib/dto/mypsm/lnpt/apc/add-apc-request.dto.js';
import { EmployeeServices } from '$lib/services/implementations/mypsm/employee/employee.service.js';
import { LNPTServices } from '$lib/services/implementations/mypsm/lnpt/lnpt.service.js';
import { loadingState } from '$lib/stores/globalState.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _addApcScheme = z.object({
    employeeName: z.string(),
    excellenceAwardYear: z.number().min(4),
});

export async function load({ params }) {
    const form = await superValidate(_addApcScheme);
    // console.log(params.id.toString());
    loadingState.set(true);

    const request: EmployeeDetailRequestDTO = {
        employeeNumber: params.id,
    };

    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeDetail(request);

    if (response.status == 'success') {
        loadingState.set(false);
        return {
            form,
            props: {
                response,
            },
        };
    } else {
        loadingState.set(false);
        return error(500);
    }
}

export async function _submitForm(formData: AddAPCRequestDTO) {
    const form = await superValidate(formData, _addApcScheme);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await LNPTServices.addAPCRecord(formData);

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
