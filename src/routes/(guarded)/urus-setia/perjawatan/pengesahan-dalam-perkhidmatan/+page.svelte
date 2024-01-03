<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import ComplexTable from '$lib/components/complex-table/ComplexTable.svelte';
    import CxTableBody from '$lib/components/complex-table/CxTableBody.svelte';
    import CxTableDataCell from '$lib/components/complex-table/CxTableDataCell.svelte';
    import CxTableHead from '$lib/components/complex-table/CxTableHead.svelte';
    import CxTableHeadCell from '$lib/components/complex-table/CxTableHeadCell.svelte';
    import CxTableRow from '$lib/components/complex-table/CxTableRow.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    // import TestTable from '$lib/components/table/TestTable.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgPdf2 from '$lib/assets/svg/SvgPDF2.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
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

            <SectionHeader title="Senarai Kakitangan">
                <TextIconButton label="" primary
                    ><SvgPdf2></SvgPdf2>
                </TextIconButton>
                <TextIconButton label="" primary
                    ><SvgExcel></SvgExcel>
                </TextIconButton>
            </SectionHeader>
            <ComplexTable title="">
                <CxTableHead>
                    <CxTableRow headerColor>
                        <CxTableHeadCell rowSize={2} title="Bil." />
                        <CxTableHeadCell rowSize={2} title="No. Pekerja" />
                        <CxTableHeadCell rowSize={2} title="Nama Pekerja" />
                        <CxTableHeadCell
                            rowSize={2}
                            title="No. Kad Pengenalan"
                        />
                        <CxTableHeadCell
                            rowSize={2}
                            title="Jawatan Pertama Dilantik Di Lembaga"
                        />
                        <CxTableHeadCell rowSize={2} title="Tarikh Lantikan" />
                        <CxTableHeadCell rowSize={2} title="Jawatan Semasa" />
                        <CxTableHeadCell
                            rowSize={2}
                            title="Penempatan Semasa"
                        />
                        <CxTableHeadCell
                            columnSize={8}
                            title="Peperiksaan Perkhidmatan/Kursus Induksi"
                        />
                        <CxTableHeadCell rowSize={2} title="LNPT" />
                        <CxTableHeadCell rowSize={2} title="Status" />
                        <CxTableHeadCell rowSize={2} title="" />
                    </CxTableRow>
                    <CxTableRow headerColor>
                        <CxTableHeadCell title="Program Transformasi Media" />
                        <CxTableHeadCell
                            columnSize={2}
                            title="Peperiksaan JPA Bahagian A/B"
                        />
                        <CxTableHeadCell
                            columnSize={3}
                            title="Peperiksaan Jabatan Bahagian II/III,IV"
                        />
                        <CxTableHeadCell title="ISAC" />
                        <CxTableHeadCell title="ISAC (PTSU)" />
                    </CxTableRow>
                </CxTableHead>
                <CxTableBody>
                    {#each lantikanBaruTable as item, i (i)}
                        <CxTableRow>
                            <CxTableDataCell value={i + 1} />
                            <CxTableDataCell value={item.employeeId} />
                            <CxTableDataCell value={item.employeeName} />
                            <CxTableDataCell value={item.idNumber} />
                            <CxTableDataCell
                                value={item.jawatanPertamaDilantikDiLembaga}
                            />
                            <CxTableDataCell value={item.tarikhLantikan} />
                            <CxTableDataCell value={item.jawatanSemasa} />
                            <CxTableDataCell value={item.penempatanSemasa} />
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell>
                                {#if item.LNPT === true}
                                    <SvgCheck />
                                {:else}
                                    <SvgXMark />
                                {/if}
                            </CxTableDataCell>
                            <CxTableDataCell value={item.status} />
                            <CxTableDataCell
                                ><IconButton
                                    onClick={() => {
                                        if (item.status === 'Baru')
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/baru',
                                            );
                                        else if (
                                            item.status ===
                                            'DIPERAKU - Pengarah Negeri/Bahagian'
                                        )
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/diperaku-pengarah-negeri-bahagian',
                                            );
                                        else if (item.status === 'Selesai')
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/selesai',
                                            );
                                    }}
                                >
                                    <SvgEdit />
                                </IconButton></CxTableDataCell
                            >
                        </CxTableRow>
                    {/each}
                </CxTableBody>
            </ComplexTable>
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
            <SectionHeader title="Senarai Kakitangan">
                <TextIconButton label="" primary
                    ><SvgPdf2></SvgPdf2>
                </TextIconButton>
                <TextIconButton label="" primary
                    ><SvgExcel></SvgExcel>
                </TextIconButton>
            </SectionHeader>
            <!-- <div
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
            </div> -->
            <ComplexTable title="">
                <CxTableHead>
                    <CxTableRow headerColor>
                        <CxTableHeadCell rowSize={2} title="Bil." />
                        <CxTableHeadCell rowSize={2} title="No. Pekerja" />
                        <CxTableHeadCell rowSize={2} title="Nama Pekerja" />
                        <CxTableHeadCell
                            rowSize={2}
                            title="No. Kad Pengenalan"
                        />
                        <CxTableHeadCell
                            rowSize={2}
                            title="Jawatan Pertama Dilantik Di Lembaga"
                        />
                        <CxTableHeadCell rowSize={2} title="Tarikh Lantikan" />
                        <CxTableHeadCell rowSize={2} title="Jawatan Semasa" />
                        <CxTableHeadCell
                            rowSize={2}
                            title="Penempatan Semasa"
                        />
                        <CxTableHeadCell
                            columnSize={8}
                            title="Peperiksaan Perkhidmatan/Kursus Induksi"
                        />
                        <CxTableHeadCell rowSize={2} title="LNPT" />
                        <CxTableHeadCell rowSize={2} title="Status" />
                        <CxTableHeadCell rowSize={2} title="" />
                    </CxTableRow>
                    <CxTableRow headerColor>
                        <CxTableHeadCell title="Program Transformasi Media" />
                        <CxTableHeadCell
                            columnSize={2}
                            title="Peperiksaan JPA Bahagian A/B"
                        />
                        <CxTableHeadCell
                            columnSize={3}
                            title="Peperiksaan Jabatan Bahagian II/III,IV"
                        />
                        <CxTableHeadCell title="ISAC" />
                        <CxTableHeadCell title="ISAC (PTSU)" />
                    </CxTableRow>
                </CxTableHead>
                <CxTableBody>
                    {#each melebihi3TahunTable as item, i (i)}
                        <CxTableRow>
                            <CxTableDataCell value={i + 1} />
                            <CxTableDataCell value={item.employeeId} />
                            <CxTableDataCell value={item.employeeName} />
                            <CxTableDataCell value={item.idNumber} />
                            <CxTableDataCell
                                value={item.jawatanPertamaDilantikDiLembaga}
                            />
                            <CxTableDataCell value={item.tarikhLantikan} />
                            <CxTableDataCell value={item.jawatanSemasa} />
                            <CxTableDataCell value={item.penempatanSemasa} />
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell>
                                {#if item.LNPT === true}
                                    <SvgCheck />
                                {:else}
                                    <SvgXMark />
                                {/if}
                            </CxTableDataCell>
                            <CxTableDataCell value={item.status} />
                            <CxTableDataCell
                                ><IconButton
                                    onClick={() => {
                                        if (item.status === 'Baru')
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/baru',
                                            );
                                        else if (
                                            item.status ===
                                            'DIPERAKU - Pengarah Negeri/Bahagian'
                                        )
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/diperaku-pengarah-negeri-bahagian',
                                            );
                                        else if (item.status === 'Selesai')
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/selesai',
                                            );
                                    }}
                                >
                                    <SvgEdit />
                                </IconButton></CxTableDataCell
                            >
                        </CxTableRow>
                    {/each}
                </CxTableBody>
            </ComplexTable>
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
            <SectionHeader title="Senarai Rekod Kumpulan Persaraan Lain-lain">
                <TextIconButton label="" primary
                    ><SvgPdf2></SvgPdf2>
                </TextIconButton>
                <TextIconButton label="" primary
                    ><SvgExcel></SvgExcel>
                </TextIconButton>
            </SectionHeader>
            <!-- <div
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
            </div> -->
            <ComplexTable title="">
                <CxTableHead>
                    <CxTableRow headerColor>
                        <CxTableHeadCell rowSize={2} title="Bil." />
                        <CxTableHeadCell rowSize={2} title="No. Pekerja" />
                        <CxTableHeadCell rowSize={2} title="Nama Pekerja" />
                        <CxTableHeadCell
                            rowSize={2}
                            title="No. Kad Pengenalan"
                        />
                        <CxTableHeadCell
                            rowSize={2}
                            title="Jawatan Pertama Dilantik Di Lembaga"
                        />
                        <CxTableHeadCell rowSize={2} title="Tarikh Lantikan" />
                        <CxTableHeadCell rowSize={2} title="Jawatan Semasa" />
                        <CxTableHeadCell
                            rowSize={2}
                            title="Penempatan Semasa"
                        />
                        <CxTableHeadCell
                            columnSize={8}
                            title="Peperiksaan Perkhidmatan/Kursus Induksi"
                        />
                        <CxTableHeadCell rowSize={2} title="LNPT" />
                        <CxTableHeadCell rowSize={2} title="Status" />
                        <CxTableHeadCell rowSize={2} title="" />
                    </CxTableRow>
                    <CxTableRow headerColor>
                        <CxTableHeadCell title="Program Transformasi Media" />
                        <CxTableHeadCell
                            columnSize={2}
                            title="Peperiksaan JPA Bahagian A/B"
                        />
                        <CxTableHeadCell
                            columnSize={3}
                            title="Peperiksaan Jabatan Bahagian II/III,IV"
                        />
                        <CxTableHeadCell title="ISAC" />
                        <CxTableHeadCell title="ISAC (PTSU)" />
                    </CxTableRow>
                </CxTableHead>
                <CxTableBody>
                    {#each lantikanKeGredTable as item, i (i)}
                        <CxTableRow>
                            <CxTableDataCell value={i + 1} />
                            <CxTableDataCell value={item.employeeId} />
                            <CxTableDataCell value={item.employeeName} />
                            <CxTableDataCell value={item.idNumber} />
                            <CxTableDataCell
                                value={item.jawatanPertamaDilantikDiLembaga}
                            />
                            <CxTableDataCell value={item.tarikhLantikan} />
                            <CxTableDataCell value={item.jawatanSemasa} />
                            <CxTableDataCell value={item.penempatanSemasa} />
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell>
                                {#if item.LNPT === true}
                                    <SvgCheck />
                                {:else}
                                    <SvgXMark />
                                {/if}
                            </CxTableDataCell>
                            <CxTableDataCell value={item.status} />
                            <CxTableDataCell
                                ><IconButton
                                    onClick={() => {
                                        if (item.status === 'Baru')
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/baru',
                                            );
                                        else if (
                                            item.status ===
                                            'DIPERAKU - Pengarah Negeri/Bahagian'
                                        )
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/diperaku-pengarah-negeri-bahagian',
                                            );
                                        else if (item.status === 'Selesai')
                                            goto(
                                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/selesai',
                                            );
                                    }}
                                >
                                    <SvgEdit />
                                </IconButton></CxTableDataCell
                            >
                        </CxTableRow>
                    {/each}
                </CxTableBody>
            </ComplexTable>
        </CustomTabContent>
    </CustomTab>
</section>
