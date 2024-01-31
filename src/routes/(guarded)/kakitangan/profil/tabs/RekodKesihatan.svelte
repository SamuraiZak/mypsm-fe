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
    import type { PageData } from '../$types';
    import {
        _stepperSejarahPenyakit,
        _stepperSejarahPenyakitList,
        _submitFormStepperSejarahPenyakit,
    } from '../+page';
    import {
        _stepperPemeriksaanDoktor,
        _submitFormStepperPemeriksaanDoktor,
    } from '../+page';
    import { commonOptions } from '$lib/constants/mypsm/radio-option-constants';

    export let disabled: boolean = false;
    export let data: PageData;

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system- text-sm font-medium';

    let radioValue: any = 'tidak';

    const options: RadioOption[] = [
        {
            value: true,
            label: 'Ya',
        },
        {
            value: false,
            label: 'Tidak',
        },
    ];

    let isNormal: string = 'true';

    const normalAbnormalOptions: RadioOption[] = [
        {
            value: true,
            label: 'Normal',
        },
        {
            value: false,
            label: 'Abnormal',
        },
    ];

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists;

    const {
        form: sejarahPenyakitForm,
        errors: sejarahPenyakitErrors,
        enhance: sejarahPenyakitEnhance,
    } = superForm(data.stepperSejarahPenyakit, {
        dataType: 'json',
        SPA: true,
        validators: _stepperSejarahPenyakitList,
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
    } = superForm(data?.stepperPemeriksaanDoktor!, {
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
                        {#each data.medicalHistoryDiseaseNamesResponse.data.list as record, i}
                            <div class="flex flex-row">
                                <label
                                    for="diseases"
                                    class="w-full min-w-[220px] text-sm"
                                    >{record}</label
                                >
                                <input
                                    hidden
                                    type="text"
                                    value={$sejarahPenyakitForm.medicalHistory[
                                        i
                                    ]?.diseases ?? ' '}
                                />
                                <RadioSingle
                                    {disabled}
                                    options={commonOptions}
                                    name="record{i}isPesonal"
                                    legend=""
                                    userSelected={$sejarahPenyakitForm
                                        .medicalHistory[i]?.isPersonal ?? true}
                                ></RadioSingle>
                                <RadioSingle
                                    {disabled}
                                    options={commonOptions}
                                    name="record{i}isFamily"
                                    legend=""
                                    userSelected={$sejarahPenyakitForm
                                        .medicalHistory[i]?.isFamily ?? true}
                                ></RadioSingle>
                                <TextField
                                    {disabled}
                                    name="alahan"
                                    label=""
                                    type="text"
                                    value={$sejarahPenyakitForm.medicalHistory[
                                        i
                                    ]?.remark ?? ' '}
                                ></TextField>
                            </div>
                        {/each}
                        <!-- <table
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
                                            class=" ml-[0px] font-sans text-sm italic text-system-danger"
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
                        </table> -->
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
                    class="border-bdr-primary flex w-full flex-col gap-2 border-b pb-5"
                >
                    <p class="text-sm font-bold">Pemeriksaan Am</p>
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.height
                            ? true
                            : false}
                        name="height"
                        label="Tinggi (cm)"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.height}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.height}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.height[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.weight
                            ? true
                            : false}
                        name="weight"
                        label="berat (kg)"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.weight}
                    ></TextField>
                    {#if $pemeriksaanDoktorErrors.weight}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.weight[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.BMI ? true : false}
                        name="BMI"
                        label="BMI"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.BMI}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.BMI}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.BMI[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.BPM ? true : false}
                        name="BPM"
                        label="Denyutan Nadi (setiap minit )"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.BPM}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.BPM}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.BPM[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.BP ? true : false}
                        name="BP"
                        label="BP (mmHg)"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.BP}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.BP}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.BP[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="paleSkin"
                        legend="Kulit pucat"
                        bind:userSelected={$pemeriksaanDoktorForm.paleSkin}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.paleSkin}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.paleSkin[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="cycnosis"
                        legend="Sianosis"
                        bind:userSelected={$pemeriksaanDoktorForm.cycnosis}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.cycnosis}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.cycnosis[0]}</span
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
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.edama[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="jaundice"
                        legend="Penyakit kuning"
                        bind:userSelected={$pemeriksaanDoktorForm.jaundice}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.jaundice}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.jaundice[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="lymphGlands"
                        legend="Kelenjar limfa"
                        bind:userSelected={$pemeriksaanDoktorForm.lymphGlands}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors?.lymphGlands}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors?.lymphGlands[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {disabled}
                        {options}
                        name="skinDisease"
                        legend="Penyakit kulit"
                        bind:userSelected={$pemeriksaanDoktorForm.skinDisease}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.skinDisease}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.skinDisease[0]}</span
                        >
                    {/if}
                </div>
                <div
                    class="border-bdr-primary flex w-full flex-col gap-2.5 border-b pb-5"
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
                                    hasError={$pemeriksaanDoktorErrors.unaidedVisionLeft
                                        ? true
                                        : false}
                                    name="unaidedVisionLeft"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.unaidedVisionLeft}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.unaidedVisionLeft}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .unaidedVisionLeft[0]}</span
                                    >
                                {/if}
                            </td>

                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.unaidedVisionRight
                                        ? true
                                        : false}
                                    name="unaidedVisionRight"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.unaidedVisionRight}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.unaidedVisionRight}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .unaidedVisionRight[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <!-- <TextField
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
                                {/if} -->
                            </td>
                        </tr>
                        <tr>
                            <!-- <td>Penglihatan Tanpa Bantuan</td>
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
                        <tr> -->
                            <td>Penglihatan Dengan Bantuan</td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.aidedVisionLeft
                                        ? true
                                        : false}
                                    name="aidedVisionLeft"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.aidedVisionLeft}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.aidedVisionLeft}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .aidedVisionLeft[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.aidedVisionRight
                                        ? true
                                        : false}
                                    name="aidedVisionRight"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.aidedVisionRight}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.aidedVisionRight}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .aidedVisionRight[0]}</span
                                    >
                                {/if}
                            </td>
                            <!-- <td>
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
                            </td> -->
                        </tr>

                        <tr>
                            <td>Penglihatan Warna</td>
                            <td>
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.colourVision
                                        ? true
                                        : false}
                                    name="colourVision"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.colourVision}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.colourVision}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .colourVision[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>Funduskopi</td>
                            <td>
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.fundoscopic
                                        ? true
                                        : false}
                                    name="fundoscopic"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.fundoscopic}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.fundoscopic}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .fundoscopic[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="border-bdr-primary flex w-full flex-col gap-2.5 border-b pb-5"
                >
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                ><p class="text-sm font-bold">Telinga</p></td
                            >
                            <td class="w-[160px] min-w-[160px] max-w-[160px]">
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.ear
                                        ? true
                                        : false}
                                    name="ear"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.ear}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.ear}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors.ear[0]}</span
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
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.dental
                                        ? true
                                        : false}
                                    name="dental"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.dental}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.dental}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .dental[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td><p class="text-sm font-bold">Leher</p></td>
                            <td>
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.neck
                                        ? true
                                        : false}
                                    name="neck"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.neck}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.neck}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .neck[0]}</span
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
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.cardiovascular
                                        ? true
                                        : false}
                                    name="cardiovascular"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.cardiovascular}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.cardiovascular}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .cardiovascular[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="border-bdr-primary flex w-full flex-col gap-2.5 border-b pb-5"
                >
                    <p class="text-sm font-bold">Sistem pernafasan</p>
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                >Pemeriksaan</td
                            >
                            <td class="w-[160px] min-w-[160px] max-w-[160px]">
                                <!-- <RadioSingle
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
                                {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.breathingExam
                                        ? true
                                        : false}
                                    name="breathingExam"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.breathingExam}
                                ></TextField>
                                {#if $pemeriksaanDoktorErrors.breathingExam}
                                    <span
                                        class="text-system-danger ml-[220px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .breathingExam[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td>X-ray</td>
                            <td>
                                <!-- <RadioSingle
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
                                {/if} -->
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
                                        class="text-system-danger ml-[220px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .xray[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>

                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.xrayTaken
                            ? true
                            : false}
                        name="xrayTaken"
                        label="Tarikh pengambilan x-ray"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.xrayTaken}
                    ></TextField>
                    {#if $pemeriksaanDoktorErrors.xrayTaken}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.xrayTaken[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.xrayLocation
                            ? true
                            : false}
                        name="xrayLocation"
                        label="Lokasi pengambilan x-ray"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.xrayLocation}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.xrayLocation}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.xrayLocation[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.xrayReference
                            ? true
                            : false}
                        name="xrayReference"
                        label="Nombor Rujukan x-ray"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.xrayReference}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.xrayReference}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.xrayReference[0]}</span
                        >
                    {/if}
                </div>
                <div
                    class="border-bdr-primary flex w-full flex-col gap-2.5 border-b pb-5"
                >
                    <table class="text-left text-sm">
                        <tr>
                            <td class="w-[220px] min-w-[220px] max-w-[220px]"
                                ><p class="text-sm font-bold">
                                    Abdomen dan hernia
                                </p></td
                            >
                            <td class="w-[160px] min-w-[160px] max-w-[160px]">
                                <!-- <RadioSingle
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
                                {/if} -->
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
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
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
                            <td>
                                <!-- <RadioSingle
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
                            {/if} -->
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.mentalState
                                        ? true
                                        : false}
                                    name="mentalState"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.mentalState}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.mentalState}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .mentalState[0]}</span
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
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .sistemMuskuloskeletalRadio[0]}</span
                                    >
                                {/if}
                            </td>

                            <td colspan="2">
                                <TextField
                                    {disabled}
                                    hasError={$pemeriksaanDoktorErrors.musculoskeletal
                                        ? true
                                        : false}
                                    name="musculoskeletal"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.musculoskeletal}
                                ></TextField>

                                {#if $pemeriksaanDoktorErrors.musculoskeletal}
                                    <span
                                        class="text-system-danger ml-[0px] font-sans text-sm italic"
                                        >{$pemeriksaanDoktorErrors
                                            .musculoskeletal[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="border-bdr-primary flex w-full flex-col gap-2.5 border-b pb-5"
                >
                    <p class="text-sm font-bold">Kencing</p>
                    <RadioSingle
                        {disabled}
                        options={normalAbnormalOptions}
                        name="sugar"
                        legend="Gula"
                        bind:userSelected={$pemeriksaanDoktorForm.sugar}
                    ></RadioSingle>
                    {#if $pemeriksaanDoktorErrors.sugar}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.sugar[0]}</span
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
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.albumin[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$pemeriksaanDoktorErrors.microscopic
                            ? true
                            : false}
                        name="microscopic"
                        label="Mikroskopi"
                        type="text"
                        bind:value={$pemeriksaanDoktorForm.microscopic}
                    ></TextField>

                    {#if $pemeriksaanDoktorErrors.microscopic}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.microscopic[0]}</span
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
