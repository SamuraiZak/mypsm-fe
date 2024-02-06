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
    import type { CommonEmployeeDTO } from '$lib/dto/mypsm/common/employee/employee.dto';
    import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
    export let data: PageData;
    let tempData: CommonEmployeeDTO;

    let isGredChecked: boolean = false;
    let isSpecialFiAidTextChecked: boolean = false;
    let isSpecialIncrementChecked: boolean = false;
    let selectedStatus = status.values; // Default selected filter
    let selectedSalaryMovementMonth = ''; // Default selected filter
    let selectedGred = ''; // Default selected filter
    // let specialAid: any;
    let selectedEmployee: CommonEmployeeDTO[] = [];
    let tempUrl: IntSalaryMovementRecord;
    let tooltipContent: string = '';
    import type { EmployeeSalaryMovementID } from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-request.dto';
    import type { Employee } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-response.view-model';
    const specialAid: string =
        'Ditetapkan sekali sepanjang tahun pergerakan gaji';
    const specialByGrossPay: string = 'Peratusan daripada jumlah gaji pokok';
    const kgtIncrease: string = 'Peratusan daripada KGT';

    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'special-fi-aid':
                    tooltipContent = specialAid;
                    break;
                case 'from-gross-pay':
                    tooltipContent = specialByGrossPay;
                    break;
                case 'from-kgt':
                    tooltipContent = kgtIncrease;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }

    // Anual Salary Increment
    const {
        form: annualSalaryIncrementForm,
        errors: annualSalaryIncrementErrors,
        enhance: annualSalaryIncrementEnhance,
    } = superForm(data.annualSalaryIncrement, {
        SPA: true,
        id: 'FormAnnualSalaryIncrement',
        validationMethod: 'oninput',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        validators: _annualSalaryIncrement,
        onSubmit() {
            let collectedId = selectedEmployee.map((item) => ({
                employeeId: Number(item.employeeId),
            }));
            $annualSalaryIncrementForm.employees = collectedId;
            // console.log(collectedId)
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

    function pushSelected(data: CommonEmployeeDTO) {
        let tempSelected = selectedEmployee;
        if (!tempSelected.includes(data)) {
            tempSelected.push(data);
            selectedEmployee = tempSelected;
            // let tempEmployeeID: EmployeeSalaryMovementID[] = selectedEmployee.map(item => ({employeeId: item.employeeId}));
            // console.log(selectedEmployee)
        }
    }

    // function popSelected(data: CommonEmployeeDTO) {
    //     let tempSelected = selectedEmployee;
    //     tempSelected = tempSelected.filter((item) => item !== data);

    //     selectedEmployee = tempSelected;
    // }

    const monthLookup: DropdownOptionsInterface[] = [
        { value: 1, name: 'Januari' },
        { value: 4, name: 'April' },
        { value: 7, name: 'Julai' },
        { value: 10, name: 'Oktober' },
    ];

    console.log(selectedEmployee)
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
                        hasError={!!$annualSalaryIncrementErrors.meetingName}
                        dropdownType="label-left-full"
                        id="meetingName"
                        label="Nama dan Bilangan Mesyuarat"
                        bind:value={$annualSalaryIncrementForm.meetingName}
                        options={[
                            { value: '1/12', name: '1/12' },
                            { value: '1/102', name: '1/102' },
                            { value: '2/101', name: '2/101' },
                        ]}
                    />
                    {#if $annualSalaryIncrementErrors.meetingName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$annualSalaryIncrementErrors.meetingName[0]}</span
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
                        options={monthLookup}
                    ></DropdownSelect>
                    {#if $annualSalaryIncrementErrors.salaryMovementMonth}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$annualSalaryIncrementErrors.salaryMovementMonth}</span
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
                                dropdownType="label-left"
                                id="gred"
                                label="Gred"
                                value={1}
                                options={data.gradeLookup}
                            ></DropdownSelect>
                            <!-- hasError={!!$annualSalaryIncrementErrors.gred && isGredChecked}
                            {#if $annualSalaryIncrementErrors.gred && isGredChecked}
                                <span
                                    class="ml-8 font-sans text-sm italic text-system-danger"
                                    >{$annualSalaryIncrementErrors.gred}</span
                                >
                            {/if} -->
                        </div>
                    </Checkbox>

                    <Checkbox
                        name="specialFiAidText"
                        bind:checked={isSpecialFiAidTextChecked}
                        ><div class="flex flex-col">
                            <TextField
                                labelType="label-fit"
                                hasTooltip={true}
                                toolTipID="specialAid"
                                disabled={!isSpecialFiAidTextChecked}
                                hasError={!!$annualSalaryIncrementErrors.specialAid}
                                name="specialFiAid"
                                label="Bantuan Khas Kewangan (RM)"
                                bind:value={$annualSalaryIncrementForm.specialAid}
                            />
                            {#if $annualSalaryIncrementErrors.specialAid}
                                <span
                                    class="ml-[115px] font-sans text-sm italic text-system-danger"
                                    >{$annualSalaryIncrementErrors.specialAid}</span
                                >
                            {/if}
                        </div>
                    </Checkbox>

                    <Checkbox
                        name="specialIncrement"
                        bind:checked={isSpecialIncrementChecked}
                    >
                        <div class="flex w-full flex-col">
                            <label for="specialIncrement"
                                >Kenaikan Khas (RM)</label
                            >
                            {#if $annualSalaryIncrementErrors.specialRaiseType}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >{$annualSalaryIncrementErrors.specialRaiseType}</span
                                >
                            {/if}
                        </div>
                        <div class="ml-2.5 flex w-full flex-col gap-2.5">
                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialRaiseType"
                                legend={'Radio Button'}
                                bind:group={$annualSalaryIncrementForm.specialRaiseType}
                                value={'fixed'}
                            >
                                <TextField
                                    disabled={$annualSalaryIncrementForm.specialRaiseType !==
                                        'fixed'}
                                    labelType="no-label"
                                    hasError={!!$annualSalaryIncrementErrors.specialRaise}
                                    name="specialRaiseType"
                                    bind:value={$annualSalaryIncrementForm.specialRaise}
                                />
                                <!-- {#if $annualSalaryIncrementErrors.specialRaiseType}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$annualSalaryIncrementErrors.specialRaiseType}</span
                                    >
                                {/if} -->
                            </Radio>

                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialRaiseType"
                                legend={'Radio Button'}
                                value={'specialByGrossPay'}
                                bind:group={$annualSalaryIncrementForm.specialRaiseType}
                            >
                                <TextField
                                    disabled={$annualSalaryIncrementForm.specialRaiseType !==
                                        'specialByGrossPay'}
                                    hasTooltip={true}
                                    toolTipID="type-from-gross-pay"
                                    labelType="no-label"
                                    hasError={!!$annualSalaryIncrementErrors.specialRaise}
                                    name="specialRaiseType"
                                    bind:value={$annualSalaryIncrementForm.specialRaise}
                                />
                                <!-- {#if $annualSalaryIncrementErrors.specialRaiseType}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$annualSalaryIncrementErrors.specialRaiseType}</span
                                    >
                                {/if} -->
                            </Radio>

                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialAid"
                                legend={'Radio Button'}
                                value={'specialByKgtPercent'}
                                bind:group={$annualSalaryIncrementForm.specialRaiseType}
                            >
                                <TextField
                                    disabled={$annualSalaryIncrementForm.specialRaiseType !==
                                        'specialByKgtPercent'}
                                    hasTooltip={true}
                                    toolTipID="kgtIncrease"
                                    labelType="no-label"
                                    hasError={!!$annualSalaryIncrementErrors.specialRaise}
                                    name="specialRaiseType"
                                    bind:value={$annualSalaryIncrementForm.specialRaise}
                                />
                                <!-- {#if $annualSalaryIncrementErrors.specialRaiseType}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$annualSalaryIncrementErrors.specialRaiseType}</span
                                    >
                                {/if}</Radio -->
                            </Radio>
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
            title="Senarai Kakitangan Yang Telah Dipilih"
            description=""
        >
            <!-- <TextIconButton label="Pindah" onClick={() => {}}>
                <SvgArrowDownTail />
            </TextIconButton> -->
        </ContentHeader>
        <!-- <SectionHeader title="Senarai Rekod Layak Mengikut Bulan"
        ></SectionHeader> -->

        <DynamicTable tableItems={selectedEmployee} />
        <!-- <DynamicTable
            hasCheckbox
            tableItems={data.salaryMovementList}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url =
                    './pergerakan-gaji/butiran-' +
                    tempData.meetingId+'-'+tempData.employeeNumber

                goto(url);
            }}
            bind:passData={tempData}
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
        /> -->
    </div>
    <br />
    <div class="flex h-fit w-full flex-col items-start justify-center">
        <!-- Table for 'Tidak Layak' candidates -->
        <ContentHeader
            title="Tindakan: Pilih kakitangan yang layak."
            description=""
            >
            <!-- <TextIconButton
                label="Pindah"
                onClick={() => {
                    () => console.log('here');
                    pushSelected(tempData);
                }}
            >
                <SvgArrowUp></SvgArrowUp>
            </TextIconButton> -->
            </ContentHeader>
        <!-- <SectionHeader title="Senarai Rekod Layak Mengikut Bulan"
        /> -->
        <SectionHeader title="Senarai Kakitangan" />

        <DynamicTable
            tableItems={data.employeeList}
            withRowSelection
            selectAdd
            bind:passData={tempData}
            onSelect={() => pushSelected(tempData)}
        />
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
