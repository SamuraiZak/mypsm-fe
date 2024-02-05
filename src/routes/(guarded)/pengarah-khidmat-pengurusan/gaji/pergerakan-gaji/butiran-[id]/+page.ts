import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddSalaryMovementApprovalRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-approval-request.dto.js';
import type { DetailSalaryMovementApprovalRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-approval-request.dto.js';
import type { DetailSalaryMovementRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-request.dto';
import type { DetailSalaryMovementDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement.dto';
import type { GetSalaryMovementScheduleRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/get-salary-movement-schedule-request.dto.js';
import type { GetSalaryMovementScheduleDTO } from '$lib/dto/mypsm/salary/salary-movement/get-salary-movement-schedule-response.dto.js';
import type { ListSalaryMovementApprovalFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval-filter.dto';
import type { ListSalaryMovementApprovalDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval.dto';
import type { ListSalaryMovementFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-filter.dto';
import type { SalaryMovementListDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement.dto';
import { getErrorToast, getLoadingToast, getPromiseToast, getServerErrorToast, getSuccessToast } from '$lib/services/core/toast/toast-service';
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
    id: z.number(),
    remark: resultOption,
    status: z.boolean(),
});

export const _submitFormStepperRevisionSalaryMovementSchedule = async (formData: object,) => {
    const stepperRevisionSalaryMovementSchedule = await superValidate(
        formData,
        _stepperRevisionSalaryMovementSchedule,
    );
    console.log(stepperRevisionSalaryMovementSchedule)
    if(!stepperRevisionSalaryMovementSchedule.valid){
        getErrorToast();
        
        return fail(400, stepperRevisionSalaryMovementSchedule)
    }
    getLoadingToast();

    //add approval
    const response: CommonResponseDTO = await SalaryServices.addSalaryMovementApproval(
        stepperRevisionSalaryMovementSchedule.data as AddSalaryMovementApprovalRequestDTO,
    ).finally(() => toast.dismiss());

    if(response.status !== 'success'){
        getServerErrorToast();
    }
    getSuccessToast()

    return { stepperRevisionSalaryMovementSchedule }
};

//Async
export async function load({ params }) {
    const stepperRevisionSalaryMovementSchedule = await superValidate(
        _stepperRevisionSalaryMovementSchedule,
    );

    //get meeting id
    const detailMeetingId: DetailSalaryMovementApprovalRequestDTO = {
        meetingId: Number(params.id),
    }

    //detail of salary movement **first stepper
    const detailSalaryResponse: CommonResponseDTO =
        await SalaryServices.getSalaryMovementDetail(detailMeetingId)

    const detailSalaryMovement: DetailSalaryMovementDTO =
        detailSalaryResponse.data?.details as DetailSalaryMovementDTO;
    const filter: ListSalaryMovementFilterDTO = {
        month: detailSalaryMovement.salaryMovementMonth % 100,
        year: Math.floor(detailSalaryMovement.salaryMovementMonth / 100)
    }
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: filter,
    };
    const filterDetailResponse: CommonResponseDTO = await SalaryServices.getSalaryMovementList(param)
    const salaryMovementList: SalaryMovementListDTO[] = filterDetailResponse.data?.dataList as SalaryMovementListDTO[];


    //get salary movement schedule
    const scheduleId: GetSalaryMovementScheduleRequestDTO = {
        meetingId: Number(params.id),
    }
    const scheduleRequest: CommonResponseDTO =
        await SalaryServices.getSalaryMovementSchedule(scheduleId);
    const salaryScheduleList: GetSalaryMovementScheduleDTO[] = scheduleRequest.data?.dataList as GetSalaryMovementScheduleDTO[];
    return {
        stepperRevisionSalaryMovementSchedule,
        salaryMovementList,
        detailSalaryMovement,
        salaryScheduleList,
        detailMeetingId,
    };
};