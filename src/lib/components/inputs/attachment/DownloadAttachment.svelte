<script lang="ts">
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgArrowDownTray from '$lib/assets/svg/SvgArrowDownTray.svelte';

    export let id = '';
    export let label = '';
    export let fileName: string = 'Filename.pdf';
    export let triggerDownload = () => {};
</script>

{#if label !== ''}
    <div class="flex w-full flex-col items-start justify-start">
        <label for={id} class="block w-fit text-[11px] font-medium">
            {label}
        </label>
        <button
            on:click={triggerDownload}
            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
        >
            <div class="flex gap-2">
                <SvgDocument /><span>{fileName}</span>
            </div>
            <div><SvgArrowDownTray /></div>
        </button>
    </div>
{:else if label === ''}
    <button
        on:click={triggerDownload}
        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
    >
        <div class="flex gap-2">
            <SvgDocument /><span>{fileName}</span>
        </div>
        <div><SvgArrowDownTray /></div>
    </button>
{/if}
