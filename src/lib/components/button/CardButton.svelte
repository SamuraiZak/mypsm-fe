<script lang="ts">
    export let title: string = 'Title';
    export let subtitle: string = 'Subtitle';
    export let onClick = () => {};
</script>

<button
    on:click={onClick}
    class="flex h-fit min-w-48 flex-row items-center justify-start gap-1.5 col-span-1 rounded-md border p-1.5 hover:shadow"
>
    <!-- icon starts here -->
    <div
        class="flex h-10 min-h-10 w-10 min-w-10 flex-col items-center justify-center rounded bg-ios-systemColors-quaternarySystemFill-light"
    >
        <span class=" text-ios-labelColors-label-light">
            <slot name="icon" />
        </span>
    </div>

    <!-- icon ends here -->

    <!-- content starts here -->
    <div
        class="flex h-10 max-h-10 w-fit max-w-full flex-col items-start justify-center"
    >
        <span class="text-base font-semibold text-ios-labelColors-label-light text-nowrap">
            {title}
        </span>
        <span
            class="text-sm font-normal text-nowrap text-ios-labelColors-secondaryLabel-light"
        >
            {subtitle}
        </span>
    </div>

    <!-- content ends here -->
</button>
