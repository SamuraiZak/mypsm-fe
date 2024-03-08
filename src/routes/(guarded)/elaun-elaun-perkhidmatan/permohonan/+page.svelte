<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { ServiceAllowanceTypeConstant } from '$lib/constants/core/service-allowance.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { ServiceAllowanceDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto';
    import type { PageData } from './$types';
    import { _updateAllowanceTable } from './+page';

    export let data: PageData;

    let selectedRecord: ServiceAllowanceDTO;

    let allowanceTable: TableDTO = {
        param: data.props.allowanceListRequestBody,
        meta: data.props.allowanceListResponse.data?.meta ?? {
            pageSize: data.props.allowanceListRequestBody.pageSize ?? 50,
            pageNum: data.props.allowanceListRequestBody.pageNum ?? 1,
            totalData: 50,
            totalPage: 1,
        },
        data: data.props.allowanceList,
        hiddenData: ['employeeId'],
    };

    async function _allowanceListSearch() {
        _updateAllowanceTable(allowanceTable.param).then((value) => {
            allowanceTable.data = value.props.response.data?.dataList ?? [];
            allowanceTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            allowanceTable.param.pageSize = allowanceTable.meta.pageSize;
            allowanceTable.param.pageNum = allowanceTable.meta.pageNum;
        });
    }

    function _viewDetails() {
        const currentAllowanceType: LookupDTO | null =
            ServiceAllowanceTypeConstant.list.find(
                (item) => item.code == selectedRecord.allowanceTypeCode,
            ) ?? null;

        let redirectUrl: string =
            '/elaun-elaun-perkhidmatan/permohonan/' +
            selectedRecord.allowanceId +
            '/' +
            currentAllowanceType?.url;

        goto(redirectUrl);
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Elaun-elaun Perkhidmatan">
        <TextIconButton
            label="Permohonan Baru"
            icon="add"
            onClick={() => {
                goto(
                    '/elaun-elaun-perkhidmatan/permohonan/baru/bantuan-mengurus-jenazah',
                );
            }}
        ></TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->

        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
        >
            <div
                class="flex h-fit min-h-fit w-full flex-row gap-2 rounded bg-blue-100 p-2"
            >
                <div
                    class="flex h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 flex-col items-center justify-start"
                >
                    <span
                        class="flex h-5 w-full flex-col items-center justify-center text-center align-middle text-ios-systemColors-systemBlue-light"
                    >
                        <SvgInfoSolid></SvgInfoSolid>
                    </span>
                </div>
                <div
                    class="flex h-fit min-h-5 w-full flex-col items-start justify-start gap-2"
                >
                    <span
                        class="flex h-fit min-h-5 w-full flex-col items-start justify-center text-center align-middle text-sm font-semibold text-ios-systemColors-systemBlue-light"
                    >
                        Sila pilih permohonan cuti dari senarai berikut untuk
                        melihat butiran
                    </span>
                </div>
            </div>
            <FilterCard onSearch={_allowanceListSearch}>
                <FilterTextField
                    label="Nama"
                    bind:inputValue={allowanceTable.param.filter.name}
                ></FilterTextField>
            </FilterCard>
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    tableId="allowanceTable"
                    title="Senarai Permohonan Elaun-elaun Perkhidmatan"
                    bind:tableData={allowanceTable}
                    onUpdate={_allowanceListSearch}
                    bind:passData={selectedRecord}
                    detailActions={() => {
                        _viewDetails();
                    }}
                    enableDetail
                ></CustomTable>
            </div>
        </div>
    </div>
</section>
