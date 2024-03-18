<script lang="ts">
    import { _checkIfDocumentExist } from './+layout';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _updateTable } from './+layout';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { LayoutData } from './$types';
    import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';

    export let data: LayoutData;
    let rowData: CourseFundApplicationDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    let fundApplicationTable: TableDTO = {
        param: param,
        meta: data.response.fundReimbursementResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.list.fundReimbursementList ?? [],
        hiddenData: ['id'],
    };

    async function _updateExamTable() {
        _updateTable(fundApplicationTable.param).then((value) => {
            fundApplicationTable.data = value.response.data?.dataList ?? [];
            fundApplicationTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            fundApplicationTable.param.pageSize =
                fundApplicationTable.meta.pageSize;
            fundApplicationTable.param.pageNum =
                fundApplicationTable.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Pembiayaan Pelajaran"></ContentHeader>
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
                title="Tekan butang disebelah untuk memohon pembiayaan pelajaran"
                borderClass="border-none"
            >
                <TextIconButton
                    label="Mohon Pembiayaan"
                    type="primary"
                    onClick={() => goto('./pembiayaan/mohon-pembiayaan')}
                ></TextIconButton>
            </ContentHeader>
        {/if}
        <!-- Table filter placeholder -->
        <FilterCard onSearch={_updateExamTable}>
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={fundApplicationTable.param.filter
                    .identityDocumentNumber}
            ></FilterTextField>
            <FilterTextField
                label="Nombor Pekerja"
                bind:inputValue={fundApplicationTable.param.filter
                    .employeeNumber}
            ></FilterTextField>
            <FilterTextField
                label="Nama Pekerja"
                bind:inputValue={fundApplicationTable.param.filter.employeeName}
            ></FilterTextField>
            <FilterDateField
                label="Tarikh Kemasukan Pelajaran"
                bind:inputValue={fundApplicationTable.param.filter
                    .courseApplicationDate}
            ></FilterDateField>
            <FilterSelectField
                label="Status"
                options={data.lookups.statusLookup}
                bind:inputValue={fundApplicationTable.param.filter.status}
            ></FilterSelectField>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Permohonan Peperiksaan"
                onUpdate={_updateExamTable}
                enableDetail
                bind:tableData={fundApplicationTable}
                bind:passData={rowData}
                detailActions={() => {
                    _checkIfDocumentExist(data.roles.isStaffRole, rowData.id);
                }}
            ></CustomTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
