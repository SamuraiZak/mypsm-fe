import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';

//========================= load =========================
export const load = async () => {
    const updateCandidateSelectionMeetingResultForm = await superValidate(
        _updateCandidateSelectionMeetingResultSchema
    )

    const updateMeetingDetailForm = await superValidate(
        _updateMeetingDetailSchema
    )
    const updateInterviewResultForm = await superValidate(
        _updateInterviewResultSchema
    )
    const updatePromotionMeetingResultForm = await superValidate(
        _updatePromotionMeetingResultSchema
    )
    const updateStaffPlacementMeetingResultForm = await superValidate(
        _updateStaffPlacementMeetingResultSchema
    )
    const staffPlacementAmendmentApplicationForm = await superValidate(
        _staffPlacementAmendmentApplicationSchema
    )
    const updateActingResultForm = await superValidate(
        _updateActingResultSchema
    )

    return {
        updateCandidateSelectionMeetingResultForm,
        updateMeetingDetailForm,
        updateInterviewResultForm,
        updatePromotionMeetingResultForm,
        updateStaffPlacementMeetingResultForm,
        staffPlacementAmendmentApplicationForm,
        updateActingResultForm,
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

export const _updateCandidateSelectionMeetingResultSchema = z.object({
    secretaryName: generalSelectSchema,
    directorName: generalSelectSchema,
})

export const _updateMeetingDetailSchema = z.object({
    meetingName: generalTextSchema,
    meetingDate: generalTextSchema,
    position: generalTextSchema,
    interviewDate: generalTextSchema,
    interviewTime: generalTextSchema,
    state: generalTextSchema,
    interviewVenue: generalTextSchema,
})

export const _updateInterviewResultSchema = z.object({
    interviewDate: generalDateScheme,
    interviewVenue: generalTextSchema,
    panelName: generalTextSchema,
})

export const _updatePromotionMeetingResultSchema = z.object({
    meetingResultDropdown: generalSelectSchema,
})

export const _updateStaffPlacementMeetingResultSchema = z.object({
    newPlacement: generalTextSchema,
    newDirector: generalSelectSchema,
    reportingDate: generalDateScheme,
})

export const _staffPlacementAmendmentApplicationSchema = z.object({
    postponementReason: generalTextSchema,
    approverName: generalSelectSchema,
    initialPlacementDate: generalDateScheme,
    requestedDate: generalDateScheme,
})

export const _updateActingResultSchema = z.object({
    supporterName: generalSelectSchema,
    approvalName: generalSelectSchema,
})

//========================= Submit Function =========================
export const _submitUpdateCandidateSelectionMeetingResultForm = async (formData: object) => {
    const updateCandidateSelectionMeetingResultForm = await superValidate(formData, _updateCandidateSelectionMeetingResultSchema);

    if (!updateCandidateSelectionMeetingResultForm.valid) {
        getErrorToast();
        return fail(400, updateCandidateSelectionMeetingResultForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateCandidateSelectionMeetingResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateCandidateSelectionMeetingResultForm };
};

export const _submitUpdateMeetingDetailForm = async (formData: object) => {
    const updateMeetingDetailForm = await superValidate(formData, _updateMeetingDetailSchema);

    if (!updateMeetingDetailForm.valid) {
        getErrorToast();
        return fail(400, updateMeetingDetailForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateMeetingDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateMeetingDetailForm };
};

export const _submitUpdateInterviewResultForm = async (formData: object) => {
    const updateInterviewResultForm = await superValidate(formData, _updateInterviewResultSchema);

    if (!updateInterviewResultForm.valid) {
        getErrorToast();
        return fail(400, updateInterviewResultForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateInterviewResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateInterviewResultForm };
};

export const _submitUpdatePromotionMeetingResultForm = async (formData: object) => {
    const updatePromotionMeetingResultForm = await superValidate(formData, _updatePromotionMeetingResultSchema);

    if (!updatePromotionMeetingResultForm.valid) {
        getErrorToast();
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
    return { updatePromotionMeetingResultForm };
};

export const _submitUpdateStaffPlacementMeetingResultForm = async (formData: object) => {
    const updateStaffPlacementMeetingResultForm = await superValidate(formData, _updateStaffPlacementMeetingResultSchema);

    if (!updateStaffPlacementMeetingResultForm.valid) {
        getErrorToast();
        return fail(400, updateStaffPlacementMeetingResultForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateStaffPlacementMeetingResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateStaffPlacementMeetingResultForm };
};

export const _submitStaffPlacementAmendmentApplicationSchema = async (formData: object) => {
    const staffPlacementAmendmentApplicationForm = await superValidate(formData, _staffPlacementAmendmentApplicationSchema);

    if (!staffPlacementAmendmentApplicationForm.valid) {
        getErrorToast();
        return fail(400, staffPlacementAmendmentApplicationForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(staffPlacementAmendmentApplicationForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { staffPlacementAmendmentApplicationForm };
};

export const _submitUpdateActingResultForm = async (formData: object) => {
    const updateActingResultForm = await superValidate(formData, _updateActingResultSchema);

    if (!updateActingResultForm.valid) {
        getErrorToast();
        return fail(400, updateActingResultForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateActingResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateActingResultForm };
};
