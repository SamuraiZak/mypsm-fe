import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/toast/toast-service';
import { error, fail } from '@sveltejs/kit';

//=======================================================================
//=========== General Form Schema =======================================
//=======================================================================

//==================================================
//=========== Bantuan Pakaian Istiadat =============
//==================================================

const GeneralTextSchema = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

    const GeneralTextSchemaDay = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 1 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();


const dateScheme = z.coerce
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


const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });

export const _stepperBantuanPakaianIstiadat = z.object({
    tujuanPermohonan: GeneralTextSchema,
    sendiri: GeneralTextSchema,
    pasangan: GeneralTextSchema,
});

export const _stepperBantuanPakaianPanas = z.object({
    tujuanPermohonan: GeneralTextSchema,
    jumlahTuntutan: GeneralTextSchema,

});

export const _stepperBantuanMengurusJenazah = z.object({
    masaMeninggal: GeneralTextSchema,
    tarikhMeninggal: dateScheme,

});
export const _stepperTambangMengungjungiWilayahAsal = z.object({
    wilayahAsal: GeneralTextSchema,
    memohonUntuk:generalSelectSchema,
});

export const _stepperTabungKebajikanKakitangan = z.object({
    jenisSumbangan:generalSelectSchema,


});

export const _stepperPerpindahanRumah = z.object({
    tarikhPindahRumah:dateScheme,
    alamatRumahLama:GeneralTextSchema,
    alamatRumahBaru:GeneralTextSchema,


});

export const _stepperPembayaranBalikPassport = z.object({
    tarikhPembaharuan:dateScheme,
    tujuan:GeneralTextSchema,

});

export const _stepperInsuransKesihatan = z.object({
    tarikhPerjalanan:dateScheme,
    sehinggaTarikh:dateScheme,
    kawasan:generalSelectSchema,
    tujuan:GeneralTextSchema,
    bilanganHari:GeneralTextSchemaDay,

});

export const _stepperBayaranBalikPengangkutanBaranganMelaluiJalanLaut = z.object({
    tarikhPerjalanan:dateScheme,
    sehinggaTarikh:dateScheme,
    bilanganHari:GeneralTextSchemaDay,
    tempatPermulaan:GeneralTextSchema,
    tempatPenamatan:GeneralTextSchema,
    anggaranJarak:GeneralTextSchema,
    tujuan:GeneralTextSchema,


});

export const _addMaklumatKeluargaInfoSchema = z.object({
    namaKeluarga: GeneralTextSchemaDay,
    umurKeluarga: GeneralTextSchemaDay,
    hubunganKeluarga: GeneralTextSchemaDay,

});


// =======================================================================
// ====================== Load Function ==================================
// =======================================================================

// =====================================================
// ======= Stepper Butiran Pemohonan Elaun =============
// =====================================================

export const load = async ({fetch}) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();

    const bantuanPakaianIstiadatForm = await superValidate( userData,
        _stepperBantuanPakaianIstiadat
    )
    const bantuanPakaianPanasForm = await superValidate( userData,
        _stepperBantuanPakaianPanas
    )
    const bantuanMengurusJenazahForm = await superValidate( userData,
        _stepperBantuanMengurusJenazah
    )

    const TambangMengungjungiWilayahAsalForm = await superValidate( userData,
        _stepperTambangMengungjungiWilayahAsal
    )
    const TabungKebajikanKakitanganForm = await superValidate( userData,
        _stepperTabungKebajikanKakitangan
    )
    const perpindahanRumahForm = await superValidate( userData,
        _stepperPerpindahanRumah
    )
    const pembayaranBalikPassportForm = await superValidate( userData,
        _stepperPembayaranBalikPassport
    )
    const insuransKesihatanForm = await superValidate( userData,
        _stepperInsuransKesihatan
    )

    const bayaranBalikPengangkutanBaranganMelaluiJalanLautForm = await superValidate( userData,
        _stepperBayaranBalikPengangkutanBaranganMelaluiJalanLaut
    )

    const MaklumatKeluargaForm = await superValidate( userData,
        _addMaklumatKeluargaInfoSchema
    )





    return {
        bantuanPakaianIstiadatForm,
        bantuanPakaianPanasForm,
        bantuanMengurusJenazahForm,
        TambangMengungjungiWilayahAsalForm,
        TabungKebajikanKakitanganForm,
        perpindahanRumahForm,
        pembayaranBalikPassportForm,
        insuransKesihatanForm,
        bayaranBalikPengangkutanBaranganMelaluiJalanLautForm,
        MaklumatKeluargaForm,

    };

};


//=======================================================================
//====================== Function =======================================
//=======================================================================

//sigek sigek

//==================================================
//=========== Bantuan Pakaian Istiadat =============
//==================================================


export const _submitPakaianIstiadatForm = async (formData: Object) => {
    const bantuanPakaianIstiadatForm = await superValidate(formData, _stepperBantuanPakaianIstiadat);

    if (!bantuanPakaianIstiadatForm.valid) {
        getErrorToast();
        return fail(400, bantuanPakaianIstiadatForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(bantuanPakaianIstiadatForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { bantuanPakaianIstiadatForm };
};

//==================================================
//=========== Bantuan Pakaian Panas ================
//==================================================

export const _submitPakaianPanasForm = async (formData: Object) => {
    const bantuanPakaianPanasForm = await superValidate(formData, _stepperBantuanPakaianPanas);

    if (!bantuanPakaianPanasForm.valid) {
        getErrorToast();
        return fail(400, bantuanPakaianPanasForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(bantuanPakaianPanasForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { bantuanPakaianPanasForm };
};

//==================================================
//=========== Bantuan Mengurus Jenazah =============
//==================================================

export const _submitMengurusJenazahForm = async (formData: Object) => {
    const bantuanMengurusJenazahForm = await superValidate(formData, _stepperBantuanMengurusJenazah);

    if (!bantuanMengurusJenazahForm.valid) {
        getErrorToast();
        return fail(400, bantuanMengurusJenazahForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(bantuanMengurusJenazahForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { bantuanMengurusJenazahForm };
};

//==================================================
//======= Tambang Mengungjungi Wilayah Asal ========
//==================================================

export const _submitTambangMengungjungiWilayahAsalForm = async (formData: Object) => {
    const TambangMengungjungiWilayahAsalForm = await superValidate(formData, _stepperTambangMengungjungiWilayahAsal);

    if (!TambangMengungjungiWilayahAsalForm.valid) {
        getErrorToast();
        console.log (TambangMengungjungiWilayahAsalForm)
        return fail(400, TambangMengungjungiWilayahAsalForm);

    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(TambangMengungjungiWilayahAsalForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { TambangMengungjungiWilayahAsalForm };
};

//==================================================
//======= Tambang Kebajikan Kakitangan =============
//==================================================

export const _submitTabungKebajikanKakitanganForm = async (formData: Object) => {
    const TabungKebajikanKakitanganForm = await superValidate(formData, _stepperTabungKebajikanKakitangan);

    if (!TabungKebajikanKakitanganForm.valid) {
        getErrorToast();
        return fail(400, TabungKebajikanKakitanganForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(TabungKebajikanKakitanganForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { TabungKebajikanKakitanganForm };
};

//==================================================
//============= Perpindahan Rumah ==================
//==================================================

export const _submitPerpindahanRumahForm = async (formData: Object) => {
    const perpindahanRumahForm = await superValidate(formData, _stepperPerpindahanRumah);

    if (!perpindahanRumahForm.valid) {
        getErrorToast();
        return fail(400, perpindahanRumahForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(perpindahanRumahForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { perpindahanRumahForm };
};

//==================================================
//=========== Pembayaran Balik Passport ============
//==================================================

export const _submitPembayaranBalikPassportForm = async (formData: Object) => {
    const pembayaranBalikPassportForm = await superValidate(formData, _stepperPembayaranBalikPassport);

    if (!pembayaranBalikPassportForm.valid) {
        getErrorToast();
        return fail(400, pembayaranBalikPassportForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(pembayaranBalikPassportForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { pembayaranBalikPassportForm };
};

//==================================================
//=========== Pembayaran Balik Passport ============
//==================================================

export const _submitInsuransKesihatanForm = async (formData: Object) => {
    const insuransKesihatanForm = await superValidate(formData, _stepperInsuransKesihatan);

    if (!insuransKesihatanForm.valid) {
        getErrorToast();
        return fail(400, insuransKesihatanForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(insuransKesihatanForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { insuransKesihatanForm };
};

//===========================================================
//bayaran Balik Pengangkutan Barangan Melalui JalanLaut Form
//===========================================================

export const _submitBayaranBalikPengangkutanBaranganMelaluiJalanLautForm = async (formData: Object) => {
    const BayaranBalikPengangkutanBaranganMelaluiJalanLautForm = await superValidate(formData, _stepperBayaranBalikPengangkutanBaranganMelaluiJalanLaut);

    if (!BayaranBalikPengangkutanBaranganMelaluiJalanLautForm.valid) {
        getErrorToast();
        return fail(400, BayaranBalikPengangkutanBaranganMelaluiJalanLautForm);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(BayaranBalikPengangkutanBaranganMelaluiJalanLautForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)



    return { BayaranBalikPengangkutanBaranganMelaluiJalanLautForm };
};


export const _submitAddMoreMaklumatKeluargaForm = async (formData: object) => {
    const addMaklumatKeluargaModalForm = await superValidate(formData, _addMaklumatKeluargaInfoSchema);

    console.log('Request: ', addMaklumatKeluargaModalForm.data);
    if (!addMaklumatKeluargaModalForm.valid) {
        getErrorToast();
        return fail(400, addMaklumatKeluargaModalForm);
    }

    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(addMaklumatKeluargaModalForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);

    const response = await responsePromise;

    return { response };
};

