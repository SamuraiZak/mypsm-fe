<script>
    import TextIconButton from '../button/TextIconButton.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import ContentHeader from '../headers/ContentHeader.svelte';
    import CustomCard from '../card/CustomCard.svelte';
    export let onFilter = () => {};
</script>

<CustomCard borderClass="border-system-primary">
    <ContentHeader title="Semua Tetapan Pencarian">
        <TextIconButton label="Cari" type="primary" onClick={onFilter}>
            <SvgManifyingGlass></SvgManifyingGlass>
        </TextIconButton>
    </ContentHeader>
    <div
        class="flex h-full min-h-[40px] w-full flex-col items-center justify-start p-2.5"
    >
        <div class="flex w-full flex-wrap gap-2.5">
            <slot />
        </div>
    </div>
</CustomCard>
