<script lang="ts">
    import { Accordion, AccordionItem, Button } from 'flowbite-svelte';
    import SvgChevronUp from '$lib/assets/svg/SvgChevronUp.svelte';
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    export let header = 'Header';
    export let id = '';
    export let open = false;
    export let onDelete = () => {};
    export let hasDelete = false;
</script>

<div {id} class="flex w-full flex-row items-start justify-between">
    <div class="flex w-full flex-row items-start justify-start gap-2.5">
        <Accordion
            activeClass="text-system-primary bg-bgr-primary focus:ring-0 border-system-primary border-b-0 rounded-t-[3px]"
            inactiveClass="text-system-primary bg-bgr-primary border border-system-primary rounded-[3px] hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
            defaultClass="text-system-primary w-full bg-bgr-primary"
        >
            <AccordionItem
                {open}
                borderSharedClass="border-system-primary"
                defaultClass="flex items-center justify-between w-full font-medium text-left border-bdr-primary h-[32px]"
                paddingDefault="p-2.5"
                transitionParams={{ duration: 0 }}
            >
                <span
                    slot="header"
                    class="text-base font-normal text-system-primary"
                    >{header}
                </span>
                <div slot="arrowup">
                    <SvgChevronUp></SvgChevronUp>
                </div>
                <div slot="arrowdown">
                    <SvgChevronDown></SvgChevronDown>
                </div>

                <div
                    class="flex h-fit w-full flex-col items-start justify-start"
                >
                    <slot />
                </div>
            </AccordionItem>
        </Accordion>
        {#if hasDelete}
            <div class="flex h-[30px] items-center">
                <Button class="bg-blue-50 p-0" on:click={onDelete}
                    ><svg
                        fill="#ff0000"
                        width="14px"
                        height="14px"
                        viewBox="-32 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ff0000"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier"
                            ><path
                                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                            ></path></g
                        ></svg
                    ></Button
                >
            </div>
        {/if}
    </div>
</div>
