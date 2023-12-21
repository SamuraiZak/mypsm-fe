<script lang="ts">
    export let rowSize: number = 1;
    export let columnSize: number = 1;
    export let title: string = '';
</script>

<th
    class="border px-2.5 py-2 text-center"
    rowspan={rowSize}
    colspan={columnSize}
>
    <div class="flex flex-row items-center justify-center gap-1">
        <span class="text-center text-sm font-bold text-txt-secondary">
            {title}
        </span>
    </div>
</th>
