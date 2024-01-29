import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

// ===================================================
// Form Schema
// ===================================================
const generalTextSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).min(1, { message: "Medan ini perlu diisi dengan lengkap. " });

export const _sectionLeaderSchema = z.object({
    sectionLeaderRemark: generalTextSchema,
    sectionLeaderResult: z.boolean().default(true),
})


// =============================================
// load function
// =============================================
export const load = async () => {

    const sectionLeaderForm = await superValidate(
        _sectionLeaderSchema
    );
    return {
        sectionLeaderForm,
    };
}


// =============================================
// Submit Form Function
// =============================================
export const _submitSectionLeaderForm = async (formData: Object) => {
    const sectionLeaderForm = await superValidate(formData, _sectionLeaderSchema);
    if (!sectionLeaderForm.valid) {
        getErrorToast();
        console.log(sectionLeaderForm)
        return fail(400, sectionLeaderForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(sectionLeaderForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { sectionLeaderForm }
}
