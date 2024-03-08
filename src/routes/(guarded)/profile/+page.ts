import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { Academic, academicRequestDTO, academicResponseDTO } from '$lib/dto/mypsm/profile/academic-detail.dto';
import type { profileIDRequestBody } from '$lib/dto/mypsm/profile/profile-employeeid-request.view-dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _academicInfoSchema, _academicListRequestSchema, _academicListResponseSchema,
    _activityInfoSchema,
    _activityListRequestSchema,
    _activityListResponseSchema,
    _dependencyListRequestSchema,
    _dependencyListResponseSchema,
    _experienceInfoSchema,
    _experienceListRequestSchema,
    _experienceListResponseSchema,
    _familyListRequestSchema,
    _familyListResponseSchema,
    _medicalAssessmentListResponseSchema,
    _nextOfKinListRequestSchema,
    _nextOfKinListResponseSchema,
    _personalInfoRequestSchema,
    _personalInfoResponseSchema,
    _relationsSchema,
    _serviceDetailSchema,
    _serviceInfoRequestSchema,
    _serviceInfoResponseSchema,
} from '$lib/schemas/mypsm/profile/profile-schemas';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { ProfileServices } from '$lib/services/implementation/mypsm/profile/profile.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { Experience, experiencesRequestDTO, experiencesResponseDTO } from '$lib/dto/mypsm/profile/experience-detail.dto';
import type { Activity, activityRequestDTO, activityResponseDTO } from '$lib/dto/mypsm/profile/activity-detail.dto';
import type { Dependency, Family, NextOfKin, dependencResponseDTO, dependencyRequestDTO, familyRequestDTO, familyResponseDTO, nextOfKinRequestDTO, nextOfKinResponseDTO } from '$lib/dto/mypsm/profile/relation-detail.dto';
import type { CandidatePersonalRequestDTO, CandidatePersonalResponseDTO } from '$lib/dto/mypsm/profile/personal-detail.dto';
import type { serviceRequestDTO, serviceResponseDTO } from '$lib/dto/mypsm/profile/service-detail.dto';
import type { medicalAssessmentResponseDTO } from '$lib/dto/mypsm/profile/medical-assessment.dto';



// export const load = async () => {

//     return {salaryViewTable}
// };


export async function load({ }) {

    // const salaryFilter: CommonFilterDTO = {
    //     examType: 1,
    //  };
    const salaryListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: 1,
        filter: {},
    }
    let salaryViewResponse: CommonResponseDTO;
    let salaryViewTable = [];

    salaryViewResponse = await ProfileServices.getSalaryListDetails(salaryListParam);
    salaryViewTable = salaryViewResponse.data?.dataList ?? [];


    //==================================================
    //=============== Load Function ====================
    //==================================================

    const personalDetailResponse: CommonResponseDTO =
        await ProfileServices.getProfilePersonalDetails();

    const serviceDetailResponse: CommonResponseDTO =
        await ProfileServices.getProfileServiceDetails();

    const academicInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileAcademicDetails();

    const experienceInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileExperienceDetails();

    const activityInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileActivityDetails();

    const familyInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileFamilyDetails();

    const relationInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileDependentDetails();

    const nextOfKinInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileNextOfKinDetails();

    const medicalHistoryResponse: CommonResponseDTO =
        await ProfileServices.getProfileMedicalAssessmentDetails();



    const personalDetail = await superValidate(personalDetailResponse.data?.details as CandidatePersonalResponseDTO, zod(
        _personalInfoResponseSchema))
        ;
    const serviceInfoForm = await superValidate(serviceDetailResponse.data?.details as serviceResponseDTO, zod(
        _serviceInfoResponseSchema))
        ;

    const academicInfoForm = await superValidate(academicInfoResponse.data?.details as academicResponseDTO, zod(
        _academicListResponseSchema))
        ;

    const experienceInfoForm = await superValidate(experienceInfoResponse.data?.details as experiencesResponseDTO, zod(
        _experienceListResponseSchema))
        ;

    const activityInfoForm = await superValidate(activityInfoResponse.data?.details as activityResponseDTO, zod(
        _activityListResponseSchema))
        ;

    const relationInfoForm = await superValidate(relationInfoResponse.data?.details as dependencResponseDTO, zod(
        _dependencyListResponseSchema))
        ;

    const familyInfoForm = await superValidate(familyInfoResponse.data?.details as familyResponseDTO, zod(
        _familyListResponseSchema))
        ;

    const nextOFKInInfoForm = await superValidate(nextOfKinInfoResponse.data?.details as nextOfKinResponseDTO, zod(
        _nextOfKinListResponseSchema))
        ;
    const medicalHistoryForm = await superValidate(medicalHistoryResponse.data?.details as medicalAssessmentResponseDTO, zod(
        _medicalAssessmentListResponseSchema))
        ;


    const addAcademicModal = await superValidate(zod(_academicInfoSchema));
    const addExperienceModal = await superValidate((zod)(_experienceInfoSchema));
    const addActivityModal = await superValidate((zod)(_activityInfoSchema));
    const addFamilyModal = await superValidate((zod)(_relationsSchema));
    const addNonFamilyModal = await superValidate((zod)(_relationsSchema));
    const addNextOfKinModal = await superValidate((zod)(_relationsSchema));

    // fetch apc history
    const response: CommonResponseDTO =
        await ProfileServices.getProfilePersonalDetails();

    const relationFilter: CommonFilterDTO = {
        program: 'SEMUA',
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
    }

    // get employee list for hubungan with user
    const relationParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: relationFilter,
    };

    // const employeeRelationResponse: CommonResponseDTO =
    //     await EmployeeServices.getEmployeeList(relationParam);

    // const employeeLookup: DropdownDTO[] = (
    //     employeeRelationResponse.data?.dataList as CommonEmployeeDTO[]
    // ).map((data) => ({
    //     value: data.employeeId,
    //     name: data.name,
    // }));


    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const identityCardColorLookupResponse: CommonResponseDTO =
        await LookupServices.getICTypeEnums();

    const identityCardColorLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            identityCardColorLookupResponse,
        );

    // ===========================================================================

    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse);

    // ===========================================================================

    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);

    // ===========================================================================

    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );

    // ===========================================================================

    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        nationalityLookupResponse,
    );

    // ===========================================================================

    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse);

    // ===========================================================================

    const ethnicityLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicityLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        ethnicityLookupResponse,
    );

    // ===========================================================================

    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        religionLookupResponse,
    );

    // ===========================================================================

    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);

    // ===========================================================================

    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        maritalLookupResponse,
    );

    // ===========================================================================

    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        positionLookupResponse,
    );

    // ===========================================================================

    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );

    // ===========================================================================

    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );

    // ===========================================================================

    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );

    // ===========================================================================

    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );

    // ===========================================================================

    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );

    // ===========================================================================

    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(titleLookupResponse);

    // ===========================================================================

    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);

    // ===========================================================================

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsNameIsCode(gradeLookupResponse);

    // ===========================================================================

    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );

    // ===========================================================================

    const serviceGroupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const serviceGroupLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceGroupLookupResponse,
    );

    // ===========================================================================

    const unitLookupResponse: CommonResponseDTO =
        await LookupServices.getUnitEnums();

    const unitLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(unitLookupResponse);

    // ===========================================================================

    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceTypeLookupResponse,
    );

    // ===========================================================================

    const retirementBenefitLookupResponse: CommonResponseDTO =
        await LookupServices.getRetirementTypeEnums();

    const retirementBenefitLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            retirementBenefitLookupResponse,
        );

    // ===========================================================================

    const generalLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];


    // ============================================================
    // Superformed the data
    // ============================================================
    return {
        personalDetail,
        serviceInfoForm,
        academicInfoForm,
        experienceInfoForm,
        activityInfoForm,
        relationInfoForm,
        nextOFKInInfoForm,
        familyInfoForm,
        addAcademicModal,
        addExperienceModal,
        addActivityModal,
        addFamilyModal,
        addNonFamilyModal,
        addNextOfKinModal,
        medicalHistoryForm,
        salaryViewTable,
        salaryListParam,
        selectionOptions: {
            identityCardColorLookup,
            cityLookup,
            stateLookup,
            countryLookup,
            nationalityLookup,
            raceLookup,
            ethnicityLookup,
            religionLookup,
            genderLookup,
            maritalLookup,
            positionLookup,
            relationshipLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
            titleLookup,
            generalLookup,
            // employeeLookup,
            assetDeclarationLookup,
            gradeLookup,
            placementLookup,
            serviceGroupLookup,
            unitLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
        },
    }
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _personalInfoSubmit = async (formData: object) => {
    const personalInfoForm = await superValidate(formData, zod(_personalInfoRequestSchema));

    if (!personalInfoForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    // const modifiedForm = {
    //     id: form.data.id,
    //     examTypeId: form.data.examTypeId,
    //     examTitle: form.data.examTitle,
    //     startDate: form.data.startDate.toISOString().split('T')[0],
    //     endDate: form.data.endDate.toISOString().split('T')[0],
    //     examDate: form.data.examDate.toISOString().split('T')[0],
    //     examLocation: form.data.examLocation,
    // }; 

    const response: CommonResponseDTO =
        await ProfileServices.addProfilePersonalDetails(personalInfoForm.data as CandidatePersonalRequestDTO);

    return { response };
};


// ===============================================================

export const _serviceInfoSubmit = async (formData: object) => {
    const serviceInfoForm = await superValidate(formData,(zod)(_serviceInfoRequestSchema));
   
    if (serviceInfoForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
            }

            const response: CommonResponseDTO =
            await ProfileServices.addProfileServiceDetails(serviceInfoForm.data as serviceRequestDTO);
    }


export const _submitAcademicForm = async (formData: object) => {
    const academicInfoform = await superValidate(formData, (zod)(_academicListRequestSchema));

    if (!academicInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    console.log(academicInfoform)
    if (academicInfoform.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(academicInfoform),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (academicInfoform.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }

    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidateAcademicDetails(
    //         form.data as CandidateAcademicDetailRequestDTO,
    //     );

    // return { response };
};

export const _submitExperienceForm = async (formData: object) => {
    const experienceInfoform = await superValidate(formData, (zod)(_experienceListRequestSchema));

    if (!experienceInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    console.log(experienceInfoform)
    if (experienceInfoform.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(experienceInfoform),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (experienceInfoform.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }

    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidateExperienceDetails(
    //         form.data as CandidateExperiencesDetailRequestDTO,
    //     );

    // return { response };
};

export const _submitActivityForm = async (formData: object) => {
    const activityInfoform = await superValidate(formData, (zod)(_activityListRequestSchema));

    if (!activityInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    console.log(activityInfoform)
    if (activityInfoform.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(activityInfoform),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (activityInfoform.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }

    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidateActivityDetails(
    //         form.data as CandidateActivityDetailRequestDTO,
    //     );

    // return { response };
};

export const _submitFamilyForm = async (formData: object) => {
    const familyInfoform = await superValidate(formData, (zod)(_familyListRequestSchema));

    if (!familyInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    console.log(familyInfoform)
    if (familyInfoform.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(familyInfoform),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (familyInfoform.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidateFamilyDetails(
    //         form.data as CandidateFamilyDetailRequestDTO,
    //     );

    // return { response };
};

export const _submitDependencyForm = async (formData: object) => {
    const dependencyInfoform = await superValidate(formData, (zod)(_dependencyListRequestSchema));

    if (!dependencyInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    console.log(dependencyInfoform)
    if (dependencyInfoform.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(dependencyInfoform),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (dependencyInfoform.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }

    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidateDependenciesDetails(
    //         form.data as CandidateDependenciesDetailRequestDTO,
    //     );

    // return { response };
};

export const _submitNextOfKinForm = async (formData: object) => {
    const nextOfKinform = await superValidate(formData, (zod)(_nextOfKinListRequestSchema));

    if (!nextOfKinform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    console.log(nextOfKinform)
    if (nextOfKinform.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(nextOfKinform),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (nextOfKinform.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }

    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidateNextOfKinDetails(
    //         form.data as CandidateNextOfKinDetailRequestDTO,
    //     );

    // return { response };
};

// submit array modal functions
export const _submitAcademicInfoForm = async (formData: Academic[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: academicRequestDTO = {
        academics: formData,
    };

    console.log(requestData);

    const response: CommonResponseDTO =
        await ProfileServices.addProfileAcademicDetails(
            requestData as academicRequestDTO,
        );

    return { response };
};

export const _submitExperienceInfoForm = async (formData: Experience[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: experiencesRequestDTO = {
        experiences: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileExperienceDetails(
            requestData as experiencesRequestDTO,
        );

    return { response };
};

export const _submitActivityInfoForm = async (formData: Activity[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: activityRequestDTO = {
        activities: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileActivityDetails(
            requestData as activityRequestDTO,
        );

    return { response };
};

export const _submitFamilyInfoForm = async (formData: Family[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: familyRequestDTO = {
        dependencies: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileFamilyDetails(
            requestData as familyRequestDTO,
        );

    return { response };
};

export const _submitDependencyInfoForm = async (formData: Dependency[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: dependencyRequestDTO = {
        dependencies: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileDependentDetails(
            requestData as dependencyRequestDTO,
        );

    return { response };
};

export const _submitNextOfKinInfoForm = async (formData: NextOfKin[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: nextOfKinRequestDTO = {
        nextOfKins: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileNextOfKinDetails(
            requestData as nextOfKinRequestDTO,
        );

    return { response };
};


