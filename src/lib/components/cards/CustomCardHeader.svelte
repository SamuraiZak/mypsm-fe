<script lang="ts">
    export let title: string = 'Card Title';
</script>

<!-- card header -->
<div
    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row justify-between border-b border-bdr-primary px-2.5"
>
    <!-- leading -->
    <div class="flex h-full flex-row items-center justify-start gap-1">
        <p class="text-sm font-semibold text-txt-primary">{title}</p>
    </div>
    <!-- trailing -->
    <div class="flex h-full flex-row items-center justify-end gap-1">
        <slot />
    </div>
</div>
