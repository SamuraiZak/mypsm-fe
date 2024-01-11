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
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import SvgArrowUp from '$lib/assets/svg/SvgArrowUp.svelte';
    import SvgArrowDownTail from '$lib/assets/svg/SvgArrowDownTail.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import DateSelector from '$lib/components/input/DateSelector.svelte';

    export let data;

    let isGredChecked: boolean = false;
    let isSpecialFiAidChecked: boolean = false;
    let isSpecialIncrementChecked: boolean = false;
    let selectedStatus = status[0].value; // Default selected filter
    let selectedMeetingType: string = meetings[0].value;
    let selectedSalaryMonth: string = '1';
    let selectedGred: string = greds[0].value;
    let errorData: any;
    let meetingTypeOption: any;
    let meetingDate: any;
    let salaryMovementMonthTypeOption: any;
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

    const dateScheme = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const exampleFormSchema = z.object({
        //checkbox schema

        meetingTypeOption: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        meetingDate: dateScheme,
        salaryMovementMonthType: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        gred: z.optional(
            z.enum(['All', 'N19', 'N21', 'N29', 'N32', 'N49', 'N52'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Pilihan perlu dipilih.'
                            : defaultError,
                }),
            }),
        ),
        textFieldExample: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        // gred: z.enum(['on'], {
        //     errorMap: (issue, { defaultError }) => ({
        //         message:
        //             issue.code === 'invalid_enum_value'
        //                 ? 'Sila tandakan kotak semak.'
        //                 : defaultError,
        //     }),
        // }),
        // specialAid: z.enum(['true', 'false'], {
        //     errorMap: (issue, { defaultError }) => ({
        //         message:
        //             issue.code === 'invalid_enum_value'
        //                 ? 'Sila tetapkan pilihan anda.'
        //                 : defaultError,
        //     }),
        // }),
        // specialFiAidText: z
        //     .string({ required_error: 'Medan ini tidak boleh kosong.' })
        //     .min(4, {
        //         message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        //     })
        //     .max(124, {
        //         message: 'Medan ini tidak boleh melebihi 124 karakter.',
        //     })
        //     .trim(),
        // dateSelectorExample: dateScheme,
    });

    const tetapanKGTForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const meetingTypeOptionSelector = document.getElementById(
            'meetingTypeOption',
        ) as HTMLSelectElement;
        const salaryMovementMonthType = document.getElementById(
            'salaryMovementMonthType',
        ) as HTMLSelectElement;
        const getGred = document.getElementById('gred') as HTMLSelectElement;

        const exampleFormData = {
            meetingTypeOption: String(meetingTypeOptionSelector.value),
            meetingDate: String(formData.get('meetingDate')),
            salaryMovementMonthType: String(salaryMovementMonthType.value),
        };

        try {
            let validatedData;
            let result;
            if (isGredChecked) {
                const gred = String(getGred.value);

                const validatedFormData = {
                    ...exampleFormData,
                    gred,
                };
                validatedData = validatedFormData;
                result = exampleFormSchema.parse(validatedFormData);
            } else {
                validatedData = exampleFormData;
                result = exampleFormSchema.parse(exampleFormData);
            }

            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedFormData = {
                    ...validatedData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
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
        <!-- Input fields -->
        <StaffSelector />
        <DropdownSelect
            toolTipID="type-special-fi-aid"
            hasTooltip={true}
            id="salary-movement-month-dropdown"
            label="Bulan Pergerakan Gaji *"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        ></DropdownSelect>
        <ShortTextField label="KGT Pegawai" type="text" />
        <DropdownSelect
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
        />
    </FilterContainer>

    <!-- area for setting for bulk salary movements -->
    <div class="my-2 border-b-8 border-l-2 border-r-2 border-t-8 p-2.5">
        <form
            id="tetapanKGTFormValidation"
            on:submit|preventDefault={tetapanKGTForm}
            class="flex w-full flex-col gap-2"
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
                            >{errorData?.meetingTypeOption[0]}</span
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
                            >{errorData?.meetingDate[0]}</span
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
                            >{errorData?.salaryMovementMonthType[0]}</span
                        >
                    {/if}
                </div>

                <b class="mt-5 text-base italic text-system-primary">
                    Keputusan mesyuarat:
                </b>
                <div class="flex flex-row justify-between gap-x-5">
                    <Checkbox name="gred" bind:checked={isGredChecked}
                        ><DropdownSelect
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
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.gred[0]}</span
                            >
                        {/if}</Checkbox
                    >

                    {#if errorData?.gred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.gred[0]}</span
                        >
                    {/if}

                    <Checkbox
                        name="specialFiAidText"
                        bind:checked={!isSpecialFiAidTextChecked}
                        ><TextField
                            labelType="label-fit"
                            hasTooltip={true}
                            toolTipID="type-special-fi-aid"
                            hasError={errorData?.specialFiAidText}
                            name="specialFiAidText"
                            label="Bantuan Khas Kewangan (RM)"
                            type="number"
                            bind:value={specialFiAidText}
                        />
                        {#if errorData?.specialFiAidText}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.specialFiAidText[0]}</span
                            >
                        {/if}
                        {#if errorData?.specialFiAidText}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.specialFiAidText[0]}</span
                            >
                        {/if}</Checkbox
                    >

                    {#if errorData?.specialFiAidText}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.specialFiAidText[0]}</span
                        >
                    {/if}
                    <Checkbox
                        name="specialIncrement"
                        bind:checked={!isSpecialIncrement}
                    >
                        <label for="specialIncrement">Kenaikan Khas (RM)</label>
                        <div class="ml-2.5 flex flex-col gap-2.5">
                            <Radio
                                name="specialAid"
                                legend={'Radio Button'}
                                bind:value={specialAid}
                                ><TextField
                                    labelType="no-label"
                                    hasError={errorData?.specialFiAidText}
                                    name="specialFiAidText"
                                    type="text"
                                    bind:value={specialFiAidText}
                                />
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}</Radio
                            >
                            {#if errorData?.specialAid}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialAid[0]}</span
                                >
                            {/if}
                            <Radio
                                name="specialAid"
                                legend={'Radio Button'}
                                bind:value={specialAid}
                                ><TextField
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
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}</Radio
                            >
                            {#if errorData?.specialAid}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialAid[0]}</span
                                >
                            {/if}
                            <Radio
                                name="specialAid"
                                legend={'Radio Button'}
                                bind:value={specialAid}
                                ><TextField
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
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}</Radio
                            >
                            {#if errorData?.specialAid}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.specialAid[0]}</span
                                >
                            {/if}
                        </div>

                        {#if errorData?.specialIncrement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.specialIncrement[0]}</span
                            >
                        {/if}
                        {#if errorData?.specialIncrement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.specialIncrement[0]}</span
                            >
                        {/if}</Checkbox
                    >

                    {#if errorData?.specialIncrement}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.specialIncrement[0]}</span
                        >
                    {/if}
                </div>
            </div>
        </form>
        <div class="flex w-full justify-center">
            <TextIconButton
                primary
                label="Simpan"
                form="tetapanKGTFormValidation"
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
