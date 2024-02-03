<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import CutiGantian from './forms/CutiGantian.svelte';
    import CutiTanpaGaji from './forms/CutiTanpaGaji.svelte';
    import CutiSeparuhGaji from './forms/CutiSeparuhGaji.svelte';
    import CutiTanpaRekod from './forms/CutiTanpaRekod.svelte';
    import CutiBersalinAwal from './forms/CutiBersalinAwal.svelte';
    import CutiBersalinPegawai from './forms/CutiBersalinPegawai.svelte';
    import CutiIsteriBersalin from './forms/CutiIsteriBersalin.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import CutiHaji from './forms/CutiHaji.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { onMount } from 'svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import type { PageData } from './$types';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import {
        _commonLeavePropsSchema,
        _otherLeavesSchema,
        _otherLeavesSecondarySchema,
        _otherLeavesTertiarySchema,
        _submitOtherLeaveForm,
        _submitOtherLeaveSecondaryForm,
        _submitOtherLeaveTertiaryForm,
    } from './+page';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import StepperOtherRolesResult from '$lib/components/stepper-conditional-rules/StepperOtherRolesResult.svelte';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/mypsm/radio-option-constants';

    export let data: PageData;
    let selectedCuti = '';

    // ================ Stepper Control ==================
    let stepperIndex = 0;

    // Function to handle the file changes
    let selectedFiles: File[] = [];
    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });
    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    const uploadedFileSchema = z.object({
        uploadedFiles: z.any().array().nonempty({
            message: 'Sila muat naik dokumen - dokumen berkaitan.',
        }),
    });

    // ============== Form Validation ================
    let errorData: any;
    //File uploaded validation
    const submitFilesForm = async () => {
        let uploadedFiles = selectedFiles;
        const uploadedFileData = {
            uploadedFiles: uploadedFiles,
        };

        try {
            const result = uploadedFileSchema.parse(uploadedFileData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(result);
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error('Sila pastikan dokumen telah dimuat naik.', {
                    style: 'background: #333; color: #fff;',
                });
            }
        }
    };

    // ================ Form Validation ================
    const { form, errors, enhance, options } = superForm(data.otherLeavesForm, {
        SPA: true,
        validators: _otherLeavesSchema,
        invalidateAll: true,
        validationMethod: 'oninput',
        resetForm: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            if (
                selectedCuti === 'Cuti Kuarantin' ||
                selectedCuti === 'Cuti Menjaga Anak Tanpa Gaji' ||
                selectedCuti === 'Cuti Penyakit Barah Dan Kusta' ||
                selectedCuti === 'Cuti Penyakit Tibi'
            ) {
                _submitOtherLeaveForm($form);
            } else if (
                selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat' ||
                selectedCuti === 'Cuti Sakit Lanjutan' ||
                selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan'
            ) {
                _submitOtherLeaveSecondaryForm($form);
            } else if (selectedCuti === 'Cuti Kursus Sambilan') {
                _submitOtherLeaveTertiaryForm($form);
            }
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

    const proxyStartDate = dateProxy(form, 'startDate', { format: 'date' });
    const proxyEndDate = dateProxy(form, 'endDate', { format: 'date' });

    $: {
        if (
            selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat' ||
            selectedCuti === 'Cuti Sakit Lanjutan' ||
            selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan'
        ) {
            options.validators = _otherLeavesSecondarySchema;
        } else if (selectedCuti === 'Cuti Kursus Sambilan') {
            options.validators = _otherLeavesTertiarySchema;
        }

        $form.leaveType = selectedCuti;
    }
</script>

<ContentHeader
    title="Permohonan Cuti"
    description="Sila isi borang permohonan cuti di bawah dengan butiran yang tepat dan lengkap."
></ContentHeader>

<Stepper bind:activeIndex={stepperIndex}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>

        <!-- ========== STEPPER 1 ========== -->
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col gap-2">
                    <TextField
                        disabled
                        name="employeeNumber"
                        label={'No. Pekerja'}
                        bind:value={data.employeeDetails.employeeNumber}
                    ></TextField>
                    <TextField
                        disabled
                        name="staffName"
                        label={'Nama'}
                        bind:value={data.employeeDetails.name}
                    ></TextField>
                    <TextField
                        disabled
                        name="identificationNo"
                        label={'No. K/P'}
                        bind:value={data.employeeDetails.identityCardNumber}
                    ></TextField>
                    <TextField
                        disabled
                        name="grade"
                        label={'Gred'}
                        bind:value={data.employeeDetails.grade}
                    ></TextField>
                    <TextField
                        disabled
                        name="position"
                        label={'Jawatan'}
                        bind:value={data.employeeDetails.position}
                    ></TextField>
                    <TextField
                        disabled
                        name="placement"
                        label={'Penempatan'}
                        bind:value={data.employeeDetails.placement}
                    ></TextField>
                    <TextField
                        disabled
                        name="serviceGroup"
                        label={'Kumpulan'}
                        bind:value={data.employeeDetails.serviceGroup}
                    ></TextField>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>

    <!-- ========== STEPPER 2 ========== -->
    <StepperContent>
        <StepperContentHeader title="Maklumat Cuti">
            <TextIconButton primary label="Hantar" form="formValidation"
                ><SvgPaperAirplane /></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex max-h-full w-full flex-col gap-2.5">
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Cuti"
                    options={data.leaveList}
                    bind:value={selectedCuti}
                    onSelect={() => {}}
                ></DropdownSelect>

                {#if selectedCuti === 'Cuti Gantian'}
                    <CutiGantian {data}></CutiGantian>
                {:else if selectedCuti === 'Cuti Tanpa Rekod'}
                    <CutiTanpaRekod {data}></CutiTanpaRekod>
                {:else if selectedCuti === 'Cuti Separuh Gaji'}
                    <CutiSeparuhGaji {data}></CutiSeparuhGaji>
                {:else if selectedCuti === 'Cuti Tanpa Gaji'}
                    <CutiTanpaGaji {data}></CutiTanpaGaji>
                {:else if selectedCuti === 'Cuti Bersalin Awal'}
                    <CutiBersalinAwal {data}></CutiBersalinAwal>
                {:else if selectedCuti === 'Cuti Bersalin Pegawai'}
                    <CutiBersalinPegawai {data}></CutiBersalinPegawai>
                {:else if selectedCuti === 'Cuti Isteri Bersalin'}
                    <CutiIsteriBersalin {data}></CutiIsteriBersalin>
                {:else if selectedCuti === 'Cuti Haji'}
                    <CutiHaji {data}></CutiHaji>
                {:else if selectedCuti === 'Cuti Kuarantin' || selectedCuti === 'Cuti Menjaga Anak Tanpa Gaji' || selectedCuti === 'Cuti Kursus Sambilan' || selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat' || selectedCuti === 'Cuti Sakit Lanjutan' || selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan' || selectedCuti === 'Cuti Penyakit Barah Dan Kusta' || selectedCuti === 'Cuti Penyakit Tibi'}
                    <section>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <SectionHeader title={selectedCuti}></SectionHeader>
                            <form
                                id="formValidation"
                                method="POST"
                                use:enhance
                                class="flex w-full flex-col gap-2"
                            >
                                {#if selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat' || selectedCuti === 'Cuti Sakit Lanjutan' || selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan'}
                                    <LongTextField
                                        hasError={!!$errors.reason}
                                        name="reason"
                                        label="Tujuan Permohonan"
                                        bind:value={$form.reason}
                                        placeholder="Sila taip jawapan anda dalam ruangan ini"
                                    ></LongTextField>
                                    {#if $errors.reason}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$errors.reason}</span
                                        >
                                    {/if}
                                {/if}
                                <div
                                    class="flex w-full flex-row items-center justify-start gap-2.5"
                                >
                                    <div class="flex w-full flex-col">
                                        <DateSelector
                                            hasError={$errors.startDate
                                                ? true
                                                : false}
                                            name="startDate"
                                            handleDateChange
                                            bind:selectedDate={$proxyStartDate}
                                            label="Tarikh Mula"
                                        ></DateSelector>
                                        {#if $errors.startDate}
                                            <span
                                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                                >{$errors.startDate}</span
                                            >
                                        {/if}
                                    </div>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-start gap-2.5"
                                >
                                    <div class="flex w-full flex-col">
                                        <DateSelector
                                            hasError={$errors.endDate
                                                ? true
                                                : false}
                                            name="endDate"
                                            handleDateChange
                                            label="Tarikh Tamat"
                                            bind:selectedDate={$proxyEndDate}
                                        ></DateSelector>
                                        {#if $errors.endDate}
                                            <span
                                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                                >{$errors.endDate}</span
                                            >
                                        {/if}
                                    </div>
                                </div>
                                {#if selectedCuti === 'Cuti Kursus Sambilan'}
                                    <DropdownSelect
                                        hasError={!!$errors.academicQualification}
                                        name="academicQualification"
                                        dropdownType="label-left-full"
                                        label={'Jenis Jurusan'}
                                        options={data.majorMinorLookup}
                                        bind:value={$form.academicQualification}
                                    ></DropdownSelect>
                                    {#if $errors.academicQualification}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$errors.academicQualification}</span
                                        >
                                    {/if}
                                    <DropdownSelect
                                        hasError={!!$errors.institution}
                                        name="institution"
                                        dropdownType="label-left-full"
                                        label={'Institusi'}
                                        options={data.institutionLookup}
                                        bind:value={$form.institution}
                                    ></DropdownSelect>
                                    {#if $errors.institution}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$errors.institution}</span
                                        >
                                    {/if}
                                    <TextField
                                        hasError={!!$errors.professionalQualification}
                                        name="professionalQualification"
                                        label={'Kelayakan Perfesional'}
                                        bind:value={$form.professionalQualification}
                                    ></TextField>
                                    {#if $errors.professionalQualification}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$errors.professionalQualification}</span
                                        >
                                    {/if}
                                    <TextField
                                        hasError={!!$errors.courseTaken}
                                        name="courseTaken"
                                        label={'Khusus'}
                                        bind:value={$form.courseTaken}
                                    ></TextField>
                                    {#if $errors.courseTaken}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$errors.courseTaken}</span
                                        >
                                    {/if}
                                {/if}
                            </form>
                            <!-- <TextField disabled label="Bilangan Hari" value="7"
                            >
                        </TextField> -->
                        </div>
                    </section>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <!-- ========== STEPPER 3 ========== -->
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => submitFilesForm()}
                ><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col"></div>
            <SectionHeader subTitle="Dokumen Sokongan"
                ><div hidden={$fileSelectionList.length == 0}>
                    <FileInputField id="fileInput" {handleOnChange}
                    ></FileInputField>
                </div></SectionHeader
            >
            <div class="w-full">
                {#if errorData?.uploadedFiles}
                    <span class="font-sans text-sm italic text-system-danger"
                        >{errorData?.uploadedFiles[0]}</span
                    >
                {/if}
            </div>
            <div
                class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
            >
                <div class="flex flex-wrap gap-3">
                    {#each $fileSelectionList as item, index}
                        <FileInputFieldChildren
                            childrenType="grid"
                            handleDelete={() => handleDelete(index)}
                            fileName={item.name}
                        />
                    {/each}
                </div>
                <div class="flex flex-col items-center justify-center gap-2.5">
                    <p
                        class=" text-sm text-txt-tertiary"
                        hidden={$fileSelectionList.length > 0}
                    >
                        Pilih fail dari peranti anda.
                    </p>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="text-txt-tertiary"
                        hidden={$fileSelectionList.length > 0}
                    >
                        <svg
                            width={40}
                            height={40}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                        </svg>
                    </div>
                    <div hidden={$fileSelectionList.length > 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>

    <!-- ========== STEPPER 4 ========== -->
    <StepperContent>
        <StepperContentHeader title="Keputusan daripada Peranan - Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Pelulus</b>
                    </div>
                    {#if data.appproverResult.status}
                        <LongTextField
                            disabled
                            name="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:value={data.appproverResult.remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="approverIsApproved"
                            options={approveOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.appproverResult.status}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Penyokong</b>
                    </div>
                    {#if data.supporterResult.status}
                        <LongTextField
                            disabled
                            name="supporterRemark"
                            label="Tindakan/Ulasan"
                            bind:value={data.supporterResult.remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="supporterIsApproved"
                            options={supportOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.supporterResult.status}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Urus Setia Cuti</b
                        >
                    </div>
                    {#if !!data.verifierResult.status}
                        <LongTextField
                            disabled
                            name="service-secretary-remark"
                            label="Tindakan/Ulasan"
                            bind:value={data.verifierResult.remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="supporterIsApproved"
                            options={certifyOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.verifierResult.status}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Pengarah Negeri/Bahagian</b
                        >
                    </div>
                    {#if !!data.stateDirectorResult.status}
                        <LongTextField
                            disabled
                            name="service-secretary-remark"
                            label="Tindakan/Ulasan"
                            bind:value={data.stateDirectorResult.remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="supporterIsApproved"
                            options={supportOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.stateDirectorResult.status}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
