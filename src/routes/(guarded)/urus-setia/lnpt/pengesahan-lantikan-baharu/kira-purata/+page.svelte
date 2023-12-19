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

    export let data;
    let selectedRow: IntLnptAverage;
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
                        'Pengiraan purata berdasarkan formula berikut : <br> 2 Tahun - Tahun Pertama 36.4%, Tahun Kedua 63.6%';
            }
        }
    }

    // Tooltip icon
    const questionMarkIcon: string = `<svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 0.5C9.30469 0.5 12 3.19531 12 6.5C12 9.82812 9.30469 12.5 6 12.5C2.67188 12.5 0 9.82812 0 6.5C0 3.19531 2.67188 0.5 6 0.5ZM6 9.875C6.39844 9.875 6.75 9.54688 6.75 9.125C6.75 8.70312 6.39844 8.375 6 8.375C5.55469 8.375 5.25 8.70312 5.25 9.125C5.25 9.54688 5.57812 9.875 6 9.875ZM7.61719 6.54688C8.13281 6.24219 8.4375 5.70312 8.4375 5.14062C8.4375 4.22656 7.71094 3.5 6.75 3.5H5.55469C4.66406 3.5 3.9375 4.22656 3.9375 5.14062C3.9375 5.44531 4.19531 5.70312 4.5 5.70312C4.80469 5.70312 5.0625 5.44531 5.0625 5.14062C5.0625 4.85938 5.27344 4.625 5.57812 4.625H6.77344C7.05469 4.625 7.3125 4.85938 7.3125 5.14062C7.3125 5.32812 7.21875 5.49219 7.05469 5.58594L5.71875 6.38281C5.53125 6.5 5.4375 6.6875 5.4375 6.875V7.25C5.4375 7.55469 5.69531 7.8125 6 7.8125C6.30469 7.8125 6.5625 7.55469 6.5625 7.25V7.20312L7.61719 6.54688Z"
                                fill="#667085"
                            />
                        </svg>`;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengiraan Purata Mengikut Tahun Laporan Nilaian Prestasi Tahunan (LNPT)"
        description="Hal-hal berkaitan pengurusan prestasi kakitangan LKIM"
        ><TextIconButton
            label="Kembali"
            onClick={() => {
                goto('../pengesahan-lantikan-baharu');
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
                Tetapan Tahun LNPT Untuk Dipuratakan Untuk Pengesahan Dalam
                Lantikan:
            </p>

            <label
                class="flex flex-row items-center gap-2.5 text-sm"
                for="lnpt-two-years"
            >
                <span>Dua Tahun yang Dipuratakan *</span>
                <div id="lnptTooltip" class="h-fit w-fit">
                    {@html questionMarkIcon}
                </div>
            </label>
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
            excludeCol={['yearThree']}
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
