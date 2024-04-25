<script lang="ts">
    import { error } from '@sveltejs/kit';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
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
    import { _editExamForm } from './+page';
    export let data: PageData;

    let isReadonlyExamFormStepper: boolean = true;

    // Superforms
    const { form, errors, enhance, isTainted } = superForm(data.examInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_examInfoResponseSchema),
        async onSubmit() {
            if (!isTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _editExamForm($form);

            if (result.response.status === 'success')
                isReadonlyExamFormStepper = true;
        },
        taintedMessage: false,
    });
</script>

<ContentHeader title="Maklumat Lantikan Baru"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../../latihan/kemaskini-peperiksaan');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM">
            {#if isReadonlyExamFormStepper}
                <TextIconButton
                    type="neutral"
                    label="Kemaskini"
                    onClick={() => (isReadonlyExamFormStepper = false)}
                />
            {:else}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => (isReadonlyExamFormStepper = false)}
                    form="examFormStepper"
                />
                <TextIconButton
                    type="neutral"
                    label="Batal"
                    onClick={() => (isReadonlyExamFormStepper = true)}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peperiksaan -->
            <form
                id="examFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <input type="text" hidden bind:value={$form.id} />

                <CustomSelectField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examTypeId}
                    id="examTypeId"
                    label="Jenis Peperiksaan"
                    bind:val={$form.examTypeId}
                    options={data.selectionOptions.examTypeLookup}
                ></CustomSelectField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examTitle}
                    id="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:val={$form.examTitle}
                ></CustomTextField>

                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.startDate}
                    id="startDate"
                    label="Tarikh Mula Permohonan"
                    type="date"
                    bind:val={$form.startDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.endDate}
                    id="endDate"
                    label="Tarikh Tutup Permohonan"
                    type="date"
                    bind:val={$form.endDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examDate}
                    id="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    bind:val={$form.examDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
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
