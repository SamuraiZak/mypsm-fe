<script lang="ts">
    export let fontSize: string = '';
    export let fontWeight: string = '';
    export let title: string = 'Page Title';
</script>

<div
    class="w-full flex flex-col h-fit border bg-ios-basic-white"
>
    <div
        class="flex h-10 min-h-10 w-full items-center bg-ios-systemColors-systemCyan-light justify-start px-2"
    >
        <span
            class="
            {fontSize === 'small' ? 'text-sm' : 'text-base'}
            {fontWeight === 'bold' ? 'font-bold' : 'font-medium'} text-ios-basic-white
            "
        >
            {title}
        </span>
    </div>
  
    <div
        class="flex flex-col w-full p-4"
    >
        <slot />
    </div>

</div>
