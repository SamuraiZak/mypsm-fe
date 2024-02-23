<script>
    import { Card } from 'flowbite-svelte';
    import FormButton from '../buttons/FormButton.svelte';
    import CustomCard from '../cards/CustomCard.svelte';
    import CustomCardBody from '../cards/CustomCardBody.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import TextIconButton from '../buttons/TextIconButton.svelte';
    import CustomCardHeader from '../cards/CustomCardHeader.svelte';
    export let onFilter = () => {};
</script>

<!-- <Card class="mb-[10px] min-w-full border-system-primary" shadow={false}>
    <form class="flex flex-col space-y-6" action="">
        <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
                Semua Tetapan Pencarian
            </p>
            <FormButton
                type="find"
                onClick={() => {
                    console.log('Cari'); // Placeholder for search action
                }}
            />
        </div>
        <hr class="border-system-accent" />
        <div class="flex flex-wrap items-center gap-x-8 gap-y-5">
            <slot />
        </div>
    </form>
</Card> -->

<CustomCard borderClass="border-system-primary">
    <CustomCardHeader title="Semua Tetapan Pencarian">
        <TextIconButton label="Cari" primary onClick={onFilter}>
            <SvgManifyingGlass></SvgManifyingGlass>
        </TextIconButton>
    </CustomCardHeader>
    <CustomCardBody>
        <div class="flex w-full flex-wrap gap-2.5">
            <slot />
        </div>
    </CustomCardBody>
</CustomCard>
