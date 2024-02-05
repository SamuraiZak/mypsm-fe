import { goto, invalidateAll } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddSalaryDTO } from '$lib/dto/mypsm/salary/final-payslip/add-salary.dto';
import type { EmployeeFinalSalaryDetailRequestDTO } from '$lib/dto/mypsm/salary/final-payslip/employee-final-salary-detail-request.dto';
import type { EmployeeFinalSalaryDetailDTO } from '$lib/dto/mypsm/salary/final-payslip/employee-final-salary-detail.dto';
import type { FinalSalaryServiceDTO } from '$lib/dto/mypsm/salary/final-payslip/employee-final-salary-service.dto.js';
import type { FinalPayslipDTO } from '$lib/dto/mypsm/salary/final-payslip/final-payslip.dto';
import type { SalaryDetailDTO } from '$lib/dto/mypsm/salary/final-payslip/salary-detail.dto';
import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
import {
    getErrorToast,
    getLoadingToast,
    getPromiseToast,
    getServerErrorToast,
    getSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export async function load({ params }) {
    const param: EmployeeFinalSalaryDetailRequestDTO = {
        employeeId: Number(params.id),
    };

    const finalPayslipEmployeeDetailResponse: CommonResponseDTO =
        await SalaryServices.getPayslipEmployeeDetail(param);

    const finalPayslipEmployeeDetail: EmployeeFinalSalaryDetailDTO =
        finalPayslipEmployeeDetailResponse?.data
            ?.details as EmployeeFinalSalaryDetailDTO;

    const finalPayslipServiceDetailResponse: CommonResponseDTO =
        await SalaryServices.getFinalPayslipServiceDetail(param);

    const finalPayslipServiceDetail: FinalSalaryServiceDTO =
        finalPayslipServiceDetailResponse?.data
            ?.details as FinalSalaryServiceDTO;

    const finalPayslipSalaryDetailResponse: CommonResponseDTO =
        await SalaryServices.getFinalPayslipSalaryDetail(param);

    const finalPayslipSalaryDetail: SalaryDetailDTO[] =
        finalPayslipSalaryDetailResponse?.data?.dataList as SalaryDetailDTO[];

    const finalSalaryPayslipDocResponse: CommonResponseDTO =
        await SalaryServices.getFinalSalaryPayslip(param);

    const finalSalaryPayslipDoc: FinalPayslipDTO = finalSalaryPayslipDocResponse
        .data?.details as FinalPayslipDTO;

    const currentEmployeePensions = mockEmploymentPensions.find((pension) => {
        return pension.currentServiceId === Number(params.id);
    })!;

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === Number(params.id);
        },
    )!;

    const allowanceTypeForm = await superValidate(_addAllowanceTypeSchema);
    const specialDeductionForm = await superValidate(_specialDeductionSchema);
    return {
        record: {
            param,
            finalPayslipEmployeeDetailResponse,
            finalPayslipEmployeeDetail,
            finalPayslipServiceDetailResponse,
            finalPayslipServiceDetail,
            finalPayslipSalaryDetailResponse,
            finalPayslipSalaryDetail,
            finalSalaryPayslipDocResponse,
            finalSalaryPayslipDoc,
            currentEmployeeUploadedDocuments,
            currentEmployeePensions,
        },
        allowanceTypeForm,
        specialDeductionForm,
    };
}

export const _generateFinalSalaryPayslip = async (
    currentEmployeeId: number,
) => {
    const request: AddSalaryDTO = {
        employeeId: currentEmployeeId,
        status: true,
    };
    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await SalaryServices.createFinalPayslipSalary(request).finally(() =>
            toast.dismiss(),
        );

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../gaji-akhir');
        }, 2000),
    );

    invalidateAll();

    return { response };
};

// ===================================================
// Form Schema
// ===================================================
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

const generalTextSchema = z
    .string({
        invalid_type_error: 'Medan ini tidak boleh dibiar kosong.',
    })
    .min(1, { message: 'Medan ini tidak boleh dibiar kosong.' })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    });

export const _addAllowanceTypeSchema = z.object({
    allowanceName: generalTextSchema,
    serviceDuration: numberScheme,
    currentAmount: numberScheme,
});

export const _specialDeductionSchema = z.object({
    specialDeductionName: generalTextSchema,
    total: numberScheme,
});

// ======================================== form function
export const _submitAllowanceTypeForm = async (formData: object) => {
    const allowanceTypeForm = await superValidate(
        formData,
        _addAllowanceTypeSchema,
    );
    if (!allowanceTypeForm.valid) {
        getErrorToast();
        console.log(allowanceTypeForm);
        return fail(400, allowanceTypeForm);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(allowanceTypeForm),
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
    return { allowanceTypeForm };
};

export const _submitSpecialDeductionForm = async (formData: object) => {
    const specialDeductionForm = await superValidate(
        formData,
        _specialDeductionSchema,
    );
    if (!specialDeductionForm.valid) {
        getErrorToast();
        console.log(specialDeductionForm);
        return fail(400, specialDeductionForm);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(specialDeductionForm),
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
    return { specialDeductionForm };
};
