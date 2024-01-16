import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/toast/toast-service';
import { error, fail } from '@sveltejs/kit';

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
    bekasPolisTentera: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),

    statusPekerjaan: maklumatPeribadiSelectSchema,
    warnaKadPengenalan: maklumatPeribadiSelectSchema,
    tempatLahir: maklumatPeribadiSelectSchema,
    warganegara: maklumatPeribadiSelectSchema,
    bangsa: maklumatPeribadiSelectSchema,
    agama: maklumatPeribadiSelectSchema,
    status: maklumatPeribadiSelectSchema,
    jantina: maklumatPeribadiSelectSchema,

    isInRelationshipWithLKIMStaff: z.enum(['true', 'false'], {
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

    noPekerja: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noKadPengenalan: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    namaPenuh: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    namaLain: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    emel: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noPekerjaPasangan: z.optional(
        z
            .string({
                required_error: 'Medan ini latihan tidak boleh kosong.',
            })
            .min(1, {
                message: 'Medan ini hendaklah lebih daripada  karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    ),
    namaPasangan: z.optional(
        z
            .string({
                required_error: 'Medan ini latihan tidak boleh kosong.',
            })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    ),

    tarikhLahir: dateStepper1,

    longTextExample: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    alamatRumah: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    alamatSuratMenyurat: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
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
    faedahPersaraanPerkhidmatan: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),

    gredSemasa: maklumatPerkhidmatanSelectSchema,
    jawatan: maklumatPerkhidmatanSelectSchema,
    penempatan: maklumatPerkhidmatanSelectSchema,
    tarafPerkhidmatan: maklumatPerkhidmatanSelectSchema,
    bulanKGT: maklumatPerkhidmatanSelectSchema,

    noKWSP: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noSOCSO: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noCukai: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    bank: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noAkaun: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    tarikhBerkuatKuasa: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    tanggaGaji: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    gajiPokok: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    itka: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    itp: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    epw: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    cola: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    kelayakanCuti: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah lebih daripada 1 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    mulaDilantikPerkhidmatanKerajaan: dateStepper2max,
    mulaDilantikPerkhidmatanLKIM: dateStepper2max,
    disahkanDalamJawatanSemasaLKIM: dateStepper2max,
    tarikhKelulusanPercantumanPerkhidmatanLepas: dateStepper2max,
    tarikhBersara: dateStepper2,
    tarikhKuatkuasaLantikanSemasa: dateStepper2max,
    pemangkuanSekarang: dateStepper2,
    tanggungKerjaSekarang: dateStepper2,
    kenaikanGajiAkhir: dateStepper2,
    kenaikanPangkatAkhir: dateStepper2,
});

//==========================================================
//================== Maklumat Akademik =====================
//==========================================================

const generalTextSchema = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
export const _stepperMaklumatAkademik = z.object({
    sekolah: generalTextSchema,
    tahunHabis: generalTextSchema,

    gredSekolah: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    bidang: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
});
//==========================================================
//================== Maklumat Pengalaman ===================
//==========================================================

export const _stepperMaklumatPengalaman = z.object({
    namaMajikan: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    alamatMajikan: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    jawatanPengalaman: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    tempohPerkhidmatan: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    gajiPengalaman: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
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

    namaWaris: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noKP: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    telefonRumah: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    telefonPeribadi: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    pekerjaanWaris: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    namaMajikanWaris: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    alamatMajikanWaris: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

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

        penyakitSejakLahir: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah diisi .',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        alahan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        sakitJiwa: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        epilepsi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        darahTinggi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kencingManis: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        jantungAtatuSalurDarah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        asma: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        sakitBuahPinggang: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        barah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        batukKering: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        ketagihanDadah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        AIDS: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        hepatitisB: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        sejarahPembedahan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kecacatan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        merokok: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        penyakitSeriusLain: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        sedangMenerimaRawatan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
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

        tinggi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(2, {
                message: 'Medan ini hendaklah lebih daripada 2 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        berat: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah lebih daripada 1 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        bmi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah lebih daripada 1 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        denyutanNadi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah lebih daripada 1 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        bp: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah lebih daripada 1 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        penglihatanTanpaBantuan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanTanpaBantuan2: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanTanpaBantuan3: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanTanpaBantuan4: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanTanpaBantuan5: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanTanpaBantuan6: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        penglihatanDenganBantuan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanDenganBantuan2: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            penglihatanDenganBantuan3: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        penglihatanWarna: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        funduskopi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        telinga: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        ronggaGigiMulut: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        leher: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kardiovaskular: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        pemeriksaan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        xray: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tarikhPengambilanXray: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        lokasiPengambilanXray: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        nomborRujukanXray: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        abdomenHernia: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        sistemSaraf: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            sistemMuskuloskeletal: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
            mikroskopi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
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
    ID: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah lebih daripada 1 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    emel: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    tempohKontrak: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah diisi.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    kadarUpah: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(0, {
            message: 'Medan ini hendaklah diisi.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    penempatan: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah diisi.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    gelaranTugas: z
        .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        .min(1, {
            message: 'Medan ini hendaklah diisi.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),

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

    const stepperPemeriksaanDoktor = await superValidate(_stepperPemeriksaanDoktor);



    return {
        form,
        stepperMaklumatPeribadi,
        stepperMaklumatPerkhidmatan,
        stepperMaklumatAkademik,
        stepperMaklumatPengalaman,
        stepperMaklumatWaris,
        stepperSejarahPenyakit,
        stepperPemeriksaanDoktor,
    };
};


//==================================================
//=============== Maklumat Kontrak =================
//==================================================


export const _submitFormstepperkontrak = async (formData: Object) => {
    const form = await superValidate(formData, _stepperkontrak);

    if (!form.valid) {
        getErrorToast();
        console.log (form);
        return fail(400, form);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

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


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

    return { form };
};

//==================================================
//=============== Maklumat Perkhidmatan ============
//==================================================

export const _submitFormStepperMaklumatPerkhidmatan = async (formData: Object) => {
    const stepperMaklumatPerkhidmatan = await superValidate(formData, _stepperMaklumatPerkhidmatan);

    if (!stepperMaklumatPerkhidmatan.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatPerkhidmatan);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(stepperMaklumatPerkhidmatan),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

    return { stepperMaklumatPerkhidmatan };
};

//==================================================
//=============== Maklumat Akademik ================
//==================================================

export const _submitFormStepperMaklumatAkademik = async (formData: Object) => {
    const stepperMaklumatAkademik = await superValidate(formData, _stepperMaklumatAkademik);

    if (!stepperMaklumatAkademik.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatAkademik);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(stepperMaklumatAkademik),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

    return { stepperMaklumatAkademik };
};


//==================================================
//============= Maklumat Pengalaman ================
//==================================================

export const _submitFormStepperMaklumatPengalaman = async (formData: Object) => {
    const stepperMaklumatPengalaman = await superValidate(formData, _stepperMaklumatPengalaman);

    if (!stepperMaklumatPengalaman.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatPengalaman);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(stepperMaklumatPengalaman),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

    return { stepperMaklumatPengalaman };
};

//==================================================
//=============== Maklumat Waris ===================
//==================================================

export const _submitFormStepperMaklumatWaris = async (formData: Object) => {
    const stepperMaklumatWaris = await superValidate(formData, _stepperMaklumatWaris);

    if (!stepperMaklumatWaris.valid) {
        getErrorToast();
        return fail(400, stepperMaklumatWaris);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(stepperMaklumatWaris),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

    return { stepperMaklumatWaris };
};


//==================================================
//=============== Rekod Kesihatan ==================
//==================================================


//==================================================
//=============== Sejarah Penyakit =================
//==================================================

export const _submitFormStepperSejarahPenyakit = async (formData: Object) => {
    const stepperSejarahPenyakit = await superValidate(formData, _stepperSejarahPenyakit);

    if (!stepperSejarahPenyakit.valid) {
        getErrorToast();
        return fail(400, stepperSejarahPenyakit);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(stepperSejarahPenyakit),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

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
