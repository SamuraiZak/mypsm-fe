<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { ClinicPanelEmployeeList } from '$lib/dto/mypsm/perubatan/clinic-panel-employee-list.dto';
    import { _updateTable } from './+page';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let rowData = {} as ClinicPanelEmployeeList;

    let employeeListTable: TableDTO = {
        param: data.param,
        meta: data.clinicPanelEmployeeResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.clinicPanelEmployeeList ?? [],
        hiddenData: ['id'],
    };

    async function _searchTable() {
        _updateTable(employeeListTable.param).then((value) => {
            employeeListTable.data = value.props.response.data?.dataList ?? [];
            employeeListTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeeListTable.param.pageSize = value.props.param.pageSize;
            employeeListTable.param.pageNum = value.props.param.pageNum;
            employeeListTable.hiddenData = ['id'];
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="No. Pekerja" inputValue={''} />
            <FilterTextField label="Nama Pekerja" inputValue={''} />
            <FilterTextField label="Kad Pengenalan" inputValue={''} />
        </FilterCard>

        <CustomTable
            title="Senarai Kakitangan"
            bind:tableData={employeeListTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() =>
                goto('/klinik-panel/maklumat-kakitangan/'+rowData.id)
            }
            onUpdate={_searchTable}
        />
    </div>
</section>
