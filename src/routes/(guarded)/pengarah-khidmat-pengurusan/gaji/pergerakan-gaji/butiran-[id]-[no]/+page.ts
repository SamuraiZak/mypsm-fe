import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DetailSalaryMovementRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-request.dto';
import type { DetailSalaryMovementDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement.dto';
import type { ListSalaryMovementApprovalFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval-filter.dto';
import type { ListSalaryMovementApprovalDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval.dto';
import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Verification Retirement Application
const longTextField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const resultOption = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperRevisionSalaryMovementSchedule = z.object({
    meetingActionRemark: longTextField,
    meetingResultOption: resultOption,
});

export const _submitFormStepperRevisionSalaryMovementSchedule = async (
    formData: object,
) => {
    const stepperRevisionSalaryMovementSchedule = await superValidate(
        formData,
        _stepperRevisionSalaryMovementSchedule,
    );

    if (!stepperRevisionSalaryMovementSchedule.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperRevisionSalaryMovementSchedule);
    } const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperRevisionSalaryMovementSchedule),
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
    return { stepperRevisionSalaryMovementSchedule };
};

//Async
export async function load({params}) {
    const stepperRevisionSalaryMovementSchedule = await superValidate(
        _stepperRevisionSalaryMovementSchedule,
    );

    const meeetingId: DetailSalaryMovementRequestDTO = {
        meetingId: Number(params.id),
    }

    const response: CommonResponseDTO = await SalaryServices.getSalaryMovementDetail(meeetingId)
    const detailSalaryMovement: DetailSalaryMovementDTO = response.data?.details;

    const filter: ListSalaryMovementApprovalFilterDTO = {
        month: 1,
        year: 2024
    }
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: filter,
    };
    const filterResponse: CommonResponseDTO = await SalaryServices.getSalaryMovementApprovalList(param)
    const salaryMovementList: ListSalaryMovementApprovalDTO[] = filterResponse.data?.dataList as ListSalaryMovementApprovalDTO[];
    const currentEmployee: ListSalaryMovementApprovalDTO | undefined = salaryMovementList.find((staff) => staff.employeeNumber == params.no && staff.meetingId == params.id)

    return {
        stepperRevisionSalaryMovementSchedule,
        currentEmployee,
        detailSalaryMovement,
    };
};