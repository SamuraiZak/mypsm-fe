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
    import {
        _stepperPemeriksaanDoktor,
        _submitFormStepperPemeriksaanDoktor,
    } from '../+page';

    export let disabled: boolean = false;
    export let data: PageData;

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system- text-sm font-medium';

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

    const {
        form: pemeriksaanDoktorForm,
        errors: pemeriksaanDoktorErrors,
        enhance: pemeriksaanDoktorEnhance,
    } = superForm(data.stepperPemeriksaanDoktor, {
        SPA: true,
        validators: _stepperPemeriksaanDoktor,
        onSubmit() {
            _submitFormStepperPemeriksaanDoktor($pemeriksaanDoktorForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    let errorData: any;


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
                                        hasError={$sejarahPenyakitErrors.penyakitSejakLahir
                                            ? true
                                            : false}
                                        name="penyakitSejakLahir"
                                        label=""
                                        type="text"
                                        bind:value={$sejarahPenyakitForm.penyakitSejakLahir}
                                    ></TextField>

                                    {#if $sejarahPenyakitErrors.penyakitSejakLahir}
                                        <span
                                            class="font-sans text-sm italic text-system-danger"
                                            >{$sejarahPenyakitErrors
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
                                        hasError={$sejarahPenyakitErrors.alahan
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
                class="flex w-full flex-col gap-2"
                use:pemeriksaanDoktorEnhance
                method="POST"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Pemeriksaan Am</p>
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.tinggi
                            ? true
                            : false}
                        name="tinggi"
                        label="Tinggi (cm)"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.tinggi}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.tinggi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.tinggi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.berat ? true : false}
                        name="berat"
                        label="berat (kg)"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.berat}
                    ></TextField>
                    {#if $pemeriksaanDoktorErrors.berat}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.berat[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.bmi ? true : false}
                        name="bmi"
                        label="BMI"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.bmi}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.bmi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.bmi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.denyutanNadi
                            ? true
                            : false}
                        name="denyutanNadi"
                        label="Denyutan Nadi (setiap minit )"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.denyutanNadi}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.denyutanNadi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.denyutanNadi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.bp ? true : false}
                        name="bp"
                        label="BP (mmHg)"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.bp}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.bp}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.bp[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="kulitPucat"
                        legend="Kulit pucat"
                        bind:userSelected={$pemeriksaanDoktorForm.kulitPucat}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.kulitPucat}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.kulitPucat[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="sianosis"
                        legend="Sianosis"
                        bind:userSelected={$pemeriksaanDoktorForm.sianosis}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.sianosis}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.sianosis[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="edama"
                        legend="Edama"
                        bind:userSelected={$pemeriksaanDoktorForm.edama}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.edama}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.edama[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="penyakitKuning"
                        legend="Penyakit kuning"
                        bind:userSelected={$pemeriksaanDoktorForm.penyakitKuning}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.penyakitKuning}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.penyakitKuning[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="kelenjarLimfa"
                        legend="Kelenjar limfa"
                        bind:userSelected={$pemeriksaanDoktorForm.kelenjarLimfa}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors?.kelenjarLimfa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors?.kelenjarLimfa[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="penyakitKulit"
                        legend="Penyakit kulit"
                        bind:userSelected={$pemeriksaanDoktorForm.penyakitKulit}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.penyakitKulit}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors.penyakitKulit[0]}</span
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
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan
                                        ? true
                                        : false}
                                    name="penglihatanTanpaBantuan"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan[0]}</span
                                    >
                                {/if}
                            </td>

                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan2
                                        ? true
                                        : false}
                                    name="penglihatanTanpaBantuan2"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan2}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan2}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan2[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan3
                                        ? true
                                        : false}
                                    name="penglihatanTanpaBantuan3"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan3}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan3}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan3[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Penglihatan Tanpa Bantuan</td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan4
                                        ? true
                                        : false}
                                    name="penglihatanTanpaBantuan4"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan4}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan4}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan4[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan5
                                        ? true
                                        : false}
                                    name="penglihatanTanpaBantuan5"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan5}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan5}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan5[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan6
                                        ? true
                                        : false}
                                    name="penglihatanTanpaBantuan6"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan6}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan6}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan6[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Penglihatan Dengan Bantuan</td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanDenganBantuan
                                        ? true
                                        : false}
                                    name="penglihatanDenganBantuan"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanDenganBantuan}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanDenganBantuan}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanDenganBantuan[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanDenganBantuan2
                                        ? true
                                        : false}
                                    name="penglihatanDenganBantuan2"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanDenganBantuan2}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.penglihatanDenganBantuan2}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanDenganBantuan2[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanDenganBantuan3
                                        ? true
                                        : false}
                                    name="penglihatanDenganBantuan3"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanDenganBantuan3}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.penglihatanDenganBantuan3}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanDenganBantuan3[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.penglihatanWarnaRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.penglihatanWarnaRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanWarnaRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanWarna
                                        ? true
                                        : false}
                                    name="penglihatanWarna"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanWarna}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.penglihatanWarna}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanWarna[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.funduskopiRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.funduskopiRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .funduskopiRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.funduskopi
                                        ? true
                                        : false}
                                    name="funduskopi"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.funduskopi}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.funduskopi}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .funduskopi[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.telingaRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.telingaRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .telingaRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.telinga
                                        ? true
                                        : false}
                                    name="telinga"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.telinga}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.telinga}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .telinga[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.ronggaGigiMulutRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.ronggaGigiMulutRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .ronggaGigiMulutRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.ronggaGigiMulut
                                        ? true
                                        : false}
                                    name="ronggaGigiMulut"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.ronggaGigiMulut}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.ronggaGigiMulut}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .ronggaGigiMulut[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.leherRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.leherRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .leherRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.leher
                                        ? true
                                        : false}
                                    name="leher"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.leher}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.leher}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .leher[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.kardiovaskularRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.kardiovaskularRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .kardiovaskularRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.kardiovaskular
                                        ? true
                                        : false}
                                    name="kardiovaskular"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.kardiovaskular}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.kardiovaskular}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .kardiovaskular[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.pemeriksaanRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.pemeriksaanRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .pemeriksaanRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.pemeriksaan
                                        ? true
                                        : false}
                                    name="pemeriksaan"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.pemeriksaan}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.pemeriksaan}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .pemeriksaan[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.xrayRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.xrayRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .xrayRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.xray
                                        ? true
                                        : false}
                                    name="xray"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.xray}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.xray}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .xray[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>

                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.tarikhPengambilanXray
                            ? true
                            : false}
                        name="tarikhPengambilanXray"
                        label="Tarikh pengambilan x-ray"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.tarikhPengambilanXray}
                    ></TextField>
                    {#if $pemeriksaanDoktorErrors.tarikhPengambilanXray}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors
                                .tarikhPengambilanXray[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.lokasiPengambilanXray
                            ? true
                            : false}
                        name="lokasiPengambilanXray"
                        label="Lokasi pengambilan x-ray"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.lokasiPengambilanXray}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.lokasiPengambilanXray}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors
                                .lokasiPengambilanXray[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.nomborRujukanXray
                            ? true
                            : false}
                        name="nomborRujukanXray"
                        label="Nombor Rujukan x-ray"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.nomborRujukanXray}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.nomborRujukanXray}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$pemeriksaanDoktorErrors
                                .nomborRujukanXray[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.abdomenHerniaRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.abdomenHerniaRadio}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .abdomenHerniaRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.abdomenHernia
                                        ? true
                                        : false}
                                    name="abdomenHernia"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.abdomenHernia}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.abdomenHernia}
                                <span
                                    class="ml-[0px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .abdomenHernia[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.sistemSarafRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.sistemSarafRadio}
                                <span
                                    class="ml-[0px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .sistemSarafRadio[0]}</span
                                >
                            {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.sistemSaraf
                                        ? true
                                        : false}
                                    name="sistemSaraf"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.sistemSaraf}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.sistemSaraf}
                                <span
                                    class="ml-[0px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .sistemSaraf[0]}</span
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
                                    bind:userSelected={$pemeriksaanDoktorForm.sistemMuskuloskeletalRadio}
                                ></RadioSingle>
                                {#if $pemeriksaanDoktorErrors.sistemMuskuloskeletalRadio}
                                <span
                                    class="ml-[0px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .sistemMuskuloskeletalRadio[0]}</span
                                >
                            {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.sistemMuskuloskeletal
                                        ? true
                                        : false}
                                    name="sistemMuskuloskeletal"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.sistemMuskuloskeletal}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.sistemMuskuloskeletal}
                                <span
                                    class="ml-[0px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .sistemMuskuloskeletal[0]}</span
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
                        bind:userSelected={$pemeriksaanDoktorForm.gula}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.gula}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .gula[0]}</span
                                >
                            {/if}
                    <RadioSingle
                        {disabled}
                        options={normalAbnormalOptions}
                        name="albumin"
                        legend="Albumin"
                        bind:userSelected={$pemeriksaanDoktorForm.albumin}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.albumin}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemeriksaanDoktorErrors
                                        .albumin[0]}</span
                                >
                            {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.mikroskopi
                            ? true
                            : false}
                        name="mikroskopi"
                        label="Mikroskopi"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.mikroskopi}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.mikroskopi}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$pemeriksaanDoktorErrors
                            .mikroskopi[0]}</span
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


