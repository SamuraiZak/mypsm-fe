<script lang="ts">
    export let title: string = 'Page Title';
    export let borderClass: string = '';
</script>

<div
    class="flex h-10 min-h-10 w-full flex-row items-center justify-between {borderClass !==
    ''
        ? borderClass
        : 'border-b'} px-2"
>
    <!-- leading starts here -->
    <div
        class="flex h-full max-h-full min-h-full w-fit flex-row items-center justify-start"
    >
        <span class="text-base font-medium"> {title} </span>
    </div>
    <!-- leading ends here -->

    <!-- trailing starts here -->
    <div
        class="flex h-full max-h-full min-h-full w-fit flex-row items-center justify-end gap-2"
    >
        <slot />
    </div>

    <!-- trailing ends here -->
</div>
