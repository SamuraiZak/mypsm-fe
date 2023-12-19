<script lang="ts">
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgChevronRightCircle from '$lib/assets/svg/SvgChevronRightCircle.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';

    export let active: boolean = false;
    export let disabled: boolean = false;
    export let label: string = 'Label';
    export let onClick = () => {};
</script>

<button
    {disabled}
    on:click={onClick}
    class="flex w-full flex-row items-center justify-center gap-1 rounded-[3px] px-2.5 py-2 {active
        ? ' bg-system-primaryTint'
        : ' bg-bgr-secondary '}"
>
    <!-- label -->
    <div class="flex h-full w-full flex-row items-center justify-start">
        <p class="text-start text-sm font-normal{active
            ? ' text-system-primary'
            : ' text-txt-secondary '}">
            {label}
        </p>
    </div>
    <!-- icon -->
    <div class="flex h-full flex-row items-center justify-center">
        <span class={active ? 'text-system-primary' : 'text-txt-tertiary'}>
            <SvgChevronRightCircle></SvgChevronRightCircle>
        </span>
    </div>
</button>
