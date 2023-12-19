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
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import { Badge } from 'flowbite-svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    export let data;
    let examApplication: IntExamAppl = data.record.currentExam;
    let activeStepper = 0;
    let disabled = true;
    // let isEditable = data.record.currentEmployee.status === 'baru' ? true : false;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;
    let selectedExamType = '-';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Kemaskini Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM - {data
            .record.currentExam.exam.examTitle}"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../rekod');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper
    activeIndex={activeStepper}
    dataId="ID: {data.record.currentExam.candidateEmpNumber}"
    dataStatus="Status: {data.record.currentExam.status}"
>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM"
        ></StepperContentHeader>
        <form action="" class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <DropdownSelect
                    {disabled}
                    dropdownType="label-left-full"
                    name="exam-type-dropdown"
                    label="Jenis Peperiksaan"
                    bind:value={data.record.currentExam.exam.examType}
                    options={examTypes}
                ></DropdownSelect>
                <TextField
                    {disabled}
                    name="exam-title"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:value={data.record.currentExam.exam.examTitle}
                />
                <DateSelector
                    {disabled}
                    name="appl-open-date"
                    handleDateChange
                    label="Tarikh Mula Permohonam"
                    bind:selectedDate={data.record.currentExam.exam
                        .examApplicationOpenDate}
                ></DateSelector>
                <DateSelector
                    {disabled}
                    name="appl-close-date"
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={data.record.currentExam.exam
                        .examApplicationCloseDate}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="exam-date"
                    label="Tarikh Peperiksaan"
                    type="date"
                    bind:value={data.record.currentExam.exam.examDate}
                />
                <LongTextField
                    {disabled}
                    name="exam-location"
                    label="Lokasi Peperiksaan"
                    bind:value={data.record.currentExam.exam.examLocation}
                />
            </StepperContentBody>
        </form>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Peperiksaan"
        ></StepperContentHeader>
        <form action="" class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Senarai Keputusan Peperiksaan yang diambil"
                ></SectionHeader>
                <DataTable>
                    <DtTableHead>
                        <DtTableHeadCell title="Tajuk Peperiksaan"
                        ></DtTableHeadCell>
                        <DtTableHeadCell title="Keputusan"></DtTableHeadCell>
                        <DtTableHeadCell title="Sijil"></DtTableHeadCell>
                    </DtTableHead>
                    <DtTableBody>
                        <DtTableRow>
                            <DtTableDataCell
                                value={examApplication.exam.examTitle}
                            ></DtTableDataCell>
                            <DtTableDataCell value="">
                                {#if examApplication.examResult == 'LULUS'}
                                    <Badge rounded color="green"
                                        ><span class="t">
                                            {examApplication.examResult}
                                        </span>
                                    </Badge>
                                {:else if examApplication.examResult == 'GAGAL'}
                                    <Badge rounded color="red"
                                        >{examApplication.examResult}</Badge
                                    >
                                {:else}
                                    <span class="text-sm text-system-primary">
                                        Menunggu keputusan...
                                    </span>
                                {/if}
                            </DtTableDataCell>
                            <DtTableDataCell>
                                <IconButton onClick={() => {}}>
                                    <SvgPdf size="24" />
                                </IconButton>
                            </DtTableDataCell>
                        </DtTableRow>
                    </DtTableBody>
                </DataTable>
            </StepperContentBody>
        </form>
    </StepperContent>
</Stepper>
