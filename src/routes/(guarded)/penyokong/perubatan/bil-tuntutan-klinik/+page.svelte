<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { Select } from 'flowbite-svelte';
    import { tuntutanKlinikPanel } from '$lib/mocks/penyokong/perubatan/tuntutan-klinik-panel';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Bil Tuntutan Klinik Panel"
        description="Hal-hal berkaitan dengan pengurusan klinik panel"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="Kod Klinik" type="text" />
                <ShortTextField label="Nama Klinik" type="text" />
                <p class="text-sm font-normal">Bulan</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="bulan"
                        items={[
                            {
                                value: 1,
                                name: 'January',
                            },
                            {
                                value: 2,
                                name: 'Febrary',
                            },
                            {
                                value: 3,
                                name: 'March',
                            },
                            {
                                value: 4,
                                name: 'April',
                            },
                            {
                                value: 5,
                                name: 'May',
                            },
                            {
                                value: 6,
                                name: 'June',
                            },
                            {
                                value: 7,
                                name: 'July',
                            },
                            {
                                value: 8,
                                name: 'August',
                            },
                            {
                                value: 9,
                                name: 'September',
                            },
                            {
                                value: 10,
                                name: 'October',
                            },
                            {
                                value: 11,
                                name: 'November',
                            },
                            {
                                value: 12,
                                name: 'December',
                            },
                        ]}
                        placeholder=""
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                </div>
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
            </div>
        </div>
    </FilterContainer>
    <section class="h-full w-full">
        <DynamicTable
            tableItems={tuntutanKlinikPanel}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                goto(
                    '/penyokong/perubatan/bil-tuntutan-klinik/maklumat-bil-tuntutan-klinik-panel',
                );
            }}
        ></DynamicTable>
    </section>
</section>
