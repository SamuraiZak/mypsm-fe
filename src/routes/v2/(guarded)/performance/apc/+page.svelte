<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;

    // set up table
    let selectedData: any;

    // POC
    let apcHistoryTable: TableSettingDTO = {
        param: data.props.param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'awardId'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'performance/apc/histories',
        id: 'apcHistoryTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            excel: true,
            add: true,
        },
    };

    function addAction() {
        goto('/v2/performance/apc/add');
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sejarah Anugerah Perkhidmatan Cemerlang (APC)"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai APC"
                bind:tableData={apcHistoryTable}
                bind:passData={selectedData}
                addActions={() => {
                    addAction();
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Pengguna"
                        bind:inputValue={apcHistoryTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={apcHistoryTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
