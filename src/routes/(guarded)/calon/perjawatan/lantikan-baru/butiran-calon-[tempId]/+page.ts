import {
    getErrorToast,
    getLoadingToast,
    getServerErrorToast,
    getSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type {
    Activity,
    CandidateActivityRequestBody,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-request.view-model.js';
import type {
    ActivityResponseData,
    NewHireActivity,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
import type { CandidateAcademiceDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-request.model';
import type {
    AcademicList,
    AcademicResponseData,
    CandidateAcademicDetailsResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-response.model.js';
import type {
    CandidateDependenciesDetailRequestBody,
    Dependency,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-request.model.js';
import type {
    CandidateDependenciesDetailResponse,
    DependenciesData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-response.model.js';
import type {
    CandidateExperienceDetailsRequestBody,
    Experience,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-request.model.js';
import type {
    CandidateExperienceDetailsResponse,
    ExperienceResponseData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-respone.model.js';
import type {
    CandidateFamilyDetailsRequestBody,
    Family,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-family-details-request.model.js';
import type {
    CandidateFamilyDetailsResponse,
    FamilyData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-family-details-response.model.js';
import type {
    CandidateNextOfKinDetailsRequestBody,
    NextOfKin,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-request.model.js';
import type {
    CandidateNextOfKinDetailsResponse,
    NextOfKinData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-response.model.js';
import type { CandidatePersonalDetailsRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-request.model';
import type {
    CandidatePersonalData,
    CandidatePersonalDetailsResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model.js';
import type { NewHireDocumentsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-document-response.view-model';
import type { NewHireSecretaryAddUpdateRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-add-update-request.model';
import type {
    NewHireSecretaryUpdateResponse,
    SecretaryUpdateData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-update-response.model.js';
import type { RequestSuccessBody } from '$lib/view-models/mypsm/request-success.view-model';
import { error, fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =========================================================================
// z validation schema and submit function for the calon lantikan baru form fields
// =========================================================================
const shortTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
const codeSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 1 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const dateSchema = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const minDateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });

const maxDateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
    });

const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

const numberSchema = z.coerce.number({
    required_error: 'Medan ini hendaklah diisi.',
    invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
});

const numberIdSchema = z.coerce.number({
    required_error: 'Tidak tepat.',
    invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
});

export const _personalInfoForm = z.object({
    name: shortTextSchema,
    alternativeName: codeSchema.default(' '),
    identityDocumentNumber: shortTextSchema,
    identityDocumentColor: codeSchema,
    email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
    propertyDeclarationDate: maxDateSchema,
    birthDate: maxDateSchema,
    birthStateId: numberIdSchema,
    birthCountryId: numberIdSchema,
    genderId: numberIdSchema,
    nationalityId: numberIdSchema,
    religionId: numberIdSchema,
    raceId: numberIdSchema,
    titleId: numberIdSchema,
    ethnicId: numberIdSchema,
    maritalId: numberIdSchema,
    assetDeclarationStatusId: numberIdSchema,
    homeAddress: shortTextSchema,
    homeCountryId: numberIdSchema,
    homeStateId: numberIdSchema,
    homeCityId: numberIdSchema,
    homePostcode: shortTextSchema,
    mailAddress: shortTextSchema,
    mailCountryId: numberIdSchema,
    mailStateId: numberIdSchema,
    mailCityId: numberIdSchema,
    mailPostcode: shortTextSchema,
    isExPoliceOrSoldier: booleanSchema,
    isInternalRelationship: booleanSchema,
    employeeNumber: z.string().nullish(),
    employeeName: z.string().nullable(),
    employeePosition: z.string().nullable(),
    relationshipId: numberIdSchema.nullish(),
});
// .superRefine(({ isInternalRelationship }, ctx) => {
//     if (isInternalRelationship) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Sila isi medan ini.',
//             path: [
//                 'employeeNumber',
//                 'employeeName',
//                 'employeePosition',
//                 'relationship',
//             ],
//         });
//     }
// });

//==========================================================
//================== Maklumat Akademik =====================
//==========================================================

export const _academicInfoSchema = z.object({
    // id: numberIdSchema,
    majorId: numberIdSchema,
    minorId: numberIdSchema,
    countryId: numberIdSchema,
    institutionId: numberIdSchema,
    educationLevelId: numberIdSchema,
    sponsorshipId: numberIdSchema,
    name: codeSchema,
    completionDate: maxDateSchema,
    finalGrade: codeSchema,
    field: shortTextSchema,
});

export const _academicListSchema = z.object({
    academicList: z.array(_academicInfoSchema),
    // isReadonly: z.boolean(),
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _experienceInfoSchema = z.object({
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: codeSchema,
    startDate: maxDateSchema,
    endDate: maxDateSchema,
    salary: z.coerce.number({
        invalid_type_error: 'Medan ini hendaklah ditetapkan dengan angka',
    }),
});

export const _experienceListSchema = z.object({
    experienceList: z.array(_experienceInfoSchema),
});

export const _activityInfoSchema = z.object({
    name: shortTextSchema,
    joinDate: maxDateSchema,
    position: shortTextSchema,
    description: longTextSchema,
});

export const _activityListSchema = z.object({
    activityList: z.array(_activityInfoSchema),
});

export const _familyInfoSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: codeSchema.default(' '),
    identityDocumentColor: codeSchema,
    identityDocumentNumber: shortTextSchema,
    address: shortTextSchema,
    postcode: shortTextSchema,
    birthDate: maxDateSchema,
    workAddress: shortTextSchema,
    workPostcode: shortTextSchema,
    phoneNumber: shortTextSchema,
    marriageDate: maxDateSchema,
    inSchool: booleanSchema,
});

export const _familyListSchema = z.object({
    dependenciesList: z.array(_familyInfoSchema),
});

export const _dependencyInfoSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: codeSchema.default(' '),
    identityDocumentColor: codeSchema,
    identityDocumentNumber: shortTextSchema,
    address: shortTextSchema,
    postcode: shortTextSchema,
    birthDate: maxDateSchema,
    workAddress: shortTextSchema,
    workPostcode: shortTextSchema,
    phoneNumber: shortTextSchema,
    marriageDate: maxDateSchema,
    inSchool: booleanSchema,
});

export const _dependencyListSchema = z.object({
    dependenciesList: z.array(_dependencyInfoSchema),
});

export const _nextOfKinInfoSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: codeSchema.default(' '),
    identityDocumentColor: codeSchema,
    identityDocumentNumber: shortTextSchema,
    address: shortTextSchema,
    postcode: shortTextSchema,
    birthDate: maxDateSchema,
    workAddress: shortTextSchema,
    workPostcode: shortTextSchema,
    phoneNumber: shortTextSchema,
    marriageDate: maxDateSchema,
    inSchool: booleanSchema,
});

export const _nextOfKinListSchema = z.object({
    nextOfKinList: z.array(_nextOfKinInfoSchema),
});

//==========================================================
//=============Maklumat Perkhidmatan ========================
//==========================================================

export const _serviceInfoSchema = z.object({
    // candidateId: numberIdSchema,
    gradeId: numberIdSchema,
    positionId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema,
    serviceGroupId: numberIdSchema,
    unitId: numberIdSchema,
    employmentStatusId: numberIdSchema,
    effectiveDate: minDateSchema,
    retirementBenefit: codeSchema,
    epfNumber: shortTextSchema,
    socsoNumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateSchema,
    newRecruitEffectiveDate: dateSchema,
    serviceDate: dateSchema,
    firstServiceDate: dateSchema,
    firstConfirmServiceDate: dateSchema,
    firstEffectiveDate: dateSchema,
    confirmDate: dateSchema,
    pensionNumber: shortTextSchema,
    kgt: numberSchema,
    retirementDate: minDateSchema,
    revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
});

export const load = async ({ params }) => {
    // set request body
    const candidateIdRequestBody = {
        candidateId: Number(params.tempId),
    };
    const personalDetailResponse: CandidatePersonalDetailsResponse =
        await EmployeeService.getCurrentCandidatePersonalDetails(
            candidateIdRequestBody,
        );
    const personalDetails: CandidatePersonalData = personalDetailResponse.data;

    const academicInfoResponse: CandidateAcademicDetailsResponse =
        await EmployeeService.getCurrentCandidateAcademic(
            candidateIdRequestBody,
        );

    const experienceInfoResponse: CandidateExperienceDetailsResponse =
        await EmployeeService.getCurrentCandidateExperience(
            candidateIdRequestBody,
        );

    const activityInfoResponse: NewHireActivity =
        await EmployeeService.getCurrentCandidateActivities(
            candidateIdRequestBody,
        );

    const familyInfoResponse: CandidateFamilyDetailsResponse =
        await EmployeeService.getCurrentCandidateFamily(candidateIdRequestBody);

    const dependencyInfoResponse: CandidateDependenciesDetailResponse =
        await EmployeeService.getCurrentCandidateDependencies(
            candidateIdRequestBody,
        );

    const nextOfKinInfoResponse: CandidateNextOfKinDetailsResponse =
        await EmployeeService.getCurrentCandidateNextOfKin(
            candidateIdRequestBody,
        );

    const documentInfoResponse: NewHireDocumentsResponse =
        await EmployeeService.getCurrentCandidateDocuments(
            candidateIdRequestBody,
        );

    const serviceResponse: NewHireSecretaryUpdateResponse =
        await EmployeeService.getCurrentCandidateSecretaryUpdate(
            candidateIdRequestBody,
        );
    const serviceDetails: SecretaryUpdateData = serviceResponse.data;

    // form data based on schema and response
    const personalInfoForm = await superValidate(
        personalDetails,
        _personalInfoForm,
    );

    const academicInfoForm = await superValidate(
        academicInfoResponse.data as AcademicResponseData,
        _academicListSchema,
    );

    const experienceInfoForm = await superValidate(
        experienceInfoResponse.data as ExperienceResponseData,
        _experienceListSchema,
    );
    const activityInfoForm = await superValidate(
        activityInfoResponse.data as ActivityResponseData,
        _activityListSchema,
    );

    const familyInfoForm = await superValidate(
        familyInfoResponse.data as FamilyData,
        _familyListSchema,
    );

    const dependencyInfoForm = await superValidate(
        dependencyInfoResponse.data as DependenciesData,
        _dependencyListSchema,
    );
    const nextOfKinInfoForm = await superValidate(
        nextOfKinInfoResponse.data as NextOfKinData,
        _nextOfKinListSchema,
    );
    const serviceInfoForm = await superValidate(
        serviceDetails,
        _serviceInfoSchema,
    );
    const addAcademicModal = await superValidate(_academicInfoSchema);
    const addExperienceModal = await superValidate(_experienceInfoSchema);
    const addActivityModal = await superValidate(_activityInfoSchema);
    const addFamilyModal = await superValidate(_familyInfoSchema);
    const addNonFamilyModal = await superValidate(_dependencyInfoSchema);
    const addNextOfKinModal = await superValidate(_nextOfKinInfoSchema);

    return {
        candidateIdRequestBody,
        personalDetailResponse,
        personalInfoForm,
        academicInfoResponse,
        academicInfoForm,
        experienceInfoResponse,
        experienceInfoForm,
        activityInfoResponse,
        activityInfoForm,
        familyInfoResponse,
        familyInfoForm,
        dependencyInfoResponse,
        dependencyInfoForm,
        nextOfKinInfoResponse,
        nextOfKinInfoForm,
        serviceResponse,
        serviceInfoForm,
        addAcademicModal,
        addExperienceModal,
        addActivityModal,
        addFamilyModal,
        addNonFamilyModal,
        addNextOfKinModal,
        documentInfoResponse,
    };
};

// personal detail submit function
export const _submitPersonalInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _personalInfoForm);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: RequestSuccessBody =
        await EmployeeService.createCurrentCandidatePersonalDetails(
            form.data as CandidatePersonalDetailsRequestBody,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { response };
};

export const _submitServiceInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _serviceInfoSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: RequestSuccessBody =
        await EmployeeService.createCurrentCandidateSecretaryUpdate(
            form.data as NewHireSecretaryAddUpdateRequestBody,
        ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { response };
};

export const _submitAcademicInfoForm = async (formData: AcademicList[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateAcademiceDetailsRequestBody = {
        academics: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response =
        await EmployeeService.createCurrentCandidateAcademicDetails(
            requestData,
        ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { response };
};

export const _submitExperienceInfoForm = async (formData: Experience[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateExperienceDetailsRequestBody = {
        experiences: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response =
        await EmployeeService.createCurrentCandidateExperienceDetails(
            requestData,
        ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { response };
};

export const _submitActivityInfoForm = async (formData: Activity[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateActivityRequestBody = {
        activities: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response =
        await EmployeeService.createCurrentCandidateActivityDetails(
            requestData,
        ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();
    return { response };
};

export const _submitFamilyInfoForm = async (formData: Family[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateFamilyDetailsRequestBody = {
        dependencies: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response = await EmployeeService.createCurrentCandidateFamilyDetails(
        requestData,
    ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();
    return { response };
};

export const _submitDependencyInfoForm = async (formData: Dependency[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateDependenciesDetailRequestBody = {
        dependencies: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response =
        await EmployeeService.createCurrentCandidateDependenciesDetails(
            requestData,
        ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();
    return { response };
};

export const _submitNextOfKinInfoForm = async (formData: NextOfKin[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateNextOfKinDetailsRequestBody = {
        nextOfKins: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response =
        await EmployeeService.createCurrentCandidateNextOfKinDetails(
            requestData,
        ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();
    return { response };
};

export const _submitDocumentInfoForm = async () => {
    const requestData = {
        documentData: 'test',
    };

    // start by rendering loading toast
    getLoadingToast();

    const response = await EmployeeService.createCurrentCandidateDocuments(
        requestData,
    ).finally(() => toast.dismiss());

    if (response.status !== 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();
    return { response };
};
