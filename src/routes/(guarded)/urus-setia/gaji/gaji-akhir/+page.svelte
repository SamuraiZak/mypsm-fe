<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { FinalPayslipListDTO } from '$lib/dto/mypsm/salary/final-payslip/final-payslip-list.dto';
    import { months } from '$lib/mocks/dateSelection/months';
    import { status } from '$lib/mocks/status/status';
    import { _updateTable } from './+page';
    export let data;

    let selectedMonth = months[5].value;
    let selectedStatus = 'Baru';
    let filterByName = '';
    let filterByNumber = '';
    let filterByIc = '';

    let selectedDataRow: FinalPayslipListDTO;

    let param: CommonListRequestDTO = data.records.param;

    let table: TableDTO = {
        param: param,
        meta: data.records.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.records.response.data?.dataList ?? [],
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
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Gaji Akhir"
        description="Senarai nama kakitangan yang terlibat dengan persaraan secara paksa, terbitan, pilihan dan lain-lain."
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->
        <FilterCard onClick={_search}>
            <FilterTextInput label="Nama Pekerja" bind:value={filterByName}
            ></FilterTextInput>
            <FilterTextInput label="No. Pekerja" bind:value={filterByNumber}
            ></FilterTextInput>
            <FilterTextInput label="No. Kad Pengenalan" bind:value={filterByIc}
            ></FilterTextInput>
            <!-- Select dropdowns -->
            <!-- <DropdownSelect
                id="retire-type-dropdown"
                labelBlack={false}
                label="Jenis Persaraan"
                dropdownType="label-top"
                bind:index={selectedMonth}
                options={data.monthStringLookup}
            ></DropdownSelect> -->
            <DropdownSelect
                id="bulan-dropdown"
                labelBlack={false}
                label="Bulan"
                dropdownType="label-top"
                bind:index={selectedMonth}
                options={months}
            ></DropdownSelect>
            <!-- <DropdownSelect
                id="status-dropdown"
                labelBlack={false}
                label="Status"
                dropdownType="label-top"
                bind:index={selectedStatus}
                options={status}
            ></DropdownSelect> -->
        </FilterCard>
    </div>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <SectionHeader title="Senarai Kakitangan"></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                bind:tableData={table}
                bind:passData={selectedDataRow}
                enableDetail
                onUpdate={_search}
                detailActions={() => {
                    const url = './gaji-akhir/butiran-' + selectedDataRow.id;
                    goto(url);
                }}
            ></CustomTable>
        </div>
    </div>
</section>
