<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockLookupDepartments } from '$lib/mocks/database/mockLookupDepartments';
    import { mockLookupEmploymentStatus } from '$lib/mocks/database/mockLookupEmploymentStatus';
    import { Modal, Tooltip } from 'flowbite-svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicAccordionForm from '$lib/components/form/DynamicAccordionForm.svelte';
    import { mockSalaryAdjustment } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAdjusment';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockEmployeeLeaveRecord } from '$lib/mocks/cuti/mockEmployeeLeaveRecord';
    import { mockSalaryAndAllowanceDeduction } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAndAllowanceDeduction';
    import { deductionType } from '$lib/mocks/gaji/gaji-elaun/deductionType';
    import { mockSalaryAdjustmentWithKey } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAdjustmentWithKey';
    import { Toaster } from 'svelte-french-toast';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _confirmData,
        _pemangkuanFormSchema,
        _umumFormSchema,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { readonly } from 'svelte/store';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let activeStepper = 0;

    let disabled = false;
    let labelBlack = !disabled;
    let senaraiPemotongan: IntSalaryAndAllowanceDeduction[] =
        mockSalaryAndAllowanceDeduction;
    let openPelarasGajiModal: boolean = false;
    let openUmumModal: boolean = false;
    let openPemangkuanModal: boolean = false;

    let tooltipContent: string = '';
    const itkaTooltip: string = 'Imbuhan Tetap Khidmat Awam (ITKA)';
    const itpTooltip: string = 'Insentif Tetap Perumahan (ITP)';
    const colaTooltip: string =
        'Bantuan Sara Hidup (Cost of Living Assistance)';
    async function confirm() {
        _confirmData().then((value) => {
            if (value.status == 'success') {
                goto('/urus-setia/gaji/gaji-elaun');
            }
        });
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Gaji & Elaun - Elaun Pekerja {data.props.employeeDetailData
            .employeeNo}"
        description="Maklumat - maklumat gaji & elaun - elaun pekerja {data
            .props.employeeDetailData.employeeNo}"
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
                    value={data.props.employeeDetailData.employeeNo}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Nama"
                    value={data.props.employeeDetailData.name}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="No. K/P"
                    value={data.props.employeeDetailData.identityCard}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gred"
                    value={data.props.employeeDetailData.grade}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Penempatan"
                    value={data.props.employeeDetailData.currentPlacement}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Kumpulan"
                    value={data.props.employeeDetailData.group}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Status Semasa Kakitangan"
                    value={data.props.employeeDetailData.status}
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
                    value={data.props.employeeDetailData.grade}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gaji Pokok"
                    value={data.props.employeeSalariesData.baseSalary}
                ></TextField>
                <TextField
                    {labelBlack}
                    hasTooltip
                    toolTipID="type-itka"
                    disabled
                    label="ITKA"
                    value={data.props.employeeSalariesData.itka}
                ></TextField>
                <TextField
                    {labelBlack}
                    hasTooltip
                    toolTipID="type-itp"
                    disabled
                    label="ITP"
                    value={data.props.employeeSalariesData.itp}
                ></TextField>
                <TextField
                    {labelBlack}
                    hasTooltip
                    toolTipID="type-cola"
                    disabled
                    label="COLA"
                    value={data.props.employeeSalariesData.cola}
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
                        value={months[
                            data.props.employeeSalariesData.salaryMovementMonth
                        ].name}
                    ></TextField>
                    <TextField
                        labelType="label-fit"
                        {labelBlack}
                        disabled
                        label="Jumlah"
                        value={data.props.employeeSalariesData
                            .salaryMovementTotal}
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
            {#each data.props.employeeOtherData as otherData}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p class="h-[35px] text-sm text-system-primary">
                        {otherData.name}
                    </p>
                    <TextField
                        {labelBlack}
                        disabled
                        label="Jumlah (RM)"
                        value={otherData.total}
                    ></TextField>
                    <DateSelector
                        {labelBlack}
                        handleDateChange
                        disabled
                        label="Tarikh Hantar"
                        selectedDate={otherData.submittedDate}
                    ></DateSelector>
                    <DateSelector
                        {labelBlack}
                        handleDateChange
                        disabled
                        label="Tarikh Lulus"
                        selectedDate={otherData.submittedDate}
                    ></DateSelector>
                </div>
            {/each}
            <!-- <div
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
            </div> -->
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Perubahan Gaji" />
        <StepperContentBody>
            <CustomTab>
                <!-- Umum -->
                <CustomTabContent title="Umum">
                    <div class="w-full">
                        <SectionHeader title=""></SectionHeader>
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
                    <SectionHeader title="Rekod Cuti Kakitangan" />
                    <div class="w-full">
                        <DynamicTable
                            tableItems={data.props.employeePublicData.leave}
                            columnKeys={[
                                'type',
                                'appliedDate',
                                'fromDate',
                                'toDate',
                                'reason',
                                'status',
                                'total',
                                'amount',
                            ]}
                        ></DynamicTable>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {labelBlack}
                            disabled={false}
                            label="Jumlah Potongan Cuti"
                        ></TextField>
                        <DropdownSelect
                            dropdownType="label-left-full"
                            id="tempohBayaran"
                            label="Tempoh Bayaran (Bulan)"
                            options={[
                                { value: '1', name: '1' },
                                { value: '2', name: '2' },
                                { value: '3', name: '3' },
                                { value: '4', name: '4' },
                            ]}
                        ></DropdownSelect>
                    </div>
                    <SectionHeader title="Senarai Pemotongan"></SectionHeader>
                    {#each data.props.employeePublicData.loan as loanData}
                        <div
                            class="flex w-full flex-col gap-2 gap-2.5 rounded border border-system-primary p-2.5"
                        >
                            {loanData.name}
                            <div
                                class="flex w-full flex-row justify-evenly gap-2.5"
                            >
                                <DateSelector
                                    {labelBlack}
                                    handleDateChange
                                    disabled={false}
                                    labelType="label-200"
                                    label="Tarikh Mula"
                                ></DateSelector>
                                <DateSelector
                                    {labelBlack}
                                    handleDateChange
                                    disabled={false}
                                    labelType="label-200"
                                    label="Tarikh Tamat"
                                ></DateSelector>
                            </div>
                            <p class="h-[35px] text-sm text-txt-tertiary">
                                Jumlah ansuran yang perlu dibayar setiap bulan
                            </p>
                            <DropdownSelect
                                disabled={false}
                                dropdownType="label-left-200"
                                options={deductionType}
                                label="Jenis Bayaran"
                                labelBlack
                            ></DropdownSelect>
                            <TextField
                                labelType="label-200"
                                {labelBlack}
                                disabled={false}
                                label="Jumlah Bayaran"
                            ></TextField>
                        </div>
                    {/each}
                    {#if data.props.employeePublicData.loan.length == 0}
                        <div class="w-full text-center text-base font-semibold">
                            TIADA REKOD
                        </div>
                    {/if}
                    <!-- </DynamicAccordionForm>
                    {/each} -->
                </CustomTabContent>

                <!-- Pemangkuan -->
                <CustomTabContent title="Pemangkuan">
                    <SectionHeader></SectionHeader>

                    <SectionHeader title="Senarai Tuntutan"></SectionHeader>
                    {#each data.props.employeeActingData as actingData}
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 rounded border border-system-primary p-2.5 text-black"
                        >
                            <TextField
                                labelType="label-200"
                                {labelBlack}
                                disabled={false}
                                label="Nama Tuntutan"
                                value="Bil Tuntutan Kakitangan"
                            ></TextField>
                            <div
                                class="flex w-full flex-row justify-evenly gap-2.5"
                            >
                                <DateSelector
                                    {labelBlack}
                                    handleDateChange
                                    disabled={false}
                                    labelType="label-200"
                                    label="Tarikh Mula"
                                ></DateSelector>
                                <DateSelector
                                    {labelBlack}
                                    handleDateChange
                                    disabled={false}
                                    labelType="label-200"
                                    label="Tarikh Tamat"
                                ></DateSelector>
                            </div>
                            <div
                                class="flex w-full flex-row justify-evenly gap-2.5"
                            >
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled={false}
                                    label="Sepatutnya Bayar (RM)"
                                ></TextField>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled={false}
                                    label="Telah Bayar (RM)"
                                ></TextField>
                            </div>
                            <TextField
                                labelType="label-200"
                                {labelBlack}
                                disabled={false}
                                label="Jumlah Potongan / Tunggakan (RM)"
                            ></TextField>
                        </div>
                    {/each}
                    <!-- </DynamicAccordionForm>
                    {/each} -->
                </CustomTabContent>
                <!-- Pelarasan Gaji -->
                <CustomTabContent title="Pelarasan Gaji">
                    <SectionHeader title="Senarai Penambahan"
                        ><TextIconButton
                            primary
                            label="Selesai"
                            onClick={() => confirm()}
                            ><SvgCheck /></TextIconButton
                        ></SectionHeader
                    >
                    {#each data.props.employeeAdjustmentData as adjustmentData}
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 rounded border border-system-primary p-2.5 text-black"
                        >
                            <TextField
                                labelType="label-200"
                                {labelBlack}
                                disabled
                                label="Jenis Penambahan"
                                value={adjustmentData.type}
                            ></TextField>
                            <DateSelector
                                {labelBlack}
                                handleDateChange
                                disabled
                                labelType="label-200"
                                label="Tarikh Mula"
                                selectedDate={adjustmentData.startDate}
                            ></DateSelector>
                            <DateSelector
                                {labelBlack}
                                handleDateChange
                                disabled
                                labelType="label-200"
                                label="Tarikh Tamat"
                                selectedDate={adjustmentData.endDate}
                            ></DateSelector>
                            <TextField
                                labelType="label-200"
                                {labelBlack}
                                disabled
                                label="Jenis Bayaran (RM)"
                                value={adjustmentData.paymentType}
                            ></TextField>
                            <TextField
                                labelType="label-200"
                                {labelBlack}
                                disabled
                                label="Jumlah Bayaran"
                                value={adjustmentData.amount}
                            ></TextField>
                        </div>
                    {/each}
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<!-- Tooltip body -->
<Tooltip type="dark" triggeredBy="[id^='type-']">{tooltipContent}</Tooltip>

<Toaster />
