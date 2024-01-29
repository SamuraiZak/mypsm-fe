<script lang="ts">
    import IbsCommonTable from '$lib/components/staging/ibs-common-table/IBSCommonTable.svelte';
    import { NewHireServices } from '$lib/services/implementations/mypsm/employment/new-hire/new-hire.service.js';
    import { showLoadingOverlay } from '$lib/stores/globalState.js';
    import type { NewHireListRequestViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-request.view-model.js';
    import type { NewHireListResponseViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-response.view-model.js';

    export let data;

    let sortBy: string = 'none';
    let sortDirection: string = 'none';

    let tableFilter: NewHireListRequestViewModel = data.props.param;

    async function _retrieveData() {
        const newHireList: NewHireListResponseViewModel =
            await NewHireServices.getNewHireList(tableFilter);

        setTimeout(() => showLoadingOverlay.set(false), 2500);
        data.props.newHireList = newHireList;
    }
</script>

<p>IN PAGE</p>
<p>orderBy : {tableFilter.orderBy}</p>
<p>orderBy : {tableFilter.orderType}</p>
<p>pageSize : {tableFilter.pageSize}</p>
<p>pageSize : {tableFilter.pageNum}</p>
<div class="h-full w-full p-6">
    <IbsCommonTable
        bind:param={tableFilter}
        tableData={data.props.newHireList.data.newHires}
        onUpdate={_retrieveData}
    ></IbsCommonTable>
</div>
