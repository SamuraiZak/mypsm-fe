import { error, fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

// ===================================================
// General Form Schema
// ===================================================
const optionalScheme = z.enum(['1', '2'], {
    errorMap: (issue) => ({
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

export const _hasApplicationReasonSchema = z.object({
    applicationReason: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    totalDay: generalSelectSchema,
})

export const _generalMaternityLeaveSchema = z.object({
    applicationReason: generalSelectSchema,
    expectedBirthDate: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
})

export const _generalLeaveSchema = z.object({
    startDate: dateScheme,
    endDate: dateScheme,
})

// =============================================
// load function
// =============================================
export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();

    const replacementLeaveForm = await superValidate(
        userData,
        _replacementLeaveSchema4,
    )

    const leaveTypeForm = await superValidate(
        userData, _leaveTypeSchema
    )
    const officialTaskOnHolidayForm = await superValidate(
        userData, _officialTaskOnHolidaySchema
    )

    const leaveWithoutRecordForm = await superValidate(
        userData, _leaveWithoutRecordSchema4
    )

    const halfSalaryLeaveForm = await superValidate(
        userData, _halfSalaryLeaveSchema3
    )

    const earlyMaternityLeaveForm = await superValidate(
        userData, _earlyMaternityLeaveSchema4
    )

    const officerMaternityLeaveForm = await superValidate(
        userData, _earlyMaternityLeaveOfficerSchema4
    )

    const generalLeaveForm = await superValidate(
        userData, _generalLeaveSchema
    )


    return {
        replacementLeaveForm,
        leaveTypeForm,
        officialTaskOnHolidayForm,
        leaveWithoutRecordForm,
        halfSalaryLeaveForm,
        earlyMaternityLeaveForm,
        officerMaternityLeaveForm,
        generalLeaveForm,
    };
}

// ===================================================
// Cuti Gantian (Maklumat Gantian)
// ===================================================
export const _replacementLeaveSchema1 = z.object({
    substituteName: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    latestReplacementLeave: dateScheme,
})

export const _replacementLeaveSchema2 = z.object({
    halfDayStartDate: optionalScheme,
}).merge(_replacementLeaveSchema1)

export const _replacementLeaveSchema3 = z.object({
    halfDayEndDate: optionalScheme,
}).merge(_replacementLeaveSchema1)

export const _replacementLeaveSchema4 = z.object({
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
}).merge(_replacementLeaveSchema1)

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



// ===================================================
// Jenis Gantian =====================================
// ===================================================
export const _leaveTypeSchema = z.object({
    officialTask: generalSelectSchema,
    date: dateScheme,
    placement: generalSelectSchema,
    startTime: generalSelectSchema,
    endTime: generalSelectSchema,
    totalTime: generalSelectSchema,
})

export const _officialTaskOnHolidaySchema = z.object({
    holidayCategory: generalSelectSchema,
}).merge(_leaveTypeSchema)

export const _submitLeaveTypeForm = async (formData: Object) => {
    const leaveTypeForm = await superValidate(formData, _leaveTypeSchema);
    if (!leaveTypeForm.valid) {
        getErrorToast();
        console.log(leaveTypeForm)

        return fail(400, leaveTypeForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(leaveTypeForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { leaveTypeForm }
}

export const _submitOfficialTaskOnHolidayForm = async (formData: Object) => {
    const officialTaskOnHolidayForm = await superValidate(formData, _officialTaskOnHolidaySchema);
    if (!officialTaskOnHolidayForm.valid) {
        getErrorToast();
        console.log(officialTaskOnHolidayForm)

        return fail(400, officialTaskOnHolidayForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(officialTaskOnHolidayForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { officialTaskOnHolidayForm }
}

// ==================================================
// Cuti Tanpa Rekod =================================
// ==================================================
export const _leaveWithoutRecordSchema1 = z.object({
    ctrCategory: generalSelectSchema,
}).merge(_hasApplicationReasonSchema)

export const _leaveWithoutRecordSchema2 = z.object({
    halfDayStartDate: optionalScheme,
}).merge(_leaveWithoutRecordSchema1)

export const _leaveWithoutRecordSchema3 = z.object({
    halfDayEndDate: optionalScheme,
}).merge(_leaveWithoutRecordSchema1)

export const _leaveWithoutRecordSchema4 = z.object({
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
}).merge(_leaveWithoutRecordSchema1)

export const _submitLeaveWithoutRecordForm = async (formData: Object, startDate: boolean, endDate: boolean) => {

    let hasHalfDayStartDate: boolean = startDate;
    let hasHalfDayEndDate: boolean = endDate;

    if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        const leaveWithoutRecord = await superValidate(formData, _leaveWithoutRecordSchema2);
        if (!leaveWithoutRecord.valid) {
            getErrorToast();
            console.log(leaveWithoutRecord)
            return fail(400, leaveWithoutRecord);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(leaveWithoutRecord),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { leaveWithoutRecord }
    } else if (!hasHalfDayStartDate && hasHalfDayEndDate) {
        const leaveWithoutRecord = await superValidate(formData, _leaveWithoutRecordSchema3);
        if (!leaveWithoutRecord.valid) {
            getErrorToast();
            console.log(leaveWithoutRecord)
            return fail(400, leaveWithoutRecord);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(leaveWithoutRecord),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { leaveWithoutRecord }
    } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
        const leaveWithoutRecord = await superValidate(formData, _leaveWithoutRecordSchema4);
        if (!leaveWithoutRecord.valid) {
            getErrorToast();
            console.log(leaveWithoutRecord)
            return fail(400, leaveWithoutRecord);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(leaveWithoutRecord),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { leaveWithoutRecord }
    } else {
        const leaveWithoutRecord = await superValidate(formData, _leaveWithoutRecordSchema1);
        if (!leaveWithoutRecord.valid) {
            getErrorToast();
            console.log(leaveWithoutRecord)
            return fail(400, leaveWithoutRecord);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(leaveWithoutRecord),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { leaveWithoutRecord }
    }
}

// ==================================================
// Cuti Separuh Gaji & Cuti Tanpa Gaji ==============
// ==================================================
export const _halfSalaryLeaveSchema = z.object({
    halfDayStartDate: optionalScheme,
}).merge(_hasApplicationReasonSchema)

export const _halfSalaryLeaveSchema2 = z.object({
    halfDayEndDate: optionalScheme,
}).merge(_hasApplicationReasonSchema)

export const _halfSalaryLeaveSchema3 = z.object({
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
}).merge(_hasApplicationReasonSchema)

export const _submitHalfSalaryLeaveForm = async (formData: Object, startDate: boolean, endDate: boolean) => {

    let hasHalfDayStartDate: boolean = startDate;
    let hasHalfDayEndDate: boolean = endDate;

    if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        const halfSalaryLeaveForm = await superValidate(formData, _halfSalaryLeaveSchema);
        if (!halfSalaryLeaveForm.valid) {
            getErrorToast();
            console.log(halfSalaryLeaveForm)
            return fail(400, halfSalaryLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(halfSalaryLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { halfSalaryLeaveForm }
    } else if (!hasHalfDayStartDate && hasHalfDayEndDate) {
        const halfSalaryLeaveForm = await superValidate(formData, _halfSalaryLeaveSchema2);
        if (!halfSalaryLeaveForm.valid) {
            getErrorToast();
            console.log(halfSalaryLeaveForm)
            return fail(400, halfSalaryLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(halfSalaryLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { halfSalaryLeaveForm }
    } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
        const halfSalaryLeaveForm = await superValidate(formData, _halfSalaryLeaveSchema3);
        if (!halfSalaryLeaveForm.valid) {
            getErrorToast();
            console.log(halfSalaryLeaveForm)
            return fail(400, halfSalaryLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(halfSalaryLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { halfSalaryLeaveForm }
    } else {
        const halfSalaryLeaveForm = await superValidate(formData, _hasApplicationReasonSchema);
        if (!halfSalaryLeaveForm.valid) {
            getErrorToast();
            console.log(halfSalaryLeaveForm)
            return fail(400, halfSalaryLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(halfSalaryLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { halfSalaryLeaveForm }
    }
}

// ==================================================
// Cuti Bersalin Awal ===============================
// ==================================================
export const _earlyMaternityLeaveSchema2 = z.object({
    halfDayStartDate: optionalScheme,
}).merge(_generalMaternityLeaveSchema)

export const _earlyMaternityLeaveSchema3 = z.object({
    halfDayEndDate: optionalScheme,
}).merge(_generalMaternityLeaveSchema)

export const _earlyMaternityLeaveSchema4 = z.object({
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
}).merge(_generalMaternityLeaveSchema)

export const _submitEarlyMaternityLeaveForm = async (formData: Object, startDate: boolean, endDate: boolean) => {

    let hasHalfDayStartDate: boolean = startDate;
    let hasHalfDayEndDate: boolean = endDate;

    if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        const earlyBirthLeaveForm = await superValidate(formData, _earlyMaternityLeaveSchema2);
        if (!earlyBirthLeaveForm.valid) {
            getErrorToast();
            console.log(earlyBirthLeaveForm)
            return fail(400, earlyBirthLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(earlyBirthLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { earlyBirthLeaveForm }
    } else if (!hasHalfDayStartDate && hasHalfDayEndDate) {
        const earlyBirthLeaveForm = await superValidate(formData, _earlyMaternityLeaveSchema3);
        if (!earlyBirthLeaveForm.valid) {
            getErrorToast();
            console.log(earlyBirthLeaveForm)
            return fail(400, earlyBirthLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(earlyBirthLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { earlyBirthLeaveForm }
    } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
        const earlyBirthLeaveForm = await superValidate(formData, _earlyMaternityLeaveSchema4);
        if (!earlyBirthLeaveForm.valid) {
            getErrorToast();
            console.log(earlyBirthLeaveForm)
            return fail(400, earlyBirthLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(earlyBirthLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { earlyBirthLeaveForm }
    } else {
        const earlyBirthLeaveForm = await superValidate(formData, _generalMaternityLeaveSchema);
        if (!earlyBirthLeaveForm.valid) {
            getErrorToast();
            console.log(earlyBirthLeaveForm)
            return fail(400, earlyBirthLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(earlyBirthLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { earlyBirthLeaveForm }
    }
}

// ==================================================
// Cuti Bersalin Pegawai ============================
// ==================================================
export const _earlyMaternityLeaveOfficerSchema1 = z.object({
    address: generalSelectSchema,
}).merge(_generalMaternityLeaveSchema)

export const _earlyMaternityLeaveOfficerSchema2 = z.object({
    halfDayStartDate: optionalScheme,
}).merge(_earlyMaternityLeaveOfficerSchema1)

export const _earlyMaternityLeaveOfficerSchema3 = z.object({
    halfDayEndDate: optionalScheme,
}).merge(_earlyMaternityLeaveOfficerSchema1)

export const _earlyMaternityLeaveOfficerSchema4 = z.object({
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
}).merge(_earlyMaternityLeaveOfficerSchema1)

export const _submitEarlyMaternityLeaveOfficerForm = async (formData: Object, startDate: boolean, endDate: boolean) => {

    let hasHalfDayStartDate: boolean = startDate;
    let hasHalfDayEndDate: boolean = endDate;

    if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        const officerMaternityLeaveForm = await superValidate(formData, _earlyMaternityLeaveOfficerSchema2);
        if (!officerMaternityLeaveForm.valid) {
            getErrorToast();
            console.log(officerMaternityLeaveForm)
            return fail(400, officerMaternityLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(officerMaternityLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { officerMaternityLeaveForm }
    } else if (!hasHalfDayStartDate && hasHalfDayEndDate) {
        const officerMaternityLeaveForm = await superValidate(formData, _earlyMaternityLeaveOfficerSchema3);
        if (!officerMaternityLeaveForm.valid) {
            getErrorToast();
            console.log(officerMaternityLeaveForm)
            return fail(400, officerMaternityLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(officerMaternityLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { officerMaternityLeaveForm }
    } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
        const officerMaternityLeaveForm = await superValidate(formData, _earlyMaternityLeaveOfficerSchema4);
        if (!officerMaternityLeaveForm.valid) {
            getErrorToast();
            console.log(officerMaternityLeaveForm)
            return fail(400, officerMaternityLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(officerMaternityLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { officerMaternityLeaveForm }
    } else {
        const officerMaternityLeaveForm = await superValidate(formData, _earlyMaternityLeaveOfficerSchema1);
        if (!officerMaternityLeaveForm.valid) {
            getErrorToast();
            console.log(officerMaternityLeaveForm)
            return fail(400, officerMaternityLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(officerMaternityLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { officerMaternityLeaveForm }
    }
}

// ==================================================
//  General Leave Form ==============================
// ==================================================
export const _generalLeaveSchema2 = z.object({
    halfDayStartDate: optionalScheme,
}).merge(_generalLeaveSchema)

export const _generalLeaveSchema3 = z.object({
    halfDayEndDate: optionalScheme,
}).merge(_generalLeaveSchema)

export const _generalLeaveSchema4 = z.object({
    halfDayStartDate: optionalScheme,
    halfDayEndDate: optionalScheme,
}).merge(_generalLeaveSchema)

export const _submitGeneralLeaveForm = async (formData: Object, startDate: boolean, endDate: boolean) => {

    let hasHalfDayStartDate: boolean = startDate;
    let hasHalfDayEndDate: boolean = endDate;

    if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        const generalLeaveForm = await superValidate(formData, _generalLeaveSchema2);
        if (!generalLeaveForm.valid) {
            getErrorToast();
            console.log(generalLeaveForm)
            return fail(400, generalLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(generalLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { generalLeaveForm }
    } else if (!hasHalfDayStartDate && hasHalfDayEndDate) {
        const generalLeaveForm = await superValidate(formData, _generalLeaveSchema3);
        if (!generalLeaveForm.valid) {
            getErrorToast();
            console.log(generalLeaveForm)
            return fail(400, generalLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(generalLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { generalLeaveForm }
    } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
        const generalLeaveForm = await superValidate(formData, _generalLeaveSchema4);
        if (!generalLeaveForm.valid) {
            getErrorToast();
            console.log(generalLeaveForm)
            return fail(400, generalLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(generalLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { generalLeaveForm }
    } else {
        const generalLeaveForm = await superValidate(formData, _generalLeaveSchema);
        if (!generalLeaveForm.valid) {
            getErrorToast();
            console.log(generalLeaveForm)
            return fail(400, generalLeaveForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(generalLeaveForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { generalLeaveForm }
    }
}