<script lang="ts">
    export let borderClass: string = '';
</script>

<div
    class="flex w-full max-w-full flex-col items-center justify-start rounded-[3px] border {(borderClass =
        '' ? 'border-bdr-primary' : borderClass)}  bg-bgr-primary"
>
    <slot />
</div>
