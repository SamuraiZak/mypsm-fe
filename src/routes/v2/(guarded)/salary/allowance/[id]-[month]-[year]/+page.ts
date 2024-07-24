import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { SalaryAllowanceApproval } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-approval.dto.js"
import type { SalaryAllowanceIDRequest } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-id-request.dto.js"
import type { SalaryAllowanceOtherDetail } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-other-detail.dto.js"
import type { SalaryAllowancePersonalDetail } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-personal-detail.dto"
import type { SalaryAllowanceDeduction, SalaryAllowancePublicDetail } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-public-detail.dto"
import type { SalaryAllowanceSalaryDetail } from "$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-salary-detail.dto"
import { _addSalaryAllowanceSchema, _salaryAllowanceActingSchema, _salaryAllowanceApprovalSchema, _salaryAllowanceDeductionSchema, _salaryAllowancePublicSchema } from "$lib/schemas/mypsm/gaji/salary-schema.js"
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let currentId: SalaryAllowanceIDRequest = {
        employeeId: Number(params.id),
        month: Number(params.month),
        year: Number(params.year)
    }
    let employeeDetail = {} as SalaryAllowancePersonalDetail;
    let salaryDetail = {} as SalaryAllowanceSalaryDetail;
    let otherDetail: SalaryAllowanceOtherDetail[] = [];
    let publicDetail = {} as SalaryAllowancePublicDetail;
    let actingDetail: SalaryAllowanceDeduction[] = [];
    let adjustmentDetail: SalaryAllowanceDeduction[] = [];
    let approvalDetail = {} as SalaryAllowanceApproval;

    const employeeDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowancePersonalDetail(currentId);
    employeeDetail =
        employeeDetailResponse.data?.details as SalaryAllowancePersonalDetail;
    const salaryDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceSalaryDetail(currentId)
    salaryDetail =
        salaryDetailResponse.data?.details as SalaryAllowanceSalaryDetail;
    const otherDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceOtherDetail(currentId);
    otherDetail =
        otherDetailResponse.data?.dataList as SalaryAllowanceOtherDetail[];
    const publicDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowancePublicDetail(currentId);
    publicDetail =
        publicDetailResponse.data?.details as SalaryAllowancePublicDetail;
    const actingDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceActingDetail(currentId);
    actingDetail =
        actingDetailResponse.data?.dataList as SalaryAllowanceDeduction[];
    const adjustmentDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceAdjustmentDetail(currentId);
    adjustmentDetail =
        adjustmentDetailResponse.data?.dataList as SalaryAllowanceDeduction[];
    const approvalDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceApproval(currentId);
    approvalDetail =
        approvalDetailResponse.data?.details as SalaryAllowanceApproval;
    const publicDetailForm = await superValidate(zod(_salaryAllowancePublicSchema), { errors: false });
    const actingDetailForm = await superValidate(zod(_salaryAllowanceActingSchema), { errors: false });
    const adjustmentDetailForm = await superValidate(zod(_salaryAllowanceActingSchema), { errors: false })
    const addSalaryAllowanceForm = await superValidate(currentId, zod(_addSalaryAllowanceSchema), { errors: false })
    const approvalForm = await superValidate(approvalDetail, zod(_salaryAllowanceApprovalSchema), { errors: false })

    if (publicDetail.deduction !== null) {
        publicDetailForm.data = publicDetail
    }
    if (actingDetail !== null) {
        actingDetailForm.data.acting = actingDetail
    }
    if (adjustmentDetail !== null) {
        adjustmentDetailForm.data.acting = adjustmentDetail
    }

    let param: CommonListRequestDTO = {
        pageNum: 1,
        orderBy: null,
        orderType: null,
        pageSize: 5,
        filter: {}
    }
    return {
        currentRoleCode,
        currentId,
        employeeDetail,
        salaryDetail,
        otherDetail,
        param,
        publicDetail,
        actingDetail,
        adjustmentDetail,
        publicDetailForm,
        actingDetailForm,
        adjustmentDetailForm,
        addSalaryAllowanceForm,
        approvalForm,
        approvalDetail,
    }
}

export const _editSalaryAllowancePublicForm = async (formData: SalaryAllowanceDeduction) => {
    const form = await superValidate(formData, zod(_salaryAllowanceDeductionSchema))
    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.editSalaryAllowancePublicDetail(form.data as SalaryAllowanceDeduction)

        return { response }
    }
}
export const _editSalaryAllowanceActingForm = async (formData: SalaryAllowanceDeduction) => {
    const form = await superValidate(formData, zod(_salaryAllowanceDeductionSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.editSalaryAllowanceActingDetail(form.data as SalaryAllowanceDeduction)

        return { response }
    }
}
export const _editSalaryAllowanceAdjustmentForm = async (formData: SalaryAllowanceDeduction) => {
    const form = await superValidate(formData, zod(_salaryAllowanceDeductionSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.editSalaryAllowanceAdjustmentDetail(form.data as SalaryAllowanceDeduction)

        return { response }
    }
}

export const _submitSalaryAllowanceForm = async (formData: SalaryAllowanceIDRequest) => {
    const form = await superValidate(formData, zod(_addSalaryAllowanceSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.addSalaryAllowance(form.data as SalaryAllowanceIDRequest)

        return { response }
    }
}

export const _submitApprovalForm = async (formData: SalaryAllowanceApproval) => {
    const form = await superValidate(formData, zod(_salaryAllowanceApprovalSchema))
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.addSalaryAllowanceApproval(form.data as SalaryAllowanceApproval)

        return { response }
    }
}