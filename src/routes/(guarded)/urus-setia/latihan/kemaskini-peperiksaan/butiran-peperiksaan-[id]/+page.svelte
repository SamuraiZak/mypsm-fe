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
    export let data;
    let activeStepper = 0;

    export let form;
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
            ><TextIconButton primary label="Simpan" />
            <button type="submit" form="examForm">SUMBIT</button
            ></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="examForm"
                method="POST"
                class="flex w-full flex-col gap-2"
            >
                <DropdownSelect
                    name="examType"
                    dropdownType="label-left-full"
                    label="Jenis Peperiksaan"
                    value={data.record.currentExam.examType}
                    options={examTypes}
                ></DropdownSelect>
                <span class={form?.errors.examTitle ? 'ring-2' : 'border-none'}>
                    <TextField
                        name="examTitle"
                        label="Tajuk Peperiksaan"
                        type="text"
                        value={form?.errors.examTitle ??
                            data.record.currentExam.examTitle}
                    />
                </span>
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
                <TextField
                    name="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    value={form?.errors.examDate ??
                        data.record.currentExam.examDate}
                />
                <LongTextField
                    name="examLocation"
                    label="Lokasi Peperiksaan"
                    value={form?.errors.examLocation ??
                        data.record.currentExam.examLocation}
                />
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>
