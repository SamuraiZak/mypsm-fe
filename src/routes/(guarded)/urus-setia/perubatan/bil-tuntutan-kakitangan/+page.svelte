<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { tuntutanKakitangan } from '$lib/mocks/urus-setia/perubatan/tuntutan-kakitangan';
    import { melebihiPeruntukan } from '$lib/mocks/urus-setia/perubatan/melebihi-peruntukan';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import { kakitanganPeruntukan } from '$lib/mocks/urus-setia/perubatan/kakitangan-peruntukan';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Tuntutan Kakitangan"
        description="Hal-hal berkaitan dengan pengurusan tuntutan kakitangan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <CustomTab>
        <CustomTabContent title="Senarai Tuntutan Kakitangan">
            <SectionHeader title="Senarai Rekod Tuntutan Kakitangan"
            ></SectionHeader>
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <ShortTextField label="No. Pekerja" type="text" />
                        <ShortTextField label="Nama Kakitangan" type="text" />
                        <ShortTextField
                            label="No. Kad Pengenalan"
                            type="text"
                        />
                    </div>
                </div>
            </FilterContainer>
            <SectionHeader title="Hasil Carian"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={tuntutanKakitangan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/perubatan/bil-tuntutan-kakitangan/butiran-tuntutan-kakitangan',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Senarai Kakitangan - Peruntukan">
            <SectionHeader title="Semakan Rekod Peruntukan bagi Kakitangan"
            ></SectionHeader>
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <ShortTextField label="No. Pekerja" type="text" />
                        <ShortTextField label="Nama Kakitangan" type="text" />
                        <ShortTextField
                            label="No. Kad Pengenalan"
                            type="text"
                        />
                    </div>
                </div>
            </FilterContainer>
            <section class="h-full w-full">
                <DataTable title="Hasil Carian">
                    <DtTableHead>
                        <DtTableHeadCell title="No. Pekerja"></DtTableHeadCell>
                        <DtTableHeadCell title="Nama Kakitangan"></DtTableHeadCell>
                        <DtTableHeadCell title="No. Kad Pengenalan"></DtTableHeadCell>
                        <DtTableHeadCell title="Jumlah Peruntukan (RM)"></DtTableHeadCell>
                        <DtTableHeadCell title="Baki Peruntukan (RM)"></DtTableHeadCell>
                        <DtTableHeadCell title="Jumlah Yang Perlu Dibayar"></DtTableHeadCell>
                        <DtTableHeadCell title="Status"></DtTableHeadCell>
                    </DtTableHead>
                    <DtTableBody>
                        {#each kakitanganPeruntukan as item}
                            <DtTableRow>
                                <DtTableDataCell value={item.noPekerja}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.namaKakitangan}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.noKadPengenalan}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.jumlahPeruntukan}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.bakiPeruntukan}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.jumlahYangPerluDibayar}
                                ></DtTableDataCell>
                                <DtTableDataCell>
                                    <IconButton onClick={() => {}}>
                                        <SvgPdf></SvgPdf>
                                    </IconButton>
                                </DtTableDataCell>
                            </DtTableRow>
                        {/each}
                    </DtTableBody>
                </DataTable>
            </section>
        </CustomTabContent>
        <CustomTabContent
            title="Senarai Pembayaran Untuk Tuntutan Melebihi Peruntukan"
        >
            <SectionHeader
                title="Semakan Pembayaran Untuk Tuntutan Melebihi Peruntukan"
            ></SectionHeader>
            <FilterContainer>
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <ShortTextField label="No. Pekerja" type="text" />
                        <ShortTextField label="Nama Kakitangan" type="text" />
                        <ShortTextField
                            label="No. Kad Pengenalan"
                            type="text"
                        />
                    </div>
                </div>
            </FilterContainer>
            <SectionHeader title="Hasil Carian"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={melebihiPeruntukan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/perubatan/bil-tuntutan-kakitangan/butiran-tuntutan-melebihi-peruntukan',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
