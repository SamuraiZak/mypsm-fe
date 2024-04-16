<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { MedicalClinicEmployeeAllocationClaimList } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-allocation-list.dto';
    import type { MedicalClinicEmployeePaymentList } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payments-list.dto';
    import type { PageData } from './$types';
    import { _updateAllocationTable, _updatePaymentTable, _updateTable } from './+page';

    export let data: PageData;
    let rowData: MedicalClinicEmployeeAllocationClaimList;
    let rowPaymentData: MedicalClinicEmployeePaymentList;

    // table tuntutan kakitangan
    let employeeAllocationClaimsTable: TableDTO = {
        param: data.param,
        meta: data.employeeAllocationListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.employeeAllocationList ?? [],
        hiddenData: ['claimId', 'employeeId'],
    };

    //table peruntukan kakitangan
    let employeeAllocationTable: TableDTO = {
        param: data.param,
        meta: data.employeeGetAllocationResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.employeeGetAllocation ?? [],
    };
    
    //table pembayaran
    let employeePaymentTable: TableDTO = {
        param: data.param,
        meta: data.employeePaymentListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.employeePaymentList ?? [],
        hiddenData: ['medicalClaimId','employeeId'],
    };

    async function _search() {
        _updateTable(employeeAllocationClaimsTable.param).then((value) => {
            employeeAllocationClaimsTable.data =
                value.props.response.data?.dataList ?? [];
            employeeAllocationClaimsTable.meta = value.props.response.data
                ?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeeAllocationClaimsTable.param.pageSize =
                value.props.param.pageSize;
            employeeAllocationClaimsTable.param.pageNum =
                value.props.param.pageNum;
            employeeAllocationClaimsTable.hiddenData = ['claimId', 'employeeId'];
        });
    }
    async function _searchAllocation() {
        _updateAllocationTable(employeeAllocationTable.param).then((value) => {
            employeeAllocationTable.data =
                value.props.response.data?.dataList ?? [];
            employeeAllocationTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeeAllocationTable.param.pageSize = value.props.param.pageSize;
            employeeAllocationTable.param.pageNum = value.props.param.pageNum;
        });
    }
    async function _searchPayments() {
        _updatePaymentTable(employeePaymentTable.param).then((value) => {
            employeePaymentTable.data =
                value.props.response.data?.dataList ?? [];
            employeePaymentTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeePaymentTable.param.pageSize = value.props.param.pageSize;
            employeePaymentTable.param.pageNum = value.props.param.pageNum;
            employeePaymentTable.hiddenData = ['medicalClaimId','employeeId'];
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Bil Tuntutan Kakitangan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
        <CustomTabContent title="Senarai Tuntutan Kakitangan">
            <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
                <!-- <FilterCard onSearch={() => {}}>
                    <FilterTextField label="Kod Klinik" inputValue={''} />
                    <FilterTextField label="Nama Klinik" inputValue={''} />
                    <FilterTextField label="Bulan" inputValue={''} />
                    <FilterTextField label="Negeri" inputValue={''} />
                </FilterCard> -->

                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        title="Rekod Bil Tuntutan Kakitangan"
                        onUpdate={_search}
                        bind:tableData={employeeAllocationClaimsTable}
                        bind:passData={rowData}
                        enableDetail
                        detailActions={() =>
                            goto(
                                './bil-tuntutan-kakitangan/butiran/' +
                                    rowData.employeeId+'-'+rowData.claimId,
                            )}
                    />
                </div>
            </div>
        </CustomTabContent>
        {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
        <CustomTabContent title="Senarai Kakitangan - Peruntukan">
            <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
                <!-- <FilterCard onSearch={() => {}}>
                    <FilterTextField label="Kod Klinik" inputValue={''} />
                    <FilterTextField label="Nama Klinik" inputValue={''} />
                    <FilterTextField label="Bulan" inputValue={''} />
                    <FilterTextField label="Negeri" inputValue={''} />
                </FilterCard> -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        title="Rekod Peruntukan bagi Kakitangan"
                        onUpdate={_searchAllocation}
                        bind:tableData={employeeAllocationTable}
                    />
                    <!-- TODO: jana surat for enable detail -->
                </div>
            </div>
        </CustomTabContent>
        <!-- <CustomTabContent
            title="Senarai Pembayaran Untuk Tuntutan Melebihi Peruntukan"
        >
            <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
                <FilterCard onSearch={() => {}}>
                    <FilterTextField label="Kod Klinik" inputValue={''} />
                    <FilterTextField label="Nama Klinik" inputValue={''} />
                    <FilterTextField label="Bulan" inputValue={''} />
                    <FilterTextField label="Negeri" inputValue={''} />
                </FilterCard>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        title="Rekod Pembayaran untuk Tuntutan Melebihi Peruntukan"
                        onUpdate={_searchPayments}
                        bind:tableData={employeePaymentTable}
                        bind:passData={rowPaymentData}
                        enableDetail
                        detailActions={() =>
                            goto(
                                './bil-tuntutan-kakitangan/pembayaran/' +
                                    rowPaymentData.employeeId,
                            )}
                    />
                    TODO: jana surat for enable detail
                </div>
            </div>
        </CustomTabContent> -->
        {/if}
    </CustomTab>
</section>
