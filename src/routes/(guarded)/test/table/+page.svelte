<script lang="ts">
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';

    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { PageData } from './$types';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';

    export let data: PageData;
</script>

<div
    class="mb-10 flex h-full max-h-full min-h-full w-full resize-none flex-col justify-start bg-black"
>
    <div class="h-[100px] min-h-[100px] w-full resize-none bg-slate-400">
        hekll
    </div>
    <div
        class="flex h-full max-h-full w-full resize-none flex-col justify-start gap-2 overflow-hidden bg-white p-10"
    >
        <!-- component starts here -->
        <!-- component wrapper -->
        <ImpactTable></ImpactTable>
    </div>
</div>
