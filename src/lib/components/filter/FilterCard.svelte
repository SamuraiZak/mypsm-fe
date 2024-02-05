<script lang="ts">
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import TextIconButton from '../buttons/TextIconButton.svelte';

    export let onClick = () => {};
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
            <TextIconButton primary label="Cari" {onClick}
                ><SvgManifyingGlass /></TextIconButton
            >
        </div>
    </div>

    <hr class="border-bdr-primary" />

    <!-- filter body -->
    <div class="flex w-full flex-wrap justify-start gap-2.5">
        <slot />
    </div>
</div>
