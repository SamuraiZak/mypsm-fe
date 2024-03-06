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

export const _submit = async (formData: object) => {
    const form = await superValidate(formData, zod(_addNewContractEmployeeSchema));
    if (form.valid) {
        const tempFormData: AddNewContractEmployeeDTO = {
            name: form.data.name,
            email: form.data.email,
            identityDocumentNumber: form.data.identityDocumentNumber,
            startContract: form.data.startContract.toISOString().split('T')[0],
            endContract: form.data.endContract.toISOString().split('T')[0],
            wageRate: form.data.wageRate,
            designation: form.data.designation,
            reportDutyDate: form.data.reportDutyDate.toISOString().split('T')[0],
        }
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployee(
                tempFormData as AddNewContractEmployeeDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            goto('./');
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};