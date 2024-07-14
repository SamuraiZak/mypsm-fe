<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PromotionCommonList } from '$lib/dto/mypsm/employment/promotion/promotion-common-list.dto';
    import type { PageData } from './$types';
    export let data: PageData;

    // Role Code
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;

    let gradeOptions: IntDropdownOption[] = [
        {
            value: 'Gred 1-54',
            name: 'Gred 1-54',
            href: '/v2/employment/promotion/butiran/baru-1-54',
        },
        {
            value: 'TBK 1 dan 2 - Kumpulan Sokongan',
            name: 'TBK 1 dan 2 - Kumpulan Sokongan',
            href: '/v2/employment/promotion/butiran/baru-TBK 1 dan 2',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: '/v2/employment/promotion/butiran/baru-Utama',
        },
    ];

    let rowData: PromotionCommonList;

    let table154: TableSettingDTO = {
        param: data.param,
        meta: data.table154Response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.table154,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['groupId'],
        dictionary: [],
        url: 'employment/promotion/154s/list',
        id: 'table154',
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
    let tableTbk12: TableSettingDTO = {
        param: data.param,
        meta: data.tableTbk12Response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.tableTbk12,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['groupId'],
        dictionary: [],
        url: 'employment/promotion/tbk12s/list',
        id: 'table154',
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
    let tableMain: TableSettingDTO = {
        param: data.param,
        meta: data.tableMainResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.tableMain,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['groupId'],
        dictionary: [],
        url: 'employment/promotion/mains/list',
        id: 'table154',
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

    let employeeTable: TableSettingDTO = {
        param: data.employeeParam,
        meta: data.employeePromotionResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeePromotion,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['promotionId'],
        dictionary: [],
        url: 'employment/promotion/employee/list',
        id: 'employeeTable',
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
    let tempPromotionType: string = '';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Kenaikan Pangkat">
        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
            <TextIconButton
                icon="add"
                type="primary"
                label="Kenaikan Pangkat Baru"
                options={gradeOptions}
            />
        {/if}
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
        <CustomTab>
            <!-- Gred 1-54 -->
            <CustomTabContent title="Kenaikan Gred 1-54">
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div class="h-fit w-full">
                        <DataTable
                            title="Senarai rekod kenaikan pangkat bagi Gred 1-54"
                            bind:tableData={table154}
                            bind:passData={rowData}
                            detailActions={() => {
                                goto(
                                    '/v2/employment/promotion/butiran/' +
                                        rowData.groupId +
                                        '-' +
                                        '1-54',
                                );
                            }}
                        ></DataTable>
                    </div>
                </div>
            </CustomTabContent>

            <!-- TBK 1&2 - Kumpulan Sokongan -->
            <CustomTabContent
                title="Kenaikan Pangkat TBK 1&2 - Kumpulan Sokongan"
            >
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div class="h-fit w-full">
                        <DataTable
                            title="Senarai rekod kenaikan pangkat bagi TBK 1&2 - Kumpulan Sokongan"
                            bind:tableData={tableTbk12}
                            bind:passData={rowData}
                            detailActions={() => {
                                goto(
                                    '/v2/employment/promotion/butiran/' +
                                        rowData.groupId +
                                        '-' +
                                        'TBK 1 dan 2',
                                );
                            }}
                        ></DataTable>
                    </div>
                </div>
            </CustomTabContent>

            <!-- pengarah bahagian/negeri should not view this particular tab -->
            {#if data.currentRoleCode !== depDirectorRoleCode && data.currentRoleCode !== stateDirectorRoleCode}
                <!-- Gred Utama -->
                <CustomTabContent title="Kenaikan Pangkat Gred Utama">
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                    >
                        <div class="h-fit w-full">
                            <DataTable
                                title="Senarai rekod kenaikan pangkat bagi Gred Utama"
                                bind:tableData={tableMain}
                                bind:passData={rowData}
                                detailActions={() => {
                                    goto(
                                        '/v2/employment/promotion/butiran/' +
                                            rowData.groupId +
                                            '-' +
                                            'Utama',
                                    );
                                }}
                            ></DataTable>
                        </div>
                    </div>
                </CustomTabContent>
            {/if}
        </CustomTab>
    {:else if data.currentRoleCode === UserRoleConstant.kakitangan.code}
        <div class="flex w-full flex-col justify-start p-5">
            <div class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10">
                <div class="h-fit w-full">
                    <DataTable
                        title="Rekod Kenaikan Pangkat"
                        bind:tableData={employeeTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            if (rowData.promotionType == 'Gred 1-54') {
                                tempPromotionType = '1-54';
                            } else if (
                                rowData.promotionType == 'Gred TBK 1 dan 2'
                            ) {
                                tempPromotionType = 'TBK 1 dan 2';
                            } else if (rowData.promotionType == 'Gred Utama') {
                                tempPromotionType = 'Utama';
                            }
                            goto(
                                '/v2/employment/promotion/butiran/' +
                                    rowData.promotionId +
                                    '-' +
                                    tempPromotionType,
                            );
                        }}
                    ></DataTable>
                </div>
            </div>
        </div>
    {/if}
</section>
