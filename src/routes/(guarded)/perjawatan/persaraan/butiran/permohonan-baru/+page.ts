

import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { retirementVoluntaryIdRequestDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary-ID.dto";
import type { VoluntaryDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-voluntary.dto";
import { _addRetirementVoluntaryInfoSchema } from "$lib/schemas/mypsm/employment/retirement/schema";
import { retirementServices } from "$lib/services/implementation/mypsm/perjawatan/retirement.service";
import { LoanServices } from "$lib/services/implementation/mypsm/pinjaman/loan.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function load({ params }) {
 let currentApplicationId: number = 0;
// =========================================
// =========== Form ========================
    const retirementDetailForm = await superValidate(zod(
        _addRetirementVoluntaryInfoSchema))
        ;


    // ===============
    // Retirement Detail
    // ===============

    let retirementVoluntaryDetail: VoluntaryDetailDTO | null = null;

    if (currentApplicationId !== 0) {
    let retirementVoluntaryDetailRequestBody: retirementVoluntaryIdRequestDTO = {
        id: currentApplicationId
    }

    const retirementVoluntaryDetailResponse: CommonResponseDTO =
        await LoanServices.getLoanDetails
            (retirementVoluntaryDetailRequestBody);

    if (retirementVoluntaryDetailResponse.status == 'success') {
        retirementVoluntaryDetail = retirementVoluntaryDetailResponse.data?.details as VoluntaryDetailDTO;

        retirementDetailForm.data = retirementVoluntaryDetail;
    }

    }
    return {
        retirementDetailForm,
        retirementVoluntaryDetail,

    }
}
    


//============================================
//========= Add Retirement =================
//============================================

export const _retirementDetailSubmit = async (formData: object) => {
    const retirementDetailsInfoForm = await superValidate(formData, (zod)(_addRetirementVoluntaryInfoSchema));

    if (retirementDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await retirementServices.addVoluntaryDetail(retirementDetailsInfoForm.data as VoluntaryDetailDTO);
        return { response };
    }

};
