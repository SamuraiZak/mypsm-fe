<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
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
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { lantikanBaru } from '$lib/mocks/pengarah-bahagian-negeri/pengesahan/lantikan-baru';
    import { lantikanKeGred } from '$lib/mocks/pengarah-bahagian-negeri/pengesahan/lantikan-ke-gred';
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
                    id="gred-dropdown"
                    label="Gred"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
            </FilterContainer>
            <SectionHeader
                title="Tindakan: Perakukan semua kakitangan berkaitan"
                ><FormButton type="perakukan"></FormButton></SectionHeader
            >

            <SectionHeader title="Senarai Kakitangan" subTitle={'Jumlah Rekod: '+lantikanBaru.length}></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    hasCheckbox
                    tableItems={lantikanBaru}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/pengarah-bahagian-negeri/perjawatan/pengesahan-dalam-perkhidmatan/pengesahan-lantikan-baru',
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
                    id="gred-dropdown"
                    label="Gred"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
            </FilterContainer>
            <SectionHeader
                title="Tindakan: Perakukan semua kakitangan berkaitan"
                ><FormButton type="perakukan"></FormButton></SectionHeader
            >
            <SectionHeader title="Senarai Kakitangan" subTitle={'Jumlah Rekod: '+lantikanKeGred.length}></SectionHeader>
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
                            columnSize={4}
                            title="Peperiksaan Perkhidmatan/Kursus Induksi"
                        />
                        <CxTableHeadCell rowSize={2} title="Status" />
                        <CxTableHeadCell rowSize={2} title="" />
                    </CxTableRow>
                    <CxTableRow headerColor>
                        <CxTableHeadCell title="Program Transformasi Minda" />
                        <CxTableHeadCell
                            columnSize={2}
                            title="Peperiksaan JPA Bahagian A/B"
                        />
                        <CxTableHeadCell
                            title="Peperiksaan Jabatan Bahagian IV"
                        />
                    </CxTableRow>
                </CxTableHead>
                <CxTableBody>
                    {#each lantikanKeGred as item, i (i)}
                        <CxTableRow>
                            <CxTableDataCell>{i + 1}</CxTableDataCell>
                            <CxTableDataCell>{item.staffId}</CxTableDataCell>
                            <CxTableDataCell
                                >{item.employeeName}</CxTableDataCell
                            >
                            <CxTableDataCell>{item.idNumber}</CxTableDataCell>
                            <CxTableDataCell
                                >{item.firstAppointedPositionOnBoard}</CxTableDataCell
                            >
                            <CxTableDataCell
                                >{item.appointedDate}</CxTableDataCell
                            >
                            <CxTableDataCell
                                >{item.currentPosition}</CxTableDataCell
                            >
                            <CxTableDataCell
                                >{item.currentPlacement}</CxTableDataCell
                            >
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell>{''}</CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell><SvgCheck /></CxTableDataCell>
                            <CxTableDataCell>{item.status}</CxTableDataCell>
                            <CxTableDataCell>
                                <IconButton
                                    onClick={() =>
                                        goto(
                                            '/pengarah-bahagian-negeri/perjawatan/pengesahan-dalam-perkhidmatan/pengesahan-lantikan-gred',
                                        )}
                                >
                                    <SvgEdit />
                                </IconButton>
                            </CxTableDataCell>
                        </CxTableRow>
                    {/each}
                </CxTableBody>
            </ComplexTable>
        </CustomTabContent>
    </CustomTab>
</section>
