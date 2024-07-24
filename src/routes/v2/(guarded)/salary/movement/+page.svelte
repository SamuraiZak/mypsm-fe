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
    import type { SalaryMovementList } from '$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto';

    export let data: PageData;

    let rowData: SalaryMovementList;

    let salaryRecordTable: TableSettingDTO = {
        param: data.props.salaryMovementParam,
        meta: data.props.salaryMovementListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.props.salaryMovementList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId'],
        dictionary: [
            { english: 'movementType', malay: 'Jenis Kenaikan' },
            { english: 'totalEmployee', malay: 'Jumlah Kakitangan' },
            { english: 'salaryMovementYear', malay: 'Tahun Pergerakan Gaji' },
            { english: 'kumpulanPGT', malay: 'Kumpulan' },
        ],
        url: 'salary/movement/list',
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
    <div class="flex w-full flex-col justify-start gap-10 px-5 py-2">
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
                bind:passData={rowData}
                detailActions={() => {
                    if (rowData.status == 'Draf') {
                        goto(
                            '/v2/salary/movement/new/' +
                                rowData.applicationId +
                                ' ' +
                                rowData.movementType,
                        );
                    } else {
                        goto(
                            '/v2/salary/movement/butiran/' +
                                rowData.applicationId +
                                ' ' +
                                rowData.movementType,
                        );
                    }
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterSelectField
                        options={mesyuaratNameLookup}
                        label="Nama Mesyuarat"
                        inputValue=""
                    />
                    <FilterSelectField
                        options={mesyuaratNameLookup}
                        label="Jenis Pergerakan Gaji"
                        inputValue=""
                    />
                    <FilterSelectField
                        label="Bulan"
                        options={data.props.lookup.salaryMovementMonth}
                        bind:inputValue={salaryRecordTable.param.filter.month}
                    />
                    <FilterSelectField
                        label="Status"
                        options={kgtMonthLookup}
                        inputValue=""
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
