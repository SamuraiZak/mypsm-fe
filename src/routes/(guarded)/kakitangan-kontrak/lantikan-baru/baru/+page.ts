import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { AddNewContractEmployeeDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-new-contract-employee.dto";
import { _addNewContractEmployeeSchema } from "$lib/schemas/mypsm/contract-employee/contract-employee-schemas";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { goto } from '$app/navigation';


export const load = async () => {
    const form = await superValidate(zod(_addNewContractEmployeeSchema));

    return {
        form,
    }
}

export const _submit = async (formData: AddNewContractEmployeeDTO) => {
    const form = await superValidate(formData, zod(_addNewContractEmployeeSchema));
    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployee(
                form.data as AddNewContractEmployeeDTO
            )
        if(response.status == 'success'){
            goto('./');
            return response
        }
    }
};