<script lang="ts">
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import IconButton from '$lib/components/button/IconButton.svelte';

    export let label: string = 'Sila Muatnaik Dokumen Sokongan';
    export let id: string;
    export let disabled: boolean = false;
    export let files: FileList;

    function removeFile(fileToRemove: File) {
        const dt = new DataTransfer();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (file.name !== fileToRemove.name) dt.items.add(file);
            }
        }
        files = dt.files;
    }
</script>

<!-- <div class="flex w-full flex-col items-center justify-start gap-1">
    <div class="flex h-fit w-full flex-row items-center justify-between">
        <label
            for={id}
            class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
            >{label}</label
        >
    </div>

    <input id={id} type="file" multiple bind:files />
</div> -->
<div class="flex w-full flex-col items-center justify-start gap-1">
    <label
        for={id}
        class="flex w-full flex-col items-start justify-start gap-1"
    >
        <p
            class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
        >
            {label}
        </p>
        <div
            class="flex h-8 w-full flex-col items-center justify-center rounded border border-blue-300 bg-blue-100"
        >
            <p
                class="text-center align-bottom text-sm font-medium leading-tight text-blue-500"
            >
                Pilih Fail
            </p>
        </div>
    </label>

    <input
        {id}
        type="file"
        multiple
        bind:files
        class="hidden"
        accept="application/pdf"
    />
    {#if files}
        <div
            class="flex h-fit w-full flex-col items-center justify-start gap-1"
        >
            {#each Array.from(files) as file}
                <div
                    class="flex h-8 w-full flex-row items-center justify-start rounded border border-blue-300 bg-blue-100"
                >
                    <div
                        class="flex h-full w-8 flex-col items-center justify-center"
                    >
                        <span class="text-ios-activeColors-activeBlue-light">
                            <SvgDocument></SvgDocument>
                        </span>
                    </div>
                    <div
                        class="flex h-full w-full flex-col items-start justify-center"
                    >
                        <p
                            class="text-center align-bottom text-sm font-medium leading-tight text-blue-500"
                        >
                            {file.name}
                        </p>
                    </div>
                    <div
                        class="flex h-full w-8 flex-col items-center justify-center"
                    >
                        <IconButton
                            onClick={() => {
                                removeFile(file);
                            }}
                        >
                            <SvgXMark></SvgXMark>
                        </IconButton>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
