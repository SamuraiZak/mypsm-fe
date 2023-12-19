<script lang="ts">
    import { Radio } from 'flowbite-svelte';

    export let name = '';
    export let value1: number;
    export let value2: number;
    // export let selectedValue: number;
    export let checked = true;
    export let radioLabel1 = '';
    export let radioLabel2 = '';
    export let label = 'Label';
    export let labelBlack = true;
    export let disabled = false;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let labelType = 'default';
    function handleChange(event: any) {
        checked = event.target.checked;

        return checked;
    }
</script>

{#if labelType === 'default'}
    <div class="flex w-full flex-row items-center justify-between">
        <label
            for=""
            class="w-[250px] text-sm {labelBlack
                ? fontBlack
                : fontGray} font-medium">{label}</label
        >
        <div class="flex w-full items-center gap-x-2.5">
            <!-- <Radio
                {disabled}
                {name}
                {checked}
                bind:group={selectedValue}
                value={value1}>{radioLabel1}</Radio
            >

            <Radio {disabled} {name} bind:group={selectedValue} value={value2}
                >{radioLabel2}</Radio
            > -->
            <label
                class="mr-4 flex items-center {disabled
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'}"
            >
                <input
                    {disabled}
                    type="radio"
                    {name}
                    value={value1}
                    {checked}
                    on:change={handleChange}
                    class="mr-2 leading-tight {labelBlack
                        ? 'text-system-primary'
                        : fontGray} focus:outline-none focus:ring-0"
                />
                <span class="text-sm font-medium">{radioLabel1}</span>
            </label>
            <label
                class="flex items-center {disabled
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'}"
            >
                <input
                    {disabled}
                    type="radio"
                    {name}
                    value={value2}
                    checked={false}
                    on:change={handleChange}
                    class="mr-2 leading-tight {labelBlack
                        ? 'text-system-primary'
                        : fontGray} focus:outline-none focus:ring-0"
                />
                <span class="text-sm font-medium">{radioLabel2}</span>
            </label>
        </div>
    </div>
{:else if labelType === 'top'}
    <div class="flex w-full flex-col items-start gap-2 justify-between">
        <label
            for=""
            class="w-[250px] text-sm {labelBlack
                ? fontBlack
                : fontGray} font-medium">{label}</label
        >
        <div class="flex w-full items-center">
            <label
                class="mr-4 flex items-center {disabled
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'}"
            >
                <input
                    {disabled}
                    type="radio"
                    {name}
                    value={value1}
                    {checked}
                    on:change={handleChange}
                    class="mr-2 leading-tight {labelBlack
                        ? 'text-system-primary'
                        : fontGray} focus:outline-none focus:ring-0"
                />
                <span class="text-sm font-medium">{radioLabel1}</span>
            </label>
            <label
                class="flex items-center {disabled
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'}"
            >
                <input
                    {disabled}
                    type="radio"
                    {name}
                    value={value2}
                    checked={false}
                    on:change={handleChange}
                    class="mr-2 leading-tight {labelBlack
                        ? 'text-system-primary'
                        : fontGray} focus:outline-none focus:ring-0"
                />
                <span class="text-sm font-medium">{radioLabel2}</span>
            </label>
        </div>
    </div>
{/if}
