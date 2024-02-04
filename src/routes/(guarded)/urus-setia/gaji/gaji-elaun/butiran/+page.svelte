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
        _pemangkuanFormSchema,
        _submitPemangkuanForm,
        _submitSalaryAllowance,
        _umumFormSchema,
        _submitUmumForm,
        _modalFormSchema,
        _submitModalForm,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;

    export let noPekerja = '00001';
    let activeStepper = 3;

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

    // -------------function in progress---------------
    let pelarasanGajiTuntutan: { [key: string]: IntSalaryAdjustment } =
        mockSalaryAdjustmentWithKey;
    let nextGroupId = 1;

    function addFormGroup() {
        pelarasanGajiTuntutan = {
            ...pelarasanGajiTuntutan,
            [nextGroupId]: { mockSalaryAdjustment },
        };
        nextGroupId += 1;
    }

    function removeFormGroup(groupId: string) {
        pelarasanGajiTuntutan = { ...pelarasanGajiTuntutan };
        delete pelarasanGajiTuntutan[groupId];
    }
    // -----------------------------------------------

    // ========================= Form Validation
    const {
        form: pemangkuanForm,
        errors: pemangkuanError,
        enhance: pemangkuanEnhance,
    } = superForm(data.pemangkuanForm, {
        SPA: true,
        validationMethod: 'oninput',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        id: 'pemangkuanForm',
        validators: _pemangkuanFormSchema,
        onSubmit() {
            _submitPemangkuanForm($pemangkuanForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const proxyEffectiveDate = dateProxy(pemangkuanForm, 'effectiveDate', {
        format: 'date',
    });

    const {
        form: umumForm,
        errors: umumError,
        enhance: umumEnhance,
    } = superForm(data.umumForm, {
        SPA: true,
        id: 'umumForm',
        validationMethod: 'oninput',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        validators: _umumFormSchema,
        onSubmit() {
            _submitUmumForm($umumForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: modalForm,
        errors: modalError,
        enhance: modalEnhance,
    } = superForm(data.modalForm, {
        SPA: true,
        id: 'modalForm',
        validationMethod: 'oninput',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _modalFormSchema,
        onSubmit() {
            _submitModalForm($modalForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
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
                    value={data.props.salaryDetailData.employeeNo}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Nama"
                    value={data.props.salaryDetailData.name}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="No. K/P"
                    value={data.props.salaryDetailData.identityCard}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gred"
                    value={data.props.salaryDetailData.grade}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Penempatan"
                    value={data.props.salaryDetailData.currentPlacement}
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
                    value={mockLookupEmploymentStatus[1].name}
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
                    value={data.props.salaryDetailData.grade}
                ></TextField>
                <TextField
                    {labelBlack}
                    disabled
                    label="Gaji Pokok"
                    value={data.props.salaryDetailData.currentPlacement}
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
        <StepperContentHeader title="Perubahan Gaji" />
        <StepperContentBody>
            <CustomTab>
                <!-- Umum -->
                <CustomTabContent title="Umum">
                    <div class="w-full">
                        <SectionHeader title=""
                            ><TextIconButton
                                primary
                                label="Simpan"
                                form="umumForm"><SvgCheck /></TextIconButton
                            ></SectionHeader
                        >
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
                    <div class="flex w-full flex-col gap-2">
                        <form
                            id="umumForm"
                            use:umumEnhance
                            method="POST"
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={!!$umumError.totalSalaryDeduction}
                                {labelBlack}
                                disabled={false}
                                bind:value={$umumForm.totalSalaryDeduction}
                                label="Jumlah Potongan Cuti"
                            ></TextField>
                            {#if $umumError.totalSalaryDeduction}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$umumError.totalSalaryDeduction}</span
                                >
                            {/if}
                            <DropdownSelect
                                hasError={!!$umumError.tempohBayaran}
                                dropdownType="label-left-full"
                                id="tempohBayaran"
                                label="Tempoh Bayaran (Bulan)"
                                bind:value={$umumForm.tempohBayaran}
                                options={[
                                    { value: '1', name: '1' },
                                    { value: '2', name: '2' },
                                    { value: '3', name: '3' },
                                    { value: '4', name: '4' },
                                ]}
                            ></DropdownSelect>
                            {#if $umumError.tempohBayaran}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$umumError.tempohBayaran}</span
                                >
                            {/if}
                        </form>
                    </div>
                    <SectionHeader title="Senarai Pemotongan"
                        ><TextIconButton
                            primary
                            label="Tambah"
                            onClick={() => (openUmumModal = true)}
                            ><SvgPlus /></TextIconButton
                        ></SectionHeader
                    >
                    <!-- {#each senaraiPemotongan as item, index}
                        <DynamicAccordionForm
                            hasDelete
                            header={item.deductionTitle}
                            open
                            > -->
                    <div
                        class="flex w-full flex-col gap-2 gap-2.5 border border-system-primary p-2.5 rounded"
                    >
                        <div
                            class="flex w-full flex-row justify-evenly gap-2.5"
                        >
                            <DateSelector
                                {labelBlack}
                                handleDateChange
                                disabled={false}
                                labelType="label-200"
                                label="Tarikh Mula"
                                selectedDate={$umumForm.tempohBayaran}
                            ></DateSelector>
                            <DateSelector
                                {labelBlack}
                                handleDateChange
                                disabled={false}
                                labelType="label-200"
                                label="Tarikh Tamat"
                                selectedDate={$umumForm.tempohBayaran}
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
                            bind:value={$umumForm.tempohBayaran}
                        ></DropdownSelect>
                        <TextField
                            labelType="label-200"
                            {labelBlack}
                            disabled={false}
                            label="Jumlah Bayaran"
                        ></TextField>
                    </div>
                    <!-- </DynamicAccordionForm>
                    {/each} -->
                </CustomTabContent>

                <!-- Pemangkuan -->
                <CustomTabContent title="Pemangkuan">
                    <SectionHeader
                        ><TextIconButton
                            primary
                            label="Simpan"
                            form="pemangkuanForm"
                            ><SvgCheck />
                        </TextIconButton>
                    </SectionHeader>

                    <div
                        class="flex w-full flex-col gap-2 gap-2.5 border-b border-bdr-primary pb-5"
                    >
                        <form
                            id="pemangkuanForm"
                            method="POST"
                            use:pemangkuanEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <DateSelector
                                hasError={!!$pemangkuanError.effectiveDate}
                                name="effectiveDate"
                                handleDateChange
                                label="Tarikh Berkuatkuasa"
                                bind:selectedDate={$proxyEffectiveDate}
                            ></DateSelector>
                            {#if $pemangkuanError.effectiveDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.effectiveDate}</span
                                >
                            {/if}
                            <DropdownSelect
                                hasError={!!$pemangkuanError.gred}
                                dropdownType={'label-left-full'}
                                name="gred"
                                label="Gred"
                                options={data.gradeLookup}
                                bind:value={$pemangkuanForm.gred}
                            />
                            {#if $pemangkuanError.gred}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.gred}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$pemangkuanError.salary}
                                name="salary"
                                label="Gaji Pokok (RM)"
                                type="text"
                                bind:value={$pemangkuanForm.salary}
                            />
                            {#if $pemangkuanError.salary}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.salary}</span
                                >
                            {/if}
                            <TextField
                                hasTooltip
                                toolTipID="type-itka"
                                hasError={!!$pemangkuanError.itka}
                                name="itka"
                                label="ITKA"
                                type="text"
                                bind:value={$pemangkuanForm.itka}
                            />
                            {#if $pemangkuanError.itka}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.itka}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$pemangkuanError.housingSchemeType}
                                name="housingSchemeType"
                                label="Jenis Skim Perumahan"
                                type="text"
                                bind:value={$pemangkuanForm.housingSchemeType}
                            />
                            {#if $pemangkuanError.housingSchemeType}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.housingSchemeType}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$pemangkuanError.totalHousingScheme}
                                name="totalHousingScheme"
                                label="Jumlah Skim Perumahan"
                                type="text"
                                bind:value={$pemangkuanForm.totalHousingScheme}
                            />
                            {#if $pemangkuanError.totalHousingScheme}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.totalHousingScheme}</span
                                >
                            {/if}
                            <TextField
                                hasTooltip
                                toolTipID="type-cola"
                                hasError={!!$pemangkuanError.cola}
                                name="cola"
                                label="COLA"
                                type="text"
                                bind:value={$pemangkuanForm.cola}
                            />
                            {#if $pemangkuanError.cola}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$pemangkuanError.cola}</span
                                >
                            {/if}
                            <div
                                class="flex w-full flex-row justify-evenly gap-2.5"
                            >
                                <label
                                    for=""
                                    class="w-[220px] min-w-[220px] text-sm font-medium"
                                    >Tarikh Pergerakan Gaji dan Jumlah (RM)</label
                                >
                                <div class="w-full flex-row">
                                    <TextField
                                        labelType="label-fit"
                                        hasError={!!$pemangkuanError.month}
                                        name="month"
                                        label="Bulan"
                                        type="text"
                                        bind:value={$pemangkuanForm.month}
                                    />
                                    {#if $pemangkuanError.month}
                                        <span
                                            class="ml-[40px] font-sans text-sm italic text-system-danger"
                                            >{$pemangkuanError.month}</span
                                        >
                                    {/if}
                                </div>
                                <div class="w-full flex-row">
                                    <TextField
                                        labelType="label-fit"
                                        hasError={!!$pemangkuanError.total}
                                        name="total"
                                        label="Jumlah"
                                        type="text"
                                        bind:value={$pemangkuanForm.total}
                                    />
                                    {#if $pemangkuanError.total}
                                        <span
                                            class="ml-[48px] font-sans text-sm italic text-system-danger"
                                            >{$pemangkuanError.total}</span
                                        >
                                    {/if}
                                </div>
                            </div>
                        </form>
                    </div>

                    <SectionHeader title="Senarai Tuntutan"
                        ><TextIconButton
                            primary
                            label="Tambah"
                            onClick={() => (openPemangkuanModal = true)}
                            ><SvgPlus /></TextIconButton
                        ></SectionHeader
                    >
                    <!-- {#each Object.entries(pelarasanGajiTuntutan) as [groupId, object]}
                        <DynamicAccordionForm
                            hasDelete
                            id={groupId}
                            onDelete={() => {
                                removeFormGroup(groupId);
                            }}
                            header="Tuntutan #{groupId}"
                            open
                            > -->
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
                                selectedDate={$umumForm.tempohBayaran}
                            ></DateSelector>
                            <DateSelector
                                {labelBlack}
                                handleDateChange
                                disabled={false}
                                labelType="label-200"
                                label="Tarikh Tamat"
                                selectedDate={$umumForm.tempohBayaran}
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
                    <!-- </DynamicAccordionForm>
                    {/each} -->
                </CustomTabContent>
                <!-- Pelarasan Gaji -->
                <CustomTabContent title="Pelarasan Gaji">
                    <SectionHeader title="Senarai Penambahan"
                        ><TextIconButton
                            primary
                            label="Tambah"
                            onClick={() => (openPelarasGajiModal = true)}
                            ><SvgPlus /></TextIconButton
                        ></SectionHeader
                    >
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 rounded border border-system-primary p-2.5 text-black"
                    >
                        <TextField
                            labelType="label-200"
                            {labelBlack}
                            disabled
                            label="Jenis Penambahan"
                            value="Penambahan 1"
                        ></TextField>
                        <DateSelector
                            {labelBlack}
                            handleDateChange
                            disabled
                            labelType="label-200"
                            label="Tarikh Mula"
                            bind:selectedDate={$modalForm.tempohBayaran}
                        ></DateSelector>
                        <DateSelector
                            {labelBlack}
                            handleDateChange
                            disabled
                            labelType="label-200"
                            label="Tarikh Tamat"
                            bind:selectedDate={$modalForm.tempohBayaran}
                        ></DateSelector>
                        <DropdownSelect
                            disabled
                            dropdownType="label-left-200"
                            options={deductionType}
                            label="Jenis Bayaran (RM)"
                            {labelBlack}
                            bind:value={$modalForm.tempohBayaran}
                        ></DropdownSelect>
                        <TextField
                            labelType="label-200"
                            {labelBlack}
                            disabled
                            label="Jumlah Bayaran"
                        ></TextField>
                    </div>
                    <!-- {#each senaraiPemotongan as item, index}
                        <DynamicAccordionForm
                            hasDelete
                            header="Penambahan #{index + 1}"
                            open
                            ><div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 text-black"
                            >
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled={false}
                                    label="Jenis Penambahan"
                                    value="Penambahan 1"
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
                                        selectedDate={item.deductionStartDate}
                                    ></DateSelector>
                                    <DateSelector
                                        {labelBlack}
                                        handleDateChange
                                        disabled={false}
                                        labelType="label-200"
                                        label="Tarikh Tamat"
                                        selectedDate={item.deductionEndDate}
                                    ></DateSelector>
                                </div>
                                <DropdownSelect
                                    disabled={false}
                                    dropdownType="label-left-200"
                                    options={deductionType}
                                    label="Jenis Bayaran"
                                    labelBlack={false}
                                    bind:value={item.deductionType}
                                ></DropdownSelect>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled={false}
                                    label="Jumlah Bayaran"
                                ></TextField>
                            </div>
                        </DynamicAccordionForm>
                    {/each} -->
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<!-- Tooltip body -->
<Tooltip type="dark" triggeredBy="[id^='type-']" on:show={assignContent}
    >{tooltipContent}</Tooltip
>

<!-- Umum Modal -->
<Modal title="Tambah Pemotongan" bind:open={openUmumModal}>
    <form
        id="modalForm"
        use:modalEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 text-black"
        >
            <DateSelector
                hasError={!!$modalError.startDate}
                name="startDate"
                handleDateChange
                label="Tarikh Mula"
                labelType="label-200"
                bind:selectedDate={$modalForm.startDate}
            ></DateSelector>
            {#if $modalError.startDate}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.startDate}</span
                >
            {/if}

            <DateSelector
                hasError={!!$modalError.endDate}
                name="endDate"
                handleDateChange
                label="Tarikh Tamat"
                labelType="label-200"
                bind:selectedDate={$modalForm.endDate}
            ></DateSelector>
            {#if $modalError.endDate}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.endDate}</span
                >
            {/if}
            <DropdownSelect
                hasError={!!$modalError.paymentType}
                dropdownType="label-left-200"
                id="paymentType"
                label="Jenis Bayaran"
                bind:value={$modalForm.paymentType}
                options={[
                    { value: '1', name: 'Bulanan' },
                    { value: '2', name: 'Penuh' },
                ]}
            ></DropdownSelect>
            {#if $modalError.paymentType}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.paymentType}</span
                >
            {/if}
            <TextField
                hasError={!!$modalError.totalPayment}
                name="totalPayment"
                label="Jumlah Bayaran"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.totalPayment}
            />
            {#if $modalError.totalPayment}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.totalPayment}</span
                >
            {/if}
        </div>
        <TextIconButton primary label="Simpan" form="modalForm"
        ></TextIconButton>
    </form>
</Modal>

<!-- Pemangkuan Modal -->
<Modal title="Tambah Tuntutan" bind:open={openPemangkuanModal}>
    <form
        id="modalForm"
        use:modalEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 text-black"
        >
            <TextField
                hasError={!!$modalError.jenisPenambahan}
                name="namaTuntutan"
                label="Name Tuntutan"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.jenisPenambahan}
            />
            {#if $modalError.jenisPenambahan}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.jenisPenambahan}</span
                >
            {/if}
            <DateSelector
                hasError={!!$modalError.startDate}
                name="startDate"
                handleDateChange
                label="Tarikh Mula"
                labelType="label-200"
                bind:selectedDate={$modalForm.startDate}
            ></DateSelector>
            {#if $modalError.startDate}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.startDate}</span
                >
            {/if}

            <DateSelector
                hasError={!!$modalError.endDate}
                name="endDate"
                handleDateChange
                label="Tarikh Tamat"
                labelType="label-200"
                bind:selectedDate={$modalForm.endDate}
            ></DateSelector>
            {#if $modalError.endDate}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.endDate}</span
                >
            {/if}
            
            <TextField
                hasError={!!$modalError.totalPayment}
                name="totalPayment"
                label="Sepatutnya Bayar"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.totalPayment}
            />
            {#if $modalError.paymentType}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.paymentType}</span
                >
            {/if}
            <TextField
                hasError={!!$modalError.totalPayment}
                name="totalPayment"
                label="Telah Bayar"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.totalPayment}
            />
            {#if $modalError.paymentType}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.paymentType}</span
                >
            {/if}
            <TextField
                hasError={!!$modalError.totalPayment}
                name="totalPayment"
                label="Jumlah Potongan / Tunggakan (RM)"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.totalPayment}
            />
            {#if $modalError.totalPayment}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.totalPayment}</span
                >
            {/if}
        </div>
        <TextIconButton primary label="Simpan" form="modalForm"
        ></TextIconButton>
    </form>
</Modal>

<!-- Pelaras Gaji Modal -->
<Modal title="Tambah Penambahan" bind:open={openPelarasGajiModal}>
    <form
        id="modalForm"
        use:modalEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 text-black"
        >
            <TextField
                hasError={!!$modalError.jenisPenambahan}
                name="jenisPenambahan"
                label="Jenis Penambahan"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.jenisPenambahan}
            />
            {#if $modalError.jenisPenambahan}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.jenisPenambahan}</span
                >
            {/if}
            <DateSelector
                hasError={!!$modalError.startDate}
                name="startDate"
                handleDateChange
                label="Tarikh Mula"
                labelType="label-200"
                bind:selectedDate={$modalForm.startDate}
            ></DateSelector>
            {#if $modalError.startDate}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.startDate}</span
                >
            {/if}

            <DateSelector
                hasError={!!$modalError.endDate}
                name="endDate"
                handleDateChange
                label="Tarikh Tamat"
                labelType="label-200"
                bind:selectedDate={$modalForm.endDate}
            ></DateSelector>
            {#if $modalError.endDate}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.endDate}</span
                >
            {/if}
            <DropdownSelect
                hasError={!!$modalError.paymentType}
                dropdownType="label-left-200"
                id="paymentType"
                label="Jenis Bayaran"
                bind:value={$modalForm.paymentType}
                options={[
                    { value: '1', name: 'Bulanan' },
                    { value: '2', name: 'Penuh' },
                ]}
            ></DropdownSelect>
            {#if $modalError.paymentType}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.paymentType}</span
                >
            {/if}
            <TextField
                hasError={!!$modalError.totalPayment}
                name="totalPayment"
                label="Jumlah Bayaran (RM)"
                labelType="label-200"
                type="text"
                bind:value={$modalForm.totalPayment}
            />
            {#if $modalError.totalPayment}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$modalError.totalPayment}</span
                >
            {/if}
        </div>
        <TextIconButton primary label="Simpan" form="modalForm"
        ></TextIconButton>
    </form>
</Modal>
<Toaster />
