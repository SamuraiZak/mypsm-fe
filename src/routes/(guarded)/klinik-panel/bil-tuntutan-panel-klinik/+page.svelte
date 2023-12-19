<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { Select } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { rekodBilTuntutan } from '$lib/mocks/klinik-panel/rekod-bil-tuntutan';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Bil Tuntutan Klinik Panel"
        description="Hal-hal berkaitan dengan pengurusan bil tuntutan klinik panel"
    ><TextIconButton
    primary
    label="Tambah Bil Tuntutan"
    onClick={() => {
        goto('bil-tuntutan-panel-klinik/tambah-bil-tuntutan');
    }}><SvgPlus /></TextIconButton
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
                <p class="text-sm font-normal">Negeri</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="negeri"
                        items={[
                            {
                                value: 1,
                                name: 'Januari',
                            },
                            {
                                value: 2,
                                name: 'Februari',
                            },
                            {
                                value: 3,
                                name: 'Mac',
                            },
                            {
                                value: 4,
                                name: 'April',
                            },
                            {
                                value: 5,
                                name: 'Mei',
                            },
                            {
                                value: 6,
                                name: 'Jun',
                            },
                            {
                                value: 7,
                                name: 'Julai',
                            },
                            {
                                value: 8,
                                name: 'Ogos',
                            },
                            {
                                value: 9,
                                name: 'September',
                            },
                            {
                                value: 10,
                                name: 'Oktober',
                            },
                            {
                                value: 11,
                                name: 'November',
                            },
                            {
                                value: 12,
                                name: 'Disember',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                    <p class="text-sm font-normal">Status</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="negeri"
                        items={[
                            {
                                value: 1,
                                name: 'Baru',
                            },
                            {
                                value: 2,
                                name: 'Sokong',
                            },
                            {
                                value: 3,
                                name: 'Tidak Sokong',
                            },
                            {
                                value: 4,
                                name: 'Lulus',
                            },
                            {
                                value: 5,
                                name: 'Tidak Lulus',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                    <ShortTextField label="Tarikh Dimohon" type="date" />
                    <ShortTextField label="Tarikh Dilantik" type="date" />
            </div>
        </div>
    </FilterContainer>
    <SectionHeader title="Senarai Rekod"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={rekodBilTuntutan}
            withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '',
                        );
                    }}
        ></DynamicTable>
    </div>
</section>
