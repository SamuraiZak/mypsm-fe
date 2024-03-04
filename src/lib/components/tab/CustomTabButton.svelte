<script lang="ts">
    export let label: string = 'Label';
    export let active: boolean = false;
    export let onClick = () => {};
    export let id:string="buttonID";
</script>

<button
id={id}
    on:click={onClick}
    class="flex h-full max-h-full min-h-full flex-row items-center justify-center bg-ios-basic-white px-2.5  hover:bg-ios-systemColors-quaternarySystemFill-light {active
        ? 'border-b-2 border-ios-systemColors-systemBlue-light'
        : 'border-none'}"
>
    <p
        class="text-base  {active
            ? 'text-ios-systemColors-systemBlue-light font-medium'
            : ' text-ios-basic-inactiveGray font-normal'}"
    >
        {label}
    </p>
</button>
