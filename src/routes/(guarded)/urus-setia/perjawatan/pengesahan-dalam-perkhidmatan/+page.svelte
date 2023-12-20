<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { lantikanKeGredTable } from '$lib/mocks/kakitangan/pengesahan/lantikan-ke-gred/lantikan-ke-gred-table';
    import { melebihi3TahunTable } from '$lib/mocks/kakitangan/pengesahan/melebihi-tempoh-3-tahun/melebihi-tempoh-3-tahun-table';
    import { lantikanBaruTable } from '$lib/mocks/kakitangan/pengesahan/pengesahan-lantikan-baru/lantikan-baru-table';
    import { positions } from '$lib/mocks/positions/positions';
    import { status } from '$lib/mocks/status/status';

    let selectedStatus = status[0].value;
    let selectedPos: string = positions[0].value;
    let passData: Record<string, any> = {};
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengesahan Dalam Perkhidmatan"
        description="Hal-hal berkaitan Pengesahan Dalam Perkhidmatan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Pengesahan Lantikan Baru">
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <!-- <DynamicTable
                    tableItems={lantikanBaruTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/baru');
                        else if (passData.status === 'DIPERAKU - Pengarah Negeri/Bahagian')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/diperaku-pengarah-negeri-bahagian');
                        else if (passData.status === 'Selesai')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/selesai');
                    }}
                    bind:passData
                ></DynamicTable> -->
                <DataTable title="">
                    <DtTableHead>
                        <DtTableHeadCell title="Bil. " />
                        <DtTableHeadCell title="No. Pekerja" />
                        <DtTableHeadCell title="Nama Pekerja" />
                        <DtTableHeadCell title="No. Kad Pengenalan" />
                        <DtTableHeadCell
                            title="Jawatan Pertama Dilantik Di Lembaga"
                        />
                        <DtTableHeadCell title="Tarikh Lantikan" />
                        <DtTableHeadCell title="Jawatan Semasa" />
                        <DtTableHeadCell title="Penempatan Semasa" />

                        <!-- <div class=""> -->
                            <!-- <DtTableHeadCell
                                title="Peperiksaan Perkhidmatan/Kursus Induksi"
                            ></DtTableHeadCell> -->
                            <div class="px-6 py-2 text-center border">
                                <span class="text-center text-sm font-bold text-txt-secondary">
                                    Peperiksaan Perkhidmatan/Kursus Induksi
                                </span>
                            </div>
                            <!-- <DtTableHead> -->
                                <div class="flex">
                                <DtTableHeadCell
                                    title="Program Transformasi Minda"
                                ></DtTableHeadCell>
                                <DtTableHeadCell
                                    title="Peperiksaan JPA Bahagian A/B"
                                />
                                <DtTableHeadCell
                                    title="Peperiksaan Jabatan Bahagian II/III,IV"
                                />
                                <DtTableHeadCell title="ISAC" />
                                <DtTableHeadCell title="ISAC (PTSU)" />
                            <!-- </DtTableHead> -->
                            </div>
                        <!-- </div> -->

                        <DtTableHeadCell title="LNPT" />
                        <DtTableHeadCell title="Status" />
                        <DtTableHeadCell></DtTableHeadCell>
                    </DtTableHead>
                    <DtTableBody>
                        {#each lantikanBaruTable as item, i (i)}
                            <DtTableRow>
                                <DtTableDataCell value={i + 1} />
                                <DtTableDataCell value={item.employeeId} />
                                <DtTableDataCell value={item.employeeName} />
                                <DtTableDataCell value={item.idNumber} />
                                <DtTableDataCell
                                    value={item.jawatanPertamaDilantikDiLembaga}
                                />
                                <DtTableDataCell value={item.tarikhLantikan} />
                                <DtTableDataCell value={item.jawatanSemasa} />
                                <DtTableDataCell
                                    value={item.penempatanSemasa}
                                />
                                
                                <div class="grid grid-cols-8">
                                    
                                        <DtTableDataCell>
                                            <div class="col-span-2">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-3">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-1">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-2">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-2">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-2">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-2">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <div class="col-span-2">
                                                <SvgCheck />
                                            </div>
                                        </DtTableDataCell>

                                </div>
<!--                                 

                                <DtTableDataCell><SvgCheck /></DtTableDataCell>
                                <DtTableDataCell><SvgCheck /></DtTableDataCell>

                                <DtTableDataCell><SvgCheck /></DtTableDataCell>
                                <DtTableDataCell><SvgCheck /></DtTableDataCell>
                                <DtTableDataCell><SvgCheck /></DtTableDataCell>
                                <DtTableDataCell><SvgCheck /></DtTableDataCell>
                                <DtTableDataCell><SvgCheck /></DtTableDataCell> -->
                               

                                <DtTableDataCell>
                                    {#if item.LNPT === true}
                                        <SvgCheck />
                                    {:else}
                                        <SvgXMark />
                                    {/if}
                                </DtTableDataCell>
                                <DtTableDataCell value={item.status} />
                                <DtTableDataCell value="action" />
                            </DtTableRow>
                        {/each}
                    </DtTableBody>
                </DataTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pengesahan Yang Melebihi Tempoh 3 Tahun">
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={melebihi3TahunTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/baru',
                            );
                        else if (
                            passData.status ===
                            'DIPERAKU - Pengarah Negeri/Bahagian'
                        )
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/diperaku-pengarah-negeri-bahagian',
                            );
                        else if (passData.status === 'Selesai')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/selesai',
                            );
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent
            title="Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
        >
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Rekod Kumpulan Persaraan Lain-lain"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={lantikanKeGredTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/baru',
                            );
                        else if (
                            passData.status ===
                            'DIPERAKU - Pengarah Negeri/Bahagian'
                        )
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/diperaku-pengarah-negeri-bahagian',
                            );
                        else if (passData.status === 'Selesai')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/selesai',
                            );
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
