import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { error, fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import  type { PutPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-response.modal.js';
import type { PutPersonalDetailRequest } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-request.modal';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { GetPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-get-personal-detail-response.modal';

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

    const shortTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
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

    const numberIdSchema = z.coerce
    .number({
        required_error: 'Tidak tepat.',
        invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
    })
    .min(12, { message: 'Kurang daripada 12 angka mengikut ID Malaysia' });

    const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });




// =========================================================================
// =========================Maklumat Peribadi===============================
// =========================================================================

//==========================================================
//===============Maklumat Peribadi =========================
//==========================================================

// date common schema stepper 1

const dateStepper1 = z.coerce
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
// Dropdown schema maklumat Peribadi
const maklumatPeribadiSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperMaklumatPeribadi = z.object({
    isExPolice: booleanSchema,

    statusPekerjaan: maklumatPeribadiSelectSchema,
    icColour: maklumatPeribadiSelectSchema,
    birthplace: maklumatPeribadiSelectSchema,
    nationality: maklumatPeribadiSelectSchema,
    race: maklumatPeribadiSelectSchema,
    religion: maklumatPeribadiSelectSchema,
    marital: maklumatPeribadiSelectSchema,
    gender: maklumatPeribadiSelectSchema,

    employeeNumber: shortTextSchema,
    identityCardNumber: shortTextSchema,
    fullName: shortTextSchema,
    alternativeName: shortTextSchema,
    email: shortTextSchema,
    noPekerjaPasangan: shortTextSchema,
    namaPasangan: shortTextSchema,
    homeAddress: shortTextSchema,
    mailAddress: shortTextSchema,
    houseLoan: shortTextSchema,
    houseLoanType: shortTextSchema,

    birthDate: dateStepper1,

    isRelatedToLKIM: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }),

    jawatanPasangan: z.optional(
        z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
    ),
    hubungan: z.optional(
        z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
    ),
});

//==========================================================
//=============Maklumat Perkhdmatan ========================
//==========================================================

const dateStepper2 = z.coerce
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

const dateStepper2max = z.coerce
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

const maklumatPerkhidmatanSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperMaklumatPerkhidmatan = z.object({
    faedahPersaraanPerkhidmatan:booleanSchema,

    currentGrade: maklumatPerkhidmatanSelectSchema,
    currentPosition: maklumatPerkhidmatanSelectSchema,
    placement: maklumatPerkhidmatanSelectSchema,
    serviceType: maklumatPerkhidmatanSelectSchema,
    bulanKGT: maklumatPerkhidmatanSelectSchema,

    EPFNumber: shortTextSchema,
    SOCSO: shortTextSchema,
    taxIncome: shortTextSchema,
    bankName: shortTextSchema,
    accountNumber: shortTextSchema,
    tarikhBerkuatKuasa: shortTextSchema,
    salaryMovementMonth: shortTextSchema,
    baseSalary: shortTextSchema,
    ITKA: shortTextSchema,
    ITP: shortTextSchema,
    EPW: shortTextSchema,
    COLA: shortTextSchema,
    kelayakanCuti: shortTextSchema,

    civilServiceStartDate: dateStepper2max,
    firstEffectiveDate: dateStepper2max,
    confirmServiceDate: dateStepper2max,
    tarikhKelulusanPercantumanPerkhidmatanLepas: dateStepper2max,
    retirementDate: dateStepper2,
    tarikhKuatkuasaLantikanSemasa: dateStepper2max,
    actingDate: dateStepper2,
    interimDate: dateStepper2,
    lastSalaryRaiseDate: dateStepper2,
    kenaikanPangkatAkhir: dateStepper2,
});

//==========================================================
//================== Maklumat Akademik =====================
//==========================================================

export const _stepperMaklumatAkademik = z.object({
    primarySchool: shortTextSchema,
    primaryYearFinished: shortTextSchema,
    primaryGred: shortTextSchema,
    highSchool: shortTextSchema,
    highSchoolYearFinished: shortTextSchema,
    highSchoolGred: shortTextSchema,
    higherLevelEdu: shortTextSchema,
    higherLevelEduYearFinished: shortTextSchema,
    higherLevelEduGred: shortTextSchema,
    higherLevelEduCourse: shortTextSchema,
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _stepperMaklumatPengalaman = z.object({
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: shortTextSchema,
    duration: shortTextSchema,
    salary: shortTextSchema,
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

const maklumatWarisSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperMaklumatWaris = z.object({
    warnaKP: maklumatWarisSelectSchema,
    hubunganWaris: maklumatWarisSelectSchema,

    namaWaris: shortTextSchema,
    noKP: shortTextSchema,
    telefonRumah: shortTextSchema,
    telefonPeribadi: shortTextSchema,
    pekerjaanWaris: shortTextSchema,
    namaMajikanWaris: shortTextSchema,
    alamatMajikanWaris: shortTextSchema,

    tarikhLahirWaris: dateStepper8,
    tarikhKahwin: dateStepper8,
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

export const _stepperSejarahPenyakit = z.object({
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
});

//==========================================================
//============== stepper Pemeriksaan Doktor ================
//==========================================================

const pemeriksaanDoktorSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperPemeriksaanDoktor = z.object({
    sistemMuskuloskeletalRadio: pemeriksaanDoktorSelectSchema,
    kulitPucat: pemeriksaanDoktorSelectSchema,
    sianosis: pemeriksaanDoktorSelectSchema,
    edama: pemeriksaanDoktorSelectSchema,
    penyakitKuning: pemeriksaanDoktorSelectSchema,
    kelenjarLimfa: pemeriksaanDoktorSelectSchema,
    penyakitKulit: pemeriksaanDoktorSelectSchema,
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
    gula: pemeriksaanDoktorSelectSchema,
    albumin: pemeriksaanDoktorSelectSchema,

    tinggi: shortTextSchema,
    berat: shortTextSchema,
    bmi: shortTextSchema,
    denyutanNadi: shortTextSchema,
    bp: shortTextSchema,
    penglihatanTanpaBantuan: shortTextSchema,
    penglihatanTanpaBantuan2: shortTextSchema.nullable(),
    penglihatanTanpaBantuan3: shortTextSchema.nullable(),
    penglihatanTanpaBantuan4: shortTextSchema.nullable(),
    penglihatanTanpaBantuan5: shortTextSchema.nullable(),
    penglihatanTanpaBantuan6: shortTextSchema.nullable(),
    penglihatanDenganBantuan: shortTextSchema,
    penglihatanDenganBantuan2: shortTextSchema.nullable(),
    penglihatanDenganBantuan3: shortTextSchema.nullable(),
    funduskopi: shortTextSchema.nullable(),
    penglihatanWarna: shortTextSchema.nullable(),
    telinga: shortTextSchema.nullable(),
    ronggaGigiMulut: shortTextSchema.nullable(),
    leher: shortTextSchema.nullable(),
    kardiovaskular: shortTextSchema.nullable(),
    pemeriksaan: shortTextSchema.nullable(),
    xray: shortTextSchema.nullable(),
    tarikhPengambilanXray: shortTextSchema,
    lokasiPengambilanXray: shortTextSchema,
    nomborRujukanXray: shortTextSchema,
    abdomenHernia: shortTextSchema.nullable(),
    sistemSaraf: shortTextSchema.nullable(),
    sistemMuskuloskeletal: shortTextSchema.nullable(),
    mikroskopi: shortTextSchema,

});
//==========================================================
//================== Makluma tAkademik Modal ===================
//==========================================================

// New employment - add academic section
export const _addAcademicInfoSchema = z.object({
    title: shortTextSchema,
    institution: shortTextSchema,
    year: shortTextSchema,
    achievement: shortTextSchema,
    remarks: longTextSchema,
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
//================== Maklumat Keluarga Modal ===================
//==========================================================

export const _addFamilyModalSchema = z.object({
    addName: shortTextSchema,
    addIdentityDocumentNumber: numberIdSchema,
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
    addNonFamilyIdentityDocumentNumber: numberIdSchema,
    addNonFamilyGender: generalSelectSchema,
    addNonFamilyRelationship: generalSelectSchema,
    addNonFamilyOccupation: shortTextSchema.nullish(),
    addNonFamilyIsInSchool: booleanSchema,
});
//==========================================================
//================== Add Maklumat Waris ========================
//==========================================================
export const _addNextOfKinInfoSchema = z.object({
    addNextOfKinName: shortTextSchema,
    addNextOfKinIdentityDocumentNumber: numberIdSchema,
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

// =========================================================================
// =========================Maklumat Kontrak================================
// =========================================================================
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


    // const personalDetailResponse: GetPersonalDetailResponse =
    // await EmployeeService.ProfileDetail(PutPersonalDetailRequest);
    // const personalDetailResponse.data.


    // const id = parseInt(params.id);
    const stepperMaklumatPeribadi = await superValidate(
        _stepperMaklumatPeribadi,
    );
    const stepperMaklumatPerkhidmatan = await superValidate(
        _stepperMaklumatPerkhidmatan,
    );
    const form = await superValidate(_stepperkontrak);
    const stepperMaklumatAkademik = await superValidate(
        _stepperMaklumatAkademik,
    );
    const stepperMaklumatPengalaman = await superValidate(
        _stepperMaklumatPengalaman,
    );
    const stepperMaklumatWaris = await superValidate(_stepperMaklumatWaris);

    const stepperSejarahPenyakit = await superValidate(_stepperSejarahPenyakit);

    const stepperPemeriksaanDoktor = await superValidate(
        _stepperPemeriksaanDoktor,
    );
    const addAcademicModal = await superValidate(_addAcademicInfoSchema);
    const addExperienceModal = await superValidate(_addExperienceModalSchema);
    const addActivityModal = await superValidate(_addActivityModalSchema);
    const addFamilyModal = await superValidate(_addFamilyModalSchema);
    const addNonFamilyModal = await superValidate(_addNonFamilyModalSchema);
    const addNextOfKinModal = await superValidate(_addNextOfKinInfoSchema);

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
    };
};

//==================================================
//=============== Maklumat Kontrak =================
//==================================================

export const _submitFormstepperkontrak = async (formData: Object) => {
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
export const _submitFormStepperMaklumatPeribadi = async (formData: Object) => {
    const form = await superValidate(formData, _stepperMaklumatPeribadi);

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

    return { form };
};

//==================================================
//=============== Maklumat Perkhidmatan ============
//==================================================

export const _submitFormStepperMaklumatPerkhidmatan = async (
    formData: Object,
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

export const _submitFormStepperMaklumatAkademik = async (formData: Object) => {
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
    formData: Object,
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

export const _submitFormStepperMaklumatWaris = async (formData: Object) => {
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

export const _submitFormStepperSejarahPenyakit = async (formData: Object) => {
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
    const form = await superValidate(formData, _addAcademicInfoSchema);

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
