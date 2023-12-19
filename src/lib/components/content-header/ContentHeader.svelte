<script lang="ts">
    export let title = 'Page Title';
    export let description = 'Put your description of the page here';
    export let borderClass = '';
    let defaultBorderClass = 'border-b border-bdr-primary';
</script>

<div
    class="sticky top-0 z-10 flex h-[50px] min-h-[50px] w-full flex-row justify-between bg-bgr-primary {borderClass ==
    ''
        ? defaultBorderClass
        : borderClass}"
>
    <!-- leading -->
    <div class="h-full px-2.5">
        <div
            class="inline-flex h-full shrink grow basis-0 flex-col items-start justify-center"
        >
            <div class="flex flex-col justify-center self-stretch">
                <span class="text-base font-semibold text-txt-primary"
                    >{title}</span
                >
            </div>
            <div class="flex flex-col justify-center self-stretch">
                <span class="text-sm font-normal text-txt-secondary"
                    >{description}</span
                >
            </div>
        </div>
    </div>
    <div class="h-full px-2.5">
        <div
            class="inline-flex h-full shrink grow basis-0 flex-row items-center justify-end gap-1"
        >
            <slot />
        </div>
    </div>
</div>
