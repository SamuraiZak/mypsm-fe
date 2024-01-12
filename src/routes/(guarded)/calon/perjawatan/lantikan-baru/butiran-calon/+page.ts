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
        bekasPolisTentera: generalSelectSchema,
        statusPekerjaan: generalSelectSchema,
        warnaKadPengenalan: generalSelectSchema,
        warganegara: generalSelectSchema,
        tempatLahir: generalSelectSchema,
        bangsa: generalSelectSchema,
        agama: generalSelectSchema,
        status: generalSelectSchema,
        jantina: generalSelectSchema,
        noPekerja: shortTextSchema,
        noKadPengenalan: shortTextSchema,
        namaPenuh: shortTextSchema,
        namaLain: shortTextSchema,
        tarikhLahir: maxDateSchema,
        emel: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        alamatRumah: shortTextSchema,
        alamatSuratMenyurat: shortTextSchema,
        isInRelationshipWithLKIMStaff: generalSelectSchema,
        noPekerjaPasangan: z.string(),
        namaPasangan: z.string(),
        jawatanPasangan: z.string(),
        hubungan: z.string(),
    })
    .superRefine(
        (
            {
                isInRelationshipWithLKIMStaff,
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
            if (isInRelationshipWithLKIMStaff === 'true') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Sila isi medan ini.`,
                    path: [
                        'noPekerjaPasangan',
                        'namaPasangan',
                        'jawatanPasangan',
                        'hubungan',
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
    sekolah: shortTextSchema,
    tahunHabis: shortTextSchema,
    gredSekolah: shortTextSchema,
    bidang: shortTextSchema,
});

//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _experienceInfoSchema = z.object({
    namaMajikan: shortTextSchema,
    alamatMajikan: shortTextSchema,
    kodJawatan: shortTextSchema.nullable(),
    jawatanPengalaman: shortTextSchema,
    tempohPerkhidmatan: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    gajiPengalaman: shortTextSchema,
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

    const addAcademicInfoModal = await superValidate(_addAcademicInfoSchema);

    const serviceInfoForm = await superValidate(_serviceInfoSchema);
    const experienceInfoForm = await superValidate(_experienceInfoSchema);

    return {
        personalInfoForm,
        academicInfoForm,
        addAcademicInfoModal,
        serviceInfoForm,
        experienceInfoForm,
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
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);

    return { form };
};

export const _moreAcedemicInfo: unknown[] = [];

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

export const _submitExperienceInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _serviceInfoSchema);

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
