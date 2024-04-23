<script lang="ts">
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { ActingCommonList } from '$lib/dto/mypsm/employment/acting/acting-common-list.dto';
    export let data: PageData;

    let rowData = {} as ActingCommonList;

    let gradeOptions: IntDropdownOption[] = [
        {
            value: 'Gred 1-54',
            name: 'Gred 1-54',
            href: '/perjawatan/pemangkuan/baru/1-54',
        },
        {
            value: 'Gred Flexi 41',
            name: 'Gred Flexi 41',
            href: '/perjawatan/pemangkuan/baru/Flexi 41',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: '/perjawatan/pemangkuan/baru/Utama',
        },
    ];

    // gred 154 table
    let tableList154s: TableSettingDTO = {
        param: data.param,
        meta: data.tableList154Response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
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
            filter: true,
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
            totalData: 1,
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
            filter: true,
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
            totalData: 1,
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
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    let employeeOfferTable: TableSettingDTO = {
        param: data.param,
        meta: data.employeeOfferResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeOffer ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
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
    {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code || data.currentRoleCode === UserRoleConstant.pelulus.code || data.currentRoleCode === UserRoleConstant.penyokong.code}
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
                                '/perjawatan/pemangkuan/butiran/' +
                                    rowData.batchId +
                                    '-' +
                                    rowData.actingType,
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
                                '/perjawatan/pemangkuan/butiran/' +
                                    rowData.batchId +
                                    '-' +
                                    rowData.actingType,
                            );
                        }}
                    ></DataTable>
                </div>
            </CustomTabContent>

            <!-- Gred Utama -->
            <CustomTabContent title="Gred Utama">
                <div class="h h-fit w-full p-3">
                    <DataTable
                        title="Rekod Pemangkuan Gred Utama"
                        bind:tableData={tableListMain}
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                '/perjawatan/pemangkuan/butiran/' +
                                    rowData.batchId +
                                    '-' +
                                    rowData.actingType,
                            );
                        }}
                    ></DataTable>
                </div>
            </CustomTabContent>
        </CustomTab>
    {:else if data.currentRoleCode === UserRoleConstant.kakitangan.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
            <div class="h-fit w-full">
                <DataTable title="Senarai Tawaran Pemangkuan" bind:tableData={employeeOfferTable}
                ></DataTable>
            </div>
        </div>
        <!-- {:else if data.currentRoleCode === approverRoleCode}
        <CustomTab>
            <CustomTabContent title="Permohonan Penangguhan/Pindaan Penempatan">
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod permohonan penangguhan/pindaan penempatan yang menunggu keputusan anda"
                />
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        title=""
                        onUpdate={_search}
                        enableDetail
                        detailActions={() => {}}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <CustomTabContent title="Pengesahan Keputusan Pemangkuan">
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod pemangkuan yang menunggu keputusan anda"
                ></ContentHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    
                    <CustomTable
                        title=""
                        onUpdate={_search}
                        enableDetail
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>
        </CustomTab> -->
    {:else if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code || UserRoleConstant.pengarahBahagian.code || UserRoleConstant.pengarahNegeri.code}
        <CustomTab>
            <!-- Gred 1-54 -->
            <CustomTabContent title="Gred 1-54">
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod pemangkuan bagi Gred 1-54"
                />
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        title=""
                        enableDetail
                        detailActions={() => goto('/perjawatan/pemangkuan/butiran-1_54')}
                        bind:tableData={employeeOfferTable}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <!-- Gred Flexi 41 -->
            <CustomTabContent title="Gred Flexi 41">
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod pemangkuan bagi Gred Flexi 41"
                ></ContentHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Table Here -->
                    <CustomTable
                        title=""
                        enableDetail
                        detailActions={() =>
                            goto('/perjawatan/pemangkuan/butiran-flexi_41')}
                        bind:tableData={employeeOfferTable}
                    ></CustomTable>
                </div>
            </CustomTabContent>
        </CustomTab>
    {/if}
</section>
