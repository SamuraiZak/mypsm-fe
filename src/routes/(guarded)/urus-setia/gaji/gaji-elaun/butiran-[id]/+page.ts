import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AllowancePublicResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/allowance-public-response.dto';
import type { DetailAllowanceOtherResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowanc-other-reponse.dto';
import type { DetailAllowanceDetailResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-detail-response.dto';
import type { DetailAllowanceRequestDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-request.dto';
import type { DetailAllowanceResponsetDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-response.dto';
import api from '$lib/services/core/ky.service';
import {
    getErrorToast,
    getPromiseToast,
} from '$lib/services/core/toast/toast-service';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import {
    SalaryDetailResponseConvert,
    type SalaryDetailResponse,
} from '$lib/view-models/mypsm/salary/salary-and-allowance/salary-details-response.view-model';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
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

const generalDateScheme = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const numberScheme = z
    .union([
        z.string({
            invalid_type_error: 'Medan ini tidak boleh dibiar kosong.',
        }),
        z.number(),
    ])
    .transform((x) => Number(x))
    .pipe(
        z.number({
            required_error: 'Medan ini tidak boleh dibiar kosong.',
            invalid_type_error:
                'Hanya nombor sahaja dibenarkan. Contoh (500.40)',
            description: 'Hanya nombor sahaja dibenarkan. Contoh (500.40)',
        }),
    );

const generalEmailSchema = z
    .string({
        invalid_type_error: 'Medan ini tidak boleh dibiar kosong.',
    })
    .email('Sila nyatakan format emel yang sah. ');
const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda. ' });
const generalTextSchema = z
    .string({
        invalid_type_error: 'Medan ini tidak boleh dibiar kosong.',
    })
    .min(1, { message: 'Medan ini tidak boleh dibiar kosong.' })
    .max(124, {
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
});

export const _umumFormSchema = z.object({
    totalSalaryDeduction: numberScheme,
    tempohBayaran: generalSelectSchema,
});
const param: DetailAllowanceRequestDTO = {
    employeeId: 0,
};

export const _modalFormSchema: any = z.object({
    startDate: generalDateScheme.refine(
        (value) => value >= new Date(_modalFormSchema.endDate),
        {
            message: 'Tidak boleh kurang daripada tarikh semasa',
        },
    ),
    endDate: generalDateScheme.refine(
        (value) => value <= new Date(_modalFormSchema.startDate),
        {
            message: 'Tidak boleh kurang daripada tarikh mula',
        },
    ),
    jenisPenambahan: generalTextSchema,
    totalPayment: numberScheme,
    paymentType: generalSelectSchema,
});

// ================================================== load
export async function load({ params }) {
    const pemangkuanForm = await superValidate(_pemangkuanFormSchema);
    const umumForm = await superValidate(_umumFormSchema);
    const modalForm = await superValidate(_modalFormSchema);

    // employee detail
    param.employeeId = Number(params.id);
    let response: CommonResponseDTO =
        await SalaryServices.getSalaryAllowance(param);

    const employeeDetailData = response.data
        ?.details as DetailAllowanceResponsetDTO;

    //employee salaries
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowanceDetail(param);

    const employeeSalariesData = response.data
        ?.details as DetailAllowanceDetailResponseDTO;

    //employee salaries
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowanceOther(param);

    const employeeOtherData = response.data
        ?.dataList as DetailAllowanceOtherResponseDTO[];

    //employee salaries
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowancePublic(param);

    const employeePublicData = response.data
        ?.details as AllowancePublicResponseDTO;

    // showLoadingOverlay.set(false);
    return {
        pemangkuanForm,
        umumForm,
        modalForm,
        props: {
            employeeDetailData,
            employeeSalariesData,
            employeeOtherData,
            employeePublicData,
        },
    };
}
export async function _getEmployeeSalary(props: object) {
    const response: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceDetail(param);

    const employeeDetailData = response.data
        ?.details as DetailAllowanceDetailResponseDTO;
    props = {
        employeeDetailData,
    };
    return props;
    // showLoadingOverlay.set(false);
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
        console.log(pemangkuanForm);
        return fail(400, pemangkuanForm);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(pemangkuanForm),
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
    return { pemangkuanForm };
};

export const _submitUmumForm = async (formData: object) => {
    const umumForm = await superValidate(formData, _umumFormSchema);
    if (!umumForm.valid) {
        getErrorToast();
        console.log(umumForm);
        return fail(400, umumForm);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(umumForm),
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
    return { umumForm };
};

export const _submitModalForm = async (formData: object) => {
    const modalForm = await superValidate(formData, _modalFormSchema);
    if (!modalForm.valid) {
        getErrorToast();
        console.log(modalForm);
        return fail(400, modalForm);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(modalForm),
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
    return { modalForm };
};
