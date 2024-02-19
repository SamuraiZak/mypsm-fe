<script lang="ts">
    import CardButton from '$lib/components/button/CardButton.svelte';
    import SvgLock from '$lib/assets/svg/SvgLock.svelte';
    import SvgMailSolid from '$lib/assets/svg/SvgMailSolid.svelte';
    import { goto } from '$app/navigation';
</script>
 
<section
    class="flex h-full max-h-full w-full flex-col gap-2 overflow-hidden p-10 pb-2"
>
    <!-- group #1 starts here -->
    <div class="flex h-fit w-full flex-col gap-2.5">
        <!-- group header starts here -->
        <div class="flex w-full flex-col gap-1.5">
            <div class="flex w-full flex-col items-start justify-center">
                <span class="text-xl font-semibold leading-tight">Tetapan</span>
            </div>
            <div class="flex w-full flex-col items-start justify-center">
                <span
                    class="text-base font-normal leading-loose text-ios-basic-inactiveGray"
                    >Kemaskini tetapan akaun anda.</span
                >
            </div>
        </div>
        <!-- group header ends here -->

        <!-- group body starts here -->

        <div class="flex w-full flex-col items-center justify-start gap-2">
            <!-- button group starts here -->
            <div class="grid w-full grid-cols-2 gap-2.5 md:grid-cols-3">
                <CardButton
                    title="E-mel"
                    subtitle="Kemaskini sekarang"
                    onClick={() => {}}
                >
                    <SvgMailSolid slot="icon" size="20"></SvgMailSolid>
                </CardButton>
                <CardButton
                    title="Kata Laluan"
                    subtitle="Kemaskini sekarang"
                    onClick={() => {
                        goto('/tetapan/kata-laluan');
                    }}
                >
                    <SvgLock slot="icon" size="20"></SvgLock>
                </CardButton>
            </div>
            <!-- button group ends here -->
        </div>

        <!-- group body ends here -->
    </div>
    <!-- group #1 ends here -->
</section>
