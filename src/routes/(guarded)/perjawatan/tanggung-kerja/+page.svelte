<script lang="ts">
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import type { EmployeeInterimApplicationListResponseDTO } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-list-response.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    export let data: PageData;

    let rowData = {} as EmployeeInterimApplicationListResponseDTO;

    //Table for application list
    let employeeApplicationTable: TableSettingDTO = {
        param:
            data.currentRoleCode == UserRoleConstant.kakitangan.code
                ? data.employeeApplicationParam
                : data.param,
        meta: data.employeeInterimApplicationResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeInterimApplicationList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'icNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url:
            data.currentRoleCode == UserRoleConstant.kakitangan.code
                ? 'employment/interim/application/list_employee'
                : 'employment/interim/application/list',
        id: 'employeeApplicationTable',
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
    //Termination table
    let terminationTable: TableSettingDTO = {
        param: data.param,
        meta: data.employeeInterimTerminationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeInterimTerminationList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'icNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'employment/interim/termination/list',
        id: 'terminationTable',
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
    {#if data.currentRoleCode === UserRoleConstant.kakitangan.code}
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
    {#if data.currentRoleCode === UserRoleConstant.kakitangan.code || data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code || data.currentRoleCode == UserRoleConstant.ketuaSeksyen.code || data.currentRoleCode == UserRoleConstant.timbalanKetuaSeksyen.code}
        <CustomTab>
            {#if data.currentRoleCode !== UserRoleConstant.ketuaSeksyen.code && data.currentRoleCode !== UserRoleConstant.timbalanKetuaSeksyen.code}
                <CustomTabContent title="Permohonan Tanggung Kerja">
                    <div class="h h-fit w-full">
                        <DataTable
                            title="Senarai Permohonan Tanggung Kerja"
                            bind:tableData={employeeApplicationTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                goto(
                                    '/perjawatan/tanggung-kerja/butiran-' +
                                        rowData.id,
                                );
                            }}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="Nama"
                                    bind:inputValue={employeeApplicationTable
                                        .param.filter.name}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={employeeApplicationTable
                                        .param.filter.employeeNumber}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Kad Pengenalan"
                                    bind:inputValue={employeeApplicationTable
                                        .param.filter.identityDocumentNumber}
                                ></FilterTextField>
                                <FilterDateField
                                    label="Tarikh Permohonan"
                                    bind:inputValue={employeeApplicationTable
                                        .param.filter.applicationDate}
                                ></FilterDateField>
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </CustomTabContent>
            {/if}
            {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
            <CustomTabContent title="Penamatan Tanggung Kerja">
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Kakitangan"
                        bind:tableData={terminationTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                '/perjawatan/tanggung-kerja/penamatan/' +
                                    rowData.id,
                            );
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="Nama"
                                bind:inputValue={employeeApplicationTable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={employeeApplicationTable.param
                                    .filter.employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={employeeApplicationTable.param
                                    .filter.identityDocumentNumber}
                            ></FilterTextField>
                            <FilterDateField
                                label="Tarikh Permohonan"
                                bind:inputValue={employeeApplicationTable.param
                                    .filter.applicationDate}
                            ></FilterDateField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </CustomTabContent>
            {/if}
        </CustomTab>
    {:else if data.currentRoleCode === UserRoleConstant.pengarahBahagian.code || data.currentRoleCode === UserRoleConstant.pengarahNegeri.code || data.currentRoleCode === UserRoleConstant.pengarahKhidmatPengurusan.code}
        <div class="flex w-full flex-col items-start justify-start gap-2.5 p-3">
            <div class="h h-fit w-full">
                <DataTable
                    title="Senarai Permohonan Tanggung Kerja"
                    bind:tableData={employeeApplicationTable}
                    bind:passData={rowData}
                    detailActions={() => {
                        goto(
                            '/perjawatan/tanggung-kerja/butiran-' + rowData.id,
                        );
                    }}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={employeeApplicationTable.param
                                .filter.name}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Pekerja"
                            bind:inputValue={employeeApplicationTable.param
                                .filter.employeeNumber}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={employeeApplicationTable.param
                                .filter.identityDocumentNumber}
                        ></FilterTextField>
                        <FilterDateField
                            label="Tarikh Permohonan"
                            bind:inputValue={employeeApplicationTable.param
                                .filter.applicationDate}
                        ></FilterDateField>
                    </FilterWrapper>
                </DataTable>
            </div>
        </div>
    {/if}
</section>
