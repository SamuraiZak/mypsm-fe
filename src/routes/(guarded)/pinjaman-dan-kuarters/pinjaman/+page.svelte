<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import { _applyLoan, _updateTable } from './+page';
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

    async function _search() {
        _updateTable(employeeLoantable.param).then((value) => {
            employeeLoantable.data = value.props.response.data?.dataList ?? [];
            employeeLoantable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeeLoantable.param.pageSize = value.props.param.pageSize;
            employeeLoantable.param.pageNum = value.props.param.pageNum;
        });
    }

    const newLoanType: IntDropdownOption[] = [
        {
            value: 'Kenderaan',
            name: 'Kenderaan',
            href: '/pinjaman-dan-kuarters/pinjaman/permohonan/kenderaan/Baru',
        },
        {
            value: 'Komputer dan Telefon Pintar',
            name: 'Komputer dan Telefon Pintar',
            href: '/pinjaman-dan-kuarters/pinjaman/permohonan/komputer_dan_telefon_pintar/Baru',
        },
    ];

    function viewDetails() {
        let url: string = '';

        if (rowData.loanType == 'Kenderaan') {
            url =
                '/pinjaman-dan-kuarters/pinjaman/permohonan/kenderaan/' +
                rowData.id;
        } else {
            url =
                '/pinjaman-dan-kuarters/pinjaman/permohonan/komputer_dan_telefon_pintar/' +
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
                label="Pinjaman Baru"
                options={newLoanType}
                bind:val={lType}
            />
        {/if}
    </ContentHeader>

    <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <FilterCard onSearch={_search}>
                <FilterTextField
                    label="Nama"
                    bind:inputValue={employeeLoantable.param.filter
                        .employeeName}
                />
                <FilterTextField
                    label="Jenis Pinjaman"
                    bind:inputValue={employeeLoantable.param.filter.loanType}
                />
                <FilterDateField
                    label="Tarikh Permohonan"
                    bind:inputValue={employeeLoantable.param.filter
                        .applicationDate}
                />
                <FilterTextField
                    label="No Pekerja"
                    bind:inputValue={employeeLoantable.param.filter
                        .employeeNumber}
                />
                <FilterTextField
                    label="Status"
                    bind:inputValue={employeeLoantable.param.filter.status}
                />
            </FilterCard>
            <CustomTable
                title="Senarai Permohonan"
                enableDetail
                bind:passData={rowData}
                bind:tableData={employeeLoantable}
                detailActions={() => {
                    viewDetails();
                }}
                onUpdate={_search}
            ></CustomTable>
        </div>
    </CustomTabContent>
</section>
