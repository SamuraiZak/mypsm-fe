<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Pertukaran"></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Pertukaran Atas Permohonan Sendiri">
            <div
                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto"
            ></div>
        </CustomTabContent>
    </CustomTab>
</section>
