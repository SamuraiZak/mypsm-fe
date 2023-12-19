<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { Select } from 'flowbite-svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import { rekodKelakuan } from '$lib/mocks/kakitangan/rekod-perkhidmatan/rekod-kelakuan';
    import { kenyataanCuti } from '$lib/mocks/kakitangan/rekod-perkhidmatan/kenyataan-cuti';
    import { kenyataanPerkhidmatan } from '$lib/mocks/kakitangan/rekod-perkhidmatan/kenyataan-perkhidmatan';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    let selectedTahun = tahun[0].value;
    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Perkhidmatan"
        description="Senarai rekod perkhidmatan yang telah diambil oleh kakitangan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <CustomTab>
        <CustomTabContent title="Maklumat Pegawai">
            <div
                class="flex w-full flex-col gap-2"
            ></div>
            <div class="felx grid w-full grid-cols-2 flex-col gap-10">
                <div class="space-y-2.5">
                    <div
                        class="flex w-full flex-col gap-2"
                    >
                        <p class="text-sm font-bold">Maklumat Pegawai</p>
                        <TextField
                            id="nama-pegawai"
                            label={'Nama Pegawai'}
                            value={'Ahmad'}
                        ></TextField>
                        <TextField
                            id="no-jabatan"
                            label={'No. Jabatan'}
                            value={'1231321'}
                        ></TextField>
                        <TextField id="no-kp" label={'No. K/P'} value={'93250'}
                        ></TextField>
                        <DateSelector
                            {handleDateChange}
                            label={'Tarikh Lahir'}
                        />
                        <TextField
                            id="tempat-lahir"
                            label={'Tempat Lahir'}
                            value={'Kuching'}
                        ></TextField>
                        <TextField id="agama" label={'Agama'} value={'Islam'}
                        ></TextField>
                        <TextField
                            id="no-sijil-kerakyatan"
                            label={'Nombor Sijil Kerakyatan'}
                            value={''}
                        ></TextField>
                        <DateSelector
                            {handleDateChange}
                            label={'Tarikh Sijil Kerakyatan'}
                        />
                        <DateSelector
                            {handleDateChange}
                            label={'Nombor Kumpulan Wang Jaminan Diri Pegawai Kerajaan'}
                        />
                        <DateSelector
                            {handleDateChange}
                            label={'Nombor Rancangan Pencen Balu dan Anak Yatim'}
                        />
                        <DateSelector
                            {handleDateChange}
                            label={'Nombor Pendaftaran Cawangan Perkhidmatan atau Negeri'}
                        />
                    </div>
                </div>
                <div class="space-y-2.5">
                    <div class="flex w-full flex-col gap-2">
                        <p class="text-sm font-bold">Maklumat Waris</p>
                        <p class="text-sm font-bold">Waris 1</p>
                        <TextField
                            id="nama-waris"
                            label={'Nama Waris'}
                            value={'Abu'}
                        ></TextField>
                        <LongTextField
                            id="alamat"
                            label={'Alamat'}
                            value={'ICOM Square'}
                        ></LongTextField>
                        <p class="text-sm font-bold">Waris 2</p>
                        <TextField
                            id="nama-waris"
                            label={'Nama Waris'}
                            value={'Ali'}
                        ></TextField>
                        <LongTextField
                            id="alamat"
                            label={'Alamat'}
                            value={'Matang Square'}
                        ></LongTextField>
                    </div>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kelayakan"
            ><SectionHeader title="Kelayakan"></SectionHeader>
            <div class="felx grid w-full grid-cols-2 flex-col gap-10">
                <div class="space-y-2.5">
                    <div
                        class="flex w-full flex-col gap-2"
                    >
                        <p class="text-sm font-bold">UPSR / Darjah 6</p>
                        <TextField id="sekolah" label={'Sekolah'} value={''}
                        ></TextField>
                        <TextField id="tahun" label={'Tahun'} value={''}
                        ></TextField>
                        <TextField id="pangkat" label={'Pangkat'} value={''}
                        ></TextField>
                    </div>
                    <div
                        class="flex w-full flex-col gap-2"
                    >
                        <p class="text-sm font-bold">SPM / MCE</p>
                        <TextField id="sekolah" label={'Sekolah'} value={''}
                        ></TextField>
                        <TextField id="tahun" label={'Tahun'} value={''}
                        ></TextField>
                        <TextField id="pangkat" label={'Pangkat'} value={''}
                        ></TextField>
                    </div>
                    <div
                        class="flex w-full flex-col gap-2"
                    >
                        <p class="text-sm font-bold">STPM / HSC</p>
                        <TextField id="sekolah" label={'Sekolah'} value={''}
                        ></TextField>
                        <TextField id="tahun" label={'Tahun'} value={''}
                        ></TextField>
                        <TextField id="pangkat" label={'Pangkat'} value={''}
                        ></TextField>
                    </div>
                </div>
                <div class="space-y-2.5">
                    <div
                        class="flex w-full flex-col gap-2"
                    >
                        <p class="text-sm font-bold">Diploma</p>
                        <TextField id="institusi" label={'Institusi'} value={''}
                        ></TextField>
                        <TextField id="tahun" label={'Tahun'} value={''}
                        ></TextField>
                        <TextField id="pangkat" label={'Pangkat'} value={''}
                        ></TextField>
                        <TextField id="bidang" label={'Bidang'} value={''}
                        ></TextField>
                        <TextField id="catatan" label={'Catatan'} value={''}
                        ></TextField>
                    </div>
                    <div
                        class="flex w-full flex-col gap-2"
                    >
                        <p class="text-sm font-bold">Ijazah</p>
                        <TextField id="institusi" label={'Institusi'} value={''}
                        ></TextField>
                        <TextField id="tahun" label={'Tahun'} value={''}
                        ></TextField>
                        <TextField id="pangkat" label={'Pangkat'} value={''}
                        ></TextField>
                        <TextField id="bidang" label={'Bidang'} value={''}
                        ></TextField>
                        <TextField id="catatan" label={'Catatan'} value={''}
                        ></TextField>
                    </div>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kenyataan Perkhidmatan">
            <SectionHeader title="Senarai Perubatan yang dimohon"
            ></SectionHeader>
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
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
                        <ShortTextField label="Tarikh Mohon" type="date" />
                    </div>
                </div>
            </FilterContainer>

            <SectionHeader title="Senarai Hasil Carian"
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
                <section class="h-full w-full">
                    <DynamicTable tableItems={kenyataanPerkhidmatan}
                    ></DynamicTable>
                </section>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kenyataan Cuti">
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
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
                        <ShortTextField label="Tarikh Daripada" type="date" />
                    </div>
                </div>
            </FilterContainer>
            <SectionHeader title="Senarai Hasil Carian"
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
                <DynamicTable tableItems={kenyataanCuti}></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Rekod Kelakuan">
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <ShortTextField label="Pengesah" type="text" />
                        <ShortTextField label="Tarikh" type="date" />
                    </div>
                </div>
            </FilterContainer>
            <SectionHeader title="Senarai Hasil Carian"
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
                <DynamicTable tableItems={rekodKelakuan}></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
