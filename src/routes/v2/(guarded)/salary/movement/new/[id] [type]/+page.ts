import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { AddNewSalaryMovement } from "$lib/dto/mypsm/gaji/pergerakan-gaji/add-new-salary-movement.dto";
import type { ExcludedEmployee, SalaryMovementApplicationDetail } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto.js";
import { _addNewSalaryMovementSchema } from "$lib/schemas/mypsm/gaji/salary-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";
import { EmployeeServices } from "$lib/services/implementation/mypsm/shared/employee.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    const lookup = await getLookup();

    let employeeListResponse: CommonResponseDTO = {};
    let employeeList: CommonEmployeeDTO[] = [];
    let excludedEmployee: ExcludedEmployee[] = [];
    let applicationDetail = {} as SalaryMovementApplicationDetail;

    let movementType: string = '';
    let id: commonIdRequestDTO = {
        id: 0
    }
    const form = await superValidate(zod(_addNewSalaryMovementSchema))

    switch (params.type) {
        case "Kenaikan Khas": {
            movementType = "Kenaikan Khas";
            form.data.salaryMovementTypeId = 1
            break;
        }
        case "Kenaikan Gaji Tahunan": {
            movementType = "Kenaikan Gaji Tahunan";
            form.data.salaryMovementTypeId = 2
            break;
        }
        case "Bantuan Khas Kewangan": {
            movementType = "Bantuan Khas Kewangan";
            form.data.salaryMovementTypeId = 3
            break;
        }
    }

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
            role: null,
            movementMonth: null
        },
    }

    if (params.id !== "application") {
        id.id = Number(params.id)

        const applicationDetailResponse: CommonResponseDTO =
            await SalaryServices.getSalaryMovementDetail(id)
        applicationDetail =
            applicationDetailResponse.data?.details as SalaryMovementApplicationDetail;

        //preset the form for isDraft
        form.data.id = applicationDetail.applicationId;
        form.data.meetingDate = applicationDetail.meetingDate;
        form.data.meetingName = applicationDetail.meetingName;
        applicationDetail.employeeList.forEach((val) => {
            form.data.employees.push({ employeeId: val.employeeId })
        })
        excludedEmployee = applicationDetail.employeeList as ExcludedEmployee[];
    } else {
        employeeListResponse =
            await EmployeeServices.getEmployeeList(param);
        employeeList =
            employeeListResponse.data?.dataList as CommonEmployeeDTO[];
    }

    return {
        props: {
            currentRoleCode,
            lookup,
            movementType,
            id,
        },
        table: {
            param,
            employeeListResponse,
            employeeList,
            excludedEmployee,
        },
        form,
    }
}

export const _submitAddNewSalaryMovement = async (formData: AddNewSalaryMovement) => {
    const form = await superValidate(formData, zod(_addNewSalaryMovementSchema))
    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.addNewSalaryMovement(form.data as AddNewSalaryMovement)

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
    // -------------------------------------------------------
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsActingGrade(gradeLookupResponse);
    const nullGrade: DropdownDTO = {
        value: null,
        name: "Semua"
    }

    gradeLookup.push(nullGrade);

    return {
        salaryMovementMonth,
        gradeLookup,
    }
}