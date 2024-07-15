<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service';
    import type { AddChosenActingEmployeeDTO } from '$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto';
    import { error } from '@sveltejs/kit';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { Alert, Modal } from 'flowbite-svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    export let data: PageData;

    let confirmModal: boolean = false;
    let addActingTable: TableSettingDTO = {
        param: data.param,
        meta: data.actingEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.actingEmployeeList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'homeAddress'],
        dictionary: [
            {
                english: 'programme',
                malay: 'Penempatan Sekarang',
            },
        ],
        url: 'employment/acting/employee_lists/list',
        id: 'addActingTable',
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
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: addActingTable.selectedData ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'homeAddress'],
        dictionary: [
            {
                english: 'programme',
                malay: 'Program',
            },
        ],
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

    $: selectedEmployeeTable.data = addActingTable.selectedData ?? [];
    $: selectedEmployeeTable.meta.totalData =
        addActingTable.selectedData.length;

    const addChosenEmployeeToActing = async () => {
        let tempEmployeeIdList: number[] = [];

        selectedEmployeeTable.data.forEach((element) => {
            let tempEmployee: CommonEmployeeDTO = element as CommonEmployeeDTO;
            tempEmployeeIdList.push(tempEmployee.employeeId);
        });

        let tempChosenEmpployee: AddChosenActingEmployeeDTO = {
            actingType: data.actingTypes,
            employeeIds: tempEmployeeIdList,
        };
        if (selectedEmployeeTable.data.length < 1) {
            alert('Senarai calon pemangkuan tidak boleh kosong.');
            error(400, { message: 'No ID Selected!' });
        }
        const response: CommonResponseDTO =
            await EmploymentActingServices.addChosenActingEmployee(
                tempChosenEmpployee,
            );

        if (response.status == 'success') {
            confirmModal = false;
            setTimeout(
                () =>
                    goto(
                        '/perjawatan/pemangkuan/butiran/' +
                            response.data?.details.batchId +
                            '-' +
                            data.actingTypes,
                    ),
                1000,
            );
        }
        return { response };
    };
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan Baru Gred {data.actingTypes}">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => {
                goto('/v2/employment/acting');
            }}
        />
        <TextIconButton
            icon="add"
            label="Tambah"
            type="primary"
            onClick={() => (confirmModal = true)}
        />
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <!-- Senarai Semua Kakitangan -->
        <CustomTabContent title="Senarai Semua Kakitangan">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-3 p-3"
            >
                <Alert color="blue">
                    <p>
                        <span class="font-medium">Arahan: </span>
                        Tekan tombol tambah untuk masukkan kakitangan ke senarai
                        calon yang dipilih untuk dipangku.
                    </p>
                </Alert>
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai Kakitangan"
                        bind:tableData={addActingTable}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={addActingTable.param.filter
                                    .employeeNumber}
                            />
                            <FilterTextField
                                label="Nama"
                                bind:inputValue={addActingTable.param.filter
                                    .name}
                            />
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={addActingTable.param.filter
                                    .ICNumber}
                            />
                            <FilterSelectField
                                label="Gred"
                                options={data.gradeLookup}
                                bind:inputValue={addActingTable.param.filter
                                    .grade}
                            />
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start p-3"
            >
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai Calon Yang Dipilih Untuk Pemangkuan Gred {data.actingTypes}"
                        bind:tableData={selectedEmployeeTable}
                    ></DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
<Modal
    title="Sistem MyPSM"
    bind:open={confirmModal}
    size="sm"
    dismissable={false}
>
    <Alert color="blue">
        <div class="flex w-full flex-col justify-start gap-3">
            <p>
                <span class="font-medium">Arahan: </span>
                Masukkan gred pemangku dan jawatan untuk menetapkan tajuk proses
                pemangkuan.
            </p>
        </div>
    </Alert>
    <div class="w-full">
        <CustomSelectField
            id="actingPosition"
            label="Jawatan"
            options={data.positionLookup}
            val=""
        />
    </div>
    <div class="flex justify-center gap-3">
        <TextIconButton
            label="Batal"
            type="neutral"
            icon="cancel"
            onClick={() => (confirmModal = false)}
        />
        <TextIconButton
            label="Hantar"
            type="primary"
            icon="check"
            onClick={() => {
                addChosenEmployeeToActing();
            }}
        />
    </div>
</Modal>
<Toaster />
