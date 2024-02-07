<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import type { PageData } from './$types';
    import type { ListNewContractResponse } from '$lib/dto/mypsm/contract-employment/list-new-contract-response.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { _updateTable } from './+layout';
    import CustomTable from '$lib/components/table/CustomTable.svelte';

    export let data: PageData;
    let selectedStatus = status[0].value; // Default selected filter

    let tempUrl: Candidate;

    let dataRow: ListNewContractResponse;
    let param: CommonListRequestDTO = data.prop.param;

    let table: TableDTO = {
        param: param,
        meta: data.prop.newContractResponse.data?.meta ?? {
            pageSize: 10,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.prop.newContractResponse.data?.dataList ?? [],
    }
    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.props.response.data?.dataList ?? [];
            table.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru (Kontrak)"
        description="Hal-hal berkaitan kakitangan kontrak LKIM"
    >
        <FormButton
            type="new"
            addLabel="Tambah Lantikan Baru (Kontrak)"
            onClick={() => {
                goto('perlantikan/permohonan-baru');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterContainer onFilter={_search}>
        <DropdownSelect
            label="Status Kontrak"
            dropdownType="label-top"
            bind:value={table.param.filter.dataType}
            options={[
                {
                    value: "New",
                    name: "Baru",
                },
                {
                    value: "Submitted",
                    name: "Telah Dikemaskini"
                }
            ]}
            />
    </FilterContainer>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-start justify-center">
        <SectionHeader title="Senarai Rekod Pautan Belum Diisi"></SectionHeader>
        <!-- <DynamicTable
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url = './perlantikan/permohonan-baru';
                goto(url);
            }}
            tableItems={newStaffUrl}
            bind:passData={tempUrl}
        ></DynamicTable> -->
        <CustomTable
                bind:tableData={table}
                onUpdate={_search}
            >
        </CustomTable>

        <SectionHeader title="Senarai Rekod Selesai Diisi"></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['edit']}
        ></DynamicTable>
    </div>
</section>
