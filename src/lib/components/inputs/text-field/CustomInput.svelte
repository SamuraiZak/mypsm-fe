<script lang="ts">
    export let id: string = 'id';
    export let label: string = 'Label';
    export let subLabel: string = '';
    export let val: any;
    export let placeholder: string = '';
    export let valueType: string = 'text' || ' number' || 'password' || 'email' || 'textarea';
    export let required: boolean = false;
    export let errors: string[] | undefined = [] ?? undefined;
    export let vertical: boolean = true;
    export let noLabel: boolean = false;
    let obscureText: boolean = true;
</script>

<div
    class="flex w-full {vertical
        ? 'flex-col items-center justify-start gap-1'
        : 'flex-row items-start justify-start gap-2'} "
>
    <!-- label -->
    {#if !noLabel}
        <div
            class="flex {vertical
                ? 'min-h-5 w-full'
                : 'min-h-9 w-[320px]'} flex-col items-start justify-center"
        >
            {#if label != ''}
                <div
                    class="flex h-full w-full {vertical
                        ? 'flex-row'
                        : 'flex-col'}"
                >
                    <label
                        for={id}
                        class="w-full text-wrap text-start text-md font-medium leading-tight text-black"
                        >{label}
                        {#if required}
                            <span class="text text-red-600">*</span>
                        {/if}
                    </label>

                    {#if subLabel != ''}
                        <p
                            class="w-full text-wrap text-base font-medium text-gray-700"
                        >
                            {subLabel}
                        </p>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}

    <div class=" flex w-full flex-col">
        <!-- input -->
        <div
            class="flex h-9 w-full flex-row items-center justify-start gap-1 rounded border border-gray-300 px-2 focus-within:border-blue-500"
        >
            <!-- prefix -->
            <slot name="prefix" />

            {#if valueType == 'text'}
                <input
                    type="text"
                    {placeholder}
                    {id}
                    bind:value={val}
                    class="h-full w-full border-none bg-transparent px-0 text-md outline-none focus:ring-0"
                />
            {:else if valueType == 'email'}
                <input
                    type="email"
                    {placeholder}
                    {id}
                    bind:value={val}
                    class="h-full w-full border-none bg-transparent px-0 text-md outline-none focus:ring-0"
                />
            {:else if valueType == 'password'}
                {#if obscureText}
                    <input
                        type="password"
                        {placeholder}
                        {id}
                        bind:value={val}
                        class="h-full w-full border-none bg-transparent px-0 text-md outline-none focus:ring-0"
                    />
                {:else}
                    <input
                        type="text"
                        {placeholder}
                        {id}
                        bind:value={val}
                        class="h-full w-full border-none bg-transparent px-0 text-md outline-none focus:ring-0"
                    />
                {/if}

                <!-- toggle obscure text button starts here -->
                <button
                    type="button"
                    on:click={() => (obscureText = !obscureText)}
                    class="flex h-fit w-fit flex-col items-center justify-center text-blue-500"
                >
                    {#if !obscureText}
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
                <!-- toggle obscure text button ends here -->
            {/if}

            <!-- suffix -->
            <slot name="suffix" />
        </div>

        <!-- error -->
        <div
            class="flex h-fit min-h-5 w-full flex-col items-start justify-center"
        >
            {#if errors}
                <p class="text-base font-normal leading-tight text-red-500">
                    {errors}
                </p>
            {/if}
        </div>
    </div>
</div>
