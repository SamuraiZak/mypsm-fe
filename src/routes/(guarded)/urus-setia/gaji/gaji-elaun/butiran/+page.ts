import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service';
import toast from 'svelte-french-toast';

export const load = async () => {
    // const entitlementResponse = await api
    //     .get('api/v1/leaves/leaves/entitlement')
    //     .json();
    // const leaveHistory = leaveHistoryResponse.data;
    // return {
    //     leaveHistory,
    // };
};

export const _submitSalaryAllowance = async () => {
    console.log('first');

    const salaryAllowancePromise: Promise<Response> = api
        .get('api/v1/salaries/allowance-approval/1')
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
