<script lang="ts">
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';

    export let form: string = '';
    export let primary: boolean = false;
    export let disabled: boolean = false;
    export let label: string = 'Label';
    export let onClick = () => {};
</script>

<button
    {form}
    {disabled}
    on:click={onClick}
    class="flex h-[28px] min-h-[28px] flex-row items-center justify-center gap-1 rounded-[3px] px-2.5 {primary
        ? 'bg-system-primary hover:bg-system-primaryHover'
        : 'border border-bdr-primary bg-bgr-primary hover:bg-bgr-secondary'}"
>
    <!-- icon -->
    <div class="flex h-full flex-row items-center justify-center">
        <span
            class="leading-loose {primary
                ? 'text-txt-blend '
                : 'text-txt-secondary'}"
        >
            <!-- icon slot -->
            <slot />
        </span>
    </div>

    <!-- label -->
    <div class="flex h-full flex-row items-center justify-center">
        <p
            class="text-sm font-normal leading-loose {primary
                ? ' text-txt-blend'
                : 'text-txt-secondary'}"
        >
            {label}
        </p>
    </div>
</button>
