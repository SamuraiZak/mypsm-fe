<script lang="ts">
    export let valueType: string = 'text' || 'number';
    export let val: any = 'text';
    export let addFunction = () => {};
    export let removeFunction = () => {};
    export let editFunction = () => {};
    export let hasAdd: boolean = false;
    export let hasRemove: boolean = false;

    let editing = false;

    function startEditing() {
        editing = true;
    }

    function stopEditing() {
        if (valueType == 'string') {
            if (val == '') {
                val = 'No data';
            }
        } else {
            if (val == null || val == undefined) {
                val = 0.0;
            }
        }

        editFunction();
        editing = false;
    }
</script>

<div
    class="group flex min-h-14 flex-row items-center justify-center bg-white p-1"
>
    <div class="flex h-full w-full flex-col items-center justify-center">
        {#if editing}
            {#if valueType == 'text'}
                <input
                    on:blur={() => {
                        stopEditing();
                    }}
                    autofocus
                    bind:value={val}
                    type="text"
                    class="h-full w-full text-wrap border-none text-center text-base font-normal focus:ring-0"
                />
            {:else}
                <input
                    on:blur={() => {
                        stopEditing();
                    }}
                    autofocus
                    bind:value={val}
                    type="number"
                    class="h-full w-full text-wrap border-none text-center text-base font-normal focus:ring-0"
                />
            {/if}
        {:else}
            <button
                class="flex h-full w-full cursor-text flex-col items-center justify-center"
                on:click={() => {
                    startEditing();
                }}
            >
                <p
                    class="w-full text-wrap text-center text-base font-normal leading-tight"
                >
                    {#if valueType == 'text'}
                        {val}
                    {:else}
                        {val.toFixed(2)}
                    {/if}
                </p>
            </button>
        {/if}
    </div>

    {#if hasAdd || hasRemove}
        <div
            class="hidden h-full w-fit flex-col items-center justify-center gap-1 group-hover:flex"
        >
            {#if hasAdd}
                <button
                    class="rounded-xl bg-gray-100 p-0.5 text-gray-500"
                    on:click={() => {
                        addFunction();
                    }}
                >
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 5V19"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M5 12H19"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            {/if}

            {#if hasRemove}
                <button
                    class="rounded-xl bg-gray-100 p-0.5 text-gray-500"
                    on:click={() => {
                        removeFunction();
                    }}
                >
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            {/if}
        </div>
    {/if}
</div>
