import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service.js';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =========================================================================
// z validation schema and submit function for the interim end form fields
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

const dateScheme = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

// ===========================================================//

// Interim - check info form
export const _interimCheckSchema = z.object({
    interimCheckRemark: longTextSchema,
    interimCheckResult: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),
});

// Interim - payment calculation form
export const _payCalculationSchema = z
    .object({
        interimDateOfEffect: dateScheme.refine((data) => data >= new Date(), {
            message: 'Tarikh mula mesti lebih atau sama dengan tarikh semasa.',
        }),
        interimUntilDate: dateScheme,
        etkPaymentMonth: generalSelectSchema,
        etkPaymentYear: generalSelectSchema,
    })
    .refine((data) => data.interimUntilDate >= data.interimDateOfEffect, {
        message: 'Tarikh tamat tidak boleh kurang daripada tarikh mula.',
        path: ['interimUntilDate'],
    });

// assign rights form
export const _assignApproverSupporterSchema = z.object({
    staffSupporter: generalSelectSchema,
    staffApprover: generalSelectSchema,
});

// ===========================================================//

export const load = async () => {
    const interimCheckForm = await superValidate(_interimCheckSchema);
    const payCalculationForm = await superValidate(_payCalculationSchema);
    const assignApproverSupporterForm = await superValidate(
        _assignApproverSupporterSchema,
    );

    return {
        interimCheckForm,
        payCalculationForm,
        assignApproverSupporterForm,
    };
};

export const _submitInterimCheck = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const form = await superValidate(formData, _interimCheckSchema);
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

    return { form };
};

export const _submitpayCalculationCheck = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);

    const getEtkPaymentMonth = document.getElementById(
        'etkPaymentMonth',
    ) as HTMLSelectElement;
    const getEtkPaymentYear = document.getElementById(
        'etkPaymentYear',
    ) as HTMLSelectElement;

    formData.append('etkPaymentMonth', String(getEtkPaymentMonth.value));
    formData.append('etkPaymentYear', String(getEtkPaymentYear.value));

    formData.forEach((data) => data.toString());

    const form = await superValidate(formData, _payCalculationSchema);
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

    return { form };
};

export const _submitAssignApproverSupporterForm = async () => {
    const staffSupporterSelector = document.getElementById(
        'staffSupporter',
    ) as HTMLSelectElement;
    const staffApproverSelector = document.getElementById(
        'staffApprover',
    ) as HTMLSelectElement;

    console.log(
        'TEST: ',
        String(staffSupporterSelector.value),
        String(staffApproverSelector.value),
    );

    const formData: FormData = new FormData();

    formData.append('staffSupporter', String(staffSupporterSelector.value));
    formData.append('staffApprover', String(staffApproverSelector.value));

    const form = await superValidate(formData, _assignApproverSupporterSchema);
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
    setTimeout(() => goto('../../tanggung-kerja'), 1500);

    return { form };
};
