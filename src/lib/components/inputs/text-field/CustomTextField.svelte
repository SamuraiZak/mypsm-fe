<script lang="ts">
    import SvgEyeClose from '$lib/assets/svg/SvgEyeClose.svelte';
    import SvgEyeOpen from '$lib/assets/svg/SvgEyeOpen.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';

    export let label: string = 'Label';
    export let id: string;
    export let disabled: boolean = false;
    export let val: string | number | Date | boolean | null | undefined;
    export let placeholder: string = 'Taip jawapan anda di sini';
    export let type: string = 'text' || 'number' || 'password' || 'email';
    export let errors: string[] | undefined = [] ?? undefined;

    let showPassword = false;
    $: valueType = showPassword ? 'text' : 'password';
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- input label starts here -->
    <div class="flex h-fit w-full flex-row items-center justify-between">
        <label
            for="password"
            class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
            >{label}</label
        >
        {#if type == 'password'}
            <button
                type="button"
                class="text w-fit text-ios-activeColors-activeBlue-light"
                on:click={() => {
                    showPassword = !showPassword;
                }}
            >
                <span class="w-fit text-nowrap text-sm leading-tight">
                    {#if showPassword}
                        Sembunyi
                    {:else}
                        Papar
                    {/if}
                </span>
            </button>
        {/if}
    </div>
    <!-- input label ends here -->

    <!-- input field starts here -->

    <!-- text input field -->
    {#if type == 'number'}
        <input
            bind:value={val}
            {disabled}
            {placeholder}
            type="number"
            name={id}
            {id}
            step="0.01"
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
                ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                : 'bg-ios-backgroundColors-systemBackground-light'} p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {:else if type == 'password'}
        {#if showPassword}
            <input
                bind:value={val}
                {disabled}
                {placeholder}
                type="text"
                name={id}
                {id}
                class="autofill:hide-default-inner-shadow block {disabled
                    ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                    : 'bg-ios-backgroundColors-systemBackground-light'} h-8 w-full rounded border border-ios-labelColors-separator-light p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            />
        {:else}
            <input
                bind:value={val}
                {disabled}
                {placeholder}
                type="password"
                name={id}
                {id}
                class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
                    ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                    : 'bg-ios-backgroundColors-systemBackground-light'} p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            />
        {/if}
    {:else if type == 'email'}
        <input
            bind:value={val}
            {disabled}
            {placeholder}
            type="email"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
                ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                : 'bg-ios-backgroundColors-systemBackground-light'} p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {:else if type == 'date'}
        <input
            bind:value={val}
            {disabled}
            {placeholder}
            type="date"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
                ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                : 'bg-ios-backgroundColors-systemBackground-light'} p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {:else}
        <input
            bind:value={val}
            {disabled}
            {placeholder}
            type="text"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
                ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                : 'bg-ios-backgroundColors-systemBackground-light'} p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {/if}

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
