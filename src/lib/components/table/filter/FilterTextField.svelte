<script lang="ts">
    export let inputValue: string = '';
    export let label: string = 'Label';
    export let inputId: string = 'input';
    export let disabled: boolean = false;
</script>

<div class="h-fit w-52 min-w-52 max-w-52 gap-px px-2">
    <label
        for={inputId}
        class="block text-base font-medium text-ios-labelColors-label-light h-5"
    >
        {label}
    </label>
    <input
        {disabled}
        id={inputId}
        type="text"
        bind:value={inputValue}
        class="autofill:hide-default-inner-shadow focus:ring-none block h-7 w-full rounded-[3px] border border-ios-labelColors-separator-light p-2.5 text-base hover:border-ios-activeColors-activeBlue-light focus:border-ios-activeColors-activeBlue-light focus:ring-0 {disabled
            ? 'bg-ios-systemColors-quaternarySystemFill-light'
            : 'bg-ios-basic-white'}"
    />
</div>
