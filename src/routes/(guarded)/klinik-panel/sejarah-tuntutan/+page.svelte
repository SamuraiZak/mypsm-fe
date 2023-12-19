<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { Select } from 'flowbite-svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import { Badge } from 'flowbite-svelte';
    import { sejarahTuntutan } from '$lib/mocks/klinik-panel/sejarah-tuntutan';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Rawatan"
        description="Hal-hal berkaitan dengan pengurusan perubatan kakitangan LKIM"
        ><TextIconButton
            primary
            label="Tambah Rekod"
            onClick={() => {
                goto('');
            }}><SvgPlus /></TextIconButton
        ></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="Nama Pekerja" type="text" />
                <ShortTextField label="Nama Pesakit" type="text" />
                <ShortTextField label="Kod Klinik" type="text" />
                <ShortTextField label="Nama Klinik" type="text" />
                <p class="text-sm font-normal">Status</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="status"
                        items={[
                            {
                                value: 1,
                                name: 'Selesai',
                            },
                            {
                                value: 2,
                                name: 'Ditolak',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                    <p class="text-sm font-normal">Gred</p>
                    <div
                        class="flex flex-row items-center justify-start gap-x-2.5"
                    >
                        <Select
                            id="gred"
                            items={[
                                {
                                    value: 1,
                                    name: '41',
                                },
                                {
                                    value: 2,
                                    name: '27',
                                },
                                {
                                    value: 3,
                                    name: '17',
                                },
                                {
                                    value: 4,
                                    name: '11',
                                },
                                {
                                    value: 5,
                                    name: '1',
                                },
                            ]}
                            placeholder="Semua"
                            class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                            value={''}
                        ></Select>
                    </div>
                </div>
            </div>
        </div></FilterContainer
    >
    <SectionHeader title="Simpan semua tuntutan yang dipilih dibawah"><FormButton type="simpan"></FormButton></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <section class="h-full w-full">
            <DataTable title="Senarai Rekod">
                <DtTableHead>
                    <DtTableHeadCell title="Nama Kakitangan"></DtTableHeadCell>
                    <DtTableHeadCell title="No. Kad Pengenalan"></DtTableHeadCell>
                    <DtTableHeadCell title="Nama Pesakit"></DtTableHeadCell>
                    <DtTableHeadCell title="Pejabat LKIM"></DtTableHeadCell>
                    <DtTableHeadCell title="Status"></DtTableHeadCell>
                    <DtTableHeadCell title="Tindakan/Ulasan"></DtTableHeadCell>
                    <DtTableHeadCell></DtTableHeadCell>
                </DtTableHead>
                <DtTableBody>
                    {#each sejarahTuntutan as item}
                        <DtTableRow>
                            <DtTableDataCell value={item.nama}
                            ></DtTableDataCell>
                            <DtTableDataCell value={item.noKP}></DtTableDataCell>
                            <DtTableDataCell value={item.namaPesakit}></DtTableDataCell>
                            <DtTableDataCell value={item.pejabat}></DtTableDataCell>
                            <DtTableDataCell value="">
                                {#if item.status == 'Selesai'}
                                    <Badge rounded color="green"
                                        >{item.status}</Badge
                                    >
                                {:else}
                                    <Badge rounded color="red">{item.status}</Badge
                                    >
                                {/if}
                            </DtTableDataCell>
                            <DtTableDataCell value={item.tindakan}></DtTableDataCell>
                            <DtTableDataCell>
                                <IconButton
                                    onClick={() => {
                                        goto(
                                            '',
                                        );
                                    }}
                                    ><SvgEllipsisCircle
                                    ></SvgEllipsisCircle></IconButton
                                >
                            </DtTableDataCell>
                        </DtTableRow>
                    {/each}
                </DtTableBody>
            </DataTable>
        </section>
    </div>
</section>
