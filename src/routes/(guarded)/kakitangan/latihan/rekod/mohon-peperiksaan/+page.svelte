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
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    export let data;
    let activeStepper = 0;
    let selectedRow: IntExams;

    let disabled = true;
    // let isEditable = data.record.currentEmployee.status === 'baru' ? true : false;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Kemaskini Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../rekod');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM"
            ><TextIconButton primary label="Simpan" /></StepperContentHeader
        >
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <DropdownSelect
                    dropdownType="label-left-full"
                    name="exam-type-dropdown"
                    label="Jenis Peperiksaan"
                    bind:value={data.record.newExam.examType}
                    options={examTypes}
                ></DropdownSelect>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <SectionHeader title="Senarai Peperiksaan"></SectionHeader>
                    <DynamicTable
                        hasCheckbox
                        excludeCol={['id']}
                        tableItems={data.records.examsAvailable.filter(
                            (exam) =>
                                exam.examType === data.record.newExam.examType,
                        )}
                        bind:passData={selectedRow}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </div>
    </StepperContent>
</Stepper>
