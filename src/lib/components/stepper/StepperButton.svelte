<script lang="ts">
    import SvgChevronRightCircle from '$lib/assets/svg/SvgChevronRightCircle.svelte';

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
        <p
            class="text-start text-sm {active
                ? ' font-medium text-system-primary'
                : ' font-normal text-txt-secondary '}"
        >
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
