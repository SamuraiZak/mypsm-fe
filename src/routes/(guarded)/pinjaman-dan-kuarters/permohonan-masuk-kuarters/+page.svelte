<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    export let data: PageData;

    let rowData: any;
    let kuartersTable: TableDTO = {
        param: data.param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
        hiddenData: ['id'],
    };
    let quartersTable: TableSettingDTO = {
        param: data.param,
        meta: data.quartersListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.quartersList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url: 'quarter/moving_in/list',
        id: 'quartersTable',
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
    <ContentHeader title="Permohonan Menduduki Kuarters">
        {#if data.currentRoleCode == UserRoleConstant.kakitangan.code || data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
            <TextIconButton
                label="Permohonan {data.currentRoleCode ==
                UserRoleConstant.kakitangan.code
                    ? 'Baru'
                    : 'Luar'}"
                icon="add"
                onClick={() => goto('./permohonan-masuk-kuarters/butiran/baru')}
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-10">
        <FilterCard>
            <FilterTextField label="No. Pemohon" inputValue={''} />
            <FilterTextField label="Nama Pemohon" inputValue={''} />
            <FilterTextField label="Jenis Pemohon" inputValue={''} />
            <FilterTextField label="Status" inputValue={''} />
        </FilterCard>

        <CustomTable
            title="Rekod Permohonan"
            bind:tableData={kuartersTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() =>
                goto('./permohonan-masuk-kuarters/butiran/' + rowData.id)}
        />
        <div class="h h-fit w-full">
            <DataTable title="Rekod Permohonan" tableData={quartersTable} />
        </div>
    </div>
</section>
