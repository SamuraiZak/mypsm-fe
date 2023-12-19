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

    export let sidebarItems: SidebarType[] = sidebarNew;

    let divClass = 'py-2 bg-bgr-secondary h-full overflow-y-auto';
    let spanClass = 'flex-1 text-base text-primary';
    let aClass =
        'flex items-center p-2 text-base font-normal text-txt-primary transition duration-75 group hover:bg-bgr-tertiary';
    let dropdownAClass =
        'flex items-center p-2 pl-6 text-base font-normal text-txt-primary transition duration-75 group hover:bg-bgr-tertiary';
    let activeClass =
        'flex items-center p-2 text-base font-normal text-txt-primary transition duration-75 group bg-bgr-forth hover:bg-bgr-tertiary';
    let dropdownActiveClass =
        'flex items-center p-2 pl-6 text-base font-normal text-txt-primary transition duration-75 group bg-bgr-forth hover:bg-bgr-tertiary';
    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl} class="w-[250px] border-r py-2 overflow-y-auto h-full">
    <SidebarWrapper class="p-0 m-0">
        <SidebarGroup>
            {#each sidebarItems as item}
                {#if !item.dropdown && item.redirect}
                    <SidebarItem
                        {spanClass}
                        nonActiveClass={aClass}
                        label={item.name}
                        href={item.redirect}
                        active={activeUrl.includes(item.redirect)}
                        {activeClass}
                    />
                {:else if item.dropdown}
                    <SidebarDropdownWrapper
                        spanClass="text-base w-full flex"
                        btnClass="flex items-center p-2 text-base font-normal text-txt-primary transition duration-75 group hover:bg-bgr-tertiary w-full"
                        label={item.name}
                    >
                        <!-- <svelte:fragment slot="arrowup"
                            ><ArrowUp /></svelte:fragment
                        > -->
                        <svelte:fragment slot="arrowdown">
                            <SvgArrowDown />
                        </svelte:fragment>
                        {#each item.dropdown as dropdownItem}
                            <SidebarDropdownItem
                                aClass={dropdownAClass}
                                label={dropdownItem.name}
                                href={dropdownItem.redirect}
                                active={!!dropdownItem.redirect &&
                                    activeUrl.includes(dropdownItem.redirect)}
                                activeClass={dropdownActiveClass}
                            />
                        {/each}
                    </SidebarDropdownWrapper>
                {/if}
            {/each}
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
