<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { Select } from 'flowbite-svelte';
    import { tuntutanPerubatan } from '$lib/mocks/kakitangan/perubatan/tuntutan-perubatan';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { bakiPeruntukan } from '$lib/mocks/kakitangan/perubatan/baki-peruntukan';

    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Perubatan"
        description="Hal-hal berkaitan perubatan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <CustomTab>
        <CustomTabContent title="Tuntutan Perubatan">
            <SectionHeader title="Senarai Perubatan yang dimohon"
                ><TextIconButton
                    primary
                    label="Tuntutan Baru"
                    onClick={() => {
                        goto('perubatan/tuntutan-baru');
                    }}><SvgPlus /></TextIconButton
                ></SectionHeader
            >
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <ShortTextField label="No. Pekerja" type="text" />
                        <ShortTextField label="Nama Kakitangan" type="text" />
                        <ShortTextField
                            label="Jumlah Tuntutan (RM)"
                            type="text"
                        />
                        <p class="text-sm font-normal">Status</p>
                        <div
                            class="flex flex-row items-center justify-start gap-x-2.5"
                        >
                            <Select
                                id="status-dropdown"
                                items={[
                                    {
                                        value: 1,
                                        name: 'BERJAYA - Sistem',
                                    },
                                    {
                                        value: 2,
                                        name: 'TIDAK BERJAYA - Sistem',
                                    },
                                    {
                                        value: 3,
                                        name: 'LULUS - Pelulus',
                                    },
                                    {
                                        value: 4,
                                        name: 'TIDAK LULUS - Pelulus',
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
            <SectionHeader title="Hasil Carian"
                ><DropdownSelect
                    id="tahun-dropdown"
                    label="Tahun"
                    dropdownType="label-left"
                    bind:index={selectedTahun}
                    options={tahun}
                ></DropdownSelect></SectionHeader
            >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable tableItems={tuntutanPerubatan}></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Perkhidmatan">
            <SectionHeader title="Semakan Baki Peruntukan Perubatan"
                ><TextIconButton
                    primary
                    label="Buat Pembayaran"
                    onClick={() => {
                        goto('perubatan/buat-pembayaran');
                    }}
                ></TextIconButton></SectionHeader
            >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable tableItems={bakiPeruntukan}></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
