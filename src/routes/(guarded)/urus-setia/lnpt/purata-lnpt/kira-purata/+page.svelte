<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgCalc from '$lib/assets/svg/SvgCalc.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { years } from '$lib/mocks/dateSelection/years';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';

    export const yearCount = [
        {
            value: '2',
            name: '2',
        },
        {
            value: '3',
            name: '3',
        },
    ];
    export let data;
    let selectedRow: IntLnptAverage;
    let selectedYearCount: string = yearCount[1].value;
    let selectedYearOne: string = '-';
    let selectedYearTwo: string = '-';
    let selectedYearThree: string = '-';

    let tooltipContent: string = '';
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id;

            switch (eventName) {
                default:
                    tooltipContent =
                        'Pengiraan purata berdasarkan formula berikut : <br> 3 Tahun - Tahun Pertama 20%, Tahun Kedua 35%, Tahun Ketiga 45% <br> 2 Tahun - Tahun Pertama 36.4%, Tahun Kedua 63.6%';
            }
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengiraan Purata Mengikut Tahun Laporan Nilaian Prestasi Tahunan (LNPT)"
        description="Hal-hal berkaitan pengurusan prestasi kakitangan LKIM"
        ><TextIconButton
            label="Kembali"
            onClick={() => {
                goto('../purata-lnpt');
            }}
        >
            <SvgArrowLeft />
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- area for setting for bulk salary movements -->
    <div class="my-2 border-b-8 border-l-2 border-r-2 border-t-8 p-2.5">
        <form action="">
            <p class="mb-5 text-lg text-system-primary">
                Tetapan Pilihan Tahun LNPT Untuk Dipuratakan:
            </p>

            <DropdownSelect
                toolTipID="lnptTooltip"
                hasTooltip={true}
                id="year-lnpt-dropdown"
                label="Jumlah Tahun Untuk Dipuratakan * (2 atau 3 Tahun)"
                dropdownType="label-left"
                bind:value={selectedYearCount}
                options={yearCount}
            ></DropdownSelect>
            <div class="flex flex-col gap-2.5 py-5">
                <hr />
                <div
                    class="flex flex-row justify-around gap-x-5 text-system-accent"
                >
                    <DropdownSelect
                        id="year-one-dropdown"
                        label="Tahun Pertama"
                        dropdownType="label-top"
                        bind:index={selectedYearOne}
                        options={years}
                    ></DropdownSelect>
                    <DropdownSelect
                        id="year-two-dropdown"
                        label="Tahun Kedua"
                        dropdownType="label-top"
                        bind:index={selectedYearTwo}
                        options={years}
                    ></DropdownSelect>
                    {#if selectedYearCount === '3'}
                        <DropdownSelect
                            id="year-three-dropdown"
                            label="Tahun Ketiga"
                            dropdownType="label-top"
                            bind:index={selectedYearThree}
                            options={years}
                        ></DropdownSelect>
                    {/if}
                </div>
            </div>
            <div class="mt-5 flex w-full justify-center">
                <TextIconButton primary label="Puratakan" onClick={() => {}}>
                    <SvgCalc />
                </TextIconButton>
            </div>
        </form>
    </div>

    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <SectionHeader title="Senarai Purata LNPT"></SectionHeader>
        <DynamicTable
            tableItems={data.records.LnptAverageCalcRecord}
            bind:passData={selectedRow}
        ></DynamicTable>
    </div>
</section>
<!-- Tooltip body -->
<Tooltip
    placement="right"
    type="dark"
    triggeredBy="[id^='lnptTooltip']"
    class="w-fit text-start"
    on:show={assignContent}>{@html tooltipContent}</Tooltip
>
