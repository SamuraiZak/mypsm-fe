<script lang="ts">
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { _updateTable } from './+page';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    export let data: PageData;
    // Role Code
    let employeeRoleCode: string = UserRoleConstant.kakitangan.code;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;
    let managementServiceDirectorRoleCode: string =
        UserRoleConstant.pengarahKhidmatPengurusan.code;
    let rowData: any;
    
    //Employees' POV: Table for application list
    let employeeApplicationParam: CommonListRequestDTO = data.employeeApplicationParam;
    let employeeApplicationTable: TableDTO = {
        param: employeeApplicationParam,
        meta: data.employeeInterimApplicationResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.employeeInterimApplicationList ?? [],
    }

    let param: CommonListRequestDTO = data.param;
    let table: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
    };
    let tamatTanggungKerjaTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList2 ?? [],
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.response?.dataList ?? [];
            table.meta = value.response?.meta ?? {
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
    {#if data.currentRoleCode === employeeRoleCode}
        <ContentHeader title="Tanggung Kerja">
            <TextIconButton
                onClick={() => goto('/perjawatan/tanggung-kerja/baru')}
                icon="add"
                type="primary"
                label="Permohonan Baru"
            />
        </ContentHeader>
    {:else}
        <ContentHeader title="Rekod Tanggung Kerja" />
    {/if}
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    {#if data.currentRoleCode === employeeRoleCode || data.currentRoleCode === secretaryRoleCode}
        <CustomTab>
            <CustomTabContent title="Permohonan Tanggung Kerja">
                <CustomTable
                    title="Senarai Permohonan Tanggung Kerja"
                    bind:tableData={employeeApplicationTable}
                    bind:passData={rowData}
                    enableDetail
                    detailActions={() =>
                        goto('/perjawatan/tanggung-kerja/butiran-'+rowData.id)}
                />  
            </CustomTabContent>

            <CustomTabContent title="Penamatan Tanggung Kerja">
                <CustomTable
                    title="Sejarah Tanggung Kerja"
                    bind:tableData={tamatTanggungKerjaTable}
                    onUpdate={_search}
                />
            </CustomTabContent>
        </CustomTab>
    {:else if data.currentRoleCode === depDirectorRoleCode || data.currentRoleCode === stateDirectorRoleCode || data.currentRoleCode === managementServiceDirectorRoleCode}
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 p-3"
        >
            <FilterCard onSearch={_search}>
                <FilterTextField
                    bind:inputValue={table.param.filter.grade}
                    label="No. Pekerja"
                ></FilterTextField>
                <FilterTextField
                    bind:inputValue={table.param.filter.position}
                    label="Nama"
                ></FilterTextField>
                <FilterTextField
                    bind:inputValue={table.param.filter.name}
                    label="No. Kad Pengenalan"
                ></FilterTextField>
            </FilterCard>
            <CustomTable
                title="Sejarah Tanggung Kerja"
                bind:tableData={table}
                enableDetail
                detailActions={() => goto('/perjawatan/tanggung-kerja/butiran')}
                onUpdate={_search}
            />
        </div>
    {/if}
</section>
