<script lang="ts">
    import { Toolbar, ToolbarGroup, ToolbarButton } from 'flowbite-svelte';
    import { formatDoc } from './RTEFunctions';
    export let value: any;
    export let labelBlack = true;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let hasTooltip = false;
    export let toolTipID = '';
    export let id = '';
    export let onChange: any = null;
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

<div class="flex w-full flex-row items-start justify-between">
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

    <div class="w-full">
        <form>
            <div
                class="w-full max-w-[991px] overflow-hidden rounded-lg bg-bgr-primary"
            >
                <div class="h-fit border rounded-lg hover:border-system-primary hover:outline-system-primary focus:outline focus:outline-system-primary focus:ring-0">
                    <div class="flex flex-col rounded-lg">
                        <Toolbar
                            slot="header"
                            color="dark"
                            embedded
                            class="h-[40px] border-b border-bdr-primary bg-bgr-secondary p-2 rounded-t-lg"
                        >
                            <ToolbarGroup>
                                <ToolbarButton
                                    name="Bold"
                                    on:click={() => {
                                        formatDoc('bold');
                                    }}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 384 512"
                                        ><path
                                            d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"
                                        /></svg
                                    ></ToolbarButton
                                >
                                <ToolbarButton
                                    name="Italic"
                                    on:click={() => formatDoc('italic')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 384 512"
                                        ><path
                                            d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"
                                        /></svg
                                    ></ToolbarButton
                                >
                                <ToolbarButton
                                    name="Underline"
                                    on:click={() => formatDoc('underline')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
                                        /></svg
                                    ></ToolbarButton
                                >
                            </ToolbarGroup>

                            <ToolbarGroup>
                                <ToolbarButton
                                    name="left-align"
                                    on:click={() => formatDoc('justifyLeft')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                                        /></svg
                                    ></ToolbarButton
                                >
                                <ToolbarButton
                                    name="center-align"
                                    on:click={() => formatDoc('justifyCenter')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"
                                        /></svg
                                    ></ToolbarButton
                                >
                                <ToolbarButton
                                    name="right-align"
                                    on:click={() => formatDoc('justifyRight')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                                        /></svg
                                    ></ToolbarButton
                                >
                                <ToolbarButton
                                    name="justify-align"
                                    on:click={() => formatDoc('justifyFull')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"
                                        /></svg
                                    ></ToolbarButton
                                >
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarButton
                                    name="indent"
                                    on:click={() => formatDoc('indent')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M0 64C0 46.3 14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM192 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zm32 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM127.8 268.6L25.8 347.9C15.3 356.1 0 348.6 0 335.3V176.7c0-13.3 15.3-20.8 25.8-12.6l101.9 79.3c8.2 6.4 8.2 18.9 0 25.3z"
                                        /></svg
                                    ></ToolbarButton
                                ><ToolbarButton
                                    name="outdent"
                                    on:click={() => formatDoc('outdent')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                        ><path
                                            d="M0 64C0 46.3 14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM192 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zm32 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM.2 268.6c-8.2-6.4-8.2-18.9 0-25.3l101.9-79.3c10.5-8.2 25.8-.7 25.8 12.6V335.3c0 13.3-15.3 20.8-25.8 12.6L.2 268.6z"
                                        /></svg
                                    ></ToolbarButton
                                >
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarButton
                                    name="undo"
                                    on:click={() => formatDoc('undo')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                        ><path
                                            d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"
                                        /></svg
                                    ></ToolbarButton
                                ><ToolbarButton
                                    name="redo"
                                    on:click={() => formatDoc('redo')}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                        ><path
                                            d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
                                        /></svg
                                    ></ToolbarButton
                                >
                            </ToolbarGroup>
                        </Toolbar>
                        <div
                            class="h-fit mt-1 rounded-b-lg border-b bg-bgr-primary p-5 text-sm text-txt-primary outline-none"
                            {id}
                            on:change={onChange}
                            contenteditable="true"
                            spellcheck="false"
                            bind:innerHTML={value}
                        ></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
