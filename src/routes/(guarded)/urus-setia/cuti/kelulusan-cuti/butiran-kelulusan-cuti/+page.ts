import { error, fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service.js';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";


const optionalScheme = z.enum(['1', '2'], {
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_enum_value'
                ? 'Pilihan perlu dipilih.'
                : 'Pilihan perlu dipilih.',
    }),
})

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

const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });

export const _replacementLeaveSchema1 = z.object({
    substituteName: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    latestReplacementLeave: dateScheme,
})

export const _replacementLeaveSchema2 = z.object({
    substituteName: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    latestReplacementLeave: dateScheme,
    halfDayStartDate: optionalScheme,
})
export const _replacementLeaveSchema3 = z.object({
    substituteName: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    latestReplacementLeave: dateScheme,
    halfDayEndDate: optionalScheme,
})
export const _replacementLeaveSchema4 = z.object({
    substituteName: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    latestReplacementLeave: dateScheme,
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
})


export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const replacementLeaveForm1 = await superValidate(
        userData,
        _replacementLeaveSchema1,
    )
    const replacementLeaveForm2 = await superValidate(
        userData,
        _replacementLeaveSchema2,
    )
    const replacementLeaveForm3 = await superValidate(
        userData,
        _replacementLeaveSchema3,
    )
    const replacementLeaveForm4 = await superValidate(
        userData,
        _replacementLeaveSchema4,
    )

    return { replacementLeaveForm1, replacementLeaveForm2, replacementLeaveForm3, replacementLeaveForm4, };
}

export const _submitReplacementLeaveForm = async (formData: Object, startDate: boolean, endDate: boolean) => {

    let hasHalfDayStartDate: boolean = startDate;
    let hasHalfDayEndDate: boolean = endDate;

    if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        const replacementLeaveForm = await superValidate(formData, _replacementLeaveSchema2);
        if (!replacementLeaveForm.valid) {
            getErrorToast();
            console.log(replacementLeaveForm)
            return fail(400, replacementLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(replacementLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { replacementLeaveForm }
    } else if (!hasHalfDayStartDate && hasHalfDayEndDate) {
        const replacementLeaveForm = await superValidate(formData, _replacementLeaveSchema3);
        if (!replacementLeaveForm.valid) {
            getErrorToast();
            console.log(replacementLeaveForm)
            return fail(400, replacementLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(replacementLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { replacementLeaveForm }
    } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
        const replacementLeaveForm = await superValidate(formData, _replacementLeaveSchema4);
        if (!replacementLeaveForm.valid) {
            getErrorToast();
            console.log(replacementLeaveForm)
            return fail(400, replacementLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(replacementLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { replacementLeaveForm }
    } else {
        const replacementLeaveForm = await superValidate(formData, _replacementLeaveSchema1);
        if (!replacementLeaveForm.valid) {
            getErrorToast();
            console.log(replacementLeaveForm)
            return fail(400, replacementLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(replacementLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { replacementLeaveForm }
    }
}