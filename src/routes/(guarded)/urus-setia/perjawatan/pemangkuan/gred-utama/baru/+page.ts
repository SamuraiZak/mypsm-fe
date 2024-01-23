import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';

//========================= load =========================
export const load = async () => {
    const updatePromotionMeetingResultForm = await superValidate(
        _updatePromotionMeetingResultSchema
    )
    const updatePromotionMeetingResultDetailForm = await superValidate(
        _updatePromotionMeetingResultDetailSchema
    )
    const updateActingStaffDetailForm = await superValidate(
        _updateActingStaffDetailSchema
    )
    const supporterAndApproverForm = await superValidate(
        _supporterAndApproverSchema
    )

    return {
        updatePromotionMeetingResultForm,
        updatePromotionMeetingResultDetailForm,
        updateActingStaffDetailForm,
        supporterAndApproverForm,
    }
}

//========================= Schema =========================
const generalTextSchema = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });

const generalDateScheme = z.coerce
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

export const _updatePromotionMeetingResultSchema = z.object({
    meetingName: generalTextSchema,
    meetingDate: generalTextSchema,
    actingPosition: generalTextSchema,
    actingGred: generalTextSchema,
    placement: generalTextSchema,
    reportingDate: generalTextSchema,
    referenceLetterNo: generalTextSchema,
    letterDate: generalTextSchema,
    letterTitle: generalTextSchema,
})

export const _updatePromotionMeetingResultDetailSchema = z.object({
    promotionMeetingResult: generalSelectSchema,
})

export const _updateActingStaffDetailSchema = z.object({
    actingPosition: generalTextSchema,
    actingGred: generalTextSchema,
    newPlacement: generalTextSchema,
    reportingDate: generalTextSchema,
    supporterName: generalSelectSchema,
    approverName: generalSelectSchema,
})

export const _supporterAndApproverSchema = z.object({
    supporterName: generalTextSchema,
    approverName: generalTextSchema,
})

//========================= Submit Function =========================
export const _submitUpdatePromotionMeetingForm = async (formData: object) => {
    const updatePromotionMeetingForm = await superValidate(formData, _updatePromotionMeetingResultSchema);

    if (!updatePromotionMeetingForm.valid) {
        getErrorToast();
        return fail(400, updatePromotionMeetingForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updatePromotionMeetingForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updatePromotionMeetingForm };
};

export const _submitUpdatePromotionMeetingResultDetailForm = async (formData: object) => {
    const updatePromotionMeetingResultDetailForm = await superValidate(formData, _updatePromotionMeetingResultDetailSchema);

    if (!updatePromotionMeetingResultDetailForm.valid) {
        getErrorToast();
        return fail(400, updatePromotionMeetingResultDetailForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updatePromotionMeetingResultDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updatePromotionMeetingResultDetailForm };
};

export const _submitUpdateActingStaffDetailForm = async (formData: object) => {
    const updateActingStaffDetailForm = await superValidate(formData, _updateActingStaffDetailSchema);

    if (!updateActingStaffDetailForm.valid) {
        getErrorToast();
        return fail(400, updateActingStaffDetailForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateActingStaffDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateActingStaffDetailForm };
};

export const _updateSupporterAndApproverForm = async (formData: object) => {
    const supporterAndApproverForm = await superValidate(formData, _supporterAndApproverSchema);

    if (!supporterAndApproverForm.valid) {
        getErrorToast();
        return fail(400, supporterAndApproverForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(supporterAndApproverForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { supporterAndApproverForm };
};
