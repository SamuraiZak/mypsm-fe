<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgBookSolid from '$lib/assets/svg/SvgBookSolid.svelte';
    import SvgCalendarSolid from '$lib/assets/svg/SvgCalendarSolid.svelte';
    import SvgChequeSolid from '$lib/assets/svg/SvgChequeSolid.svelte';
    import SvgCoinSolid from '$lib/assets/svg/SvgCoinSolid.svelte';
    import SvgHammerSolid from '$lib/assets/svg/SvgHammerSolid.svelte';
    import SvgHouseSolid from '$lib/assets/svg/SvgHouseSolid.svelte';
    import SvgStethescope from '$lib/assets/svg/SvgStethescope.svelte';
    import SvgTieSolid from '$lib/assets/svg/SvgTieSolid.svelte';
    import QuickLinkCard from '$lib/components/card/QuickLinkCard.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
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
            <CustomTab>
                <CustomTabContent title="Agenda">
                    <!-- button group starts here -->
                    <div
                        class="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3"
                    >
                        <!-- perjawatan -->
                        <QuickLinkCard
                            title="Perjawatan"
                            agendaCount={2}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgTieSolid slot="icon" size="20"></SvgTieSolid>
                        </QuickLinkCard>

                        <!-- Cuti -->
                        <QuickLinkCard
                            title="Cuti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>

                        <!-- Gaji -->
                        <QuickLinkCard
                            title="Gaji"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCoinSolid slot="icon" size="20"></SvgCoinSolid>
                        </QuickLinkCard>

                        <!-- Elaun -->
                        <QuickLinkCard
                            title="Elaun-elaun Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgChequeSolid slot="icon" size="20"
                            ></SvgChequeSolid>
                        </QuickLinkCard>

                        <!-- Integriti -->
                        <QuickLinkCard
                            title="Integriti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHammerSolid slot="icon" size="20"
                            ></SvgHammerSolid>
                        </QuickLinkCard>

                        <!-- Latihan -->
                        <QuickLinkCard
                            title="Latihan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgBookSolid slot="icon" size="20"></SvgBookSolid>
                        </QuickLinkCard>

                        <!-- Pinjaman & Kuarters -->
                        <QuickLinkCard
                            title="Pinjaman & Kuarters"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHouseSolid slot="icon" size="20"
                            ></SvgHouseSolid>
                        </QuickLinkCard>

                        <!-- Perubatan -->
                        <QuickLinkCard
                            title="Perubatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgStethescope slot="icon" size="20"
                            ></SvgStethescope>
                        </QuickLinkCard>

                        <!-- Rekod Perkhidmatan -->
                        <QuickLinkCard
                            title="Rekod Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>
                    </div>
                    <!-- button group ends here -->
                </CustomTabContent>
                <CustomTabContent title="Notifikasi">
                    <!-- button group starts here -->
                    <div class=" flex w-full flex-col gap-2.5 justify-start">
                        <!-- perjawatan -->
                        <QuickLinkCard
                            title="Perjawatan"
                            agendaCount={2}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgTieSolid slot="icon" size="20"></SvgTieSolid>
                        </QuickLinkCard>

                        <!-- Cuti -->
                        <QuickLinkCard
                            title="Cuti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>

                        <!-- Gaji -->
                        <QuickLinkCard
                            title="Gaji"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCoinSolid slot="icon" size="20"></SvgCoinSolid>
                        </QuickLinkCard>

                        <!-- Elaun -->
                        <QuickLinkCard
                            title="Elaun-elaun Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgChequeSolid slot="icon" size="20"
                            ></SvgChequeSolid>
                        </QuickLinkCard>

                        <!-- Integriti -->
                        <QuickLinkCard
                            title="Integriti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHammerSolid slot="icon" size="20"
                            ></SvgHammerSolid>
                        </QuickLinkCard>

                        <!-- Latihan -->
                        <QuickLinkCard
                            title="Latihan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgBookSolid slot="icon" size="20"></SvgBookSolid>
                        </QuickLinkCard>

                        <!-- Pinjaman & Kuarters -->
                        <QuickLinkCard
                            title="Pinjaman & Kuarters"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHouseSolid slot="icon" size="20"
                            ></SvgHouseSolid>
                        </QuickLinkCard>

                        <!-- Perubatan -->
                        <QuickLinkCard
                            title="Perubatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgStethescope slot="icon" size="20"
                            ></SvgStethescope>
                        </QuickLinkCard>

                        <!-- Rekod Perkhidmatan -->
                        <QuickLinkCard
                            title="Rekod Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>
                        <!-- perjawatan -->
                        <QuickLinkCard
                            title="Perjawatan"
                            agendaCount={2}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgTieSolid slot="icon" size="20"></SvgTieSolid>
                        </QuickLinkCard>

                        <!-- Cuti -->
                        <QuickLinkCard
                            title="Cuti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>

                        <!-- Gaji -->
                        <QuickLinkCard
                            title="Gaji"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCoinSolid slot="icon" size="20"></SvgCoinSolid>
                        </QuickLinkCard>

                        <!-- Elaun -->
                        <QuickLinkCard
                            title="Elaun-elaun Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgChequeSolid slot="icon" size="20"
                            ></SvgChequeSolid>
                        </QuickLinkCard>

                        <!-- Integriti -->
                        <QuickLinkCard
                            title="Integriti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHammerSolid slot="icon" size="20"
                            ></SvgHammerSolid>
                        </QuickLinkCard>

                        <!-- Latihan -->
                        <QuickLinkCard
                            title="Latihan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgBookSolid slot="icon" size="20"></SvgBookSolid>
                        </QuickLinkCard>

                        <!-- Pinjaman & Kuarters -->
                        <QuickLinkCard
                            title="Pinjaman & Kuarters"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHouseSolid slot="icon" size="20"
                            ></SvgHouseSolid>
                        </QuickLinkCard>

                        <!-- Perubatan -->
                        <QuickLinkCard
                            title="Perubatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgStethescope slot="icon" size="20"
                            ></SvgStethescope>
                        </QuickLinkCard>

                        <!-- Rekod Perkhidmatan -->
                        <QuickLinkCard
                            title="Rekod Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>
                        <!-- perjawatan -->
                        <QuickLinkCard
                            title="Perjawatan"
                            agendaCount={2}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgTieSolid slot="icon" size="20"></SvgTieSolid>
                        </QuickLinkCard>

                        <!-- Cuti -->
                        <QuickLinkCard
                            title="Cuti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>

                        <!-- Gaji -->
                        <QuickLinkCard
                            title="Gaji"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCoinSolid slot="icon" size="20"></SvgCoinSolid>
                        </QuickLinkCard>

                        <!-- Elaun -->
                        <QuickLinkCard
                            title="Elaun-elaun Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgChequeSolid slot="icon" size="20"
                            ></SvgChequeSolid>
                        </QuickLinkCard>

                        <!-- Integriti -->
                        <QuickLinkCard
                            title="Integriti"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHammerSolid slot="icon" size="20"
                            ></SvgHammerSolid>
                        </QuickLinkCard>

                        <!-- Latihan -->
                        <QuickLinkCard
                            title="Latihan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgBookSolid slot="icon" size="20"></SvgBookSolid>
                        </QuickLinkCard>

                        <!-- Pinjaman & Kuarters -->
                        <QuickLinkCard
                            title="Pinjaman & Kuarters"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgHouseSolid slot="icon" size="20"
                            ></SvgHouseSolid>
                        </QuickLinkCard>

                        <!-- Perubatan -->
                        <QuickLinkCard
                            title="Perubatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgStethescope slot="icon" size="20"
                            ></SvgStethescope>
                        </QuickLinkCard>

                        <!-- Rekod Perkhidmatan -->
                        <QuickLinkCard
                            title="Rekod Perkhidmatan"
                            agendaCount={0}
                            url="/perjawatan/pemangkuan"
                        >
                            <SvgCalendarSolid slot="icon" size="20"
                            ></SvgCalendarSolid>
                        </QuickLinkCard>
                    </div>
                    <!-- button group ends here -->
                </CustomTabContent>
            </CustomTab>
        </div>

        <!-- group body ends here -->
    </div>
    <!-- group #1 ends here -->
</section>
