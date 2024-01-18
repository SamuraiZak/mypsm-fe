import api from '$lib/services/core/ky.service.js';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =========================================================================
// z validation schema and submit function for the calon lantikan baru form fields
// =========================================================================
const shortTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const minDateSchema = z.coerce
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

const maxDateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
    });

    export const _personalInfoForm = z
    .object({
        statusPekerjaan: generalSelectSchema,
        staffNumber: shortTextSchema,
        identityDocumentNumber: shortTextSchema,
        name: shortTextSchema,
        alternativeName: shortTextSchema,
        identityDocumentColor: generalSelectSchema,
        birthDate: maxDateSchema,
        birthPlace: generalSelectSchema,
        isMalaysia: generalSelectSchema,
        raceId: generalSelectSchema,
        religionId: generalSelectSchema,
        gender: generalSelectSchema,
        status: generalSelectSchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        homeAddress: shortTextSchema,
        mailAddress: shortTextSchema,
        isExPoliceOrSoldier: generalSelectSchema,
        isInternalRelationship: generalSelectSchema,
        employeeNumber: z.string(),
        employeeName: z.string(),
        employeePosition: z.string(),
        relationship: z.string(),
    })
    .superRefine(
        (
            {
                isInternalRelationship,
                // jawatanPasangan,
                // hubungan,
                // noPekerjaPasangan,
                // namaPasangan,
            },
            ctx,
        ) => {
            // const fieldsToCheck = [
            //     noPekerjaPasangan,
            //     namaPasangan,
            //     jawatanPasangan,
            //     hubungan,
            // ];
            if (isInternalRelationship === 'true') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Sila isi medan ini.`,
                    path: [
                        'employeeNumber',
                        'employeeName',
                        'employeePosition',
                        'relationship',
                    ],
                });
            }

            return true;
        },
    );




    export const load = async () => {
        const personalInfoForm = await superValidate(_personalInfoForm);
  
        return {
            personalInfoForm,

        };
    };

    // personal detail submit function
export const _submitPersonalInfoForm = async (formData: object) => {
    console.log('HERE: ', formData);

    const form = await superValidate(formData, _personalInfoForm);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);
    return { form };
};
