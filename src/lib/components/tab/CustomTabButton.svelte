<script lang="ts">
    export let label: string = 'Label';
    export let active: boolean = false;
    export let onClick = () => {};
</script>

<button
    on:click={onClick}
    class="flex h-full max-h-full min-h-full flex-row items-center justify-center bg-bgr-primary px-2.5 hover:bg-bgr-secondary {active
        ? 'border-b-2 border-system-primary'
        : 'border-none'}"
>
    <p
        class="text-sm font-normal {active
            ? 'text-system-primary'
            : 'text-txt-secondary'}"
    >
        {label}
    </p>
</button>
