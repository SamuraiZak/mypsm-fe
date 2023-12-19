<script lang="ts">
    export let label: string = 'Label';
    export let id: string = 'defaultId';
    export let selectedVal: any;
    export let onChange = () => {};
    export let options = [
        {
            value: 'option 1',
            name: 'Option 1',
        },
        {
            value: 'option 2',
            name: 'Option 2',
        },
    ];
</script>

<div class="flex flex-col items-center justify-center">
    <div class="flex w-full flex-row items-center justify-start">
        <p class="text-sm font-normal text-txt-secondary">{label}</p>
    </div>
    <div class="flex flex-row items-center justify-start">
        <select
            {id}
            bind:value={selectedVal}
            on:change={onChange}
            placeholder="Sila pilih"
            class="block h-[28px] w-[200px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-sm text-txt-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        >
            {#each options as item}
                <option value={item.value}>{item.name}</option>
            {/each}
        </select>
    </div>
</div>
