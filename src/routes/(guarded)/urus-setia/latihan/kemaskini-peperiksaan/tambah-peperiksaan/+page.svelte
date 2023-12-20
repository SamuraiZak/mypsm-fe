<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { years } from '$lib/mocks/dateSelection/years.js';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import type { ActionData, PageData, SubmitFunction } from './$types.js';
    import toast from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import { Select } from 'flowbite-svelte';
    export let data: PageData;
    export let form: ActionData;
    let activeStepper = 0;
    let disabled = true;
    let selected: any = '';

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
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM"
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
            ><TextIconButton
                primary
                label="Simpan"
                form="examForm"
            /></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="examForm"
                method="POST"
                use:enhance={submitCreateNote}
                class="flex w-full flex-col gap-2"
            >
                <DropdownSelect
                    isError={form?.errors.examType ? true : false}
                    dropdownType="label-left-full"
                    name="examType"
                    label="Jenis Peperiksaan"
                    bind:value={selected}
                    options={examTypes}
                ></DropdownSelect>
                <!-- {form?.data.examType} -->
                {#if form?.errors.examType}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{form?.errors?.examType[0]}</span
                    >
                {/if}

                <!-- <Select class="mt-2" items={examTypes} bind:value={selected} /> -->

                <TextField
                    isError={form?.errors.examTitle ? true : false}
                    name="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    value={form?.data.examTitle}
                />
                {#if form?.errors.examTitle}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{form?.errors?.examTitle[0]}</span
                    >
                {/if}
                <DateSelector
                    isError={form?.errors.applOpenDate ? true : false}
                    name="applOpenDate"
                    handleDateChange
                    label="Tarikh Mula Permohonam"
                    selectedDate={form?.data.applOpenDate}
                ></DateSelector>
                <DateSelector
                    isError={form?.errors.applCloseDate ? true : false}
                    name="applCloseDate"
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    selectedDate={form?.data.applCloseDate}
                ></DateSelector>
                <DateSelector
                    isError={form?.errors.examDate ? true : false}
                    name="examDate"
                    handleDateChange
                    label="Tarikh Peperiksaan"
                    selectedDate={form?.data.newExam}
                ></DateSelector>
                <LongTextField
                    isError={form?.errors.examLocation ? true : false}
                    name="examLocation"
                    label="Lokasi Peperiksaan"
                    value={form?.data.examLocation}
                />
                {form?.data.examLocation}
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
