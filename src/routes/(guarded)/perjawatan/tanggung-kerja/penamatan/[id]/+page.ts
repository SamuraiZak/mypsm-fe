import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant'
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { InterimCommonApproval } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-common-approval.dto.js';
import type { EmployeeInterimApplicationDetailRequestDTO } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto';
import type { InterimTermination, TerminationApproval, TerminationSuppApp, TerminationVerify } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-termination.dto';
import { _terminationCommonApproval, _terminationSuppApp } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentInterimServices } from '$lib/services/implementation/mypsm/perjawatan/employment-interim.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);
    const interimId: EmployeeInterimApplicationDetailRequestDTO = {
        interimId: Number(params.id)
    }
    let lookup = await getLookup();
    let terminationDetail = {} as InterimTermination;
    let secretaryDetail: TerminationVerify = {
        name: "",
        status: "",
        remark: "",
        statusDescription: "",
    }

    const secretaryApprovalForm = await superValidate(zod(_terminationCommonApproval));
    const suppAppForm = await superValidate(zod(_terminationSuppApp));
    const supporterApprovalForm = await superValidate(zod(_terminationCommonApproval));
    const approverApprovalForm = await superValidate(zod(_terminationCommonApproval));

    const terminationDetaiLResponse: CommonResponseDTO =
        await EmploymentInterimServices.getTerminationDetail(interimId)
    terminationDetail =
        terminationDetaiLResponse.data?.details as InterimTermination;
    if (terminationDetail.verify !== null) {
        secretaryDetail = terminationDetail.verify;
    }
    if (terminationDetail.supportApprover !== null) {
        suppAppForm.data = terminationDetail.supportApprover;
    }
    if (terminationDetail.support !== null) {
        supporterApprovalForm.data = terminationDetail.support
    }
    if (terminationDetail.approval !== null) {
        approverApprovalForm.data = terminationDetail.approval
    }

    return {
        currentRoleCode,
        interimId,
        lookup,
        terminationDetail,
        secretaryApprovalForm,
        secretaryDetail,
        suppAppForm,
        supporterApprovalForm,
        approverApprovalForm,
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
        const {name, ...tempObj} = form.data;
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addTerminationSupporterApproval(tempObj as InterimCommonApproval)

        return { response }
    }
}
export const _submitApproverApproval = async (formData: InterimCommonApproval) => {
    const form = await superValidate(formData, zod(_terminationCommonApproval))

    if (form.valid) {
        const {name, ...tempObj} = form.data;
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addTerminationApproverApproval(tempObj as InterimCommonApproval)

        return { response }
    }
}



const getLookup = async () => {
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(gradeLookupResponse);
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(positionLookupResponse)
    // -------------------------------------------------------
    const departmentLookupResponse: CommonResponseDTO =
        await LookupServices.getDepartmentEnums();

    const departmentLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(departmentLookupResponse)
    // -------------------------------------------------------

    const columnLabel = [
        { name: 'Perkara' },
        { name: 'Status (Ada/Tidak Ada)' },
        { name: 'Semakan Urus Setia' },
    ];// -------------------------------------------------------
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

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverKP(
        supporterApproverResponse,
    );
    return {

        gradeLookup,
        placementLookup,
        positionLookup,
        departmentLookup,
        supporterApproverLookup,
        columnLabel,
    }
}