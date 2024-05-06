import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { Academic, academicRequestDTO, academicResponseDTO, editAcademicRequestDTO } from '$lib/dto/mypsm/profile/academic-detail.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _academicEditRequestSchema,
    _academicInfoSchema, _academicListRequestSchema, _academicListResponseSchema,
    _activityEditRequestSchema,
    _activityInfoSchema,
    _activityListRequestSchema,
    _activityListResponseSchema,
    _dependencyEditRequestSchema,
    _dependencyListRequestSchema,
    _dependencyListResponseSchema,
    _diseaseInfoCollectionSchema,
    _diseaseInfoCollectionSchemaRequest,
    _experienceEditRequestSchema,
    _experienceInfoSchema,
    _experienceListRequestSchema,
    _experienceListResponseSchema,
    _familyEditRequestSchema,
    _familyListRequestSchema,
    _familyListResponseSchema,
    _generalAssessmentListRequestSchema,
    _generalAssessmentListResponseSchema,
    _medicalAssessmentListResponseSchema,
    _nextOfKinEditRequestSchema,
    _nextOfKinListRequestSchema,
    _nextOfKinListResponseSchema,
    _personalInfoRequestSchema,
    _personalInfoResponseSchema,
    _relationsSchema,
    _serviceDetailSchema,
    _serviceInfoRequestSchema,
    _serviceInfoResponseSchema,
    type DiseaseInfoDTO,
} from '$lib/schemas/mypsm/profile/profile-schemas';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ProfileServices } from '$lib/services/implementation/mypsm/profile/profile.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { Experience, experiencesEditRequestDTO, experiencesRequestDTO, experiencesResponseDTO } from '$lib/dto/mypsm/profile/experience-detail.dto';
import type { Activity, activityRequestDTO, activityResponseDTO } from '$lib/dto/mypsm/profile/activity-detail.dto';
import type { Dependency, Family, NextOfKin, dependencResponseDTO, dependencyEditRequestDTO, dependencyRequestDTO, familyRequestDTO, familyResponseDTO, nextOfKinEditRequestDTO, nextOfKinRequestDTO, nextOfKinResponseDTO } from '$lib/dto/mypsm/profile/relation-detail.dto';
import type { CandidatePersonalRequestDTO, CandidatePersonalResponseDTO } from '$lib/dto/mypsm/profile/personal-detail.dto';
import type { serviceRequestDTO, serviceResponseDTO } from '$lib/dto/mypsm/profile/service-detail.dto';
import type { diseaseInfoDTO, medicalAssessmentRequestDTO, medicalAssessmentResponseDTO } from '$lib/dto/mypsm/profile/medical-assessment.dto';
import type { generalAssessmentRequestDTO, generalAssessmentResponseDTO } from '$lib/dto/mypsm/profile/general-assessment.dto';
import type { MedicalDiseaseListDTO } from '$lib/dto/mypsm/profile/medical-disease-list.dto';
import type { GetMedicalHistoryResponseDTO, MedicalHistoryItem } from '$lib/dto/mypsm/profile/medical-history.dto';
import { invalidateAll } from '$app/navigation';



// schema for history Medical





export async function load({ }) {


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
// ===================================================================================================================

const relationshipIsFamilyRequest: CommonListRequestDTO = {
    pageNum: 1,
    pageSize: 350,
    orderBy: null,
    orderType: 0,
    filter: {
        code: "",
        description: "",
        isFamily: true
    },
}
const relationshipIsFamilyResponse: CommonResponseDTO =
    await LookupServices.getRelationshipFamily(relationshipIsFamilyRequest);
const relationshipIsFamily: DropdownDTO[] = LookupServices.setSelectOptions(
    relationshipIsFamilyResponse,
)
const relationshipIsNonFamilyRequest: CommonListRequestDTO = {
    pageNum: 1,
    pageSize: 350,
    orderBy: null,
    orderType: 0,
    filter: {
        code: "",
        description: "",
        isFamily: false
    },
}
const relationshipIsNonFamilyResponse: CommonResponseDTO =
    await
    LookupServices.getRelationshipFamily(relationshipIsNonFamilyRequest);
    const relationshipIsNonFamily: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipIsNonFamilyResponse,
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
        LookupServices.setSelectOptionsValueIsDescription(assetDeclarationLookupResponse);

    // ===========================================================================

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(gradeLookupResponse);

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
        LookupServices.setSelectOptionsValueIsDescription(
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

    // ==========================================================================
    // End Lookup Functions


    // ==========================================================================
    // ========================== Salary Tab Table ==============================
    // ==========================================================================
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

    const medicalGeneralResponse: CommonResponseDTO =
        await ProfileServices.getProfileGeneralAssessmentDetails();

    const medicalDiseaseList: CommonResponseDTO =
        await ProfileServices.getProfileMedicalDiseases();

    const diseaseList: MedicalDiseaseListDTO =
        await medicalDiseaseList.data?.details as MedicalDiseaseListDTO;

    const personalDetail = await superValidate(personalDetailResponse.data?.details as CandidatePersonalResponseDTO, zod(
        _personalInfoResponseSchema), {errors: false})
        ;

    const serviceInfoForm = await superValidate(serviceDetailResponse.data?.details as serviceResponseDTO, zod(
        _serviceInfoResponseSchema), {errors: false})
        ;

    const academicInfoForm = await superValidate(academicInfoResponse.data?.details as academicResponseDTO, zod(
        _academicListResponseSchema), {errors: false})
        ;

    const experienceInfoForm = await superValidate(experienceInfoResponse.data?.details as experiencesResponseDTO, zod(
        _experienceListResponseSchema), {errors: false})
        ;

    const activityInfoForm = await superValidate(activityInfoResponse.data?.details as activityResponseDTO, zod(
        _activityListResponseSchema), {errors: false})
        ;

    const relationInfoForm = await superValidate(relationInfoResponse.data?.details as dependencResponseDTO, zod(
        _dependencyListResponseSchema), {errors: false})
        ;

    const familyInfoForm = await superValidate(familyInfoResponse.data?.details as familyResponseDTO, zod(
        _familyListResponseSchema), {errors: false})
        ;

    const nextOFKInInfoForm = await superValidate(nextOfKinInfoResponse.data?.details as nextOfKinResponseDTO, zod(
        _nextOfKinListResponseSchema), {errors: false})
        ;
    const medicalHistoryForm = await superValidate(medicalHistoryResponse.data?.details as medicalAssessmentResponseDTO, zod(
        _diseaseInfoCollectionSchema), {errors: false})
        ;

    const medicalGeneralForm = await superValidate(medicalGeneralResponse.data?.details as generalAssessmentResponseDTO, zod(
        _generalAssessmentListResponseSchema), {errors: false})
        ;

    // ========Modal===========
    const addAcademicModal = await superValidate(zod(_academicInfoSchema), {errors: false});
    const addExperienceModal = await superValidate((zod)(_experienceInfoSchema), {errors: false});
    const addActivityModal = await superValidate((zod)(_activityInfoSchema), {errors: false});
    const addFamilyModal = await superValidate((zod)(_relationsSchema), {errors: false});
    const addNonFamilyModal = await superValidate((zod)(_relationsSchema), {errors: false});
    const addNextOfKinModal = await superValidate((zod)(_relationsSchema), {errors: false});


    // ==========================================================================
    // ========================= Disease History ================================
    // ==========================================================================
    const diseaseCollectionForm = await superValidate(medicalHistoryResponse.data?.details as medicalAssessmentResponseDTO, zod(_diseaseInfoCollectionSchema) , {errors: false});

    // diseaseList.disease.forEach(element => {
    //     diseaseCollectionForm.data.medicalHistory.push({
    //         disease: element,
    //         isPersonal: true,
    //         isFamily: true,
    //         remark: "",
    //     })
    // });
    const medicalHistoryDetailForm = await superValidate(zod(_diseaseInfoCollectionSchema));

    let medicalHistoryFormRequest: medicalAssessmentRequestDTO = {
        medicalHistory: [],
    }


    // if (medicalHistoryResponse.data?.details.medicalHistory.length < 1) {

    //     diseaseList.disease.forEach(item => {
    //         let medicalDisease: diseaseInfoDTO = {
    //             id: undefined,
    //             disease: item,
    //             isPersonal: false,
    //             isFamily: false,
    //             remark: '',
    //         }

    //         medicalHistoryFormRequest.medicalHistory.push(medicalDisease);
    //     });

    // }
    // medicalHistoryForm.data.medicalHistory = medicalHistoryFormRequest.medicalHistory;

    // Correction
    let newMedicalHistoryResponse: GetMedicalHistoryResponseDTO = {
        medicalHistory: [],
    };

    if (medicalHistoryResponse.status == "success") {
        let tempData: GetMedicalHistoryResponseDTO = medicalHistoryResponse.data?.details as GetMedicalHistoryResponseDTO;

        tempData.medicalHistory.forEach(element => {
            const tempNewData: MedicalHistoryItem = {
                disease: element.diseases,
                diseases: element.diseases,
                isPersonal: element.isPersonal,
                isFamily: element.isFamily,
                remark: element.remark,
            }

            newMedicalHistoryResponse.medicalHistory.push(tempNewData);
        });
    }

    if (newMedicalHistoryResponse.medicalHistory.length < 1) {
        diseaseList.disease.forEach(item => {
            let medicalDisease: diseaseInfoDTO = {
                id: undefined,
                diseases: item,
                isPersonal: false,
                isFamily: false,
                remark: '',
            }

            medicalHistoryForm.data.medicalHistory.push(medicalDisease);


        });

        diseaseCollectionForm.data.medicalHistory = medicalHistoryForm.data.medicalHistory as DiseaseInfoDTO[];
    } else {
        medicalHistoryForm.data.medicalHistory = newMedicalHistoryResponse.medicalHistory as DiseaseInfoDTO[];

        diseaseCollectionForm.data.medicalHistory = newMedicalHistoryResponse.medicalHistory as DiseaseInfoDTO[]


    }

    // =============================================================
    // ==== new get medical history ===============================
    // ============================================================
    // TODO
    // Step 1: Get Medical History
    // Step 2: Create Medical history form (schema) _diseaseInfoCollectionSchemaRequest
    // Step 3: Load Medical History data into the Medical history form
    // Step 4: Return the form


    const personalMedicalHistoryResponse: CommonResponseDTO =
        await ProfileServices.getProfileHistoryMedicalDetails();


    const personalMedicalHistoryForm = await superValidate(personalMedicalHistoryResponse.data?.details as medicalAssessmentResponseDTO, zod(
        _diseaseInfoCollectionSchemaRequest), {errors: false})
        ;


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
        salaryViewResponse,
        salaryListParam,
        medicalGeneralForm,
        diseaseList,
        diseaseCollectionForm,
        personalMedicalHistoryForm,
        selectionOptions: {
            relationshipIsFamily,
            identityCardColorLookup,
            relationshipIsNonFamily,
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

// ================================================================
// ========== add Personal Info ====================================
// ================================================================
export const _personalInfoSubmit = async (formData: object) => {
    

    const personalInfoForm = await superValidate(formData, zod(_personalInfoRequestSchema));

    personalInfoForm.data.identityDocumentNumber = (formData as CandidatePersonalResponseDTO).identityCardNumber;
    personalInfoForm.data.employeeNumber = (formData as CandidatePersonalResponseDTO).employeeNumber;
    personalInfoForm.data.relationshipId = (formData as CandidatePersonalResponseDTO).relationDetail.relationshipId;

console.log(personalInfoForm)
    if (!personalInfoForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfilePersonalDetails(personalInfoForm.data as CandidatePersonalRequestDTO);

    return { response };
};


// ================================================================
// ==========  Add service Form ===================================
// ================================================================
export const _serviceInfoSubmit = async (formData: object) => {
    const serviceInfoForm = await superValidate(formData, (zod)(_serviceInfoRequestSchema));


    if (serviceInfoForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileServiceDetails(serviceInfoForm.data as serviceRequestDTO);
    return { response };
};

// ================================================================
// ========== Add Academic Form ===================================
// ================================================================
export const _submitAcademicForm = async (formData: object) => {
    const academicInfoform = await superValidate(formData, (zod)(_academicListRequestSchema));

    if (!academicInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileAcademicDetails(academicInfoform.data as academicRequestDTO);

    return { response };
};

// ================================================================
// ========== Edit Academic Form ==================================
// ================================================================
export const _submitEditAcademicForm = async (formData: object) => {

    // const modifiedIdBody = (formData as academicResponseDTO).academics.map((value) =>
    // (
    //     {
    //         id: value.educationId,
    //         name: value.name,
    //         majorId: value.majorId,
    //         minorId: value.minorId,
    //         countryId: value.countryId,
    //         institutionId: value.institutionId,
    //         educationLevelId: value.educationId,
    //         sponsorshipId: value.sponsorshipId,
    //         completionDate: value.completionDate,
    //         finalGrade: value.finalGrade,
    //         field: value.field,
    //     }
    // )
    // )
    // const modifiedRequest: editAcademicRequestDTO = {
    //     academics: modifiedIdBody
    // }

    const editAcademicInfoform = await superValidate(formData, (zod)(_academicEditRequestSchema));

    if (!editAcademicInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.editProfileAcademicDetails(editAcademicInfoform.data as editAcademicRequestDTO);

    return { response };
};

// ================================================================
// ========== Add Experieence Form ================================
// ================================================================
export const _submitExperienceForm = async (formData: object) => {


    const experienceInfoform = await superValidate(formData, (zod)(_experienceListRequestSchema));
    if (!experienceInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileExperienceDetails(experienceInfoform.data as experiencesRequestDTO);

    return { response };
};

// ================================================================
// ========== Edit Experience form ================================
// ================================================================
export const _submitEditExperienceForm = async (formData: object) => {
    const experienceInfoform = await superValidate(formData, (zod)(_experienceEditRequestSchema));
    if (!experienceInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.editProfileExperienceDetails(experienceInfoform.data as experiencesEditRequestDTO);

    return { response };
};


// ===============================================================
// ========== Add Activity      ===================================
// ===============================================================
export const _submitActivityForm = async (formData: object) => {
    const activityInfoform = await superValidate(formData, (zod)(_activityListRequestSchema));

    if (!activityInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileActivityDetails(activityInfoform.data as activityRequestDTO);

    return { response };
};

// ===============================================================
// ========== Edit Activity   ====================================
// ===============================================================
export const _submitEditActivityForm = async (formData: object) => {
    const activityInfoform = await superValidate(formData, (zod)(_activityEditRequestSchema));

    if (!activityInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.editProfileActivityDetails(activityInfoform.data as activityRequestDTO);

    return { response };
};

// ===============================================================
// ========== Add family Form ====================================
// ===============================================================

export const _submitFamilyForm = async (formData: object) => {
    const familyInfoform = await superValidate(formData, (zod)(_familyListRequestSchema));

    if (!familyInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileFamilyDetails(familyInfoform.data as familyRequestDTO);

    return { response };
};

// ===============================================================
// ========== Edit family Form====================================
// ===============================================================

export const _submitEditFamilyForm = async (formData: object) => {
    const familyInfoform = await superValidate(formData, (zod)(_familyEditRequestSchema));
    console.log(familyInfoform)
    if (!familyInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.editProfileFamilyDetails(familyInfoform.data as familyRequestDTO);

    return { response };
};

// ===============================================================
// ========== Add Dependency  ====================================
// ===============================================================

export const _submitDependencyForm = async (formData: object) => {
    const dependencyInfoform = await superValidate(formData, (zod)(_dependencyListRequestSchema));
    console.log(dependencyInfoform)

    if (!dependencyInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileDependentDetails(dependencyInfoform.data as dependencyRequestDTO);

    return { response };
};

// ===============================================================
// ========== Edit Dependency  ====================================
// ===============================================================

export const _submitEditDependencyForm = async (formData: object) => {
    const modifiedBody: object = {
        families: (formData as dependencResponseDTO).dependents
    }
    const dependencyInfoform = await superValidate(modifiedBody, (zod)(_dependencyEditRequestSchema));

    if (!dependencyInfoform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.editProfileDependentDetails(dependencyInfoform.data as dependencyEditRequestDTO);

    return { response };
};

// ================================================================
// ========== Add Next Of Kin ====================================
// ================================================================
export const _submitNextOfKinForm = async (formData: object) => {
    const nextOfKinform = await superValidate(formData, (zod)(_nextOfKinListRequestSchema));

    if (!nextOfKinform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileNextOfKinDetails(nextOfKinform.data as nextOfKinRequestDTO);

    return { response };
};

// ================================================================
// ========== Edit Next Of Kin ====================================
// ================================================================
export const _submitEditNextOfKinForm = async (formData: object) => {

    const modifiedBody: object = {
        families: (formData as nextOfKinResponseDTO).nextOfKins
    }
    const nextOfKinform = await superValidate(modifiedBody, (zod)(_nextOfKinEditRequestSchema));
    console.log(nextOfKinform)
    if (!nextOfKinform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.editProfileNextOfKinDetails(nextOfKinform.data as nextOfKinEditRequestDTO);

    return { response };
};

// ================================================================
// ==========  Medical List History================================
// ================================================================
export const _submitMedicalHistoryForm = async (formData: object) => {
    const historyMedicalform = await superValidate(formData, (zod)(_diseaseInfoCollectionSchema));

    let tempMedicalHistoryForm: medicalAssessmentRequestDTO = {
        medicalHistory: []
    }

    let tempDiseaseInfoList: diseaseInfoDTO[] = [];

    if (historyMedicalform.valid) {
        const response: CommonResponseDTO =
            await ProfileServices.addProfileMedicalAssessmentDetails(historyMedicalform.data as medicalAssessmentRequestDTO);

        if (response.status == "success") {

            const newMedicalHistoryResponse: CommonResponseDTO = await ProfileServices.getProfileHistoryMedicalDetails();

            if (newMedicalHistoryResponse.status == "success") {
                tempMedicalHistoryForm = newMedicalHistoryResponse.data?.details as medicalAssessmentRequestDTO;
            }

            invalidateAll();
        }



        return { response, tempMedicalHistoryForm };
    } else {
        getErrorToast("not valid");
        error(400, { message: 'Validation Not Passed!' });
    }

    // if (!historyMedicalform.valid) {
    //     getErrorToast();
    //     error(400, { message: 'Validation Not Passed!' });
    // }

    // const response: CommonResponseDTO =
    //     await ProfileServices.addProfileMedicalAssessmentDetails(historyMedicalform.data as medicalAssessmentRequestDTO);

};

// ================================================================
// ========== Edit Medical general ================================
// ================================================================
export const _submitGeneralMedicalForm = async (formData: object) => {
    const generalMedicalform = await superValidate(formData, (zod)(_generalAssessmentListRequestSchema));

    if (!generalMedicalform.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ProfileServices.addProfileGeneralAssessmentDetails(generalMedicalform.data as generalAssessmentRequestDTO);

    return { response };
};

// ================================================================
// ========== Modal Form ==========================================
// ================================================================

export const _submitAcademicInfoForm = async (formData: Academic[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: academicRequestDTO = {
        academics: formData,
    };


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
        families: formData,
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
        families: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileDependentDetails(
            requestData as dependencyRequestDTO,
        );

    return { response };
};

export async function _submitNextOfKinInfoForm(formData: NextOfKin[]) {
    if (formData.length < 1) {
        getErrorToast();
        // return fail(400);
    }
    const requestData: nextOfKinRequestDTO = {
        families: formData,
    };

    const response: CommonResponseDTO =
        await ProfileServices.addProfileNextOfKinDetails(
            requestData as nextOfKinRequestDTO,
        );

        // if response status == success
        // get new nextOfKinInfoResponse.data
        const nextOfKinInfoResponse: CommonResponseDTO =
        await ProfileServices.getProfileNextOfKinDetails();

        // if success fit nextOfKinInfoResponse.data into nextOFKInInfoForm
        const nextOFKInInfoForm = await superValidate(nextOfKinInfoResponse.data?.details as nextOfKinResponseDTO, zod(
            _nextOfKinListResponseSchema))
            ;

        console.log("Holifield di sini");

        // return nextOFKInInfoForm
        return {
                response,
                nextOFKInInfoForm,
        }
        

    // return { response };
};
// ==================== end Modal==================================



// ================================================================
// ========== new Medical List=====================================
// ================================================================
export const _submitPersonalMedicalHistoryForm = async (formData: object) => {
    const perosnalHistoryMedicalform = await superValidate(formData, (zod)(_diseaseInfoCollectionSchema));

    let tempMedicalHistoryForm: medicalAssessmentRequestDTO = {
        medicalHistory: []
    }

    let tempDiseaseInfoList: diseaseInfoDTO[] = [];

    if (perosnalHistoryMedicalform.valid) {
        const response: CommonResponseDTO =
            await ProfileServices.addProfileMedicalAssessmentDetails(perosnalHistoryMedicalform.data as medicalAssessmentRequestDTO);

        if (response.status == "success") {

            const newMedicalHistoryResponse: CommonResponseDTO = await ProfileServices.getProfileHistoryMedicalDetails();

            if (newMedicalHistoryResponse.status == "success") {
                tempMedicalHistoryForm = newMedicalHistoryResponse.data?.details as medicalAssessmentRequestDTO;
            }
        }

        return { response, tempMedicalHistoryForm };
    } else {
        getErrorToast("not valid");
        error(400, { message: 'Validation Not Passed!' });
    }

};