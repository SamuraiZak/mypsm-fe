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
    import { currencyFormatter } from '$lib/service/services';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    // import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule.js';
    export let data;
    export let noPekerja = data.currentEmployee?.employeeNumber;
    let activeStepper = 0;
    let salaryMovementData = data.currentEmployee;
    let currSecratery = mockEmployees[2];
    let disabled = true;
    let isEditable = data.currentEmployee.status === 'baru' ? true : false;
    let labelBlack = !disabled;
    let selectedMeeting = '2';
    let selectedMonth = '10';
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;
    let radioValue: any = 'sah';

    const salaryMonths = [
        { value: '1', name: 'Januari' },
        { value: '2', name: 'April' },
        { value: '3', name: 'Julai' },
        { value: '4', name: 'Oktober' },
    ];
    let selectedSalaryMonth: string = '1';

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
                    value={currencyFormatter(
                        salaryMovementData.currentYearSalary,
                    )}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Kenaikan Gaji Tahunan (KGT)"
                    value={currencyFormatter(salaryMovementData.kgt)}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Elaun Wilayah (EW)"
                    value={currencyFormatter(
                        salaryMovementData.currentCountyAllowance,
                    )}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="EL. Kritikal (5%) {currYear}"
                    value={currencyFormatter(
                        salaryMovementData.criticalAllowance,
                    )}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="KGT Khas {nextYear}"
                    value={currencyFormatter(salaryMovementData.specialKGT)}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gaji Khas {nextYear}"
                    value={currencyFormatter(salaryMovementData.nextYearSalary)}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="EW Khas {nextYear}"
                    value={currencyFormatter(
                        salaryMovementData.nextYearCountyAllowance,
                    )}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="EL. Kritikal (5%) {nextYear}"
                    value={currencyFormatter(
                        salaryMovementData.nextYearCriticalAllowance,
                    )}
                ></TextField>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Pergerakan Gaji Baru"></SectionHeader>
                <DropdownField
                    {labelBlack}
                    dropdownType="label-left-full"
                    label="Nama dan Bilangan Mesyuarat"
                    bind:index={selectedMeeting}
                    id="dropdown"
                    options={meetings}
                    disabled={!isEditable}
                />
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    selectedDate="2023-08-23"
                    disabled={!isEditable}
                ></DateSelector>
                <DropdownSelect
                    {labelBlack}
                    disabled={!isEditable}
                    id="salary-movement-month-type"
                    label="Bulan Pergerakan Gaji"
                    dropdownType="label-left-full"
                    options={salaryMonths}
                    bind:index={selectedSalaryMonth}
                />
                <DropdownField
                    {labelBlack}
                    childLabelBlack={isEditable}
                    dropdownType="label-left-full-optional-fields"
                    label="Keputusan Mesyuarat"
                    bind:index={selectedMonth}
                    id="dropdown"
                    options={months}
                    disabled={!isEditable}
                    checkboxLabel1="Gred"
                    checkboxLabel2="Bantuan Khas Kewangan (RM)"
                    value={currencyFormatter(0)}
                    checkboxLabel3="Kenaikan Khas (RM)"
                    value2={currencyFormatter(100)}
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
