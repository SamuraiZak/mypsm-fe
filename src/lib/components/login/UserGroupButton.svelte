<script lang="ts">
    let active: boolean = false;
    export let value = '';
    export let selectedValue = '';
    $: {
        active = value == selectedValue;
    }
</script>

<button
    on:click={() => {
        selectedValue = value;
    }}
    class="flex h-full max-h-24 overflow-hidden w-full flex-col items-center justify-between rounded border p-2 font-medium text-ios-labelColors-secondaryLabel-light hover:border-ios-systemColors-systemBlue-light hover:text-ios-systemColors-systemBlue-light {active
        ? 'border-ios-systemColors-systemBlue-light text-ios-systemColors-systemBlue-light'
        : ''}"
>
    <div class="flex h-12 w-full flex-col items-center justify-center">
        <span class="">
            <slot name="icon" />
        </span>
    </div>
    <div class="flex h-fit w-full flex-col items-center justify-center">
        <span class="text-sm leading-tight"> <slot /> </span>
    </div>
</button>
