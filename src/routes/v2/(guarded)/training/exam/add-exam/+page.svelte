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
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _createExamForm } from './+page';
    export let data: PageData;

    // Superforms
    const { form, errors, enhance } = superForm(data.examInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        validationMethod: 'oninput',
        validators: zod(_examInfoResponseSchema),
        onSubmit(formData) {
            _createExamForm(formData.formData);
        },
        taintedMessage: false,
    });
</script>

<ContentHeader title="Maklumat Peperiksaan"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../exam');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM">
            <TextIconButton
                type="primary"
                label="Simpan"
                form="examFormStepper"
            />
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peperiksaan -->
            <form
                id="examFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <CustomSelectField
                    disabled={false}
                    errors={$errors.examTypeId}
                    id="examTypeId"
                    label="Jenis Peperiksaan"
                    bind:val={$form.examTypeId}
                    options={data.selectionOptions.examTypeLookup}
                ></CustomSelectField>
                <CustomTextField
                    disabled={false}
                    errors={$errors.examTitle}
                    id="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:val={$form.examTitle}
                ></CustomTextField>

                <CustomTextField
                    disabled={false}
                    errors={$errors.startDate}
                    id="startDate"
                    label="Tarikh Mula Permohonan"
                    type="date"
                    bind:val={$form.startDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={false}
                    errors={$errors.endDate}
                    id="endDate"
                    label="Tarikh Tutup Permohonan"
                    type="date"
                    bind:val={$form.endDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={false}
                    errors={$errors.examDate}
                    id="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    bind:val={$form.examDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={false}
                    errors={$errors.examLocation}
                    id="examLocation"
                    label="Lokasi Peperiksaan"
                    type="text"
                    bind:val={$form.examLocation}
                ></CustomTextField>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
