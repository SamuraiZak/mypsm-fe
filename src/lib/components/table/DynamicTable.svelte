<script lang="ts">
    import type { TableConfigDTO } from '$lib/dto/core/table/table-config.dto';

    export let tableData: TableConfigDTO;
</script>

<table class="w-full h-fit table-auto">
    <thead>
        <tr>
            {#each tableData.columns as column}
                <th class="border">{column.name}</th>
            {/each}
        </tr>
    </thead>
</table>
