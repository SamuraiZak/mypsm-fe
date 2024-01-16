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
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _stepperSejarahPenyakit,
        _submitFormStepperSejarahPenyakit,
    } from '../+page';

    export let disabled: boolean = false;
    export let data: PageData;

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

    const {
        form: sejarahPenyakitForm,
        errors: sejarahPenyakitErrors,
        enhance: sejarahPenyakitEnhance,
    } = superForm(data.stepperSejarahPenyakit, {
        SPA: true,
        validators: _stepperSejarahPenyakit,
        onSubmit() {
            _submitFormStepperSejarahPenyakit($sejarahPenyakitForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;

    //==========================================================
    //============== stepper Sejarah Penyakit ==================
    //==========================================================

    //==========================================================
    //============== stepper Pemeriksaan Doktor ================
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
            penglihatanTanpaBantuan: String(
                formData.get('penglihatanTanpaBantuan'),
            ),
            penglihatanDenganBantuan: String(
                formData.get('penglihatanDenganBantuan'),
            ),
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
            penglihatanWarnaRadio: String(
                formData.get('penglihatanWarnaRadio'),
            ),
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
            {/if}
        </StepperContentHeader>
        <!------------------------------------------->
        <!----------- Sejarah Penyakit -------------->
        <!------------------------------------------->
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperSejarahPenyakit"
                    class="flex w-full flex-col gap-2"
                    use:sejarahPenyakitEnhance
                    method="POST"
                >
                    <div class="flex w-full flex-col gap-2">
                        <table
                            class="text-left text-sm {stepperFormTitleClass}"
                        >
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriPenyakitSejakLahir}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriPenyakitSejakLahir}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriPenyakitSejakLahir[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaPenyakitSejakLahir"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaPenyakitSejakLahir}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaPenyakitSejakLahir}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaPenyakitSejakLahir[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitForm.penyakitSejakLahir
                                            ? true
                                            : false}
                                        name="penyakitSejakLahir"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.penyakitSejakLahir}
                                    ></TextField>

                                    {#if $sejarahPenyakitForm.penyakitSejakLahir}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitForm
                                                .penyakitSejakLahir[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriAlahan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriAlahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriAlahan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaAlahan"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaAlahan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaAlahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaAlahan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitForm.alahan
                                            ? true
                                            : false}
                                        name="alahan"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.alahan}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.alahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .alahan[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriSakitJiwa}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriSakitJiwa}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriSakitJiwa[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSakitJiwa"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaSakitJiwa}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaSakitJiwa}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaSakitJiwa[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.sakitJiwa
                                            ? true
                                            : false}
                                        name="sakitJiwa"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.sakitJiwa}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.sakitJiwa}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sakitJiwa[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriEpilepsi}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriEpilepsi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriEpilepsi[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaEpilepsi"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaEpilepsi}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaEpilepsi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaEpilepsi[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.epilepsi
                                            ? true
                                            : false}
                                        name="epilepsi"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.epilepsi}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.epilepsi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .epilepsi[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriDarahTinggi}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriDarahTinggi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriDarahTinggi[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaDarahTinggi"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaDarahTinggi}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaDarahTinggi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaDarahTinggi[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.darahTinggi
                                            ? true
                                            : false}
                                        name="darahTinggi"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.darahTinggi}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.darahTinggi}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .darahTinggi[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriKencingManis}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriKencingManis}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriKencingManis[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaKencingManis"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaKencingManis}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaKencingManis}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaKencingManis[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.kencingManis
                                            ? true
                                            : false}
                                        name="kencingManis"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.kencingManis}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.kencingManis}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .kencingManis[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriJantung}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriJantung}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriJantung[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaJantung"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaJantung}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaJantung}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaJantung[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.jantungAtatuSalurDarah
                                            ? true
                                            : false}
                                        name="jantungAtatuSalurDarah"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.jantungAtatuSalurDarah}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.jantungAtatuSalurDarah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .jantungAtatuSalurDarah[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriAsma}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriAsma}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriAsma[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaAsma"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaAsma}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaAsma}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaAsma[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.asma
                                            ? true
                                            : false}
                                        name="asma"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.asma}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.asma}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .asma[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriSakitBuahPinggang}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriSakitBuahPinggang}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriSakitBuahPinggang[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSakitBuahPinggang"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaSakitBuahPinggang}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaSakitBuahPinggang}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaSakitBuahPinggang[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.sakitBuahPinggang
                                            ? true
                                            : false}
                                        name="sakitBuahPinggang"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.sakitBuahPinggang}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.sakitBuahPinggang}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sakitBuahPinggang[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriBarah}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriBarah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriBarah[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaBarah"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaBarah}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaBarah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaBarah[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.barah
                                            ? true
                                            : false}
                                        name="barah"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.barah}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.barah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .barah[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriBatukKering}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriBatukKering}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriBatukKering[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaBatukKering"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaBatukKering}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaBatukKering}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaBatukKering[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.batukKering
                                            ? true
                                            : false}
                                        name="batukKering"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.batukKering}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.batukKering}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .batukKering[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriKetagihanDadah}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriKetagihanDadah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriKetagihanDadah[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaKetagihanDadah"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaKetagihanDadah}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaKetagihanDadah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaKetagihanDadah[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.ketagihanDadah
                                            ? true
                                            : false}
                                        name="ketagihanDadah"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.ketagihanDadah}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.ketagihanDadah}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .ketagihanDadah[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriAIDS}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriAIDS}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriAIDS[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaAIDS"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaAIDS}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaAIDS}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaAIDS[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.AIDS
                                            ? true
                                            : false}
                                        name="AIDS"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.AIDS}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.AIDS}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .AIDS[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriHepatitisB}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriHepatitisB}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriHepatitisB[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaHepatitisB"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaHepatitisB}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaHepatitisB}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaHepatitisB[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.hepatitisB
                                            ? true
                                            : false}
                                        name="hepatitisB"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.hepatitisB}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.hepatitisB}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .hepatitisB[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriSejarahPembedahan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriSejarahPembedahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriSejarahPembedahan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSejarahPembedahan"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaSejarahPembedahan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaSejarahPembedahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaSejarahPembedahan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.sejarahPembedahan
                                            ? true
                                            : false}
                                        name="sejarahPembedahan"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.sejarahPembedahan}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.sejarahPembedahan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sejarahPembedahan[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriKecacatan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriKecacatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriKecacatan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaKecacatan"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaKecacatan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaKecacatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaKecacatan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.kecacatan
                                            ? true
                                            : false}
                                        name="kecacatan"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.kecacatan}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.kecacatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .kecacatan[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriMerokok}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriMerokok}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriMerokok[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaMerokok"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaMerokok}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaMerokok}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaMerokok[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.merokok
                                            ? true
                                            : false}
                                        name="merokok"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.merokok}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.merokok}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .merokok[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriPenyakitSeriusLain}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriPenyakitSeriusLain}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriPenyakitSeriusLain[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaPenyakitSeriusLain"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaPenyakitSeriusLain}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaPenyakitSeriusLain}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaPenyakitSeriusLain[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.penyakitSeriusLain
                                            ? true
                                            : false}
                                        name="penyakitSeriusLain"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.penyakitSeriusLain}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.penyakitSeriusLain}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .penyakitSeriusLain[0]}</span
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
                                        bind:userSelected={$sejarahPenyakitForm.sendiriSedangMenerimaRawatan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.sendiriSedangMenerimaRawatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sendiriSedangMenerimaRawatan[0]}</span
                                        >
                                    {/if}
                                </td>

                                <td>
                                    <RadioSingle
                                        {disabled}
                                        {options}
                                        name="keluargaSedangMenerimaRawatan"
                                        legend=""
                                        bind:userSelected={$sejarahPenyakitForm.keluargaSedangMenerimaRawatan}
                                    ></RadioSingle>
                                    {#if $sejarahPenyakitErrors.keluargaSedangMenerimaRawatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .keluargaSedangMenerimaRawatan[0]}</span
                                        >
                                    {/if}
                                </td>
                                <td>
                                    <TextField
                                        {disabled}
                                        hasError={$sejarahPenyakitErrors.sedangMenerimaRawatan
                                            ? true
                                            : false}
                                        name="sedangMenerimaRawatan"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.sedangMenerimaRawatan}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.sedangMenerimaRawatan}
                                        <span
                                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
                                                .sedangMenerimaRawatan[0]}</span
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
                                        >{errorData?.penglihatanWarna[0]}</span
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
