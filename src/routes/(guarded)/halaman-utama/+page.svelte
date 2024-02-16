<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import QuicklinkCard from '$lib/components/quicklink/QuicklinkCard.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
</script>

<!-- content header starts here -->
<ContentHeader title="Halaman Utama"></ContentHeader>
<!-- content header ends here -->

<!-- content body starts here -->
<section
    class="flex h-full max-h-full w-full flex-col gap-2 overflow-hidden p-10 pb-2"
>
    <div class="flex w-full flex-col gap-2 px-2">
        <div class="flex w-full flex-col items-start justify-center">
            <span class="text-xl font-semibold leading-tight"
                >Selamat Datang!</span
            >
        </div>
        <div class="flex w-full flex-col items-start justify-center">
            <span
                class="text-base font-normal leading-loose text-ios-basic-inactiveGray"
                >Berikut adalah agenda semasa yang memerlukan perhatian anda</span
            >
        </div>
    </div>
    <div
        class="flex max-h-full w-full flex-col justify-start overflow-y-auto px-2"
    >
        <CustomTab>
            <CustomTabContent title="Modul">
                <div class="flex w-full flex-col gap-2">
                    <QuicklinkCard
                        title="Perjawatan"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Cuti"
                        subtitle="Tiada maklumat terkini"
                        redirectPath="/cuti/laporan-cuti"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Elaun-elaun Perkhidmatan"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Integriti"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Latihan"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Pinjaman & Kuarters"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Perubatan"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                    <QuicklinkCard
                        title="Rekod Perkhidmatan"
                        subtitle="Tiada maklumat terkini"
                    ></QuicklinkCard>
                </div>
            </CustomTabContent>
            <CustomTabContent title="Notifikasi">
                <div class="flex w-full flex-col gap-2">
                    <QuicklinkCard
                        title="Permohonan diluluskan"
                        subtitle="Permohonan cuti anda telah diluluskan"
                    ></QuicklinkCard>
                </div>
            </CustomTabContent>
        </CustomTab>
    </div>
</section>
<!-- content body ends here -->
