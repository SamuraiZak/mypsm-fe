<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO, TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { ClinicPanelEmployeeList } from '$lib/dto/mypsm/perubatan/clinic-panel-employee-list.dto';
    import { goto } from '$app/navigation';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';

    export let data: PageData;

    let rowData = {} as ClinicPanelEmployeeList;
    let employeeListTable: TableSettingDTO = {
        param: data.param,
        meta: data.clinicPanelEmployeeResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.clinicPanelEmployeeList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url:'medical/clinic/employee/claim_detail/get',
        id: 'employeeListTable',
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
    <ContentHeader title="Maklumat Kakitangan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <!-- <CustomTable
            title="Senarai Kakitangan"
            bind:tableData={employeeListTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() =>
                goto('/klinik-panel/maklumat-kakitangan/'+rowData.id)
            }
            onUpdate={_searchTable}
        /> -->
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={employeeListTable}
                bind:passData={rowData}
                detailActions={() => {
                    goto('/klinik-panel/maklumat-kakitangan/'+rowData.id);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No Pekerja"
                        bind:inputValue={employeeListTable.param.filter.employeeNumber}
                    />
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={employeeListTable.param.filter.employeeName}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
