<script lang="ts">
    export let id: string = '123';
    export let label: string = '';
    export let placeholder: string = 'Taip jawapan anda di sini...';
    export let required: boolean = true;
    export let valueType: string = 'text';
    export let errors: string[] | undefined = [] ?? undefined;
    let showValue: boolean = false;

    $: type =
        valueType == 'password' ? (showValue ? 'text' : 'password') : valueType;
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- label -->
    <div class="flex min-h-5 w-full flex-col items-start justify-center">
        {#if label != ''}
            <label
                for={id}
                class="w-full text-wrap text-start text-md font-medium leading-tight text-black"
                >{label}
                {#if required}
                    <span class="text text-red-600">*</span>
                {/if}
            </label>
        {/if}
    </div>

    <!-- input -->
    <div
        class="flex h-9 w-full flex-row items-center justify-start rounded border border-gray-300 px-2 focus-within:border-blue-500"
    >
        <slot name="prefix" />
        <input
            {type}
            {placeholder}
            {id}
            class="h-full w-full border-none bg-transparent px-0 text-md outline-none focus:ring-0"
        />

        {#if valueType == 'password'}
            <button
                on:click={() => (showValue = !showValue)}
                class="flex h-fit w-fit flex-col items-center justify-center text-blue-500"
            >
                {#if !showValue}
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <line
                            x1="1"
                            y1="1"
                            x2="23"
                            y2="23"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                {:else}
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                {/if}
            </button>
        {:else}
            <slot name="suffix" />
        {/if}
    </div>

    <!-- error -->
    <div class="flex h-fit min-h-5 w-full flex-col items-start justify-center">
        {#if errors}
            <p class="text-base font-normal leading-tight text-red-500">
                {errors}
            </p>
        {/if}
    </div>
</div>
