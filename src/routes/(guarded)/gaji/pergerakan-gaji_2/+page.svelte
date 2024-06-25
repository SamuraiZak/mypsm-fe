<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import {
        kgtMonthLookup,
        mesyuaratNameLookup,
    } from '$lib/constants/core/dropdown.constant';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let salaryRecordTable: TableSettingDTO = {
        param: data.props.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.props.mockData,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [{english: 'kumpulanPGT', malay: 'Kumpulan PGT'}],
        url: '',
        id: 'salaryRecordTable',
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

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Pergerakan Gaji Tahunan" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
<div class="w-full flex flex-col justify-start px-5">
    <ContentHeader title="" borderClass="border-none">
        <TextIconButton
            label="Tambah"
            icon="add"
            options={data.props.salaryType}
        />
    </ContentHeader>
    <div class="h-fit w-full">
        <DataTable
            title="Senarai Mesyuarat"
            bind:tableData={salaryRecordTable}
            detailActions={() => goto('/gaji/pergerakan-gaji/butiran/kenaikan-khas/1')}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    label="Kumpulan PGT"
                    inputValue=''
                />
                <FilterSelectField
                    options={mesyuaratNameLookup}
                    label="Nama Mesyuarat"
                    inputValue=''
                />
                <FilterSelectField
                    label="Bulan"
                    options={kgtMonthLookup}
                    inputValue=''
                />
                <FilterSelectField
                    label="Status"
                    options={kgtMonthLookup}
                    inputValue=''
                />
            </FilterWrapper>
        </DataTable>
    </div>
</div>
</section>
