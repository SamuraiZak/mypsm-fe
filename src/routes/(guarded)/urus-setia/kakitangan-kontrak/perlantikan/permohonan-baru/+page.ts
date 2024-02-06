import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddNewContractRequest } from '$lib/dto/mypsm/contract-employment/add-new-contract-request.dto';
import { getErrorToast, getLoadingToast, getPromiseToast, getServerErrorToast, getSuccessToast } from '$lib/services/core/toast/toast-service';
import { ContractEmploymentServices } from '$lib/services/implementations/mypsm/contract-employment/contract-employment.service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// New Appointments
const generalEmailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ")

const generalTextSchema = z
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

const date = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    }).min(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });

export const _newAppointments = z.object({
    name: generalTextSchema,
    email: generalEmailSchema,
    startContract: date.refine((data) => data >= new Date(), {
        message: 'Tidak boleh kurang atau pada tarikh semasa',
    }),
    endContract: date.refine((data) => data >= new Date(), {
        message: 'Tidak boleh kurang atau pada tarikh semasa',
    }),
    contractPeriod: numberScheme,
    wageRate: numberScheme,
    designation: generalTextSchema,
    reportDutyDate: date.refine((date) => date.toLocaleDateString()),
});

export const _submitFormNewAppointments = async (formData: object) => {
    const newAppointments = await superValidate(formData, _newAppointments);

    if (!newAppointments) {
        getErrorToast();
        console.log(newAppointments)
        return fail(400, newAppointments)
    }

    //start rendering loading toast
    getLoadingToast();

    //add new contract
    const response: CommonResponseDTO = await ContractEmploymentServices.addNewContract(
        newAppointments.data as AddNewContractRequest,
    ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        getServerErrorToast();
    }
    getSuccessToast().finally(() =>
    setTimeout(() => { 
        goto('/urus-setia/kakitangan-kontrak/perlantikan')
    }, 2000),
    )
    return { newAppointments }
};

//Async
export const load = async () => {
    const newAppointments = await superValidate(_newAppointments);

    return {
        newAppointments,
    };
};

// if (!newAppointments.valid) {
    //     toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
    //         style: 'background: #333; color: #fff;',
    //     });
    //     return fail(400, newAppointments);
    // }
    // const responsePromise = fetch(
    //     'https://jsonplaceholder.typicode.com/posts',
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(_newAppointments),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     },
    // )
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log('Response Returned: ', json);
    //     });
    // getPromiseToast(responsePromise);
    // return { newAppointments };