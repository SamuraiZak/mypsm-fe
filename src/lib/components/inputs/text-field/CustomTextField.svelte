<script lang="ts">
    export let label: string = 'Label';
    export let id: string;
    export let val: string;
    export let placeholder: string = 'Taip jawapan anda di sini';
    export let type: string = 'text' || 'number' || 'password' || 'email';
    export let errors: string[] | undefined = [''] ?? undefined;
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- input label starts here -->
    <label
        for="password"
        class="block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
        >{label}</label
    >
    <!-- input label ends here -->

    <!-- input field starts here -->

    <!-- text input field -->
    {#if type == 'number'}
        <input
            bind:value={val}
            {placeholder}
            type="number"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {:else if type == 'password'}
        <input
            bind:value={val}
            {placeholder}
            type="password"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
        />
    {:else if type == 'email'}
        <input
            bind:value={val}
            {placeholder}
            type="email"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {:else}
        <input
            bind:value={val}
            {placeholder}
            type="text"
            name={id}
            {id}
            class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light p-2 text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
    {/if}

    <!-- input field ends here -->

    <!-- input error message starts here -->
    <div class="flex h-3 w-full flex-row items-center justify-end">
        {#if errors}
            <p
                class="text-end text-sm font-medium italic leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
    <!-- input error message ends here -->
</div>
