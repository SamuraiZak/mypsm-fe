<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
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
            href: './kenaikan-pangkat/butiran-1_54',
        },
        {
            value: 'TBK 1 dan 2 - Kumpulan Sokongan',
            name: 'TBK 1 dan 2 - Kumpulan Sokongan',
            href: './kenaikan-pangkat/butiran-tbk_1dan2',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: './kenaikan-pangkat/butiran-gred_utama',
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
        //varies based on role, US & PBN view the same table @ penyokong and pelulus view same table diff data from US & PBN
        data: data.dataList ?? [], //datalist for US & PBN @ datalist2 for penyokong and pelulus
        //data: role === penyokong ? data.datalist : data.datalist2 ?? [],
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
    <ContentHeader title="Kenaikan Pangkat">
        {#if data.currentRoleCode === secretaryRoleCode}
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
    {#if data.currentRoleCode !== employeeRoleCode}
        <CustomTab>
            <!-- Gred 1-54 -->
            <CustomTabContent title="Kenaikan Gred 1-54">
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod kenaikan pangkat bagi Gred 1-54"
                />
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        onUpdate={_search}
                        enableDetail
                        detailActions={() =>
                            goto('/perjawatan/kenaikan-pangkat/butiran-1_54')}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <!-- TBK 1&2 - Kumpulan Sokongan -->
            <CustomTabContent
                title="Kenaikan Pangkat TBK 1&2 - Kumpulan Sokongan"
            >
                <ContentHeader
                    borderClass="border-none"
                    title="Senarai rekod kenaikan pangkat bagi TBK 1&2 - Kumpulan Sokongan"
                />
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Table Here -->
                    <CustomTable
                        onUpdate={_search}
                        enableDetail
                        detailActions={() =>
                            goto(
                                '/perjawatan/kenaikan-pangkat/butiran-tbk_1dan2',
                            )}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <!-- pengarah bahagian/negeri should not view this particular tab -->
            {#if data.currentRoleCode !== depDirectorRoleCode && data.currentRoleCode !== stateDirectorRoleCode}
                <!-- Gred Utama -->
                <CustomTabContent title="Kenaikan Pangkat Gred Utama">
                    <ContentHeader
                        borderClass="border-none"
                        title="Senarai rekod kenaikan pangkat bagi Gred Utama"
                    />
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Table Here -->
                        <CustomTable
                            onUpdate={_search}
                            enableDetail
                            detailActions={() =>
                                goto(
                                    '/perjawatan/kenaikan-pangkat/butiran-gred_utama',
                                )}
                            bind:tableData={table}
                        ></CustomTable>
                    </div>
                </CustomTabContent>
            {/if}
        </CustomTab>
    {:else if data.currentRoleCode === employeeRoleCode}
        <div class="w-full flex flex-col justify-start px-5 py-2">
            <ContentHeader
                borderClass="border-none"
                title="Senarai Rekod Kenaikan Pangkat"
            />
            <CustomTable
                title=""
                tableData={table}
                enableDetail
                detailActions={() =>
                    goto('/perjawatan/kenaikan-pangkat/butiran-rekod')}
            />
        </div>
    {/if}
</section>
