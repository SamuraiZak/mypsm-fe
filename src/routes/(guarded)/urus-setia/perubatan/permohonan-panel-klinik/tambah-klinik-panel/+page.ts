import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Panel Clinic Application Verification
const longTextField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const option = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperPanelClinicApplicationVerification = z.object({
    remark: longTextField,
    resultOption: option,
});

export const _submitFormStepperPanelClinicApplicationVerification = async (
    formData: object,
) => {
    const stepperPanelClinicApplicationVerification = await superValidate(
        formData,
        _stepperPanelClinicApplicationVerification,
    );

    if (!stepperPanelClinicApplicationVerification.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperPanelClinicApplicationVerification);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperPanelClinicApplicationVerification),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);
    return { stepperPanelClinicApplicationVerification };
};

// Supporter Approver
const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperSupporterApprover = z.object({
    supporterName: textField,
    approverName: textField,
});

export const _submitFormStepperSupporterApprover = async (formData: object) => {
    const stepperSupporterApprover = await superValidate(
        formData,
        _stepperSupporterApprover,
    );

    if (!stepperSupporterApprover.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperSupporterApprover);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperSupporterApprover),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);
    return { stepperSupporterApprover };
};

export const load = async () => {
    const stepperPanelClinicApplicationVerification = await superValidate(
        _stepperPanelClinicApplicationVerification,
    );
    const stepperSupporterApprover = await superValidate(
        _stepperSupporterApprover,
    );

    return {
        stepperPanelClinicApplicationVerification,
        stepperSupporterApprover,
    };
};
