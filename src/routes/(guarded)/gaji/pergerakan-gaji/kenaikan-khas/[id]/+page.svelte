<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import XCard from '$lib/components/card/XCard.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import {
        kgtMonthLookup,
        mesyuaratNameLookup,
        monthNumberLookup,
    } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';

    export let data: PageData;

    let salaryRecordTable: TableSettingDTO = {
        param: data.props.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 3,
            totalPage: 1,
        },
        data: data.props.mockData,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [{ english: 'kumpulanPGT', malay: 'Kumpulan PGT' }],
        url: '',
        id: 'salaryRecordTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Kenaikan Khas">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/gaji/pergerakan-gaji_2')}
        />
        <TextIconButton label="Draf" type="neutral" />
        <TextIconButton label="Hantar" />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-3 p-3">
        <XCard title="Tetapan Kenaikan Khas">
            <ContentHeader title="" borderClass="border-none">
                <TextIconButton label="Tetapkan" icon="check" form="formA" />
            </ContentHeader>
            <form
                class="flex w-full flex-row items-center justify-start gap-5"
                id="formA"
            >
                <CustomTextField
                    id="total"
                    type="number"
                    label="Jumlah Kenaikan Khas (RM)"
                    val=""
                />
                <CustomSelectField
                    id="month"
                    label="Bulan Berkuatkuasa"
                    options={monthNumberLookup}
                    val={1}
                />
            </form>
        </XCard>
        <XCard title="Senarai Kakitangan">
            <div class="h-fit w-full">
                <DataTable
                    title="Senarai Kakitangan"
                    bind:tableData={salaryRecordTable}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={salaryRecordTable.param.filter
                                .name}
                        />
                        <FilterTextField
                            label="No. Pekerja"
                            bind:inputValue={salaryRecordTable.param.filter
                                .employeeNumber}
                        />
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={salaryRecordTable.param.filter
                                .identityDocumentNumber}
                        />
                        <FilterSelectField
                            options={mesyuaratNameLookup}
                            label="Gred"
                            inputValue=""
                        />
                        <FilterSelectField
                            label="Jawatan"
                            options={kgtMonthLookup}
                            inputValue=""
                        />
                    </FilterWrapper>
                </DataTable>
            </div>
        </XCard>
    </div>
</section>
<Toaster />
