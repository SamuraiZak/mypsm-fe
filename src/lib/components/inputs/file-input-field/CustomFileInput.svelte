<!-- FileInput.svelte -->
<!-- FileInput.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let value: File[] = [];
    const dispatch = createEventDispatcher();

    let inputElement: HTMLInputElement;

    // Function to handle file selection
    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            // Append new files to the existing value array
            for (let i = 0; i < input.files.length; i++) {
                value.push(input.files[i]);
            }
            dispatch('change', value); // Dispatch change event
        }
    }

    // Function to remove a file from the list
    function removeFile(index: number) {
        value.splice(index, 1); // Remove file from the value array
        dispatch('change', value); // Dispatch change event
    }

    // Function to clear all selected files
    function clearFiles() {
        value = []; // Clear the value array
        inputElement.value = ''; // Reset the input element
        dispatch('change', value); // Dispatch change event
    }

    onMount(() => {
        inputElement = document.getElementById(
            'file-upload',
        ) as HTMLInputElement;
    });
</script>

<!-- Rest of the component remains the same -->

<div class="space-y-4">
    <label for="file-upload" class="block text-sm font-medium text-gray-700">
        Upload Files
    </label>
    <input
        id="file-upload"
        type="file"
        multiple
        class="sr-only"
        accept="image/*,.pdf,.doc,.docx,.txt"
        on:change={handleFileChange}
    />
    <div class="flex items-center space-x-2">
        <button
            type="button"
            class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            on:click={() => inputElement.click()}
        >
            Add Files
        </button>
        <button
            type="button"
            class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            on:click={clearFiles}
            disabled={value.length === 0}
        >
            Clear Files
        </button>
    </div>

    {#if value.length > 0}
        <ul class="grid gap-1">
            {#each value as file, index (file.name)}
                <li
                    class="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2"
                >
                    <span class="truncate text-sm text-gray-800"
                        >{file.name}</span
                    >
                    <button
                        type="button"
                        class="text-red-500 hover:text-red-700"
                        on:click={() => removeFile(index)}
                    >
                        Remove
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
