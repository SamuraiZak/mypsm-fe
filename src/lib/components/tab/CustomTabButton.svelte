<script lang="ts">
    export let label: string = 'Label';
    export let active: boolean = false;
    export let onClick = () => {};
    export let id: string = 'buttonID';
    export let pill: boolean = false;
</script>

<button
    {id}
    on:click={onClick}
    class="flex h-full min-w-10 max-h-full min-h-full flex-row items-center justify-center {pill
        ? 'm-1 rounded-xl'
        : ''}  bg-ios-basic-white px-2.5 hover:bg-ios-systemColors-quaternarySystemFill-light {active
        ? `${
              pill ? 'border' : 'border-b-2'
          }  border-ios-systemColors-systemBlue-light`
        : `${pill ? 'border' : 'border-none'}
          `}"
>
    <p
        class="text-base {active
            ? `font-medium text-ios-systemColors-systemBlue-light`
            : `font-normal text-slate-500`}"
    >
        {label}
    </p>
</button>
