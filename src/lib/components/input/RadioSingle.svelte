<script lang="ts">
    export let options: RadioOption[];
    export let legend: string = '';
    export let userSelected = options[0].value;
    export let disabled: boolean = false;
    export let labelBlack: boolean = true;
    export let isVertical: boolean = false;
    const uniqueID = Math.floor(
        Math.random() * 999999 * (Math.random() * 999999),
    );
    export let name: string = `group-${uniqueID}`;
    export let onChange = () => {};

    // let selectedNow = userSelected;

    const slugify = (str = '') =>
        str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

    let inputValue: string = '';
</script>

<div
    role="radiogroup"
    class="flex h-[32px] max-h-[32px] min-h-[32px] w-full flex-row items-center justify-start gap-0"
    aria-labelledby={`label-${uniqueID}`}
    id={`group-${uniqueID}`}
>
    <div
        class=" {legend == ''
            ? 'hidden'
            : 'flex'} h-full w-[220px] min-w-[220px] max-w-[220px] flex-row items-center justify-start"
        id={`label-${uniqueID}`}
    >
        <span
            class="text-sm font-normal {labelBlack
                ? 'text-txt-primary'
                : 'text-txt-tertiary'}"
        >
            {legend}
        </span>
    </div>

    <div
        class="flex h-full w-full gap-2.5 {isVertical
            ? 'flex-col items-start justify-center'
            : 'flex-row items-center justify-start'}"
    >
        {#each options as { value, label }}
            <div
                class="flex h-full flex-row items-center justify-start gap-2.5"
            >
                <input
                    type="radio"
                    class="focus:outline-none focus:ring-0 {disabled
                        ? 'text-txt-tertiary'
                        : 'text-system-primary'}"
                    id={slugify(label)}
                    {name}
                    bind:group={userSelected}
                    {value}
                    {disabled}
                    on:change={onChange}
                />
                <label
                    for={slugify(label)}
                    class="text-sm {disabled
                        ? 'text-txt-tertiary'
                        : 'text-txt-primary'}"
                >
                    {label}
                </label>
            </div>
        {/each}
    </div>
</div>
