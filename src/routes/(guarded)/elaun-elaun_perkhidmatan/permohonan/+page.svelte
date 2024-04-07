<script lang="ts">
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';
    import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let selectedData: any;

    // setting up table
    let applicationListTable: TableSettingDTO = {
        param: data.props.listParam,
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
            add: true,
        },
    };

    // function to handle detail
    function showDetails() {
        let currentType: AllowanceTypeDTO =
            AllowanceTypeConstant.list.find(
                (item) => item.code == selectedData.allowanceTypeCode,
            ) ?? AllowanceTypeConstant.ceremonyClothing;

        let url =
            '/elaun-elaun_perkhidmatan/permohonan/' +
            currentType.description +
            '/' +
            selectedData.allowanceId;

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
                addActions={() => {}}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={applicationListTable.param.filter.name}
                    ></FilterTextField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
