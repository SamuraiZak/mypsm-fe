<script lang="ts">
    // rowSize = size of row that particular headcell can occupy, 
    // e;g: rowSize=2 mean that headcell will have the size of two rows
    // columnSize = size of column that particular headcell can occupy, 
    // e;g: columnSize=3 mean that headcell will have the size of three columns (that header will have 3 sub-headers)
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
