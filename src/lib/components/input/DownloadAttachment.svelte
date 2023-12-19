<script lang="ts">
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgArrowDownTray from '$lib/assets/svg/SvgArrowDownTray.svelte';

    export let id = '';
    export let label = '';
    export let fileName: string = 'Filename.pdf';
</script>

{#if label !== ''}
    <div class="flex w-full flex-row items-center justify-between">
        <label
            for={id}
            class="block w-[220px] min-w-[220px] text-[11px] font-medium"
        >
            {label}
        </label>
        <div
            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
        >
            <div class="flex gap-2">
                <SvgDocument /><span>{fileName}</span>
            </div>
            <div><SvgArrowDownTray /></div>
        </div>
    </div>
{:else if label === ''}
    <div
        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
    >
        <div class="flex gap-2">
            <SvgDocument /><span>{fileName}</span>
        </div>
        <div><SvgArrowDownTray /></div>
    </div>
{/if}
