<script lang="ts">
    export let color: string = '';
    export let title: string = '';
    export let subTitle: string = '';
</script>

<div
    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
>
    <div class="flex h-full max-h-full flex-col items-start justify-center">
        {#if title != ''}
            <p
                class="text-sm font-semibold {color === 'system-primary'
                    ? 'text-system-primary'
                    : 'text-txt-primary'}"
            >
                {title}
            </p>
        {/if}
        {#if subTitle != ''}
            <p class="text-sm font-normal text-txt-secondary">{subTitle}</p>
        {/if}
    </div>
    <div
        class="flex h-full max-h-full flex-row items-center justify-end gap-2.5"
    >
        <slot />
    </div>
</div>
