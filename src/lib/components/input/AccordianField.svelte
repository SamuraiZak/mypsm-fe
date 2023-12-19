<script lang="ts">
    import { Accordion, AccordionItem } from 'flowbite-svelte';
    export let type = 'text';
    export let labelBlack = true;
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let labelType = 'default';
    export let labelFor = '';
    export let header = 'Header';
    export let disabled = false;

    // Function to set the type of the input field
    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }
</script>

{#if labelType === 'default'}
    <div class="flex w-full flex-row items-start justify-between">
        <div
            class="flex min-h-[32px] w-[220px] min-w-[220px] max-w-[220px] flex-row items-start justify-start"
        >
            <label
                for=""
                class="flex min-h-[32px] flex-row items-center justify-start text-sm {labelBlack
                    ? fontBlack
                    : fontGray} font-medium">{label}</label
            >
        </div>

        <div class="flex w-full flex-col items-center justify-start">
            <Accordion
                activeClass="{disabled
                    ? 'text-txt-primary, bg-bgr-primary'
                    : 'text-txt-tertiary, bg-bgr-secondary'} focus:ring-0"
                inactiveClass="{disabled
                    ? 'text-txt-primary, bg-bgr-primary'
                    : 'text-txt-tertiary, bg-bgr-secondary'} dark:text-gray-400  hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                defaultClass="text-txt-secondary w-full {disabled
                    ? 'br-bgr-primary'
                    : 'bg-bgr-secondary'}"
            >
                <AccordionItem
                    open={true}
                    defaultClass="flex items-center justify-between w-full font-medium text-left rounded-[3px] border-bdr-primary h-[32px] "
                    paddingDefault="p-2.5"
                >
                    <span
                        slot="header"
                        class="text-base font-normal {disabled
                            ? fontBlack
                            : fontGray}">{header}</span
                    >

                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <slot />
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
{:else if labelType === 'top'}
    <div class="flex w-full flex-col items-start justify-start gap-1">
        <label
            for={labelFor}
            class="w-[250px] text-sm font-medium {labelBlack
                ? fontBlack
                : fontGray}">{label}</label
        >
    </div>
{/if}
