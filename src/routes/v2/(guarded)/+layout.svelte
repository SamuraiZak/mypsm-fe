<script lang="ts">
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
    import lkim_logo from '$lib/assets/images/LKIM.png';
    import mypsm_logo from '$lib/assets/images/MyPSM.png';
    import type { LayoutData } from './$types';
    import SideNavBar from '$lib/components/sidebar/SideNavBar.svelte';
    import { get } from 'svelte/store';
    import { page } from '$app/stores';
    import { onDestroy } from 'svelte';
    import { _switchRole, load } from './+layout';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import type { SwitchRoleDTO } from '$lib/dto/core/user-account/user-account.dto';
    import { Toaster } from 'svelte-french-toast';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: LayoutData;

    let unsubscribe;

    // Function to call on URL change
    const handleNavigation = async () => {
        const currentPage = get(page);
        console.log('Navigated to:', currentPage.url.pathname);
        // Call your load function or any other function here
        // You can fetch data or do other actions here
    };

    // Subscribe to $page store to detect URL changes
    unsubscribe = page.subscribe(() => {
        handleNavigation();
    });

    onDestroy(() => {
        // Clean up the subscription when the component is destroyed
        if (unsubscribe) {
            unsubscribe();
        }
    });

    function switchRole(roleCode: string) {
        const params: SwitchRoleDTO = {
            roleCode: roleCode,
        };

        _switchRole(params);
    }
</script>

<div class="flex h-screen w-screen flex-col items-start justify-start bg-white">
    <!-- header -->
    <div
        class="flex h-14 w-full flex-row items-center justify-between border-b px-4"
    >
        <!-- brand -->
        <div
            class="hidden h-full w-60 min-w-60 flex-row items-center justify-start hover:scale-105 md:flex"
        >
            <!-- company logo -->
            <div class="flex h-full flex-col items-center justify-center p-1">
                <img src={lkim_logo} class="h-full" alt="" srcset="" />
            </div>

            <!-- brand logo -->
            <div class="flex h-full flex-col items-center justify-center p-1">
                <img src={mypsm_logo} class="h-3/5" alt="" srcset="" />
            </div>
        </div>

        <!-- trailing -->
        <div class="flex h-full flex-row items-center justify-end bg-white">
            <!-- account -->
            <button
                id="accountTile"
                class="flex w-fit flex-row items-center justify-center gap-1 rounded-full bg-gray-100 p-1 hover:scale-105 hover:bg-gray-200"
            >
                <!-- avatar -->
                <div
                    class="flex h-7 w-7 flex-col items-center justify-center rounded-full bg-blue-500"
                >
                    <p class="text-md font-light text-white">{Array.from(data.props.accountDetails.name)[0]}</p>
                </div>

                <!-- info -->
                <div
                    class="mr-1 flex w-fit flex-col items-start justify-center bg-transparent"
                >
                    <p
                        class="w-fit text-base font-medium leading-tight text-slate-700"
                    >
                        {TextAppearanceHelper.toProper(
                            data.props.accountDetails.name,
                        )}
                    </p>
                    <p
                        class="w-fit text-base font-medium leading-tight text-slate-700"
                    >
                        {TextAppearanceHelper.toProper(
                            data.props.accountDetails.currentRole,
                        )}
                    </p>
                </div>
                <div
                    class="mr-1 flex w-fit flex-row items-center justify-center bg-transparent"
                >
                    <span
                        class="w-fit text-base font-medium leading-tight text-slate-700"
                    >
                        <SvgChevronDown size="12"></SvgChevronDown>
                    </span>
                </div>
            </button>

            <!-- account dropdown -->
            <Dropdown
                triggeredBy="#accountTile"
                containerClass="w-[300px] border divide-y divide-gray-600 z-10 top-10 shadow-lg bg-gray-900"
            >
                <div slot="header" class="px-4 py-2">
                    <div
                        class="flex h-5 w-full flex-col items-center justify-center"
                    >
                        <p
                            class="font w-full text-start text-base font-medium text-gray-200"
                        >
                            Tukar Peranan
                        </p>
                    </div>
                    {#each data.props.accountDetails.roles as role}
                        <DropdownItem
                            defaultClass="hover:bg-gray-700 py-2 px-4"
                            on:click={() => {
                                switchRole(role.code);
                            }}
                        >
                            <div
                                class="flex h-5 w-full flex-row items-center justify-between px-2"
                            >
                                <p
                                    class="font w-full text-wrap text-start text-base font-medium text-gray-200"
                                >
                                    {TextAppearanceHelper.toProper(role.name)}
                                </p>
                                {#if role.name == data.props.accountDetails.currentRole}
                                    <div
                                        class="flex h-5 w-5 min-w-5 flex-col items-center justify-center"
                                    >
                                        <span
                                            class="font w-fit text-wrap text-center text-base font-medium text-gray-200"
                                        >
                                            <SvgCheck size="20"></SvgCheck>
                                        </span>
                                    </div>
                                {/if}
                            </div>
                        </DropdownItem>
                    {/each}
                </div>
                <DropdownItem defaultClass="hover:bg-gray-700 py-2 px-4">
                    <div
                        class="flex h-5 w-full flex-col items-center justify-center"
                    >
                        <p
                            class="font w-full text-start text-base font-medium text-gray-200"
                        >
                            Tetapan Akaun
                        </p>
                    </div>
                </DropdownItem>
                <DropdownItem
                    defaultClass="hover:bg-gray-700 py-2 px-4"
                    slot="footer"
                    href="/v2/login"
                    on:click={() => {
                        localStorage.clear();
                    }}
                >
                    <div
                        class="flex h-5 w-full flex-col items-center justify-center"
                    >
                        <p
                            class="font w-full text-start text-base font-medium text-gray-200"
                        >
                            Log Keluar
                        </p>
                    </div>
                </DropdownItem>
            </Dropdown>
        </div>
    </div>
    <!-- header ends -->

    <!-- main wrapper starts -->
    <div
        class="flex h-full w-full flex-row items-start justify-start overflow-hidden"
    >
        <!-- sidebar starts here -->
        <aside
            class="flex no-print h-full w-60 min-w-60 flex-col items-center justify-start overflow-y-auto border-r bg-white"
        >
            <SideNavBar menu={data.props.accountDetails.module}></SideNavBar>
        </aside>
        <!-- sidebar ends here -->

        <!-- content starts here -->
        <div
            class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-hidden bg-white"
        >
            <slot />
        </div>
        <!-- content ends here -->
    </div>
    <!-- main wrapper ends -->

    <div
        class="flex h-6 w-full flex-row items-center justify-center bg-gray-200"
    >
        <p class="text-xs font-normal text-slate-500">
            Sistem Pengurusan Sumber Manusia | 2024 © Lembaga Kemajuan Ikan
            Malaysia (LKIM)
        </p>
    </div>
</div>

<Toaster></Toaster>
