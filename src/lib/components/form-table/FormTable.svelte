<script lang="ts">
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { translate } from '$lib/config/dictionary';
    import { TabItem, TableBodyCell } from 'flowbite-svelte';
    import IconButton from '../buttons/IconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';

    // sample data to generate the template
    export let sampleData: any = {};

    // original data from the page
    export let data: any[] = [];

    // disabled view only
    export let disabled: boolean = false;

    // adding new row
    function addRow() {
        let latestRow = data.at(data.length - 1);

        let containsEmpty = false;

        Object.values(latestRow).forEach((element) => {
            if (typeof element == 'string') {
                if (element == '') {
                    containsEmpty = true;
                }
            } else {
                if (element == 0) {
                    containsEmpty = true;
                }
            }
        });

        if (!containsEmpty) {
            let newData = {
                ...sampleData,
            };

            data = [...data, newData];
        }
    }

    // deleting selected row
    function deleteRow(item: any) {
        if (data.length == 1) {
            data = data.filter((row) => row != item);

            let newData = {
                ...sampleData,
            };

            data = [...data, newData];
        } else {
            data = data.filter((row) => row != item);
        }
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col justify-start overflow-x-hidden"
>
    <div class="h-full max-h-full w-full overflow-auto">
        <div class="h-fit bg-bgr-primary">
            <table class="w-full border-collapse border border-bdr-primary">
                <thead class="h-[40px] min-h-[40x]">
                    {#each Object.entries(sampleData) as [key, value]}
                        <th class="min-w-fit border border-bdr-primary p-2.5">
                            <p
                                class="text-sm font-bold text-txt-secondary {disabled
                                    ? ', text-txt-tertiary'
                                    : ''}"
                            >
                                {translate(key)}
                            </p>
                        </th>
                    {/each}
                    {#if disabled == false}
                        <th
                            class="w-[40px] min-w-[40px] border border-bdr-primary"
                        >
                            <div
                                class="flex h-full flex-row items-center justify-center"
                            >
                                <IconButton
                                    onClick={() => {
                                        addRow();
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </IconButton>
                            </div>
                        </th>
                    {/if}
                </thead>
                <tbody>
                    {#each data as item}
                        <tr class="border-b border-bdr-primary">
                            {#each Object.entries(item) as [key, val]}
                                <TableBodyCell
                                    bind:value={data}
                                    tdClass="p-2.5 border border-bdr-primary "
                                >
                                    {#if typeof val == 'string'}
                                        <input
                                            {disabled}
                                            class="disabled: h-[28px] w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-sm text-txt-primary placeholder:text-txt-tertiary hover:border-system-primary focus:outline-none focus:ring-0 disabled:border-none disabled:text-txt-tertiary disabled:hover:border-none"
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder={key}
                                            bind:value={item[key]}
                                        />
                                    {:else}
                                        <input
                                            {disabled}
                                            class="disabled: h-[28px] w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-sm text-txt-primary placeholder:text-txt-primary hover:border-system-primary focus:outline-none focus:ring-0 disabled:border-none disabled:text-txt-tertiary disabled:hover:border-none"
                                            type="number"
                                            name=""
                                            id=""
                                            bind:value={item[key]}
                                        />
                                    {/if}
                                </TableBodyCell>
                            {/each}
                            {#if disabled == false}
                                <TableBodyCell
                                    tdClass="p-2.5 border border-bdr-primary"
                                >
                                    <div
                                        class="flex h-full flex-row items-center justify-center"
                                    >
                                        <IconButton
                                            onClick={() => {
                                                deleteRow(item);
                                            }}
                                        >
                                            <SvgXMark></SvgXMark>
                                        </IconButton>
                                    </div>
                                </TableBodyCell>
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
