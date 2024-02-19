<script lang="ts">
    export let title: string = 'Stepper title';
</script>

<div
    id={title}
    class="flex h-[50px] max-h-[50px] min-h-[50px] w-full flex-row items-center justify-between border-b border-bdr-primary px-2.5"
>
    <div class="flex h-full max-h-full flex-row items-center justify-start">
        <p class="text-sm font-semibold text-txt-primary">{title}</p>
    </div>
    <div class="flex h-full max-h-full flex-row items-center justify-end gap-1">
        <slot />
    </div>
</div>
