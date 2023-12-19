<script lang="ts">
    export let disabled = false;
    export let textCenter = false;
    export let id = '';
    export let name = '';
    export let placeholder = '';
    export let type = 'text';
    export let onBlur = () => {};
    export let value: any = null;
    export let labelBlack = true;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let labelType = 'default';
    export let labelFor = '';
    export let onChange: any = null;

    // Function to set the type of the input field
    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }
</script>

{#if labelType === 'default'}
    <div class="flex w-fit flex-row items-center justify-between gap-2.5">
        <label
            for=""
            class="w-fit text-sm {labelBlack
                ? fontBlack
                : fontGray} font-medium">{label}</label
        ><input
            on:blur={onBlur}
            on:change={onChange}
            use:typeAction
            {disabled}
            {id}
            {name}
            {placeholder}
            bind:value
            class:text-center={textCenter}
            class="border-1 active:border-1 h-8 w-fit rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        />
    </div>
{:else if labelType === 'top'}
    <div class="flex w-fit flex-col items-start justify-start gap-1">
        <label
            for={labelFor}
            class="w-fit gap-2 text-sm font-medium {labelBlack
                ? fontBlack
                : fontGray}">{label}</label
        ><input
            on:blur={onBlur}
            on:change={onChange}
            use:typeAction
            {disabled}
            {id}
            {name}
            {placeholder}
            bind:value
            class:text-center={textCenter}
            class="border-1 active:border-1 h-8 w-fit rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        />
    </div>
{:else if labelType === 'no-label'}
    <div class="flex w-fit flex-col items-start justify-start gap-1">
        <input
            on:blur={onBlur}
            on:change={onChange}
            use:typeAction
            {disabled}
            {id}
            {name}
            {placeholder}
            bind:value
            class:text-center={textCenter}
            class="border-1 active:border-1 h-8 w-fit rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        />
    </div>
{/if}
