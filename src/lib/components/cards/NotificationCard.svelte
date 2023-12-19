<script lang="ts">
    import { Card } from 'flowbite-svelte';
    export let href = '#';
    export let subject = 'Subject';
    export let title = 'Title';
    export let user = 'User';
    export let duration = 'Duration';
</script>

<Card
    {href}
    class="flex w-full flex-col justify-start gap-2 rounded-[3px] border border-bdr-primary bg-bgr-secondary py-1 shadow-none"
    padding="none"
>
    <!-- card header -->
    <div class="flex w-full flex-row justify-start px-2.5">
        <p class="text-sm font-normal text-txt-tertiary">
            {subject}
        </p>
    </div>

    <!-- card content -->
    <div class="flex flex-col items-start justify-center">
        <!-- card title -->
        <div class="flex w-full flex-row justify-start px-2.5">
            <p class="truncate text-sm font-semibold text-txt-primary">
                {title.toUpperCase()}
            </p>
        </div>

        <!-- card info -->
        <div class="flex w-full flex-row justify-start px-2.5">
            <p class="text-sm font-normal text-txt-secondary">
                {user}
            </p>
        </div>
    </div>

    <!-- card footer -->
    <div class="flex flex-row justify-between px-2.5 text-sm text-txt-tertiary">
        <p>{duration}</p>
        <p>Klik untuk semak</p>
    </div>
</Card>
