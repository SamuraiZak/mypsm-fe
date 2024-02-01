<script lang="ts">
    import IbsCommonTable from '$lib/components/staging/ibs-common-table/IBSCommonTable.svelte';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
    import type { KPEmployeeListDTO } from '$lib/dto/mypsm/medical/klinik-panel/kp-employee-list.dto.js';
    import { NewHireServices } from '$lib/services/implementations/mypsm/employment/new-hire/new-hire.service.js';
    import { MedicalServices } from '$lib/services/implementations/mypsm/medical/medical.service.js';
    import { showLoadingOverlay } from '$lib/stores/globalState.js';
    import type { NewHireListRequestViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-request.view-model.js';
    import type { NewHireListResponseViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-response.view-model.js';

    export let data;

    // setting the data for the table
    // if you have multiple table in one page,
    // duplicate this code block, rename it and use it accordingly
    let tableDataInfo: TableInfoViewModel = {
        pageNum: data.props.response.data?.meta?.pageNum ?? 1,
        pageSize: data.props.param.pageSize ?? 10,
        orderBy: data.props.param.orderBy ?? "",
        orderType: data.props.param.orderType ?? "Ascending",
        totalData: data.props.response.data?.meta?.totalData ?? 0,
        totalPage: data.props.response.data?.meta?.totalPage ?? 0,
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
    };

    // function to retrieve new data on table sort/paginate
    // if you have multiple table in one page,
    // you may duplicate and rename it and use it accordingly
    // or you can modify this function but do not remove the mandatory steps
    async function _retrieveData() {
        // updating the request parameter
        data.props.param = { ...tableDataInfo,};

        const response: CommonResponseDTO = await MedicalServices.getKPEmployeeList(data.props.param);
        const employeeList: KPEmployeeListDTO[] = response.data?.dataList as KPEmployeeListDTO[]; 

        // showing overlay while fetching data
        setTimeout(() => showLoadingOverlay.set(false), 2500);

        // updating the data
        data.props.employeeList = employeeList;
        data.props.response = response;

        tableDataInfo.pageNum = data.props.response.data?.meta?.pageNum ?? 1;
        tableDataInfo.pageSize = data.props.param.pageSize ?? 10;
        tableDataInfo.orderBy = data.props.param.orderBy ?? "";
        tableDataInfo.orderType = data.props.param.orderType ?? "Ascending";
        tableDataInfo.totalData = data.props.response.data?.meta?.totalData ?? 0;
        tableDataInfo.totalPage = data.props.response.data?.meta?.totalPage ?? 0;
        tableDataInfo.data = data.props.response.data?.dataList ?? [];
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
