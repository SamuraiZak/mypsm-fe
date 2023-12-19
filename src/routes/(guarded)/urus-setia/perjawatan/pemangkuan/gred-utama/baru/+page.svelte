<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockCalonPemangkuanList } from '$lib/mocks/perjawatan/pemangkuan/senaraiCalonPemangkuan';

    let checkedItems: Object[] = [];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred Utama"
        description="Sila pilih kakitangan yang layak sebagai calon pemangkuan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Batal"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
        <TextIconButton
            label="Seterusnya"
            primary
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgArrowRight></SvgArrowRight>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <!-- Senarai Semua Kakitangan -->
        <CustomTabContent title="Senarai Semua Kakitangan">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="Nama"></FilterTextInput>
                        <FilterTextInput label="No. K/P"></FilterTextInput>
                    </div>
                </CustomCardBody>
            </CustomCard>

            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockCalonPemangkuanList}
                    hasCheckbox
                    bind:checkedItems
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang DIpilih">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={checkedItems}
                    hasCheckbox
                    bind:checkedItems
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
