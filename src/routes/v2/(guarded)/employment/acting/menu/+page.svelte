<script lang="ts">
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import type {
        ActingCommonList,
        EmployeeActingOffer,
    } from '$lib/dto/mypsm/employment/acting/acting-common-list.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';

    export let data: PageData;

    let commonSelectedData = {} as ActingCommonList;
    let employeeSelectedData = {} as EmployeeActingOffer;

    // gred 154 table
    let tableList154s: TableSettingDTO = {
        param: data.props.gred154.request,
        meta: data.props.gred154.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.props.gred154.list ?? [],
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
        param: data.props.gredFlexi41.request,
        meta: data.props.gredFlexi41.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.props.gredFlexi41.list ?? [],
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
        param: data.props.gredMain.request,
        meta: data.props.gredMain.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.props.gredMain.list ?? [],
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
        param: data.props.offer.request,
        meta: data.props.offer.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.props.offer.list ?? [],
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

<section class="flex w-full flex-col items-center justify-center">
    <div class="flex h-20 w-full flex-row items-center justify-between px-5">
        <!-- leading -->
        <div class="flex w-full flex-col items-start justify-center">
            <p class="text-xl font-semibold text-black">Urusan Pemangkuan</p>
            <p class="text-md font-medium text-black">
                Carian Rekod Proses Pemangkuan
            </p>
        </div>
        <div class="flex flex-row items-center justify-end gap-2">
            <TextIconButton
                icon="add"
                label="Tambah"
                type="primary"
                onClick={() => {
                    goto('/v2/employment/acting/add')
                }}
            />
        </div>
    </div>
</section>

{#if data.layoutData.accountDetails.currentRoleCode !== RoleConstant.kakitangan.code}
    <section
        class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
    >
        <div
            class="flex h-full w-full flex-col items-start justify-start overflow-hidden px-5"
        >
            <CustomTab>
                <CustomTabContent title="Pemangkuan Gred 1-54">
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden"
                    >
                        <DataTable
                            title="Rekod Pemangkuan Gred 1-54"
                            bind:tableData={tableList154s}
                            bind:passData={commonSelectedData}
                            detailActions={() => {
                                goto(
                                    '/v2/employment/acting/butiran/1-' +
                                        commonSelectedData.batchId +
                                        '-' +
                                        '1-54',
                                );
                            }}
                        ></DataTable>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Pemangkuan Gred 41">
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden"
                    >
                        <DataTable
                            title="Rekod Pemangkuan Gred Flexi 41"
                            bind:tableData={tableListFlexi41s}
                            bind:passData={commonSelectedData}
                            detailActions={() => {
                                goto(
                                    '/v2/employment/acting/butiran/1-' +
                                        commonSelectedData.batchId +
                                        '-' +
                                        'Flexi 41',
                                );
                            }}
                        ></DataTable>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Pemangkuan Gred Utama">
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden"
                    >
                        <DataTable
                            title="Rekod Pemangkuan Gred Utama"
                            bind:tableData={tableListMain}
                            bind:passData={commonSelectedData}
                            detailActions={() => {
                                goto(
                                    '/v2/employment/acting/butiran/1-' +
                                        commonSelectedData.batchId +
                                        '-' +
                                        'Utama',
                                );
                            }}
                        ></DataTable>
                    </div>
                </CustomTabContent>
            </CustomTab>
        </div>
    </section>
{:else}
    <section
        class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
    >
        <div
            class="flex h-full w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden px-5"
        >
            <DataTable
                title="Senarai Tawaran Pemangkuan"
                bind:tableData={employeeOfferTable}
                bind:passData={employeeSelectedData}
                detailActions={() => {
                    if (employeeSelectedData.assignedRole == 'Pemohon') {
                        goto(
                            '/v2/employment/acting/butiran/kakitangan-' +
                                employeeSelectedData.actingId +
                                '-' +
                                employeeSelectedData.actingType,
                        );
                    } else {
                        goto(
                            '/v2/employment/acting/butiran/1-' +
                                employeeSelectedData.batchId +
                                '-' +
                                employeeSelectedData.actingType,
                        );
                    }
                }}
            ></DataTable>
        </div>
    </section>
{/if}
