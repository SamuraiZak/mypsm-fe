<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
    import { status } from '$lib/mocks/status/status';
    import { selectedRecordId } from '$lib/stores/globalState';
    let selectedCategory = 'all';
    let allRecStaffQuarters = mockRekodKuarters.filter(
        (rec) =>
            rec.typeOfRequest == 'Keluar' &&
            rec.typeOfRequestor == 'Kakitangan LKIM',
    );
    let allRecOutsiderQuarters = mockRekodKuarters.filter(
        (rec) =>
            rec.typeOfRequest == 'Keluar' &&
            rec.typeOfRequestor != 'Kakitangan LKIM',
    );
    let currentData: IntRekodPinjaman;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Keluar Kuarters"
        description="Hal-hal berkaitan menguruskan permohonan keluar kuarters"
    ></ContentHeader>
</section>
<CustomTab>
    <CustomTabContent title="Kakitangan LKIM">
        <section
            class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
        >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-2.5"
            >
                <FilterContainer>
                    <FilterTextInput label="No. Pemohon"></FilterTextInput>
                    <FilterTextInput label="Nama Pemohon"></FilterTextInput>
                    <FilterSelectInput
                        label="Status"
                        options={status}
                        selectedVal={selectedCategory}
                    ></FilterSelectInput>
                    <FilterDateSelector handleDateChange label="Tarikh Mohon"
                    ></FilterDateSelector>
                </FilterContainer>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                <DataTable title="Senarai Rekod Permohonan Keluar Kuarters">
                    <DtTableHead>
                        <DtTableHeadCell title="Bil."></DtTableHeadCell>
                        <DtTableHeadCell title="No. Pemohon"></DtTableHeadCell>
                        <DtTableHeadCell title="Nama Pemohon"></DtTableHeadCell>
                        <DtTableHeadCell title="No. Kad Pengenalan"
                        ></DtTableHeadCell>
                        <DtTableHeadCell title="Jenis Pemohon"
                        ></DtTableHeadCell>
                        <DtTableHeadCell title="Tarikh Mohon"></DtTableHeadCell>
                        <DtTableHeadCell title="Status"></DtTableHeadCell>
                        <DtTableHeadCell title="Catatan"></DtTableHeadCell>
                        <DtTableHeadCell title="Tindakan"></DtTableHeadCell>
                    </DtTableHead>
                    <DtTableBody>
                        {#each allRecStaffQuarters as item}
                            <DtTableRow>
                                <DtTableDataCell value={item.id}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.employeeNumber}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.employeeName}
                                ></DtTableDataCell>
                                <DtTableDataCell
                                    value={item.identityDocumentNumber}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.typeOfRequestor}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.applicationDate}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.status}
                                ></DtTableDataCell>
                                <DtTableDataCell
                                    value={item.remarks != ''
                                        ? item.remarks
                                        : '-'}
                                ></DtTableDataCell>
                                <DtTableDataCell>
                                    <IconButton
                                        onClick={() => {
                                            selectedRecordId.set(item.id);
                                            goto(
                                                'permohonan-keluar-kuarter/butiran',
                                            );
                                        }}
                                    >
                                        <SvgEllipsisCircle></SvgEllipsisCircle>
                                    </IconButton>
                                </DtTableDataCell>
                            </DtTableRow>
                        {/each}
                    </DtTableBody>
                </DataTable>
            </div>
        </section>
    </CustomTabContent>
    <CustomTabContent title="Agensi / Jabatan Luar">
        <section
            class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
        >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-2.5"
            >
                <FilterContainer>
                    <FilterTextInput label="No. Pemohon"></FilterTextInput>
                    <FilterTextInput label="Nama Pemohon"></FilterTextInput>
                    <FilterSelectInput
                        label="Status"
                        options={status}
                        selectedVal={selectedCategory}
                    ></FilterSelectInput>
                    <FilterDateSelector handleDateChange label="Tarikh Mohon"
                    ></FilterDateSelector>
                </FilterContainer>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                <DataTable title="Senarai Rekod Permohonan Keluar Kuarters">
                    <DtTableHead>
                        <DtTableHeadCell title="Bil."></DtTableHeadCell>
                        <DtTableHeadCell title="No. Pemohon"></DtTableHeadCell>
                        <DtTableHeadCell title="Nama Pemohon"></DtTableHeadCell>
                        <DtTableHeadCell title="No. Kad Pengenalan"
                        ></DtTableHeadCell>
                        <DtTableHeadCell title="Jenis Pemohon"
                        ></DtTableHeadCell>
                        <DtTableHeadCell title="Tarikh Mohon"></DtTableHeadCell>
                        <DtTableHeadCell title="Status"></DtTableHeadCell>
                        <DtTableHeadCell title="Catatan"></DtTableHeadCell>
                        <DtTableHeadCell title="Tindakan"></DtTableHeadCell>
                    </DtTableHead>
                    <DtTableBody>
                        {#each allRecOutsiderQuarters as item}
                            <DtTableRow>
                                <DtTableDataCell value={item.id}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.employeeNumber}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.employeeName}
                                ></DtTableDataCell>
                                <DtTableDataCell
                                    value={item.identityDocumentNumber}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.typeOfRequestor}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.applicationDate}
                                ></DtTableDataCell>
                                <DtTableDataCell value={item.status}
                                ></DtTableDataCell>
                                <DtTableDataCell
                                    value={item.remarks != ''
                                        ? item.remarks
                                        : '-'}
                                ></DtTableDataCell>
                                <DtTableDataCell>
                                    <IconButton
                                        onClick={() => {
                                            selectedRecordId.set(item.id);
                                            goto(
                                                'permohonan-keluar-kuarter/butiran',
                                            );
                                        }}
                                    >
                                        <SvgEllipsisCircle></SvgEllipsisCircle>
                                    </IconButton>
                                </DtTableDataCell>
                            </DtTableRow>
                        {/each}
                    </DtTableBody>
                </DataTable>
            </div>
        </section>
    </CustomTabContent>
</CustomTab>
