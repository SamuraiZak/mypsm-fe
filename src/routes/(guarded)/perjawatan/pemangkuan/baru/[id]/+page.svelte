<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type {
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service';
    import type { AddChosenActingEmployeeDTO } from '$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto';
    import { error } from '@sveltejs/kit';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import { Toaster } from 'svelte-french-toast';
    export let data: PageData;

    let addActingTable: TableSettingDTO = {
        param: data.param,
        meta: data.actingEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.actingEmployeeList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'homeAddress'],
        dictionary: [],
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
        meta: addActingTable.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: addActingTable.selectedData ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'homeAddress'],
        dictionary: [],
        url: "",
        id: 'selectedEmployeeTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    $: selectedEmployeeTable.data = addActingTable.selectedData ?? [];

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
            setTimeout(
                () =>
                    goto('/perjawatan/pemangkuan/butiran/'+response.data?.details.batchId+'-'+ data.actingTypes),
                1000,
            );
        }
        return { response };
    };
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Baru Gred {data.actingTypes
            .replace(/f/g, 'F')
            .replace(/_/g, '-')}"
    >
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => {
                goto('/perjawatan/pemangkuan');
            }}
        />
        <TextIconButton
            icon="next"
            label="Seterusnya"
            type="primary"
            onClick={() => {
                addChosenEmployeeToActing();
            }}
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
            <ContentHeader
                title="Tindakan: Tekan tombol tambah untuk masukkan kakitangan ke senarai calon yang dipilih untuk dipangku."
                borderClass="border-none"
            />
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <div class="h-fit w-full p-3">
                    <DataTable
                        title="Senarai Kakitangan"
                        bind:tableData={addActingTable}
                    ></DataTable>
                </div>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
            <div
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
            <div class="h-fit w-full p-3">
                <DataTable
                    title="Senarai calon yang dipilih untuk dipangku."
                    bind:tableData={selectedEmployeeTable}
                ></DataTable>
            </div>
        </div>
        </CustomTabContent>
    </CustomTab>
</section>

<Toaster/>
