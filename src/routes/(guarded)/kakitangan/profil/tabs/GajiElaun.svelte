<script lang="ts">
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { gajiElaunTable } from '$lib/mocks/profil/gaji-elaun';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { goto } from '$app/navigation';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import type { PageData } from '../$types';

    export let data: PageData;
    console.log([data.personalDetailResponse])
</script>


<div class="flex h-fit w-full flex-col items-center justify-start px-2.5">
    <SectionHeader title="Senarai gaji & Elaun Mengikut Bulan"></SectionHeader>
    <DynamicTable
    tableItems={[data.personalDetailResponse]}
        withActions
        actionOptions={['detail']}
        detailActions={() => {
            goto('/kakitangan/elaun/rekod');
        }}
    />
    <!-- tableItems={data.personalSalaryResponse} -->
</div>
