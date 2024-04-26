<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { MedicalClinicEmployeeAllocationClaimList } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-allocation-list.dto';
    import type { MedicalClinicEmployeePaymentList } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payments-list.dto';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import type { PageData } from './$types';
    import { _submit} from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import { _editAllocations } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;
    let rowData: MedicalClinicEmployeeAllocationClaimList;
    let rowPaymentData: MedicalClinicEmployeePaymentList;

    // table tuntutan kakitangan
    let employeeAllocationClaimsTable: TableSettingDTO = {
        param: data.param,
        meta: data.employeeAllocationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeAllocationList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['claimId', 'employeeId'],
        dictionary: [],
        url: 'medical/allocation/claim/list',
        id: 'employeeAllocationClaimsTable',
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

    //table peruntukan kakitangan
    let employeeAllocationTable: TableSettingDTO = {
        param: data.allocationParam,
        meta: data.employeeGetAllocationResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeGetAllocation ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [],
        url: 'medical/allocation/list',
        id: 'employeeAllocationTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    //table pembayaran
    let employeePaymentTable: TableSettingDTO = {
        param: data.paymentParam,
        meta: data.employeePaymentListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeePaymentList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['medicalClaimId', 'employeeId'],
        dictionary: [],
        url: 'medical/allocation/payment/list',
        id: 'employeePaymentTable',
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
    let readOnly: boolean = true;

    const { form, enhance } = superForm(data.allocationForm, {
        SPA: true,
        taintedMessage: false,
        id: 'allocationForm',
        validators: zod(_editAllocations),
        invalidateAll: true,
        resetForm: true,
        async onSubmit() {
            const res = await _submit($form, employeeAllocationTable.param);

            if (res?.response.status == 'success') {
                employeeAllocationTable.data = res.employeeGetAllocation;
                readOnly = true;
                
            }
        },
    });
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
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DataTable
                        title="Senarai Bil Tuntutan"
                        bind:tableData={employeeAllocationClaimsTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                './bil-tuntutan-kakitangan/butiran/' +
                                    rowData.employeeId +
                                    '-' +
                                    rowData.claimId,
                            );
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={employeeAllocationClaimsTable
                                    .param.filter.employeeNumber}
                            />
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={employeeAllocationClaimsTable
                                    .param.filter.name}
                            />
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
        {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
            <CustomTabContent
                title="Senarai Kakitangan - Peruntukan"
                paddingClass="p-none"
            >
                <div
                    class="flex w-full flex-col items-end justify-start gap-2.5 border-b border-ios-activeColors-activeBlue-light px-5 pt-2"
                >
                    <Alert
                        class="flex w-full flex-row items-center justify-between"
                        color="blue"
                    >
                        <p class="text-lg font-medium">Tetapan</p>
                        {#if readOnly}
                            <TextIconButton
                                label="Kemaskini"
                                type="neutral"
                                onClick={() => {
                                    readOnly = false;
                                }}
                            />
                        {:else}
                            <div class="flex flex-row items-end gap-2.5">
                                <TextIconButton
                                    label="Batal"
                                    icon="cancel"
                                    type="neutral"
                                    onClick={() => {
                                        readOnly = true;
                                    }}
                                />
                                <TextIconButton
                                    label="Simpan"
                                    icon="check"
                                    form="allocationForm"
                                />
                            </div>
                        {/if}
                    </Alert>
                    <form
                        class="grid w-full grid-cols-2 justify-start gap-x-10"
                        id="allocationForm"
                        method="POST"
                        use:enhance
                    >
                        <CustomTextField
                            label="Peruntukkan Semasa (RM)"
                            id="currentAllocation"
                            disabled
                            placeholder=""
                            type="number"
                            val={data.clinicPanelAllocations?.currentAllocation}
                        />
                        <CustomTextField
                            label="Kumulatif Peruntukkan (RM)"
                            id="cumulAlloc"
                            disabled
                            placeholder=""
                            type="number"
                            val={data.clinicPanelAllocations?.cumulAlloc}
                        />
                        <div class="flex flex-row w-full gap-10">
                            {#if !readOnly}
                                <CustomTextField
                                    label="Peruntukkan Baru (RM)"
                                    id="newAllocation"
                                    type="number"
                                    bind:val={$form.newAllocation}
                                />
                            {/if}
                            <CustomTextField
                                label="Tahun"
                                id="year"
                                disabled={readOnly}
                                type="number"
                                bind:val={$form.year}
                            />
                        </div>
                        <CustomTextField
                            label="Kumulatif Baki Peruntukkan (RM)"
                            id="cumulRemainder"
                            disabled
                            placeholder=""
                            type="number"
                            val={data.clinicPanelAllocations?.cumulRemainder}
                        />
                    </form>
                </div>
                <div class="flex w-full flex-col justify-start p-5 pb-10">
                    <div class="h h-fit w-full">
                        <DataTable
                            title="Rekod Peruntukan bagi Kakitangan"
                            bind:tableData={employeeAllocationTable}
                            bind:passData={rowData}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={employeeAllocationTable
                                        .param.filter.employeeNumber}
                                />
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={employeeAllocationTable
                                        .param.filter.name}
                                />
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            </CustomTabContent>
            <CustomTabContent
                title="Senarai Pembayaran Untuk Tuntutan Melebihi Peruntukan"
            >
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10"
                >
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DataTable
                            title="Rekod Pembayaran"
                            bind:tableData={employeePaymentTable}
                            bind:passData={rowPaymentData}
                            detailActions={() => {
                                goto(
                                    './bil-tuntutan-kakitangan/pembayaran/' +
                                        rowPaymentData.medicalClaimId,
                                );
                            }}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={employeePaymentTable.param
                                        .filter.employeeNumber}
                                />
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={employeePaymentTable.param
                                        .filter.name}
                                />
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            </CustomTabContent>
        {/if}
    </CustomTab>
</section>

<Toaster />
