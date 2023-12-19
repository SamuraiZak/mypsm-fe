<script lang="ts">
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import { Dropdown, DropdownItem } from 'flowbite-svelte';

    export let label: string = 'Label';
    export let primary: boolean = false;
    export let options: IntDropdownOption[] = [];
</script>

<button
    type="button"
    class="flex h-[28px] min-h-[28px] flex-row items-center justify-center rounded-[3px] p-0 text-[12px] font-medium focus:outline-none focus:ring-0 {primary
        ? 'bg-system-primary hover:bg-system-primaryHover'
        : 'border border-bdr-primary bg-bgr-primary hover:bg-bgr-secondary'}"
>
    <div class="flex h-full w-fit flex-row items-center justify-center px-2.5">
        <span
            class="text-sm font-normal leading-loose {primary
                ? 'text-txt-blend'
                : 'text-txt-secondary'}">{label}</span
        >
    </div>
    <div
        class="flex h-full w-fit flex-row items-center justify-center border-l {primary
            ? 'border-txt-blend'
            : 'border-bdr-primary'} px-1.5"
    >
        <span
            class="text-sm font-normal {primary
                ? 'text-txt-blend'
                : 'text-txt-secondary'}"><SvgChevronDown></SvgChevronDown></span
        >
    </div>
</button>

<Dropdown containerClass="z-50 border border-bdr-primary min-w-[200px]">
    {#if options.length > 0}
        {#each options as item}
            <DropdownItem href={item.href}>
                {item.name}
            </DropdownItem>
        {/each}
    {:else}
        <slot />
    {/if}
</Dropdown>
