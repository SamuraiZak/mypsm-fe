<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateActingEmployeeListTable, _updateTable } from './+page';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service';
    import type { AddChosenActingEmployeeDTO } from '$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto';
    import { error } from '@sveltejs/kit';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    export let data: PageData;

    let param: CommonListRequestDTO = data.param;
    let table: TableDTO = {
        param: param,
        meta: data.actingEmployeeListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data:
            data.actingTypes == '1-54'
                ? data.actingEmployeeList
                : data.dataList2 ?? [],
        hiddenData: ['employeeId', 'homeAddress'],
        selectedData: [],
    };
    
    async function _searchActingEmployeeList() {
        _updateActingEmployeeListTable(table.param).then((value) => {
            table.data = value.response.data?.dataList ?? [];
            table.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }

    // table for selected employee for acting
    let selectedEmployeeTable: TableDTO = {
        param: param,
        meta: table.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: table.selectedData ?? [],
        hiddenData: ['employeeId', 'homeAddress'],
    };
   
    $: selectedEmployeeTable.data = table.selectedData ?? [];

    const addChosenEmployeeToActing = async () => {
        const employeeArray = selectedEmployeeTable.data;

        let tempEmployeeIdList: number[] = [];

        selectedEmployeeTable.data.forEach((element) => {
            let tempEmployee: CommonEmployeeDTO = element as CommonEmployeeDTO;
            tempEmployeeIdList.push(tempEmployee.employeeId);
        });

        let tempChosenEmpployee: AddChosenActingEmployeeDTO = {
            actingType: data.actingTypes,
            employeeIds: tempEmployeeIdList,
        };
        console.log(tempChosenEmpployee)
        if (selectedEmployeeTable.data.length < 1) {
            alert('Senarai calon pemangkuan tidak boleh kosong.');
            error(400, { message: 'No ID Selected!' });
        }
        const response: CommonResponseDTO =
            await EmploymentActingServices.addChosenActingEmployee(tempChosenEmpployee)
        
        if(response.status == 'success'){
            console.log('berjaya')
            setTimeout(() => goto('/perjawatan/pemangkuan/butiran-' + data.actingTypes), 1500);
        }

        console.log(response)
        return { response }
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
                goto('./');
            }}
        />
        <TextIconButton
            icon="next"
            label="Seterusnya"
            type="primary"
            onClick={() => {
                // if (selectedEmployeeTable.data.length < 1) {
                //     alert('Senarai calon pemangkuan tidak boleh kosong.');
                // } else {
                //     goto('/perjawatan/pemangkuan/butiran-' + data.actingTypes);
                // }
                addChosenEmployeeToActing()
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
                <!-- Table here -->
                <CustomTable
                    title=""
                    onUpdate={_searchActingEmployeeList}
                    bind:tableData={table}
                    enableAdd={true}
                ></CustomTable>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
            <ContentHeader
                title="Senarai calon yang dipilih untuk dipangku."
                borderClass="border-none"
            />
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <!-- Table here -->
                <CustomTable title="" bind:tableData={selectedEmployeeTable}
                ></CustomTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
