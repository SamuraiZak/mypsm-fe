<script lang="ts">
    import {
        Checkbox,
        Radio,
        Select,
        type SelectOptionType,
    } from 'flowbite-svelte';

    export let label = 'Label';
    export let labelBlack = true;
    export let childLabelBlack = true;
    export let id = '';
    export let disabled = false;
    export let options: SelectOptionType<any>[] | undefined;
    export let index: string | number = 0;
    export let onSelect = () => {};
    export let dropdownType = 'default';
    export let hasTooltip = false;
    export let toolTipID = '';
    export let checkboxLabel1 = 'Checkbox 1';
    export let checkboxLabel2 = 'Checkbox 2';
    export let checkboxLabel3 = 'Checkbox 3';
    export let checked1 = false;
    export let checked2 = false;
    export let checked3 = false;
    export let name = '';
    export let value = '';
    export let value2 = '';
    export let placeholder = '';
    export let onChange = () => {};
    // Tooltip icon
    const questionMarkIcon: string = `<svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 0.5C9.30469 0.5 12 3.19531 12 6.5C12 9.82812 9.30469 12.5 6 12.5C2.67188 12.5 0 9.82812 0 6.5C0 3.19531 2.67188 0.5 6 0.5ZM6 9.875C6.39844 9.875 6.75 9.54688 6.75 9.125C6.75 8.70312 6.39844 8.375 6 8.375C5.55469 8.375 5.25 8.70312 5.25 9.125C5.25 9.54688 5.57812 9.875 6 9.875ZM7.61719 6.54688C8.13281 6.24219 8.4375 5.70312 8.4375 5.14062C8.4375 4.22656 7.71094 3.5 6.75 3.5H5.55469C4.66406 3.5 3.9375 4.22656 3.9375 5.14062C3.9375 5.44531 4.19531 5.70312 4.5 5.70312C4.80469 5.70312 5.0625 5.44531 5.0625 5.14062C5.0625 4.85938 5.27344 4.625 5.57812 4.625H6.77344C7.05469 4.625 7.3125 4.85938 7.3125 5.14062C7.3125 5.32812 7.21875 5.49219 7.05469 5.58594L5.71875 6.38281C5.53125 6.5 5.4375 6.6875 5.4375 6.875V7.25C5.4375 7.55469 5.69531 7.8125 6 7.8125C6.30469 7.8125 6.5625 7.55469 6.5625 7.25V7.20312L7.61719 6.54688Z"
                                fill="#667085"
                            />
                        </svg>`;
</script>

{#if dropdownType === 'default'}
    <label
        for={id}
        class="block w-fit text-[11px] font-medium text-txt-primary"
    >
        {label}
    </label>

    <Select
        {disabled}
        {id}
        items={options}
        placeholder="Sila Pilih"
        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
        bind:value={index}
        on:change={() => {
            onSelect();
        }}
    ></Select>
    <div id={toolTipID} class="h-fit w-[100px]">
        {@html hasTooltip ? questionMarkIcon : ''}
    </div>
{:else if dropdownType === 'label-left-full'}
    <div class="flex w-full flex-row items-center justify-between">
        <label
            for={id}
            class="block w-[220px] min-w-[220px] text-[11px] font-medium {labelBlack
                ? 'text-txt-primary'
                : 'text-txt-tertiary'}"
        >
            {label}
        </label>

        <Select
            {disabled}
            {id}
            items={options}
            placeholder="Sila Pilih"
            class="block h-[32px] w-full rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary  focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
            bind:value
            on:change={() => {
                onSelect();
            }}
        ></Select>
        <div
            id={toolTipID}
            class="h-fit w-[100px] {hasTooltip ? '' : 'hidden'}"
        >
            {@html hasTooltip ? questionMarkIcon : ''}
        </div>
    </div>
{:else if dropdownType === 'label-left-200'}
    <div class="flex w-full flex-row items-center justify-between">
        <label
            for={id}
            class="block w-[200px] min-w-[200px] text-[11px] font-medium {labelBlack
                ? 'text-txt-primary'
                : 'text-txt-tertiary'}"
        >
            {label}
        </label>

        <Select
            {disabled}
            {id}
            items={options}
            placeholder="Sila Pilih"
            class="block h-[32px] w-full rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary  focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
            bind:value
            on:change={() => {
                onSelect();
            }}
        ></Select>
        <div
            id={toolTipID}
            class="h-fit w-[100px] {hasTooltip ? '' : 'hidden'}"
        >
            {@html hasTooltip ? questionMarkIcon : ''}
        </div>
    </div>
{:else if dropdownType === 'label-left'}
    <div class="flex w-fit flex-row items-center justify-between gap-2.5">
        <label
            for={id}
            class="block w-fit text-[11px] font-medium text-txt-primary"
        >
            {label}
        </label>

        <Select
            {disabled}
            {id}
            items={options}
            placeholder="Sila Pilih"
            class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary  focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
            bind:value
            on:change={() => {
                onSelect();
            }}
        ></Select>
        <div id={toolTipID} class="w-[fit h-fit">
            {@html hasTooltip ? questionMarkIcon : ''}
        </div>
    </div>
{:else if dropdownType === 'label-top'}
    <div class="flex w-fit flex-col items-start justify-between">
        <div class="flex flex-row gap-1">
            <label
                for={id}
                class="block w-fit text-[11px] font-medium text-txt-primary"
            >
                {label}
            </label>
            <div id={toolTipID} class="w-[fit h-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
        <Select
            {disabled}
            {id}
            items={options}
            placeholder="Sila Pilih"
            class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary  focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
            bind:value
            on:change={() => {
                onSelect();
            }}
        ></Select>
    </div>
{:else if dropdownType === 'noLabel'}
    <Select
        {disabled}
        {id}
        items={options}
        placeholder="Sila Pilih"
        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary  focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
        bind:value
        on:change={() => {
            onSelect();
        }}
    ></Select>
{:else if dropdownType == 'label-left-full-optional-fields'}
    <div class="flex w-full flex-row items-center justify-between">
        <label
            for={id}
            class="block w-[220px] min-w-[220px] text-[11px] font-medium {labelBlack
                ? 'text-txt-primary'
                : 'text-txt-tertiary'}"
        >
            {label}
        </label>
        <div class="flex h-full w-full flex-col gap-2.5">
            <div class="flex flex-row">
                <Checkbox bind:checked={checked1} {disabled} class=""
                    ><label
                        for=""
                        class="block w-[220px] min-w-[220px] text-[11px] font-medium text-txt-primary {childLabelBlack
                            ? 'text-txt-primary'
                            : 'text-txt-tertiary'}">{checkboxLabel1}</label
                    ></Checkbox
                ><Select
                    {disabled}
                    {id}
                    items={options}
                    placeholder="Sila Pilih"
                    class="block h-[32px] w-full rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary  focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                    bind:value={value}
                    on:change={() => {
                        onSelect();
                    }}
                ></Select>
            </div>
            <div class="flex flex-row">
                <Checkbox bind:checked={checked2} {disabled}
                    ><label
                        for=""
                        class="block w-[220px] min-w-[220px] text-[11px] font-medium {childLabelBlack
                            ? 'text-txt-primary'
                            : 'text-txt-tertiary'}">{checkboxLabel2}</label
                    ></Checkbox
                ><input
                    on:change={onChange}
                    {disabled}
                    {id}
                    {name}
                    {placeholder}
                    bind:value
                    class="border-1 active:border-1 h-8 w-full rounded-[3px] border border-bdr-primary p-2.5 text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
                />
            </div>
            <div class="flex flex-row">
                <Checkbox bind:checked={checked3} {disabled}
                    ><label
                        for=""
                        class="block w-[220px] min-w-[220px] text-[11px] font-medium {childLabelBlack
                            ? 'text-txt-primary'
                            : 'text-txt-tertiary'}">{checkboxLabel3}</label
                    ></Checkbox
                ><input
                    on:change={onChange}
                    {disabled}
                    {id}
                    {name}
                    {placeholder}
                    bind:value={value2}
                    class="border-1 active:border-1 h-8 w-full rounded-[3px] border border-bdr-primary p-2.5 text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
                />
            </div>
        </div>

        <div
            id={toolTipID}
            class="h-fit w-[100px] {hasTooltip ? '' : 'hidden'}"
        >
            {@html hasTooltip ? questionMarkIcon : ''}
        </div>
    </div>
{/if}
