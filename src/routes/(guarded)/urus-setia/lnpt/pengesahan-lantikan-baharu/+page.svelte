<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgCalc from '$lib/assets/svg/SvgCalc.svelte';

    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonEmployeeDTO } from '$lib/dto/mypsm/common/employee/employee.dto.js';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { years } from '$lib/mocks/dateSelection/years';
    import { LNPTServices } from '$lib/services/implementations/mypsm/lnpt/lnpt.service';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { loadingState } from '$lib/stores/globalState';

    export let data: PageData;

    let employeeList: CommonEmployeeDTO[] = data.props.employeeList;

    let param: CommonListRequestDTO = data.props.param;

    let selectedDataRow: CommonEmployeeDTO = {};

    let selectedYearOne: number = 2024;
    let duration: number = 2;

    const yearCount = [
        {
            value: 2,
            name: '2',
        },
        {
            value: 3,
            name: '3',
        },
    ];

    const yearOption = [
        {
            value: 2015,
            name: '2015',
        },
        {
            value: 2016,
            name: '2016',
        },
        {
            value: 2017,
            name: '2017',
        },
        {
            value: 2018,
            name: '2018',
        },
        {
            value: 2019,
            name: '2019',
        },
        {
            value: 2020,
            name: '2020',
        },
        {
            value: 2021,
            name: '2021',
        },
        {
            value: 2022,
            name: '2022',
        },
        {
            value: 2023,
            name: '2023',
        },
        {
            value: 2024,
            name: '2024',
        },
    ];

    let lnptAverageRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: '',
        filter: {
            employeeIds: [],
            years: selectedYearOne,
            duration: 2,
        },
    };

    let table: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
    };

    let tableLNPT: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: [],
        selectedData: [],
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.props.response.data?.dataList ?? [];
            table.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }

    async function _calculateAverage() {
        loadingState.set(true);
        let employeeIdList: any = [];
        table.selectedData?.forEach((element) => {
            let tempEmployee: CommonEmployeeDTO = element as CommonEmployeeDTO;
            let tempId = tempEmployee.employeeId;

            employeeIdList.push(tempId);
        });

        lnptAverageRequest.filter.employeeIds = employeeIdList;
        lnptAverageRequest.filter.years = selectedYearOne;
        lnptAverageRequest.filter.duration = duration;

        console.log(lnptAverageRequest);

        const response: CommonResponseDTO =
            await LNPTServices.generateAverageLNPTNewHire(lnptAverageRequest);

        if (response.status == 'success') {
            tableLNPT.data = response.data?.dataList ?? [];
            tableLNPT.meta = response.data?.meta ?? tableLNPT.meta;
        } else {
            tableLNPT.data = [];
            tableLNPT.meta = tableLNPT.meta;
        }

        // console.log(response);
        loadingState.set(false);
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Purata LNPT (Pengesahan Lantikan Baharu)"
        description="Hal-hal berkaitan pengurusan prestasi kakitangan LKIM."
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab activeIndex={0}>
        <CustomTabContent title="Pilih Kakitangan">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <SectionHeader title="Senarai Semua Kakitangan">
                    <span class="text-base">
                        {table.selectedData?.length} kakitangan dipilih
                    </span>
                </SectionHeader>
                <div class="h-full max-h-full w-full pb-5">
                    <CustomTable
                        bind:tableData={table}
                        bind:passData={selectedDataRow}
                        enableAdd
                        onUpdate={_search}
                    ></CustomTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kira Purata">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <!-- Table filter placeholder -->
                <div
                    class="flex h-fit w-full flex-row items-center justify-start gap-2.5 rounded-md border p-2"
                >
                    <!-- tahun pertama -->
                    <div
                        class="flex flex-row items-center justify-center gap-1 px-2.5"
                    >
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Tahun Pertama
                            </p>
                        </div>
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <select
                                name="idType"
                                bind:value={selectedYearOne}
                                class=" block h-7 w-full rounded-sm border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                            >
                                {#each yearOption as option}
                                    <option value={option.value}>
                                        {option.name}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <!-- tahun kedua -->
                    <div
                        class="flex flex-row items-center justify-center gap-1 px-2.5"
                    >
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Bilangan Tahun
                            </p>
                        </div>
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <select
                                disabled
                                name="idType"
                                bind:value={duration}
                                class=" block h-7 w-full rounded-sm border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                            >
                                {#each yearCount as option}
                                    <option value={option.value}>
                                        {option.name}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <TextIconButton
                            primary
                            label="Jana Purata"
                            onClick={() => {
                                _calculateAverage();
                            }}
                        >
                            <SvgCalc />
                        </TextIconButton>
                    </div>
                </div>

                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <SectionHeader title="Laporan Purata LNPT">
                        <span class="text-base">
                            {table.selectedData?.length} kakitangan dipilih
                        </span>
                    </SectionHeader>
                    <div class="h-full max-h-full w-full pb-5">
                        <CustomTable
                            tableId="lnptAverage"
                            bind:tableData={tableLNPT}
                            bind:passData={selectedDataRow}
                        ></CustomTable>
                    </div>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
