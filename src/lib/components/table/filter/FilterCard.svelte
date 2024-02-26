<script lang="ts">
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';

    export let onSearch = () => {};
    export let cardTitle: string = 'Tetapan Pencarian';
</script>

<div
    class="flex h-fit w-full max-w-full flex-col items-center justify-start gap-2 rounded-md border border-ios-activeColors-activeBlue-light bg-ios-basic-white p-2 pb-4"
>
    <!-- card header -->
    <div class="flex h-10 min-h-10 w-full flex-row justify-between border-b">
        <!-- leading -->
        <div class="flex h-full max-w-full flex-col justify-center">
            <span class="text-wrap text-sm font-semibold">
                {cardTitle}
            </span>
        </div>
        <!-- trailing -->
        <div class="flex h-full max-w-full flex-col justify-center">
            <!-- search button -->
            <button
                on:click={() => {
                    onSearch();
                }}
                class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-[3px] bg-ios-activeColors-activeBlue-light px-2.5 py-0"
            >
                <!-- icon -->
                <div class="flex h-full flex-row items-center justify-center">
                    <span class="leading-loose text-ios-basic-white">
                        <!-- icon slot -->
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </span>
                </div>

                <!-- label -->
                <div class="flex h-full flex-row items-center justify-center">
                    <p
                        class="text-sm font-normal leading-loose text-ios-basic-white"
                    >
                        Cari
                    </p>
                </div>
            </button>
        </div>
    </div>
    <!-- card body -->
    <div
        class="flex h-fit w-full max-w-full flex-row flex-wrap justify-start gap-4"
    >
        <slot />
    </div>
</div>
