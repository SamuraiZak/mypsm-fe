<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _stepperMeetingResult,
        _submitFormStepperMeetingResult,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;
    export let noPekerja = data.currentEmployee?.employeeNumber;

    let activeStepper = 0;
    let salaryMovementData = data.currentEmployee;
    let disabled = true;
    let labelBlack = !disabled;
    let radioValue: any = 'sah';
    let isGredChecked: boolean = false;
    let isSpecialIncrementTextChecked: boolean = false;
    let isSpecialFiAidTextChecked: boolean = false;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'SAH',
        },
        {
            value: 'tidak sah',
            label: 'TIDAK SAH',
        },
    ];

    //Verification Retirement Application
    const {
        form: meetingResultForm,
        errors: meetingResultErrors,
        enhance: meetingResultEnhance,
    } = superForm(data.stepperMeetingResult, {
        SPA: true,
        validators: _stepperMeetingResult,
        onSubmit() {
            _submitFormStepperMeetingResult($meetingResultForm);
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
            /><TextIconButton
                primary
                label="Simpan"
                form="FormStepperMeetingResult"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="FormStepperMeetingResult"
                class="flex w-full flex-col gap-2"
                use:meetingResultEnhance
                method="POST"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Pergerakan Gaji Semasa"
                    ></SectionHeader>
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
                    <TextField
                        {labelBlack}
                        disabled
                        label="Gaji Khas {nextYear}"
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
                    <SectionHeader title="Pergerakan Gaji Baru"></SectionHeader>
                    <DropdownSelect
                        hasError={$meetingResultErrors.meetingNameNum
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="meetingNameNum"
                        label="Nama dan Bilangan Mesyuarat"
                        bind:value={$meetingResultForm.meetingNameNum}
                        options={[
                            { value: '1', name: 'Semua' },
                            { value: '2', name: '1/12' },
                            { value: '3', name: '1/102' },
                            { value: '4', name: '2/101' },
                        ]}
                    ></DropdownSelect>
                    {#if $meetingResultErrors.meetingNameNum}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$meetingResultErrors.meetingNameNum}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$meetingResultErrors.meetingDate
                            ? true
                            : false}
                        name="meetingDate"
                        handleDateChange
                        label="Tarikh Mesyuarat"
                        bind:selectedDate={$meetingResultForm.meetingDate}
                    ></DateSelector>
                    {#if $meetingResultErrors.meetingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$meetingResultErrors.meetingDate}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={$meetingResultErrors.salaryMovementMonth
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="salaryMovementMonth"
                        label="Bulan Pergerakan Gaji"
                        bind:value={$meetingResultForm.salaryMovementMonth}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'April' },
                            { value: '3', name: 'Julai' },
                            { value: '4', name: 'Oktober' },
                        ]}
                    ></DropdownSelect>
                    {#if $meetingResultErrors.salaryMovementMonth}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$meetingResultErrors.salaryMovementMonth}</span
                        >
                    {/if}
                    <div class="flex w-full flex-row items-center">
                        <label for="meetingResult" class="w-[280px]">
                            <p class="text-sm">Keputusan Mesyuarat</p>
                        </label>
                        <div class="flex w-full flex-col gap-y-7">
                            <div class="flex flex-row items-center">
                                <div>
                                    <Checkbox
                                        name="gred"
                                        bind:checked={isGredChecked}
                                    ></Checkbox>
                                </div>
                                <div>
                                    <DropdownSelect
                                        disabled={!isGredChecked}
                                        hasError={$meetingResultErrors.gred
                                            ? true
                                            : false}
                                        dropdownType="label-left-full"
                                        id="gred"
                                        label="Gred"
                                        bind:value={$meetingResultForm.gred}
                                        options={[
                                            { value: 'All', name: 'Semua' },
                                            { value: 'N19', name: 'N19' },
                                            { value: 'N21', name: 'N21' },
                                            { value: 'N29', name: 'N29' },
                                            { value: 'N32', name: 'N32' },
                                            { value: 'N49', name: 'N49' },
                                            { value: 'N52', name: 'N52' },
                                        ]}
                                    ></DropdownSelect>
                                </div>
                            </div>

                            <div class="flex flex-row items-center">
                                <div>
                                    <Checkbox
                                        name="specialFiAidText"
                                        bind:checked={isSpecialFiAidTextChecked}
                                    ></Checkbox>
                                </div>
                                <div>
                                    <LongTextField
                                        disabled={!isSpecialFiAidTextChecked}
                                        hasError={!!$meetingResultErrors.specialFiAid}
                                        name="specialFiAid"
                                        label="Bantuan Khas Kewangan (RM)"
                                        bind:value={$meetingResultForm.specialFiAid}
                                    />
                                    {#if $meetingResultErrors.specialFiAid}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$meetingResultErrors.specialFiAid}</span
                                        >
                                    {/if}
                                </div>
                            </div>

                            <div class="flex flex-row items-center">
                                <div>
                                    <Checkbox
                                        name="specialIncrementText"
                                        bind:checked={isSpecialIncrementTextChecked}
                                    ></Checkbox>
                                </div>
                                <div>
                                    <LongTextField
                                        disabled={!isSpecialIncrementTextChecked}
                                        hasError={!!$meetingResultErrors.specialIncrement}
                                        name="specialIncrement"
                                        label="Kenaikan Khas (RM)"
                                        bind:value={$meetingResultForm.specialIncrement}
                                    />
                                    {#if $meetingResultErrors.specialIncrement}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$meetingResultErrors.specialIncrement}</span
                                        >
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
            <FormButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Jadual Pergerakan Gaji"></SectionHeader>
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
                    disabled
                    label="Tindakan / Ulasan Mesyuarat"
                    labelBlack
                    placeholder="Boleh diteruskan"
                ></LongTextField>
                <RadioSingle
                    disabled
                    {options}
                    legend="Keputusan Mesyuarat"
                    bind:userSelected={radioValue}
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pergerakan Gaji"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-row items-center justify-between">
                    <DownloadAttachment fileName="Keputusan Pergerakan Gaji"
                    ></DownloadAttachment>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
