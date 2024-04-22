<script lang="ts">
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgTrash from '$lib/assets/svg/SvgTrash.svelte';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { DropdownItem, Dropdown } from 'flowbite-svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import SvgReload from '$lib/assets/svg/SvgReload.svelte';

    export let form: string = '';
    export let type: string = 'primary' || 'danger' || 'neutral';
    export let operation: string = 'submit';
    export let disabled: boolean = false;
    export let icon: string = '';
    export let label: string = 'Label';
    export let options: IntDropdownOption[] = [];
    export let val: string = '';
    export let onClick = () => {};
</script>

<button
    type="submit"
    {form}
    {disabled}
    on:click={onClick}
    class="flex h-7 max-h-7 min-h-7 flex-row items-center justify-center gap-1 rounded px-2 {type ===
    'primary'
        ? 'bg-ios-systemColors-systemBlue-light hover:bg-ios-systemColors-systemBlue-dark'
        : type === 'danger'
          ? 'bg-ios-systemColors-systemRed-light hover:bg-ios-systemColors-systemRed-dark'
          : 'border bg-bgr-primary hover:bg-bgr-secondary'}"
>
    <!-- icon -->
    <div class="flex h-full max-h-full flex-row items-center justify-center">
        <span
            class="leading-tight {type === 'primary'
                ? 'text-txt-blend '
                : type === 'danger'
                  ? 'text-txt-blend'
                  : 'text-txt-secondary'}"
        >
            <!-- icon slot -->
            {#if icon == 'cancel'}
                <SvgXMark size="20" />
            {:else if icon == 'delete'}
                <SvgTrash size="20" />
            {:else if icon == 'check'}
                <SvgCheck size="20" />
            {:else if icon == 'next'}
                <SvgChevronRight size="20" />
            {:else if icon == 'previous'}
                <SvgChevronLeft size="20" />
            {:else if icon == 'print'}
                <SvgPrinter size="20" />
            {:else if icon == 'add'}
                <SvgPlus size="20" />
            {:else if icon == 'block'}
                <SvgBlock size="20" />
            {:else if icon == 'edit'}
                <SvgInfoSolid size="20" />
            {:else if icon == 'search'}
                <SvgManifyingGlass size="20" />
            {:else if icon == 'reset'}
                <SvgReload size="12" />
            {:else}
                <slot />
            {/if}
        </span>
    </div>

    <!-- label -->
    <div class="flex h-full flex-row items-center justify-center">
        <p
            class="text-sm font-normal leading-loose {type === 'primary'
                ? ' text-ios-basic-white'
                : type === 'danger'
                  ? ' text-ios-basic-white'
                  : ' text-ios-labelColors-secondaryLabel-light'}"
        >
            {label}
        </p>
    </div>
</button>

{#if options.length !== 0}
    <Dropdown containerClass="z-50 border border-bdr-primary min-w-[200px]">
        {#if options.length > 0}
            {#each options as item}
                <DropdownItem data-sveltekit-preload-data="false" href={item.href != "" ? item.href: ""} on:click={() => {val = item.value;}}>
                    {item.name}
                </DropdownItem>
            {/each}
        {:else}
            <slot />
        {/if}
    </Dropdown>
{/if}
