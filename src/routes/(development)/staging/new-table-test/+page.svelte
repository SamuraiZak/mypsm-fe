<script lang="ts">
    import IbsCommonTable from '$lib/components/staging/ibs-common-table/IBSCommonTable.svelte';
    import http from '$lib/services/core/http.service';
    import { showLoadingOverlay } from '$lib/stores/globalState';
    import {
        type NewHireListRequest,
        NewHireListRequestConvert,
    } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-request.view-model';
    import {
        type NewHireListResponse,
        NewHireListResponseConvert,
    } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-response.view-model';

    export let data;

    let sortBy: string = 'none';
    let sortDirection: string = 'none';

    async function sort(sortBy: string, sortDirection: string) {
        showLoadingOverlay.set(true);
    }
</script>

<div class="h-full w-full p-6">
    <button
        type="button"
        on:click={() => {
            sort(sortBy, sortDirection);
        }}
    >
        Refresh
    </button>
    <IbsCommonTable tableData={data.props.newHireLists}></IbsCommonTable>
</div>
