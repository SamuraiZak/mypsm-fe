<script lang="ts">
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _createFundApplicationForm } from './+page';
    import {
        _fundApplicationDetailResponseSchema,
        _fundApplicationUploadDocSchema,
    } from '$lib/schemas/mypsm/course/fund-application-schema';
    import { Checkbox } from 'flowbite-svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    let enableUploadDocument = false;

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

            if ($form.applicationTypeId[applicationTypeIdLastIndex] === 7) {
                $form.applicationTypeId = $form.applicationTypeId.filter(
                    (id) => id !== 8,
                );
            } else if (
                $form.applicationTypeId[applicationTypeIdLastIndex] === 8
            ) {
                $form.applicationTypeId = $form.applicationTypeId.filter(
                    (id) => id !== 7,
                );
            }
        },
        async onSubmit() {
            const result = await _createFundApplicationForm($form);

            if (result.response.status === 'success') {
                enableUploadDocument = true;
                // createdApplicationId = result.response.data?.details.id;
            }
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });
</script>

<ContentHeader title="Maklumat Pembiayaan Pelajaran">
    <TextIconButton
        label={enableUploadDocument ? 'Muat naik kemudian' : 'Kembali'}
        type="neutral"
        onClick={() => {
            goto('../scholarship');
        }}
    />
</ContentHeader>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pelajaran Yang Akan Diikuti">
            {#if !enableUploadDocument}
                <TextIconButton
                    type="neutral"
                    label="Simpan"
                    form="fundReimbursementFormStepper"
                    onClick={() => {
                        $form.isDraft = true;
                    }}
                />
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="fundReimbursementFormStepper"
                    onClick={() => {
                        $form.isDraft = false;
                    }}
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
</Stepper>

<Toaster />
