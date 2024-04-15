import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto'
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ClinicCommonResult } from '$lib/dto/mypsm/perubatan/clinic-common-approval.dto';
import type { ClinicClaimsDetails } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-detail.dto';
import type { MedicalClinicClaimSuppApp } from '$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-supporter-approver.dto';
import { _clinicCommonResultSchema, _clinicSuppAppIdSchema } from '$lib/schemas/mypsm/medical/medical-schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let clinicId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let lookup = await getLookup();
    let claimDetail = {} as ClinicClaimsDetails;

    const claimDetailResponse =
        await MedicalServices.getClinicPanelClaimDetail(clinicId);
    claimDetail =
        claimDetailResponse.data?.details as ClinicClaimsDetails;


    const secretaryApprovalForm = await superValidate(claimDetail.secretaryApproval, zod(_clinicCommonResultSchema), { errors: false })
    const supporterApproverForm = await superValidate(claimDetail.supporterApprover, zod(_clinicSuppAppIdSchema), { errors: false })
    const supporterApprovalForm = await superValidate(claimDetail.supporter, zod(_clinicCommonResultSchema), { errors: false })
    const approverApprovalForm = await superValidate(claimDetail.approver, zod(_clinicCommonResultSchema), { errors: false })

    return {
        currentRoleCode,
        claimDetail,
        clinicId,
        lookup,
        secretaryApprovalForm,
        supporterApproverForm,
        supporterApprovalForm,
        approverApprovalForm,
    }
}

export const _submitSecretaryApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const { supporterName, approverName, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimSecretaryApproval(tempObj as ClinicCommonResult)

        return { response }
    }
}

export const _submitSuppAppForm = async (formData: MedicalClinicClaimSuppApp) => {
    const form = await superValidate(formData, zod(_clinicSuppAppIdSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimSuppApp(form.data as MedicalClinicClaimSuppApp)

        return { response }
    }
}

export const _submitSupporterApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimSupporterApproval(form.data as ClinicCommonResult)

        return { response }
    }
}
export const _submitApproverApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimApproverApproval(form.data as ClinicCommonResult)

        return { response }
    }
}

const getLookup = async () => {
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

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApprover(
        supporterApproverResponse,
    );

    return {
        supporterApproverLookup,
    }
}