<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { AllowanceTypeDTO } from '$lib/dto/mypsm/backup/allowance.dto';
    import { Toaster } from 'svelte-french-toast';
    import type { LayoutData } from '../../$types';
    import type { PageData } from './$types';

    export let data: PageData;
    let selectedData: any;

    let applicationListTable: TableSettingDTO = {
        param: data.props.request,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [
            'allowanceId',
            'employeeId',
            'employeeNumber',
            'allowanceTypeCode',
            'category',
        ],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'total',
                malay: 'Amaun (RM)',
            },
            {
                english: 'status',
                malay: 'Status Permohonan',
            },
        ],
        url: 'service_allowance/list',
        id: 'applicationListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            // add: false,
            add:
                data.props.layoutData.accountDetails.currentRole ==
                'kakitangan',
        },
    };

    function addApplication() {
        
        let allowanceTypeCode: string = AllowanceTypeConstant.ceremonyClothing.code;
        
        let applicationId: number = 0;
        
        let url = `/v2/service-allowance/application/${allowanceTypeCode}/${applicationId}`;
        goto(url);
    }

    function showDetails() {
        let allowanceTypeCode: string = selectedData.allowanceTypeCode;
        
        let applicationId: number = selectedData.allowanceId;
        
        let url = `/v2/service-allowance/application/${allowanceTypeCode}/${applicationId}`;
        goto(url);
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Permohonan Elaun-elaun Perkhidmatan"
        ></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Rekod Permohonan"
                bind:tableData={applicationListTable}
                bind:passData={selectedData}
                detailActions={() => {
                    showDetails();
                }}
                addActions={() => {
                    addApplication();
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nombor Pekerja"
                        bind:inputValue={applicationListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={applicationListTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={applicationListTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Jenis Elaun"
                        bind:inputValue={applicationListTable.param.filter
                            .allowanceType}
                    ></FilterTextField>
                    <FilterTextField
                        label="Tarikh"
                        bind:inputValue={applicationListTable.param.filter
                            .applicationDate}
                    ></FilterTextField>
                    <FilterTextField
                        label="Status"
                        bind:inputValue={applicationListTable.param.filter
                            .status}
                    ></FilterTextField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>

<Toaster></Toaster>
