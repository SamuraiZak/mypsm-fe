<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    // POC
    let auditLogTable: TableSettingDTO = {
        param: data.props.auditLogRequest,
        meta: data.props.auditLogResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.auditLogResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'employeeName',
                malay: 'Nama Pengguna',
            },
            {
                english: 'module',
                malay: 'Nama Pengguna',
            },
            {
                english: 'action',
                malay: 'Aktiviti',
            },
            {
                english: 'date',
                malay: 'Tarikh',
            },
            {
                english: 'time',
                malay: 'Masa',
            },
        ],
        url: 'employee/list',
        id: 'auditLogTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Log Audit Sistem"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Log Audit"
                bind:tableData={auditLogTable}
                bind:passData={selectedData}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Pengguna"
                        bind:inputValue={auditLogTable.param.filter
                            .employeeName}
                    ></FilterTextField>
                    <FilterTextField
                        label="Tarikh"
                        bind:inputValue={auditLogTable.param.filter.date}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Modul"
                        bind:inputValue={auditLogTable.param.filter.moduleId}
                        options={data.props.moduleDropdown}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
