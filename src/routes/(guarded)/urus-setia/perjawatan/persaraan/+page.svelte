<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { persaraanPilihan } from '$lib/mocks/perjawatan/persaraan/persaraan-pilihan';
    import { persaraanLainLain } from '$lib/mocks/perjawatan/persaraan/persaraan-lain-lain';
    import { persaraanPaksaan } from '$lib/mocks/perjawatan/persaraan/persaraan-paksaan';
    import { persaraanPilihanStatus } from '$lib/mocks/perjawatan/persaraan/persaraan-pilihan-status';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Senarai Rekod Persaraan"
        description="Senarai permohonan persaraan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Persaraan Pilihan">
            <FilterContainer>
                <ShortTextField label="No Pekerja*" type="text" />
                <ShortTextField label="Nama*" type="text" />
                <ShortTextField label="No Kad Pengenalan*" type="text" />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    options={persaraanPilihanStatus}
                />
                <ShortTextField label="Tarikh Bersara Awal" type="date" />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={persaraanPilihan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/perjawatan/persaraan/butiran-persaraan-pilihan',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Persaraan Paksaan">
            <FilterContainer>
                <ShortTextField label="No Pekerja*" type="text" />
                <ShortTextField label="Nama*" type="text" />
                <ShortTextField label="No Kad Pengenalan*" type="text" />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    options={persaraanPilihanStatus}
                />
                <ShortTextField label="Tarikh Bersara Awal" type="date" />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={persaraanPaksaan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/perjawatan/persaraan/butiran-persaraan-paksaan',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Persaraan Lain-lain">
            <SectionHeader title="Senarai Rekod Kumpulan Persaraan Lain-lain"
                ><TextIconButton
                    primary
                    label="Kumpulan Baru"
                    onClick={() => {
                        goto('/urus-setia/perjawatan/persaraan/butiran-persaraan-lain-lain');
                    }}><SvgPlus /></TextIconButton
                ></SectionHeader
            >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={persaraanLainLain}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
