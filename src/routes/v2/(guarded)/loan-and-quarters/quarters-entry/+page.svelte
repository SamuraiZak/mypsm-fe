<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { MovingInKuarters } from '$lib/dto/mypsm/pinjaman/kuarters/moving-in-list.dto';
    import type { PageData } from './$types';
    import { _outsiderApplication } from '$lib/schemas/mypsm/quarters/quarters-schema';
    import { Toaster } from 'svelte-french-toast';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    export let data: PageData;

    let rowData: MovingInKuarters;
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
            filter: true,
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
                onClick={async () => {
                    if (
                        data.currentRoleCode == UserRoleConstant.kakitangan.code
                    ) {
                        goto(
                            './quarters-entry/butiran/' +
                                'baru'+
                                '-' +
                                'kakitangan',
                        );
                    } else if (
                        data.currentRoleCode ==
                        UserRoleConstant.urusSetiaPeringkatNegeri.code
                    ) {
                        goto(
                            './quarters-entry/butiran/' +
                                'baru' +
                                '-' +
                                'luar',
                        );
                    }
                }}
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-10">
        <div class="h h-fit w-full">
            <DataTable
                title="Rekod Permohonan"
                bind:tableData={quartersTable}
                bind:passData={rowData}
                detailActions={() => {
                    if (rowData.employeeNumber !== null) {
                        goto(
                            '/v2/loan-and-quarters/quarters-entry/butiran/' +
                                rowData.id +
                                '-' +
                                'kakitangan',
                        );
                    } else {
                        goto(
                            '/v2/loan-and-quarters/quarters-entry/butiran/' +
                                rowData.id +
                                '-' +
                                'luar',
                        );
                    }
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Pemohon"
                        bind:inputValue={quartersTable.param.filter
                            .name}
                    />
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={quartersTable.param.filter
                            .employeeNumber}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={quartersTable.param.filter
                            .identityDocumentNumber}
                    />
                    <FilterSelectField
                        label="Status Kediaman"
                        options={data.occupiedStatus}
                        bind:inputValue={quartersTable.param.filter
                            .isOccupied}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
<Toaster />
