<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import ImpactCard from '$lib/components/button/ImpactCard.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { DictionaryDTO } from '$lib/dto/core/dictionary/dictionary.dto';
    import type { LookupCategoryDTO } from '$lib/dto/core/lookup/lookup-item.dto';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let param: CommonListRequestDTO = data.props.listParam;

    let selectedData: any;

    let table: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        hiddenData: [],
    };

    let tableDictionary: DictionaryDTO[] = [
        {
            english: 'name',
            malay: 'Kategori',
        },
    ];

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

    function handleEdit(param: LookupCategoryDTO) {
        const url: string =
            '/v2/system-setting/dropdown/' +
            param.name.replaceAll(' ', '_');

        goto(url);
    }

    // POC
    let newTable: TableSettingDTO = {
        param: data.props.listParam,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['url'],
        dictionary: [
            {
                english: 'name',
                malay: 'Kategori',
            },
        ],
        url: 'lookup/editable',
        id: 'lookupCategoryTable',
        option: {
            checkbox: false,
            detail: false,
            edit: true,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
    // POC END
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Menu Lungsur Turun"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kategori Menu Lungsur Turun"
                tableData={newTable}
                bind:passData={selectedData}
                editActions={() => {
                    handleEdit(selectedData);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Kategori"
                        bind:inputValue={newTable.param.filter.name}
                    ></FilterTextField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
