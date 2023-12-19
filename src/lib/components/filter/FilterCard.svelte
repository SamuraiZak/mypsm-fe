<script lang="ts">
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
</script>

<div
    class="flex min-h-[40px] w-full flex-col gap-y-2.5 rounded-[3px] border border-bdr-primary bg-bgr-primary p-2.5"
>
    <!-- filter header -->
    <div
        class="flex h-[40] min-h-[40px] w-full flex-row items-center justify-between"
    >
        <div class="flex h-full flex-row items-center justify-start">
            <p class="text-sm font-semibold text-txt-secondary">
                Semua Tetapan Pencarian
            </p>
        </div>
        <div class="flex h-full flex-row items-center justify-end">
            <button
                class="flex h-[28px] max-h-[28px] min-h-[28px] flex-row justify-center gap-1 rounded-[3px] bg-system-primary px-2.5"
            >
                <!-- icon -->
                <div class="flex h-full flex-row items-center justify-center">
                    <span class=" text-txt-blend">
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </span>
                </div>
                <!-- label -->
                <div class="flex h-full flex-row items-center justify-center">
                    <p class="text-sm font-normal text-txt-blend">Cari</p>
                </div>
            </button>
        </div>
    </div>

    <hr class="border-bdr-primary" />

    <!-- filter body -->
    <div class="flex w-full flex-wrap justify-start gap-2.5">
        <slot />
    </div>
</div>
