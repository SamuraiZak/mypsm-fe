import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { SalaryMovementComment } from "$lib/dto/mypsm/gaji/pergerakan-gaji/add-new-salary-movement.dto.js";
import type { ExcludedEmployee, SalaryMovementApplicationDetail } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto";
import { _salaryMovementComment } from "$lib/schemas/mypsm/gaji/salary-schema.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    const lookup = await getLookup();
    let movementType: string = params.type
    let id: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let excludedEmployee: ExcludedEmployee[] = [];
    let applicationDetail = {} as SalaryMovementApplicationDetail;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityDocumentNumber: null,
            scheme: null,
            grade: null,
            position: null
        },
    }
    const applicationDetailResponse: CommonResponseDTO =
        await SalaryServices.getSalaryMovementDetail(id)
    applicationDetail =
        applicationDetailResponse.data?.details as SalaryMovementApplicationDetail;
    excludedEmployee = applicationDetail.employeeList as ExcludedEmployee[];


    //form
    const commentForm = await superValidate(zod(_salaryMovementComment));

    return {
        props: {
            currentRoleCode,
            param,
            movementType,
            lookup,
            id,
        },
        table: {
            excludedEmployee
        },
        form: {
            applicationDetail,
            commentForm,
        },
    }
}

export const _submitCommentForm = async (formData: SalaryMovementComment) => {
    const form = await superValidate(formData, zod(_salaryMovementComment))
    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.addSalaryMovementComment(form.data as SalaryMovementComment)

        return { response }
    }
}

const getLookup = async () => {
    // -------------------------------------------------------
    const monthReq: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 20,
        orderBy: "",
        orderType: 0,
        filter: {
            code: null,
            description: null,
            isQuarter: true
        }
    }
    
    const salaryMonthResponse: CommonResponseDTO =
        await LookupServices.getSalaryMovementMonth(monthReq);

    const salaryMovementMonth: DropdownDTO[] =
        LookupServices.setSelectOptions(salaryMonthResponse)

    return {
        salaryMovementMonth,
    }
}