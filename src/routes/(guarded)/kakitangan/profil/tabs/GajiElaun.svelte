<script lang="ts">
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { gajiElaunTable } from '$lib/mocks/profil/gaji-elaun';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { goto } from '$app/navigation';
</script>

<div class="flex h-fit w-full flex-col items-center justify-start px-2.5">
    <SectionHeader title="Senarai gaji & Elaun Mengikut Bulan"></SectionHeader>
    <DynamicTable
        tableItems={gajiElaunTable}
        withActions
        actionOptions={['detail']}
        detailActions={() => {
            goto('/kakitangan/elaun/rekod');
        }}
    />
</div>
