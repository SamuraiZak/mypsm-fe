<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import Header from '$lib/components/header/Header.svelte';
    import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
    import BreadCrumb from '$lib/components/breadcrumb/Breadcrumb.svelte';
    import {
        activeRole,
        breadCrumb,
        currentPage,
        drawerFull,
    } from '$lib/stores/globalState';
    import Footer from '$lib/components/footer/Footer.svelte';
    import { sidebarAdmin } from '$lib/config/sidebar/sidebar-admin';
    import { sidebarAudit } from '$lib/config/sidebar/sidebar-audit';
    import { sidebarCalon } from '$lib/config/sidebar/sidebar-calon';
    import { sidebarDefault } from '$lib/config/sidebar/sidebar-default';
    import { sidebarGuest } from '$lib/config/sidebar/sidebar-guest';
    import { sidebarKakitangan } from '$lib/config/sidebar/sidebar-kakitangan';
    import { sidebarKetuaPengarah } from '$lib/config/sidebar/sidebar-ketua-pengarah';
    import { sidebarKetuaSeksyen } from '$lib/config/sidebar/sidebar-ketua-seksyen';
    import { sidebarKlinikPanel } from '$lib/config/sidebar/sidebar-klinik-panel';
    import { sidebarPelulus } from '$lib/config/sidebar/sidebar-pelulus';
    import { sidebarPengarahBahagianNegeri } from '$lib/config/sidebar/sidebar-pengarah-bahagian-negeri';
    import { sidebarPengarahAudit } from '$lib/config/sidebar/sidebar-pengarah-audit';
    import { sidebarPengarahKhidmatPengurusan } from '$lib/config/sidebar/sidebar-pengarah-khidmat-pengurusan';
    import { sidebarPenyokong } from '$lib/config/sidebar/sidebar-penyokong';
    import { sidebarSuperAdmin } from '$lib/config/sidebar/sidebar-super-admin';
    import { sidebarUrusSetia } from '$lib/config/sidebar/sidebar-urus-setia';
    import SvgBookmark from '$lib/assets/svg/SvgBookmark.svelte';
    import currentRole from '$lib/stores/activeRole';
    import { sidebarPengarahIntegriti } from '$lib/config/sidebar/sidebar-pengarah-integriti';
    import { sidebarTimbalanKetuaSeksyen } from '$lib/config/sidebar/sidebar-timbalan-ketua-seksyen';
    import { sidebarUrusSetiaPerjawatan } from '$lib/config/sidebar/sidebar-urus-setia-perjawatan';
    import { sidebarUrusSetiaCuti } from '$lib/config/sidebar/sidebar-urus-setia-cuti';
    import { sidebarUrusSetiaGaji } from '$lib/config/sidebar/sidebar-urus-setia-gaji';
    import { sidebarUrusSetiaIntegriti } from '$lib/config/sidebar/sidebar-urus-setia-integriti';
    import { sidebarUrusSetiaLatihan } from '$lib/config/sidebar/sidebar-urus-setia-latihan';
    import { sidebarUrusSetiaLNPT } from '$lib/config/sidebar/sidebar-urus-setia-lnpt';
    import { sidebarUrusSetiaKakitanganKontrak } from '$lib/config/sidebar/sidebar-urus-setia-kakitangan-kontrak';
    import { sidebarUrusSetiaPinjamanDanKuarters } from '$lib/config/sidebar/sidebar-urus-setia-pinjaman-dan-kuarters';
    import { sidebarUrusSetiaPerubatan } from '$lib/config/sidebar/sidebar-urus-setia-perubatan';
    import { sidebarUrusSetiaElaun } from '$lib/config/sidebar/sidebar-urus-setia-elaun-elaun-perkhidmatan';
    import type { LayoutData } from './$types';
    import { sidebarUrusSetiaPersaraan } from '$lib/config/sidebar/sidebar-urus-setia-persaraan';
    import { sidebarUnitPengurusanFasiliti } from '$lib/config/sidebar/sidebar-unit-pengurusan-fasiliti';
    import { sidebarUnitBahagianNegeri } from '$lib/config/sidebar/sidebar-unit-bahagian-negeri';
    import { sidebarUnitBahagian } from '$lib/config/sidebar/sidebar-unit-bahagian';

    $: activeUrl = $page.url.pathname;

    afterNavigate(() => {
        var pages = activeUrl.replace('/', '');
        var subs = pages.split('/');
        breadCrumb.set(subs);
    });

    $: {
        $page.url.pathname;
        /* sidebarContent.set(sidebarNew); */
    }

    export let data: LayoutData;
    $: currentActiveRole = $currentRole;
</script>

<section class="h-screen w-screen bg-bgr-primary">
    <div class="flex h-screen w-screen flex-col items-start justify-start">
        <!-- header -->
        <Header roleOptionList={data.roleOptionsList}></Header>
        <div
            class="flex h-full max-h-[calc(100vh-82px)] w-full flex-row justify-start overflow-hidden"
        >
            <!-- sidebar -->
            <div
                class="no-scrollbar flex h-full w-[200px] min-w-[200px] max-w-[200px] flex-col overflow-y-auto overflow-x-hidden border-r border-bdr-primary bg-bgr-secondary"
            >
                {#if currentActiveRole == 'kakitangan'}
                    <Sidebar sidebarItems={sidebarKakitangan} />

                {:else if currentActiveRole == 'urus-setia'}
                    <Sidebar sidebarItems={sidebarUrusSetia} />

                {:else if currentActiveRole == 'urus setia perjawatan'}
                    <Sidebar sidebarItems={sidebarUrusSetiaPerjawatan} />

                {:else if currentActiveRole == 'urus setia persaraan'}
                    <Sidebar sidebarItems={sidebarUrusSetiaPersaraan} />

                {:else if currentActiveRole == 'urus setia cuti'}
                    <Sidebar sidebarItems={sidebarUrusSetiaCuti} />

                {:else if currentActiveRole == 'urus setia gaji'}
                    <Sidebar sidebarItems={sidebarUrusSetiaGaji} />

                {:else if currentActiveRole == 'urus setia integriti'}
                    <Sidebar sidebarItems={sidebarUrusSetiaIntegriti} />

                {:else if currentActiveRole == 'urus setia lnpt'}
                    <Sidebar sidebarItems={sidebarUrusSetiaLNPT} />

                {:else if currentActiveRole == 'urus setia latihan'}
                    <Sidebar sidebarItems={sidebarUrusSetiaLatihan} />

                {:else if currentActiveRole == 'urus setia kakitangan kontrak'}
                    <Sidebar sidebarItems={sidebarUrusSetiaKakitanganKontrak} />

                {:else if currentActiveRole == 'urus setia pinjaman & kuarters'}
                    <Sidebar
                        sidebarItems={sidebarUrusSetiaPinjamanDanKuarters}
                    />
                {:else if currentActiveRole == 'urus setia perubatan'}
                    <Sidebar sidebarItems={sidebarUrusSetiaPerubatan} />

                {:else if currentActiveRole == 'urus setia elaun-elaun perkhidmatan'}
                    <Sidebar sidebarItems={sidebarUrusSetiaElaun} />

                {:else if currentActiveRole == 'unit pengurusan fasiliti'}
                    <Sidebar sidebarItems={sidebarUnitPengurusanFasiliti} />

                {:else if currentActiveRole == 'unit negeri'}
                    <Sidebar sidebarItems={sidebarUnitBahagianNegeri} />

                {:else if currentActiveRole == 'unit bahagian'}
                    <Sidebar sidebarItems={sidebarUnitBahagian} />

                {:else if currentActiveRole == 'ketua pengarah'}
                    <Sidebar sidebarItems={sidebarKetuaPengarah} />

                {:else if currentActiveRole == 'penyokong'}
                    <Sidebar sidebarItems={sidebarPenyokong} />

                {:else if currentActiveRole == 'pelulus'}
                    <Sidebar sidebarItems={sidebarPelulus} />

                {:else if currentActiveRole == 'pengarah bahagian'}
                    <Sidebar sidebarItems={sidebarPengarahBahagianNegeri} />

                {:else if currentActiveRole == 'pengarah negeri'}
                    <Sidebar sidebarItems={sidebarPengarahBahagianNegeri} />

                {:else if currentActiveRole == 'ketua seksyen'}
                    <Sidebar sidebarItems={sidebarKetuaSeksyen} />

                {:else if currentActiveRole == 'timbalan ketua seksyen'}
                    <Sidebar sidebarItems={sidebarTimbalanKetuaSeksyen} />

                {:else if currentActiveRole == 'klinik panel'}
                    <Sidebar sidebarItems={sidebarKlinikPanel} />

                {:else if currentActiveRole == 'pengarah khidmat pengurusan'}
                    <Sidebar sidebarItems={sidebarPengarahKhidmatPengurusan} />

                {:else if currentActiveRole == 'audit'}
                    <Sidebar sidebarItems={sidebarAudit} />

                {:else if currentActiveRole == 'calon'}
                    <Sidebar sidebarItems={sidebarCalon} />

                {:else if currentActiveRole == 'pengarah integriti'}
                    <Sidebar sidebarItems={sidebarPengarahIntegriti} />

                {:else if currentActiveRole == 'pengarah audit'}
                    <Sidebar sidebarItems={sidebarPengarahAudit} />
                {/if}

                <!-- <Sidenav></Sidenav> -->
            </div>

            <!-- content wrapper -->
            <div
                class="flex h-full w-[calc(100vw-200px)] flex-col items-start justify-start overflow-y-hidden bg-bgr-primary"
            >
                <!-- breadcrumb -->
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-start gap-2.5 border-b border-bdr-primary bg-bgr-primary px-2.5"
                >
                    <span class=" text-txt-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                            />
                        </svg>
                    </span>

                    <BreadCrumb></BreadCrumb>
                </div>

                <!-- content body -->
                <div
                    class="flex h-full w-full max-w-[calc(100vw-122px)] flex-col items-start justify-start overflow-y-hidden"
                >
                    <slot />
                </div>
            </div>
        </div>
        <div class="h-[32px] max-h-[32px] min-h-[32px] w-full">
            <Footer></Footer>
        </div>
    </div>
</section>
