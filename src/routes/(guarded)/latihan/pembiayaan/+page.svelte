<script lang="ts">
    import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _updateTable } from './+layout';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { LayoutData } from './$types';

    export let data: LayoutData;
    let rowData: CourseFundApplicationDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    let fundApplicationTable: TableDTO = {
        param: param,
        meta: data.responses.fundApplicationResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.list.fundApplicationList ?? [],
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
    <ContentHeader title="Rekod Tuntutan Pembiayaan Yuran Pengajajian"
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
                    onClick={() =>
                        goto(
                            './rekod-tuntutan-yuran/tambah-permohonan-tuntutan-yuran',
                        )}
                ></TextIconButton>
            </ContentHeader>
        {/if}
        <!-- Table filter placeholder -->
        <FilterCard onSearch={_updateExamTable}>
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={fundApplicationTable.param.filter
                    .employeeIdentityNumber}
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
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Permohonan Peperiksaan"
                onUpdate={_updateExamTable}
                enableDetail
                bind:tableData={fundApplicationTable}
                bind:passData={rowData}
                detailActions={() => {
                    const route = `./rekod-peperiksaan/${rowData.id}`;

                    goto(route);
                }}
            ></CustomTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
