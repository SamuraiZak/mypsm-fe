<script lang="ts">
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let label: string = 'Label';
    export let id: string = 'doumentInputId';
    export let disabled: boolean = false;
    export let isRequired: boolean = true;
    export let documents: DocumentDTO[] = [];
    export let errors: string[] | undefined = [] ?? undefined;

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
            reader.onload = () =>
                resolve(
                    (reader.result as string).replaceAll(
                        'data:application/pdf;base64,',
                        '',
                    ),
                );
            reader.onerror = (error) => reject(error);
        });
    }

    // Function to trigger the file input click
    function triggerFileInput() {
        document.getElementById(id)?.click();
    }
</script>

<div class="flex w-full flex-col items-start justify-start gap-1 pb-6">
    <div class="flex h-fit w-full flex-row items-start justify-start">
        <label
            for="password"
            class="block w-full text-start text-base font-medium leading-tight text-slate-700"
            >{label}
            <span class="text-base text-system-danger" hidden={!isRequired}
                >*</span
            >
        </label>
    </div>
    <input
        {id}
        type="file"
        multiple
        class="hidden"
        on:change={handleFileChange}
    />

    {#if !disabled}
        <div
            class="group flex w-full flex-col items-start justify-start rounded-lg border border-dashed border-gray-300 p-1 hover:border-blue-400"
        >
            <button
                type="button"
                on:click={triggerFileInput}
                class="flex h-14 min-h-14 w-full flex-col items-center justify-center rounded-md bg-slate-100 px-4 group-hover:bg-blue-200"
            >
                <p
                    class="w-full text-center text-base font-semibold text-blue-600 group-hover:scale-105"
                >
                    + Tambah Fail
                </p>
            </button>
        </div>
    {/if}

    {#if documents.length > 0}
        <div
            class="flex h-8 min-h-8 w-full flex-row items-center justify-between"
        >
            <p class="text-start text-base font-medium text-slate-500">
                Senarai dokumen yang dipilih
            </p>
            {#if !disabled}
                <button
                    type="button"
                    class="text-base font-medium text-red-500 underline"
                    on:click={removeAllFiles}
                >
                    Buang Semua Dokumen
                </button>
            {/if}
        </div>
        <div class="flex w-full flex-col items-start justify-start gap-1">
            {#each documents as document, index}
                <div
                    class="flex h-8 min-h-8 w-full flex-row items-center justify-between rounded border bg-gray-50 px-2 hover:bg-gray-100"
                >
                    <div
                        class="flex h-8 w-8 flex-col items-center justify-center"
                    >
                        <p
                            class="text-start text-base font-medium text-slate-600"
                        >
                            {index + 1}.
                        </p>
                    </div>
                    <div
                        class="flex h-8 w-8 flex-col items-center justify-center"
                    >
                        <span>
                            <SvgDocument></SvgDocument>
                        </span>
                    </div>
                    <div
                        class="flex w-full flex-row items-center justify-start"
                    >
                        <p
                            class="text-start text-base font-medium text-slate-600"
                        >
                            {document.name}
                        </p>
                    </div>

                    {#if !disabled}
                        <button
                            type="button"
                            class="text-red-500 hover:text-red-700"
                            on:click={() => removeFile(index)}
                        >
                            <svg
                                width="15"
                                height="15"
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
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <div
            class="flex h-8 min-h-8 w-full flex-row items-center justify-between rounded border bg-gray-50 px-2 hover:bg-gray-100"
        >
            <div class="flex h-8 w-8 flex-col items-center justify-center">
                <span class="text-gray-400">
                    <SvgInfoSolid size="20"></SvgInfoSolid>
                </span>
            </div>
            <div class="flex w-full flex-row items-center justify-start">
                <p class="text-start text-base font-medium text-slate-600">
                    Tiada dokumen telah dimuat naik.
                </p>
            </div>
        </div>
    {/if}
    <div class="flex h-fit min-h-5 w-full flex-row items-center justify-start">
        {#if errors && !disabled}
            <p
                class="text-start text-sm font-medium leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
</div>
