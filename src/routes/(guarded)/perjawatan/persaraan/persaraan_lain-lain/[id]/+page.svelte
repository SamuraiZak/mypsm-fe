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
        USPRetirementEmployeeDetailDTO,
    } from '$lib/dto/mypsm/employment/retirement/retirement-other.dto';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';

    export let data: PageData;

    let selectedData: any;

    let chosenListTable: TableSettingDTO = {
        param: data.props.chosenListRequest,
        meta: data.props.chosenListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.chosenListResponse.data?.dataList ?? [],
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
        id: 'chosenListTable',
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

    function viewDetails() {
        let currentEmployee: USPRetirementEmployeeDetailDTO =
            selectedData as USPRetirementEmployeeDetailDTO;

        let url =
            '/perjawatan/persaraan/persaraan_lain-lain/' +
            data.props.currentApplicationId +
            '/' +
            currentEmployee.employeeId;

        goto(url);
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader
            title="Persaraan Lain-lain Kumpulan {data.props
                .currentApplicationId}"
        >
            <TextIconButton
                type="neutral"
                label="Kembali"
                onClick={() => {
                    let url = '/perjawatan/persaraan';

                    goto(url);
                }}
            >
                <SvgChevronLeft />
            </TextIconButton>
        </ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={chosenListTable}
                bind:passData={selectedData}
                detailActions={() => {
                    viewDetails();
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={chosenListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={chosenListTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={chosenListTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={chosenListTable.param.filter.year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>

<Toaster></Toaster>
