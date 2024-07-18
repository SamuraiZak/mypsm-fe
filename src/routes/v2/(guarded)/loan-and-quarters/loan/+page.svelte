<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO, TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import { _applyLoan,  } from './+page';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let rowData: any;
    let lType: string = '';

    let employeeLoantable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.loanViewTable ?? [],
    };

     // Table list - New Offer Meeting
     let loanListTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.loanViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.loanViewResponse.data
                ?.dataList ) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['meetingId'],
        dictionary: [
        ],
        url: 'loan/list',
        id: 'loanListTable',
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

    const newLoanType: IntDropdownOption[] = [
        {
            value: 'Kenderaan',
            name: 'Kenderaan',
            href: '/v2/loan-and-quarters/loan/permohonan/kenderaan/Baru',
        },
        {
            value: 'Komputer dan Telefon Pintar',
            name: 'Komputer dan Telefon Pintar',
            href: '/v2/loan-and-quarters/loan/permohonan/komputer_dan_telefon_pintar/Baru',
        },
    ];

    function viewDetails() {
        let url: string = '';

        if (rowData.loanType == 'Kenderaan') {
            url =
                '/v2/loan-and-quarters/loan/permohonan/kenderaan/' +
                rowData.id;
        } else {
            url =
                '/v2/loan-and-quarters/loan/permohonan/komputer_dan_telefon_pintar/' +
                rowData.id;
        }

        goto(url);
    }
</script>

<section
    class="flex w-full flex-col items-start justify-start gap-2.5 overflow-y-auto"
>
    <ContentHeader title="Rekod Pinjaman">
        {#if data.userMode == 'kakitangan'}
            <TextIconButton
                type="primary"
                icon="add"
                label="Pinjaman Baru"
                options={newLoanType}
                bind:val={lType}
            />
        {/if}
    </ContentHeader>

    <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
        <div class="flex max-h-full w-full flex-col items-start justify-start">

            <DataTable
            title="Senarai Permohonan"
            bind:tableData={loanListTable}
            bind:passData={rowData}
            detailActions={() => {
                viewDetails();
            }}
         
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    label="Nama"
                    bind:inputValue={loanListTable.param.filter
                        .name}
                />
                <FilterTextField
                    label="Jenis Pinjaman"
                    bind:inputValue={loanListTable.param.filter.loanType}
                />
                <FilterDateField
                    label="Tarikh Permohonan"
                    bind:inputValue={loanListTable.param.filter
                        .applicationDate}
                />
                <FilterTextField
                    label="No Pekerja"
                    bind:inputValue={loanListTable.param.filter
                        .name}
                />
                <FilterTextField
                    label="Status"
                    bind:inputValue={loanListTable.param.filter.status}
                />
            </FilterWrapper>
        </DataTable>
        </div>
    </CustomTabContent>
</section>
