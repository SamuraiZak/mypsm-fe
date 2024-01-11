<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import SvgEllipsisVertical from '$lib/assets/svg/SvgEllipsisVertical.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
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
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { mockEmployeeLeaveRecord } from '$lib/mocks/cuti/mockEmployeeLeaveRecord';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import { status } from '$lib/mocks/status/status';
    import { selectedRecordId } from '$lib/stores/globalState';
    import { Badge } from 'flowbite-svelte';
    let selectedCategory = 'all';
    let allEmpLoanRec = mockRekodPinjaman;
    let currentData: IntRekodPinjaman;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Pinjaman"
        description="Hal-hal berkaitan menguruskan pinjaman kakitangan LKIM"
    ></ContentHeader>
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-2.5"
    >
        <FilterContainer>
            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="Nama Kakitangan"></FilterTextInput>
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
        <DataTable title="Senarai Permohonan">
            <DtTableHead>
                <DtTableHeadCell title="Bil."></DtTableHeadCell>
                <DtTableHeadCell title="No. Pekerja"></DtTableHeadCell>
                <DtTableHeadCell title="Nama Pekerja"></DtTableHeadCell>
                <DtTableHeadCell title="No. Kad Pengenalan"></DtTableHeadCell>
                <DtTableHeadCell title="Jenis Pinjaman"></DtTableHeadCell>
                <DtTableHeadCell title="Tarikh Mohon"></DtTableHeadCell>
                <DtTableHeadCell title="Tarikh Mula Pinjaman"></DtTableHeadCell>
                <DtTableHeadCell title="Tarikh Tamat Pinjaman"
                ></DtTableHeadCell>
                <DtTableHeadCell title="Jumlah"></DtTableHeadCell>
                <DtTableHeadCell title="Status"></DtTableHeadCell>
                <DtTableHeadCell title="Catatan"></DtTableHeadCell>
                <DtTableHeadCell title="Tindakan"></DtTableHeadCell>
            </DtTableHead>
            <DtTableBody>
                {#each allEmpLoanRec as item}
                    <DtTableRow>
                        <DtTableDataCell value={item.id}></DtTableDataCell>
                        <DtTableDataCell value={item.employeeNumber}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.employeeName}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.identityDocumentNumber}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.typeOfLoan}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.applicationDate}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.loanStartDate}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.loanEndDate}
                        ></DtTableDataCell>
                        <DtTableDataCell value={CurrencyHelper.formatCurrency(item.total)}
                        ></DtTableDataCell>
                        <DtTableDataCell value={item.status}></DtTableDataCell>
                        <DtTableDataCell value={item.remarks}></DtTableDataCell>
                        <DtTableDataCell>
                            <IconButton
                                onClick={() => {
                                    selectedRecordId.set(item.id);
                                    goto('pinjaman/butiran');
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
