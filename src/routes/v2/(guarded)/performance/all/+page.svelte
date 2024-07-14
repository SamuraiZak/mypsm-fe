<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Laporan Nilaian Prestasi Tahunan"></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-hidden"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start overflow-y-auto p-4"
    >
        <!-- card starts here -->
        <div class="flex w-full flex-col items-center justify-start border">
            <!-- card header starts here -->
            <div
                class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
            >
                <p class="text-start text-base font-semibold">
                    Senarai Kakitangan
                </p>
            </div>
            <!-- card header ends here -->

            <!-- card body starts here -->
            <div
                class="flex w-full flex-col items-start justify-start gap-4 p-4"
            >
                <!-- banner -->
                <div
                    class="flex w-full flex-row items-center gap-2 rounded-md bg-blue-100 p-2"
                >
                    <span class="text-base font-normal text-blue-700">
                        <SvgInfoSolid></SvgInfoSolid>
                    </span>
                    <p class="text-base font-normal text-blue-700">
                        Sila pilih kakitangan yang terlibat.
                    </p>
                </div>
            </div>
            <!-- card body ends here -->
        </div>
        <!-- card ends here -->
    </div>
</section>
