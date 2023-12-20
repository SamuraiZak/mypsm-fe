<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import toast from 'svelte-french-toast';
    import ErrorMessage from '$lib/components/error-message/ErrorMessage.svelte';
    // import { z } from 'zod';
    export let data;
    let activeStepper = 0;

    export let form;

    const submitCreateNote: SubmitFunction = ({ formData }) => {
        toast.success('Berjaya disimpan!');

        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    toast.success('Berjaya disimpan!');
                    break;
                default:
                    break;
            }
            await update({ reset: false });
        };
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Kemaskini Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM - {data
            .record.currentExam.examTitle}"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../kemaskini-peperiksaan');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM"
            ><TextIconButton primary label="Simpan" form="examForm" />
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="examForm"
                method="POST"
                class="flex w-full flex-col gap-2"
                use:enhance={submitCreateNote}
            >
                <DropdownSelect
                    name="examType"
                    dropdownType="label-left-full"
                    label="Jenis Peperiksaan"
                    value={data.record.currentExam.examType}
                    options={examTypes}
                ></DropdownSelect>
                <TextField
                    isError={form?.errors.examTitle ? true : false}
                    name="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    value={form?.data.examTitle ??
                        data.record.currentExam.examTitle}
                />
                <!-- <ErrorMessage
                    condition={form?.errors.examTitle}
                    message={form?.errors?.examTitle[0]}
                /> -->
                {#if form?.errors.examTitle}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{form?.errors?.examTitle[0]}</span
                    >
                {/if}
                <DateSelector
                    name="applOpenDate"
                    handleDateChange
                    label="Tarikh Mula Permohonan"
                    selectedDate={form?.errors.applOpenDate ??
                        data.record.currentExam.examApplicationOpenDate}
                ></DateSelector>
                <DateSelector
                    name="applCloseDate"
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    selectedDate={form?.errors.applCloseDate ??
                        data.record.currentExam.examApplicationCloseDate}
                ></DateSelector>
                {#if form?.errors.applCloseDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{form?.errors?.applCloseDate[0]}</span
                    >
                {/if}
                <TextField
                    name="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    value={form?.data.examDate ??
                        data.record.currentExam.examDate}
                />
                {#if form?.errors.examDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{form?.errors?.examDate[0]}</span
                    >
                {/if}
                <LongTextField
                    name="examLocation"
                    label="Lokasi Peperiksaan"
                    value={form?.data.examLocation ??
                        data.record.currentExam.examLocation}
                />
                {#if form?.errors.examLocation}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{form?.errors?.examLocation[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>
