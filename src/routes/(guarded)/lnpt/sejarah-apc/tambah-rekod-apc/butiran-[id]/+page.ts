import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { EmployeeDetailRequestDTO } from '$lib/dto/core/common/employee/employee-detail-request.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { ApcAddDTO } from '$lib/dto/mypsm/lnpt/apc-add.dto';
import { LNPTServices } from '$lib/services/implementation/mypsm/lnpt/lnpt.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const guard: string[] = [UserRoleConstant.urusSetiaLnpt.code];

export const _addApcSchema = z.object({
    employeeId: z.number(),
    excellenceAwardYear: z.number().min(4),
});

export async function load({ params }) {
    // check guard
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    if (currentRoleCode !== null && guard.includes(currentRoleCode)) {
        // TODO: your code here

        const form = await superValidate(_addApcSchema);

        form.data.employeeId = parseInt(params.id);

        const request: EmployeeDetailRequestDTO = {
            employeeNumber: params.id,
        };

        const response: CommonResponseDTO =
            await EmployeeServices.getEmployeeDetail(request);

        const employeeDetails: CommonEmployeeDTO = response.data
            ?.details as CommonEmployeeDTO;

        if (response.status == 'success') {
            return {
                form,
                props: {
                    response,
                    employeeDetails,
                },
            };
        } else {
            return error(500);
        }
    } else {
        error(401);
    }
}

export async function _submitForm(formData: object) {
    console.log(formData);
    const form = await superValidate(formData, _addApcSchema);

    if (form.valid) {
        const response: CommonResponseDTO = await LNPTServices.addApcRecord(
            formData as ApcAddDTO,
        );

        if (response.status == 'success') {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}
