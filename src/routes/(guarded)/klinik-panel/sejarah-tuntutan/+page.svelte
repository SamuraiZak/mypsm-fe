<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { ClinicPanelClaimHistory } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-history.dto';
    import { goto } from '$app/navigation';
    export let data: PageData;

    let rowData = {} as ClinicPanelClaimHistory;
    let claimHistoryTable: TableDTO = {
        param: data.param,
        meta: data.claimHistoryListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.claimHistoryList ?? [],

        hiddenData: ['patientId', 'employeeId']
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sejarah Tuntutan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="Nama Pekerja" inputValue={''} />
            <FilterTextField label="Nama Pesakit" inputValue={''} />
            <FilterTextField label="Kad Pengenalan" inputValue={''} />
        </FilterCard>

        <CustomTable
            title="Senarai Rekod"
            bind:tableData={claimHistoryTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() => goto('/klinik-panel/sejarah-tuntutan/butiran/'+rowData.employeeId+'-'+rowData.patientId)}
        />
    </div>
</section>
