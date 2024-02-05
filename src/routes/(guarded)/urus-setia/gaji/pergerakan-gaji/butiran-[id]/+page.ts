import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import type { DetailSalaryMovementDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement.dto';
import type { DetailSalaryMovementRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import type { ListSalaryMovementFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { SalaryMovementListDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement.dto';
import type { GetSalaryMovementScheduleRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/get-salary-movement-schedule-request.dto.js';
import type { GetSalaryMovementScheduleDTO } from '$lib/dto/mypsm/salary/salary-movement/get-salary-movement-schedule-response.dto.js';
import type { DetailSalaryMovementApprovalDTO } from '$lib/dto/mypsm/salary/salary-movement/detail-salary-movement-approval.dto.js';

// Meeting Result
const dropdown = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const numberScheme = z.union([z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}), z.number()]).transform((x) => Number(x)).pipe(z.number({
    required_error: "Medan ini tidak boleh dibiar kosong.",
    invalid_type_error: "Hanya nombor sahaja dibenarkan. Contoh (500.40)",
    description: "Hanya nombor sahaja dibenarkan. Contoh (500.40)"
}).default(0))

export const _stepperMeetingResult = z.object({
    meetingNameNum: dropdown,
    meetingDate: date.refine((data) => data <= new Date(), {
        message: 'Tidak boleh lebih daripada tarikh semasa',
    }),
    salaryMovementMonth: dropdown,
    gred: numberScheme,
    specialFiAid: numberScheme,
    specialIncrement: numberScheme,
});

export const _submitFormStepperMeetingResult = async (formData: object) => {
    const stepperMeetingResult = await superValidate(
        formData,
        _stepperMeetingResult,
    );

    if (!stepperMeetingResult.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperMeetingResult);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperMeetingResult),
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
    return { stepperMeetingResult };
};
export async function load({ params }) {
    //validate form
    const stepperMeetingResult = await superValidate(_stepperMeetingResult);

    // ============== for detail (1st stepper) ****pergerakan gaji baru ==============
    const detailMeetingId: DetailSalaryMovementRequestDTO = {
        meetingId: Number(params.id),
    }
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


    // ================= for schedule (2nd stepper) =================
    const salaryMovementScheduleReq: GetSalaryMovementScheduleRequestDTO = {
        meetingId: Number(params.id)
    }
    const salaryMovementScheduleResponse: CommonResponseDTO = await SalaryServices.getSalaryMovementSchedule(salaryMovementScheduleReq);
    const salaryScheduleList: GetSalaryMovementScheduleDTO[] = salaryMovementScheduleResponse.data?.dataList as GetSalaryMovementScheduleDTO[];


    //get approver result
    const approverResultRequest: CommonResponseDTO = await SalaryServices.getSalaryMovementApprovalDetail(detailMeetingId);
    const approverResultResponse: DetailSalaryMovementApprovalDTO = approverResultRequest.data?.details as DetailSalaryMovementApprovalDTO;

    return {
        stepperMeetingResult,
        detailSalaryMovement,
        detailMeetingId,
        salaryMovementList,
        salaryScheduleList,
        approverResultResponse,
    };
}
