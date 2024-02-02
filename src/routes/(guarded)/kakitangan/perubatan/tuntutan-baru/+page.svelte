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
    import { klinik } from '$lib/mocks/urus-setia/perubatan/klinik';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import DynamicAccordionForm from '$lib/components/form/DynamicAccordionForm.svelte';
    import { mockSenaraiTuntutanLists } from '$lib/mocks/database/mockSenaraiTuntutanLists';
    import { fileSelectionList } from '$lib/stores/globalState';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { onMount } from 'svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import { _stepperClaimInfo, _submitFormStepperClaimInfo } from './+page';
    import { superForm } from 'sveltekit-superforms/client';

    export let disabled: boolean = true;
    export let selectedFiles: any = [];
    export let data: PageData;

    let selectedDate = new Date();
    let selectedKlinik = klinik[0].value;
    let labelBlack = !disabled;
    let senaraiTuntutan: IntSenaraiTuntutanLists[] = mockSenaraiTuntutanLists;

    let target: any;
    let errorData: any;
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

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const {
        form: claimInfoForm,
        errors: claimInfoErrors,
        enhance: claimInfoEnhance,
    } = superForm(data.stepperClaimInfo, {
        SPA: true,
        validators: _stepperClaimInfo,
        onSubmit() {
            _submitFormStepperClaimInfo($claimInfoForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tuntutan Perubatan"
        description="Butiran-butiran permohonan tuntutan perubatan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/kakitangan/perubatan/');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
                <TextField
                    {disabled}
                    id="nama"
                    label={'Nama'}
                    value={'Irfan Bin Abu'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. K/P'}
                    value={'111111-11-1111'}
                ></TextField>
                <TextField
                    {disabled}
                    id="gred"
                    label={'Gred'}
                    value={'F41 - Pegawai Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="penempatan"
                    label={'Penempatan'}
                    value={'5345 - Bhgn. Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="kumpulan"
                    label={'Kumpulan'}
                    value={'PP1 - Pengurusan dan Professional - A'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tuntutan"
            ><TextIconButton primary label="Simpan" form="FormStepperClaimInfo">
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperClaimInfo"
                class="flex w-full flex-col gap-2"
                use:claimInfoEnhance
                method="POST"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2"
                    >
                        <DateSelector
                            {disabled}
                            {handleDateChange}
                            label={'Tarikh Rawatan'}
                        />
                        <DropdownSelect
                            hasError={!!$claimInfoErrors.name}
                            dropdownType="label-left-full"
                            id="name"
                            label="Klinik"
                            bind:value={$claimInfoForm.name}
                            options={[
                                { value: '1', name: 'Klinik A' },
                                { value: '2', name: 'Klinik B' },
                                { value: '3', name: 'Klinik C' },
                            ]}
                        ></DropdownSelect>
                        {#if $claimInfoErrors.name}
                            <span
                                class="ml-[-665px] font-sans text-sm italic text-system-danger"
                                >{$claimInfoErrors.name}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            id="bil-hari-cuti-sakit"
                            label={'Bil Hari Cuti Sakit'}
                            value={'2'}
                        ></TextField>
                    </div>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Senarai Tuntutan</p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2"
                    >
                        {#each senaraiTuntutan as item, index}
                            <DynamicAccordionForm
                                hasDelete
                                header="Tuntutan #{index + 1}"
                                open
                                ><div
                                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                                >
                                    <TextField
                                        labelType="label-200"
                                        {labelBlack}
                                        disabled
                                        label="Bil"
                                        value="1"
                                    ></TextField>
                                    <TextField
                                        labelType="label-200"
                                        {labelBlack}
                                        disabled
                                        label="Jumlah Rawatan (RM)"
                                        value={item.jumlahRawatan}
                                    ></TextField>
                                </div>
                            </DynamicAccordionForm>
                        {/each}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent
        ><StepperContentHeader title="Dokumen yang Berkaitan"
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
