<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgSetting from '$lib/assets/svg/SvgSetting.svelte';
    import ImpactCard from '$lib/components/button/ImpactCard.svelte';
    import RouterCard from '$lib/components/card/RouterCard.svelte';
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
            class="grid h-fit max-h-full w-full grid-cols-1 gap-2.5 overflow-y-auto py-2 md:grid-cols-2 lg:grid-cols-4"
        >

            <RouterCard
                url={'/pengurusan_sistem/menu_lungsur_turun'}
                icon="setting"
                title="Menu Lungsur Turun"
                subtitle="Ubahsuai menu lungsur turun untuk setiap modul dalam sistem."
            ></RouterCard>
            <RouterCard
                url={'/pengurusan_sistem/peranan_pengguna'}
                icon="setting"
                title="Peranan Pengguna"
                subtitle="Kemaskini peranan untuk semua pengguna sistem."
            ></RouterCard>
            <RouterCard
                url={'/pengurusan_sistem/log_sistem'}
                icon="setting"
                title="Log Audit Sistem"
                subtitle="Pantau semua aktiviti oleh pengguna sistem."
            ></RouterCard>
        </div>
    </div>
</section>
