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
    import type { PageData } from './$types.js';
    import toast from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import { Select } from 'flowbite-svelte';
    import { fail, type SubmitFunction } from '@sveltejs/kit';
    import { z } from 'zod';
    export let data: PageData;
    // export let form;
    let activeStepper = 0;
    let disabled = true;
    let selected: any = '';

    // z validation schema for the exam form fields
    const examFormSchema = z.object({
        examType: z.enum(['perkhidmatan', 'psl'], {
            required_error: 'Jenis latihan perlu dipilih.',
        }),
        examTitle: z
            .string({ required_error: 'Tajuk latihan tidak boleh kosong.' })
            .min(4, { message: 'Tajuk hendaklah lebih daripada 4 karakter.' })
            .max(84, { message: 'Tajuk tidak boleh melebihi 84 karakter.' })
            .trim(),
        applOpenDate: z.coerce.date().min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        }),
        applCloseDate: z.coerce.date().min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        }),
        examDate: z.coerce.date().min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        }),
        examLocation: z
            .string({ required_error: 'Lokasi tidak boleh kosong.' })
            .min(4, { message: 'Lokasi hendaklah lebih daripada 4 karakter.' })
            .max(124, { message: 'Lokasi tidak boleh melebihi 124 karakter.' })
            .trim(),
    });

    let examType: string = '';
    let examTitle: string = '';
    let applOpenDate: string = '';
    let applCloseDate: string = '';
    let examDate: string = '';
    let examLocation: string = '';
    let errorData: any;

    const submitExamForm = async () => {
        toast.success('Berjaya disimpan!');

        const examFormData = {
            examType,
            examTitle,
            applOpenDate,
            applCloseDate,
            examDate,
            examLocation,
        };
        try {
            const result = examFormSchema.parse(examFormData);
            console.log('SUCCESS', result);
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err.issues);
            }
            const { fieldErrors: errors } = err.flatten();
            errorData = errors;
            console.log(errorData);
        }
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
                on:submit|preventDefault={submitExamForm}
                class="flex w-full flex-col gap-2"
            >
                <DropdownSelect
                    isError={errorData?.examType ? true : false}
                    dropdownType="label-left-full"
                    name="examType"
                    label="Jenis Peperiksaan"
                    bind:value={examType}
                    options={examTypes}
                ></DropdownSelect>
                {#if errorData?.examType}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examType[0]}</span
                    >
                {/if}
                <TextField
                    isError={errorData?.examTitle ? true : false}
                    name="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:value={examTitle}
                />
                {#if errorData?.examTitle}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examTitle[0]}</span
                    >
                {/if}
                <DateSelector
                    isError={errorData?.applOpenDate ? true : false}
                    name="applOpenDate"
                    handleDateChange
                    label="Tarikh Mula Permohonam"
                    bind:selectedDate={applOpenDate}
                ></DateSelector>
                {#if errorData?.applOpenDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.applOpenDate[0]}</span
                    >
                {/if}
                <DateSelector
                    isError={errorData?.applCloseDate ? true : false}
                    name="applCloseDate"
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={applCloseDate}
                ></DateSelector>
                {#if errorData?.applCloseDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.applCloseDate[0]}</span
                    >
                {/if}
                <DateSelector
                    isError={errorData?.examDate ? true : false}
                    name="examDate"
                    handleDateChange
                    label="Tarikh Peperiksaan"
                    bind:selectedDate={examDate}
                ></DateSelector>
                {#if errorData?.newExam}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.newExam[0]}</span
                    >
                {/if}
                <LongTextField
                    isError={errorData?.examLocation ? true : false}
                    name="examLocation"
                    label="Lokasi Peperiksaan"
                    bind:value={examLocation}
                />
                {#if errorData?.examLocation}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examLocation[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>
