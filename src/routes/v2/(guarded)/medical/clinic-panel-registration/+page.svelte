<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicApplicationList } from '$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application-list.dto';
    import type { PageData } from './$types';

    export let data: PageData;
    let rowData = {} as ClinicApplicationList;

    let clinicApplicationTable: TableSettingDTO = {
        param: data.param,
        meta: data.clinicApplicationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.clinicApplicationList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url: 'medical/clinic/list',
        id: 'clinicApplication',
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
    <ContentHeader title="Rekod Permohonan Klinik Panel">
        {#if data.currentRoleCode == UserRoleConstant.unitBahagian.code || data.currentRoleCode == UserRoleConstant.unitNegeri.code}
        <TextIconButton
            icon="add"
            type="primary"
            label="Tambah Klinik Panel"
            onClick={() => goto('./clinic-panel-registration/baru')}
        />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Permohonan Klinik Panel"
                bind:tableData={clinicApplicationTable}
                bind:passData={rowData}
                detailActions={() => {
                    goto('./clinic-panel-registration/butiran/' + rowData.id)}
                }
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Klinik"
                        bind:inputValue={clinicApplicationTable.param.filter.name}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
