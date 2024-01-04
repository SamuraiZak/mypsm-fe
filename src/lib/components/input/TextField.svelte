<script lang="ts">
    export let disabled = false;
    export let textCenter = false;
    export let id = '';
    export let name = '';
    export let placeholder = '';
    export let type = 'text';
    export let onBlur = () => {};
    export let value: any = null;
    export let valueList: any = null;
    export let labelBlack = true;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let labelType = 'default';
    export let labelFor = '';
    export let onChange: any = null;
    export let hasTooltip = false;
    export let toolTipID = '';
    export let boldLabel = false;
    export let onKeyDown: any = null;
    export let onInput: any = null;
    export let labelColor = 'txt-primary';
    export let percentageVal = '';
    export let hasError = false;

    // Function to set the type of the input field
    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }
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

{#if labelType === 'default'}
    <div class="flex w-full flex-row items-center justify-between">
        <div
            class="w-[220px] min-w-[220px] flex-row gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label
                for=""
                class="text-sm {labelBlack ? fontBlack : fontGray} font-medium"
            >
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
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
            class:font-bold={boldLabel}
            class="
                {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
                border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'auto-calculate-percentage'}
    <div class="flex w-full flex-row items-center justify-between">
        <div
            class="w-[220px] min-w-[220px] flex-row gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label
                for=""
                class="text-sm {labelBlack ? fontBlack : fontGray} font-medium"
            >
                {label}</label
            >
        </div>
        <div class="flex w-full flex-row gap-2.5">
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
                class:font-bold={boldLabel}
                class="
                {hasError
                    ? 'border-system-danger focus:border-system-danger'
                    : 'hover:border-system-primary focus:border-system-primary'}
                border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
            />
            <input
                on:change={onChange}
                disabled
                {id}
                {name}
                bind:value={percentageVal}
                class="border-bdr-tertiary flex w-[75px] rounded-[3px] border bg-bgr-tertiary text-center text-sm"
            />
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
    </div>
{:else if labelType === 'label-200'}
    <div class="flex w-full flex-row items-center justify-between">
        <div
            class="w-[200px] min-w-[200px] flex-row gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label
                for=""
                class="text-sm {labelBlack ? fontBlack : fontGray} font-medium"
            >
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
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
            class:font-bold={boldLabel}
            class="
            {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'colored-label'}
    <div class="flex w-full flex-row items-center justify-between">
        <div
            class="w-[220px] min-w-[220px] flex-row gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label for="" class="text-sm text-{labelColor} font-medium">
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
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
            class:font-bold={boldLabel}
            class="
            {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'label-fit'}
    <div class="flex w-full flex-row items-center justify-between gap-2">
        <div
            class="w-full flex-row items-center gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label
                for=""
                class="w-fit break-normal text-sm {labelBlack
                    ? fontBlack
                    : fontGray} font-medium"
            >
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
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
            class:font-bold={boldLabel}
            class="
            {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'no-label'}
    <div class="flex w-full flex-row items-center justify-between">
        <input
            on:blur={onBlur}
            on:change={onChange}
            use:typeAction
            {disabled}
            {id}
            {name}
            {placeholder}
            on:input={onInput}
            on:keydown={onKeyDown}
            bind:value
            class:text-center={textCenter}
            class:font-bold={boldLabel}
            class="
            {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'top'}
    <div class="flex w-full flex-col items-start justify-start gap-1">
        <label
            for={labelFor}
            class="w-[220px] min-w-[220px] text-sm font-medium {labelBlack
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
            class="
            {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'right-justify-end'}
    <div class="flex w-full flex-row items-center justify-end gap-2">
        <div class="flex-row justify-end{label == '' ? 'hidden' : 'flex'}">
            <label
                for=""
                class="text-sm {labelBlack
                    ? fontBlack
                    : fontGray} justify-end font-medium"
            >
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-[100px]">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
        <div
            bind:innerHTML={value}
            contenteditable="true"
            on:blur={onBlur}
            on:change={onChange}
            {id}
            class="
            {hasError
                ? 'border-system-danger focus:border-system-danger'
                : 'hover:border-system-primary focus:border-system-primary'}
            border-1 active:border-1 flex h-8 w-[200px] flex-row items-center rounded-[3px] border-bdr-primary pl-2 pt-1 text-sm text-txt-primary outline outline-1 outline-bdr-primary placeholder:text-txt-tertiary hover:outline-system-primary focus:outline focus:outline-system-primary focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'editable-div'}
    <div class="flex w-full flex-row items-center justify-between">
        <div
            class="w-[220px] min-w-[220px] flex-row gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label
                for=""
                class="text-sm {labelBlack ? fontBlack : fontGray} font-medium"
            >
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
        <div
            bind:innerHTML={value}
            contenteditable="true"
            on:blur={onBlur}
            on:change={onChange}
            {id}
            class="border-1 active:border-1 flex h-8 w-full flex-row items-center rounded-[3px] border-bdr-primary pl-2 pt-1 text-sm text-txt-primary outline outline-1 outline-bdr-primary placeholder:text-txt-tertiary hover:outline-system-primary focus:outline focus:outline-system-primary focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary disabled:hover:border-bdr-primary"
        />
    </div>
{:else if labelType === 'read-only-list-value'}
    <div class="flex w-full flex-row items-center pb-2 pt-2">
        <div
            class="w-[220px] min-w-[220px] flex-row gap-2 {label == ''
                ? 'hidden'
                : 'flex'}"
        >
            <label
                for=""
                class="text-sm {labelBlack ? fontBlack : fontGray} font-medium"
            >
                {label}</label
            >
            <div id={toolTipID} class="h-fit w-fit">
                {@html hasTooltip ? questionMarkIcon : ''}
            </div>
        </div>
        <div>
            <ol
                class="flex h-8 w-full flex-col items-start justify-center rounded-[3px] border-none text-sm text-txt-tertiary placeholder:text-txt-tertiary hover:cursor-default hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
            >
                {#each valueList as item}
                    <li>{item}</li>
                {/each}
            </ol>
        </div>
    </div>
{/if}
