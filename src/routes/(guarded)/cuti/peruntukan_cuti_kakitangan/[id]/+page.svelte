<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    let entitlementListTable: TableSettingDTO = {
        param: data.props.leaveEntitlementRequest,
        meta: data.props.leaveEntitlementResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.leaveEntitlementResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'employeeNumber'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'leave/report/entitlement',
        id: 'entitlementListTable',
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
        <ContentHeader title="Peruntukan Cuti Kakitangan">
            <TextIconButton
                type="neutral"
                label="Kembali"
                onClick={() => {
                    goto('/cuti/peruntukan_cuti_kakitangan');
                }}
            >
                <SvgChevronLeft />
            </TextIconButton>
        </ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="flex h-fit w-full flex-col">
            <div class="flex h-fit w-full flex-col rounded bg-blue-100 p-2.5">
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >Nama Kakitangan:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.employeeDetail.name ?? '',
                        )}</span
                    >
                </div>
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >No. Pekerja:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.employeeDetail.employeeNumber ?? '',
                        )}</span
                    >
                </div>
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >No. Kad Pengenalan:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.employeeDetail.identityCard ?? '',
                        )}</span
                    >
                </div>
            </div>
        </div>
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={entitlementListTable}
            >
                <FilterWrapper slot="filter">
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={entitlementListTable.param.filter.year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
