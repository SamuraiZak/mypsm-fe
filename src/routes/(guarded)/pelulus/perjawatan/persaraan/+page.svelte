<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { persaraanPaksaanStatus } from '$lib/mocks/perjawatan/persaraan/persaraan-paksaan-status';
    import { goto } from '$app/navigation';
    import { pelulusPersaraan } from '$lib/mocks/pelulus/pelulus-persaraan';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Senarai Rekod Persaraan"
        description="Senarai permohonan persaraan"
    >
    </ContentHeader>
</section>

<section
class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-2.5"
    >
            <FilterContainer>
                <ShortTextField label="No Pekerja*" type="text" />
                <ShortTextField label="Nama*" type="text" />
                <ShortTextField label="No Kad Pengenalan*" type="text" />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    options={persaraanPaksaanStatus}
                />
                <ShortTextField label="Tarikh Bersara Awal" type="date" />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={pelulusPersaraan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/pelulus/perjawatan/persaraan/butiran-persaraan',
                        );
                    }}
                ></DynamicTable>
            </div>
</section>
