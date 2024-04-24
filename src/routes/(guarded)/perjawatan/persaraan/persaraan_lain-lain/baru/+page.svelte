<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type {
        RetirementEmployeeDTO,
        RetirementOtherAddChosenDTO,
        RetirementOtherCreateResultDTO,
    } from '$lib/dto/mypsm/employment/retirement/retirement-other.dto';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { _submitChosenList } from './+page';

    export let data: PageData;

    let selectedData: any;

    let employeeListTable: TableSettingDTO = {
        param: data.props.employeeListRequest,
        meta: data.props.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.employeeListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'employeeNumber', 'id'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'employment/retirement/unspecify/list_employee',
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

    function createNewApplication() {
        let newApplication: RetirementOtherAddChosenDTO = {
            employeeList: [],
        };

        let chosenList: RetirementEmployeeDTO[] =
            employeeListTable.selectedData as RetirementEmployeeDTO[];

        chosenList.forEach((element) => {
            newApplication.employeeList.push(element.id);
        });

        _submitChosenList(newApplication).then((value) => {
            if (value.response.status == 'success') {
                let result: RetirementOtherCreateResultDTO = value.response.data
                    ?.details as RetirementOtherCreateResultDTO;

                let url =
                    '/perjawatan/persaraan/persaraan_lain-lain/' +
                    result.groupId;

                goto(url);
            }
        });
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Proses Persaraan Baru"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={employeeListTable}
                bind:passData={selectedData}
            >
                <div
                    slot="extras"
                    class="flex h-full w-fit flex-row items-center justify-end gap-2"
                >
                    {#if employeeListTable.selectedData.length}
                        <div
                            class="flex h-fit w-fit flex-col items-center justify-center"
                        >
                            <span
                                class="t text-base font-medium text-ios-labelColors-secondaryLabel-light"
                                >{employeeListTable.selectedData.length} kakitangan
                                telah dipilih</span
                            >
                        </div>
                        <TextIconButton
                            label="Seterusnya"
                            icon="check"
                            onClick={() => {
                                createNewApplication();
                            }}
                        ></TextIconButton>
                    {/if}
                </div>
                <FilterWrapper slot="filter">
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={employeeListTable.param.filter.year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>

<Toaster></Toaster>
