<script lang="ts">
    import CustomRadioBoolean from './../../../../../lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
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
    import { Checkbox } from 'flowbite-svelte';
    export let data: PageData;

    let enableUploadDocument = false;
    let createdApplicationId: number;

    // Superforms
    const { form, errors, enhance } = superForm(data.fundApplicationInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_fundApplicationDetailResponseSchema),
        onChange() {
            const educationTypeIdLastIndex = $form.educationTypeId.length - 1;

            if ($form.educationTypeId[educationTypeIdLastIndex] === 3) {
                $form.educationTypeId = $form.educationTypeId.filter(
                    (id) => id !== 4,
                );
            } else if ($form.educationTypeId[educationTypeIdLastIndex] === 4) {
                $form.educationTypeId = $form.educationTypeId.filter(
                    (id) => id !== 3,
                );
            }

            const applicationTypeIdLastIndex =
                $form.applicationTypeId.length - 1;

            if ($form.applicationTypeId[applicationTypeIdLastIndex] === 8) {
                $form.applicationTypeId = $form.applicationTypeId.filter(
                    (id) => id !== 9,
                );
            } else if (
                $form.applicationTypeId[applicationTypeIdLastIndex] === 9
            ) {
                $form.applicationTypeId = $form.applicationTypeId.filter(
                    (id) => id !== 8,
                );
            }
        },
        async onSubmit() {
            const result = await _createFundApplicationForm($form);

            if (result.response.status === 'success') {
                enableUploadDocument = true;
                createdApplicationId = result.response.data?.details.id;
            }
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });

    const {
        form: fundApplicationUploadDocumentForm,
        errors: fundApplicationUploadDocumentError,
        enhance: fundApplicationUploadDocumentEnhance,
    } = superForm(data.fundApplicationUploadDocumentForm, {
        SPA: true,
        resetForm: false,
        id: 'documentUploadForm',
        validators: zod(_fundApplicationUploadDocSchema),
        onSubmit() {
            _submitDocumentForm(
                createdApplicationId,
                $fundApplicationUploadDocumentForm.documents,
            );
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });

    const handleOnInput = (e: Event) => {
        const additionalFiles: File[] = Array.from(
            (e.currentTarget as HTMLInputElement)?.files ?? [],
        );

        additionalFiles.forEach((file) => {
            $fundApplicationUploadDocumentForm.documents = [
                ...$fundApplicationUploadDocumentForm.documents,
                file,
            ];
        });
    };
    const handleDelete = (i: number) => {
        $fundApplicationUploadDocumentForm.documents =
            $fundApplicationUploadDocumentForm.documents.filter((_, index) => {
                return index !== i;
            });
    };
</script>

<ContentHeader title="Maklumat Pembiayaan Pelajaran">
    <TextIconButton
        label={enableUploadDocument ? 'Muat naik kemudian' : 'Kembali'}
        type="neutral"
        onClick={() => {
            goto('../pembiayaan');
        }}
    />
</ContentHeader>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pelajaran Yang Akan Diikuti">
            {#if !enableUploadDocument}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="fundReimbursementFormStepper"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="fundReimbursementFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <CustomSelectField
                    disabled={enableUploadDocument}
                    errors={$errors.academicLevel}
                    id="academicLevel"
                    label="Peringkat Kursus Pengajian"
                    bind:val={$form.academicLevel}
                    options={data.lookups.educationLookup}
                ></CustomSelectField>
                <CustomTextField
                    disabled={enableUploadDocument}
                    errors={$errors.courseName}
                    id="courseName"
                    label="Nama Kursus Pengajian"
                    type="text"
                    bind:val={$form.courseName}
                ></CustomTextField>

                <CustomSelectField
                    disabled={enableUploadDocument}
                    errors={$errors.institution}
                    id="institution"
                    label="Nama IPTA"
                    bind:val={$form.institution}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={enableUploadDocument}
                    errors={$errors.learningInstitution}
                    id="learningInstitution"
                    label="Institusi/Pusat Pembelajaran"
                    bind:val={$form.learningInstitution}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={enableUploadDocument}
                    errors={$errors.studyDuration}
                    id="studyDuration"
                    label="Tempoh Pengajian (Tahun)"
                    type="text"
                    bind:val={$form.studyDuration}
                ></CustomTextField>

                <CustomTextField
                    disabled={enableUploadDocument}
                    errors={$errors.entryDateToInstituition}
                    id="entryDateToInstituition"
                    label="Tarikh Kemasukan Ke IPTA"
                    type="date"
                    bind:val={$form.entryDateToInstituition}
                ></CustomTextField>

                <CustomTextField
                    disabled={enableUploadDocument}
                    errors={$errors.expectedFinishedStudyDate}
                    id="expectedFinishedStudyDate"
                    label="Dijangka Tamat Pada"
                    type="date"
                    bind:val={$form.expectedFinishedStudyDate}
                ></CustomTextField>

                <div
                    class="mb-3 flex h-fit w-full flex-col items-start justify-start gap-y-2 bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                >
                    <label
                        for="role"
                        class="mb-2 block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >Jenis Pengajian
                        <span class="text-base text-system-danger">*</span>
                    </label>
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.educationTypeId.includes(1)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[0].value}
                        >{data.lookups.educationTypeLookup[0].name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.educationTypeId.includes(2)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[1].value}
                        >{data.lookups.educationTypeLookup[1].name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.educationTypeId.includes(3)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[2].value}
                        >{data.lookups.educationTypeLookup[2].name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.educationTypeId.includes(4)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[3].value}
                        >{data.lookups.educationTypeLookup[3].name}</Checkbox
                    >
                </div>

                <div
                    class="mb-3 flex h-fit w-full flex-col items-start justify-start gap-y-2 bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                >
                    <label
                        for="role"
                        class="mb-2 block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >Jenis Permohonan
                        <span class="text-base text-system-danger">*</span>
                    </label>
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.applicationTypeId.includes(1)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[0]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[0]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.applicationTypeId.includes(2)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[1]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[1]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.applicationTypeId.includes(3)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[2]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[2]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.applicationTypeId.includes(4)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[3]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[3]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={enableUploadDocument}
                        checked={$form.applicationTypeId.includes(5)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[4]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[4]
                            .name}</Checkbox
                    >
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    {#if enableUploadDocument}
        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                <TextIconButton
                    label="Simpan"
                    form="documentUploadForm"
                    type="primary"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm">
                        Sila muat turun, isi dengan lengkap dokumen berikut,
                        kemudian muat naik dokumen pada ruangan yang disediakan.
                    </p>

                    <ol class="list-inside list-decimal space-y-1 text-sm">
                        <li>Surat tawaran</li>
                        <li>Kebenaran melanjutkan pelajaran</li>
                        <li>Lain-lain dokumen yang berkaitan</li>
                    </ol>
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
                                >Sila muat naik dokumen barkaitan dan pastikan
                                tidak melebihi 10MB.</span
                            >
                        {/if}
                        <ContentHeader
                            title="Dokumen Sokongan"
                            borderClass="border-none"
                        >
                            <div
                                hidden={$fundApplicationUploadDocumentForm
                                    .documents.length < 1}
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
                                {#if $fundApplicationUploadDocumentForm.documents.length > 0}
                                    {#each $fundApplicationUploadDocumentForm.documents as _, i}
                                        <FileInputFieldChildren
                                            childrenType="grid"
                                            handleDelete={() => handleDelete(i)}
                                            document={$fundApplicationUploadDocumentForm
                                                .documents[i]}
                                        />
                                    {/each}
                                {/if}
                            </div>
                            {#if $fundApplicationUploadDocumentForm.documents.length < 1}
                                <div
                                    class="flex flex-col items-center justify-center gap-2.5 text-sm text-txt-tertiary"
                                >
                                    <span>Pilih fail dari peranti anda.</span>
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
                                    <FileInputField
                                        id="documents"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            {/if}
                        </div>
                    </form>
                </div></StepperContentBody
            >
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
