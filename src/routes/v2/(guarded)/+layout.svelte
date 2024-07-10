<script lang="ts">
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
    import lkim_logo from '$lib/assets/images/LKIM.png';
    import mypsm_logo from '$lib/assets/images/MyPSM.png';
    import type { LayoutData } from './$types';
    import SideNavBar from '$lib/components/sidebar/SideNavBar.svelte';

    export let data: LayoutData;
</script>

<div class="flex h-screen w-screen flex-col items-start justify-start bg-white">
    <!-- header -->
    <div
        class="flex h-14 w-full flex-row items-center justify-between border-b px-4"
    >
        <!-- brand -->
        <div
            class="hidden hover:scale-105 h-full w-60 min-w-60 flex-row items-center justify-start md:flex"
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
                class="flex w-fit hover:scale-105 flex-row items-center justify-center gap-1 rounded-full bg-gray-100 p-1 hover:bg-gray-200"
            >
                <!-- avatar -->
                <div
                    class="flex h-7 w-7 flex-col items-center justify-center rounded-full bg-blue-500"
                >
                    <p class="text-md font-light text-white">B</p>
                </div>

                <!-- info -->
                <div
                    class="mr-1 flex w-fit flex-row items-center justify-center bg-transparent"
                >
                    <p
                        class="w-fit text-base font-medium leading-tight text-slate-700"
                    >
                        Kakitangan
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
                containerClass="w-[250px] border divide-y z-10 top-10"
            >
                <div slot="header" class="px-4 py-2">
                    <div
                        class="flex h-5 w-full flex-col items-center justify-center"
                    >
                        <p
                            class="font w-full text-start text-base font-medium text-slate-700"
                        >
                            Tukar Peranan
                        </p>
                    </div>
                    <DropdownItem>
                        <div
                            class="flex h-5 w-full flex-col items-center justify-center"
                        >
                            <p
                                class="font w-full text-wrap text-start text-base font-medium text-slate-700"
                            >
                                Kakitangan
                            </p>
                        </div>
                    </DropdownItem>
                    <DropdownItem>
                        <div
                            class="flex h-5 w-full flex-col items-center justify-center"
                        >
                            <p
                                class="font w-full text-wrap text-start text-base font-medium text-slate-700"
                            >
                                Urus Setia Gaji
                            </p>
                        </div>
                    </DropdownItem>
                </div>
                <DropdownItem>
                    <div
                        class="flex h-5 w-full flex-col items-center justify-center"
                    >
                        <p
                            class="font w-full text-start text-base font-medium text-slate-700"
                        >
                            Tetapan Akaun
                        </p>
                    </div>
                </DropdownItem>
                <DropdownItem
                    slot="footer"
                    href="/log-masuk"
                    on:click={() => {
                        localStorage.clear();
                    }}
                >
                    <div
                        class="flex h-5 w-full flex-col items-center justify-center"
                    >
                        <p
                            class="font w-full text-start text-base font-medium text-slate-700"
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
            class="flex h-full w-60 min-w-60 flex-col items-center justify-start overflow-y-auto border-r bg-white"
        >
            <SideNavBar menu={data.props.modules}></SideNavBar>
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
