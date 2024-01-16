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

    $: currentActiveRole = $currentRole;
</script>

<section class="h-screen w-screen bg-bgr-primary">
    <div class="flex h-screen w-screen flex-col items-start justify-start">
        <!-- header -->
        <Header></Header>
        <div
            class="flex h-full max-h-[calc(100vh-82px)] w-full flex-row justify-start overflow-hidden"
        >
            <!-- sidebar -->
            <div
                class="no-scrollbar flex h-full w-[250px] min-w-[250px] max-w-[250px] flex-col overflow-y-auto overflow-x-hidden border-r border-bdr-primary bg-bgr-secondary"
            >
                
                {#if currentActiveRole == 'kakitangan'}
                    <Sidebar sidebarItems={sidebarKakitangan} />
                {:else if currentActiveRole == 'urus-setia'}
                    <Sidebar sidebarItems={sidebarUrusSetia} />
                {:else if currentActiveRole == 'ketua-pengarah'}
                    <Sidebar sidebarItems={sidebarKetuaPengarah} />
                {:else if currentActiveRole == 'penyokong'}
                    <Sidebar sidebarItems={sidebarPenyokong} />
                {:else if currentActiveRole == 'pelulus'}
                    <Sidebar sidebarItems={sidebarPelulus} />
                {:else if currentActiveRole == 'pengarah-bahagian-negeri'}
                    <Sidebar sidebarItems={sidebarPengarahBahagianNegeri} />
                {:else if currentActiveRole == 'ketua-seksyen'}
                    <Sidebar sidebarItems={sidebarKetuaSeksyen} />
                {:else if currentActiveRole == 'timbalan-ketua-seksyen'}
                    <Sidebar sidebarItems={sidebarTimbalanKetuaSeksyen} />
                {:else if currentActiveRole == 'klinik-panel'}
                    <Sidebar sidebarItems={sidebarKlinikPanel} />
                {:else if currentActiveRole == 'pengarah-khidmat-pengurusan'}
                    <Sidebar sidebarItems={sidebarPengarahKhidmatPengurusan} />
                {:else if currentActiveRole == 'audit'}
                    <Sidebar sidebarItems={sidebarAudit} />
                {:else if currentActiveRole == 'calon'}
                    <Sidebar sidebarItems={sidebarCalon} />
                {:else if currentActiveRole == 'pengarah-integriti'}
                    <Sidebar sidebarItems={sidebarPengarahIntegriti} />
                {:else if currentActiveRole == 'pengarah-audit'}
                    <Sidebar sidebarItems={sidebarPengarahAudit} />
                {/if}

                <!-- <Sidenav></Sidenav> -->
            </div>

            <!-- content wrapper -->
            <div
                class="flex h-full w-[calc(100vw-250px)] flex-col items-start justify-start overflow-y-hidden bg-bgr-primary"
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
