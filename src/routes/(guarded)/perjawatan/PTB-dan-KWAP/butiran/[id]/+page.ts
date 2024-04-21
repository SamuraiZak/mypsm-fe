import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ptbKwapApplicationDetail, ptbKwapApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/ptb-dan-kwap/ptb-kwap-dto";
import { _PTBPensionInfoSchema, _approveInfoSchema, _personalInfoSchema, _rolesRelatedEditSchema, _salaryInfoSchema, _serviceInfoSchema, _supporterInfoSchema } from "$lib/schemas/mypsm/employment/PTB-KWAP/schema";
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

    // set default application detail
    let currentApplicationDetail: ptbKwapApplicationDetail = {
        personalDetail:null,
        serviceDetail:null,
        salaryDetail:null,
        pensionDetail:null,
        supportDetail:null,
        approveDetail:null,
    }

    if (currentApplicationId !== 0) {

        const applicationDetailRequest: ptbKwapApplicationDetailRequestDTO = {
            id: currentApplicationId,
        }

        // fetch the application detail

    }
   
}