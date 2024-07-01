<script lang="ts">
    export let id: string = '';
    export let label: string = 'Label';
    export let placeholder: string = 'Enter text here...';
    export let errors: string[] | undefined = [] ?? undefined;
    let show_password: boolean = false;
    $: type = show_password ? 'text' : 'password';
</script>

<div class="flex h-fit w-full flex-col items-start justify-start gap-1">
    <!-- label -->
    <div class="flex h-fit min-h-5 w-full flex-col items-start justify-center">
        <label for={id} class="text text-wrap text-md font-medium leading-tight"
            >{label}</label
        >
    </div>

    <!-- input -->

    <div
        class="flex h-9 w-full items-center rounded border border-gray-300 px-2 focus-within:border-blue-500"
    >
        <slot name="prefix-icon" />
        <input
            {type}
            class="h-full w-full rounded border-none bg-transparent px-0 text-md outline-none focus:ring-0"
            {placeholder}
        />
        <button
            on:click={() => (show_password = !show_password)}
            class="flex h-fit w-fit flex-col items-center justify-center text-blue-500"
        >
            {#if !show_password}
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
