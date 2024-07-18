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
        ? ' bg-blue-200'
        : ' bg-gray-100'}"
>
    <!-- label -->
    <div class="flex h-full w-full flex-row items-center justify-start">
        <p
            class="text-start text-base {active
                ? ' font-medium text-blue-600'
                : ' font-normal text-slate-500'}"
        >
            {label}
        </p>
    </div>
    <!-- icon -->
    <div class="flex h-full flex-row items-center justify-center">
        <span class={active ? ' text-blue-600' : ' text-slate-500'}>
            <SvgChevronRightCircle></SvgChevronRightCircle>
        </span>
    </div>
</button>
