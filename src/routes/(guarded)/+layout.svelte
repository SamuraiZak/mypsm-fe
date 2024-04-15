<script lang="ts">
    import SvgBookmark from '$lib/assets/svg/SvgBookmark.svelte';
    import group from '$lib/assets/images/Group.png';
    import MyPSM from '$lib/assets/images/MyPSM_alt.png';
    import Breadcrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
    import SvgAccount from '$lib/assets/svg/SvgAccount.svelte';
    import SvgPower from '$lib/assets/svg/SvgPower.svelte';
    import {
        Button,
        Dropdown,
        DropdownItem,
        Avatar,
        DropdownHeader,
        DropdownDivider,
    } from 'flowbite-svelte';
    import type { LayoutData } from './$types';
    import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
    import { SidebarConstant } from '$lib/constants/core/sidebar.constant';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import { _logout } from './+layout';

    export let data: LayoutData;

    let currentFullname = TextAppearanceHelper.toCamelCase(
        data.props.currentFullName,
    );
    let currentRole = TextAppearanceHelper.toCamelCase(data.props.currentRole);

    let sidebarItems = SidebarConstant.sidebar.find(
        (item) => item.role == data.props.currentRoleCode,
    )?.navItems;
</script>

<section
    class="h-screen max-h-screen w-screen min-w-[100vw] overflow-x-auto overflow-y-hidden bg-ios-basic-white"
>
    <!-- wrapper starts here -->
    <div
        class="flex h-screen max-h-screen w-full min-w-[100vw] flex-col items-start justify-start"
    >
        <!-- header starts here -->
        <header
            class="flex h-10 max-h-10 min-h-10 w-full flex-row justify-between bg-system-primary"
        >
            <!-- leading starts here -->
            <div class="flex h-full w-fit flex-row items-center justify-center">
                <!-- logo wrapper starts here -->
                <div
                    class="flex w-[200px] flex-row items-center justify-start gap-2 px-2.5"
                >
                    <img class="h-5" src={MyPSM} alt="" />
                </div>
                <!-- logo wrapper starts here -->
            </div>

            <!-- leading ends here -->

            <!-- trailing starts here -->
            <div class="flex h-full w-fit flex-row items-center justify-end">
                <!-- account button starts here -->
                <div
                    class="flex h-[40px] w-fit flex-col items-center justify-center"
                >
                    <button
                        id="accountTile"
                        class="flex h-full w-fit min-w-[150px] flex-row items-center justify-start overflow-hidden px-2.5 text-ios-basic-white hover:bg-ios-activeColors-activeBlue-dark"
                    >
                        <!-- leading starts here -->

                        <div
                            class="flex h-full w-fit flex-col items-start justify-center"
                        >
                            <p
                                class="w-full truncate text-ellipsis text-end text-sm font-semibold leading-tight"
                            >
                                {currentFullname}
                            </p>
                            <p
                                class="w-full truncate text-ellipsis text-end text-sm leading-tight"
                            >
                                {currentRole}
                            </p>
                        </div>
                        <!-- leading ends here -->

                        <!-- trailing starts here -->

                        <div
                            class="flex h-full w-[40px] min-w-[40px] flex-row items-center justify-center"
                        >
                            <span class="">
                                <SvgAccount size="26"></SvgAccount>
                            </span>
                        </div>
                        <!-- trailing ends here -->
                    </button>
                    <Dropdown
                        triggeredBy="#accountTile"
                        containerClass="w-[250px] border divide-y z-10"
                    >
                        <div slot="header" class="px-4 py-2">
                            <p
                                class="w-full truncate text-ellipsis text-start text-sm font-semibold leading-normal"
                            >
                                {currentFullname}
                            </p>
                            <p
                                class="w-full truncate text-ellipsis text-start text-sm leading-normal"
                            >
                                {currentRole}
                            </p>
                        </div>
                        <DropdownItem href="/halaman-utama"
                            >Halaman Utama</DropdownItem
                        >
                        <DropdownItem>Tetapan Akaun</DropdownItem>
                        <DropdownItem>Tukar Peranan</DropdownItem>
                        <DropdownItem
                            slot="footer"
                            href="/log-masuk"
                            on:click={() => {
                                localStorage.clear();
                            }}>Log Keluar</DropdownItem
                        >
                    </Dropdown>
                </div>
                <!-- account button ends here -->
            </div>

            <!-- trailing ends here -->
        </header>
        <!-- header ends here -->

        <!-- body starts here -->
        <div
            class="flex h-full max-h-full w-full flex-row overflow-hidden bg-ios-basic-white"
        >
            <!-- sidebar starts here -->
            <div
                class="flex w-[200px] min-w-[200px] max-w-[200px] flex-col overflow-y-auto border-r bg-ios-basic-white"
            >
                <Sidebar menu={sidebarItems}></Sidebar>
            </div>
            <!-- sidebar ends here -->

            <!-- content wrapper starts here -->
            <div
                class="flex h-full w-full flex-col items-start overflow-hidden overflow-x-hidden bg-ios-basic-white"
            >
                <!-- breadcrumb starts here -->
                <div
                    class="flex h-10 max-h-10 min-h-10 w-full flex-row justify-start border-b bg-ios-basic-white px-2"
                >
                    <div
                        class="flex h-full flex-row items-center justify-center gap-2"
                    >
                        <!-- <span
                            class="text text-ios-labelColors-secondaryLabel-light"
                        >
                            <SvgBookmark size="16"></SvgBookmark>
                        </span> -->
                        <Breadcrumb></Breadcrumb>
                    </div>
                </div>
                <!-- breadcrumb ends here -->

                <!-- content body wrapper starts here -->
                <div
                    class="max-h-[calc(100% - 80px)] flex h-full w-full flex-col items-start justify-start overflow-y-hidden bg-ios-basic-white"
                >
                    <slot />
                </div>
                <!-- content body wrapper ends here -->
            </div>
            <!-- content wrapper ends here -->
        </div>
        <!-- body ends here -->
    </div>
    <!-- wrapper ends here -->
</section>
