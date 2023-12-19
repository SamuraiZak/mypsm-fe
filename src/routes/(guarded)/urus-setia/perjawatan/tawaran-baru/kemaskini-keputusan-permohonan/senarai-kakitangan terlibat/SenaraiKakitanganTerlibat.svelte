<script lang="ts">
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { staffs } from '$lib/mocks/perjawatan/tawaran-baru/tawaran-baru-permonan-list';
</script>

<!-- <b class="text-lg">Senarai Kakitangan Terlibat Dibawa Ke Mesyuarat</b> -->
<div class="flex w-full flex-col items-center justify-start">
    <DynamicTable tableItems={staffs} />
</div>
