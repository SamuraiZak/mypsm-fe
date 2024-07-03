<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import XCard from '$lib/components/card/XCard.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import {
        kgtMonthLookup,
        mesyuaratNameLookup,
    } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import { Toaster } from 'svelte-french-toast';

    import { goto } from '$app/navigation';

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
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: true,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Kenaikan Gaji Tahunan">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/gaji/pergerakan-gaji_2')}
        />
        <TextIconButton label="Draf" type="neutral" />
        <TextIconButton
            label="Hantar"
            onClick={() =>
                goto('/gaji/pergerakan-gaji/butiran/kenaikan gaji tahunan/1')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-3 p-3">
        <XCard
            title="Bahagian 1: Tetapan Kenaikan Gaji Tahunan (KGT) Mengikut Bulan"
        >
            <form
                class="flex w-full flex-row items-center justify-start gap-2.5"
                id="formA"
            >
                <CustomSelectField
                    label="Nama dan Bilangan Mesyuarat"
                    id="meetingName"
                    options={mesyuaratNameLookup}
                    val=""
                />
                <CustomTextField
                    label="Tarikh Mesyuarat"
                    id="meetingDate"
                    type="date"
                    val=""
                />
                <CustomSelectField
                    label="Bulan Pergerakan Gaji"
                    id="salaryMovementMonth"
                    options={kgtMonthLookup}
                    val=""
                />
                <TextIconButton label="Tetapkan" icon="check" form="formA" />
            </form>
        </XCard>
        <XCard
            title="Bahagian 2: Tetapan Pengecualian Kakitangan Mengikut Bulan KGT"
        >
            <div class="h-fit w-full">
                <DataTable
                    title="Senarai Kakitangan"
                    bind:tableData={salaryRecordTable}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField label="Nama" inputValue="" />
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            inputValue=""
                        />
                        <FilterTextField label="No. Pekerja" inputValue="" />
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
                        <FilterSelectField
                            options={mesyuaratNameLookup}
                            label="Status"
                            inputValue=""
                        />
                    </FilterWrapper>
                </DataTable>
            </div>
        </XCard>
    </div>
</section>
<Toaster />
