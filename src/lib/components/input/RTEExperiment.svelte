<script lang="ts">
    import RichTextEditor from '../rich-text-ediitor/RichTextEditor.svelte';
    export let value: any;
    export let type = 'text';
    export let labelBlack = true;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let labelType = 'default';
    export let labelFor = '';
    export let hasTooltip = false;
    export let toolTipID = '';
    export let id = '';
    export let onChange: any = null;

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
    <div class="flex w-full flex-row items-start justify-between" {id}>
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
        <RichTextEditor bind:value {id} {onChange}></RichTextEditor>
    </div>
{:else if labelType === 'top'}
    <div class="flex w-full flex-col items-start justify-start gap-1" {id}>
        <label
            for={labelFor}
            class="w-[220px] min-w-[220px] text-sm font-medium {labelBlack
                ? fontBlack
                : fontGray}">{label}</label
        ><RichTextEditor bind:value {id} {onChange}></RichTextEditor>
    </div>
{/if}
