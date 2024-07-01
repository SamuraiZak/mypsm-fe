<script lang="ts">
    export let id: string = '';
    export let label: string = 'Label';
    export let placeholder: string = 'Enter text here...';
    export let errors: string[] | undefined = [] ?? undefined;
    export let valType: string = 'text';
    $: type = valType;
</script>

<div class="flex h-fit w-full flex-col items-start justify-start gap-1">
    <!-- label -->
    <div class="flex h-fit min-h-5 w-full flex-col items-start justify-center">
        <label for={id} class="text text-wrap text-md font-medium leading-tight"
            >{label}</label
        >
    </div>

    <!-- input -->

    <div
        class="flex h-9 w-full items-center rounded border border-gray-300 px-2 focus-within:border-blue-500"
    >
        <slot name="prefix-icon" />
        <input
            {type}
            class="h-full w-full rounded border-none bg-transparent px-0 text-md outline-none focus:ring-0"
            {placeholder}
        />
        <slot name="suffix-icon" />
    </div>

    <!-- error -->
    <div class="flex h-fit min-h-5 w-full flex-col items-start justify-center">
        {#if errors}
            <p class="text-base font-normal leading-tight text-red-500">
                {errors}
            </p>
        {/if}
    </div>
</div>
