<script lang="ts">
    export let id = 'target';
    export let handleOnInput = () => {};
    export let label: string = '';
</script>

<div class="flex w-full flex-row items-center">
    <div
        class="w-[220px] min-w-[220px] flex-row gap-2 {label == ''
            ? 'hidden'
            : ''}"
    >
        <label for="" class="text-sm text-txt-secondary"> {label}</label>
    </div>

    <input
        on:input={handleOnInput}
        type="file"
        {id}
        class=" z-[-1] h-[0.001px] w-[0.001px] overflow-hidden opacity-0"
        multiple
        accept=".pdf"
        data-multiple-caption="files selected"
    />
    <label
        for={id}
        class="flex h-8 cursor-pointer flex-row items-center rounded-[3px] border border-solid border-bdr-primary bg-bgr-primary px-2 py-1 text-[12px] text-system-primary hover:border-system-primary hover:bg-bgr-secondary {label ==
        ''
            ? ''
            : 'w-full'}"
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5 text-system-primary"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>Tambah Fail</label
    >
</div>
