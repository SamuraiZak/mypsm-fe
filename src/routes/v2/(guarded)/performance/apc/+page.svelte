<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;

    let param: CommonListRequestDTO = data.props.param;

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
        printData: data.props.printResponse.data?.dataList ?? [],
        hiddenData: ['employeeId', 'awardId', 'employeeNumber'],
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

            let printParam: CommonListRequestDTO = {
                pageNum: 1,
                pageSize: table.meta.totalData,
                orderBy: table.param.orderBy,
                orderType: table.param.orderType,
                filter: table.param.filter,
            };

            _updateTable(printParam).then((result) => {
                table.printData = result.props.response.data?.dataList;
            });
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sejarah Anugerah Pekerja Cemerlang (APC)"
        ><TextIconButton
            label="Tambah Rekod"
            onClick={() => {
                goto('./sejarah-apc/tambah-rekod-apc');
            }}
        >
            <SvgPlus />
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
        >
            <FilterCard></FilterCard>
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    title="Senarai Sejarah APC"
                    bind:tableData={table}
                    onUpdate={_search}
                ></CustomTable>
            </div>
        </div> -->

        <div class="h h-fit min-h-[300px] w-full">
            <ImpactTable
                title="Senarai Sejarah APC"
                bind:tableData={table}
                onUpdate={() => {
                    _search();
                }}
            >
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
                        bind:inputValue={table.param.filter.identityCard}
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
            </ImpactTable>
        </div>
    </div>
</section>
