<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    // import { currencyFormatter } from '$lib/service/services';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupDepartments } from '$lib/mocks/database/mockLookupDepartments';
    import { mockLookupEmploymentStatus } from '$lib/mocks/database/mockLookupEmploymentStatus';
    import { Tooltip } from 'flowbite-svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicAccordionForm from '$lib/components/form/DynamicAccordionForm.svelte';
    import { mockSalaryAdjustment } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAdjusment';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockEmployeeLeaveRecord } from '$lib/mocks/cuti/mockEmployeeLeaveRecord';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { period } from '$lib/mocks/cuti/tempoh';
    import { mockSalaryAndAllowanceDeduction } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAndAllowanceDeduction';
    import { deductionType } from '$lib/mocks/gaji/gaji-elaun/deductionType';
    import { mockActingAllowanceTable } from '$lib/mocks/gaji/elaun-pemangkuan/mockActingAllowanceTable';
    import { pelarasanGaji } from '$lib/mocks/gaji/elaun-pemangkuan/pelarasanGaji';
    import { placements } from '$lib/mocks/placements/mockPlacements';

    export let noPekerja = '00001';
    let activeStepper = 0;
    let currEmployee = mockEmployees[0];
    let currEmployeeService = mockCurrentService[0];
    let currEmployeeGrade = mockLookupGrades.filter(
        (g) => g.id == currEmployeeService.gradeId,
    )[0];
    let disabled = true;
    let labelBlack = !disabled;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    let tooltipContent: string = '';
    const itkaTooltip: string = 'Imbuhan Tetap Khidmat Awam (ITKA)';
    const itpTooltip: string = 'Insentif Tetap Perumahan (ITP)';
    const colaTooltip: string =
        'Bantuan Sara Hidup (Cost of Living Assistance)';
    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'itka':
                    tooltipContent = itkaTooltip;
                    break;
                case 'itp':
                    tooltipContent = itpTooltip;
                    break;
                case 'cola':
                    tooltipContent = colaTooltip;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }

    let pelarasanGajiTuntutan: IntSalaryAdjustment[] = mockSalaryAdjustment;
    let senaraiPemotongan: IntSalaryAndAllowanceDeduction[] =
        mockSalaryAndAllowanceDeduction;
    let selectedValue: any = '8';
    let pelarasanGajiValue: any = 2;
    let selectedPlacements: any = '3';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Gaji & Elaun - Elaun Pekerja {noPekerja}"
        description="Maklumat - maklumat gaji & elaun - elaun pekerja {noPekerja}"
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
        <StepperContentHeader title="Maklumat Kakitangan">
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
                <TextField
                    {labelBlack}
                    disabled
                    label="No. Pekerja"
                    value={currEmployee.employeeNumber}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Nama"
                    value={currEmployee.name}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="No. K/P"
                    value={currEmployee.identityDocumentNumber}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gred"
                    value={currEmployeeGrade.code +
                        ' - ' +
                        currEmployeeGrade.name}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Penempatan"
                    value={currEmployeeService.placement}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Kumpulan"
                    value={mockLookupDepartments[2].name}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Status Semasa Kakitangan"
                    value={mockLookupEmploymentStatus[0].name}
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Gaji dan Elaun Kakitangan Semasa "
        >
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            />
            <FormButton
                type="next"
                onClick={() => {
                    activeStepper = 2;
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Berkuatkuasa"
                    selectedDate="2023-10-01"
                ></DateSelector>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gred"
                    value={currEmployeeGrade.code}
                ></TextField>
                <TextField {labelBlack} disabled label="Gaji Pokok"></TextField>
                <TextField
                    {labelBlack}
                    hasTooltip
                    toolTipID="type-itka"
                    disabled
                    label="ITKA"
                ></TextField>
                <TextField
                    {labelBlack}
                    hasTooltip
                    toolTipID="type-itp"
                    disabled
                    label="ITP"
                ></TextField>
                <TextField
                    {labelBlack}
                    hasTooltip
                    toolTipID="type-cola"
                    disabled
                    label="COLA"
                ></TextField>
                <div class="flex w-full flex-row justify-evenly gap-2.5">
                    <label
                        for=""
                        class="w-[220px] min-w-[220px] text-sm font-medium text-txt-tertiary"
                        >Tarikh Pergerakan Gaji dan Jumlah (RM)</label
                    >
                    <TextField
                        labelType="label-fit"
                        {labelBlack}
                        disabled
                        label="Bulan"
                        value={months[6].name}
                    ></TextField>
                    <TextField
                        labelType="label-fit"
                        {labelBlack}
                        disabled
                        label="Jumlah"
                    ></TextField>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Lain - Lain">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            />
            <FormButton
                type="next"
                onClick={() => {
                    activeStepper = 3;
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">
                    Pinjaman Komputer
                </p>
                <TextField {labelBlack} disabled label="Jumlah (RM)"
                ></TextField>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Mula"
                    selectedDate="2022-10-01"
                ></DateSelector>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Tamat"
                    selectedDate="2023-11-01"
                ></DateSelector>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">Kuarters</p>
                <TextField
                    labelType="read-only-list-value"
                    {labelBlack}
                    disabled
                    label="Jumlah (RM)"
                    valueList={[
                        'Dalam Jarak 25 KM:',
                        '• Potongan ITP 75%',
                        '• Potongan COLA 50%',
                    ]}
                ></TextField>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Mula"
                    selectedDate="2022-10-01"
                ></DateSelector>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Tamat"
                    selectedDate="2023-11-01"
                ></DateSelector>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">Perubatan</p>
                <TextField {labelBlack} disabled label="Jumlah (RM)"
                ></TextField>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Mula"
                    selectedDate="2022-10-01"
                ></DateSelector>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Tamat"
                    selectedDate="2023-11-01"
                ></DateSelector>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">
                    Bantuan Pakaian Panas
                </p>
                <TextField {labelBlack} disabled label="Jumlah (RM)"
                ></TextField>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Mula"
                    selectedDate="2022-10-01"
                ></DateSelector>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Tamat"
                    selectedDate="2023-11-01"
                ></DateSelector>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">
                    Elaun Memangku
                </p>
                <TextField {labelBlack} disabled label="Jumlah (RM)"
                ></TextField>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Mula"
                    selectedDate="2022-10-01"
                ></DateSelector>
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    disabled
                    label="Tarikh Tamat"
                    selectedDate="2023-11-01"
                ></DateSelector>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Perubahan Gaji">
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
        <StepperContentBody paddingClass="p-0">
            <CustomTab>
                <!-- Umum -->
                <CustomTabContent title="Umum">
                    <div class="w-full">
                        <FilterCard>
                            <FilterDateSelector
                                handleDateChange
                                label="Tarikh Mohon"
                            ></FilterDateSelector>
                            <FilterDateSelector
                                handleDateChange
                                label="Tarikh Mula"
                            ></FilterDateSelector>
                            <FilterDateSelector
                                handleDateChange
                                label="Tarikh Tamat"
                            ></FilterDateSelector>
                        </FilterCard>
                    </div>
                    <SectionHeader title="Rekod Cuti Kakitangan"
                    ></SectionHeader>
                    <div class="w-full">
                        <DynamicTable
                            tableItems={mockEmployeeLeaveRecord}
                            columnKeys={[
                                'leaveType',
                                'leaveCode',
                                'leaveApplicationDate',
                                'leaveStartDate',
                                'leaveEndDate',
                                'leaveReason',
                                'leaveStatus',
                                'leaveAmount',
                            ]}
                        ></DynamicTable>
                    </div>

                    <TextField
                        {labelBlack}
                        disabled
                        label="Jumlah Potongan Cuti"
                    ></TextField>
                    <DropdownSelect
                        disabled
                        dropdownType="label-left-full"
                        options={period}
                        label="Tempoh Bayaran (Bulan)"
                        labelBlack={false}
                        bind:value={selectedValue}
                    ></DropdownSelect>
                    <SectionHeader title="Senarai Pemotongan"></SectionHeader>
                    {#each senaraiPemotongan as item, index}
                        <DynamicAccordionForm header={item.deductionTitle} open
                            ><div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <div
                                    class="flex w-full flex-row justify-evenly gap-2.5"
                                >
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled
                                        labelType="label-200"
                                        label="Tarikh Mula"
                                        selectedDate={item.deductionStartDate}
                                    ></DateSelector>
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled
                                        labelType="label-200"
                                        label="Tarikh Tamat"
                                        selectedDate={item.deductionEndDate}
                                    ></DateSelector>
                                </div>
                                <p class="h-[35px] text-sm text-txt-tertiary">
                                    Jumlah ansuran yang perlu dibayar setiap
                                    bulan
                                </p>
                                <DropdownSelect
                                    disabled
                                    dropdownType="label-left-200"
                                    options={deductionType}
                                    label="Jenis Bayaran"
                                    labelBlack={false}
                                    bind:value={item.deductionType}
                                ></DropdownSelect>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Jumlah Bayaran"
                                ></TextField>
                            </div>
                        </DynamicAccordionForm>
                    {/each}
                </CustomTabContent>
                <!-- Pemangkuan -->
                <CustomTabContent title="Pemangkuan">
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                    >
                        <SectionHeader title="Jadual Elaun Pemangkuan"
                        ></SectionHeader>
                        <div class="w-full">
                            <DynamicTable
                                tableItems={mockActingAllowanceTable}
                                columnKeys={[
                                    'grade',
                                    'itk',
                                    'itp',
                                    'actingAllowance',
                                ]}
                            ></DynamicTable>
                        </div>
                        <DateSelector
                            {labelBlack}
                            handleDateChange
                            disabled
                            label="Tarikh Berkuatkuasa"
                            selectedDate="2023-10-01"
                        ></DateSelector>
                        <DropdownSelect
                            disabled
                            dropdownType="label-left-full"
                            options={pelarasanGaji}
                            label="Bulan Pelarasan Gaji"
                            labelBlack={false}
                            bind:value={pelarasanGajiValue}
                        ></DropdownSelect>
                        <TextField
                            {labelBlack}
                            disabled
                            label="Gred"
                            value={currEmployeeGrade.code}
                        ></TextField>
                        <DropdownSelect
                            disabled
                            dropdownType="label-left-full"
                            options={placements}
                            label="Penempatan"
                            labelBlack={false}
                            bind:value={selectedPlacements}
                        ></DropdownSelect>
                        <TextField {labelBlack} disabled label="Gaji Pokok"
                        ></TextField>
                        <TextField
                            {labelBlack}
                            hasTooltip
                            toolTipID="type-itka"
                            disabled
                            label="ITKA"
                        ></TextField>
                        <TextField
                            {labelBlack}
                            disabled
                            label="Jenis Skim Perumahan"
                            value="Insentif Tetap Perumahan (ITP)"
                        ></TextField>
                        <TextField
                            {labelBlack}
                            disabled
                            label="Jumlah Skim Perumahan"
                        ></TextField>
                        <TextField
                            {labelBlack}
                            hasTooltip
                            toolTipID="type-cola"
                            disabled
                            label="COLA"
                        ></TextField>
                        <div
                            class="flex w-full flex-row justify-evenly gap-2.5"
                        >
                            <label
                                for=""
                                class="w-[220px] min-w-[220px] text-sm font-medium text-txt-tertiary"
                                >Tarikh Pergerakan Gaji dan Jumlah (RM)</label
                            >
                            <TextField
                                labelType="label-fit"
                                {labelBlack}
                                disabled
                                label="Bulan"
                                value={months[6].name}
                            ></TextField>
                            <TextField
                                labelType="label-fit"
                                {labelBlack}
                                disabled
                                label="Jumlah"
                            ></TextField>
                        </div>
                    </div>
                    <SectionHeader title="Senarai Tuntutan"></SectionHeader>
                    {#each pelarasanGajiTuntutan as item, index}
                        <DynamicAccordionForm
                            header="Tuntutan #{index + 1}"
                            open
                            ><div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Nama Tuntutan"
                                    value="Bil Tuntutan Kakitangan"
                                ></TextField>
                                <div
                                    class="flex w-full flex-row justify-evenly gap-2.5"
                                >
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled
                                        labelType="label-200"
                                        label="Tarikh Mula"
                                        selectedDate={item.startDate}
                                    ></DateSelector>
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled
                                        labelType="label-200"
                                        label="Tarikh Tamat"
                                        selectedDate={item.endDate}
                                    ></DateSelector>
                                </div>
                                <div
                                    class="flex w-full flex-row justify-evenly gap-2.5"
                                >
                                    <TextField
                                        labelType="label-200"
                                        {labelBlack}
                                        disabled
                                        label="Sepatutnya Bayar"
                                    ></TextField>
                                    <TextField
                                        labelType="label-200"
                                        {labelBlack}
                                        disabled
                                        label="Telah Bayar"
                                    ></TextField>
                                </div>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Jumlah Potongan / Tunggakan"
                                ></TextField>
                            </div>
                        </DynamicAccordionForm>
                    {/each}
                </CustomTabContent>

                <!-- Pelarasan -->
                <CustomTabContent title="Pelarasan">
                    <SectionHeader title="Senarai Penambahan"></SectionHeader>
                    {#each senaraiPemotongan as item, index}
                        <DynamicAccordionForm
                            header="Penambahan #{index + 1}"
                            open
                            ><div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Jenis Penambahan"
                                    value="Penambahan 1"
                                ></TextField>
                                <div
                                    class="flex w-full flex-row justify-evenly gap-2.5"
                                >
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled
                                        labelType="label-200"
                                        label="Tarikh Mula"
                                        selectedDate={item.deductionStartDate}
                                    ></DateSelector>
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled
                                        labelType="label-200"
                                        label="Tarikh Tamat"
                                        selectedDate={item.deductionEndDate}
                                    ></DateSelector>
                                </div>
                                <DropdownSelect
                                    disabled
                                    dropdownType="label-left-200"
                                    options={deductionType}
                                    label="Jenis Bayaran"
                                    labelBlack={false}
                                    bind:value={item.deductionType}
                                ></DropdownSelect>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Jumlah Bayaran"
                                ></TextField>
                            </div>
                        </DynamicAccordionForm>
                    {/each}
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<!-- Tooltip body -->
<Tooltip type="dark" triggeredBy="[id^='type-']" on:show={assignContent}
    >{tooltipContent}</Tooltip
>
