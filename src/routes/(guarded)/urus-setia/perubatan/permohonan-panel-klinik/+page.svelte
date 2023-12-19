<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { Select } from 'flowbite-svelte';
    import { permohonanKlinikPanel } from '$lib/mocks/urus-setia/perubatan/permohonan-klinik-panel';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Klinik Panel"
        description="Hal-hal berkaitan dengan pengurusan klinik panel"
        ><FormButton
            type="new"
            addLabel="Tambah Klinik Panel"
            onClick={() => {
                goto('');
            }}
        /></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="Kod Klinik" type="text" />
                <ShortTextField label="Nama Klinik" type="text" />
                <p class="text-sm font-normal">Negeri</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="bulan"
                        items={[
                            {
                                value: 1,
                                name: 'Johor',
                            },
                            {
                                value: 2,
                                name: 'Melaka',
                            },
                            {
                                value: 3,
                                name: 'Pahang',
                            },
                            {
                                value: 4,
                                name: 'Negeri Sembilan',
                            },
                            {
                                value: 5,
                                name: 'Selangor',
                            },
                            {
                                value: 6,
                                name: 'Perak',
                            },
                            {
                                value: 7,
                                name: 'Terengganu',
                            },
                            {
                                value: 8,
                                name: 'Kelantan',
                            },
                            {
                                value: 9,
                                name: 'Pulau Pinang',
                            },
                            {
                                value: 10,
                                name: 'Kedah',
                            },
                            {
                                value: 11,
                                name: 'Perlis',
                            },
                            {
                                value: 12,
                                name: 'Sabah',
                            },
                            {
                                value: 13,
                                name: 'Sarawak',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                </div>
                <p class="text-sm font-normal">Status</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="status"
                        items={[
                            {
                                value: 1,
                                name: 'Baru',
                            },
                            {
                                value: 2,
                                name: 'SOKONG - Penyokong',
                            },
                            {
                                value: 3,
                                name: 'TIDAK SOKONG - Penyokong',
                            },
                            {
                                value: 4,
                                name: 'LULUS - Pelulus',
                            },
                            {
                                value: 5,
                                name: 'TIDAK LULUS - Pelulus',
                            },
                            {
                                value: 6,
                                name: 'SAH - Urus Setia',
                            },
                            {
                                value: 7,
                                name: 'TIDAK SAH -Urus Setia',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                </div>
                <ShortTextField label="Tarikh Dimohon" type="date" />
                <ShortTextField label="Tarikh Dilantik" type="date" />
            </div>
        </div>
    </FilterContainer>
    <section class="h-full w-full">
        <SectionHeader title="Senarai Rekod"></SectionHeader>
        <DynamicTable
            tableItems={permohonanKlinikPanel}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                goto(
                    '/urus-setia/perubatan/permohonan-panel-klinik/tambah-klinik-panel',
                );
            }}
        ></DynamicTable>
    </section>
</section>
