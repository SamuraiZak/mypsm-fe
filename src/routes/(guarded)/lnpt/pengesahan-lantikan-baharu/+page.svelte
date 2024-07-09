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
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _getAverage, _updateTable } from './+page';

    export let data: PageData;

    let tableLNPT: TableDTO = data.props.tableLNPT;

    // set the table parameter
    let param: CommonListRequestDTO = data.props.param;

    // set up table
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
        hiddenData: ['employeeId'],
    };

    // create funciton to handle table search
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

    async function _generateAverage() {
        let employeeIds: number[] = [];

        table.selectedData?.forEach((element) => {
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
    <ContentHeader title="Purata LNPT (Pengesahan Lantikan Baharu)"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Pilih Kakitangan">
                <!-- <TextIconButton label="Seterusnya" icon="next"></TextIconButton> -->
            </StepperContentHeader>
            <StepperContentBody>
                <FilterCard onSearch={_search}>
                    <FilterTextField
                        bind:inputValue={table.param.filter.employeeNumber}
                        label="No. Pekerja"
                    ></FilterTextField>
                    <FilterTextField
                        bind:inputValue={table.param.filter.name}
                        label="Nama Kakitangan"
                    ></FilterTextField>
                    <FilterTextField
                        bind:inputValue={table.param.filter.identityDocumentNumber}
                        label="No. Kad Pengenalan"
                    ></FilterTextField>
                    <FilterTextField
                        disabled
                        bind:inputValue={table.param.filter.program}
                        label="Program"
                    ></FilterTextField>
                    <FilterTextField
                        bind:inputValue={table.param.filter.scheme}
                        label="Skim"
                    ></FilterTextField>
                    <FilterTextField
                        bind:inputValue={table.param.filter.grade}
                        label="Gred"
                    ></FilterTextField>
                    <FilterTextField
                        bind:inputValue={table.param.filter.position}
                        label="Jawatan"
                    ></FilterTextField>
                </FilterCard>
                <div class="h-fit max-h-full w-full pb-5">
                    <CustomTable
                        title="Senarai Kakitangan Dalam Program Percubaan"
                        bind:tableData={table}
                        onUpdate={_search}
                        enableAdd
                    ></CustomTable>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Jana Purata">
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
                        disabled
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
