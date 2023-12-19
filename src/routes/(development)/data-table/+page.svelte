<script lang="ts">
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import { mockEmployeeLeaveRecord } from '$lib/mocks/cuti/mockEmployeeLeaveRecord';
    import { Badge } from 'flowbite-svelte';
</script>

<section class="h-full w-full">
    <DataTable>
        <DtTableHead>
            <DtTableHeadCell title="No Pekerja"></DtTableHeadCell>
            <DtTableHeadCell title="Jenis Cuti"></DtTableHeadCell>
            <DtTableHeadCell title="Column 1"></DtTableHeadCell>
            <DtTableHeadCell title="Column 1"></DtTableHeadCell>
            <DtTableHeadCell title="Column 1"></DtTableHeadCell>
        </DtTableHead>
        <DtTableBody>
            {#each mockEmployeeLeaveRecord as item}
                <DtTableRow>
                    <DtTableDataCell value={item.employeeNumber}
                    ></DtTableDataCell>
                    <DtTableDataCell value={item.leaveType}></DtTableDataCell>
                    <DtTableDataCell value={item.leaveAmount}></DtTableDataCell>
                    <DtTableDataCell value="">
                        {#if item.leaveStatus == 'SELESAI'}
                            <Badge rounded color="yellow"
                                >{item.leaveStatus}</Badge
                            >
                        {:else}
                            <Badge rounded color="red">{item.leaveStatus}</Badge
                            >
                        {/if}
                    </DtTableDataCell>
                    <DtTableDataCell>
                        <IconButton onClick={() => {}}>
                            <SvgPlus></SvgPlus>
                        </IconButton>
                    </DtTableDataCell>
                </DtTableRow>
            {/each}
        </DtTableBody>
    </DataTable>
</section>
