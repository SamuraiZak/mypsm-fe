<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowRightSquareFill from '$lib/assets/svg/SvgArrowRightSquareFill.svelte';
    import SvgBookSolid from '$lib/assets/svg/SvgBookSolid.svelte';
    import SvgCalendarSolid from '$lib/assets/svg/SvgCalendarSolid.svelte';
    import SvgChequeSolid from '$lib/assets/svg/SvgChequeSolid.svelte';
    import SvgCoinSolid from '$lib/assets/svg/SvgCoinSolid.svelte';
    import SvgHammerSolid from '$lib/assets/svg/SvgHammerSolid.svelte';
    import SvgHouseSolid from '$lib/assets/svg/SvgHouseSolid.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import SvgStethescope from '$lib/assets/svg/SvgStethescope.svelte';
    import SvgTieSolid from '$lib/assets/svg/SvgTieSolid.svelte';
    import QuickLinkCard from '$lib/components/card/QuickLinkCard.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type { NavItem } from '$lib/dto/core/sidebar/sidebar.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    function handleQuicklinkClick(nav: NavItem) {
        if (nav.path !== '') {
            goto(nav.path);
        } else {
            if (nav.subItems !== undefined) {
                const url = nav.subItems[0].path;
                goto(url);
            }
        }
    }
</script>

<section
    class="flex h-full max-h-full w-full flex-col gap-10 overflow-hidden p-10"
>
    <!-- group #1 starts here -->
    <div class="flex h-fit w-full flex-col gap-2.5">
        <!-- group header starts here -->
        <div class="flex w-full flex-col gap-1.5">
            <div class="flex w-full flex-col items-start justify-center">
                <span class="text-xl font-semibold leading-tight"
                    >Halaman Utama</span
                >
            </div>
            <div class="flex w-full flex-col items-start justify-center">
                <span
                    class="text-base font-normal leading-loose text-ios-basic-inactiveGray"
                    >Selamat datang ke Sistem MYPSM Lembaga Kemajuan Ikan
                    Malaysia</span
                >
            </div>
        </div>
        <!-- group header ends here -->

        <!-- group body starts here -->

        <div class="flex w-full flex-col items-center justify-start gap-2">
            <div
                class="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-5"
            >
                {#each data.props.navigationList as nav}
                    <button
                        on:click={() => {
                            handleQuicklinkClick(nav);
                        }}
                        class="flex flex-row items-center justify-start gap-2 rounded-md border p-2 hover:border-ios-activeColors-activeBlue-light"
                    >
                        <div
                            class="flex h-fit min-h-10 w-fit flex-row items-center justify-start"
                        >
                            <span
                                class="flex h-fit w-fit flex-col items-center justify-center text-wrap text-center text-base font-medium text-blue-400"
                            >
                                <SvgArrowRightSquareFill size="25"
                                ></SvgArrowRightSquareFill>
                            </span>
                        </div>
                        <div
                            class="flex h-fit min-h-10 w-full flex-row items-center justify-start"
                        >
                            <span
                                class="h-fit w-full text-wrap text-left text-base font-medium"
                            >
                                {nav.name}
                            </span>
                        </div>
                    </button>
                {/each}
            </div>
        </div>

        <!-- group body ends here -->
    </div>
    <!-- group #1 ends here -->
</section>
