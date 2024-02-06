<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
    import type { TableDTO } from '$lib/dto/core/table/table.dto.js';
    import type { ListAllowanceDTO } from '$lib/dto/mypsm/salary/salary-allowance/list-allowance.dto.js';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockSalaryAndAllowance } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAndAllowance';
    import { status } from '$lib/mocks/status/status';
    import type { SalaryAndAllowanceListResponse } from '$lib/view-models/mypsm/salary/salary-and-allowance/salary-and-allowancs-list-response.view-model.js';
    import type { PageData } from './$types.js';
    import { _updateTable } from './+page.js';
    export let data: PageData;
    let selectedMonth = months[5].value;
    let selectedStatus = 'pending';
    let dataRow: ListAllowanceDTO;

    // let salaryAllowanceList: SalaryAndAllowanceListResponse =
    //     data.props.salaryAllowanceResult;
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
    async function _redirect(param: number) {
        goto(
            '/pengarah-khidmat-pengurusan/gaji/gaji-elaun-kakitangan/butiran-' +
                param,
        );
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Gaji & Elaun - Elaun"
        description="Hal-hal berkaitan pengurusan gaji dan elaun bagi kakitangan LKIM"
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
        <FilterContainer onFilter={_search}>
            <FilterTextInput
                label="No. Pekerja"
                bind:value={table.param.filter.employeeNumber}
            ></FilterTextInput>
            <FilterTextInput label="Nama" bind:value={table.param.filter.name}
            ></FilterTextInput>
            <FilterTextInput
                label="No. K/P"
                bind:value={table.param.filter.identityCard}
            ></FilterTextInput>
            <FilterTextInput
                label="Jumlah Elaun"
                bind:value={table.param.filter.allowance}
            ></FilterTextInput>
            <!-- Select dropdowns -->
            <DropdownSelect
                id="bulan-dropdown"
                label="Bulan"
                dropdownType="label-top"
                bind:value={table.param.filter.month}
                options={months}
            ></DropdownSelect>
            <DropdownSelect
                id="status-dropdown"
                label="Status"
                dropdownType="label-top"
                bind:value={table.param.filter.status}
                options={status}
            ></DropdownSelect>
        </FilterContainer>
        <SectionHeader title="Senarai Kakitangan"></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                enableDetail
                bind:passData={dataRow}
                detailActions={() => {
                    _redirect(dataRow.employeeId);
                }}
                bind:tableData={table}
                onUpdate={_search}
            ></CustomTable>
        </div>
    </div>
</section>
