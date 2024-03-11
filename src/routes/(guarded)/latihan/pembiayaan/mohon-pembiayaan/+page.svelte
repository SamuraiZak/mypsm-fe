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
    import { _createFundApplicationForm } from './+page';
    import { _fundApplicationDetailResponseSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
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

    const proxyExpectedFinishedStudyDate = dateProxy(
        form,
        'expectedFinishedStudyDate',
        {
            format: 'date',
        },
    );
    const proxyEntryDateToInstituition = dateProxy(
        form,
        'entryDateToInstituition',
        {
            format: 'date',
        },
    );
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
                    errors={$errors.academicLevel}
                    id="academicLevel"
                    label="Peringkat Kursus Pengajian"
                    bind:val={$form.academicLevel}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

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
                    options={data.lookups.educationLookup}
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
                    bind:val={$proxyEntryDateToInstituition}
                ></CustomTextField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.expectedFinishedStudyDate}
                    id="expectedFinishedStudyDate"
                    label="Dijangka Tamat Pada"
                    type="date"
                    bind:val={$proxyExpectedFinishedStudyDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.educationType}
                    id="educationType"
                    label="Jenis Pengajian"
                    bind:val={$form.educationType}
                    options={data.lookups.educationLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.applicationType}
                    id="applicationType"
                    label="Jenis Permohonan"
                    bind:val={$form.applicationType}
                    options={data.lookups.educationLookup}
                ></CustomSelectField>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
