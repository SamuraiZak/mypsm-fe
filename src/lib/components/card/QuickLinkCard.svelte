<script lang="ts">
    import { goto } from '$app/navigation';
    import { Badge } from 'flowbite-svelte';
    export let title: string = 'Title';
    export let agendaCount: number = 0;
    export let url: string = '';
</script>

<button
    on:click={() => {
        goto(url);
    }}
    class="col-span-1 flex h-fit min-w-48 flex-row items-center justify-start gap-1.5 rounded-md border p-1.5 hover:shadow"
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
        class="flex h-fit gap-1 w-full max-w-full flex-col items-start justify-center overflow-hidden"
    >
        <span
            class="w-full truncate text-ellipsis text-start text-base font-semibold text-ios-labelColors-label-light"
        >
            {title}
        </span>
        <div
            class="flex h-fit w-full flex-row items-center justify-start gap-2"
        >
            <Badge color={agendaCount > 0 ? 'yellow' : 'dark'}>
                {#if agendaCount > 0}
                    {agendaCount} Agenda
                {:else}
                    Tiada agenda
                {/if}
            </Badge>
        </div>
    </div>

    <!-- content ends here -->
</button>
