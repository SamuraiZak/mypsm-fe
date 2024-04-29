<script lang="ts">
    import RouterCard from '$lib/components/card/RouterCard.svelte';
</script>

<section
    class="h-full max-h-full min-h-full w-full overflow-y-hidden bg-ios-basic-white"
>
    <div
        class="flex h-20 max-h-20 min-h-20 w-full flex-col items-start justify-center bg-ios-basic-white px-10"
    >
        <div class="flex w-full flex-row items-center justify-start">
            <p class="text-xl font-semibold">Tetapan Akaun</p>
        </div>
    </div>

    <div
        class="flex h-full max-h-full min-h-full w-full flex-col items-center justify-start overflow-y-hidden bg-ios-basic-white px-10"
    >
        <div
            class="grid h-fit max-h-full w-full grid-cols-1 gap-2.5 overflow-y-auto py-2 md:grid-cols-2 lg:grid-cols-4"
        >

            <RouterCard
                url={'/tetapan/kata-laluan'}
                icon="setting"
                title="Kata Laluan"
                subtitle="Kemaskini kata laluan untuk akaun anda."
            ></RouterCard>
        </div>
    </div>
</section>
