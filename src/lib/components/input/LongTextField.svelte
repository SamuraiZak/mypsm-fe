<script lang="ts">
    import { Textarea } from 'flowbite-svelte';
    export let disabled = false;
    export let id = '';
    export let name = '';
    export let placeholder = '';
    export let rows = 3;
    export let onBlur = () => {};
    export let value: any = null;
    export let labelBlack = true;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let labelType = 'default';
    export let labelFor = '';
    export let onChange: any = null;
    export let isError = false;
</script>

{#if labelType === 'default'}
    <div class="flex w-full flex-row items-start justify-between">
        <label
            for=""
            class="w-[220px] min-w-[220px] text-sm {labelBlack
                ? fontBlack
                : fontGray} font-medium"
            >{label}
        </label><Textarea
            {id}
            {name}
            on:blur={onBlur}
            on:change={onChange}
            {placeholder}
            bind:value
            {disabled}
            {rows}
            class="
            {isError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            w-full rounded-[3px] bg-bgr-primary text-[12px] placeholder:text-txt-tertiary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        ></Textarea>
    </div>
{:else if labelType === 'top'}
    <div class="flex w-full flex-col items-start justify-start gap-1">
        <label
            for={labelFor}
            class="min-w-[220px]text-sm w-[220px] font-medium {labelBlack
                ? fontBlack
                : fontGray}">{label}</label
        ><Textarea
            {id}
            {name}
            on:blur={onBlur}
            on:change={onChange}
            {placeholder}
            bind:value
            {disabled}
            {rows}
            class="
            {isError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            w-full rounded-[3px] bg-bgr-primary text-[12px] placeholder:text-txt-tertiary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        ></Textarea>
    </div>
{/if}
