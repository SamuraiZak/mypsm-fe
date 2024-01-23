import api from '$lib/services/core/ky.service.js';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import type { CandidateIDRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/candidate-id-request.view-model.js';
import type {
    ActivityResponseData,
    NewHireActivity,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
import type {
    AcademicResponseData,
    CandidateAcademicDetailsResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-response.model.js';
import type { ExperienceResponseData } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-respone.model.js';
import type {
    CandidatePersonalData,
    CandidatePersonalDetailsResponse,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model.js';
import { fail } from '@sveltejs/kit';
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

const identitySchema = z.coerce
    .number({
        required_error: 'Tidak tepat.',
        invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
    })
    .min(12, { message: 'Kurang daripada 12 angka mengikut ID Malaysia' });

const numberIdSchema = z.coerce.number({
    required_error: 'Tidak tepat.',
    invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
});

export const _personalInfoForm = z
    .object({
        id: numberIdSchema,
        genderId: numberIdSchema,
        nationalityId: numberIdSchema,
        religionId: numberIdSchema,
        raceId: numberIdSchema,
        titleId: numberIdSchema,
        ethnicId: numberIdSchema,
        maritalId: numberIdSchema,
        birthCountryId: numberIdSchema,
        birthStateId: numberIdSchema,
        assetDeclarationStatusId: numberIdSchema,
        name: shortTextSchema,
        alternativeName: shortTextSchema,
        identityDocumentColor: generalSelectSchema,
        identityDocumentNumber: identitySchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        propertyDeclarationDate: maxDateSchema,
        birthDate: maxDateSchema,
        isExPoliceOrSoldier: booleanSchema,
        isInternalRelationship: booleanSchema,
        employeeNumber: z.string().nullable(),
        employeeName: shortTextSchema.nullable(),
        employeePosition: generalSelectSchema.nullable(),
        relationshipId: numberIdSchema,
        isReadonly: z.boolean(),
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
    id: numberIdSchema,
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

// New employment - add academic section
export const _addAcademicInfoSchema = z.object({
    majorMinorId: numberIdSchema.nullish(),
    countryId: numberIdSchema,
    institutionId: numberIdSchema,
    educationLevelId: numberIdSchema,
    sponsorshipId: numberIdSchema,
    name: shortTextSchema,
    completionDate: maxDateSchema,
    finalGrade: codeSchema,
    field: z.string(),
});
// New employment - add activity section
export const _addActivitiesInfoSchema = z.object({
    name: shortTextSchema,
    joinDate: maxDateSchema,
    position: shortTextSchema,
    description: longTextSchema,
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _experienceInfoSchema = z.object({
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

//==========================================================
//================== Maklumat Pengalaman Modal ===================
//==========================================================

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
    addIdentityDocumentNumber: identitySchema,
    addGender: generalSelectSchema,
    addRelationship: generalSelectSchema,
    addOccupation: shortTextSchema.nullish(),
    addIsInSchool: booleanSchema,
});

//==========================================================
//================== Maklumat Bukan Keluarga Modal ===================
//==========================================================

export const _addNonFamilyModalSchema = z.object({
    addNonFamilyName: shortTextSchema,
    addNonFamilyIdentityDocumentNumber: identitySchema,
    addNonFamilyGender: generalSelectSchema,
    addNonFamilyRelationship: generalSelectSchema,
    addNonFamilyOccupation: shortTextSchema.nullish(),
    addNonFamilyIsInSchool: booleanSchema,
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
//================== Maklumat Waris ========================
//==========================================================
export const _nextOfKinInfoSchema = z.object({
    name: shortTextSchema,
    identityDocumentNumber: shortTextSchema,
    birthDate: maxDateSchema,
    relationship: generalSelectSchema,
    marriageDate: maxDateSchema,
    identityDocumentType: generalSelectSchema,
    homeNumber: shortTextSchema,
    mobileNumber: shortTextSchema,
    position: shortTextSchema,
    company: shortTextSchema,
    companyAddress: shortTextSchema,
});

//==========================================================
//================== Add Maklumat Waris ========================
//==========================================================
export const _addNextOfKinInfoSchema = z.object({
    addNextOfKinName: shortTextSchema,
    addNextOfKinIdentityDocumentNumber: identitySchema,
    addNextOfKinBirthDate: maxDateSchema,
    addNextOfKinRelationship: generalSelectSchema,
    addNextOfKinMarriageDate: maxDateSchema,
    addNextOfKinIdentityDocumentType: generalSelectSchema,
    addNextOfKinHomeNumber: shortTextSchema.nullish(),
    addNextOfKinMobileNumber: shortTextSchema,
    addNextOfKinPosition: shortTextSchema,
    addNextOfKinCompany: shortTextSchema.nullish(),
    addNextOfKinCompanyAddress: shortTextSchema.nullish(),
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

    // form data based on schema and response
    const experienceInfoResponse =
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

    const personalInfoForm = await superValidate(
        personalDetails,
        _personalInfoForm,
    );

    const academicInfoForm = await superValidate(
        academicDetails,
        _academicInfoSchema,
    );
    const serviceInfoForm = await superValidate(_serviceInfoSchema);
    const experienceInfoForm = await superValidate(_experienceInfoSchema);
    const nextOfKinInfoForm = await superValidate(_nextOfKinInfoSchema);
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
    console.log('HERE: ', formData);

    const form = await superValidate(formData, _personalInfoForm);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);
    return { form };
};

export const _submitAcademicInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _academicInfoSchema);

    console.log('Request: ', form.data);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);

    return { form };
};

export const _submitExperienceInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _experienceInfoSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);
    return { form };
};

export const _submitNextOfKinForm = async (formData: object) => {
    const form = await superValidate(formData, _experienceInfoSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);
    return { form };
};

// export const _moreAcedemicInfo: unknown[] = [];

export const _submitAddMoreAcademicForm = async (formData: object) => {
    const form = await superValidate(formData, _addAcademicInfoSchema);

    console.log('Request: ', form.data);
    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json();

    getPromiseToast(responsePromise);

    const response = await responsePromise;

    return { response };
};

export const _submitAddExperienceModal = async (formData: object) => {
    const form = await superValidate(formData, _addAcademicInfoSchema);

    console.log('Request: ', form.data);
    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise: Promise<Response> = api
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json();

    getPromiseToast(responsePromise);

    const response: Response = await responsePromise;

    return { response };
};
