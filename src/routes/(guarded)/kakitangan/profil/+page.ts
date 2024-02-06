import { invalidateAll } from '$app/navigation';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { PostPersonalActivityRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-activity-request-post.dto';
import type { PostPersonalDependentRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-dependent-request-post.dto';
import type { PutPersonalDetailRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-detail-request-put.dto';
import type { PersonalDetails } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-detail-response-get.dto';
import type { PostPersonalFamilyRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-family-request-post.dto';
import type { PostPersonalNextOfKinRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-next-of-kin-request-post.dto';
import type { GetPersonalServiceResponse } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-service-response-get.dto';
import type { GetPersonalMedicalGeneralAssessmentResponse } from '$lib/dto/mypsm/profile/rekod-kesihatan/personal-medical-record-general-assessment-response-get.dto';
import {
    getErrorToast,
    getLoadingToast,
    getPromiseToast,
    getServerErrorToast,
    getSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { ProfileService } from '$lib/services/implementations/mypsm/profile/profile.service';
import { loadingState } from '$lib/stores/globalState';
import type { DependenciesList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-response.model';
import type { NextOfKinList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-response.model';
import type { ActivityList } from '$lib/view-models/mypsm/profile/profile-get-personal-activity-response.modal';
import type { PersonalAgendaResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-agenda-response.modal';
import type { FamilyList } from '$lib/view-models/mypsm/profile/profile-get-personal-family-response.modal';
import type { SalaryList } from '$lib/view-models/mypsm/profile/profile-get-personal-salary-allowances-response.modal';
import type { PostPersonalAcademicRequest } from '$lib/view-models/mypsm/profile/profile-post-personal-academic-request.modal';
import type { PostPersonalExperiencesRequest } from '$lib/view-models/mypsm/profile/profile-post-personal-experiences-request.modal';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =========================================================================
// z validation schema and submit function for the new employment form fields
// =========================================================================
const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
// const minDateSchema = z.coerce
//     .date({
//         errorMap: (issue, { defaultError }) => ({
//             message:
//                 issue.code === 'invalid_date'
//                     ? 'Tarikh tidak boleh dibiar kosong.'
//                     : defaultError,
//         }),
//     })
//     .min(new Date(), {
//         message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
//     });

const shortTextSchema = z
    .string({
        required_error: 'Medan ini tidak boleh kosong.',
        invalid_type_error: 'Medam ini hendaklah lebih dari 4 karakter',
    })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

const codeSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 1 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

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

const dateSchema = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const numberSchema = z.coerce
    .number({
        required_error: 'Tidak tepat.',
        invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
    })
    .min(1, { message: 'Tidak Boleh kurang daripada 1 karakter' });

const dateStepper8 = z.coerce
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

const dateKontrak = z.coerce
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

const dateKontrakMax = z.coerce
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

// =========================================================================
// =========================Maklumat Peribadi===============================
// =========================================================================

export const _relationDetailSchema = z.object({
    employeeNumber: shortTextSchema,
    fullName: shortTextSchema,
    // position: shortTextSchema,
    // relationship: shortTextSchema,
});

export const _stepperMaklumatPeribadi = z.object({
    employeeNumber: shortTextSchema,
    identityCardNumber: shortTextSchema,
    fullName: shortTextSchema,
    alternativeName: shortTextSchema,
    icColour: shortTextSchema,
    birthDate: maxDateSchema,
    birthplace: shortTextSchema,
    nationality: shortTextSchema,
    race: shortTextSchema,
    ethnic: shortTextSchema,
    religion: shortTextSchema,
    gender: shortTextSchema,
    marital: shortTextSchema,
    email: shortTextSchema,
    homeAddress: shortTextSchema,
    mailAddress: shortTextSchema,
    houseLoanType: shortTextSchema.default(' '),
    houseLoan: numberSchema,
    isExPolice: booleanSchema,
    isRelatedToLKIM: booleanSchema,
    relationDetail: z.optional(_relationDetailSchema),
});

export const _personalDetailsAllRequired = _stepperMaklumatPeribadi.required({
    relationDetail: true,
});

//==========================================================
//=============Maklumat Perkhidmatan ========================
//==========================================================

export const _stepperMaklumatPerkhidmatan = z
    .object({
        currentGrade: shortTextSchema,
        currentPosition: shortTextSchema,
        placement: shortTextSchema,
        serviceType: shortTextSchema,
        effectiveDate: dateSchema,
        retirementBenefit: shortTextSchema,
        EPFNumber: shortTextSchema,
        SOCSO: shortTextSchema,
        taxIncome: shortTextSchema,
        bankName: shortTextSchema,
        accountNumber: shortTextSchema,
        program: shortTextSchema,
        eligibleLeaveCount: numberSchema,
        civilServiceStartDate: dateSchema,
        confirmServiceDate: dateSchema,
        firstEffectiveDate: dateSchema,
        pastAttachmentDate: dateSchema,
        actingDate: dateSchema,
        interimDate: dateSchema,
        pensionScheme: shortTextSchema,
        lastSalaryRaiseDate: dateSchema,
        lastPromotionDate: dateSchema,
        salaryMovementMonth: numberSchema,
        retirementDate: dateSchema,
        salaryEffectiveDate: dateSchema,
        maximumSalary: numberSchema,
        baseSalary: numberSchema,
        ITKA: numberSchema,
        ITP: numberSchema,
        EPW: numberSchema,
        COLA: numberSchema,
    })
    .partial();

//==========================================================
//================== Maklumat Akademik =====================
//==========================================================

export const _academicInfo = z.object({
    id: shortTextSchema,
    major: shortTextSchema,
    minor: shortTextSchema,
    country: shortTextSchema,
    institution: shortTextSchema,
    educationLevel: shortTextSchema,
    sponsorship: shortTextSchema,
    name: shortTextSchema,
    completionDate: dateSchema,
    finalGrade: shortTextSchema,
    remark: z.optional(shortTextSchema),
});

export const _stepperMaklumatAkademik = z.object({
    dataList: z.array(_academicInfo),
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _experienceInfo = z.object({
    id: shortTextSchema,
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: shortTextSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    salary: numberSchema,
});

export const _stepperMaklumatPengalaman = z.object({
    dataList: z.array(_experienceInfo),
});

//==========================================================
//================== Maklumat Aktiviti Modal ===============
//==========================================================

export const _addActivityModalSchema = z.object({
    name: shortTextSchema,
    joinDate: maxDateSchema,
    position: shortTextSchema,
    description: shortTextSchema,
});

//==========================================================
//================== Maklumat Waris ========================
//==========================================================

const maklumatWarisSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperMaklumatWaris = z.object({
    identityDocumentColor: maklumatWarisSelectSchema,
    relationship: maklumatWarisSelectSchema,
    inSchool: booleanSchema,

    name: shortTextSchema,
    alternativeName: shortTextSchema,
    identityDocumentNumber: shortTextSchema,
    birthCountry: shortTextSchema,
    educationLevel: shortTextSchema,
    birthState: shortTextSchema,
    race: shortTextSchema,
    phoneNumber: shortTextSchema,
    workPostcode: shortTextSchema,
    namaMajikanWaris: shortTextSchema,
    workAddress: shortTextSchema,

    birthDate: dateStepper8,
    marriageDate: dateStepper8,
});

// =========================================================================
// =========================rekod Kesihatan=================================
// =========================================================================

//==========================================================
//============== stepper Sejarah Penyakit ==================
//==========================================================

const SejarahPenyakitSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperSejarahPenyakit = z
    .object({
        // id: z.string().nullish(),
        // diseases: z.string().nullish(),
        // isPersonal: z.boolean().nullish(),
        // isFamily: z.boolean().nullish(),
        // remark: z.string().nullish(),

        sendiriPenyakitSejakLahir: SejarahPenyakitSelectSchema,
        keluargaPenyakitSejakLahir: SejarahPenyakitSelectSchema,
        sendiriAlahan: SejarahPenyakitSelectSchema,
        keluargaAlahan: SejarahPenyakitSelectSchema,
        sendiriSakitJiwa: SejarahPenyakitSelectSchema,
        keluargaSakitJiwa: SejarahPenyakitSelectSchema,
        sendiriEpilepsi: SejarahPenyakitSelectSchema,
        keluargaEpilepsi: SejarahPenyakitSelectSchema,
        sendiriDarahTinggi: SejarahPenyakitSelectSchema,
        keluargaDarahTinggi: SejarahPenyakitSelectSchema,
        sendiriKencingManis: SejarahPenyakitSelectSchema,
        keluargaKencingManis: SejarahPenyakitSelectSchema,
        sendiriJantung: SejarahPenyakitSelectSchema,
        keluargaJantung: SejarahPenyakitSelectSchema,
        sendiriAsma: SejarahPenyakitSelectSchema,
        keluargaAsma: SejarahPenyakitSelectSchema,
        sendiriSakitBuahPinggang: SejarahPenyakitSelectSchema,
        keluargaSakitBuahPinggang: SejarahPenyakitSelectSchema,
        sendiriBarah: SejarahPenyakitSelectSchema,
        keluargaBarah: SejarahPenyakitSelectSchema,
        sendiriBatukKering: SejarahPenyakitSelectSchema,
        keluargaBatukKering: SejarahPenyakitSelectSchema,
        sendiriKetagihanDadah: SejarahPenyakitSelectSchema,
        keluargaKetagihanDadah: SejarahPenyakitSelectSchema,
        sendiriAIDS: SejarahPenyakitSelectSchema,
        keluargaAIDS: SejarahPenyakitSelectSchema,
        sendiriHepatitisB: SejarahPenyakitSelectSchema,
        keluargaHepatitisB: SejarahPenyakitSelectSchema,
        sendiriSejarahPembedahan: SejarahPenyakitSelectSchema,
        keluargaSejarahPembedahan: SejarahPenyakitSelectSchema,
        sendiriKecacatan: SejarahPenyakitSelectSchema,
        keluargaKecacatan: SejarahPenyakitSelectSchema,
        sendiriMerokok: SejarahPenyakitSelectSchema,
        keluargaMerokok: SejarahPenyakitSelectSchema,
        sendiriPenyakitSeriusLain: SejarahPenyakitSelectSchema,
        keluargaPenyakitSeriusLain: SejarahPenyakitSelectSchema,
        sendiriSedangMenerimaRawatan: SejarahPenyakitSelectSchema,
        keluargaSedangMenerimaRawatan: SejarahPenyakitSelectSchema,

        penyakitSejakLahir: shortTextSchema.nullable(),
        alahan: shortTextSchema.nullable(),
        sakitJiwa: shortTextSchema.nullable(),
        epilepsi: shortTextSchema.nullable(),
        darahTinggi: shortTextSchema.nullable(),
        kencingManis: shortTextSchema.nullable(),
        jantungAtatuSalurDarah: shortTextSchema.nullable(),
        asma: shortTextSchema.nullable(),
        sakitBuahPinggang: shortTextSchema.nullable(),
        barah: shortTextSchema.nullable(),
        batukKering: shortTextSchema.nullable(),
        ketagihanDadah: shortTextSchema.nullable(),
        AIDS: shortTextSchema.nullable(),
        hepatitisB: shortTextSchema.nullable(),
        sejarahPembedahan: shortTextSchema.nullable(),
        kecacatan: shortTextSchema.nullable(),
        merokok: shortTextSchema.nullable(),
        penyakitSeriusLain: shortTextSchema.nullable(),
        sedangMenerimaRawatan: shortTextSchema.nullable(),
    })
    .partial();

export const _stepperSejarahPenyakitList = z.object({
    medicalHistory: z.array(_stepperSejarahPenyakit),
});

//==========================================================
//============== stepper Pemeriksaan Doktor ================
//==========================================================

const pemeriksaanDoktorSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperPemeriksaanDoktor = z.object({
    // sistemMuskuloskeletalRadio: pemeriksaanDoktorSelectSchema,
    paleSkin: booleanSchema,
    // cycnosis: booleanSchema,
    edema: booleanSchema,
    jaundice: booleanSchema,
    lymphGlands: booleanSchema,
    skinDisease: booleanSchema,
    penglihatanWarnaRadio: pemeriksaanDoktorSelectSchema,
    funduskopiRadio: pemeriksaanDoktorSelectSchema,
    telingaRadio: pemeriksaanDoktorSelectSchema,
    ronggaGigiMulutRadio: pemeriksaanDoktorSelectSchema,
    leherRadio: pemeriksaanDoktorSelectSchema,
    kardiovaskularRadio: pemeriksaanDoktorSelectSchema,
    pemeriksaanRadio: pemeriksaanDoktorSelectSchema,
    xrayRadio: pemeriksaanDoktorSelectSchema,
    abdomenHerniaRadio: pemeriksaanDoktorSelectSchema,
    sistemSarafRadio: pemeriksaanDoktorSelectSchema,
    sistemMuskuloskeletalRadio: pemeriksaanDoktorSelectSchema,
    sugar: booleanSchema,
    albumin: booleanSchema,

    height: shortTextSchema,
    weight: shortTextSchema,
    BMI: shortTextSchema,
    BPM: shortTextSchema,
    BP: shortTextSchema,
    unaidedVisionLeft: shortTextSchema,
    unaidedVisionRight: shortTextSchema.nullable(),
    // penglihatanTanpaBantuan3: shortTextSchema.nullable(),
    // penglihatanTanpaBantuan4: shortTextSchema.nullable(),
    // penglihatanTanpaBantuan5: shortTextSchema.nullable(),
    // penglihatanTanpaBantuan6: shortTextSchema.nullable(),
    aidedVisionLeft: shortTextSchema,
    aidedVisionRight: shortTextSchema.nullable(),
    // penglihatanDenganBantuan3: shortTextSchema.nullable(),
    fundoscopic: shortTextSchema.nullable(),
    colourVision: shortTextSchema.nullable(),
    ear: shortTextSchema.nullable(),
    dental: shortTextSchema.nullable(),
    neck: shortTextSchema.nullable(),
    cardiovascular: shortTextSchema.nullable(),
    breathingExam: shortTextSchema.nullable(),
    xray: shortTextSchema.nullable(),
    xrayTaken: maxDateSchema,
    xrayLocation: shortTextSchema,
    xrayReference: shortTextSchema,
    abdomenHernia: shortTextSchema.nullable(),
    mentalState: shortTextSchema.nullable(),
    musculoskeletal: shortTextSchema.nullable(),
    microscopic: shortTextSchema,
});
//==========================================================
//================== Makluma tAkademik Modal ===================
//==========================================================

// New employment - add academic section
export const _addAcademicInfoSchema = z.object({
    majorMinor: shortTextSchema,
    country: shortTextSchema,
    institution: shortTextSchema,
    educationLevel: shortTextSchema,
    sponsorship: shortTextSchema,
    name: shortTextSchema,
    completionDate: dateSchema,
    finalGrade: shortTextSchema,
    field: shortTextSchema,
});

//==========================================================
//================== Maklumat Pengalaman Modal ===================
//==========================================================

export const _addExperienceInfoSchema = z.object({
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

//==========================================================
//================== Maklumat Keluarga Modal ===================
//==========================================================

export const _addRelationModalSchema = z.object({
    birthCountry: shortTextSchema,
    birthState: shortTextSchema,
    relationship: shortTextSchema,
    educationLevel: shortTextSchema,
    race: shortTextSchema,
    nationality: shortTextSchema,
    marital: shortTextSchema,
    gender: shortTextSchema,
    name: shortTextSchema,
    alternativeName: codeSchema,
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

export const _stepperkontrak = z.object({
    ID: shortTextSchema,
    emel: shortTextSchema,
    penglihatanDenganBantuan: shortTextSchema,
    tempohKontrak: shortTextSchema,
    kadarUpah: shortTextSchema,
    penempatan: shortTextSchema,
    gelaranTugas: shortTextSchema,

    tarikhMulaKontrak: dateKontrakMax.refine((date) =>
        date.toLocaleDateString(),
    ),
    tarikhTamatKontrak: dateKontrak.refine((date) => date.toLocaleDateString()),
    tarikhLaporDiri: dateKontrakMax.refine((date) => date.toLocaleDateString()),
});

// New Employment - Approver Result section
export const _approverResultSchema = z.object({
    halo: longTextSchema,
});

//=====================================================
//==================== Stepper ========================
//=====================================================

export const load = async () => {
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const personalDetailResponse: CommonResponseDTO =
        await ProfileService.ProfileDetail();

    const personalDetails: PersonalDetails = personalDetailResponse.data
        ?.details as PersonalDetails;

    const personalServiceResponse: CommonResponseDTO =
        await ProfileService.getServiceDetail();

    const personalService: GetPersonalServiceResponse = personalServiceResponse
        .data?.details as GetPersonalServiceResponse;

    const personalAcademicResponse: CommonResponseDTO =
        await ProfileService.ProfileEducationsDetail();

    const personalExperienceResponse: CommonResponseDTO =
        await ProfileService.ProfileExperiencesDetail();

    const personalActivityResponse: CommonResponseDTO =
        await ProfileService.ProfileActivitiesDetail();

    const personalActivityList: ActivityList[] = personalActivityResponse.data
        ?.dataList as ActivityList[];

    const personalFamilyResponse: CommonResponseDTO =
        await ProfileService.ProfileFamilyDetail();

    const personalFamilyList: FamilyList[] = personalFamilyResponse.data
        ?.dataList as FamilyList[];

    const personalDependencyResponse: CommonResponseDTO =
        await ProfileService.ProfileDependentDetail();

    const personalDependencyList: DependenciesList[] =
        personalDependencyResponse.data?.dataList as DependenciesList[];

    const personalNextOfKinResponse: CommonResponseDTO =
        await ProfileService.ProfileNextOfKinsDetail();

    const personalNextOfKinList: NextOfKinList[] = personalNextOfKinResponse
        .data?.dataList as NextOfKinList[];

    const personalMedicalAssessmentResponse: GetPersonalMedicalGeneralAssessmentResponse =
        await ProfileService.getPersonalMedicalGenaralAssesment();

    const personalAgendaResponse: CommonResponseDTO =
        await ProfileService.getEmployeeAgenda(param);

    const personalAgendaList: PersonalAgendaResponse[] = personalAgendaResponse
        .data?.dataList as PersonalAgendaResponse[];

    const personalSalaryAllowanceResponse: CommonResponseDTO =
        await ProfileService.getPersonalSalaryAllowance(param);

    const personalSalaryAllowanceList: SalaryList[] =
        personalSalaryAllowanceResponse.data?.dataList as SalaryList[];
    // ==================SuperValidate=====================

    // const id = parseInt(params.id);
    const stepperMaklumatPeribadi = await superValidate(
        personalDetails,
        _stepperMaklumatPeribadi,
    );
    const stepperMaklumatPerkhidmatan = await superValidate(
        personalService,
        _stepperMaklumatPerkhidmatan,
    );

    const form = await superValidate(_stepperkontrak);

    const stepperMaklumatAkademik = await superValidate(
        personalAcademicResponse.data,
        _stepperMaklumatAkademik,
    );

    const stepperMaklumatPengalaman = await superValidate(
        personalExperienceResponse.data,
        _stepperMaklumatPengalaman,
    );
    const stepperMaklumatWaris = await superValidate(_stepperMaklumatWaris);

    const stepperSejarahPenyakit = await superValidate(_stepperSejarahPenyakit);

    const stepperPemeriksaanDoktor = await superValidate(
        _stepperPemeriksaanDoktor,
    );

    const addAcademicModal = await superValidate(_addAcademicInfoSchema);
    const addExperienceModal = await superValidate(_addExperienceInfoSchema);
    const addActivityModal = await superValidate(_addActivityModalSchema);
    const addFamilyModal = await superValidate(_addRelationModalSchema);
    const addNonFamilyModal = await superValidate(_addRelationModalSchema);
    const addNextOfKinModal = await superValidate(_addRelationModalSchema);

    return {
        form,
        stepperMaklumatPeribadi,
        stepperMaklumatPerkhidmatan,
        stepperMaklumatAkademik,
        stepperMaklumatPengalaman,
        stepperMaklumatWaris,
        stepperSejarahPenyakit,
        stepperPemeriksaanDoktor,
        addAcademicModal,
        addExperienceModal,
        addActivityModal,
        addFamilyModal,
        addNonFamilyModal,
        addNextOfKinModal,
        personalDetailResponse,
        personalServiceResponse,
        // personalSalaryResponse,
        personalMedicalAssessmentResponse,
        personalActivityList,
        personalFamilyList,
        personalDependencyList,
        personalNextOfKinList,
        param,
        personalAgendaResponse,
        personalAgendaList,
        personalSalaryAllowanceResponse,
        personalSalaryAllowanceList,
    };
};

export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);

    const response: CommonResponseDTO =
        await ProfileService.getEmployeeAgenda(param);

    loadingState.set(false);

    return {
        props: {
            param,
            response,
        },
    };
}

export async function _updateSalaryAllowanceTable(param: CommonListRequestDTO) {
    loadingState.set(true);

    const response: CommonResponseDTO =
        await ProfileService.getPersonalSalaryAllowance(param);

    loadingState.set(false);

    return {
        props: {
            param,
            response,
        },
    };
}

//==================================================
//=============== Maklumat Kontrak =================
//==================================================

export const _submitFormstepperkontrak = async (formData: object) => {
    const form = await superValidate(formData, _stepperkontrak);

    if (!form.valid) {
        getErrorToast();
        console.log(form);
        return fail(400, form);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    return { form };
};

//==================================================
//=============== Maklumat Peribadi ================
//==================================================
export const _submitFormStepperMaklumatPeribadi = async (formData: object) => {
    const form = await superValidate(formData, _stepperMaklumatPeribadi);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await ProfileService.editPersonalDetail(
        form.data as PutPersonalDetailRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast();
    invalidateAll();
    return { form };
};

//==================================================
//=============== Create Academic ================
//==================================================
export const _submitCreateAcademicForm = async (formData: object) => {
    const form = await superValidate(formData, _addAcademicInfoSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await ProfileService.createAcademicDetail(
            form.data as PostPersonalAcademicRequest,
        ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
    }
    // if success toast
    getSuccessToast();
    invalidateAll();
    return { form };
};

export const _submitCreateExperienceForm = async (formData: object) => {
    const form = await superValidate(formData, _addExperienceInfoSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await ProfileService.createExperienceDetail(
            form.data as PostPersonalExperiencesRequest,
        ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
    }
    // if success toast
    getSuccessToast();
    invalidateAll();
    return { form };
};

export const _submitCreateActivityForm = async (formData: object) => {
    const form = await superValidate(formData, _addActivityModalSchema);

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await ProfileService.createActivityDetail(
            form.data as PostPersonalActivityRequest,
        ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
    }
    // if success toast
    getSuccessToast();
    invalidateAll();

    return { form };
};

export const _submitCreateFamilyForm = async (formData: object) => {
    const form = await superValidate(formData, _addRelationModalSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await ProfileService.createFamilyDetail(
        form.data as PostPersonalFamilyRequest,
    ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
    }
    // if success toast
    getSuccessToast();
    invalidateAll();
    return { form };
};
export const _submitCreateDependencyForm = async (formData: object) => {
    const form = await superValidate(formData, _addRelationModalSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await ProfileService.createDependencyDetail(
            form.data as PostPersonalDependentRequest,
        ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
    }
    // if success toast
    getSuccessToast();
    invalidateAll();
    return { form };
};

export const _submitCreateNextOfKinForm = async (formData: object) => {
    const form = await superValidate(formData, _addRelationModalSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await ProfileService.createNextOfKinDetail(
            form.data as PostPersonalNextOfKinRequest,
        ).finally(() => toast.dismiss());

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
    }
    // if success toast
    getSuccessToast();
    invalidateAll();
    return { form };
};

//==================================================
//=============== Maklumat Perkhidmatan ============
//==================================================

export const _submitFormStepperMaklumatPerkhidmatan = async (
    formData: object,
) => {
    const stepperMaklumatPerkhidmatan = await superValidate(
        formData,
        _stepperMaklumatPerkhidmatan,
    );

    if (!stepperMaklumatPerkhidmatan.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatPerkhidmatan);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(stepperMaklumatPerkhidmatan),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    return { stepperMaklumatPerkhidmatan };
};

//==================================================
//=============== Maklumat Akademik ================
//==================================================

export const _submitFormStepperMaklumatAkademik = async (formData: object) => {
    const stepperMaklumatAkademik = await superValidate(
        formData,
        _stepperMaklumatAkademik,
    );

    if (!stepperMaklumatAkademik.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatAkademik);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(stepperMaklumatAkademik),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    return { stepperMaklumatAkademik };
};

//==================================================
//============= Maklumat Pengalaman ================
//==================================================

export const _submitFormStepperMaklumatPengalaman = async (
    formData: object,
) => {
    const stepperMaklumatPengalaman = await superValidate(
        formData,
        _stepperMaklumatPengalaman,
    );

    if (!stepperMaklumatPengalaman.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatPengalaman);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(stepperMaklumatPengalaman),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    return { stepperMaklumatPengalaman };
};

//==================================================
//=============== Maklumat Waris ===================
//==================================================

export const _submitFormStepperMaklumatWaris = async (formData: object) => {
    const stepperMaklumatWaris = await superValidate(
        formData,
        _stepperMaklumatWaris,
    );

    if (!stepperMaklumatWaris.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatWaris);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(stepperMaklumatWaris),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    return { stepperMaklumatWaris };
};

//==================================================
//=============== Rekod Kesihatan ==================
//==================================================

//==================================================
//=============== Sejarah Penyakit =================
//==================================================

export const _submitFormStepperSejarahPenyakit = async (formData: object) => {
    const stepperSejarahPenyakit = await superValidate(
        formData,
        _stepperSejarahPenyakit,
    );

    if (!stepperSejarahPenyakit.valid) {
        getErrorToast();
        return fail(400, stepperSejarahPenyakit);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(stepperSejarahPenyakit),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    return { stepperSejarahPenyakit };
};

//==================================================
//=============== Pemeriksaan Doktor ===============
//==================================================

export const _submitFormStepperPemeriksaanDoktor = async (formData: object) => {
    const stepperPemeriksaanDoktor = await superValidate(
        formData,
        _stepperPemeriksaanDoktor,
    );

    if (!stepperPemeriksaanDoktor.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        console.log(stepperPemeriksaanDoktor);
        return fail(400, stepperPemeriksaanDoktor);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperPemeriksaanDoktor),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: 1-54', json);
            });
    }
    return { stepperPemeriksaanDoktor };
};

export const _submitAddMoreAcademicForm = async (formData: object) => {
    const form = await superValidate(formData, _addRelationModalSchema);

    console.log('Request: ', form.data);
    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // const responsePromise = api
    //     .post('https://jsonplaceholder.typicode.com/posts', {
    //         body: JSON.stringify(form),
    //         prefixUrl: '',
    //     })
    //     .json();

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

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
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    const response = await responsePromise;

    return { response };
};
