<script lang="ts">
    import { page } from '$app/stores';
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        SidebarDropdownItem,
        SidebarDropdownWrapper,
    } from 'flowbite-svelte';

    import { sidebarDefault } from '$lib/config/sidebar/sidebar-default';
    import { sidebarNew } from '$lib/config/sidebar/sidebar-new';
    import SvgArrowDown from '$lib/assets/svg/SvgArrowDown.svelte';
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import SvgChevronUp from '$lib/assets/svg/SvgChevronUp.svelte';

    export let sidebarItems: SidebarType[] = sidebarNew;

    let divClass = 'py-2 bg-bgr-secondary h-full overflow-y-auto';
    let spanClass = 'flex-1 text-base text-primary';
    let aClass =
        'flex items-center p-2 text-base font-normal text-txt-primary transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover';
    let dropdownAClass =
        'flex items-center p-2 pl-6 text-base font-normal text-txt-primary transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover';
    let sidebarItemActive =
        'flex items-center p-2 text-base font-normal text-ios-activeColors-activeBlue-light transition duration-75 group bg-ios-ui-sidebarItem-light-active border-l-4 border-ios-activeColors-activeBlue-light ';
    let sidebarDropdownItemActive =
        'flex items-center p-2 pl-6 text-base font-normal text-ios-activeColors-activeBlue-light transition duration-75 group bg-ios-ui-sidebarItem-light-active border-l-4 border-ios-activeColors-activeBlue-light ';

    $: activeUrl = $page.url.pathname;
</script>

<div
    class="flex h-[40px] max-h-[40px] min-h-[40px] flex-row items-center border-b bg-ios-backgroundColors-systemBackground-light px-2"
>
    <div
        class="text-sm font-normal tracking-wide text-ios-labelColors-secondaryLabel-light"
    >
        Menu
    </div>
</div>
<Sidebar
    {activeUrl}
    class="h-full w-[250px] overflow-y-auto border-r bg-ios-backgroundColors-systemBackground-light"
>
    <SidebarWrapper
        class="m-0 rounded-none bg-ios-backgroundColors-systemBackground-light p-0"
    >
        <SidebarGroup ulClass="space-y-0">
            {#each sidebarItems as item}
                {#if !item.dropdown && item.redirect}
                    <SidebarItem
                        {spanClass}
                        nonActiveClass={aClass}
                        label={item.name}
                        href={item.redirect}
                        active={activeUrl.includes(item.redirect)}
                        activeClass={sidebarItemActive}
                        data-sveltekit-preload-data="false"
                    />
                {:else if item.dropdown}
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
                        {#each item.dropdown as dropdownItem}
                            <SidebarDropdownItem
                                aClass={dropdownAClass}
                                label={dropdownItem.name}
                                href={dropdownItem.redirect}
                                active={!!dropdownItem.redirect &&
                                    activeUrl.includes(dropdownItem.redirect)}
                                activeClass={sidebarDropdownItemActive}
                                data-sveltekit-preload-data="false"
                            />
                        {/each}
                    </SidebarDropdownWrapper>
                {/if}
            {/each}
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
