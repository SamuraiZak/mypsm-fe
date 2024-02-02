import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";
// ===================================================
// Form Schema
// ===================================================
const earlyDateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    });

const dateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });

const numberScheme = z.union([z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}), z.number()]).transform((x) => Number(x)).pipe(z.number({
    required_error: "Medan ini tidak boleh dibiar kosong.",
    invalid_type_error: "Hanya nombor sahaja dibenarkan. Contoh (500.40)",
    description: "Hanya nombor sahaja dibenarkan. Contoh (500.40)"
}).default(0))

const generalEmailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ")
const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });
const generalTextSchema = z.string({invalid_type_error: "Medan ini tidak boleh dibiar kosong."}).min(1, { message: "Medan ini perlu diisi dengan lengkap. " });

export const _updatePromotionMeetingResultSchema = z.object({
    meetingName: generalTextSchema,
    meetingDate: earlyDateScheme.nullable(),
    secretaryRemark: generalTextSchema,
    meetingResult: z.boolean().default(true),
    verifiedPromotionDate: earlyDateScheme.nullable(),
    actingEndDate: earlyDateScheme.nullable(),
    returnToOriginalGradeDate: earlyDateScheme.nullable(),
    newPlacement: generalSelectSchema,
}).partial()

// =============================================
// load function
// =============================================
export const load = async () => {

    const updatePromotionMeetingResultForm = await superValidate(
        _updatePromotionMeetingResultSchema
    );

    return {
        updatePromotionMeetingResultForm
    };
}


// =============================================
// Submit Form Function
// =============================================
export const _submitUpdatePromotionMeetingResultForm = async (formData: Object) => {
    const updatePromotionMeetingResultForm = await superValidate(formData, _updatePromotionMeetingResultSchema);
    if (!updatePromotionMeetingResultForm.valid) {
        getErrorToast();
        console.log(updatePromotionMeetingResultForm)
        return fail(400, updatePromotionMeetingResultForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updatePromotionMeetingResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updatePromotionMeetingResultForm }
}