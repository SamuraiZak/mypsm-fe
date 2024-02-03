import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
import api from '$lib/services/core/ky.service';
// import { showLoadingOverlay } from '$lib/stores/globalState';

// Annual Salary Increment
const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const numberScheme = z.union([z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}), z.number()]).transform((x) => Number(x)).pipe(z.number({
    required_error: "Medan ini tidak boleh dibiar kosong.",
    invalid_type_error: "Hanya nombor sahaja dibenarkan. Contoh (500.40)",
    description: "Hanya nombor sahaja dibenarkan. Contoh (500.40)"
}).default(0))

const option = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

export const _annualSalaryIncrement = z.object({
    meetingTypeOption: option,
    meetingDate: date.refine((data) => data <= new Date(), {
        message: 'Tidak boleh lebih daripada tarikh semasa',
    }),
    salaryMovementMonth: option,
    gred: numberScheme,
    specialFiAid: numberScheme,
    specialFiAidText: numberScheme,
}).partial();

export const _submitFormAnnualSalaryIncrement = async (formData: object) => {
    const annualSalaryIncrement = await superValidate(
        formData,
        _annualSalaryIncrement,
    );

    if (!annualSalaryIncrement.valid) {
        getErrorToast();
        console.log(annualSalaryIncrement)
        return fail(400, annualSalaryIncrement);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_annualSalaryIncrement),
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
    return { annualSalaryIncrement };
};

//Async
export const load = async () => {
    const getGredLookup = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };

    console.log(JSON.stringify(getGredLookup));

    // Gred lookup
    // const gredResponse: Response = await api
    //     .post('lookups/grades', {
    //         body: JSON.stringify(getGredLookup),
    //     })
    //     .json();

    const gredLists = undefined
    //  = gredResponse.data.map((element) => ({
    //     value: element.code,
    //     name: element.code,
    // }));



    const salaryMovementRecord: IntSalaryMovementRecord[] =
        await mockSalaryMovementRecord;
    const annualSalaryIncrement = await superValidate(_annualSalaryIncrement);

    return {
        records: {
            gredLists,
            salaryMovementRecord,
        },
        annualSalaryIncrement,
    };
};
