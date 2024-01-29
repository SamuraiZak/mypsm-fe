<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { klinik } from '$lib/mocks/urus-setia/perubatan/klinik';
    import { tahunRawatan } from '$lib/mocks/klinik-panel/tahun-rawatan';
    import { bulanRawatan } from '$lib/mocks/klinik-panel/bulan-rawatan';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _stepperInvoiceInfo,
        _submitFormStepperInvoiceInfo,
    } from './+page';

    export let data: PageData;
    export let disabled: boolean = true;
    export let selectedFiles: any = [];

    let errorData: any;
    let target: any;
    let texthidden = false;
    let selectedKlinik = klinik[0].value;
    let selectedBulanRawatan = bulanRawatan[0].value;
    let selectedTahunRawatan = tahunRawatan[0].value;
    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

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

    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    const retirementDocumentForm = async (event: Event) => {
        let uploadedFiles = selectedFiles;
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            uploadedFiles: uploadedFiles,
        };

        const exampleFormSchema = z.object({
            // checkbox schema

            uploadedFiles: z.any().array().nonempty({
                message:
                    'Sila muat naik dokumen sokongan pada ruangan disediakan.',
            }),
        });

        try {
            const result = exampleFormSchema.parse(exampleFormData);
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

    const {
        form: invoiceInfoForm,
        errors: invoiceInfoErrors,
        enhance: invoiceInfoEnhance,
    } = superForm(data.stepperInvoiceInfo, {
        SPA: true,
        validators: _stepperInvoiceInfo,
        onSubmit() {
            _submitFormStepperInvoiceInfo($invoiceInfoForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Penambahan Bil Tuntutan"
        description="Masukkan maklumat bil tuntutan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/klinik-panel/bil-tuntutan-panel-klinik');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Invois"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperInvoiceInfo"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperInvoiceInfo"
                class="flex w-full flex-col gap-2"
                use:invoiceInfoEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <DropdownSelect
                        hasError={!!$invoiceInfoErrors.name}
                        dropdownType="label-left-full"
                        id="name"
                        label="Klinik"
                        bind:value={$invoiceInfoForm.name}
                        options={[
                            { value: '1', name: 'Klinik A' },
                            { value: '2', name: 'Klinik B' },
                            { value: '3', name: 'Klinik C' },
                        ]}
                    ></DropdownSelect>
                    {#if $invoiceInfoErrors.name}
                        <span
                            class="ml-[-500px] font-sans text-sm italic text-system-danger"
                            >{$invoiceInfoErrors.name}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Invoice'}
                    />
                    <TextField
                        {disabled}
                        id="noInvois"
                        label={'No. Invois'}
                        value={''}
                    ></TextField>
                    <DropdownSelect
                        hasError={!!$invoiceInfoErrors.treatmentMonth}
                        dropdownType="label-left-full"
                        id="treatmentMonth"
                        label="Bulan Rawatan"
                        bind:value={$invoiceInfoForm.treatmentMonth}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'Februari' },
                            { value: '3', name: 'Mac' },
                        ]}
                    ></DropdownSelect>
                    {#if $invoiceInfoErrors.treatmentMonth}
                        <span
                            class="ml-[-500px] font-sans text-sm italic text-system-danger"
                            >{$invoiceInfoErrors.treatmentMonth}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={!!$invoiceInfoErrors.treatmentYear}
                        dropdownType="label-left-full"
                        id="treatmentYear"
                        label="Bulan Rawatan"
                        bind:value={$invoiceInfoForm.treatmentYear}
                        options={[
                            { value: '1', name: '2020' },
                            { value: '2', name: '2021' },
                            { value: '3', name: '2022' },
                        ]}
                    ></DropdownSelect>
                    {#if $invoiceInfoErrors.treatmentYear}
                        <span
                            class="ml-[-500px] font-sans text-sm italic text-system-danger"
                            >{$invoiceInfoErrors.treatmentYear}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        id="jumlah"
                        label={'Jumlah'}
                        value={'Kuching'}
                    ></TextField>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent
        ><StepperContentHeader title="Dokumen Sokongan yang Berkaitan"
            ><TextIconButton
                primary
                label="Hantar"
                form="retirementDocumentFormValidation"
                ><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="retirementDocumentFormValidation"
                on:submit|preventDefault={retirementDocumentForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Muat Naik Dokumen</p>
                    <SectionHeader subTitle="Dokumen Sokongan"
                        ><div hidden={$fileSelectionList.length == 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div></SectionHeader
                    >

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
                        <div
                            class="flex flex-col items-center justify-center gap-2.5"
                        >
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
                    <div class="w-full">
                        {#if errorData?.uploadedFiles}
                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >{errorData?.uploadedFiles[0]}</span
                            >
                        {/if}
                    </div>
                    <p class="text-sm">Fail-fail yang telah dimuat naik:</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment fileName="Resit-1" />
                        </li>
                        <li>
                            <DownloadAttachment fileName="Resit-2" />
                        </li>
                    </ul>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
