<script lang="ts">
    import { goto } from '$app/navigation';
    import ImpactCard from '$lib/components/button/ImpactCard.svelte';
</script>

<section
    class="h-full max-h-full min-h-full w-full overflow-y-hidden bg-ios-basic-white"
>
    <div
        class="flex h-20 max-h-20 min-h-20 w-full flex-col items-start justify-center bg-ios-basic-white px-10"
    >
        <div class="flex w-full flex-row items-center justify-start">
            <p class="text-xl font-semibold">Pengurusan Sistem</p>
        </div>
    </div>

    <div
        class="flex h-full max-h-full min-h-full w-full flex-col items-center justify-start overflow-y-hidden bg-ios-basic-white px-10"
    >
        <div
            class="grid h-fit max-h-full w-full grid-cols-1 gap-2.5 overflow-y-auto md:grid-cols-2 lg:grid-cols-4"
        >
            <ImpactCard
                title="Menu Lungsur Turun"
                handleClick={() => {
                    goto('/pengurusan_sistem/menu_lungsur_turun');
                }}
            ></ImpactCard>
            <ImpactCard
                title="Peranan Pengguna"
                handleClick={() => {
                    goto('/pengurusan_sistem/carian');
                }}
            ></ImpactCard>
        </div>
    </div>
</section>
