import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { GCREmployeeDetailResponse } from '$lib/dto/mypsm/leave/gcr/gcr-employee-detail-response.dto';
import type { GCRWithdrawalAnnualLeaveDetailResponse } from '$lib/dto/mypsm/leave/gcr/gcr-withdrawal-annual-leave-detail-response.dto';
import { getSuccessToast } from '$lib/services/core/toast/toast-service.js';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });
const uploadedFileSchema = z.any().array().nonempty({
    message: 'Sila muat naik dokumen - dokumen berkaitan.',
});

export const _staffDetailSchema = z.object({
    gred: generalSelectSchema,
    placement: generalSelectSchema,
    group: generalSelectSchema,
    uploadedFiles: uploadedFileSchema,
});

export const load = async () => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;
    const userData = await request.json();
    const form = await superValidate(userData, _staffDetailSchema);

    // temp param
    const param = {
        id: 1,
    };

    const gcrWithdrawalEmployeeDetailResponse: CommonResponseDTO =
        await LeaveServices.getGCRWithdrawalEmployeeDetail(param);

    const gcrWithdrawalEmployeeDetail: GCREmployeeDetailResponse =
        gcrWithdrawalEmployeeDetailResponse.data
            ?.details as GCREmployeeDetailResponse;

    const gcrDetailResponse: CommonResponseDTO =
        await LeaveServices.getGCRWithdrawalAnnualLeaveDetail(param);

    const gcrDetail: GCRWithdrawalAnnualLeaveDetailResponse = gcrDetailResponse
        .data?.details as GCRWithdrawalAnnualLeaveDetailResponse;

    return { gcrWithdrawalEmployeeDetail, gcrDetail, form };
};

export const _submitLeaveReplacementForm = async () => {
    // const form = await superValidate(formData, _staffDetailSchema);

    // if (!form.valid) {
    //     getErrorToast();
    //     return fail(400, form);
    // }

    // const responsePromise = fetch(
    //     'https://jsonplaceholder.typicode.com/posts',
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(form),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     },
    // )
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log('Response Returned: ', json);
    //     });

    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../gantian-cuti-rehat');
        }, 2000),
    );

    // return { form };
};
