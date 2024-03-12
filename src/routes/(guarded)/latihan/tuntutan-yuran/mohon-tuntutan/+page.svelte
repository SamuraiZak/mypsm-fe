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
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _createFundReimbursementForm } from './+page';
    import { _fundReimbursementDetailResponseSchema } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
    import type { PageData } from './$types';
    export let data: PageData;

    // Superforms
    const { form, errors, enhance } = superForm(data.reimbursementInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        validationMethod: 'oninput',
        validators: zod(_fundReimbursementDetailResponseSchema),
        onSubmit(formData) {
            _createFundReimbursementForm(formData.formData);
        },
        taintedMessage: false,
    });
</script>

<ContentHeader title="Maklumat Pembiayaan Pelajaran"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../tuntutan-yuran');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengajian Diikuti">
            <TextIconButton
                type="primary"
                label="Simpan"
                form="fundReimbursementFormStepper"
            />
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peperiksaan -->
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
                    label="Tempat Pengajian"
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
                    type="number"
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
                    errors={$errors.finishedStudyDate}
                    id="finishedStudyDate"
                    label="Tamat Pada"
                    type="date"
                    bind:val={$form.finishedStudyDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled={false}
                    errors={$errors.semester}
                    id="semester"
                    label="Tuntutan Untuk Semester"
                    bind:val={$form.semester}
                    options={[
                        {
                            value: 4,
                            name: 'Empat',
                        },
                        {
                            value: 5,
                            name: 'Lima',
                        },
                        {
                            value: 6,
                            name: 'Enam',
                        },
                    ]}
                ></CustomSelectField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.finalResult}
                    id="finalResult"
                    label="Keputusan Akhir (CGPA)"
                    type="text"
                    bind:val={$form.finalResult}
                ></CustomTextField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.totalClaim}
                    id="totalClaim"
                    label="Jumlah Tuntutan (RM)"
                    type="number"
                    bind:val={$form.totalClaim}
                ></CustomTextField>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
