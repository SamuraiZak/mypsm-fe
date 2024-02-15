<script lang="ts">
    import { page } from '$app/stores';
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import SvgChevronUp from '$lib/assets/svg/SvgChevronUp.svelte';
    import type { NavItem } from '$lib/dto/core/sidebar/sidebar.dto';
    import {
        Sidebar,
        SidebarDropdownItem,
        SidebarDropdownWrapper,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
    } from 'flowbite-svelte';

    export let menu: NavItem[] = [];
    $: activeUrl = $page.url.pathname;
</script>

<div
    class="flex h-10 max-h-10 min-h-10 flex-row items-center border-b bg-ios-basic-white px-2"
>
    <div
        class="text-sm font-medium tracking-wide text-ios-labelColors-secondaryLabel-light"
    >
        Menu
    </div>
</div>

<Sidebar
    {activeUrl}
    class="h-full max-h-full w-full max-w-full overflow-y-auto border-none bg-ios-basic-white"
>
    <SidebarWrapper
        class="m-0 rounded-none border-none bg-ios-basic-white px-0"
    >
        <SidebarGroup ulClass="space-y-0">
            {#each menu as item}
                {#if item.subItems == undefined}
                    <SidebarItem
                        spanClass="flex-1 text-base text-primary"
                        nonActiveClass="flex items-center p-2 text-base font-normal text-txt-primary transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover"
                        label={item.name}
                        href={item.path}
                        active={activeUrl.includes(item.path)}
                        activeClass="flex items-center p-2 text-base font-medium text-ios-activeColors-activeBlue-light transition duration-75 group bg-ios-ui-sidebarItem-light-active border-l-4 border-ios-activeColors-activeBlue-light "
                        data-sveltekit-preload-data="false"
                    />
                {:else}
                    <SidebarDropdownWrapper
                        ulClass="py-0 space-y-0"
                        spanClass="text-base w-full flex"
                        btnClass="flex items-center p-2 text-base font-normal text-txt-primary transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover w-full"
                        label={item.name}
                    >
                        <svelte:fragment slot="arrowup"
                            ><SvgChevronUp size="12" /></svelte:fragment
                        >
                        <svelte:fragment slot="arrowdown">
                            <SvgChevronDown size="12" />
                        </svelte:fragment>

                        {#each item.subItems as dropdownItem}
                            <SidebarDropdownItem
                                aClass="flex items-center p-2 pl-6 text-base font-normal text-txt-primary transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover"
                                label={dropdownItem.name}
                                href={dropdownItem.path}
                                active={!!dropdownItem.path &&
                                    activeUrl.includes(dropdownItem.path)}
                                activeClass="flex items-center p-2 pl-6 text-base font-medium text-ios-activeColors-activeBlue-light transition duration-75 group bg-ios-ui-sidebarItem-light-active border-l-4 border-ios-activeColors-activeBlue-light "
                                data-sveltekit-preload-data="false"
                            />
                        {/each}
                    </SidebarDropdownWrapper>
                {/if}
            {/each}
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
