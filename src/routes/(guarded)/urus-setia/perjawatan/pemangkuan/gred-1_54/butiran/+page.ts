import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/toast/toast-service';
import { error, fail } from '@sveltejs/kit';


const GeneralTextSchema = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

    const GeneralTextSchemaDay = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 1 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();


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


export const _updateResultsMeetingInterview = z.object({
    secretaryName: generalSelectSchema,
    directorName: generalSelectSchema,



});

export const _updateInterviewDetails = z.object({
    meetingName: GeneralTextSchema,
    gred: GeneralTextSchema,
    position: GeneralTextSchema,
    interviewTime: GeneralTextSchema,
    state: GeneralTextSchema,
    interviewVenue: GeneralTextSchema,
    meetingDate: dateScheme,
    interviewDate: dateScheme,


});
export const _updateInterviewResult = z.object({
    totalInterviewScore: GeneralTextSchema,

});
export const _promotionResult = z.object({
    meetingName: GeneralTextSchema,
    meetingDate: GeneralTextSchema,
    meetingResult: GeneralTextSchema,
    actingPosition: GeneralTextSchema,
    actingGred: GeneralTextSchema,
    meetingResultDropdown: generalSelectSchema,

});

export const _staffPlacement = z.object({
    meetingName: GeneralTextSchema,
    meetingDate: GeneralTextSchema,
    keputusanMesyuaratDropdown: GeneralTextSchema,
    newPlacement: GeneralTextSchema,
    newDirector: generalSelectSchema,
    reportingDate: dateScheme,

});

export const _staffPlacementAmendmentForm = z.object({
    placementAmendmentResult: generalSelectSchema,
    approvedNewReportingDate: dateScheme,
    placementAmendmentApproval: generalSelectSchema,

});

export const _updateActing = z.object({

    actingResult: generalSelectSchema,
    approverName: generalSelectSchema,
    supporterName: generalSelectSchema,
    actingPosition: GeneralTextSchema,
    actingGred: GeneralTextSchema,
    newPlacement: GeneralTextSchema,
    reportingDate: GeneralTextSchema,


});



export const load = async ({fetch}) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();

    const updateResultMeetingInterviewFormData = await superValidate(
        _updateResultsMeetingInterview
    )
    const updateInterviewFormData = await superValidate( userData,
        _updateInterviewDetails
    )

    const updateInterviewResult = await superValidate( userData,
        _updateInterviewResult
    )

    const promotionResult = await superValidate( userData,
        _promotionResult
    )

    const staffPlacement = await superValidate( userData,
        _staffPlacement
    )

    const staffPlacementAmendmentForm = await superValidate( userData,
        _staffPlacementAmendmentForm
    )

    const updateActing = await superValidate( userData,
        _updateActing
    )

    return {
        updateInterviewFormData,
        updateResultMeetingInterviewFormData,
        updateInterviewResult,
        promotionResult,
        staffPlacement,
        staffPlacementAmendmentForm,
        updateActing,


    };


};

export const _submitUpdateResultMeetingInterviewForm = async (formData: Object) => {
    const updateResultsMeetingInterviewForm = await superValidate(formData, _updateResultsMeetingInterview);

    if (!updateResultsMeetingInterviewForm.valid) {
        getErrorToast();
        return fail(400, updateResultsMeetingInterviewForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateResultsMeetingInterviewForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { updateResultsMeetingInterviewForm };
};






export const _submitUpdateInterviewDetailsForm = async (formData: Object) => {
    const updateInterviewDetailsForm = await superValidate(formData, _updateInterviewDetails);

    if (!updateInterviewDetailsForm.valid) {
        getErrorToast();
        return fail(400, updateInterviewDetailsForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateInterviewDetailsForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { updateInterviewDetailsForm };
};


export const _submitUpdateInterviewResult = async (formData: Object) => {
    const updateInterviewResultForm = await superValidate(formData, _updateInterviewResult);

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

export const _submitPromotionResult = async (formData: Object) => {
    const promotionForm = await superValidate(formData, _promotionResult);

    if (!promotionForm.valid) {
        getErrorToast();
        return fail(400, promotionForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(promotionForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { promotionForm };
};


export const _submitStaffPlacement = async (formData: Object) => {
    const staffPlacementForm = await superValidate(formData, _staffPlacement);

    if (!staffPlacementForm.valid) {
        getErrorToast();
        return fail(400, staffPlacementForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(staffPlacementForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { staffPlacementForm };
};

export const _submitStaffPlacementAmendmentForm = async (formData: Object) => {
    const staffPlacementAmendmentForm = await superValidate(formData, _staffPlacementAmendmentForm);

    if (!staffPlacementAmendmentForm.valid) {
        getErrorToast();
        return fail(400, staffPlacementAmendmentForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(staffPlacementAmendmentForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { staffPlacementAmendmentForm };
};

export const _submitUpdateActingForm = async (formData: Object) => {
    const updateActingForm = await superValidate(formData, _updateActing);

    if (!updateActingForm.valid) {
        getErrorToast();
        return fail(400, updateActingForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateActingForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { updateActingForm };
};



