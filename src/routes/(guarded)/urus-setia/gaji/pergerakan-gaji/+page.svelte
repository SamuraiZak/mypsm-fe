<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';
    import SvgArrowUp from '$lib/assets/svg/SvgArrowUp.svelte';
    import SvgArrowDownTail from '$lib/assets/svg/SvgArrowDownTail.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import {
        _annualSalaryIncrement,
        _submitFormAnnualSalaryIncrement,
    } from './+page';
    export let data: PageData;

    let isGredChecked: boolean = false;
    let isSpecialFiAidTextChecked: boolean = false;
    let isSpecialIncrementChecked: boolean = false;
    let selectedStatus = status.values; // Default selected filter
    let selectedSalaryMovementMonth = ''; // Default selected filter
    let selectedGred = ''; // Default selected filter
    let specialAid: any;
    let tempUrl: IntSalaryMovementRecord;
    let tooltipContent: string = '';

    const specialFiAid: string =
        'Ditetapkan sekali sepanjang tahun pergerakan gaji';
    const percentFromGrossPay: string = 'Peratusan daripada jumlah gaji pokok';
    const kgtIncrease: string = 'Peratusan daripada KGT';

    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'special-fi-aid':
                    tooltipContent = specialFiAid;
                    break;
                case 'from-gross-pay':
                    tooltipContent = percentFromGrossPay;
                    break;
                case 'from-kgt':
                    tooltipContent = kgtIncrease;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }

    // Annual Salary Increment
    const {
        form: annualSalaryIncrementForm,
        errors: annualSalaryIncrementErrors,
        enhance: annualSalaryIncrementEnhance,
    } = superForm(data.annualSalaryIncrement, {
        SPA: true,
        id: 'FormAnnualSalaryIncrement',
        validators: _annualSalaryIncrement,
        onSubmit() {
            _submitFormAnnualSalaryIncrement($annualSalaryIncrementForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const proxyMeetingDate = dateProxy(
        annualSalaryIncrementForm,
        'meetingDate',
        {
            format: 'date',
        },
    );

    console.log(data.salaryMovementList)
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pergerakan Gaji"
        description="Hal-hal berkaitan pengurusan gaji bagi kakitangan LKIM"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterContainer>
        <FilterTextInput label="No. Pekerja"></FilterTextInput>
        <FilterTextInput label="Nama"></FilterTextInput>
        <FilterTextInput label="No. K/P"></FilterTextInput>
        <FilterTextInput label="KGT Pegawai"></FilterTextInput>
        <FilterSelectInput
            id="meeting-type-dropdown"
            label="Bulan Pergerakan Gaji"
            options={[
                {
                    value: 'jan',
                    name: 'Jan',
                },
                {
                    value: 'apr',
                    name: 'APR',
                },
                {
                    value: 'jul',
                    name: 'Jul',
                },
                {
                    value: 'oct',
                    name: 'Okt',
                },
            ]}
            bind:selectedVal={selectedSalaryMovementMonth}
        ></FilterSelectInput>
        <FilterSelectInput
            id="meeting-type-dropdown"
            label="Grad"
            options={data.records.gredLists}
            bind:selectedVal={selectedGred}
        ></FilterSelectInput>
        <FilterSelectInput
            id="meeting-type-dropdown"
            label="Status"
            options={status}
            bind:selectedVal={selectedStatus}
        ></FilterSelectInput>
                
    </FilterContainer>

    <!-- area for setting for bulk salary movements -->
    <div class="my-2 border-b-8 border-l-2 border-r-2 border-t-8 p-2.5">
        <form
            id="FormAnnualSalaryIncrement"
            class="flex w-full flex-col gap-2"
            use:annualSalaryIncrementEnhance
            method="POST"
        >
            <p class="text-lg text-system-primary">
                Tetapan Kenaikan Gaji Tahunan (KGT) Semua Kakitangan:
            </p>

            <div class="flex flex-col gap-2.5 p-2.5">
                <div class="flex w-1/2 flex-col gap-2.5">
                    <DropdownSelect
                        hasError={!!$annualSalaryIncrementErrors.meetingTypeOption}
                        dropdownType="label-left-full"
                        id="meetingTypeOption"
                        label="Nama dan Bilangan Mesyuarat"
                        bind:value={$annualSalaryIncrementForm.meetingTypeOption}
                        options={[
                            { value: '1', name: 'Semua' },
                            { value: '2', name: '1/12' },
                            { value: '3', name: '1/102' },
                            { value: '4', name: '2/101' },
                        ]}
                    ></DropdownSelect>
                    {#if $annualSalaryIncrementErrors.meetingTypeOption}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$annualSalaryIncrementErrors
                                .meetingTypeOption[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={!!$annualSalaryIncrementErrors.meetingDate}
                        name="meetingDate"
                        handleDateChange
                        label="Tarikh Mesyuarat"
                        bind:selectedDate={$proxyMeetingDate}
                    ></DateSelector>
                    {#if $annualSalaryIncrementErrors.meetingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$annualSalaryIncrementErrors.meetingDate[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={!!$annualSalaryIncrementErrors.salaryMovementMonth}
                        dropdownType="label-left-full"
                        id="salaryMovementMonth"
                        label="Bulan Pergerakan Gaji"
                        bind:value={$annualSalaryIncrementForm.salaryMovementMonth}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'April' },
                            { value: '3', name: 'Julai' },
                            { value: '4', name: 'Oktober' },
                        ]}
                    ></DropdownSelect>
                    {#if $annualSalaryIncrementErrors.salaryMovementMonth}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$annualSalaryIncrementErrors
                                .salaryMovementMonth}</span
                        >
                    {/if}
                </div>

                <b class="mt-5 text-base italic text-system-primary">
                    Keputusan mesyuarat:
                </b>
                <div class="flex flex-row justify-between gap-x-5">
                    <Checkbox name="gred" bind:checked={isGredChecked}>
                        <div class="flex flex-col">
                            
                            <DropdownSelect
                                disabled={!isGredChecked}
                                hasError={!!$annualSalaryIncrementErrors.gred && isGredChecked}
                                dropdownType="label-left"
                                id="gred"
                                label="Gred"
                                bind:value={$annualSalaryIncrementForm.gred}
                                options={[
                                    { value: 1, name: 'Semua' },
                                    { value: 2, name: 'N19' },
                                    { value: 3, name: 'N21' },
                                    { value: 4, name: 'N29' },
                                    { value: 5, name: 'N32' },
                                    { value: 6, name: 'N49' },
                                    { value: 7, name: 'N52' },
                                ]}
                            ></DropdownSelect>
                            {#if $annualSalaryIncrementErrors.gred && isGredChecked}
                                <span
                                    class="ml-8 font-sans text-sm italic text-system-danger"
                                    >{$annualSalaryIncrementErrors.gred}</span
                                >
                            {/if}
                        </div>
                    </Checkbox>

                    <Checkbox
                        name="specialFiAidText"
                        bind:checked={isSpecialFiAidTextChecked}
                        ><div class="flex flex-col">
                            
                            <TextField
                                labelType="label-fit"
                                hasTooltip={true}
                                toolTipID="type-special-fi-aid"
                                disabled={!isSpecialFiAidTextChecked}
                                hasError={!!$annualSalaryIncrementErrors.specialFiAid}
                                name="specialFiAid"
                                label="Bantuan Khas Kewangan (RM)"
                                bind:value={$annualSalaryIncrementForm.specialFiAid}
                            />
                            {#if $annualSalaryIncrementErrors.specialFiAid}
                                <span
                                    class="ml-[115px] font-sans text-sm italic text-system-danger"
                                    >{$annualSalaryIncrementErrors.specialFiAid}</span
                                >
                            {/if}
                        </div>
                    </Checkbox>

                    <Checkbox
                        name="specialIncrement"
                        bind:checked={isSpecialIncrementChecked}
                    >
                        <label for="specialIncrement">Kenaikan Khas (RM)</label>
                        <div class="ml-2.5 flex flex-col gap-2.5">
                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialAid"
                                legend={'Radio Button'}
                                bind:group={specialAid}
                                value={'specialByAmount'}
                            >
                                
                                <TextField
                                    disabled={specialAid !== 'specialByAmount'}
                                    labelType="no-label"
                                    hasError={!!$annualSalaryIncrementErrors.specialFiAidText}
                                    name="specialFiAidText"
                                    bind:value={$annualSalaryIncrementForm.specialFiAidText}
                                />
                                {#if $annualSalaryIncrementErrors.specialFiAidText}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$annualSalaryIncrementErrors.specialFiAidText}</span
                                    >
                                {/if}
                            </Radio>

                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialAid"
                                legend={'Radio Button'}
                                value={'specialByGrossPay'}
                                bind:group={specialAid}
                            >
                                <TextField
                                    disabled={specialAid !==
                                        'specialByGrossPay'}
                                    hasTooltip={true}
                                    toolTipID="type-from-gross-pay"
                                    labelType="no-label"
                                    hasError={!!$annualSalaryIncrementErrors.specialFiAidText}
                                    name="specialFiAidText"
                                    type="text"
                                    bind:value={$annualSalaryIncrementForm.specialFiAidText}
                                />
                                {#if $annualSalaryIncrementErrors.specialFiAidText}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$annualSalaryIncrementErrors.specialFiAidText}</span
                                    >
                                {/if}
                            </Radio>

                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialAid"
                                legend={'Radio Button'}
                                value={'specialByKgtPercent'}
                                bind:group={specialAid}
                            >
                               
                                <TextField
                                    disabled={specialAid !==
                                        'specialByKgtPercent'}
                                    hasTooltip={true}
                                    toolTipID="type-from-kgt"
                                    labelType="no-label"
                                    hasError={!!$annualSalaryIncrementErrors.specialFiAidText}
                                    name="specialFiAidText"
                                    type="text"
                                    bind:value={$annualSalaryIncrementForm.specialFiAidText}
                                />
                                {#if $annualSalaryIncrementErrors.specialFiAidText}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$annualSalaryIncrementErrors.specialFiAidText}</span
                                    >
                                {/if}</Radio
                            >
                        </div>
                    </Checkbox>
                </div>
            </div>
        </form>
        <div class="flex w-full justify-center">
            <TextIconButton
                primary
                label="Simpan"
                form="FormAnnualSalaryIncrement"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </div>
    </div>

    <!-- Sample table for testing purposes -->
    <div class="flex h-fit w-full flex-col items-start justify-center">
        <!-- Table for 'Layak' candidates -->
        <ContentHeader
            title="Tindakan: Tetapkan kepada TIDAK Layak"
            description=""
            ><TextIconButton label="Pindah" onClick={() => {}}>
                <SvgArrowDownTail />
            </TextIconButton></ContentHeader
        >
        <SectionHeader title="Senarai Rekod Layak Mengikut Bulan"
        ></SectionHeader>

        <DynamicTable
            hasCheckbox
            tableItems={data.salaryMovementList}
            bind:passData={tempUrl}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url =
                    './pergerakan-gaji/butiran-' +
                    tempUrl.employeeNumber +
                    '-' +
                    tempUrl.identityDocumentNumber;

                goto(url);
            }}
            columnKeys={[
                'employeeNumber',
                'employeeName',
                'employeeGrade',
                'tpg',
                'kgt',
                'salary1',
                'wilayahAllowance1',
                'criticalAllowance1',
                'salary2',
                'wilayahAllowance2',
                'criticalAllowance2',
                'specialkgt',
                'specialSalary',
                'specialWilayahAllowance',
                'specialAid',
            ]}
        />
    </div>
    <br />
    <div class="flex h-fit w-full flex-col items-start justify-center">
        <!-- Table for 'Tidak Layak' candidates -->
        <ContentHeader title="Tindakan: Tetapkan kepada Layak" description=""
            ><TextIconButton label="Pindah" onClick={() => {}}>
                <SvgArrowUp></SvgArrowUp>
            </TextIconButton></ContentHeader
        >
        <SectionHeader title="Senarai Rekod Layak Mengikut Bulan"
        ></SectionHeader>

        <DynamicTable
            tableItems={[]}
            bind:passData={tempUrl}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url =
                    './pergerakan-gaji/butiran-' +
                    tempUrl.employeeNumber +
                    '-' +
                    tempUrl.identityDocumentNumber;
                goto(url);
            }}
        ></DynamicTable>
    </div>
</section>
<!-- Tooltip body -->
<Tooltip
    type="dark"
    triggeredBy="[id^='type-']"
    class="w-[350px] text-center"
    on:show={assignContent}>{tooltipContent}</Tooltip
>
<Toaster />
