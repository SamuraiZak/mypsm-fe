<script lang="ts">
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PromotionCommonList } from '$lib/dto/mypsm/employment/promotion/promotion-common-list.dto';
    import { goto } from '$app/navigation';
    export let data: PageData;

    let rowData: PromotionCommonList;

    let tableRetirement: TableSettingDTO = {
        param: data.param,
        meta: data.voluntaryViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.voluntaryViewTable,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['groupId'],
        dictionary: [],
        //TODO: change url
        url: 'employment/promotion/154s/list',
        id: 'tableRetirement',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let tableForcedRetirement: TableSettingDTO = {
        param: data.param,
        meta: data.forceViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.forceViewTable,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['groupId'],
        dictionary: [],
        //TODO: change url
        url: 'employment/promotion/154s/list',
        id: 'tableForcedRetirement',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let tableUnspecifyRetirement: TableSettingDTO = {
        param: data.param,
        meta: data.unspecifyViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.unspecifyViewTable,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['groupId'],
        dictionary: [],
        //TODO: change url
        url: 'employment/promotion/154s/list',
        id: 'tableUnspecifyRetirement',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Permohonan Pilihan">
            <div class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10">
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai rekod persaraan permohonan pilihan"
                        bind:tableData={tableRetirement}
                        bind:passData={rowData}
                        detailActions={() => {
                            //TODO: change url
                            goto(
                                '/v2/employment/retirement/butiran/1-' +
                                    rowData.groupId +
                                    '-' +
                                    rowData.status +
                                    '-' +
                                    '1-54',
                            );
                        }}
                    ></DataTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Persaraan Paksaan">
            <div class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10">
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai rekod persaraan paksaan"
                        bind:tableData={tableForcedRetirement}
                        bind:passData={rowData}
                        detailActions={() => {
                            //TODO: change url
                            goto(
                                '/v2/employment/retirement/butiran/1-' +
                                    rowData.groupId +
                                    '-' +
                                    rowData.status +
                                    '-' +
                                    '1-54',
                            );
                        }}
                    ></DataTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Persaraan Lain-lain">
            <div class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10">
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai rekod persaraan lain-lain"
                        bind:tableData={tableUnspecifyRetirement}
                        bind:passData={rowData}
                        detailActions={() => {
                            //TODO: change url
                            goto(
                                '/v2/employment/retirement/butiran/1-' +
                                    rowData.groupId +
                                    '-' +
                                    rowData.status +
                                    '-' +
                                    '1-54',
                            );
                        }}
                    ></DataTable>
                </div>
            </div></CustomTabContent
        >
    </CustomTab>
</section>
