import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import {
    SalaryDetailResponseConvert,
    type SalaryDetailResponse,
} from '$lib/view-models/mypsm/salary/salary-and-allowance/salary-details-response.view-model';
import toast from 'svelte-french-toast';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// ===================================================
// Form Schema
// ===================================================
const minDateScheme = z.coerce
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

const maxDateScheme = z.coerce
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

const generalDateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })

const numberScheme = z.union([z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}), z.number()]).transform((x) => Number(x)).pipe(z.number({
    required_error: "Medan ini tidak boleh dibiar kosong.",
    invalid_type_error: "Hanya nombor sahaja dibenarkan. Contoh (500.40)",
    description: "Hanya nombor sahaja dibenarkan. Contoh (500.40)"
}))

const generalEmailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ")
const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });
const generalTextSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).min(1, { message: "Medan ini tidak boleh dibiar kosong." }).max(124, {
    message: 'Medan ini tidak boleh melebihi 124 karakter.',
});

export const _pemangkuanFormSchema = z.object({
    salary: numberScheme,
    itka: generalTextSchema,
    housingSchemeType: generalTextSchema,
    totalHousingScheme: numberScheme,
    cola: generalTextSchema,
    month: generalTextSchema,
    total: numberScheme,
    gred: numberScheme,
    effectiveDate: minDateScheme,
})

export const _umumFormSchema = z.object({
    totalSalaryDeduction: numberScheme,
    tempohBayaran: generalSelectSchema,
})

export const _modalFormSchema: any = z.object({
    startDate: generalDateScheme.refine((value) => value >= new Date(_modalFormSchema.endDate), {
        message: 'Tidak boleh kurang daripada tarikh semasa',
    }),
    endDate: generalDateScheme.refine((value) => value <= new Date(_modalFormSchema.startDate), {
        message: 'Tidak boleh kurang daripada tarikh mula',
    }),
    jenisPenambahan: generalTextSchema,
    totalPayment: numberScheme,
    paymentType: generalSelectSchema,
})


// ================================================== load
export const load = async() => {
    const pemangkuanForm = await superValidate(_pemangkuanFormSchema);
    const umumForm = await superValidate(_umumFormSchema);
    const modalForm = await superValidate(_modalFormSchema);
    // showLoadingOverlay.set(true);
    const result: unknown = {
        "status": 201,
        "message": "Record retrieved successfully.",
        "data": {
            "employeeNo": "EM00002",
            "name": "Jon Bovi",
            "identityCard": "620302138881",
            "grade": "Pelukis",
            "currentPlacement": "LKIM Negeri Selangor",
            "group": "Kumpulan Perkhidmatan Sokongan III"
        }
    }

    const response = <JSON>result;

    const salaryDetail: SalaryDetailResponse =
        SalaryDetailResponseConvert.fromJson(JSON.stringify(response));

    const salaryDetailData = salaryDetail.data;

    // showLoadingOverlay.set(false);

    return {
        pemangkuanForm, 
        umumForm,
        modalForm,
        props: {
            salaryDetailData,
        }, 
    };
}

export const _submitSalaryAllowance = async () => {
    const salaryAllowancePromise: Promise<Response> = api
        .get('salaries/allowance-approval/1')
        .json();

    toast
        .promise(
            salaryAllowancePromise,
            {
                loading: 'Sedang diproses...',
                success: 'Data berjaya dihantar ke sistem SAGA!',
                error: 'Ralat. Data tidak berjaya dihantar ke sistem SAGA.',
            },
            {
                style: 'background: #333; color: #fff;',
            },
        )
        .then(() => {
            setTimeout(() => {
                goto('../gaji-elaun');
            }, 2000);
        });

};

// ======================================== form function
export const _submitPemangkuanForm = async (formData: object) => {
    const pemangkuanForm = await superValidate(formData, _pemangkuanFormSchema);
    if (!pemangkuanForm.valid) {
        getErrorToast();
        console.log(pemangkuanForm)
        return fail(400, pemangkuanForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(pemangkuanForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { pemangkuanForm }
};

export const _submitUmumForm = async (formData: object) => {
    const umumForm = await superValidate(formData, _umumFormSchema);
    if (!umumForm.valid) {
        getErrorToast();
        console.log(umumForm)
        return fail(400, umumForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(umumForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { umumForm }
};

export const _submitModalForm = async (formData: object) => {
    const modalForm = await superValidate(formData, _modalFormSchema);
    if (!modalForm.valid) {
        getErrorToast();
        console.log(modalForm)
        return fail(400, modalForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(modalForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { modalForm }
};



