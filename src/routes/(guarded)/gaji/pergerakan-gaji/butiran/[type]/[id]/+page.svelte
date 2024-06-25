<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import {
        kgtMonthLookup,
        mesyuaratNameLookup,
        successBooleanOption,
    } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import Alert from 'flowbite-svelte/Alert.svelte';
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
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Kemaskini Keputusan Kumpulan Mesyuarat #12">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => goto('/gaji/pergerakan-gaji_2')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan">
                <TextIconButton label="Draf" type="neutral" />
                <TextIconButton label="Hantar" />
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-5">
                <div class="w-full">
                    <Alert color="blue">
                        <p>
                            <span class="font-medium">Arahan: </span>
                            Pilih kakitangan untuk dikecualikan dalam senarai kakitangan
                            yang terlibat.
                        </p>
                    </Alert>
                </div>
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai Kakitangan Yang Terlibat"
                        bind:tableData={salaryRecordTable}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField label="Nama" inputValue="" />
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                inputValue=""
                            />
                            <FilterSelectField
                                options={mesyuaratNameLookup}
                                label="Program"
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
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
                <TextIconButton label="Draf" type="neutral" />
                <TextIconButton label="Hantar" />
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col justify-start">
                        <div class="w-full pb-5">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium">Arahan: </span>
                                    Masukkan keputusan mesyuarat.
                                </p>
                            </Alert>
                        </div>
                        <CustomTextField
                            id="group"
                            disabled
                            label="Kumpulan"
                            val=""
                        />
                        <CustomTextField
                            id="total"
                            disabled
                            label="Jumlah Kakitangan"
                            val=""
                        />
                        <CustomTextField
                            id="meetingName"
                            disabled
                            label="Nama dan Bilangan Mesyuarat"
                            val=""
                        />
                        <CustomTextField
                            id="meetingDate"
                            type="date"
                            label="Tarikh Mesyuarat"
                            val=""
                        />
                        <CustomTextField
                            id="group"
                            disabled
                            label="Tindakan/Ulasan"
                            val=""
                        />
                        <CustomSelectField
                            id="meetingResult"
                            label="Keputusan Mesyuarat"
                            options={successBooleanOption}
                            val={true}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
