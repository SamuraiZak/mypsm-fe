import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant'
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { InterimCommonApproval } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-common-approval.dto';
import type { InterimDateApllication } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-date-application-response.dto';
import type { EmployeeInterimApplicationDetailRequestDTO } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto';
import type { InterimReferenceNumber } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-reference-number.dto';
import type { InterimTermination, TerminationApproval, TerminationSuppApp, TerminationVerify } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-termination.dto';
import { _interimDate, _referenceNumber, _terminationCommonApproval, _terminationSuppApp } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentInterimServices } from '$lib/services/implementation/mypsm/perjawatan/employment-interim.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params,parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode

    const interimId: EmployeeInterimApplicationDetailRequestDTO = {
        interimId: Number(params.id)
    }
    let lookup = await getLookup();
    let terminationDetail = {} as InterimTermination;
    let secretaryDetail: TerminationVerify = {
        employeeId: "",
        status: false,
        remark: "",
        approvalDate: "",
    }

    const secretaryApprovalForm = await superValidate(zod(_terminationCommonApproval));
    const suppAppForm = await superValidate(zod(_terminationSuppApp));
    const supporterApprovalForm = await superValidate(zod(_terminationCommonApproval));
    const approverApprovalForm = await superValidate(zod(_terminationCommonApproval));
    const interimDateForm = await superValidate(zod(_interimDate))
    const interimReferenceNumberForm = await superValidate(zod(_referenceNumber))

    const terminationDetaiLResponse: CommonResponseDTO =
        await EmploymentInterimServices.getTerminationDetail(interimId)
    terminationDetail =
        terminationDetaiLResponse.data?.details as InterimTermination;
    if (terminationDetail?.verify !== null) {
        secretaryDetail = terminationDetail.verify;
        secretaryApprovalForm.data = {
            interimId: interimId.interimId,
            status: terminationDetail.verify.status,
            remark: terminationDetail.verify.remark,
            approvalDate: terminationDetail.verify.approvalDate,
            isDraft: terminationDetail.verify.isDraft,

        }
        interimDateForm.data.startDate = terminationDetail.calculation.personalDetail.startEffectiveDate;
        interimDateForm.data.endDate = terminationDetail.calculation.personalDetail.endEffectiveDate;
      

    }
    if (terminationDetail?.supportApprover !== null) {
        suppAppForm.data = terminationDetail.supportApprover;
    }
    if (terminationDetail?.support !== null && terminationDetail.support.status !== null) {
        supporterApprovalForm.data = terminationDetail.support
    }
    if (terminationDetail?.approval && terminationDetail.approval.status !== null) {
        approverApprovalForm.data = terminationDetail.approval
    }

    return {
        params,
        currentRoleCode,
        interimId,
        lookup,
        terminationDetail,
        secretaryApprovalForm,
        secretaryDetail,
        suppAppForm,
        supporterApprovalForm,
        approverApprovalForm,
        interimDateForm,
        interimReferenceNumberForm,
    }
}

export const _submitSecretaryApproval = async (formData: InterimCommonApproval) => {
    const form = await superValidate(formData, zod(_terminationCommonApproval))

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addTerminationSecretaryApproval(form.data as InterimCommonApproval)

        return { response }
    }
}
export const _submitSuppAppForm = async (formData: TerminationSuppApp) => {
    const form = await superValidate(formData, zod(_terminationSuppApp))

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addTerminationSuppApp(form.data as TerminationSuppApp)

        return { response }
    }
}
export const _submitSupporterApproval = async (formData: InterimCommonApproval) => {
    const form = await superValidate(formData, zod(_terminationCommonApproval))

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addTerminationSupporterApproval(form.data as InterimCommonApproval)

        return { response }
    }
}
export const _submitApproverApproval = async (formData: InterimCommonApproval) => {
    const form = await superValidate(formData, zod(_terminationCommonApproval))

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addTerminationApproverApproval(form.data as InterimCommonApproval)

        return { response }
    }
}

export const _submitInterimDate = async (formData: InterimDateApllication) => {
    const form = await superValidate(formData, zod(_interimDate))
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentInterimServices.editInterimDate(form.data as InterimDateApllication)

        return { response }
    }
}
export const _submitReferenceNumber = async (formData: InterimReferenceNumber) => {
    const form = await superValidate(formData, zod(_referenceNumber))
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentInterimServices.editReferenceNumber(form.data as InterimReferenceNumber)

        return { response }
    }
}





const getLookup = async () => {
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

        const positionAndGradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionCode(positionLookupResponse)

    // -------------------------------------------------------

    const columnLabel = [
        { name: 'Perkara' },
        { name: 'Status (Ada/Tidak Ada)' },
        { name: 'Semakan Urus Setia' },
    ];// -------------------------------------------------------
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: "name",
        orderType: 0,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            role: null,
            grade: null,
            position: null,
        },
    }
    const supporterApproverResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(suppAppResponse);

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverKP(
        supporterApproverResponse,
    );
    return {
        placementLookup,
        positionAndGradeLookup,
        supporterApproverLookup,
        columnLabel,
    }
}