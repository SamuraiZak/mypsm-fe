<script lang="ts">
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto.js';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    import { goto } from '$app/navigation';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    export let data: PageData;

    // Role Code
    let employeeRoleCode: string = UserRoleConstant.kakitangan.code;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;
    let supporterRoleCode: string = UserRoleConstant.penyokong.code;
    let approverRoleCode: string = UserRoleConstant.pelulus.code;
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;

    let gradeOptions: IntDropdownOption[] = [
        {
            value: 'Gred 1-54',
            name: 'Gred 1-54',
            href: './pemangkuan/baru-1_54',
        },
        {
            value: 'Gred Flexi 41',
            name: 'Gred Flexi 41',
            href: './pemangkuan/baru-flexi_41',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: './pemangkuan/butiran-gred_utama',
        },
    ];

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
    {#if data.currentRoleCode === secretaryRoleCode}
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
    {#if data.currentRoleCode === secretaryRoleCode}
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
                        onUpdate={_search}
                        enableDetail
                        detailActions={() => goto('./pemangkuan/butiran-1_54')}
                        bind:tableData={table}
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
                        onUpdate={_search}
                        enableDetail
                        detailActions={() =>
                            goto('./pemangkuan/butiran-flexi_41')}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <!-- Gred Utama -->
            <CustomTabContent title="Gred Utama">
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod pemangkuan bagi Gred Utama"
                ></ContentHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Table Here -->
                    <CustomTable
                        title=""
                        onUpdate={_search}
                        enableDetail
                        detailActions={() =>
                            goto('./pemangkuan/butiran-gred_utama')}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>
        </CustomTab>
    {:else if data.currentRoleCode === employeeRoleCode}
        <div
            class="flex max-h-full w-full flex-col items-start justify-start px-2.5"
        >
            <ContentHeader
                title="Senarai Tawaran Pemangkuan"
                borderClass="border-none"
            />
            <CustomTable
                title=""
                enableDetail
                detailActions={() => goto('./pemangkuan/butiran-rekod')}
                onUpdate={_search}
                tableData={table}
            ></CustomTable>
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
    {:else if data.currentRoleCode === supporterRoleCode || stateDirectorRoleCode || depDirectorRoleCode}
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
                        onUpdate={_search}
                        enableDetail
                        detailActions={() => goto('./pemangkuan/butiran-1_54')}
                        bind:tableData={table}
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
                        onUpdate={_search}
                        enableDetail
                        detailActions={() =>
                            goto('./pemangkuan/butiran-flexi_41')}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <!-- pengarah bahagian/negeri should not view this particular tab -->
            <!-- Gred Utama -->
            {#if data.currentRoleCode === supporterRoleCode || data.currentRoleCode === approverRoleCode}
                <CustomTabContent title="Gred Utama">
                    <ContentHeader
                        borderClass="border-none"
                        title="Senarai rekod pemangkuan bagi Gred Utama"
                    ></ContentHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Table Here -->
                        <CustomTable
                            title=""
                            onUpdate={_search}
                            enableDetail
                            detailActions={() =>
                                goto('./pemangkuan/butiran-gred_utama')}
                            bind:tableData={table}
                        ></CustomTable>
                    </div>
                </CustomTabContent>
            {/if}
        </CustomTab>
    {/if}
</section>
