<script lang="ts">
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _stepperRevisionSalaryMovementSchedule,
        _submitFormStepperRevisionSalaryMovementSchedule,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let noPekerja = '00001';
    export let data: PageData;

    let activeStepper = 0;
    let salaryMovementData = mockSalaryMovementRecord[0];
    let currSecratery = mockEmployees[2];
    let disabled = true;
    let labelBlack = !disabled;
    let selectedMeeting = '2';
    let selectedMonth = '10';

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];

    //Verification Retirement Application
    const {
        form: revisionSalaryMovementScheduleForm,
        errors: revisionSalaryMovementScheduleErrors,
        enhance: revisionSalaryMovementScheduleEnhance,
    } = superForm(data.stepperRevisionSalaryMovementSchedule, {
        SPA: true,
        validators: _stepperRevisionSalaryMovementSchedule,
        onSubmit() {
            _submitFormStepperRevisionSalaryMovementSchedule(
                $revisionSalaryMovementScheduleForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pekerja {noPekerja}"
        description="Maklumat - maklumat pergerakan gaji pekerja {noPekerja}"
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Keputusan Mesyuarat">
            <FormButton
                type="next"
                onClick={() => {
                    activeStepper = 1;
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Maklumat Pergerakan Gaji"></SectionHeader>
                <TextField
                    {labelBlack}
                    disabled
                    label="Tarikh Pergerakan Gaji (TPG)"
                    value={salaryMovementData.tpg}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gaji Bulan Berkenaan - {salaryMovementData.tpg}"
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Kenaikan Gaji Tahunan (KGT)"
                ></TextField>
                <TextField {labelBlack} disabled label="Elaun Wilayah (EW)"
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="EL. Kritikal (5%) {currYear}"
                ></TextField>
                <TextField {labelBlack} disabled label="KGT Khas {nextYear}"
                ></TextField>
                <TextField {labelBlack} disabled label="Gaji Khas {nextYear}"
                ></TextField>
                <TextField {labelBlack} disabled label="EW Khas {nextYear}"
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="EL. Kritikal (5%) {nextYear}"
                ></TextField>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">Urus Setia</p>
                <TextField
                    {labelBlack}
                    disabled
                    label="Nama"
                    value={currSecratery.name}
                ></TextField>
                <DropdownField
                    {labelBlack}
                    dropdownType="label-left-full"
                    label="Penempatan Baru"
                    bind:index={selectedMeeting}
                    id="dropdown"
                    options={meetings}
                    disabled
                />
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    selectedDate="2023-08-23"
                    disabled
                ></DateSelector>
                <DropdownField
                    {labelBlack}
                    dropdownType="label-left-full-optional-fields"
                    label="Keputusan Mesyuarat"
                    bind:index={selectedMonth}
                    id="dropdown"
                    options={months}
                    disabled
                    checkboxLabel1="Gred"
                    checkboxLabel2="Bantuan Khas Kewangan (RM)"
                    checkboxLabel3="Kenaikan Khas (RM)"
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semakan Jadual Pergerakan Gaji">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            />
            <TextIconButton
                primary
                label="Simpan"
                form="FormStepperRevisionSalaryMovementSchedule"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="FormStepperRevisionSalaryMovementSchedule"
                class="flex w-full flex-col gap-2"
                use:revisionSalaryMovementScheduleEnhance
                method="POST"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Jadual Pergerakan Gaji"
                    ></SectionHeader>
                    <DynamicTable tableItems={mockSalaryMovementSchedule}
                    ></DynamicTable>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p class="h-[35px] text-sm text-system-primary">
                        Pengarah Khidmat Pengurusan
                    </p>
                    <LongTextField
                        hasError={$revisionSalaryMovementScheduleErrors.meetingActionRemark
                            ? true
                            : false}
                        name="meetingActionRemark"
                        label="Tindakan / Ulasan Mesyuarat"
                        bind:value={$revisionSalaryMovementScheduleForm.meetingActionRemark}
                    />
                    {#if $revisionSalaryMovementScheduleErrors.meetingActionRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$revisionSalaryMovementScheduleErrors
                                .meetingActionRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        {options}
                        name="meetingResultOption"
                        legend={'Keputusan Mesyuarat'}
                        bind:userSelected={$revisionSalaryMovementScheduleForm.meetingResultOption}
                    ></RadioSingle>
                    {#if $revisionSalaryMovementScheduleErrors.meetingResultOption}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$revisionSalaryMovementScheduleErrors
                                .meetingResultOption[0]}</span
                        >
                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
