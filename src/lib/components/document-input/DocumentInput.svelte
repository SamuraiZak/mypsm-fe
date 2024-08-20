<script lang="ts">
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import SvgPdfColor from '$lib/assets/svg/SvgPDFColor.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let dispatchName: string = 'dispatchName';

    export let label: string = 'Label';
    export let id: string = 'doumentInputId';
    export let disabled: boolean = false;
    export let isRequired: boolean = true;
    export let documents: DocumentDTO[] = [];
    export let errors: string[] | undefined = [] ?? undefined;

    // Handle the file input change event
    async function handleFileChange(event: Event) {
        console.log('add');
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
            dispatch(dispatchName, { documents });
        }
        console.log(documents);
    }

    // Remove a specific file
    function removeFile(index: number) {
        documents = documents.filter((_, i) => i !== index);
        dispatch(dispatchName, { documents });
    }

    // Remove all files
    function removeAllFiles() {
        documents = [];
        dispatch(dispatchName, { documents });
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

    function viewFile(base64: string) {
        const fileUrl = `${base64}`;
        window.open(fileUrl, '_blank');
    }
</script>

<div class="flex w-full flex-col items-start justify-start gap-2 pb-6">
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
            class="group flex w-full flex-col items-start justify-start rounded-lg border-2 border-dashed border-gray-300 p-1 hover:border-blue-400"
        >
            <button
                type="button"
                on:click={triggerFileInput}
                class="flex h-fit min-h-14 w-full flex-col items-center justify-center rounded-md bg-white p-6 group-hover:bg-blue-50"
            >
                <div
                    class="flex h-8 w-8 flex-col items-center justify-center group-hover:scale-105"
                >
                    <span class="text-slate-500">
                        <SvgPlus size="30"></SvgPlus>
                    </span>
                </div>
                <p
                    class="w-full text-center text-md font-medium text-slate-600 group-hover:scale-105"
                >
                    Muat Naik Dokumen
                </p>
                <p
                    class="w-full text-center text-base font-medium text-blue-600 group-hover:scale-105"
                >
                    Klik Di Sini
                </p>
            </button>
        </div>
    {/if}

    {#if documents !== undefined}
        {#if documents.length > 0}
            <div
                class="flex h-8 min-h-8 w-full flex-row items-center justify-between"
            >
                <p class="text-start text-base font-medium text-slate-500">
                    {#if disabled}
                        Senarai dokumen yang telah dimuatnaik
                    {:else}
                        Senarai dokumen yang dipilih
                    {/if}
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
            <div class="flex w-full flex-col items-start justify-start gap-2">
                {#each documents as document, index}
                    <div
                        class="flex h-fit min-h-8 w-full flex-row items-center justify-between gap-2 rounded-md border bg-white p-3 shadow shadow-slate-100
                     hover:shadow-md"
                    >
                        <div
                            class="flex h-8 w-8 flex-col items-center justify-center"
                        >
                            <span>
                                <SvgPdfColor size="30"></SvgPdfColor>
                            </span>
                        </div>
                        <div
                            class="flex w-full flex-row items-center justify-start"
                        >
                            <p
                                class="text-start text-md font-medium text-slate-600"
                            >
                                {document.name}
                            </p>
                        </div>
                        <a
                            href={document.base64}
                            class="text-red-500 hover:text-red-700"
                            target="_blank"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 512 512"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                fill="#000000"
                                ><g id="SVGRepo_bgCarrier" stroke-width="0"
                                ></g><g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g><g id="SVGRepo_iconCarrier">
                                    <title>open-external</title>
                                    <g
                                        id="Page-1"
                                        stroke="none"
                                        stroke-width="1"
                                        fill="none"
                                        fill-rule="evenodd"
                                    >
                                        <g
                                            id="icon"
                                            fill="#000000"
                                            transform="translate(85.333333, 64.000000)"
                                        >
                                            <path
                                                d="M128,63.999444 L128,106.666444 L42.6666667,106.666667 L42.6666667,320 L256,320 L256,234.666444 L298.666,234.666444 L298.666667,362.666667 L4.26325641e-14,362.666667 L4.26325641e-14,64 L128,63.999444 Z M362.666667,1.42108547e-14 L362.666667,170.666667 L320,170.666667 L320,72.835 L143.084945,249.751611 L112.915055,219.581722 L289.83,42.666 L192,42.6666667 L192,1.42108547e-14 L362.666667,1.42108547e-14 Z"
                                                id="Combined-Shape"
                                            >
                                            </path>
                                        </g>
                                    </g>
                                </g></svg
                            >
                        </a>
                        {#if !disabled}
                            <button
                                type="button"
                                class="text-red-500 hover:text-red-700"
                                on:click={() => removeFile(index)}
                            >
                                <svg
                                    width="20"
                                    height="20"
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
                    <p
                        class="text-start text-base font-medium italic text-slate-600"
                    >
                        Tiada dokumen telah dimuat naik.
                    </p>
                </div>
            </div>
        {/if}
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
                <p
                    class="text-start text-base font-medium italic text-slate-600"
                >
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
