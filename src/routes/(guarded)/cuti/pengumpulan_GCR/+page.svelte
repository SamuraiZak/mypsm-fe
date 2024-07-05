<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    let accumulationListTable: TableSettingDTO = {
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
        hiddenColumn: ['employeeId', 'employeeNumber', 'id'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'leave/gcr/accumulation/list',
        id: 'accumulationListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.props.currentRoleCode == UserRoleConstant.kakitangan.code,
        },
    };
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Pengumpulan GCR"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Permohonan Pengumpulan GCR"
                bind:tableData={accumulationListTable}
                bind:passData={selectedData}
                detailActions={() => {
                    let url = '/cuti/pengumpulan_GCR/' + selectedData.id;

                    goto(url);
                }}
                addActions={() => {
                    let url = '/cuti/pengumpulan_GCR/Baru';

                    goto(url);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={accumulationListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={accumulationListTable.param.filter
                            .name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={accumulationListTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={accumulationListTable.param.filter
                            .year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
