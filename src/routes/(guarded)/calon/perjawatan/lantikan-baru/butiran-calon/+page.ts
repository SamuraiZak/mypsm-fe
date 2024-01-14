import api from '$lib/services/core/ky.service.js';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
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

// New employment - add academic section
export const _addAcademicInfoSchema = z.object({
    title: shortTextSchema,
    institution: shortTextSchema,
    year: shortTextSchema,
    achievement: shortTextSchema,
    remarks: longTextSchema,
});

export const _personalInfoForm = z
    .object({
        statusPekerjaan: generalSelectSchema,
        staffNumber: shortTextSchema,
        identityDocumentNumber: shortTextSchema,
        name: shortTextSchema,
        alternativeName: shortTextSchema,
        identityDocumentColor: generalSelectSchema,
        birthDate: maxDateSchema,
        birthPlace: generalSelectSchema,
        isMalaysia: generalSelectSchema,
        raceId: generalSelectSchema,
        religionId: generalSelectSchema,
        gender: generalSelectSchema,
        status: generalSelectSchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        homeAddress: shortTextSchema,
        mailAddress: shortTextSchema,
        isExPoliceOrSoldier: generalSelectSchema,
        isInternalRelationship: generalSelectSchema,
        employeeNumber: z.string(),
        employeeName: z.string(),
        employeePosition: z.string(),
        relationship: z.string(),
    })
    .superRefine(
        (
            {
                isInternalRelationship,
                // jawatanPasangan,
                // hubungan,
                // noPekerjaPasangan,
                // namaPasangan,
            },
            ctx,
        ) => {
            // const fieldsToCheck = [
            //     noPekerjaPasangan,
            //     namaPasangan,
            //     jawatanPasangan,
            //     hubungan,
            // ];
            if (isInternalRelationship === 'true') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Sila isi medan ini.`,
                    path: [
                        'employeeNumber',
                        'employeeName',
                        'employeePosition',
                        'relationship',
                    ],
                });
            }

            return true;
        },
    );

//==========================================================
//================== Maklumat Akademik =====================
//==========================================================

export const _academicInfoSchema = z.object({
    primarySchool: shortTextSchema.nullable(),
    primaryYearFinished: shortTextSchema.nullable(),
    primaryGred: shortTextSchema.nullable(),
    highSchool: shortTextSchema.nullable(),
    highSchoolYearFinished: shortTextSchema.nullable(),
    highSchoolGred: shortTextSchema.nullable(),
    higherLevelEdu: shortTextSchema.nullable(),
    higherLevelEduYearFinished: shortTextSchema.nullable(),
    higherLevelEduGred: shortTextSchema.nullable(),
    higherLevelEduCourse: shortTextSchema.nullable(),
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _experienceInfoSchema = z.object({
    namaMajikan: shortTextSchema,
    alamatMajikan: shortTextSchema,
    kodJawatan: shortTextSchema.nullable(),
    jawatanPengalaman: shortTextSchema,
    tempohPerkhidmatan: shortTextSchema,
    gajiPengalaman: z.coerce.number({
        invalid_type_error: 'Medan ini hendaklah ditetapkan dengan angka',
    }),
});

//==========================================================
//================== Maklumat Pengalaman Modal ===================
//==========================================================

export const _addExperienceModalSchema = z.object({
    companyName: shortTextSchema,
    companyAddress: shortTextSchema,
    positionCode: shortTextSchema.nullable(),
    position: shortTextSchema,
    servicePeriod: shortTextSchema,
    serviceSalary: z.coerce.number({
        invalid_type_error: 'Medan ini hendaklah ditetapkan dengan angka',
    }),
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

export const load = async () => {
    const personalInfoForm = await superValidate(_personalInfoForm);
    const academicInfoForm = await superValidate(_academicInfoSchema);
    const serviceInfoForm = await superValidate(_serviceInfoSchema);
    const experienceInfoForm = await superValidate(_experienceInfoSchema);
    const addAcademicModal = await superValidate(_addAcademicInfoSchema);
    const addExperienceModal = await superValidate(_addExperienceModalSchema);

    return {
        personalInfoForm,
        academicInfoForm,
        serviceInfoForm,
        experienceInfoForm,
        addAcademicModal,
        addExperienceModal,
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
