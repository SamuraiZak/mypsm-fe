<script lang="ts">
    export let options: RadioOption[];
    export let legend: string = '';
    export let userSelected = options[0].value;
    export let disabled: boolean = false;
    export let labelBlack: boolean = true;
    export const onChange = () => {};

    const uniqueID = Math.floor(
        Math.random() * 999999 * (Math.random() * 999999),
    );

    const slugify = (str = '') =>
        str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

    let inputValue: string = '';
    let isActive = false;
</script>

<div
    role="radiogroup"
    aria-labelledby={`label-${uniqueID}`}
    id={`group-${uniqueID}`}
>
    <div
        class=" {legend == ''
            ? 'hidden'
            : 'flex'} h-full w-full flex-row items-center justify-start"
        id={`label-${uniqueID}`}
    >
        <span
            class="text-base {labelBlack
                ? 'text-txt-primary'
                : 'text-txt-tertiary'}"
        >
            {legend}
        </span>
    </div>

    <div class="flex flex-row">
        {#each options as { value, label }}
            <div id="scale-input">
                <label
                    for={slugify(label)}
                    class="relative mx-2.5 flex h-7 w-10 flex-row items-center justify-center rounded-[3px] border bg-[#F9F9F9] text-center text-sm font-semibold text-black"
                >
                    {label}
                    <input
                        class="hidden"
                        type="radio"
                        id={slugify(label)}
                        name={`label-${uniqueID}`}
                        bind:group={userSelected}
                        {value}
                        {disabled}
                        on:change={() => isActive}
                    />
                </label>
            </div>
        {/each}
    </div>
</div>

<!-- <style>
    #scale-input label:has(input:checked) {
        @apply text-white;
    }
</style> -->

<!-- <script lang="ts">
    export let options: RadioOption[];
    export let legend: string = '';
    export let userSelected = options[0].value;
    export let disabled: boolean = false;
    export let labelBlack: boolean = true;
    export let onChange = () => {};

    // let selectedNow = userSelected;

    const uniqueID = Math.floor(
        Math.random() * 999999 * (Math.random() * 999999),
    );

    const slugify = (str = '') =>
        str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

    let inputValue: string = '';
</script>

<div
    role="radiogroup"
    aria-labelledby={`label-${uniqueID}`}
    id={`group-${uniqueID}`}
>
    <div
        class=" {legend == ''
            ? 'hidden'
            : 'flex'} h-full w-full flex-row items-center justify-start"
        id={`label-${uniqueID}`}
    >
        <span
            class="text-base {labelBlack
                ? 'text-txt-primary'
                : 'text-txt-tertiary'}"
        >
            {legend}
        </span>
    </div>

    <div class="flex flex-row">
        {#each options as { value, label }}
            <div id="scale-input" class="relative">
                <input
                    class=" relative mx-2.5 flex h-7 w-10 flex-row items-center justify-center rounded-[3px] border bg-[#F9F9F9] bg-clip-content text-center text-sm font-semibold text-black ring-transparent focus:ring-0"
                    type="radio"
                    id={slugify(label)}
                    name={`label-${uniqueID}`}
                    bind:group={userSelected}
                    {value}
                    {disabled}
                    on:change={onChange}
                />
                <label
                    for={slugify(label)}
                    class="top-50% -translate-y-50% absolute bottom-[5px] left-[26px] transform text-sm font-semibold text-system-neutral"
                >
                    {label}
                </label>
            </div>
        {/each}
    </div>
</div> -->

<style>
    #scale-input label:has(input:checked) {
        @apply bg-system-neutral text-white;
    }
</style>
