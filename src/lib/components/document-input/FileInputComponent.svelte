<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    // Define the DocumentDTO type
    type DocumentDTO = {
        base64: string;
        name: string;
    };

    // Declare the prop for the documents
    export let documents: DocumentDTO[] = [];

    // Handle the file input change event
    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const fileArray = Array.from(input.files);
            const newDocuments = await Promise.all(
                fileArray.map(async (file) => {
                    const base64 = await convertToBase64(file);
                    return { name: file.name, base64 };
                }),
            );
            documents = [...documents, ...newDocuments];
            dispatch('documentsChange', { documents });
        }
    }

    // Remove a specific file
    function removeFile(index: number) {
        documents = documents.filter((_, i) => i !== index);
        dispatch('documentsChange', { documents });
    }

    // Remove all files
    function removeAllFiles() {
        documents = [];
        dispatch('documentsChange', { documents });
    }

    // Convert file to base64 string
    function convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    // Function to trigger the file input click
    function triggerFileInput() {
        document.getElementById('fileInput')?.click();
    }
</script>

<div class="file-input w-full">
    <input
        id="fileInput"
        type="file"
        multiple
        class="hidden-input"
        on:change={handleFileChange}
    />
    <button type="button" class="file-input-button" on:click={triggerFileInput}>
        Select Files
    </button>

    {#if documents.length > 0}
        <div class="mt-4 space-y-4">
            {#each documents as document, index}
                <div
                    class="flex items-center justify-between rounded-lg border p-4"
                >
                    <div>
                        <p class="text-gray-800">{document.name}</p>
                    </div>
                    <button
                        type="button"
                        class="text-red-500 hover:text-red-700"
                        on:click={() => removeFile(index)}
                    >
                        <svg
                            class="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6L18 18"
                            ></path>
                        </svg>
                    </button>
                </div>
            {/each}
            <button
                type="button"
                class="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                on:click={removeAllFiles}
            >
                Remove All Files
            </button>
        </div>
    {/if}
</div>

<style>
    .hidden-input {
        display: none;
    }

    .file-input-button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #4a90e2;
        color: white;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .file-input-button:hover {
        background-color: #357abd;
    }
</style>
