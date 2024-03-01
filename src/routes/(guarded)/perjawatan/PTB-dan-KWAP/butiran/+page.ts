import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';

import { _personalInfoSchema ,_serviceInfoSchema, _PTBInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import { getErrorToast } from '$lib/helpers/core/toast.helper';

export async function load({ params }) {
    const personalInfoForm = await superValidate(
        _personalInfoSchema,
    );
    const serviceInfoForm = await superValidate (
        _serviceInfoSchema,
    )

    const PTBInfoForm = await superValidate (
        _PTBInfoSchema,
    )

    return{personalInfoForm,
        serviceInfoForm,
        PTBInfoForm}

}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _personalInfoSubmit= async (formData: object) => {
    const personalInfoForm= await superValidate(
        formData,
        _personalInfoSchema,
    );
        console.log (personalInfoForm)
    if(personalInfoForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(personalInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (personalInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

export const _serviceInfoSubmit= async (formData: object) => {
    const serviceInfoForm= await superValidate(
        formData,
        _serviceInfoSchema,
    );
        console.log (serviceInfoForm)
    if(serviceInfoForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(serviceInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (serviceInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

export const _PTBInfoSubmit= async (formData: object) => {
    const PTBInfoForm= await superValidate(
        formData,
        _PTBInfoSchema,
    );
        console.log (PTBInfoForm)
    if(PTBInfoForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(PTBInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (PTBInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}