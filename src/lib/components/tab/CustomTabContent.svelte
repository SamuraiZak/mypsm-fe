<script lang="ts">
    export let title: string = 'Title';
    export let paddingClass = 'p-2.5';
</script>

<div
    id={title}
    class="flex h-full max-h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto {paddingClass}"
>
    <slot />
</div>
