import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { GradeActingService } from '$lib/services/implementations/mypsm/perjawatan/grade-acting/grade-acting-services.service';
import type { ListChosenEmployeeListRequest } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-chosen-employee-list-request.view-model';
import type { ListChosenEmployeeListResponse, ChosenEmployeeList } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-chosen-employee-list-response.view-model';

const GeneralTextSchema = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
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


export const _meetingResultCandidateSelectionSchema = z.object({
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
    meetingDate: GeneralTextSchema,
    interviewDate: GeneralTextSchema,
});

export const _updateInterviewResult = z.object({
    totalInterviewScore: GeneralTextSchema,
});

export const _promotionMeetingResultSchema = z.object({
    meetingName: GeneralTextSchema,
    meetingDate: GeneralTextSchema,
    meetingResult: GeneralTextSchema,
    actingPosition: GeneralTextSchema,
    actingGred: GeneralTextSchema,
});

export const _promotionMeetingResultDetailSchema = z.object({
    meetingResultDropdown: generalSelectSchema,
})

export const _staffPlacement = z.object({
    meetingName: GeneralTextSchema,
    meetingDate: GeneralTextSchema,
});

export const _staffPlacementDetailSchema = z.object({
    meetingResultDropdown: GeneralTextSchema,
    newPlacement: GeneralTextSchema,
    newDirector: generalSelectSchema,
    reportingDate: dateScheme,
})

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

export const _placementMeetingResultSchema = z.object({
    newPlacement: generalSelectSchema,
    newDirector: generalSelectSchema,
    reportingDate: generalSelectSchema,
})

export async function load() {

    const chosenEmployeeRequestBody: ListChosenEmployeeListRequest = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {
            employeeIds: [10, 5, 9]
        },
    };
    const chosenEmployeeResponse: ListChosenEmployeeListResponse =
        await GradeActingService.getActingChosenEmployeeRecord(chosenEmployeeRequestBody);
    const chosenEmployeeRecord: ChosenEmployeeList[] = chosenEmployeeResponse.data.chosenEmployeeLists

    const meetingResultCandidateSelectionForm = await superValidate(
        _meetingResultCandidateSelectionSchema
    )
    const updateInterviewFormData = await superValidate(
        _updateInterviewDetails
    )

    const updateInterviewResult = await superValidate(
        _updateInterviewResult
    )

    const promotionMeetingResultForm = await superValidate(
        _promotionMeetingResultSchema
    )

    const promotionMeetingResultDetailForm = await superValidate(
        _promotionMeetingResultDetailSchema
    )

    const staffPlacementForm = await superValidate(
        _staffPlacement
    )

    const staffPlacementAmendmentForm = await superValidate(
        _staffPlacementAmendmentForm
    )

    const updateActing = await superValidate(
        _updateActing
    )

    const placementMeetingResultForm = await superValidate(_placementMeetingResultSchema)

    return {
        meetingResultCandidateSelectionForm,
        updateInterviewFormData,
        updateInterviewResult,
        promotionMeetingResultForm,
        promotionMeetingResultDetailForm,
        staffPlacementForm,
        staffPlacementAmendmentForm,
        updateActing,
        placementMeetingResultForm,
        chosenEmployeeRecord,

    };
};

export const _submitMeetingResultCandidateSelectionForm = async (formData: Object) => {
    const meetingResultCandidateSelectionForm = await superValidate(formData, _meetingResultCandidateSelectionSchema);

    if (!meetingResultCandidateSelectionForm.valid) {
        getErrorToast();
        return fail(400, meetingResultCandidateSelectionForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(meetingResultCandidateSelectionForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { meetingResultCandidateSelectionForm };
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

export const _submitPromotionMeetingResultForm = async (formData: Object) => {
    const promotionMeetingResultForm = await superValidate(formData, _promotionMeetingResultSchema);

    if (!promotionMeetingResultForm.valid) {
        getErrorToast();
        return fail(400, promotionMeetingResultForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(promotionMeetingResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { promotionMeetingResultForm };
};

export const _submitPromotionMeetingResultDetailForm = async (formData: Object) => {
    const promotionMeetingResultDetailForm = await superValidate(formData, _promotionMeetingResultDetailSchema);

    if (!promotionMeetingResultDetailForm.valid) {
        getErrorToast();
        return fail(400, promotionMeetingResultDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(promotionMeetingResultDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { promotionMeetingResultDetailForm };
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

export const _submitPlacementMeetingResultForm = async (formData: Object) => {
    const placementMeetingResultForm = await superValidate(formData, _placementMeetingResultSchema);

    if (!placementMeetingResultForm.valid) {
        getErrorToast();
        return fail(400, placementMeetingResultForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(placementMeetingResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise)
    return { placementMeetingResultForm };
};


