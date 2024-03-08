import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CandidateIDRequestBody } from "$lib/dto/core/common/candidate-id-request.view-dto.js";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { AddNewContractEmployeeAcademicDTO, ContractAcademic } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto.js";
import type { AddNewContractEmployeeActivityDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto.js";
import type { AddNewContractEmployeeDependencyDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto.js";
import type { AddNewContractEmployeeExperienceDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto.js";
import type { AddContractNextOfKinDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-next-of-kin.dto.js";
import type { EditNewContractEmployeeDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto.js";
import type { EditContractDetailSecretaryDTO } from "$lib/dto/mypsm/kakitangan-kontrak/update-contract-detail-secretary.dto.js";
import type { ContractCommonRoleResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/update-contract-secretary-result.dto.js";
import { getErrorToast } from "$lib/helpers/core/toast.helper";
import { _addContractAcademicSchema, _addContractActivitySchema, _addContractCommonRoleResult, _addContractExperienceSchema, _addContractSecretaryUpdate, _commonContractDependencySchema, _contractAcademicSchema, _editNewContractEmployeeSchema, _uploadDocSchema } from "$lib/schemas/mypsm/contract-employee/contract-employee-schemas.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { error } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ params }) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);

    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    };

    // const academicDetailContract: CommonResponseDTO =
    //     await ContractEmployeeServices.getContractAcademicDetail(contractId);

    //form validation
    const editNewContractEmployeeDetailForm = await superValidate(zod(_editNewContractEmployeeSchema));
    const academicDetailForm = await superValidate(zod(_addContractAcademicSchema));
    const experienceDetailForm = await superValidate(zod(_addContractExperienceSchema));
    const activityDetailForm = await superValidate(zod(_addContractActivitySchema));
    const familyDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const dependantDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const nextOfKinDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const updateContractDetailForm = await superValidate(zod(_addContractSecretaryUpdate));
    const secretaryContractResultForm = await superValidate(zod(_addContractCommonRoleResult));

    ;
    // const academicDetailForm = await superValidate(
    //     academicDetailContract.data
    //         ?.details as AddNewContractEmployeeAcademicDTO,
    //     _contractAcademicSchema,
    // );
    const contractUploadDocumentForm = await superValidate(zod(_uploadDocSchema));


    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);
    // -------------------------------------------------------
    const identityCardTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getIdentityCardColor();

    const identityCardTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(identityCardTypeLookupResponse)
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse)
    // -------------------------------------------------------
    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(nationalityLookupResponse)
    // -------------------------------------------------------
    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse)
    // -------------------------------------------------------
    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(titleLookupResponse);
    // -------------------------------------------------------
    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(maritalLookupResponse)
    // -------------------------------------------------------
    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(religionLookupResponse)
    // -------------------------------------------------------
    const ethnicLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(ethnicLookupResponse)
    // -------------------------------------------------------
    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );
    // -------------------------------------------------------
    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);
    // -------------------------------------------------------
    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );
    // -------------------------------------------------------
    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);
    // -------------------------------------------------------
    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );
    // -------------------------------------------------------
    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );
    // -------------------------------------------------------
    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );
    // -------------------------------------------------------
    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptionsValueIsDescription(
        positionLookupResponse,
    );
    // -------------------------------------------------------
    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceTypeLookupResponse,
    );
    return {
        currentRoleCode,
        contractId,
        editNewContractEmployeeDetailForm,
        contractUploadDocumentForm,
        academicDetailForm,
        experienceDetailForm,
        activityDetailForm,
        familyDetailForm,
        dependantDetailForm,
        nextOfKinDetailForm,
        updateContractDetailForm,
        secretaryContractResultForm,
        selectOption: {
            genderLookup,
            identityCardTypeLookup,
            nationalityLookup,
            raceLookup,
            maritalLookup,
            religionLookup,
            stateLookup,
            ethnicLookup,
            relationshipLookup,
            countryLookup,
            titleLookup,
            cityLookup,
            assetDeclarationLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
            placementLookup,
            positionLookup,
            serviceTypeLookup,
        }
    }
}

export const _submitEditNewContractEmployeeDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_editNewContractEmployeeSchema));
    console.log(form)
    if (form.valid) {

        form.data.birthDate = form.data.birthDate.toISOString().split('T')[0];
        form.data.propertyDeclarationDate = form.data.propertyDeclarationDate.toISOString().split('T')[0];
        const response: CommonResponseDTO =
            await ContractEmployeeServices.editNewContractEmployeeDetail(
                form.data as EditNewContractEmployeeDetailDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

export const _submitAcademicDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractAcademicSchema));

    if (form.valid) {
        const tempFormData: AddNewContractEmployeeAcademicDTO = {
            academics: [form.data],
        }
        tempFormData.academics.map((x) => x.completionDate = x.completionDate.toISOString().split('T')[0])
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeAcademic(
                tempFormData as AddNewContractEmployeeAcademicDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

export const _submitExperienceDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractExperienceSchema));

    if (form.valid) {
        const tempFormData: AddNewContractEmployeeExperienceDTO = {
            experiences: [form.data],
        }
        tempFormData.experiences.map((x) => x.startDate = x.startDate.toISOString().split('T')[0])
        tempFormData.experiences.map((x) => x.endDate = x.endDate.toISOString().split('T')[0])
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeExperience(
                tempFormData as AddNewContractEmployeeExperienceDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
export const _submitActivityDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractActivitySchema));

    if (form.valid) {
        const tempFormData: AddNewContractEmployeeActivityDTO = {
            activities: [form.data],
        }
        tempFormData.activities.map((x) => x.joinDate = x.joinDate.toISOString().split('T')[0])
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeActivity(
                tempFormData as AddNewContractEmployeeActivityDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
export const _submitFamilyDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_commonContractDependencySchema));

    if (form.valid) {
        const tempFormData: AddNewContractEmployeeDependencyDTO = {
            dependencies: [form.data],
        }
        tempFormData.dependencies.map((x) => x.birthDate = x.birthDate.toISOString().split('T')[0])
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeFamily(
                tempFormData as AddNewContractEmployeeDependencyDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

export const _submitDependantDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_commonContractDependencySchema));

    if (form.valid) {
        const tempFormData: AddNewContractEmployeeDependencyDTO = {
            dependencies: [form.data],
        }
        tempFormData.dependencies.map((x) => x.birthDate = x.birthDate.toISOString().split('T')[0])
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeDependency(
                tempFormData as AddNewContractEmployeeDependencyDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
export const _submitNextOfKinForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_commonContractDependencySchema));

    if (form.valid) {
        const tempFormData: AddContractNextOfKinDTO = {
            nextOfKins: [form.data],
        }
        tempFormData.nextOfKins.map((x) => x.birthDate = x.birthDate.toISOString().split('T')[0])
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeNextOfKin(
                tempFormData as AddContractNextOfKinDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

// export const _submitDocumentForm = async (file: object) => {
//     const form = await superValidate(file,zod(_uploadDocSchema));
//     const documentData = new FormData();

//     documentData.append('document', file as File);
//     console.log(documentData)
//     if (!form.valid) {
//         getErrorToast();
//         error(400, { message: 'Validation Not Passed!' });
//     } else if (form.valid) {
//         const response: CommonResponseDTO =
//             await ContractEmployeeServices.addNewContractEmployeeDocument(form.data.document);
//         return { response };
//     }

// };
export const _submitDocumentForm = async (file: File | null | undefined) => {
    const documentData = new FormData();
    documentData.append('document', file as File);
    const form = await superValidate(documentData, zod(_uploadDocSchema));
    console.log(documentData)
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    } else if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeDocument(documentData);
        return { response };
    }

};

export const _submitUpdateContractDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractSecretaryUpdate));
    console.log(form)
    if (form.valid) {
        form.data.startContract = form.data.startContract.toISOString().split('T')[0];
        form.data.endContract = form.data.endContract.toISOString().split('T')[0];
        form.data.reportDutyDate = form.data.reportDutyDate.toISOString().split('T')[0];
        form.data.effectiveDate = form.data.effectiveDate.toISOString().split('T')[0];
        form.data.civilServiceStartDate = form.data.civilServiceStartDate.toISOString().split('T')[0];
        form.data.lkimServiceStartDate = form.data.lkimServiceStartDate.toISOString().split('T')[0];
        form.data.currentServiceStartDate = form.data.currentServiceStartDate.toISOString().split('T')[0];
        form.data.firstConfirmServiceDate = form.data.firstConfirmServiceDate.toISOString().split('T')[0];
        form.data.currentConfirmServiceDate = form.data.currentConfirmServiceDate.toISOString().split('T')[0];
        const response: CommonResponseDTO =
            await ContractEmployeeServices.updateContractDetail(
                form.data as EditContractDetailSecretaryDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

export const _submitSecretaryContractResultForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractSecretaryResult(
                form.data as ContractCommonRoleResultDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
