<script lang="ts">
    let active: boolean = false;
    export let value = '';
    export let selectedValue = '';

    export let handleSelect = () => {};
    $: {
        active = value == selectedValue;
    }
</script>

<button
    on:click={handleSelect}
    class="flex h-full max-h-24 w-full flex-col items-center justify-start overflow-hidden rounded border p-2 font-medium hover:border-ios-systemColors-systemBlue-light bg-ios-basic-white hover:text-ios-systemColors-systemBlue-light {active
        ? 'border-ios-systemColors-systemBlue-light text-ios-systemColors-systemBlue-light'
        : 'text-ios-basic-inactiveGray'}"
>
    <div class="flex h-12 w-full flex-col items-center justify-center">
        <span class="">
            <slot name="icon" />
        </span>
    </div>
    <div class="flex h-fit w-full flex-col items-center justify-center">
        <span class="text-sm {active ? 'font-semibold' : 'font-normal'} leading-tight"> <slot /> </span>
    </div>
</button>
