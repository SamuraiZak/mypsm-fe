<script lang="ts">
    export let label: string = 'Sila Muatnaik Dokumen Sokongan';
    export let id: string;
    // export let disabled: boolean = false;
    export let files: FileList;
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <div class="flex w-full flex-col items-start justify-start gap-1">
        <p
            class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
        >
            {label}
        </p>
    </div>
    <div
        class="flex h-8 w-full items-center justify-start rounded border border-ios-systemColors-systemFill-dark bg-ios-basic-lightBackgroundGray"
    >
        <div class="flex w-3/4">
            {#if files}
                {#each Array.from(files) as file}
                    <div
                        class="flex h-full w-full flex-col items-start justify-center px-3"
                    >
                        <p
                            class="text-center align-bottom text-sm font-medium leading-tight"
                        >
                            {file.name}
                        </p>
                    </div>
                {/each}
            {/if}
        </div>

        <div
            class="flex h-full w-1/4 items-center justify-center rounded-l-md hover:bg-ios-systemColors-systemFill-dark bg-ios-labelColors-tertiaryLabel-light px-3"
        >
            <label
                for={id}
                class="flex h-full w-full items-center justify-center text-center text-[13px] font-medium leading-tight text-ios-basic-darkBackgroundGray"
            >
                Pilih Fail
                <input
                    {id}
                    type="file"
                    multiple
                    bind:files
                    class="hidden"
                    accept="application/pdf"
                />
            </label>
        </div>
    </div>
</div>
