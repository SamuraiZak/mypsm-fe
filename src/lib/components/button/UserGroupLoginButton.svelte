<script lang="ts">
    export let label: string = 'Label';
    export let value: string = 'value';
    export let currentValue: string = 'currentValue';

    $: active = value == currentValue;

    export let handleClick = () => {};
</script>

<button
    on:click={() => {
        handleClick();
    }}
    class="flex h-10 w-full flex-row items-center justify-start gap-2 rounded {active
        ? 'bg-blue-100 hover:bg-blue-200'
        : 'bg-transparent hover:bg-blue-50'} p-2"
>
    {#if active}
        <div class="h-6 w-1 rounded bg-ios-activeColors-activeBlue-light"></div>
    {/if}
    <div class="flex h-full w-full flex-row items-center justify-start">
        <p
            class="text-base {active
                ? 'font-medium text-ios-activeColors-activeBlue-light'
                : 'font-normal text-ios-labelColors-label-light'} "
        >
            {label}
        </p>
    </div>
</button>
