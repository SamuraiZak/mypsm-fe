<script lang="ts">
    export let title = 'Table Title';
</script>

<div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
<div
    class="flex h-full max-h-full w-full flex-col justify-start overflow-x-hidden"
>
    <p class="pb-2.5 text-sm font-semibold">{title}</p>

    <!-- table -->
    <div class="h-full max-h-full w-full overflow-x-auto overflow-y-auto">
        <div class="h-fit bg-bgr-primary">
            <table>
                <slot />
            </table>
        </div>
    </div>
</div>
</div>
