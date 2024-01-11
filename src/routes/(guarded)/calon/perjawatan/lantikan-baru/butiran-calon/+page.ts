import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service.js';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
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

const dateStepper1 = z.coerce
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

// New employment - add academic section
export const _addAcademicInfoSchema = z.object({
    title: shortTextSchema,
    institution: shortTextSchema,
    year: shortTextSchema,
    achievement: shortTextSchema,
    remarks: longTextSchema,
});

export const _stepperMaklumatPeribadi = z
    .object({
        bekasPolisTentera: generalSelectSchema,
        statusPekerjaan: generalSelectSchema,
        isInRelationshipWithLKIMStaff: generalSelectSchema,
        warnaKadPengenalan: generalSelectSchema,
        warganegara: generalSelectSchema,
        tempatLahir: generalSelectSchema,
        bangsa: generalSelectSchema,
        agama: generalSelectSchema,
        status: generalSelectSchema,
        jantina: generalSelectSchema,
        jawatanPasangan: z.string().optional(),
        hubungan: z.string().optional(),
        noPekerja: shortTextSchema,
        noKadPengenalan: shortTextSchema,
        namaPenuh: shortTextSchema,
        namaLain: shortTextSchema,
        emel: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        noPekerjaPasangan: z.string().optional(),
        namaPasangan: z.string().optional(),
        tarikhLahir: dateStepper1,
        alamatRumah: shortTextSchema,
        alamatSuratMenyurat: shortTextSchema,
    })
    // .superRefine(
    //     (
    //         {
    //             isInRelationshipWithLKIMStaff,
    //             jawatanPasangan,
    //             hubungan,
    //             noPekerjaPasangan,
    //             namaPasangan,
    //         },
    //         refinementContext,
    //     ) => {
    //         if (isInRelationshipWithLKIMStaff.includes('false')) {
    //             // const fieldsToCheck = [
    //             //     jawatanPasangan,
    //             //     hubungan,
    //             //     noPekerjaPasangan,
    //             //     namaPasangan,
    //             // ];
    //             for (const field of fieldsToCheck) {
    //                 refinementContext.addIssue({
    //                     code: z.ZodIssueCode.custom,
    //                     message: `${field} is required when 'id' is not set`,
    //                     path: [
    //                         hubungan,
    //                         noPekerjaPasangan,
    //                         namaPasangan,
    //                         jawatanPasangan,
    //                     ],
    //                 });
    //             }
    //         }
    //     },
    // );

export const load = async () => {
    const stepperMaklumatPeribadi = await superValidate(
        _stepperMaklumatPeribadi,
    );
    const academicInfoForm = await superValidate(_addAcademicInfoSchema);

    return { stepperMaklumatPeribadi, academicInfoForm };
};

// personal detail submit function
export const _submitFormStepperMaklumatPeribadi = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const stepperMaklumatPeribadi = await superValidate(
        formData,
        _stepperMaklumatPeribadi,
    );

    if (!stepperMaklumatPeribadi.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        console.log(stepperMaklumatPeribadi);
        return fail(400, stepperMaklumatPeribadi);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperMaklumatPeribadi),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: 1-54', json);
            });
    }
    return { stepperMaklumatPeribadi };
};

export const _submitAcademicInfoForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const form = await superValidate(formData, _addAcademicInfoSchema);

    console.log('Request: ', form.data);

    if (!form.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, form);
    }

    await api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    toast.success('Berjaya disimpan!', {
        style: 'background: #333; color: #fff;',
    });

    setTimeout(() => goto('../penamatan-tanggung-kerja'), 1500);

    return { form };
};

export const _moreAcedemicInfo: any[] = [];

export const _submitAddMoreAcademicForm = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const form = await superValidate(formData, _addAcademicInfoSchema);

    console.log('Request: ', form.data);

    if (!form.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, form);
    }

    await api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => _moreAcedemicInfo.push(json));

    console.table('moreAcedemicInfo: ', _moreAcedemicInfo);
    toast.success('Berjaya disimpan!', {
        style: 'background: #333; color: #fff;',
    });

    // setTimeout(() => goto('../penamatan-tanggung-kerja'), 1500);

    return { form };
};
