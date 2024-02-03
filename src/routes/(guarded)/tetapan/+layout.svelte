<script lang="ts">
    import QuickLinkButton from '$lib/components/buttons/QuickLinkButton.svelte';
    import NotificationCard from '$lib/components/cards/NotificationCard.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';

    let notificationList = [
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
        {
            subject: 'Menantikan kelulusan anda',
            title: 'Elaun Mengunjungi Wilayah Asal',
            applicant: 'Abdul Khalid',
            duration: '2 hari yang lalu',
        },
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Halaman Tetapan"
        description="Uruskan tetapan untuk akaun anda"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-auto"
>
    <div class="flex h-full w-full flex-row items-start justify-start">
        <div
            class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
        >
            <div
                class="flex h-full w-full max-w-[600px] flex-col items-center justify-start"
            >
                <slot />
            </div>
        </div>
    </div>
</section>
