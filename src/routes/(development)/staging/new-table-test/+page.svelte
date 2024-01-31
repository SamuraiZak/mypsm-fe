<script lang="ts">
    import IbsCommonTable from '$lib/components/staging/ibs-common-table/IBSCommonTable.svelte';
    import { NewHireServices } from '$lib/services/implementations/mypsm/employment/new-hire/new-hire.service.js';
    import { showLoadingOverlay } from '$lib/stores/globalState.js';
    import type { NewHireListRequestViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-request.view-model.js';
    import type { NewHireListResponseViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-response.view-model.js';

    export let data;

    // setting the data for the table
    // if you have multiple table in one page,
    // duplicate this code block, rename it and use it accordingly
    let tableDataInfo: TableInfoViewModel = {
        pageNum: data.props.newHireList.data.pageNum,
        pageSize: data.props.param.pageSize,
        orderBy: data.props.param.orderBy,
        orderType: data.props.param.orderType,
        totalData: data.props.newHireList.data.totalData,
        totalPage: data.props.newHireList.data.totalPage,
        data: data.props.newHireList.data.newHires,
        selectedData: [],
    };

    // function to retrieve new data on table sort/paginate
    // if you have multiple table in one page,
    // you may duplicate and rename it and use it accordingly
    // or you can modify this function but do not remove the mandatory steps
    async function _retrieveData() {
        // updating the request parameter
        data.props.param = { ...tableDataInfo, filter: { dataType: 'New' } };

        // making api call to fetch the data
        const newHireList: NewHireListResponseViewModel =
            await NewHireServices.getNewHireList(data.props.param);

        // showing overlay while fetching data
        setTimeout(() => showLoadingOverlay.set(false), 2500);

        // updating the data
        data.props.newHireList = newHireList;

        // updating the table data
        // mandatory: removing this steps will cause error on the table data
        // tableDataInfo = {
        //     pageNum: data.props.newHireList.data.pageNum,
        //     pageSize: data.props.param.pageSize,
        //     orderBy: data.props.param.orderBy,
        //     orderType: data.props.param.orderType,
        //     totalData: data.props.newHireList.data.totalData,
        //     totalPage: data.props.newHireList.data.totalPage,
        //     data: data.props.newHireList.data.newHires,
        //     selectedData: []
        // };

        tableDataInfo.pageNum = data.props.newHireList.data.pageNum;
        tableDataInfo.pageSize = data.props.param.pageSize;
        tableDataInfo.orderBy = data.props.param.orderBy;
        tableDataInfo.orderType = data.props.param.orderType;
        tableDataInfo.totalData = data.props.newHireList.data.totalData;
        tableDataInfo.totalPage = data.props.newHireList.data.totalPage;
        tableDataInfo.data = data.props.newHireList.data.newHires;
    }
</script>

<p>{tableDataInfo.selectedData.length}</p>
<div class="h-full w-full p-6">
    <IbsCommonTable
        bind:tableData={tableDataInfo}
        onUpdate={_retrieveData}
        detailActions={() => {
            alert('hello');
        }}
    ></IbsCommonTable>
</div>
