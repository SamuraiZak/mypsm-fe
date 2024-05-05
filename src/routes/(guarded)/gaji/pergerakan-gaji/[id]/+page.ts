import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { SalaryMovementDirectorApproval } from "$lib/dto/mypsm/gaji/pergerakan-gaji/add-salary-movement-director-approval.dto"
import type { SalaryMovementLetter } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-approval-letter.dto.js"
import type { SalaryMovementDetail } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-detail.dto"
import type { SalaryMovementSchedule } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-schedule.dto"
import { _directorApprovalSchema } from "$lib/schemas/mypsm/gaji/salary-schema.js"
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"


export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const meetingId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    //get meeting detail
    let salaryMovementDetailResponse: CommonResponseDTO = {};
    let salaryMovementDetail = {} as SalaryMovementDetail;
    let salaryMovementScheduleResponse: CommonResponseDTO = {};
    let salaryMovementSchedule: SalaryMovementSchedule[] = [];
    let SalaryMovementApprovalResponse: CommonResponseDTO = {};
    let salaryMovementApproval = {} as SalaryMovementDirectorApproval;
    let salaryMovementLetter: SalaryMovementLetter[] = [];


    //get meeting detail
    salaryMovementDetailResponse =
        await SalaryServices.getSalaryMovementDetail(meetingId);
    salaryMovementDetail =
        salaryMovementDetailResponse.data?.details as SalaryMovementDetail;

    salaryMovementScheduleResponse =
        await SalaryServices.getSalaryMovementSchedule(meetingId)
    salaryMovementSchedule =
        salaryMovementScheduleResponse.data?.dataList as SalaryMovementSchedule[];

    SalaryMovementApprovalResponse =
        await SalaryServices.getSalaryMovementApproval(meetingId)
    salaryMovementApproval =
        SalaryMovementApprovalResponse.data?.details as SalaryMovementDirectorApproval;

    const salaryMovementLetterResponse: CommonResponseDTO = 
        await SalaryServices.getSalaryMovementLetter(meetingId);
    salaryMovementLetter = 
        salaryMovementLetterResponse.data?.dataList as SalaryMovementLetter[];

    const directorApprovalForm = await superValidate(salaryMovementApproval,zod(_directorApprovalSchema), {errors: false})

    return {
        currentRoleCode,
        salaryMovementDetail,
        salaryMovementSchedule,
        directorApprovalForm,
        meetingId,
        salaryMovementLetter,
    }
}

export const _submit = async (formData: SalaryMovementDirectorApproval) => {
    const form = await superValidate(formData, zod(_directorApprovalSchema))

    if (form.valid) {
        const { name, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await SalaryServices.addSalaryMovementApproval(tempObj as SalaryMovementDirectorApproval)

        return { response }
    }
}   