import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AllowanceActingResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/allowance-acting-response.dto';
import type { AllowanceAdjustmentResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/allowance-adjustment-response.dto';
import type { AllowancePublicResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/allowance-public-response.dto';
import type { DetailAllowanceOtherResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowanc-other-reponse.dto';
import type { DetailAllowanceDetailResponseDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-detail-response.dto';
import type { DetailAllowanceRequestDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-request.dto';
import type { DetailAllowanceResponsetDTO } from '$lib/dto/mypsm/salary/salary-allowance/detail-allowance-response.dto';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { loadingState } from '$lib/stores/globalState';
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

// ================================================== load
export async function load({ params }) {
    const pemangkuanForm = await superValidate(_pemangkuanFormSchema);
    const umumForm = await superValidate(_umumFormSchema);

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

    //employee other
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowanceOther(param);

    const employeeOtherData = response.data
        ?.dataList as DetailAllowanceOtherResponseDTO[];

    //employee public
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowancePublic(param);

    const employeePublicData = response.data
        ?.details as AllowancePublicResponseDTO;

    //employee public
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowanceActing(param);

    const employeeActingData = response.data
        ?.dataList as AllowanceActingResponseDTO[];

    //employee public
    param.employeeId = Number(params.id);
    response = await SalaryServices.getSalaryAllowanceAdjustment(param);

    const employeeAdjustmentData = response.data
        ?.dataList as AllowanceAdjustmentResponseDTO[];

    // showLoadingOverlay.set(false);
    return {
        pemangkuanForm,
        umumForm,
        props: {
            employeeDetailData,
            employeeSalariesData,
            employeeOtherData,
            employeePublicData,
            employeeActingData,
            employeeAdjustmentData,
        },
    };
}
export async function _confirmData() {
    loadingState.set(true);
    //employee public
    const response = await SalaryServices.addSalaryAllowanceAdjustment(param);
    loadingState.set(false);
    return {
        status: response.status,
    };
}
