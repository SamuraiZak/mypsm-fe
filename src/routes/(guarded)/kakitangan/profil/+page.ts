// import { goto } from '$app/navigation';
import api from '$lib/services/core/ky.service.js';
import { error, fail } from '@sveltejs/kit';
// import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
// import type { RequestEvent } from '../../../../$types.js';
// import { ZodError, z } from 'zod';

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

   export const _stepperMaklumatPeribadi = z.object({
        radioButtonExample: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),

        statusPekerjaan: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        isInRelationshipWithLKIMStaff: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        warnaKadPengenalan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        warganegara: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        tempatLahir: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        bangsa: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        agama: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        status: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        jantina: z.enum(['1', '2'], {
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

   export const _stepperMaklumatPerkhidmatan = z.object({
        faedahPersaraanPerkhidmatan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),

        gredSemasa: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        jawatan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        penempatan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        tarafPerkhidmatan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        bulanKGT: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

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

   export const _stepperMaklumatAkademik = z.object({
        sekolah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tahunHabis: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
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
    //================== stepper 4 =============================
    //==========================================================

    const stepper4 = z.object({
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
    //================== stepper 8 =============================
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

    const stepper8 = z.object({
        warnaKP: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        hubunganWaris: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),

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

    tarikhMulaKontrak: dateKontrakMax.refine((date)=> date.toLocaleDateString()),
    tarikhTamatKontrak: dateKontrak.refine((date)=> date.toLocaleDateString()),
    tarikhLaporDiri: dateKontrakMax.refine((date)=> date.toLocaleDateString()),
});

// New Employment - Approver Result section
export const _approverResultSchema = z.object({
    halo: longTextSchema,
    // approverResult: z.enum(['true', 'false'], {
    //     errorMap: (issue, { defaultError }) => ({
    //         message:
    //             issue.code === 'invalid_enum_value'
    //                 ? 'Sila tetapkan pilihan anda.'
    //                 : defaultError,
    //     }),
    // }),
});



//=====================================================
//=====================================================
//=====================================================

export const load = async ({}) => {
    // const id = parseInt(params.id);

    const stepperMaklumatPeribadi = await superValidate(_stepperMaklumatPeribadi);
    const stepperMaklumatPerkhidmatan = await superValidate(_stepperMaklumatPerkhidmatan);
    const form = await superValidate(_stepperkontrak);

    return { form,stepperMaklumatPeribadi,stepperMaklumatPerkhidmatan,_stepperMaklumatAkademik };
};

export const _submitFormstepperkontrak = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const form = await superValidate(formData, _stepperkontrak);

    console.log(formData.get('tarikhMulaKontrak'));


    return { form };
};

export const _submitFormStepperMaklumatPeribadi = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const stepperMaklumatPeribadi = await superValidate(formData, _stepperMaklumatPeribadi);

    console.log(formData.get('tarikhMulaKontrak'));


    return { stepperMaklumatPeribadi };
};

export const _submitFormStepperMaklumatPerkhidmatan = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const stepperMaklumatPerkhidmatan = await superValidate(formData, _stepperMaklumatPerkhidmatan);

    console.log(formData.get('tarikhMulaKontrak'));


    return { stepperMaklumatPerkhidmatan };
};

export const _submitFormStepperMaklumatAkademik = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const stepperMaklumatPerkhidmatan = await superValidate(formData, _stepperMaklumatAkademik);

    console.log(formData.get('tarikhMulaKontrak'));


    return { stepperMaklumatPerkhidmatan };
};
