<script lang="ts">
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _createFundApplicationForm, _submitDocumentForm } from './+page';
    import {
        _fundApplicationDetailResponseSchema,
        _fundApplicationUploadDocSchema,
    } from '$lib/schemas/mypsm/course/fund-application-schema';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    export let data: PageData;

    // Superforms
    const { form, errors, enhance } = superForm(data.fundApplicationInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationDetailResponseSchema),
        onSubmit(formData) {
            _createFundApplicationForm(formData.formData);
        },
        taintedMessage: false,
    });

    const {
        form: fundApplicationUploadDocumentForm,
        errors: fundApplicationUploadDocumentError,
        enhance: fundApplicationUploadDocumentEnhance,
    } = superForm(data.fundApplicationUploadDocumentForm, {
        SPA: true,
        resetForm: false,
        taintedMessage: false,
        id: 'documentUploadForm',
        validators: zod(_fundApplicationUploadDocSchema),
        onSubmit() {
            _submitDocumentForm(
                $fundApplicationUploadDocumentForm.documents as File,
            );
        },
    });

    const handleOnInput = (e: Event) => {
        $fundApplicationUploadDocumentForm.documents =
            ((e.currentTarget as HTMLInputElement)?.files?.item(0) as File) ??
            null;
    };
    function handleDelete() {
        $fundApplicationUploadDocumentForm.documents = null;
    }
</script>

<ContentHeader title="Maklumat Pembiayaan Pelajaran"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../latihan/pembiayaan');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pelajaran Yang Akan Diikuti">
            <TextIconButton
                type="primary"
                label="Simpan"
                form="fundReimbursementFormStepper"
            />
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="fundReimbursementFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <CustomSelectField
                    disabled={false}
                    errors={$errors.academicLevel}
                    id="academicLevel"
                    label="Peringkat Kursus Pengajian"
                    bind:val={$form.academicLevel}
                    options={data.lookups.educationLookup}
                ></CustomSelectField>
                <CustomTextField
                    disabled={false}
                    errors={$errors.courseName}
                    id="courseName"
                    label="Nama Kursus Pengajian"
                    type="text"
                    bind:val={$form.courseName}
                ></CustomTextField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.institution}
                    id="institution"
                    label="Nama IPTA"
                    bind:val={$form.institution}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.learningInstitution}
                    id="learningInstitution"
                    label="Institusi/Pusat Pembelajaran"
                    bind:val={$form.learningInstitution}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.studyDuration}
                    id="studyDuration"
                    label="Tempoh Pengajian (Tahun)"
                    type="text"
                    bind:val={$form.studyDuration}
                ></CustomTextField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.entryDateToInstituition}
                    id="entryDateToInstituition"
                    label="Tarikh Kemasukan Ke IPTA"
                    type="date"
                    bind:val={$form.entryDateToInstituition}
                ></CustomTextField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.expectedFinishedStudyDate}
                    id="expectedFinishedStudyDate"
                    label="Dijangka Tamat Pada"
                    type="date"
                    bind:val={$form.expectedFinishedStudyDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.educationTypeId}
                    id="educationTypeId"
                    label="Jenis Pengajian"
                    bind:val={$form.educationTypeId}
                    options={data.lookups.educationTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.applicationTypeId}
                    id="applicationTypeId"
                    label="Jenis Permohonan"
                    bind:val={$form.applicationTypeId}
                    options={data.lookups.fundApplicationTypeLookup}
                ></CustomSelectField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <TextIconButton
                label="Simpan"
                form="documentUploadForm"
                type="primary"
                icon="check"
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="documentUploadForm"
                    enctype="multipart/form-data"
                    use:fundApplicationUploadDocumentEnhance
                >
                    {#if $fundApplicationUploadDocumentError.documents}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >Sila muat naik dokumen barkaitan dan pastikan tidak
                            melebihi 4MB.</span
                        >
                    {/if}
                    <ContentHeader
                        title="Dokumen Sokongan"
                        borderClass="border-none"
                    >
                        <div
                            hidden={!(
                                $fundApplicationUploadDocumentForm.documents instanceof
                                File
                            )}
                        >
                            <FileInputField
                                id="documents"
                                handleOnInput={(e) => handleOnInput(e)}
                            ></FileInputField>
                        </div>
                    </ContentHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                    >
                        <div class="flex flex-wrap gap-3">
                            <!-- {#each $documentForm.documents as item, index} -->
                            {#if $fundApplicationUploadDocumentForm.documents instanceof File}
                                <FileInputFieldChildren
                                    childrenType="grid"
                                    handleDelete={() => handleDelete()}
                                    fileName={$fundApplicationUploadDocumentForm
                                        .documents?.name}
                                />
                            {/if}
                            <!-- {/each} -->
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2.5"
                        >
                            <p
                                class=" text-sm text-txt-tertiary"
                                hidden={$fundApplicationUploadDocumentForm.documents instanceof
                                    File}
                            >
                                Pilih fail dari peranti anda.
                            </p>
                            <div
                                class="text-txt-tertiary"
                                hidden={$fundApplicationUploadDocumentForm.documents instanceof
                                    File}
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
                            <div
                                hidden={$fundApplicationUploadDocumentForm.documents instanceof
                                    File}
                            >
                                <FileInputField id="documents"></FileInputField>
                            </div>
                        </div>
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>

<Toaster />
