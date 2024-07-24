<script lang="ts">
    import SvgChevronRightCircle from '$lib/assets/svg/SvgChevronRightCircle.svelte';
    import SvgGripIcon from '$lib/assets/svg/SvgGripIcon.svelte';

    export let active: boolean = false;
    export let disabled: boolean = false;
    export let label: string = 'Label';
    export let onClick = () => {};
</script>

<button
    {disabled}
    on:click={onClick}
    class="flex h-fit min-h-fit w-full flex-row items-center justify-start gap-3 rounded-md {active
        ? 'bg-blue-50'
        : 'bg-white hover:bg-blue-50'}"
>
    <div
        class="h-5 w-1 rounded-full {active ? 'bg-blue-500' : 'bg-transparent'}"
    ></div>

    <div class="flex h-fit w-full flex-col items-start justify-center py-2">
        <p
            class="h-fit min-h-fit text-wrap text-start text-base font-medium {active
                ? 'text-slate-700'
                : 'text-slate-500'}"
        >
            {label}
        </p>
    </div>
    <div class="flex h-10 w-fit flex-col items-center justify-center px-1">
        <span class="text text-slate-300">
            <SvgGripIcon size="12"></SvgGripIcon>
        </span>
    </div>
</button>
