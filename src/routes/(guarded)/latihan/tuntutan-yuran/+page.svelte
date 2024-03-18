<script lang="ts">
    import type { CourseFundReimbursementDetailResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _checkIfDocumentExist, _updateTable } from './+layout';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { LayoutData } from './$types';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';

    export let data: LayoutData;
    let rowData: CourseFundReimbursementDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    let fundReimbursementTable: TableDTO = {
        param: param,
        meta: data.responses.fundReimbursementResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.list.fundReimbursementList ?? [],
        hiddenData: ['id'],
    };

    async function _updateExamTable() {
        _updateTable(fundReimbursementTable.param).then((value) => {
            fundReimbursementTable.data = value.response.data?.dataList ?? [];
            fundReimbursementTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            fundReimbursementTable.param.pageSize =
                fundReimbursementTable.meta.pageSize;
            fundReimbursementTable.param.pageNum =
                fundReimbursementTable.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Tuntutan Pembiayaan Yuran Pengajian"
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
        {#if data.roles.isStaffRole}
            <ContentHeader
                title="Tekan butang disebelah untuk menambah tuntutan yuran"
                borderClass="border-none"
            >
                <TextIconButton
                    label="Tambah Tuntutan Yuran"
                    type="primary"
                    onClick={() => goto('./tuntutan-yuran/mohon-tuntutan')}
                ></TextIconButton>
            </ContentHeader>
        {/if}
        <!-- Table filter placeholder -->
        <FilterCard onSearch={_updateExamTable}>
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={fundReimbursementTable.param.filter
                    .identityDocumentNumber}
            ></FilterTextField>
            <FilterTextField
                label="Nombor Pekerja"
                bind:inputValue={fundReimbursementTable.param.filter
                    .employeeNumber}
            ></FilterTextField>
            <FilterTextField
                label="Nama Pekerja"
                bind:inputValue={fundReimbursementTable.param.filter
                    .employeeName}
            ></FilterTextField>
            <FilterNumberField
                label="Jumlah Tuntutan"
                bind:inputValue={fundReimbursementTable.param.filter.totalClaim}
            ></FilterNumberField>
            <FilterSelectField
                label="Status"
                options={data.lookups.statusLookup}
                bind:inputValue={fundReimbursementTable.param.filter.status}
            ></FilterSelectField>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Permohonan Peperiksaan"
                onUpdate={_updateExamTable}
                enableDetail
                bind:tableData={fundReimbursementTable}
                bind:passData={rowData}
                detailActions={() => {
                    _checkIfDocumentExist(data.roles.isStaffRole, rowData.id);
                }}
            ></CustomTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
