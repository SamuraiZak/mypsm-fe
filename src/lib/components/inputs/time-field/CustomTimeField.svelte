<script lang="ts">
    export let label: string = 'label';
    export let id: string = 'thisId';
    export let disabled: boolean = false;
    export let val: string;
    export let placeholder: string = 'Taip jawapanan anda di sini';

    export let errors: string[] | undefined = [] ?? undefined;
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- input label starts here -->
    <div class="flex h-fit w-full flex-row items-center justify-between">
        <label
            for={id}
            class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
            >{label}</label
        >
    </div>
    <!-- input label ends here -->

    <input
        bind:value={val}
        {disabled}
        {placeholder}
        type="time"
        name={id}
        {id}
        class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
            ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
            : 'bg-ios-backgroundColors-systemBackground-light'} p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />

    <!-- input field ends here -->

    <!-- input error message starts here -->
    <div class="flex h-3 w-full flex-row items-center justify-start">
        {#if errors}
            <p
                class="text-end text-sm font-medium leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
    <!-- input error message ends here -->
</div>
