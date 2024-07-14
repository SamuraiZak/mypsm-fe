import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { AddNewContractEmployeeDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-new-contract-employee.dto";
import { _addNewContractEmployeeSchema } from "$lib/schemas/mypsm/contract-employee/contract-employee-schemas";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { goto } from '$app/navigation';
import type { CandidateIDRequestBody } from "$lib/dto/core/common/candidate-id-request.view-dto";


export const load = async ({ params }) => {
    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    }
    const isEditing: string = params.id;

    let editContractResponse: CommonResponseDTO = {};
    let currentContractDetail: AddNewContractEmployeeDTO = {
        name: "",
        email: "",
        startContract: "",
        endContract: "",
        wageRate: 0,
        identityDocumentNumber: "",
        designation: "",
        reportDutyDate: "",
        isDraft: false,
    }

    if (params.id !== "baru") {
        editContractResponse =
            await ContractEmployeeServices.getCurrentContractDetail(contractId)
        currentContractDetail =
            editContractResponse.data?.details as AddNewContractEmployeeDTO;
    }

    const form = await superValidate(currentContractDetail, zod(_addNewContractEmployeeSchema), {errors: false});

    return {
        form,
        isEditing,
        contractId,
    }
}

export const _submit = async (formData: AddNewContractEmployeeDTO, submitType: string) => {
    const form = await superValidate(formData, zod(_addNewContractEmployeeSchema));
    if (form.valid) {

        let response: CommonResponseDTO = {}

        if(submitType !== "baru"){
            response = await ContractEmployeeServices.editCurrentContract(form.data
            )
        }else {
            response = await ContractEmployeeServices.addNewContractEmployee(
                form.data as AddNewContractEmployeeDTO
            )
        }

        if (response.status == 'success') {
            goto('./');
            return response;
        } else if(response.status == 'error'){
            return response;
        }
    }
};