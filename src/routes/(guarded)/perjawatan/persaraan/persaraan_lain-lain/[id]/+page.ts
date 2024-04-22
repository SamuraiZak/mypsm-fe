import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import type { DataList } from "$lib/dto/mypsm/employment/retirement/retirement-employee-list.dto";
import type { RetirementForcedApplicationDetail } from "$lib/dto/mypsm/employment/retirement/retirement-force.dto";
import type { UnspecifyAddDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-unspecify-add-detail.dto";
import type { RetirementRequestDTO, RetirementUnspecifyChosenDTO } from "$lib/dto/mypsm/employment/retirement/retirement.dto";
import { DetailsSchema, RetirementForcedEndorsementSchema, _addListSchema } from "$lib/schemas/mypsm/employment/retirement/retirement.schema";
import { RetirementApplicationServices } from "$lib/services/implementation/mypsm/employment/retirement/retirement.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";



export const load = async () => {


    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeListResponse: CommonResponseDTO = {};
    let employeeList: DataList[] = [];



    const employeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            employeeNumber: null,
            name: null,
            identityCardNumber: null,
            applicationDate: null,
        },
    }

    employeeListResponse =
        await RetirementApplicationServices.getUnspecifyEmployeeList(employeeListParam);
    employeeList =
        employeeListResponse.data?.dataList as DataList[];

// form
    const addNewUnspecifyListForm = await superValidate(zod(_addListSchema))

    const unspecifyIndividualDetailForm = await superValidate(zod(DetailsSchema));



    // get chosen list
    let chosenList : RetirementUnspecifyChosenDTO[] = [];

    let getChosenListRequestBody: RetirementRequestDTO = {
        
    }
    return {
        employeeListResponse,
        employeeListParam,
        employeeList,
        addNewUnspecifyListForm,
        unspecifyIndividualDetailForm,
    }
}

// add choosen List
export const _submitAddUnspecify = async (formData: UnspecifyAddDetailDTO) => {
    const form = await superValidate(formData, zod(_addListSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await RetirementApplicationServices.addRetirementUnspecify(form.data as UnspecifyAddDetailDTO)
    }
}

//update employee list table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await RetirementApplicationServices.getUnspecifyEmployeeList(param);
    return {
        props: {
            param,
            response,
        },
    };
}