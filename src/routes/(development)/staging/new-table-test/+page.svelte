<script lang="ts">
    import IbsCommonTable from '$lib/components/staging/ibs-common-table/IBSCommonTable.svelte';

    export let data;

    let sortBy: string = 'none';
    let sortDirection: string = 'none';

    let tableFilter:EmployeesListRequestViewModel = data.props.request;

    console.log(data.props.employeeList);
</script>

<button on:click={()=>{
    tableFilter.orderBy = "anu";
}}>
    change
</button>
<p>in page orderBy {tableFilter.orderBy}</p>
<div class="h-full w-full p-6">
    <IbsCommonTable bind:param = {tableFilter} tableData={data.props.employeeList.data}></IbsCommonTable>
</div>
