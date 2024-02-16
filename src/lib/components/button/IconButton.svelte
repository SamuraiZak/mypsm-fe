<script>
    export let type = 'ghost';
    export let onClick = () => {};
</script>

<button
    on:click={onClick}
    class="{type == 'ghost'
        ? 'bg-transparent text-txt-secondary hover:bg-bgr-secondary'
        : 'bg-system-primary text-txt-blend'} flex flex-col items-center justify-center rounded-[3px] p-1.5"
>
    <slot />
</button>
