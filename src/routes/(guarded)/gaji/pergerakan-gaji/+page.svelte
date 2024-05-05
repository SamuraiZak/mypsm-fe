<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { PageData } from './$types';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import {
        _submitAddNewSalaryMovement,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import {
        kgtMonthLookup,
        kgtSpecialRaiseType,
        mesyuaratNameLookup,
    } from '$lib/constants/core/dropdown.constant';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { ProgramDropdownConstant } from '$lib/constants/dropdown/program.constant';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _addNewSalaryMovementSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type { SalaryMovementList } from '$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto';
    import { goto } from '$app/navigation';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Alert, Modal } from 'flowbite-svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    export let data: PageData;

    let selectedSalaryMovementDetail = {} as SalaryMovementList;
    let selectedEmployee: boolean = false;

    let employeeListTable: TableSettingDTO = {
        param: data.employeeListParam,
        meta: data.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.employeeList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [],
        url: 'employee/list',
        id: 'employeeListTable',
        option: {
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    let selectedEmployeeTable: TableSettingDTO = {
        param: data.employeeListParam,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: employeeListTable.selectedData.length,
            totalPage: 1,
        },
        data: employeeListTable.selectedData ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [],
        url: '',
        id: 'selectedEmployeeTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
            footer: false,
        },
        controls: {
            add: false,
        },
    };

    let salaryMovementListTable: TableSettingDTO = {
        param: data.salaryMovementParam,
        meta: data.salaryMovementListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.salaryMovementList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['meetingId'],
        dictionary: [],
        url: data.currentRoleCode == UserRoleConstant.urusSetiaGaji.code ? 'salary/movement/list' : 'salary/movement/approval/list',
        id: 'salaryMovementListTable',
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

    $: selectedEmployeeTable.data =
        (employeeListTable.selectedData as CommonEmployeeDTO[]) ?? [];

    const {
        form: addNewSalaryMovementForm,
        errors: addNewSalaryMovementError,
        enhance: addNewSalaryMovementEnhance,
    } = superForm(data.addNewSalaryMovementForm, {
        SPA: true,
        taintedMessage: false,
        id: 'addContractPersonalDetailForm',
        invalidateAll: true,
        validators: zod(_addNewSalaryMovementSchema),
        onSubmit() {
            const tempChosenEmployee: CommonEmployeeDTO[] =
                selectedEmployeeTable.data as CommonEmployeeDTO[];
            $addNewSalaryMovementForm.employees = tempChosenEmployee.map(
                (employee) => ({ employeeId: employee.employeeId }),
            );
            if ($addNewSalaryMovementForm.employees.length > 0) {
                _submitAddNewSalaryMovement($addNewSalaryMovementForm).then((res) => {
                    if(res?.response.status == 'success'){
                        employeeListTable.selectedData = [];
                    }
                });
            } else {
                selectedEmployee = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pergerakan Gaji" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        {#if data.currentRoleCode == UserRoleConstant.urusSetiaGaji.code}
            <CustomTabContent title="Pergerakan Gaji Baru">
                <div class="flex w-full flex-col justify-start gap-2.5 p-5">
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    >
                        <div
                            class="flex w-full flex-col items-center justify-start gap-4 rounded-md border px-3 pb-4"
                        >
                            <form
                                class="flex w-full flex-row justify-start gap-10"
                                method="POST"
                                id="addNewSalaryMovementForm"
                                use:addNewSalaryMovementEnhance
                            >
                                <div class="flex w-full flex-col gap-2.5">
                                    <ContentHeader
                                        title="Kenaikan Gaji Tahunan (KGT) Semua Kakitangan: "
                                        borderClass="border-none"
                                    />
                                    <CustomSelectField
                                        label="Nama dan Bilangan Mesyuarat"
                                        id="meetingName"
                                        options={mesyuaratNameLookup}
                                        bind:val={$addNewSalaryMovementForm.meetingName}
                                        errors={$addNewSalaryMovementError.meetingName}
                                    />
                                    <CustomTextField
                                        label="Tarikh Mesyuarat"
                                        id="meetingDate"
                                        type="date"
                                        bind:val={$addNewSalaryMovementForm.meetingDate}
                                        errors={$addNewSalaryMovementError.meetingDate}
                                    />
                                    <CustomSelectField
                                        label="Bulan Pergerakan Gaji"
                                        id="salaryMovementMonth"
                                        options={kgtMonthLookup}
                                        bind:val={$addNewSalaryMovementForm.salaryMovementMonth}
                                        errors={$addNewSalaryMovementError.salaryMovementMonth}
                                    />
                                </div>
                                <div
                                    class="flex w-full flex-col justify-start gap-2"
                                >
                                    <ContentHeader
                                        title="Keputusan Mesyuarat: "
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Bantuan Khas Kewangan (RM)"
                                        id="specialAid"
                                        type="number"
                                        bind:val={$addNewSalaryMovementForm.specialAid}
                                        errors={$addNewSalaryMovementError.specialAid}
                                    />
                                    <div
                                        class="flex w-full flex-row justify-start gap-10"
                                    >
                                        <CustomSelectField
                                            label="Jenis Kenaikan Khas"
                                            id="specialRaiseType"
                                            options={kgtSpecialRaiseType}
                                            bind:val={$addNewSalaryMovementForm.specialRaiseType}
                                            errors={$addNewSalaryMovementError.specialRaiseType}
                                        />
                                        <CustomTextField
                                            label="Jumlah Kenaikan Khas (RM)"
                                            id="specialRaise"
                                            type="number"
                                            bind:val={$addNewSalaryMovementForm.specialRaise}
                                            errors={$addNewSalaryMovementError.specialRaise}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div class="w-fit">
                                <TextIconButton
                                    label="Simpan"
                                    type="primary"
                                    form="addNewSalaryMovementForm"
                                />
                            </div>
                        </div>
                        <div class="h-fit w-full">
                            <DataTable
                                title="Senarai Kakitangan"
                                bind:tableData={employeeListTable}
                            >
                                <FilterWrapper slot="filter">
                                    <FilterSelectField
                                        options={ProgramDropdownConstant.list}
                                        label="Program"
                                        bind:inputValue={employeeListTable.param
                                            .filter.program}
                                    />
                                    <FilterSelectField
                                        label="Jawatan"
                                        options={data.lookup.positionLookup}
                                        bind:inputValue={employeeListTable.param
                                            .filter.position}
                                    />
                                    <FilterTextField
                                        label="Nama"
                                        bind:inputValue={employeeListTable.param
                                            .filter.name}
                                    />
                                    <FilterTextField
                                        label="No. Kad Pengenalan"
                                        bind:inputValue={employeeListTable.param
                                            .filter.identityCard}
                                    />
                                </FilterWrapper>
                            </DataTable>
                        </div>
                        <div class="h-fit w-full">
                            <DataTable
                                title="Senarai Kakitangan Yang Dipilih"
                                bind:tableData={selectedEmployeeTable}
                            />
                        </div>
                    </div>
                </div>
            </CustomTabContent>
        {/if}

        <CustomTabContent title="Rekod Pergerakan Gaji">
            <div class="flex w-full flex-col justify-start gap-2.5 p-5">
                <div class="h-fit w-full">
                    <DataTable
                        title="Rekod Pergerakan Gaji"
                        bind:tableData={salaryMovementListTable}
                        bind:passData={selectedSalaryMovementDetail}
                        detailActions={() => {
                            goto(
                                '/gaji/pergerakan-gaji/' +
                                    selectedSalaryMovementDetail.meetingId,
                            );
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterSelectField
                                options={kgtMonthLookup}
                                label="Bulan"
                                bind:inputValue={salaryMovementListTable.param
                                    .filter.month}
                            />
                            <FilterNumberField
                                label="Tahun"
                                bind:inputValue={salaryMovementListTable.param
                                    .filter.year}
                            />
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
<Toaster />
<Modal
    title="Sistem MyPSM"
    bind:open={selectedEmployee}
    dismissable={false}
    size="sm"
>
    <Alert color="red">
        <p>
            <span class="font-medium">Ralat! </span>
            Senarai kakitangan yang dipilih untuk pergerakan gaji tidak boleh kosong.
        </p>
    </Alert>
    <div class="flex justify-center gap-3">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => (selectedEmployee = false)}
        />
    </div>
</Modal>
