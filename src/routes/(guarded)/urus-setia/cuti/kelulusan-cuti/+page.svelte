<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageData;
    let selectedTahun = tahun[0].value;
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Laporan Cuti" description="Rekod Cuti Pekerja">
        <!-- TODO: put buttons in this area if necessary -->
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5"
>

    <SectionHeader title="Senarai Cuti Yang Telah Diambil Mengikut Tahun"
        ><DropdownSelect
            id="tahun-dropdown"
            label="Tahun"
            dropdownType="label-left"
            bind:index={selectedTahun}
            options={tahun}
        ></DropdownSelect>
    </SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable tableItems={data.leaveHistoryList ?? undefined}
        withActions
        actionOptions={['edit']}
        editActions={() => {
            goto(
                '/urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti',
            );
        }}
        ></DynamicTable>
    </div>
</section>
