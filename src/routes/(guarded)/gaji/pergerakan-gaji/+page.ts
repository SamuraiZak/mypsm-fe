import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { AddNewSalaryMovement } from "$lib/dto/mypsm/gaji/pergerakan-gaji/add-new-salary-movement.dto";
import type { SalaryMovementFilter, SalaryMovementList } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto";
import { _addNewSalaryMovementSchema } from "$lib/schemas/mypsm/gaji/salary-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";
import { EmployeeServices } from "$lib/services/implementation/mypsm/shared/employee.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let salaryMovementListResponse: CommonResponseDTO = {};
    let salaryMovementList: SalaryMovementList[] = [];
    let employeeListResponse: CommonResponseDTO = {};
    let employeeList: CommonEmployeeDTO[] = [];

    const lookup = await getLookup();

    const employeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null
        },
    }

    const salaryMovementListFilter: SalaryMovementFilter = {
        month: 1,
        year: 2024,
    }
    const salaryMovementParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: salaryMovementListFilter,
    }

    employeeListResponse =
        await EmployeeServices.getEmployeeList(employeeListParam);
    employeeList =
        employeeListResponse.data?.dataList as CommonEmployeeDTO[];

    salaryMovementListResponse =
        await SalaryServices.getSalaryMovementList(salaryMovementParam);
    salaryMovementList =
        salaryMovementListResponse.data?.dataList as SalaryMovementList[];


    const addNewSalaryMovementForm = await superValidate(zod(_addNewSalaryMovementSchema))


    return {
        currentRoleCode,
        employeeListParam,
        employeeListResponse,
        employeeList,
        salaryMovementList,
        salaryMovementParam,
        salaryMovementListResponse,
        addNewSalaryMovementForm,
        lookup,
    }
}

export const _submitAddNewSalaryMovement = async (formData: AddNewSalaryMovement) => {
    const form = await superValidate(formData, zod(_addNewSalaryMovementSchema))
   
    if(form.valid){
        const response: CommonResponseDTO =
            await SalaryServices.addNewSalaryMovement(form.data as AddNewSalaryMovement)
    }
}

//update employee list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await EmployeeServices.getEmployeeList(param);
    return {
        props: {
            param,
            response,
        },
    };
}

//get lookup
const getLookup = async () => {
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();
    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptionsValueIsDescription(
        positionLookupResponse,
    );


    return {
        positionLookup,
    }
}