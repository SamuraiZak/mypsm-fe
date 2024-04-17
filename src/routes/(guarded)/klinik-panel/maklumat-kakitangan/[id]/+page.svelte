<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { PageData } from './$types';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _updateTable } from './+page';

    export let data: PageData;

    let dependantTable: TableDTO = {
        param: data.param,
        meta: data.employeeDependantResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.employeeDependant ?? [],
    };

    async function _searchTable() {
        _updateTable(dependantTable.param).then((value) => {
            dependantTable.data = value.props.response.data?.dataList ?? [];
            dependantTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            dependantTable.param.pageSize = value.props.param.pageSize;
            dependantTable.param.pageNum = value.props.param.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/klinik-panel/maklumat-kakitangan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col gap-2.5 p-5 pb-10">
        <div class="flex w-full flex-col justify-start gap-2.5 md:w-1/2">
            <CustomTextField
                label="Nama"
                disabled
                id="fullName"
                bind:val={data.employeeDetail.fullName}
            />
            <CustomTextField
                label="No. Pekerja"
                disabled
                id="employeeNumber"
                bind:val={data.employeeDetail.employeeNumber}
            />
            <CustomTextField
                label="No. Kad Pengenalan"
                disabled
                id="identityCardNumber"
                bind:val={data.employeeDetail.identityCardNumber}
            />
            <CustomTextField
                label="Gred"
                disabled
                id="grade"
                bind:val={data.employeeDetail.grade}
            />
            <CustomTextField
                label="Penempatan"
                disabled
                id="placement"
                bind:val={data.employeeDetail.placement}
            />
            <CustomTextField
                label="Kumpulan"
                disabled
                id="serviceGroup"
                bind:val={data.employeeDetail.serviceGroup}
            />
        </div>
        <CustomTable
        title="Senarai Tanggungan"
        bind:tableData={dependantTable}
        onUpdate={_searchTable}
    />
    </div>
</section>
