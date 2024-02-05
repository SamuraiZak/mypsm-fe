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
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import {
        _stepperMeetingResult,
        _submitFormStepperMeetingResult,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;
    // export let noPekerja = data.salaryMovementList[0].employeeNumber;

    let activeStepper = 0;
    // let salaryMovementData = data.currentEmployee;
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
            value: true,
            label: 'SAH',
        },
        {
            value: false,
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
        validationMethod: 'oninput',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        validators: _stepperMeetingResult,
        onSubmit() {
            _submitFormStepperMeetingResult($meetingResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const proxyMeetingDate = dateProxy(meetingResultForm, 'meetingDate', {
        format: 'date',
    });
    console.log(data.approverResultResponse)
    const tempDate: Date = new Date(data.detailSalaryMovement.meetingDate);
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pergerakan Gaji Mesyuarat {data.detailSalaryMovement
            .meetingName}"
        description="Maklumat - Maklumat Pergerakan Gaji Mesyuarat {data
            .detailSalaryMovement.meetingName}"
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
            <TextIconButton
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
                        value={data.salaryMovementList[0].tpg}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="Gaji Bulan Berkenaan - {''}"
                        value={data.salaryMovementList[0].salary1}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="Kenaikan Gaji Tahunan (KGT)"
                        value={data.salaryMovementList[0].kgt}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="Elaun Wilayah (EW)"
                        value={data.salaryMovementList[0].wilayahAllowance1}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="EL. Kritikal (5%) {currYear}"
                        value={data.salaryMovementList[0].criticalAllowance1}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="KGT Khas {nextYear}"
                        value={data.salaryMovementList[0].specialkgt}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="Gaji Khas {nextYear}"
                        value={data.salaryMovementList[0].specialSalary}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="EW Khas {nextYear}"
                        value={data.salaryMovementList[0].specialWilayahAllowance}
                    />
                    <TextField
                        {labelBlack}
                        disabled
                        label="EL. Kritikal (5%) {nextYear}"
                        value={data.salaryMovementList[0].criticalAllowance2}
                    />
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Pergerakan Gaji Baru"></SectionHeader>
                    <TextField
                        label="Nama Mesyuarat"
                        disabled
                        labelBlack={false}
                        name="meetingName"
                        value={data.detailSalaryMovement.meetingName}
                    />
                    <TextField
                        label="Tarikh Mesyuarat"
                        disabled
                        labelBlack={false}
                        name="meetingDate"
                        value={tempDate.toLocaleDateString('ms', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    />
                    
                    <TextField
                        label="Bulan Pergerakan Gaji"
                        disabled
                        labelBlack={false}
                        name="salaryMovementMonth"
                        value={data.detailSalaryMovement.salaryMovementMonth}
                    />
                    <div class="flex w-full flex-col gap-2.5">
                            <SectionHeader title="Keputusan Mesyuarat"/>
                            <TextField
                                label="Bantuan Khas Kewangan (RM)"
                                disabled
                                labelBlack={false}
                                name="specialAid"
                                value={data.detailSalaryMovement
                                    .specialAid}
                            />
                            <TextField
                                label="Kenaikan Khas"
                                disabled
                                labelBlack={false}
                                name="specialRaise"
                                value={data.detailSalaryMovement
                                    .specialRaise}
                            />
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
                <DynamicTable tableItems={data.salaryScheduleList}
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
                    value={data.approverResultResponse.remark}
                ></LongTextField>
                <RadioSingle
                    disabled
                    {options}
                    legend="Keputusan Mesyuarat"
                    userSelected={data.approverResultResponse.status}
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
