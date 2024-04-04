<script lang="ts">
    export let label: string = 'Label';
    export let onClick = () => {};
    export let icon: boolean = false;
</script>

<button
    on:click={() => {
        onClick();
    }}
    class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0"
>
    {#if icon}
        <!-- icon -->
        <div class="flex h-full flex-row items-center justify-center">
            <span class="leading-loose">
                <!-- icon slot -->
                <slot name="icon" />
            </span>
        </div>
    {/if}

    <!-- label -->
    <div class="flex h-full flex-row items-center justify-center">
        <p class="text-sm font-medium leading-loose">{label}</p>
    </div>
</button>
