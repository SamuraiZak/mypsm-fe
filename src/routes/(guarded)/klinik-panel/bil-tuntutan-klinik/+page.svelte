<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicPanelClaimList } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-list.dto';
    import type { PageData } from './$types';
    import { _editAllocations } from '$lib/schemas/mypsm/medical/medical-schema';

    export let data: PageData;
    let rowData: ClinicPanelClaimList;

    let claimListTable: TableSettingDTO = {
        param: data.param,
        meta: data.clinicPanelClaimListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.clinicPanelClaimList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url:
            data.currentRoleCode == UserRoleConstant.klinikPanel.code
                ? 'medical/clinic/claims/list_by_clinic'
                : 'medical/clinic/claims/list',
        id: 'clinicPanelClaimsTable',
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
    <ContentHeader title="Rekod Bil Tuntutan Klinik Panel">
        {#if data.currentRoleCode == UserRoleConstant.klinikPanel.code}
            <TextIconButton
                label="Tambah Bil Tuntutan"
                icon="add"
                onClick={() => goto('/klinik-panel/bil-tuntutan-klinik/baru')}
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Bil Tuntutan"
                bind:tableData={claimListTable}
                bind:passData={rowData}
                detailActions={() => {
                    goto(
                        '/klinik-panel/bil-tuntutan-klinik/butiran/' +
                            rowData.id,
                    );
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Kod Klinik"
                        bind:inputValue={claimListTable.param.filter.clinicCode}
                    />
                    <FilterTextField
                        label="Nama Klinik"
                        bind:inputValue={claimListTable.param.filter.name}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
