<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import CustomBanner from '$lib/components/banner/CustomBanner.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import DataGeneratorCard from '$lib/components/card/data-generator-card.svelte/DataGeneratorCard.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { PageData } from './$types';
    import { _getAverage, _updateTable } from './+page';

    export let data: PageData;

    let activeStepper: number = 0;

    let tableLNPT: TableDTO = data.props.tableLNPT;

    // set up table
    let selectedData: any;

    // POC
    let employeeListTable: TableSettingDTO = {
        param: data.props.employeeListRequest,
        meta: data.props.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.employeeListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'employee/list',
        id: 'employeeListTable',
        option: {
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    async function _generateAverage() {
        let employeeIds: number[] = [];

        employeeListTable.selectedData?.forEach((element) => {
            let tempEmployee: CommonEmployeeDTO = element as CommonEmployeeDTO;
            employeeIds.push(tempEmployee.employeeId);
        });

        tableLNPT.param.filter.employeeIds = employeeIds;

        _getAverage(tableLNPT.param).then((value) => {
            tableLNPT.data =
                value.props.lnptAverageResponse.data?.dataList ?? [];
            tableLNPT.meta = value.props.lnptAverageResponse.data?.meta ?? {
                pageSize: 5,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            tableLNPT.param.pageSize = tableLNPT.meta.pageSize ?? 5;
            tableLNPT.param.pageNum = tableLNPT.meta.pageNum ?? 1;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Laporan Nilaian Prestasi Tahunan (LNPT)"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper activeIndex={activeStepper}>
        <StepperContent>
            <StepperContentHeader title="Langkah 1: Pilih Kakitangan">
                {#if employeeListTable.selectedData.length > 0}
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        onClick={() => {
                            activeStepper = 1;
                        }}
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Kakitangan"
                        bind:tableData={employeeListTable}
                        bind:passData={selectedData}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="Nama Pengguna"
                                bind:inputValue={employeeListTable.param.filter
                                    .name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={employeeListTable.param.filter
                                    .identityDocumentNumber}
                            ></FilterTextField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Langkah 2: Jana Purata">
                <!-- <TextIconButton label="Hantar" icon="next"></TextIconButton> -->
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit min-h-5 w-full flex-row gap-2 rounded bg-blue-100 p-2"
                >
                    <div
                        class="flex h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 flex-col items-center justify-start"
                    >
                        <span
                            class="flex h-5 w-full flex-col items-center justify-center text-center align-middle text-ios-systemColors-systemBlue-light"
                        >
                            <SvgInfoSolid></SvgInfoSolid>
                        </span>
                    </div>
                    <div
                        class="flex h-fit min-h-5 w-full flex-col items-start justify-start gap-2"
                    >
                        <span
                            class="flex h-5 w-full flex-col items-start justify-center text-center align-middle text-sm font-semibold text-ios-systemColors-systemBlue-light"
                        >
                            Pengiraan purata adalah berdasarkan formula berikut:
                        </span>
                        <span
                            class="text-sm font-medium text-ios-systemColors-systemBlue-light"
                        >
                            1. Purata dengan tempoh 2 tahun : Tahun pertama
                            <span class=" font-bold"> 36.4%, </span>, Tahun
                            Kedua <span class=" font-bold"> 63.6% </span>
                        </span>
                        <span
                            class="text-sm font-medium text-ios-systemColors-systemBlue-light"
                        >
                            2. Purata dengan tempoh 3 tahun : Tahun pertama
                            <span class=" font-bold"> 20.0% </span>, Tahun Kedua
                            <span class=" font-bold"> 35.0% </span>, Tahun
                            Ketiga <span class=" font-bold"> 45.0% </span>
                        </span>
                    </div>
                </div>
                <DataGeneratorCard cardTitle="Tetapan Pengiraan Purata LNPT">
                    <TextIconButton
                        onClick={_generateAverage}
                        slot="button"
                        label="Kira Purata"
                    ></TextIconButton>

                    <FilterNumberField
                        label="Tahun"
                        inputId="lnptYear"
                        bind:inputValue={tableLNPT.param.filter.years}
                    ></FilterNumberField>
                    <FilterNumberField
                        label="Tempoh"
                        inputId="lnptPeriod"
                        bind:inputValue={tableLNPT.param.filter.duration}
                    ></FilterNumberField>
                </DataGeneratorCard>
                <div class="h-fit max-h-full w-full pb-5">
                    <CustomTable
                        tableId="lnptAverage"
                        title="Purata LNPT Dari Tahun {tableLNPT.param.filter
                            .years} Sepanjang Tempoh {tableLNPT.param.filter
                            .duration} Tahun"
                        bind:tableData={tableLNPT}
                        onUpdate={_generateAverage}
                    ></CustomTable>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
