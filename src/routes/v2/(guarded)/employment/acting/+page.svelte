<script lang="ts">
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type {
        ActingCommonList,
        EmployeeActingOffer,
    } from '$lib/dto/mypsm/employment/acting/acting-common-list.dto';
    export let data: PageData;

    let rowData = {} as ActingCommonList;
    let employeeRowData = {} as EmployeeActingOffer;

    let gradeOptions: IntDropdownOption[] = [
        {
            value: 'Gred 1-54',
            name: 'Gred 1-54',
            href: './acting/baru/1-54',
        },
        {
            value: 'Gred Flexi 41',
            name: 'Gred Flexi 41',
            href: './acting/baru/Flexi 41',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: './acting/baru/Utama',
        },
    ];

    // gred 154 table
    let tableList154s: TableSettingDTO = {
        param: data.param,
        meta: data.tableList154Response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.tableList154 ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['batchId'],
        dictionary: [],
        url: 'employment/acting/154s/list',
        id: 'tableList154s',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    // gred flexi 41 table
    let tableListFlexi41s: TableSettingDTO = {
        param: data.param,
        meta: data.tableListFlexiResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.tableListFlexi41 ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['batchId'],
        dictionary: [],
        url: 'employment/acting/flexi41s/list',
        id: 'tableListFlexi41s',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    // main table
    let tableListMain: TableSettingDTO = {
        param: data.param,
        meta: data.tableListMainResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.tableListMain ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['batchId'],
        dictionary: [],
        url: 'employment/acting/mains/list',
        id: 'tableListMain',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    let employeeOfferTable: TableSettingDTO = {
        param: data.employeeParam,
        meta: data.employeeOfferResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.employeeOffer ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId', 'createdAt', 'assignedRole', 'batchId'],
        dictionary: [],
        url: 'employment/acting/employee/list',
        id: 'tableListMain',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
        <ContentHeader title="Pemangkuan">
            <TextIconButton
                options={gradeOptions}
                icon="add"
                type="primary"
                label="Pemangkuan Baru"
            />
        </ContentHeader>
    {:else}
        <ContentHeader title="Rekod Pemangkuan" />
    {/if}
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
        <CustomTab>
            <!-- Gred 1-54 -->
            <CustomTabContent title="Gred 1-54">
                <div class="h h-fit w-full p-3">
                    <DataTable
                        title="Rekod Pemangkuan Gred 1-54"
                        bind:tableData={tableList154s}
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                '/v2/employment/acting/butiran/1-' +
                                    rowData.batchId +
                                    '-' +
                                    '1-54',
                            );
                        }}
                    ></DataTable>
                </div>
            </CustomTabContent>

            <!-- Gred Flexi 41 -->
            <CustomTabContent title="Gred Flexi 41">
                <div class="h h-fit w-full p-3">
                    <DataTable
                        title="Rekod Pemangkuan Flexi 41"
                        bind:tableData={tableListFlexi41s}
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                '/v2/employment/acting/butiran/1-' +
                                    rowData.batchId +
                                    '-' +
                                    'Flexi 41',
                            );
                        }}
                    ></DataTable>
                </div>
            </CustomTabContent>

            {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                <!-- Gred Utama -->
                <CustomTabContent title="Gred Utama">
                    <div class="h h-fit w-full p-3">
                        <DataTable
                            title="Rekod Pemangkuan Gred Utama"
                            bind:tableData={tableListMain}
                            bind:passData={rowData}
                            detailActions={() => {
                                goto(
                                    '/v2/employment/acting/butiran/1-' +
                                        rowData.batchId +
                                        '-' +
                                        'Utama',
                                );
                            }}
                        ></DataTable>
                    </div>
                </CustomTabContent>
            {/if}
        </CustomTab>
    {:else if data.currentRoleCode === UserRoleConstant.kakitangan.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
            <div class="h-fit w-full">
                <DataTable
                    title="Senarai Tawaran Pemangkuan"
                    bind:tableData={employeeOfferTable}
                    bind:passData={employeeRowData}
                    detailActions={() => {
                        if (employeeRowData.assignedRole == 'Pemohon') {
                            goto(
                                '/v2/employment/acting/butiran/kakitangan-' +
                                    employeeRowData.actingId +
                                    '-' +
                                    employeeRowData.actingType,
                            );
                        }
                        else {
                            goto(
                                    '/v2/employment/acting/butiran/1-' +
                                        employeeRowData.batchId +
                                        '-' +
                                        employeeRowData.actingType,
                                );
                        }
                    }}
                ></DataTable>
            </div>
        </div>
    {/if}
</section>
