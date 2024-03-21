<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { PageData } from './$types';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _submitAddNewSalaryMovement, _updateTable } from './+page';
    import { Toaster } from 'svelte-french-toast';    import {
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
    import type {
        AddNewSalaryMovement,
    } from '$lib/dto/mypsm/gaji/pergerakan-gaji/add-new-salary-movement.dto';
    import type { SalaryMovementList } from '$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto';
    import { goto } from '$app/navigation';
    export let data: PageData;

    let selectedSalaryMovementDetail = {} as SalaryMovementList;
    let employeeListTable: TableDTO = {
        param: data.employeeListParam,
        meta: data.employeeListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.employeeList ?? [],
        selectedData: [] as CommonEmployeeDTO[],
        hiddenData: ['employeeId'],
    };

    let selectedEmployeeTable: TableDTO = {
        param: {},
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: employeeListTable.selectedData ?? [],
        hiddenData: ['employeeId'],
    };

    let salaryMovementListTable: TableDTO = {
        param: data.salaryMovementParam,
        meta: data.salaryMovementListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.salaryMovementList ?? [],
        hiddenData: ['meetingId'],
    };

    async function _search() {
        _updateTable(employeeListTable.param).then((value) => {
            employeeListTable.data = value.props.response.data?.dataList ?? [];
            employeeListTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeeListTable.param.pageSize = value.props.param.pageSize;
            employeeListTable.param.pageNum = value.props.param.pageNum;
            employeeListTable.hiddenData = ['employeeId'];
        });
    }

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
        validationMethod: 'onsubmit',
        validators: zod(_addNewSalaryMovementSchema),
        onSubmit() {
            const tempChosenEmployee: CommonEmployeeDTO[] =
                selectedEmployeeTable.data as CommonEmployeeDTO[];
            $addNewSalaryMovementForm.employees = tempChosenEmployee.map((employee) => ({employeeId: employee.employeeId}))

            _submitAddNewSalaryMovement($addNewSalaryMovementForm);
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
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={_search}>
            <FilterSelectField
                options={ProgramDropdownConstant.list}
                label="Program"
                bind:inputValue={employeeListTable.param.filter.program}
            />
            <FilterSelectField
                label="Jawatan"
                options={data.lookup.positionLookup}
                bind:inputValue={employeeListTable.param.filter.position}
            />
            <FilterTextField
                label="Nama"
                bind:inputValue={employeeListTable.param.filter.name}
            />
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={employeeListTable.param.filter.identityCard}
            />
        </FilterCard>

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
                    <div class="flex w-full flex-col justify-start gap-2">
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
                        <div class="flex w-full flex-row justify-start gap-10">
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
            <CustomTable
                title="Rekod Pergerakan Gaji Dalam Proses"
                bind:tableData={salaryMovementListTable}
                bind:passData={selectedSalaryMovementDetail}
                enableDetail
                detailActions={() => {
                    goto('/gaji/pergerakan-gaji/'+selectedSalaryMovementDetail.meetingId)
                }}
            />

            <CustomTable
                title="Senarai Kakitangan Yang Dipilih"
                bind:tableData={selectedEmployeeTable}
                hiddenFooter
            />
            <CustomTable
                title="Senarai Kakitangan Yang Layak Mengikut Proses Pergerakan Gaji"
                onUpdate={_search}
                bind:tableData={employeeListTable}
                enableDetail
                enableAdd
                detailActions={() => {}}
            />
        </div>
    </div>
</section>
<Toaster/>