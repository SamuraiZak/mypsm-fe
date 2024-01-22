import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
import { getPromiseToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Meeting Result
const dropdown = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperMeetingResult = z.object({
    meetingNameNum: dropdown,
    meetingDate: date.refine((data) => data <= new Date(), {
        message: 'Tidak boleh lebih daripada tarikh semasa',
    }),
    salaryMovementMonth: dropdown,
    gred: dropdown,
    specialFiAid: textField,
    specialIncrement: textField,
});

export const _submitFormStepperMeetingResult = async (formData: object) => {
    const stepperMeetingResult = await superValidate(
        formData,
        _stepperMeetingResult,
    );

    if (!stepperMeetingResult.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperMeetingResult);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperMeetingResult),
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
    return { stepperMeetingResult };
};
export async function load({ params }) {
    const stepperMeetingResult = await superValidate(_stepperMeetingResult);
    const currentEmployee: IntSalaryMovementRecord | undefined =
        mockSalaryMovementRecord.find(
            (staff) =>
                staff.employeeNumber == params.id &&
                staff.identityDocumentNumber == params.ic,
        );

    if (!currentEmployee) throw new Error('Record not found');

    return {
        stepperMeetingResult,
        currentEmployee,
    };
}
