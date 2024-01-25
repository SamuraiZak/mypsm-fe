import {
    getErrorToast,
    getLoadingToast,
    getSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { CandidateIDRequestBody } from '$lib/view-models/mypsm/common/candidate-id-request.view-model.js';
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
import type {
    CandidatePersonalData,
    CandidatePersonalDetailsResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model.js';
import { error, fail } from '@sveltejs/kit';
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

const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

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

const numberIdSchema = z.coerce.number({
    required_error: 'Tidak tepat.',
    invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
});

export const _personalInfoForm = z
    .object({
        name: shortTextSchema,
        alternativeName: shortTextSchema.default(' '),
        identityDocumentNumber: shortTextSchema,
        identityDocumentColor: generalSelectSchema,
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
        isExPoliceOrSoldier: booleanSchema,
        isInternalRelationship: booleanSchema,
        employeeNumber: z.string().nullable(),
        employeeName: shortTextSchema.nullable(),
        employeePosition: generalSelectSchema.nullable(),
        relationshipId: numberIdSchema,
    })
    .superRefine(({ isInternalRelationship }, ctx) => {
        if (isInternalRelationship) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Sila isi medan ini.',
                path: [
                    'employeeNumber',
                    'employeeName',
                    'employeePosition',
                    'relationship',
                ],
            });
        }
    });

//==========================================================
//================== Maklumat Akademik =====================
//==========================================================

const academicListSchema = z.object({
    // id: numberIdSchema,
    majorMinorId: numberIdSchema,
    countryId: numberIdSchema,
    institutionId: numberIdSchema,
    educationLevelId: numberIdSchema,
    sponsorshipId: numberIdSchema,
    name: codeSchema,
    completionDate: maxDateSchema,
    finalGrade: codeSchema,
    field: shortTextSchema,
});

export const _academicInfoSchema = z.object({
    academicList: z.array(academicListSchema),
    // isReadonly: z.boolean(),
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

const experienceInfoSchema = z.object({
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: shortTextSchema.nullable(),
    startDate: minDateSchema,
    endDate: minDateSchema,
    salary: z.coerce.number({
        invalid_type_error: 'Medan ini hendaklah ditetapkan dengan angka',
    }),
});

export const _experienceListSchema = z.object({
    experienceList: z.array(experienceInfoSchema),
});

const activityInfoSchema = z.object({
    name: shortTextSchema,
    joinDate: maxDateSchema,
    position: shortTextSchema,
    description: longTextSchema,
});

export const _activityListSchema = z.object({
    activityList: z.array(activityInfoSchema),
});

const familyInfoSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: shortTextSchema.default(' '),
    identityDocumentColor: shortTextSchema,
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
    dependenciesList: z.array(familyInfoSchema),
});

const dependencyInfoSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: shortTextSchema.default(' '),
    identityDocumentColor: shortTextSchema,
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
    dependenciesList: z.array(dependencyInfoSchema),
});

const nextOfKinInfoSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: shortTextSchema.default(' '),
    identityDocumentColor: shortTextSchema,
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
    nextOfKinList: z.array(nextOfKinInfoSchema),
});

//==========================================================
//=============Maklumat Perkhidmatan ========================
//==========================================================

export const _serviceInfoSchema = z.object({
    faedahPersaraanPerkhidmatan: generalSelectSchema,
    gredSemasa: generalSelectSchema,
    jawatan: generalSelectSchema,
    penempatan: generalSelectSchema,
    tarafPerkhidmatan: generalSelectSchema,
    bulanKGT: generalSelectSchema,
    noKWSP: shortTextSchema,
    noSOCSO: shortTextSchema,
    noCukai: shortTextSchema,
    bank: shortTextSchema,
    noAkaun: shortTextSchema,
    tarikhBerkuatKuasa: shortTextSchema,
    tanggaGaji: shortTextSchema,
    gajiPokok: shortTextSchema,
    itka: shortTextSchema,
    itp: shortTextSchema,
    epw: shortTextSchema,
    cola: shortTextSchema,
    kelayakanCuti: shortTextSchema,
    mulaDilantikPerkhidmatanKerajaan: maxDateSchema,
    mulaDilantikPerkhidmatanLKIM: maxDateSchema,
    disahkanDalamJawatanSemasaLKIM: maxDateSchema,
    tarikhKelulusanPercantumanPerkhidmatanLepas: maxDateSchema,
    tarikhBersara: minDateSchema,
    tarikhKuatkuasaLantikanSemasa: maxDateSchema,
    pemangkuanSekarang: minDateSchema,
    tanggungKerjaSekarang: minDateSchema,
    kenaikanGajiAkhir: minDateSchema,
    kenaikanPangkatAkhir: minDateSchema,
});

//==========================================================
//================== Maklumat Pengalaman Modal ===================
//==========================================================

// New employment - add academic section
export const _addAcademicInfoSchema = z.object({
    majorMinorId: numberIdSchema,
    countryId: numberIdSchema,
    institutionId: numberIdSchema,
    educationLevelId: numberIdSchema,
    sponsorshipId: numberIdSchema,
    name: shortTextSchema,
    completionDate: maxDateSchema,
    finalGrade: codeSchema,
    field: longTextSchema,
});

export const _addExperienceModalSchema = z.object({
    addCompany: shortTextSchema,
    addAddress: shortTextSchema,
    addPosition: shortTextSchema,
    addPositionCode: codeSchema.nullish(),
    addStartDate: maxDateSchema,
    addEndDate: maxDateSchema,
    addSalary: z.coerce.number({
        invalid_type_error: 'Medan ini hendaklah ditetapkan dengan angka',
    }),
});

//==========================================================
//================== Maklumat Aktiviti Modal ===================
//==========================================================

export const _addActivityModalSchema = z.object({
    addName: shortTextSchema,
    addJoinDate: maxDateSchema,
    addPosition: shortTextSchema,
    addDescription: shortTextSchema,
});

//==========================================================
//================== Maklumat Keluarga Modal ===================
//==========================================================

export const _addFamilyModalSchema = z.object({
    addName: shortTextSchema,
    addAlternativeName: shortTextSchema.default(' '),
    addIdentityDocumentColor: shortTextSchema,
    addIdentityDocumentNumber: shortTextSchema,
    addAddress: shortTextSchema,
    addPostcode: shortTextSchema,
    addBirthDate: maxDateSchema,
    addBirthCountryId: numberIdSchema,
    addBirthStateId: numberIdSchema,
    addRelationshipId: numberIdSchema,
    addEducationLevelId: numberIdSchema,
    addRaceId: numberIdSchema,
    addNationalityId: numberIdSchema,
    addMaritalId: numberIdSchema,
    addGenderId: numberIdSchema,
    addWorkAddress: shortTextSchema,
    addWorkPostcode: shortTextSchema,
    addPhoneNumber: shortTextSchema,
    addMarriageDate: maxDateSchema,
    addInSchool: booleanSchema,
});

//==========================================================
//================== Maklumat Bukan Keluarga Modal ===================
//==========================================================

export const _addNonFamilyModalSchema = z.object({
    addNonFamilyName: shortTextSchema,
    addNonFamilyAlternativeName: shortTextSchema.default(' '),
    addNonFamilyIdentityDocumentColor: shortTextSchema,
    addNonFamilyIdentityDocumentNumber: shortTextSchema,
    addNonFamilyAddress: shortTextSchema,
    addNonFamilyPostcode: shortTextSchema,
    addNonFamilyBirthDate: maxDateSchema,
    addNonFamilyBirthCountryId: numberIdSchema,
    addNonFamilyBirthStateId: numberIdSchema,
    addNonFamilyRelationshipId: numberIdSchema,
    addNonFamilyEducationLevelId: numberIdSchema,
    addNonFamilyRaceId: numberIdSchema,
    addNonFamilyNationalityId: numberIdSchema,
    addNonFamilyMaritalId: numberIdSchema,
    addNonFamilyGenderId: numberIdSchema,
    addNonFamilyWorkAddress: shortTextSchema,
    addNonFamilyWorkPostcode: shortTextSchema,
    addNonFamilyPhoneNumber: shortTextSchema,
    addNonFamilyMarriageDate: maxDateSchema,
    addNonFamilyInSchool: booleanSchema,
});

//==========================================================
//================== Add Maklumat Waris ========================
//==========================================================
export const _addNextOfKinInfoSchema = z.object({
    addNextOfKinName: shortTextSchema,
    addNextOfKinAlternativeName: shortTextSchema.default(' '),
    addNextOfKinIdentityDocumentColor: shortTextSchema,
    addNextOfKinIdentityDocumentNumber: shortTextSchema,
    addNextOfKinAddress: shortTextSchema,
    addNextOfKinPostcode: shortTextSchema,
    addNextOfKinBirthDate: maxDateSchema,
    addNextOfKinBirthCountryId: numberIdSchema,
    addNextOfKinBirthStateId: numberIdSchema,
    addNextOfKinRelationshipId: numberIdSchema,
    addNextOfKinEducationLevelId: numberIdSchema,
    addNextOfKinRaceId: numberIdSchema,
    addNextOfKinNationalityId: numberIdSchema,
    addNextOfKinMaritalId: numberIdSchema,
    addNextOfKinGenderId: numberIdSchema,
    addNextOfKinWorkAddress: shortTextSchema,
    addNextOfKinWorkPostcode: shortTextSchema,
    addNextOfKinPhoneNumber: shortTextSchema,
    addNextOfKinMarriageDate: maxDateSchema,
    addNextOfKinInSchool: booleanSchema,
});

export const load = async ({ params }) => {
    // set request body
    const candidateIdRequestBody: CandidateIDRequestBody = {
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

    const academicDetails: AcademicResponseData = academicInfoResponse.data;

    const experienceInfoResponse: CandidateExperienceDetailsResponse =
        await EmployeeService.getCurrentCandidateExperience(
            candidateIdRequestBody,
        );

    const experienceDetails: ExperienceResponseData =
        experienceInfoResponse.data;

    const activityInfoResponse: NewHireActivity =
        await EmployeeService.getCurrentCandidateActivities(
            candidateIdRequestBody,
        );
    const activityDetails: ActivityResponseData = activityInfoResponse.data;

    const familyInfoResponse: CandidateFamilyDetailsResponse =
        await EmployeeService.getCurrentCandidateFamily(candidateIdRequestBody);
    const familyDetails: FamilyData = familyInfoResponse.data;

    const dependencyInfoResponse: CandidateDependenciesDetailResponse =
        await EmployeeService.getCurrentCandidateDependencies(
            candidateIdRequestBody,
        );
    const dependencyDetails: DependenciesData = dependencyInfoResponse.data;

    const nextOfKinInfoResponse: CandidateNextOfKinDetailsResponse =
        await EmployeeService.getCurrentCandidateNextOfKin(
            candidateIdRequestBody,
        );
    const nextOfKinDetails: NextOfKinData = nextOfKinInfoResponse.data;

    // form data based on schema and response
    const personalInfoForm = await superValidate(
        personalDetails,
        _personalInfoForm,
    );

    const academicInfoForm = await superValidate(
        academicDetails,
        _academicInfoSchema,
    );
    const serviceInfoForm = await superValidate(_serviceInfoSchema);
    const experienceInfoForm = await superValidate(
        experienceDetails,
        _experienceListSchema,
    );
    const activityInfoForm = await superValidate(
        activityDetails,
        _activityListSchema,
    );

    const familyInfoForm = await superValidate(
        familyDetails,
        _familyListSchema,
    );

    const dependencyInfoForm = await superValidate(
        dependencyDetails,
        _dependencyListSchema,
    );
    const nextOfKinInfoForm = await superValidate(
        nextOfKinDetails,
        _nextOfKinListSchema,
    );
    const addAcademicModal = await superValidate(_addAcademicInfoSchema);
    const addExperienceModal = await superValidate(_addExperienceModalSchema);
    const addActivityModal = await superValidate(_addActivityModalSchema);
    const addFamilyModal = await superValidate(_addFamilyModalSchema);
    const addNonFamilyModal = await superValidate(_addNonFamilyModalSchema);
    const addNextOfKinModal = await superValidate(_addNextOfKinInfoSchema);

    return {
        personalInfoForm,
        academicDetails,
        academicInfoForm,
        serviceInfoForm,
        experienceDetails,
        experienceInfoForm,
        activityDetails,
        activityInfoForm,
        familyDetails,
        familyInfoForm,
        dependencyDetails,
        dependencyInfoForm,
        nextOfKinDetails,
        nextOfKinInfoForm,
        addAcademicModal,
        addExperienceModal,
        addActivityModal,
        addFamilyModal,
        addNonFamilyModal,
        addNextOfKinModal,
    };
};

// personal detail submit function
export const _submitPersonalInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _personalInfoForm);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // const requestBody: CandidatePersonalDetailsRequestBody = form

    // const response: RequestSuccessBody =
    //     await EmployeeService.createCurrentCandidatePersonalDetails(
    //         requestBody,
    //     );

    // if (response.status !== 201) {
    //     // if error toast
    //     getErrorToast();
    //     return error(400, { message: response.message });
    // }

    // if success toast
    getSuccessToast();

    return { form };
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
        );

    if (response.status !== 201) {
        // if error toast
        getErrorToast();
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
        );

    if (response.status !== 201) {
        // if error toast
        getErrorToast();
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
        );

    if (response.status !== 201) {
        // if error toast
        getErrorToast();
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
        families: formData,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response =
        await EmployeeService.createCurrentCandidateFamilyDetails(requestData);

    if (response.status !== 201) {
        // if error toast
        getErrorToast();
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
        );

    if (response.status !== 201) {
        // if error toast
        getErrorToast();
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
        );

    if (response.status !== 201) {
        // if error toast
        getErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();
    return { response };
};
