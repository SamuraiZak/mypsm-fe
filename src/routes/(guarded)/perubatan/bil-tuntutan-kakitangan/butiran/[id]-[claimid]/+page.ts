import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { ClinicCommonResult } from "$lib/dto/mypsm/perubatan/clinic-common-approval.dto"
import type { ClinicSetSupporterApprover } from "$lib/dto/mypsm/perubatan/clinic-common-supporter-approver.dto"
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto"
import { _addEmployeeClaimsSchema, _clinicCommonResultSchema, _clinicSupporterApproverSchema } from "$lib/schemas/mypsm/medical/medical-schema"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let employeeId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let claimId: commonIdRequestDTO = {
        id: Number(params.claimid)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;
    let secretaryApproval = {} as ClinicCommonResult;
    let supporterApprover = {} as ClinicSetSupporterApprover;
    let supporterApproval = {} as ClinicCommonResult;
    let approverApproval = {} as ClinicCommonResult;

    const employeeDetailResponse: CommonResponseDTO =
        await MedicalServices.getMedicalEmployeeDetail(employeeId)
    employeeDetail =
        employeeDetailResponse.data?.details as MedicalEmployeeDetail;
    const secretaryApprovalResponse: CommonResponseDTO =
        await MedicalServices.getEmployeeClaimSecretaryApproval(claimId)
    secretaryApproval =
        secretaryApprovalResponse.data?.details as ClinicCommonResult;
    const supporterApproverResponse: CommonResponseDTO =
        await MedicalServices.getEmployeeClaimSuppApp(claimId);
    supporterApprover =
        supporterApproverResponse.data?.details as ClinicSetSupporterApprover;
    const supporterApprovalResponse: CommonResponseDTO =
        await MedicalServices.getEmployeeClaimSupporterApproval(claimId)
    supporterApproval =
        supporterApprovalResponse.data?.details as ClinicCommonResult;
    const approverApprovalResponse: CommonResponseDTO =
        await MedicalServices.getEmployeeClaimApproverApproval(claimId)
    approverApproval =
        approverApprovalResponse.data?.details as ClinicCommonResult;

    const secretaryApprovalForm = await superValidate(secretaryApproval, zod(_clinicCommonResultSchema), { errors: false });
    const supporterApproverForm = await superValidate(supporterApprover, zod(_clinicSupporterApproverSchema), { errors: false })
    const supporterApprovalForm = await superValidate(supporterApproval, zod(_clinicCommonResultSchema), { errors: false })
    const approverApprovalForm = await superValidate(approverApproval, zod(_clinicCommonResultSchema), { errors: false })

    return {
        currentRoleCode,
        claimId,
        employeeDetail,
        lookup,
        secretaryApproval,
        secretaryApprovalForm,
        supporterApprover,
        supporterApproverForm,
        supporterApproval,
        supporterApprovalForm,
        approverApproval,
        approverApprovalForm,
    }
}

export const _submitSecretaryApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addEmployeeClaimSecretaryApproval(form.data as ClinicCommonResult)

        return { response }
    }
}
export const _submitSupporterApproverForm = async (formData: ClinicSetSupporterApprover) => {
    const form = await superValidate(formData, zod(_clinicSupporterApproverSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addEmployeeClaimSuppApp(form.data as ClinicSetSupporterApprover)

        return { response }
    }
}
export const _submitApproverApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addEmployeeClaimApproverApproval(form.data as ClinicCommonResult)

        return { response }
    }
}
export const _submitSupporterApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addEmployeeClaimSupporterApproval(form.data as ClinicCommonResult)

        return { response }
    }
}

const getLookup = async () => {
    const clinicLookupResponse: CommonResponseDTO =
        await LookupServices.getClinicPanelList();

    const clinicLookup: DropdownDTO[] =
        LookupServices.setClinicOptions(clinicLookupResponse);
    //==========================================================
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
    return { clinicLookup, supporterApproverLookup }
}