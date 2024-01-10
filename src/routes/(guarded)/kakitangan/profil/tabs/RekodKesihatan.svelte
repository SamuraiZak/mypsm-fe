<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import { z, ZodError } from 'zod';
    import toast, { Toaster } from 'svelte-french-toast';

    export let disabled: boolean = false;

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let radioValue: any = 'tidak';

    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Ya',
        },
        {
            value: 'false',
            label: 'Tidak',
        },
    ];

    let isNormal: string = 'true';

    const normalAbnormalOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'Normal',
        },
        {
            value: 'false',
            label: 'Abnormal',
        },
    ];

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists;

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;

    //==========================================================
    //============== stepper Sejarah Penyakit ==================
    //==========================================================

    const stepperSejarahPenyakit = z.object({
        penyakitSejakLahir: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi .',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        alahan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
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

        sendiriPenyakitSejakLahir: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaPenyakitSejakLahir: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriAlahan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaAlahan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriSakitJiwa: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaSakitJiwa: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriEpilepsi: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaEpilepsi: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriDarahTinggi: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaDarahTinggi: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriKencingManis: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaKencingManis: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriJantung: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaJantung: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriAsma: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaAsma: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriSakitBuahPinggang: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaSakitBuahPinggang: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriBarah: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaBarah: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriBatukKering: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaBatukKering: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriKetagihanDadah: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaKetagihanDadah: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriAIDS: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaAIDS: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriHepatitisB: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaHepatitisB: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriSejarahPembedahan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaSejarahPembedahan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriKecacatan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaKecacatan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriMerokok: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaMerokok: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriPenyakitSeriusLain: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaPenyakitSeriusLain: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sendiriSedangMenerimaRawatan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        keluargaSedangMenerimaRawatan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    //==========================================================
    //============== stepper Pemeriksaan Doktor ==================
    //==========================================================

    const stepperPemeriksaanDoktor = z.object({
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
        penglihatanDenganBantuan: z
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
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        kulitPucat: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sianosis: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        edama: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        penyakitKuning: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        kelenjarLimfa: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        penyakitKulit: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        penglihatanWarnaRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        funduskopiRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        telingaRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        ronggaGigiMulutRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        leherRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        kardiovaskularRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        pemeriksaanRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        xrayRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        abdomenHerniaRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sistemSarafRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        sistemMuskuloskeletalRadio: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        gula: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        albumin: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    //------------------------------------------------------>
    //---------Stepper Sejarah Penyakit--------------------->
    //------------------------------------------------------>

    const submitFormstepperSejarahPenyakit = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            penyakitSejakLahir: String(formData.get('penyakitSejakLahir')),
            alahan: String(formData.get('alahan')),
            sakitJiwa: String(formData.get('sakitJiwa')),
            epilepsi: String(formData.get('epilepsi')),
            darahTinggi: String(formData.get('darahTinggi')),
            kencingManis: String(formData.get('kencingManis')),
            jantungAtatuSalurDarah: String(
                formData.get('jantungAtatuSalurDarah'),
            ),
            asma: String(formData.get('asma')),
            sakitBuahPinggang: String(formData.get('sakitBuahPinggang')),
            barah: String(formData.get('barah')),
            batukKering: String(formData.get('batukKering')),
            ketagihanDadah: String(formData.get('ketagihanDadah')),
            AIDS: String(formData.get('AIDS')),
            hepatitisB: String(formData.get('hepatitisB')),
            sejarahPembedahan: String(formData.get('sejarahPembedahan')),
            kecacatan: String(formData.get('kecacatan')),
            merokok: String(formData.get('merokok')),
            penyakitSeriusLain: String(formData.get('penyakitSeriusLain')),
            sedangMenerimaRawatan: String(
                formData.get('sedangMenerimaRawatan'),
            ),

            sendiriPenyakitSejakLahir: String(
                formData.get('sendiriPenyakitSejakLahir'),
            ),
            keluargaPenyakitSejakLahir: String(
                formData.get('keluargaPenyakitSejakLahir'),
            ),
            sendiriAlahan: String(formData.get('sendiriAlahan')),
            keluargaAlahan: String(formData.get('keluargaAlahan')),
            sendiriSakitJiwa: String(formData.get('sendiriSakitJiwa')),
            keluargaSakitJiwa: String(formData.get('keluargaSakitJiwa')),
            sendiriEpilepsi: String(formData.get('sendiriEpilepsi')),
            keluargaEpilepsi: String(formData.get('keluargaEpilepsi')),
            sendiriDarahTinggi: String(formData.get('sendiriDarahTinggi')),
            keluargaDarahTinggi: String(formData.get('keluargaDarahTinggi')),
            sendiriKencingManis: String(formData.get('sendiriKencingManis')),
            keluargaKencingManis: String(formData.get('keluargaKencingManis')),
            sendiriJantung: String(formData.get('sendiriJantung')),
            keluargaJantung: String(formData.get('keluargaJantung')),
            sendiriAsma: String(formData.get('sendiriAsma')),
            keluargaAsma: String(formData.get('keluargaAsma')),
            sendiriSakitBuahPinggang: String(
                formData.get('sendiriSakitBuahPinggang'),
            ),
            keluargaSakitBuahPinggang: String(
                formData.get('keluargaSakitBuahPinggang'),
            ),
            sendiriBarah: String(formData.get('sendiriBarah')),
            keluargaBarah: String(formData.get('keluargaBarah')),
            sendiriBatukKering: String(formData.get('sendiriBatukKering')),
            keluargaBatukKering: String(formData.get('keluargaBatukKering')),
            sendiriKetagihanDadah: String(
                formData.get('sendiriKetagihanDadah'),
            ),
            keluargaKetagihanDadah: String(
                formData.get('keluargaKetagihanDadah'),
            ),
            sendiriAIDS: String(formData.get('sendiriAIDS')),
            keluargaAIDS: String(formData.get('keluargaAIDS')),
            sendiriHepatitisB: String(formData.get('sendiriHepatitisB')),
            keluargaHepatitisB: String(formData.get('keluargaHepatitisB')),
            sendiriSejarahPembedahan: String(
                formData.get('sendiriSejarahPembedahan'),
            ),
            keluargaSejarahPembedahan: String(
                formData.get('keluargaSejarahPembedahan'),
            ),
            sendiriKecacatan: String(formData.get('sendiriKecacatan')),
            keluargaKecacatan: String(formData.get('keluargaKecacatan')),
            sendiriMerokok: String(formData.get('sendiriMerokok')),
            keluargaMerokok: String(formData.get('keluargaMerokok')),
            sendiriPenyakitSeriusLain: String(
                formData.get('sendiriPenyakitSeriusLain'),
            ),
            keluargaPenyakitSeriusLain: String(
                formData.get('keluargaPenyakitSeriusLain'),
            ),
            sendiriSedangMenerimaRawatan: String(
                formData.get('sendiriSedangMenerimaRawatan'),
            ),
            keluargaSedangMenerimaRawatan: String(
                formData.get('keluargaSedangMenerimaRawatan'),
            ),
        };

        try {
            const result = stepperSejarahPenyakit.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };

    //------------------------------------------------------>
    //---------Stepper Pemeriksaan Doktor------------------->
    //------------------------------------------------------>

    const submitFormstepperPemeriksaanDoktor = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        

        const exampleFormData = {
            tinggi: String(formData.get('tinggi')),
            berat: String(formData.get('berat')),
            bmi: String(formData.get('bmi')),
            denyutanNadi: String(formData.get('denyutanNadi')),
            bp: String(formData.get('bp')),
            penglihatanTanpaBantuan: String(formData.get('penglihatanTanpaBantuan')),
            penglihatanDenganBantuan: String(formData.get('penglihatanDenganBantuan')),
            penglihatanWarna: String(formData.get('penglihatanWarna')),
            funduskopi: String(formData.get('funduskopi')),
            telinga: String(formData.get('telinga')),
            ronggaGigiMulut: String(formData.get('ronggaGigiMulut')),
            leher: String(formData.get('leher')),
            kardiovaskular: String(formData.get('kardiovaskular')),
            pemeriksaan: String(formData.get('pemeriksaan')),
            xray: String(formData.get('xray')),
            tarikhPengambilanXray: String(
                formData.get('tarikhPengambilanXray'),
            ),
            lokasiPengambilanXray: String(
                formData.get('lokasiPengambilanXray'),
            ),
            nomborRujukanXray: String(formData.get('nomborRujukanXray')),
            abdomenHernia: String(formData.get('abdomenHernia')),
            sistemSaraf: String(formData.get('sistemSaraf')),
            sistemMuskuloskeletal: String(
                formData.get('sistemMuskuloskeletal'),
            ),
            mikroskopi: String(formData.get('mikroskopi')),

            kulitPucat: String(formData.get('kulitPucat')),
            sianosis: String(formData.get('sianosis')),
            edama: String(formData.get('edama')),
            penyakitKuning: String(formData.get('penyakitKuning')),
            kelenjarLimfa: String(formData.get('kelenjarLimfa')),
            penyakitKulit: String(formData.get('penyakitKulit')),
            penglihatanWarnaRadio: String(formData.get('penglihatanWarnaRadio'),),
            funduskopiRadio: String(formData.get('funduskopiRadio')),
            telingaRadio: String(formData.get('telingaRadio')),
            ronggaGigiMulutRadio: String(formData.get('ronggaGigiMulutRadio')),
            leherRadio: String(formData.get('leherRadio')),
            kardiovaskularRadio: String(formData.get('kardiovaskularRadio')),
            pemeriksaanRadio: String(formData.get('pemeriksaanRadio')),
            xrayRadio: String(formData.get('xrayRadio')),
            abdomenHerniaRadio: String(formData.get('abdomenHerniaRadio')),
            sistemSarafRadio: String(formData.get('sistemSarafRadio')),
            sistemMuskuloskeletalRadio: String(
                formData.get('sistemMuskuloskeletalRadio'),
            ),
            gula: String(formData.get('gula')),
            albumin: String(formData.get('albumin')),
        };

        try {
            const result = stepperPemeriksaanDoktor.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Sejarah Penyakit"
            ><FormButton
                type="close"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}
            />

            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperSejarahPenyakit"
                />
            {/if}</StepperContentHeader
        >
        <StepperContentBody>
            <!------------------------------------------->
            <!----------- Sejarah Penyakit -------------->
            <!------------------------------------------->

            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperSejarahPenyakit"
                    on:submit|preventDefault={submitFormstepperSejarahPenyakit}
                    class="flex w-full flex-col gap-2"
                >
                    <div class="flex w-full flex-col gap-2">
                        <table class="text-left text-sm">
                            <tr>
                                <th></th>
                                <th>SENDIRI</th>
                                <th>KELUARGA</th>
                                <th>ULASAN</th>
                            </tr>
                            <tr>
                                <td>Penyakit sejak lahir atau baka</td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriPenyakitSejakLahir"
                                        legend=""
                                        userSelected=""
                                    ></RadioSingle>
                                    {#if errorData?.sendiriPenyakitSejakLahir}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriPenyakitSejakLahir[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaPenyakitSejakLahir"
                                        legend=""
                                        userSelected=""
                                    ></RadioSingle>
                                    {#if errorData?.keluargaPenyakitSejakLahir}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaPenyakitSejakLahir[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.penyakitSejakLahir}
                                        name="penyakitSejakLahir"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.penyakitSejakLahir}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.penyakitSejakLahir[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Alahan</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriAlahan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriAlahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.sendiriAlahan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaAlahan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaAlahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaAlahan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.alahan}
                                        name="alahan"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.alahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.alahan[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Sakit jiwa</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriSakitJiwa"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriSakitJiwa}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriSakitJiwa[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSakitJiwa"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaSakitJiwa}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaSakitJiwa[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.sakitJiwa}
                                        name="sakitJiwa"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.sakitJiwa}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.sakitJiwa[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr><tr>
                                <td
                                    >Epilepsi, sawan, angin ahmar, penyakit
                                    saraf</td
                                >
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriEpilepsi"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriEpilepsi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriEpilepsi[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaEpilepsi"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaEpilepsi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaEpilepsi[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.epilepsi}
                                        name="epilepsi"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.epilepsi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.epilepsi[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr><tr>
                                <td>Darah tinggi</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriDarahTinggi"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriDarahTinggi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriDarahTinggi[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaDarahTinggi"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaDarahTinggi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaDarahTinggi[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.darahTinggi}
                                        name="darahTinggi"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.darahTinggi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.darahTinggi[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Kencing manis</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriKencingManis"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriKencingManis}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriKencingManis[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaKencingManis"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaKencingManis}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaKencingManis[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.kencingManis}
                                        name="kencingManis"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.kencingManis}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.kencingManis[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Jantung atatu salur darah</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriJantung"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriJantung}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriJantung[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaJantung"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaJantung}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaJantung[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.jantungAtatuSalurDarah}
                                        name="jantungAtatuSalurDarah"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.jantungAtatuSalurDarah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.jantungAtatuSalurDarah[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>

                            <tr>
                                <td>Asma</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriAsma"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriAsma}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.sendiriAsma[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaAsma"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaAsma}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.keluargaAsma[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.asma}
                                        name="asma"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.asma}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.asma[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Sakit buah pinggang</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriSakitBuahPinggang"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriSakitBuahPinggang}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriSakitBuahPinggang[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSakitBuahPinggang"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaSakitBuahPinggang}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaSakitBuahPinggang[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.sakitBuahPinggang}
                                        name="sakitBuahPinggang"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.sakitBuahPinggang}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sakitBuahPinggang[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Barah</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriBarah"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriBarah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.sendiriBarah[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaBarah"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaBarah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.keluargaBarah[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.barah}
                                        name="barah"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.barah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.barah[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Batuk kering</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriBatukKering"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriBatukKering}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriBatukKering[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaBatukKering"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaBatukKering}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaBatukKering[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.batukKering}
                                        name="batukKering"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.batukKering}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.batukKering[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Ketagihan dadah</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriKetagihanDadah"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriKetagihanDadah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriKetagihanDadah[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaKetagihanDadah"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaKetagihanDadah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaKetagihanDadah[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.ketagihanDadah}
                                        name="ketagihanDadah"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.ketagihanDadah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.ketagihanDadah[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>AIDS, HIV</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriAIDS"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriAIDS}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.sendiriAIDS[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaAIDS"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaAIDS}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.keluargaAIDS[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.AIDS}
                                        name="AIDS"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.AIDS}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.AIDS[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Hepatitis B</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriHepatitisB"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriHepatitisB}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriHepatitisB[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaHepatitisB"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaHepatitisB}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaHepatitisB[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.hepatitisB}
                                        name="hepatitisB"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.hepatitisB}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.hepatitisB[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Sejarah pembedahan</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriSejarahPembedahan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriSejarahPembedahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriSejarahPembedahan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSejarahPembedahan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaSejarahPembedahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaSejarahPembedahan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.sejarahPembedahan}
                                        name="sejarahPembedahan"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.sejarahPembedahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sejarahPembedahan[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Kecacatan anggota, pancaindera</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriKecacatan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriKecacatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriKecacatan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaKecacatan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaKecacatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaKecacatan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.kecacatan}
                                        name="kecacatan"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.kecacatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.kecacatan[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Merokok</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriMerokok"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriMerokok}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriMerokok[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaMerokok"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaMerokok}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaMerokok[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.merokok}
                                        name="merokok"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.merokok}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.merokok[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Penyakit serius lain</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriPenyakitSeriusLain"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriPenyakitSeriusLain}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriPenyakitSeriusLain[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaPenyakitSeriusLain"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaPenyakitSeriusLain}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaPenyakitSeriusLain[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.penyakitSeriusLain}
                                        name="penyakitSeriusLain"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.penyakitSeriusLain}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.penyakitSeriusLain[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                            <tr>
                                <td>Sedang menerima rawatan</td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="sendiriSedangMenerimaRawatan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.sendiriSedangMenerimaRawatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sendiriSedangMenerimaRawatan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSedangMenerimaRawatan"
                                        legend=""
                                        bind:userSelected={radioValue}
                                    ></RadioSingle>
                                    {#if errorData?.keluargaSedangMenerimaRawatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.keluargaSedangMenerimaRawatan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={errorData?.sedangMenerimaRawatan}
                                        name="sedangMenerimaRawatan"
                                        label=""
                                        type="text"
                                        value="-"
                                    ></TextField>

                                    {#if errorData?.sedangMenerimaRawatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.sedangMenerimaRawatan[0]}</span
                                        >
                                    {/if}
                                </td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------->
    <!---------- Pemeriksaan Doktor ------------->
    <!------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Pemeriksaan Doktor"
            ><FormButton
                type="close"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}
            /><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}><SvgPaperAirplane /></TextIconButton
            >

            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperPemeriksaanDoktor"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="FormStepperPemeriksaanDoktor"
                on:submit|preventDefault={submitFormstepperPemeriksaanDoktor}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Pemeriksaan Am</p>
                    <TextField
                        {disabled}
                        hasError={errorData?.tinggi}
                        name="tinggi"
                        label="Tinggi (cm)"
                        type="text"
                        value="169"
                    ></TextField>

                    {#if errorData?.tinggi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tinggi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.berat}
                        name="berat"
                        label="berat (kg)"
                        type="text"
                        value="65"
                    ></TextField>

                    {#if errorData?.berat}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.berat[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.bmi}
                        name="bmi"
                        label="BMI"
                        type="text"
                        value="22.76"
                    ></TextField>

                    {#if errorData?.bmi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.bmi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.denyutanNadi}
                        name="denyutanNadi"
                        label="Denyutan Nadi (setiap minit )"
                        type="text"
                        value="90"
                    ></TextField>

                    {#if errorData?.denyutanNadi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.denyutanNadi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.bp}
                        name="bp"
                        label="BP (mmHg)"
                        type="text"
                        value="120/80"
                    ></TextField>

                    {#if errorData?.bp}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.bp[0]}</span
                        >
                    {/if}

                    <RadioSingle
                        {disabled}
                        {options}
                        name="kulitPucat"
                        legend="Kulit pucat"
                        bind:userSelected={radioValue}
                    ></RadioSingle>
                    {#if errorData?.kulitPucat}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kulitPucat[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="sianosis"
                        legend="Sianosis"
                        bind:userSelected={radioValue}
                    ></RadioSingle>
                    {#if errorData?.sianosis}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.sianosis[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="edama"
                        legend="Edama"
                        bind:userSelected={radioValue}
                    ></RadioSingle>
                    {#if errorData?.edama}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.edama[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="penyakitKuning"
                        legend="Penyakit kuning"
                        bind:userSelected={radioValue}
                    ></RadioSingle>
                    {#if errorData?.penyakitKuning}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.penyakitKuning[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="kelenjarLimfa"
                        legend="Kelenjar limfa"
                        bind:userSelected={radioValue}
                    ></RadioSingle>
                    {#if errorData?.kelenjarLimfa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kelenjarLimfa[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="penyakitKulit"
                        legend="Penyakit kulit"
                        bind:userSelected={radioValue}
                    ></RadioSingle>
                    {#if errorData?.penyakitKulit}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.penyakitKulit[0]}</span
                        >
                    {/if}
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Mata</p>
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                >Penglihatan Tanpa Bantuan</td
                            >
                            <td class="w-[200px] min-w-[160px] max-w-[220px]">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanTanpaBantuan}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    value="6/6"
                                ></TextField>

                                {#if errorData?.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>

                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanTanpaBantuan}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    value="6/6"
                                ></TextField>

                                {#if errorData?.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanTanpaBantuan}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Penglihatan Tanpa Bantuan</td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanTanpaBantuan}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    value="6/6"
                                ></TextField>

                                {#if errorData?.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanTanpaBantuan}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    value="6/6"
                                ></TextField>

                                {#if errorData?.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanTanpaBantuan}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Penglihatan Dengan Bantuan</td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanDenganBantuan}
                                    name="penglihatanDenganBantuan"
                                    label=""
                                    type="text"
                                    value="6/6"
                                ></TextField>

                                {#if errorData?.penglihatanDenganBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanDenganBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanDenganBantuan}
                                    name="penglihatanDenganBantuan"
                                    label=""
                                    type="text"
                                    value="6/6"
                                ></TextField>

                                {#if errorData?.penglihatanDenganBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanDenganBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanDenganBantuan}
                                    name="penglihatanDenganBantuan"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.penglihatanDenganBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanDenganBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Penglihatan Warna</td>
                            <td>
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="penglihatanWarnaRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.penglihatanWarnaRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanWarnaRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.penglihatanWarna}
                                    name="penglihatanWarna"
                                    label=""
                                    type="text"
                                    value="Didisease"
                                ></TextField>

                                {#if errorData?.penglihatanWarna}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.penglihatanWarna[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Funduskopi</td>
                            <td>
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="funduskopiRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.funduskopiRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.funduskopiRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.funduskopi}
                                    name="funduskopi"
                                    label=""
                                    type="text"
                                    value="-"
                                ></TextField>

                                {#if errorData?.funduskopi}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.funduskopi[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                ><p class="text-sm font-bold">Telinga</p></td
                            >
                            <td class="w-[160px] min-w-[160px] max-w-[160px]">
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="telingaRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.telingaRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.telingaRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.telinga}
                                    name="telinga"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.telinga}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.telinga[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="text-sm font-bold">
                                    Rongga gigi dan mulut
                                </p>
                            </td>
                            <td>
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="ronggaGigiMulutRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.ronggaGigiMulutRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.ronggaGigiMulutRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.ronggaGigiMulut}
                                    name="ronggaGigiMulut"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.ronggaGigiMulut}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.ronggaGigiMulut[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td><p class="text-sm font-bold">Leher</p></td>
                            <td>
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="leherRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.leherRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.leherRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.leher}
                                    name="leher"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.leher}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.leher[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td
                                ><p class="text-sm font-bold">
                                    Kardiovaskular
                                </p></td
                            >
                            <td>
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="kardiovaskularRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.kardiovaskularRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.kardiovaskularRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.kardiovaskular}
                                    name="kardiovaskular"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.kardiovaskular}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.kardiovaskular[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Sistem pernafasan</p>
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                >Pemeriksaan</td
                            >
                            <td class="w-[160px] min-w-[160px] max-w-[160px]">
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="pemeriksaanRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.pemeriksaanRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.pemeriksaanRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.pemeriksaan}
                                    name="pemeriksaan"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.pemeriksaan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.pemeriksaan[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>X-ray</td>
                            <td>
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="xrayRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.xrayRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.xrayRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.xray}
                                    name="xray"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.xray}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.xray[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>

                    <TextField
                        {disabled}
                        hasError={errorData?.tarikhPengambilanXray}
                        name="tarikhPengambilanXray"
                        label="Tarikh pengambilan x-ray"
                        type="text"
                        value="16/8/2023"
                    ></TextField>

                    {#if errorData?.tarikhPengambilanXray}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhPengambilanXray[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.lokasiPengambilanXray}
                        name="lokasiPengambilanXray"
                        label="Lokasi pengambilan x-ray"
                        type="text"
                        value="Pusat Kesihatan Kuching"
                    ></TextField>

                    {#if errorData?.lokasiPengambilanXray}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.lokasiPengambilanXray[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.nomborRujukanXray}
                        name="nomborRujukanXray"
                        label="Nombor Rujukan x-ray"
                        type="text"
                        value="7273659"
                    ></TextField>

                    {#if errorData?.nomborRujukanXray}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.nomborRujukanXray[0]}</span
                        >
                    {/if}
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                ><p class="text-sm font-bold">
                                    Abdomen dan hernia
                                </p></td
                            >
                            <td class="w-[160px] min-w-[160px] max-w-[160px]">
                                <RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="abdomenHerniaRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.abdomenHerniaRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.abdomenHerniaRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.abdomenHernia}
                                    name="abdomenHernia"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.abdomenHernia}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.abdomenHernia[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td
                                ><p class="text-sm font-bold">
                                    Sistem saraf dan keadaan mental
                                </p></td
                            >
                            <td
                                ><RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="sistemSarafRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.sistemSarafRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.sistemSarafRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.sistemSaraf}
                                    name="sistemSaraf"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.sistemSaraf}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.sistemSaraf[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td
                                ><p class="text-sm font-bold">
                                    Sistem muskuloskeletal
                                </p></td
                            >
                            <td
                                ><RadioSingle
                                    {disabled}
                                    options={normalAbnormalOptions}
                                    name="sistemMuskuloskeletalRadio"
                                    legend=""
                                    bind:userSelected={isNormal}
                                ></RadioSingle>
                                {#if errorData?.sistemMuskuloskeletalRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.sistemMuskuloskeletalRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={errorData?.sistemMuskuloskeletal}
                                    name="sistemMuskuloskeletal"
                                    label=""
                                    type="text"
                                    value=""
                                ></TextField>

                                {#if errorData?.sistemMuskuloskeletal}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.sistemMuskuloskeletal[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Kencing</p>
                    <RadioSingle
                        {disabled}
                        options={normalAbnormalOptions}
                        name="gula"
                        legend="Gula"
                        bind:userSelected={isNormal}
                    ></RadioSingle>
                    {#if errorData?.gula}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.gula[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        options={normalAbnormalOptions}
                        name="albumin"
                        legend="Albumin"
                        bind:userSelected={isNormal}
                    ></RadioSingle>
                    {#if errorData?.albumin}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.albumin[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.mikroskopi}
                        name="mikroskopi"
                        label="Mikroskopi"
                        type="text"
                        value=""
                    ></TextField>

                    {#if errorData?.mikroskopi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.mikroskopi[0]}</span
                        >
                    {/if}
                </div>
            </form>
            <div class="flex w-full flex-col gap-2.5">
                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Fail-fail yang dimuat naik:
                    </p>
                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
