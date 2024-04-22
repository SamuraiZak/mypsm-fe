import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { PTBIDRequestBodyDTO } from "$lib/dto/mypsm/employment/ptb-dan-kwap/id-request.dto";
import type { PersonalDetailDTO, ptbKwapApplicationDetail, ptbKwapApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/ptb-dan-kwap/ptb-kwap-dto";
import { _PTBPensionInfoSchema, _approveInfoSchema, _personalInfoSchema, _rolesRelatedEditSchema, _salaryInfoSchema, _serviceInfoSchema, _supporterInfoSchema } from "$lib/schemas/mypsm/employment/PTB-KWAP/schema";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";



export async function load({ params }) {



    // get current role code
    const currentRoleCode: string = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? UserRoleConstant.kakitangan.code;

    // set default id
    let currentApplicationId: number = 0;

    if (params.id !== "Baru") {
        currentApplicationId = parseInt(params.id);
    }


    // ============================================
    // CREATE ALL FORMS
    // ============================================

    //=====================================================
    //================== Personal Schema =================
    //=====================================================
    const personalDetailForm = await superValidate(zod(_personalInfoSchema));


    //=====================================================
    //================== Service Schema ===================

    const serviceDetailForm = await superValidate(zod(_serviceInfoSchema));


    //======================================================
    //================== Salary ===================

    const salaryDetailForm = await superValidate(zod(_salaryInfoSchema));


    //======================================================
    //================== PTB KWAP Schema ===================

    const pensionDetailForm = await superValidate(zod(_PTBPensionInfoSchema));

    //======================================================
    //========= edit Peranan -Peranan Berkaitan ============


    const rolesRelatedlForm = await superValidate(zod(_rolesRelatedEditSchema));

    //======================================================
    //============= keputusan Penyokong ====================

    const supporterDetailForm = await superValidate(zod(_supporterInfoSchema));

    //======================================================
    //=========  pelulus ==================================


    const approverDetailForm = await superValidate(zod(_approveInfoSchema));

    // ============================================
    // GET APPLICATION DATA
    // ============================================

   // ===============
    // personal Detail
    // ===============
    let personalDetail: PersonalDetailDTO | null = null;

    if (currentApplicationId !== 0) {
        // if application exist
        let personalDetailRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        const personalDetailResponse: CommonResponseDTO =
            await PTBKWAPServices.getPTBKWAPPersonalDetails(personalDetailRequestBody);

        if (personalDetailResponse.status == 'success') {
            personalDetail = personalDetailResponse.data?.details as PersonalDetailDTO;

            personalDetailForm.data = personalDetail;
        }
    }else{
        // if application is new
        let personalDetailRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        const personalDetailResponse: CommonResponseDTO =
            await PTBKWAPServices.getPTBKWAPPersonalDetails();

        if (personalDetailResponse.status == 'success') {
            personalDetail = personalDetailResponse.data?.details as PersonalDetailDTO;

            personalDetailForm.data = personalDetail;
        }
    }
   
}