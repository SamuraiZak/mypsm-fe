<script lang="ts">
    import QuickLinkButton from '$lib/components/buttons/QuickLinkButton.svelte';
    import NotificationCard from '$lib/components/cards/NotificationCard.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';

    let notificationList = [
        {
            subject: 'Permohonan diluluskan',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Permohonan Diluluskan',
            title: 'Cuti Bersalin Untuk Pegawai Perkhidmatan',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Permohonan Ditolak',
            title: 'Permohonan Pembayaran Balik Passport',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Permohonan Sedang Diproses',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Halaman Utama"
        description="Sila gunakan pautan ringkas di bawah untuk pergi ke modul pilihan anda"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-row items-start justify-start overflow-y-hidden"
>
    <div
        class="flex h-full max-h-[100vh-172px] w-full flex-col justify-start overflow-y-auto"
    >
        <div class="flex flex-wrap justify-center gap-2.5 p-2.5">
            <QuickLinkButton
                title="Cuti"
                type="cuti"
                pending={4}
                notification={1}
                onClick={() => {
                    console.log('Cuti');
                }}
            />
            <QuickLinkButton
                title="Latihan"
                type="latihan"
                notification={1}
                pending={1}
                onClick={() => {
                    console.log('Latihan');
                }}
            />
            <QuickLinkButton
                title="Perjawatan"
                type="perjawatan"
                notification={2}
                pending={2}
                onClick={() => {
                    console.log('Perjawatan');
                }}
            />
            <QuickLinkButton
                title="Pinjaman"
                type="pinjaman"
                notification={2}
                rejected={1}
                approved={2}
                pending={2}
                onClick={() => {
                    console.log('Pinjaman');
                }}
            />
            <QuickLinkButton
                title="Elaun Perkhidmatan"
                type="elaun"
                notification={2}
                pending={2}
                onClick={() => {
                    console.log('Elaun Perkhidmatan');
                }}
            />
            <QuickLinkButton
                title="Kakitangan Kontrak"
                type="kontrak"
                notification={2}
                rejected={1}
                approved={2}
                pending={2}
                onClick={() => {
                    console.log('Kakitangan Kontrak');
                }}
            />
        </div>
    </div>

    <div
        class="flex h-full w-[250px] min-w-[250px] flex-col justify-start border-l border-bdr-primary"
    >
        <div
            class="flex h-[40px] min-h-[40px] w-full flex-row items-center justify-start border-b border-bdr-primary bg-system-accent px-2.5"
        >
            <p class="text-base font-normal text-txt-blend">Notifikasi</p>
        </div>
        <div
            class="flex h-full w-full flex-col justify-start gap-2.5 overflow-y-auto p-2.5"
        >
            <NotificationCard
                subject="Menunggu tindakan anda"
                title="Permohonan Cuti"
                user="Mohd Irfan Bin Abu"
                duration="2 hari yang lalu"
            ></NotificationCard>
            <NotificationCard
                subject="Menunggu tindakan anda"
                title="Permohonan Cuti"
                user="Mohd Irfan Bin Abu"
                duration="2 hari yang lalu"
            ></NotificationCard>
            <NotificationCard
                subject="Menunggu tindakan anda"
                title="Permohonan Cuti"
                user="Mohd Irfan Bin Abu"
                duration="2 hari yang lalu"
            ></NotificationCard>
            <NotificationCard
                subject="Menunggu tindakan anda"
                title="Permohonan Cuti"
                user="Mohd Irfan Bin Abu"
                duration="2 hari yang lalu"
            ></NotificationCard>
            <NotificationCard
                subject="Menunggu tindakan anda"
                title="Permohonan Cuti"
                user="Mohd Irfan Bin Abu"
                duration="2 hari yang lalu"
            ></NotificationCard>
        </div>
    </div>
</section>
