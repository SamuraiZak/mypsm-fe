// import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service.js';
import { error, fail } from '@sveltejs/kit';
// import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
// import type { RequestEvent } from '../../../../$types.js';
// import { ZodError, z } from 'zod';

// =========================================================================
// z validation schema and submit function for the new employment form fields
// =========================================================================
const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

// New Employment - Approver Result section
export const _approverResultSchema = z.object({
    approverRemark: longTextSchema,
    approverResult: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),
});

export const load = async ({ fetch }) => {
    // const id = parseInt(params.id);

    const request = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(userData, _approverResultSchema);

    return { form };
};

export const _submitApproverResultForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const form = await superValidate(formData, _approverResultSchema);

    if (!form.valid) {
        return fail(400, form);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log('Response Returned: ', json));
    }

    return { form };
};

// export let _errorData: any;

// export const _submitApproverResultForm = async (event: Event) => {
//     const formElement = event.target as HTMLFormElement;
//     const formData = new FormData(formElement);

//     const approverResultData = {
//         approverRemark: String(formData.get('approverRemark')),
//         approverResult: String(formData.get('approverResult')),
//     };

//     try {
//         // _errorData = [];
//         const result = _approverResultSchema.parse(approverResultData);

//         if (result) {
//             // _errorData = [];
//             toast.success('Berjaya disimpan!', {
//                 style: 'background: #333; color: #fff;',
//             });
//             setTimeout(() => goto('../penamatan-tanggung-kerja'), 1500);
//             return result;
//         }
//         return result;
//     } catch (error: unknown) {
//         if (error instanceof ZodError) {
//             const { fieldErrors: errors } = error.flatten();
//             _errorData = errors;
//             toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
//                 style: 'background: #333; color: #fff;',
//             });
//             console.log('PAGE.TS', _errorData);
//             // return errors;
//         }
//     }
// };
