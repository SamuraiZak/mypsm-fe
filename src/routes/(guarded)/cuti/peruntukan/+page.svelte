<script lang="ts">
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';

    export let data: PageData;

    let leaveEntitlementTable: TableSettingDTO = {
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
        hiddenColumn: [],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'leave/report/entitlement',
        id: 'leaveEntitlementTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Peruntukan Cuti"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Peruntukan Cuti"
                bind:tableData={leaveEntitlementTable}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={leaveEntitlementTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={leaveEntitlementTable.param.filter
                            .name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={leaveEntitlementTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={leaveEntitlementTable.param.filter
                            .year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
