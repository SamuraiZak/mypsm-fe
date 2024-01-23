<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';
    import SvgArrowUp from '$lib/assets/svg/SvgArrowUp.svelte';
    import SvgArrowDownTail from '$lib/assets/svg/SvgArrowDownTail.svelte';
    import { z, ZodError } from 'zod';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import { superForm } from 'sveltekit-superforms/client';
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
    let selectedStatus = status.value; // Default selected filter
    let selectedSalaryMovementMonth = ''; // Default selected filter
    let selectedGred = ''; // Default selected filter
    let errorData: any;
    let meetingTypeOption: any;
    let meetingDate: any;
    let gred: any;
    let specialFiAidText: any;
    let specialAid: any;
    let tempUrl: IntSalaryMovementRecord;
    let tooltipContent: string = '';
    let salaryMovementMonthType: any;

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

    // const dateScheme = z.coerce
    //     .date({
    //         errorMap: (issue, { defaultError }) => ({
    //             message:
    //                 issue.code === 'invalid_date'
    //                     ? 'Tarikh tidak boleh dibiar kosong.'
    //                     : defaultError,
    //         }),
    //     })
    //     .min(new Date(), {
    //         message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    //     });

    // const exampleFormSchema = z.object({
    //     meetingTypeOption: z.enum(['1', '2', '3', '4'], {
    //         errorMap: (issue, { defaultError }) => ({
    //             message:
    //                 issue.code === 'invalid_enum_value'
    //                     ? 'Pilihan perlu dipilih.'
    //                     : defaultError,
    //         }),
    //     }),
    //     meetingDate: dateScheme,
    //     salaryMovementMonthType: z.enum(['1', '2', '3', '4'], {
    //         errorMap: (issue, { defaultError }) => ({
    //             message:
    //                 issue.code === 'invalid_enum_value'
    //                     ? 'Pilihan perlu dipilih.'
    //                     : defaultError,
    //         }),
    //     }),
    //     gred: z.optional(
    //         z.enum(['All', 'N19', 'N21', 'N29', 'N32', 'N49', 'N52'], {
    //             errorMap: (issue, { defaultError }) => ({
    //                 message:
    //                     issue.code === 'invalid_enum_value'
    //                         ? 'Pilihan perlu dipilih.'
    //                         : defaultError,
    //             }),
    //         }),
    //     ),
    //     specialFiAidTexts: z.optional(
    //         z
    //             .string({ required_error: 'Medan ini tidak boleh kosong.' })
    //             .min(1, {
    //                 message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    //             })
    //             .max(124, {
    //                 message: 'Medan ini tidak boleh melebihi 124 karakter.',
    //             })
    //             .trim(),
    //     ),
    // });

    // const tetapanKGTForm = async (event: Event) => {
    //     const formData = new FormData(event.target as HTMLFormElement);

    //     const meetingTypeOptionSelector = document.getElementById(
    //         'meetingTypeOption',
    //     ) as HTMLSelectElement;
    //     const salaryMovementMonthType = document.getElementById(
    //         'salaryMovementMonthType',
    //     ) as HTMLSelectElement;
    //     const getGred = document.getElementById('gred') as HTMLSelectElement;

    //     const exampleFormData = {
    //         meetingTypeOption: String(meetingTypeOptionSelector.value),
    //         meetingDate: String(formData.get('meetingDate')),
    //         salaryMovementMonthType: String(salaryMovementMonthType.value),
    //     };

    //     try {
    //         let validatedData;
    //         let result;

    //         if (isGredChecked) {
    //             const gred = String(getGred.value);

    //             const validatedFormData = {
    //                 ...exampleFormData,
    //                 gred,
    //             };
    //             validatedData = validatedFormData;
    //             result = exampleFormSchema.parse(validatedFormData);
    //         } else if (isSpecialFiAidTextChecked) {
    //             const specialFiAidTexts = String(
    //                 formData.get('specialFiAidTexts'),
    //             );
    //             const validatedFormData = {
    //                 ...exampleFormData,
    //                 specialFiAidTexts,
    //             };
    //             validatedData = validatedFormData;
    //             result = exampleFormSchema.parse(validatedFormData);
    //         } else {
    //             validatedData = exampleFormData;
    //             result = exampleFormSchema.parse(exampleFormData);
    //         }

    //         if (result) {
    //             errorData = [];
    //             toast.success('Berjaya disimpan!', {
    //                 style: 'background: #333; color: #fff;',
    //             });

    //             const id = crypto.randomUUID().toString();
    //             const validatedFormData = {
    //                 ...validatedData,
    //                 id,
    //             };
    //             console.log(
    //                 'REQUEST BODY: ',
    //                 JSON.stringify(validatedFormData),
    //             );
    //         }
    //     } catch (err: unknown) {
    //         if (err instanceof ZodError) {
    //             const { fieldErrors: errors } = err.flatten();
    //             errorData = errors;
    //             console.log('ERROR!', err.flatten());
    //             toast.error(
    //                 'Sila pastikan maklumat adalah lengkap dengan tepat.',
    //                 {
    //                     style: 'background: #333; color: #fff;',
    //                 },
    //             );
    //         }
    //     }
    // };
    //Supporter Approver
    const {
        form: annualSalaryIncrementForm,
        errors: annualSalaryIncrementErrors,
        enhance: annualSalaryIncrementEnhance,
    } = superForm(data.annualSalaryIncrement, {
        SPA: true,
        validators: _annualSalaryIncrement,
        onSubmit() {
            _submitFormAnnualSalaryIncrement($annualSalaryIncrementForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
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
        <!-- <DropdownSelect
            toolTipID="type-special-fi-aid"
            hasTooltip={true}
            id="salary-movement-month-dropdown"
            label="Bulan Pergerakan Gaji *"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        ></DropdownSelect> -->
        <!-- <ShortTextField label="KGT Pegawai" type="text" /> -->
        <!-- <DropdownSelect
            id="gred-dropdown"
            label="Gred"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        />
        <DropdownSelect
            id="status-dropdown"
            label="Status"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        /> -->
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
                        hasError={errorData?.meetingTypeOption}
                        dropdownType="label-left-full"
                        id="meetingTypeOption"
                        label="Nama dan Bilangan Mesyuarat"
                        bind:value={meetingTypeOption}
                        options={[
                            { value: '1', name: 'Semua' },
                            { value: '2', name: '1/12' },
                            { value: '3', name: '1/102' },
                            { value: '4', name: '2/101' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.meetingTypeOption}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingTypeOption}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={errorData?.meetingDate}
                        name="meetingDate"
                        handleDateChange
                        label="Tarikh Mesyuarat"
                        bind:selectedDate={meetingDate}
                    ></DateSelector>
                    {#if errorData?.meetingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingDate}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={errorData?.salaryMovementMonthType}
                        dropdownType="label-left-full"
                        id="salaryMovementMonthType"
                        label="Bulan Pergerakan Gaji"
                        bind:value={salaryMovementMonthType}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'April' },
                            { value: '3', name: 'Julai' },
                            { value: '4', name: 'Oktober' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.salaryMovementMonthType}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.salaryMovementMonthType}</span
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
                                hasError={errorData?.gred}
                                disabled={!isGredChecked}
                                dropdownType="label-left"
                                id="gred"
                                label="Gred"
                                bind:value={gred}
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
                            {#if errorData?.gred}
                                <span
                                    class="ml-8 font-sans text-sm italic text-system-danger"
                                    >{errorData?.gred}</span
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
                                hasError={errorData?.specialFiAidTexts}
                                disabled={!isSpecialFiAidTextChecked}
                                name="specialFiAidTexts"
                                label="Bantuan Khas Kewangan (RM)"
                                type="number"
                                bind:value={specialFiAidText}
                            />
                            {#if errorData?.specialFiAidTexts}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialFiAidTexts}</span
                                >
                            {/if}
                        </div>
                    </Checkbox>

                    {#if errorData?.specialFiAidText}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.specialFiAidText}</span
                        >
                    {/if}
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
                                    hasError={errorData?.specialFiAidText}
                                    name="specialFiAidText"
                                    type="text"
                                    bind:value={specialFiAidText}
                                />

                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText}</span
                                    >
                                {/if}
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText}</span
                                    >
                                {/if}
                            </Radio>
                            {#if errorData?.specialAid}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialAid}</span
                                >
                            {/if}
                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialAid"
                                legend={'Radio Button'}
                                value={'specialByGrossPay'}
                                bind:group={specialAid}
                                ><TextField
                                    disabled={specialAid !==
                                        'specialByGrossPay'}
                                    hasTooltip={true}
                                    toolTipID="type-from-gross-pay"
                                    labelType="no-label"
                                    hasError={errorData?.specialFiAidText}
                                    name="specialFiAidText"
                                    type="text"
                                    bind:value={specialFiAidText}
                                />
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText}</span
                                    >
                                {/if}
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText}</span
                                    >
                                {/if}</Radio
                            >
                            {#if errorData?.specialAid}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialAid}</span
                                >
                            {/if}
                            <Radio
                                disabled={!isSpecialIncrementChecked}
                                name="specialAid"
                                legend={'Radio Button'}
                                value={'specialByKgtPercent'}
                                bind:group={specialAid}
                                ><TextField
                                    disabled={specialAid !==
                                        'specialByKgtPercent'}
                                    hasTooltip={true}
                                    toolTipID="type-from-kgt"
                                    labelType="no-label"
                                    hasError={errorData?.specialFiAidText}
                                    name="specialFiAidText"
                                    type="text"
                                    bind:value={specialFiAidText}
                                />
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText}</span
                                    >
                                {/if}
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText}</span
                                    >
                                {/if}</Radio
                            >
                            {#if errorData?.specialAid}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialAid}</span
                                >
                            {/if}
                        </div>

                        {#if errorData?.specialIncrement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.specialIncrement}</span
                            >
                        {/if}
                        {#if errorData?.specialIncrement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.specialIncrement}</span
                            >
                        {/if}</Checkbox
                    >

                    {#if errorData?.specialIncrement}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.specialIncrement}</span
                        >
                    {/if}
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
            tableItems={data.records.salaryMovementRecord}
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
