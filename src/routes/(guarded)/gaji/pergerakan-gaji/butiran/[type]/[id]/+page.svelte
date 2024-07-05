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
        monthNumberLookup,
        successBooleanOption,
    } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { Modal } from 'flowbite-svelte';

    export let data: PageData;

    let openModal: boolean = false;
    let selectedRow: any;

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
            checkbox: data.props.salaryType == "Kenaikan Gaji Tahunan" ? true : false,
            detail: false,
            edit: data.props.salaryType == "Kenaikan Gaji Tahunan" ? true : false,
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
                <TextIconButton label="Hantar" onClick={() => console.log('do something here')}/>
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-5">
                <div class="w-full">
                    <Alert color="blue">
                        <p>
                            <span class="font-medium">Arahan: </span>
                            Pilih kakitangan untuk dikecualikan dalam senarai kakitangan
                            yang terlibat atau tambah catatan untuk kakitangan.
                        </p>
                    </Alert>
                </div>
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai Kakitangan Yang Terlibat"
                        bind:tableData={salaryRecordTable}
                        bind:passData={selectedRow}
                        editActions={() => (openModal = true)}
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
                                label="Gred"
                                options={kgtMonthLookup}
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

        {#if data.props.salaryType == 'Kenaikan Gaji Tahunan'}
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    <TextIconButton label="Draf" type="neutral" />
                    <TextIconButton label="Hantar" form="meetingResultForm" />
                </StepperContentHeader>
                <StepperContentBody paddingClass="p-5">
                    <form id="meetingResultForm" class="flex w-full">
                        <div class="flex w-1/2 flex-col justify-start">
                            <div class="w-full pb-5">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Arahan:
                                        </span>
                                        Masukkan maklumat dan keputusan mesyuarat di ruangan yang disediakan.
                                    </p>
                                </Alert>
                            </div>
                            <CustomTextField
                                id="group"
                                disabled
                                isRequired={false}
                                label="Kumpulan"
                                val="Kumpulan Mesyuarat #12"
                            />
                            <CustomTextField
                                id="total"
                                disabled
                                isRequired={false}
                                label="Jumlah Kakitangan"
                                val="2241"
                            />
                            <CustomSelectField
                                id="meetingName"
                                options={mesyuaratNameLookup}
                                label="Nama dan Bilangan Mesyuarat"
                                val="Mesyuarat 1/12"
                            />
                            <CustomTextField
                                id="meetingDate"
                                type="date"
                                label="Tarikh Mesyuarat"
                                val=""
                            />
                            <CustomTextField
                                id="feedback"
                                isRequired={false}
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
                    </form>
                </StepperContentBody>
            </StepperContent>
        {:else}
            <StepperContent>
                <StepperContentHeader title="Maklumat Kumpulan" />
                <StepperContentBody paddingClass="p-5">
                    <div class="flex w-full">
                        <div class="flex w-1/2 flex-col justify-start">
                            <CustomTextField
                                id="salaryType"
                                isRequired={false}
                                label="Jenis Pergerakan Gaji"
                                disabled
                                val={data.props.salaryType}
                            />
                            <CustomSelectField
                                id="month"
                                isRequired={false}
                                options={monthNumberLookup}
                                disabled
                                label="Bulan Berkuatkuasa"
                                val={4}
                            />
                            <CustomTextField
                                id="totalPayment"
                                isRequired={false}
                                label="Jumlah (RM)"
                                disabled
                                type="number"
                                val={100}
                            />
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />

<Modal title="Sistem MyPSM" bind:open={openModal} dismissable={false} size="md">
    <form class="flex w-full flex-col justify-start gap-6" id="updateDetail">
        <Alert color="blue" class="flex flex-col gap-2.5">
            <p>
                <span class="font-medium">No. Pekerja: </span>
                {selectedRow?.noPekerja}
            </p>
            <p>
                <span class="font-medium">Nama Kakitangan: </span>
                {selectedRow?.nama}
            </p>
            <p>
                <span class="font-medium">No. Kad Pengenalan: </span>
                {selectedRow?.noIC}
            </p>
            <div class="flex h-fit w-full flex-col justify-center">
                <span class="font-medium">Catatan: </span>
                <CustomTextField
                    id="catatan"
                    isRequired={false}
                    label=""
                    val=""
                />
            </div>
        </Alert>
    </form>
    <div class="flex justify-center gap-3">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => (openModal = false)}
        />
        <TextIconButton label="Hantar" icon="check" form="updateDetail" />
    </div>
</Modal>
