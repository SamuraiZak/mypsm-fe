import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto.js";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { ClaimIdRequestDTO } from "$lib/dto/mypsm/perubatan/claim-id-request.dto.js";
import type { MedicalClinicCalculation } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-calculation.dto.js";
import type { MedicalClinicClaimDetail } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-clinic-detail.dto.js";
import type { MedicalClinicClaimSuppApp } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-supporter-approver.dto";
import type { MedicalClinicClaimsList } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claims-list.dto.js";
import { _clinicCommonResultSchema, _clinicSuppAppIdSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params }) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let clinicId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let claimIdRequest: ClaimIdRequestDTO = {
        id: Number(params.id),
        month: params.month
    }
    let clinicDetail = {} as MedicalClinicClaimDetail;
    let calculationDetail = {} as MedicalClinicCalculation;
    let claimList: MedicalClinicClaimsList[] = [];
    let supporterApprover = {} as MedicalClinicClaimSuppApp;

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const clinicDetailResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicClaimDetail(clinicId);
    clinicDetail =
        clinicDetailResponse.data?.details as MedicalClinicClaimDetail;
    const calculationDetailResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicCalculation(claimIdRequest)
    calculationDetail =
        calculationDetailResponse.data?.details as MedicalClinicCalculation
    const claimListResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicClaimList(claimIdRequest)
    claimList =
        claimListResponse.data?.dataList as MedicalClinicClaimsList[];

    // TODO: add medicalClaim in DTO
    // const supporterApproverResponse: CommonResponseDTO = 
    //     MedicalServices.getMedicalClinicClaimSuppApp()

    const supporterApproverForm = await superValidate(supporterApprover, zod(_clinicSuppAppIdSchema));
    const supporterApprovalForm = await superValidate(zod(_clinicCommonResultSchema));
    const approverApprovalForm = await superValidate(zod(_clinicCommonResultSchema))

    return {
        currentRoleCode,
        clinicId,
        lookup,
        param,
        clinicDetail,
        calculationDetail,
        claimList,
        claimListResponse,
        supporterApprover,
        supporterApproverForm,
        supporterApprovalForm,
        approverApprovalForm,
    }
}

export const _submitSupporterApprover = async (formData: MedicalClinicClaimSuppApp) => {
    const form = await superValidate(formData, zod(_clinicSuppAppIdSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addMedicalClinicClaimSuppApp(form.data as MedicalClinicClaimSuppApp)

        return { response }
    }
}

const getLookup = async () => {
    // -------------------------------------------------------
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    }
    const supporterApproverResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(suppAppResponse);

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverBothAreName(
        supporterApproverResponse,
    );
    // -------------------------------------------------------
    const supporterApproverIdLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApprover(
        supporterApproverResponse,
    );
    return {
        supporterApproverLookup,
        supporterApproverIdLookup,
    }
}
