<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import XCard from '$lib/components/card/XCard.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import {
        mesyuaratNameLookup,
        monthNumberLookup,
    } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import { _addNewSalaryMovementSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submitAddNewSalaryMovement } from './+page';
    import { Checkbox } from 'flowbite-svelte';

    export let data: PageData;

    let employeeListTable: TableSettingDTO = {
        param: data.table.param,
        meta: data.table.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: data.table.excludedEmployee.length,
            totalPage: 1,
        },
        data:
            data.props.id.id == 0
                ? data.table.employeeList
                : data.table.excludedEmployee,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [{ english: 'kumpulanPGT', malay: 'Kumpulan PGT' }],
        url: 'employee/list',
        id: 'salaryRecordTable',
        option: {
            checkbox:
                data.props.movementType == 'Kenaikan Gaji Tahunan'
                    ? true
                    : false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        taintedMessage: false,
        id: 'addNewApplication',
        dataType: 'json',
        invalidateAll: true,
        validators: zod(_addNewSalaryMovementSchema),
        onSubmit() {
            const tempChosenEmployee: CommonEmployeeDTO[] =
                employeeListTable.selectedData as CommonEmployeeDTO[];
            $form.employees = tempChosenEmployee.map((employee) => ({
                employeeId: employee.employeeId,
            }));
            if (data.props.movementType == 'Kenaikan Gaji Tahunan') {
                $form.amount = null;
            } else {
                $form.meetingName = null;
                $form.meetingDate = null;
            }
            _submitAddNewSalaryMovement($form).then((res) => {
                if (res?.response.status == 'success') {
                    employeeListTable.selectedData = [];
                    goto('/v2/salary/movement');
                }
            });
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title={data.props.movementType}>
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/v2/salary/movement')}
        />
        <TextIconButton
            label="Simpan"
            type="draft"
            icon="save"
            form="addNewApplication"
            onClick={() => ($form.isDraft = true)}
        />
        <TextIconButton
            label="Hantar"
            icon="check"
            form="addNewApplication"
            onClick={() => {
                $form.isDraft = false;
            }}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-3 p-3">
        {#if data.props.movementType == 'Kenaikan Gaji Tahunan'}
            <XCard
                title="Bahagian 1: Tetapan Kenaikan Gaji Tahunan (KGT) Mengikut Bulan"
            >
                <form
                    class="flex w-full flex-row items-center justify-start gap-2.5"
                    id="addNewApplication"
                    use:enhance
                    method="POST"
                >
                    <CustomSelectField
                        label="Nama dan Bilangan Mesyuarat"
                        id="meetingName"
                        options={mesyuaratNameLookup}
                        bind:val={$form.meetingName}
                        errors={$errors.meetingName}
                    />
                    <CustomSelectField
                        label="Bulan Pergerakan Gaji"
                        id="salaryMovementMonth"
                        options={data.props.lookup.salaryMovementMonth}
                        bind:val={$form.salaryMovementMonthId}
                        errors={$errors.salaryMovementMonthId}
                    />
                    <CustomTextField
                        label="Tarikh Mesyuarat"
                        id="meetingDate"
                        type="date"
                        bind:val={$form.meetingDate}
                        errors={$errors.meetingDate}
                    />
                </form>
            </XCard>
        {:else if data.props.movementType == 'Kenaikan Khas'}
            <XCard title="Tetapan Kenaikan Khas">
                <ContentHeader title="" borderClass="border-none"
                ></ContentHeader>
                <form
                    class="flex w-full flex-row items-center justify-start gap-5"
                    id="addNewApplication"
                    use:enhance
                    method="POST"
                >
                    <Checkbox
                        bind:checked={$form.isPercentage}
                        class="just flex w-full text-ios-basic-inactiveGray gap-2"
                        >Peratusan daripada gaji minima
                        <CustomTextField
                            id="total"
                            type="number"
                            label={$form.isPercentage
                                ? 'Peratusan (%)'
                                : 'Jumlah Kenaikan Khas (RM)'}
                            bind:val={$form.amount}
                            errors={$errors.amount}
                        />
                    </Checkbox>
                    <CustomSelectField
                        id="month"
                        label="Bulan Berkuatkuasa"
                        options={monthNumberLookup}
                        bind:val={$form.salaryMovementMonthId}
                        errors={$errors.salaryMovementMonthId}
                    />
                </form>
            </XCard>
        {:else if data.props.movementType == 'Bantuan Khas Kewangan'}
            <XCard title="Tetapan Bantuan Khas Kewangan">
                <ContentHeader title="" borderClass="border-none"
                ></ContentHeader>
                <form
                    class="flex w-full flex-row items-center justify-start gap-5"
                    id="addNewApplication"
                    use:enhance
                    method="POST"
                >
                    <Checkbox
                        bind:checked={$form.isPercentage}
                        class="just flex w-full text-ios-basic-inactiveGray gap-2"
                        >Peratusan daripada gaji minima
                        <CustomTextField
                            id="total"
                            type="number"
                            label={$form.isPercentage
                                ? 'Peratusan (%)'
                                : 'Jumlah Bantuan Khas Kewangan (RM)'}
                            bind:val={$form.amount}
                            errors={$errors.amount}
                        />
                    </Checkbox>
                    <CustomTextField
                        id="total"
                        type="number"
                        label="Jumlah Bantuan Khas Kewangan (RM)"
                        bind:val={$form.amount}
                        errors={$errors.amount}
                    />
                    <CustomSelectField
                        id="month"
                        label="Bulan Berkuatkuasa"
                        options={data.props.lookup.salaryMovementMonth}
                        bind:val={$form.salaryMovementMonthId}
                        errors={$errors.salaryMovementMonthId}
                    />
                </form>
            </XCard>
        {/if}
        <XCard
            title="Bahagian 2: Tetapan Pengecualian Kakitangan Mengikut Bulan KGT"
        >
            <div class="h-fit w-full">
                <DataTable
                    title={data.props.id.id == 0
                        ? 'Senarai Kakitangan'
                        : 'Senarai Kakitangan Yang Dikecualikan'}
                    bind:tableData={employeeListTable}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={employeeListTable.param.filter
                                .name}
                        />
                        <FilterTextField
                            label="No. Pekerja"
                            bind:inputValue={employeeListTable.param.filter
                                .employeeNumber}
                        />
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={employeeListTable.param.filter
                                .identityDocumentNumber}
                        />
                        <FilterSelectField
                            options={data.props.lookup.gradeLookup}
                            label="Gred dan Jawatan"
                            bind:inputValue={employeeListTable.param.filter
                                .grade}
                        />
                        <FilterSelectField
                            options={data.props.lookup.salaryMovementMonth}
                            label="Bulan Pergerakan Gaji"
                            bind:inputValue={employeeListTable.param.filter
                                .movementMonth}
                        />
                    </FilterWrapper>
                </DataTable>
            </div>
        </XCard>
    </div>
</section>
<Toaster />
