<script lang="ts">
    import { page } from '$app/stores';
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import SvgChevronUp from '$lib/assets/svg/SvgChevronUp.svelte';
    import type { ModuleDTO } from '$lib/dto/core/system/system.dto';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import {
        Sidebar,
        SidebarDropdownItem,
        SidebarDropdownWrapper,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
    } from 'flowbite-svelte';

    export let menu: ModuleDTO[] = [];
    $: activeUrl = $page.url.pathname;
</script>

<Sidebar
    {activeUrl}
    class="h-full max-h-full w-full max-w-full overflow-y-auto border-none bg-[#FBFBFD]"
>
    <SidebarWrapper class="m-0 rounded-none border-none bg-[#FBFBFD] p-0">
        <SidebarGroup ulClass="space-y-0">
            {#each menu as item}
                {#if item.child == undefined || item.child.length == 0}
                    <SidebarItem
                        spanClass="text-base font-medium text-slate-500"
                        nonActiveClass="flex items-center p-2 text-base font-medium text-ios-labelColors-secondaryLabel-light transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover"
                        label={item.moduleName}
                        href={item.url}
                        active={activeUrl.includes(item.url)}
                        activeClass="flex items-center p-2 text-base font-medium text-ios-activeColors-activeBlue-light transition duration-75 group bg-ios-ui-sidebarItem-light-active border-l-4 border-ios-activeColors-activeBlue-light "
                        data-sveltekit-preload-data="false"
                    />
                {:else}
                    <SidebarDropdownWrapper
                        isOpen={activeUrl.includes(item.url)}
                        ulClass="py-0 space-y-0"
                        spanClass="text-base font-medium text-slate-500 w-full flex"
                        btnClass="flex items-center p-2 text-base font-medium text-ios-labelColors-secondaryLabel-light transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover w-full"
                        label={item.moduleName}
                    >
                        <svelte:fragment slot="arrowup"
                            ><SvgChevronUp size="12" /></svelte:fragment
                        >
                        <svelte:fragment slot="arrowdown">
                            <SvgChevronDown size="12" />
                        </svelte:fragment>

                        {#each item.child as dropdownItem}
                            <SidebarDropdownItem
                                aClass="flex items-center p-2 pl-6 text-base font-medium text-slate-500 transition duration-75 group hover:bg-ios-ui-sidebarItem-light-hover"
                                label={dropdownItem.moduleName}
                                href={dropdownItem.url}
                                active={!!dropdownItem.url &&
                                    activeUrl.includes(dropdownItem.url)}
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
