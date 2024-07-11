<script lang="ts">
    export let color: string = '';
    export let fontSize: string = '';
    export let titlePadding: boolean = true;
    export let fontWeight: string = '';
    export let title: string = 'Page Title';
    export let borderClass: string = '';
</script>

<div
    class="flex h-10 min-h-10 w-full flex-row items-center justify-between {borderClass !==
    ''
        ? borderClass
        : 'border-b'} 
        {titlePadding ? 'px-2' : ''} bg-ios-basic-white"
>
    <!-- leading starts here -->
    <div
        class="flex h-full max-h-full gap-2 min-h-full w-fit flex-row items-center justify-start"
    >
        <span
            class="
            {fontSize === 'small' ? 'text-base' : 'text-md'}
            {fontWeight === 'bold' ? 'font-bold' : 'font-medium'}
                {color === 'system-primary'
                ? 'text-system-primary'
                : 'text-txt-primary'}"
        >
            {title}
        </span>

        <div class="flex h-full w-fit flex-row items-center justify-start">
            <slot name="status" />
        </div>
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
