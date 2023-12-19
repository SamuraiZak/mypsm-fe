<script lang="ts">
    export let label: string = 'Label';
    export let options: any[] = [
        {
            value: 'Pass',
            name: 'Pass',
        },
        {
            value: 'Fail',
            name: 'Fail',
        },
    ];
    export let selected: any = options[0];
</script>

<div
    class="flex min-h-[28px] w-full flex-row items-start justify-start bg-bgr-secondary"
>
    <!-- label -->
    <div
        class="flex h-full min-h-[28px] w-[220px] min-w-[220px] max-w-[220px] flex-row items-center justify-start bg-bgr-tertiary"
    >
        <p class="text-sm font-normal leading-loose text-txt-primary">
            {label}
        </p>
    </div>
    <div class="flex h-full w-full flex-row items-center justify-start">
        <select
            id="role"
            bind:value={selected}
            placeholder="Sila Pilih"
            class=" h-[28px] w-full rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary placeholder:text-txt-primary focus:border-system-primary focus:outline-none focus:ring-0"
        >
            {#each options as item}
                <option value={item.value}>{item.name}</option>
            {/each}
        </select>
    </div>
</div>
