import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import {
    SalaryDetailResponseConvert,
    type SalaryDetailResponse,
} from '$lib/view-models/mypsm/salary/salary-and-allowance/salary-details-response.view-model';
import toast from 'svelte-french-toast';

export async function load() {
    showLoadingOverlay.set(true);

    // const response: Response = await api
    //     .get('api/v1/salaries/allowance/2', {})
    //     .json();

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

    showLoadingOverlay.set(false);
    return {
        props: {
            salaryDetailData,
        },
    };
}

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
