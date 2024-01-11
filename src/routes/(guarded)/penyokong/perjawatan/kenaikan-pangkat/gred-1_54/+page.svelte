<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import type {
        DtoCalonPemangkuan,
        IntActingApplication,
    } from '$lib/interfaces/database/actingApplication';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import {
        mockPromotionCandidate,
        mockPromotionCandidateDetail,
    } from '$lib/mocks/kenaikan-pangkat/mockPromotion';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { placements } from '$lib/mocks/placements/mockPlacements';
    import { onMount } from 'svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockSalaryIncrementRecord } from '$lib/mocks/gaji/rekodKenaikanGaji/mockSalaryIncrementRecord';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';

    let editMeetingResult = false;
    let editPlacementMeetingResult = false;
    let editPromotionInfo = false;
    let detailsPromotionInfo = false;
    let disabled = false;
    let selectedValue: any;
    let selectedMonth: any;

    onMount(() => {
        selectedValue = placements[3].value;
        selectedMonth = months[6].value;
    });

    let stepperIndex = 0;

    let actingDetails: IntActingApplication = {
        idRekod: 1,
        jenisPemangkuan: 'Gred 1-54',
        tarikhRekod: Date.now.toString(),
        jumlahCalon: 0,
        status: 'Sedang Diproses',
        calonPemangkuan: [],
    };

    // Step 1 script starts here
    let editingCandidateList = false;

    let selectedCandidatesList: DtoCalonPemangkuan[] = [];

    let selectTempCandidate: any = {};

    function saveSelected() {
        actingDetails.calonPemangkuan = selectedCandidatesList;
    }
    let radioValue: any = 'lulus';
    let radioValue2: any = 'sah';
    let radioValue3: any = 'sokong';

    const options: RadioOption[] = [
        {
            value: 'lulus',
            label: 'LULUS',
        },
        {
            value: 'tidak lulus',
            label: 'TIDAK LULUS',
        },
    ];
    const options2: RadioOption[] = [
        {
            value: 'sah',
            label: 'SAH',
        },
        {
            value: 'tidak sah',
            label: 'TIDAK SAH',
        },
    ];
    const options3: RadioOption[] = [
        {
            value: 'sokong',
            label: 'SOKONG',
        },
        {
            value: 'tidak sokong',
            label: 'TIDAK SOKONG',
        },
    ];

    // Step 1 script ends here
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kenaikan Pangkat Gred 1-54"
        description="Hal-hal berkaitan Kenaikan Pangkat untuk Gred 1-54"
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={stepperIndex}>
    <!--  Stepper 0 -->
    <StepperContent>
        <StepperContentHeader title="Semak Status Perakuan">
            <FormButton
                type="next"
                onClick={() => {
                    stepperIndex = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                <p class="h-[35px] text-sm text-system-primary">
                    Ulasan Keputusan daripada Urus Setia Integriti
                </p>
                <TextField label="Nama" value="Johari Bin Ahmad" disabled
                ></TextField>
                <LongTextField
                    label="Tindakan / Ulasan"
                    value="Setuju untuk perakuan."
                    disabled
                ></LongTextField>
                <TextField label="Keputusan" value="DIPERAKU" disabled
                ></TextField>
                <p class="h-[35px] text-sm text-system-primary">
                    Ulasan Keputusan daripada Pengarah Bahagian / Negeri
                </p>
                <TextField label="Nama" value="Mohd Sahwan Bin Murni" disabled
                ></TextField>
                <LongTextField
                    label="Tindakan / Ulasan"
                    value="Diperaku."
                    disabled
                ></LongTextField>
                <TextField label="Keputusan" value="DIPERAKU" disabled
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <!--  Stepper 1 -->
    <StepperContent>
        <StepperContentHeader
            title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
        >
            <FormButton
                type="back"
                onClick={() => {
                    stepperIndex = 0;
                }}
            ></FormButton><FormButton
                type="next"
                onClick={() => {
                    stepperIndex = 2;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex h-[340px] max-h-full w-full flex-col gap-2.5 border-b border-bdr-primary"
            >
                <p class="h-[35px] text-sm italic text-system-accent">
                    Sekiranya kakitangan tidak lulus mesyuarat, proses akan
                    berakhir untuk kakitangan tersebut
                </p>
                <TextField
                    label="Nama dan Bilangan Mesyuarat"
                    value="1/02"
                    disabled
                ></TextField>
                <DateSelector
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    selectedDate="2023-08-23"
                    disabled
                ></DateSelector>
                <LongTextField
                    label="Tindakan / Ulasan Mesyuarat"
                    value="Layak untuk dinaikkan pangkat."
                    disabled
                ></LongTextField>
                <RadioSingle
                    {options}
                    legend="Keputusan Mesyuarat"
                    bind:userSelected={radioValue}
                    disabled
                /><DateSelector
                    handleDateChange
                    label="Tarikh Pengesahan Kenaikan Pangkat (Jika LULUS)"
                    selectedDate="2023-08-23"
                    disabled
                ></DateSelector>
            </div>
            <div
                class="flex h-[200px] max-h-full w-full flex-col gap-2.5 border-b border-bdr-primary"
            >
                <p class="h-[35px] text-lg text-txt-primary">
                    Penamatan Pemangkuan (Jika Mesyuarat TIDAK LULUS)
                </p>

                <DateSelector
                    handleDateChange
                    label="Tarikh Tamat Pemangkuan"
                    selectedDate="2023-08-23"
                    disabled
                ></DateSelector>
                <DateSelector
                    handleDateChange
                    label="Tarikh Kembali ke Gred Asal"
                    selectedDate="2023-08-23"
                    disabled
                ></DateSelector>
                <DropdownField
                    dropdownType="label-left-full"
                    label="Penempatan Baru"
                    bind:index={selectedValue}
                    id="dropdown"
                    options={placements}
                    disabled
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    <!-- Stepper 2 -->
    <StepperContent>
        <StepperContentHeader
            title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
        >
            <FormButton
                type="back"
                onClick={() => {
                    stepperIndex = 1;
                }}
            ></FormButton><FormButton
                type="next"
                onClick={() => {
                    stepperIndex = 3;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <CustomTab>
                <!-- Butiran Kenaikan Pangkat Kakitangan -->

                <CustomTabContent title="Butiran Kenaikan Pangkat Kakitangan">
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    >
                        <TextField
                            labelBlack={false}
                            labelType="read-only-list-value"
                            label="Borang-borang berkaitan yang akan dijana:"
                            valueList={[
                                '1. Surat Tawaran Kenaikan Pangkat',
                                '2. Borang Lapor Diri',
                                '3. Jadual Pelarasan Gaji',
                            ]}
                            disabled
                        ></TextField>
                        <SectionHeader title="Butiran Kenaikan Pangkat"
                        ></SectionHeader>
                        <TextField label="No. Pekerja" value="00001" disabled
                        ></TextField>
                        <TextField
                            label="Nama Pkerja"
                            value="Mohd Irfan Bin Abu"
                            disabled
                        ></TextField>
                        <DateSelector
                            handleDateChange
                            label="Tarikh Kenaikan Pangkat"
                            selectedDate="2023-08-23"
                            disabled
                        ></DateSelector>
                        <DropdownField
                            dropdownType="label-left-full"
                            label="Tarikh Pergerakan Gaji Baru"
                            bind:index={selectedMonth}
                            id="dropdown"
                            options={months}
                            disabled
                        />
                        <TextField
                            label="Gaji Minimum - Gaji Maksimum E19"
                            value={CurrencyHelper.formatCurrency(1335) +
                                ' - ' +
                                CurrencyHelper.formatCurrency(4005)}
                            disabled
                        ></TextField>
                        <TextField
                            label="Kenaikan Gaji Tahunan E19"
                            value={CurrencyHelper.formatCurrency(100)}
                            disabled
                        ></TextField>
                        <TextField
                            label="Gaji Minimum - Gaji Maksimum E19"
                            value={CurrencyHelper.formatCurrency(2254) +
                                ' - ' +
                                CurrencyHelper.formatCurrency(4694)}
                            disabled
                        ></TextField>
                        <TextField
                            label="Kenaikan Gaji Tahunan E19"
                            value={CurrencyHelper.formatCurrency(115)}
                            disabled
                        ></TextField>
                        <TextField
                            label="Penempatan Sekarang"
                            value="Pejabat Ketua Pengarah"
                            disabled={true}
                        ></TextField>
                        <DropdownField
                            dropdownType="label-left-full"
                            label="Penempatan Baru"
                            bind:index={selectedValue}
                            id="dropdown"
                            options={placements}
                            disabled
                        />
                    </div>
                </CustomTabContent>

                <!-- Jadual Pelarasan Gaji Kakitangan -->

                <CustomTabContent title="Jadual Pelarasan Gaji Kakitangan">
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    >
                        <TextField
                            labelBlack={false}
                            labelType="read-only-list-value"
                            label="Borang-borang berkaitan yang akan dijana:"
                            valueList={[
                                '1. Surat Tawaran Kenaikan Pangkat',
                                '2. Borang Lapor Diri',
                                '3. Jadual Pelarasan Gaji',
                            ]}
                            disabled
                        ></TextField>
                        <SectionHeader title="Senarai Rekod Kenaikan Gaji"
                        ></SectionHeader>
                        <DynamicTable
                            tableItems={mockSalaryIncrementRecord}
                            columnKeys={[
                                'enforcedDate',
                                'currentSalary',
                                'newSalary',
                                'remarks',
                            ]}
                        ></DynamicTable>
                    </div>
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <!-- Stepper 3 -->
    <StepperContent>
        <StepperContentHeader title="Kemaskini Kenaikan Pangkat Kakitangan">
            {#if editPromotionInfo == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 2;
                    }}
                />
                <FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 4;
                    }}
                />
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        editPromotionInfo = false;
                        disabled = false;
                    }}
                ></FormButton><FormButton
                    type="done"
                    onClick={() => {
                        editPromotionInfo = false;
                        disabled = false;
                    }}
                ></FormButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                {#if editPromotionInfo === false}
                    <DynamicTable
                        tableItems={mockPromotionCandidateDetail.filter(
                            (record) =>
                                record.secretariatConfirmation !=
                                    'Sedang Diproses' &&
                                record.approverApproval == 'Sedang Diproses',
                        )}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editPromotionInfo = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editPromotionInfo = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'employeeName',
                            'identityDocumentNumber',
                            'secretariatConfirmation',
                            'supporterSupport',
                            'approverApproval',
                        ]}
                    ></DynamicTable>
                {:else}
                    <p class="h-[35px] text-sm text-system-primary">
                        Penyokong
                    </p>
                    <TextField label="Nama" value="Mohd. Ikwan Bin Ali" disabled
                    ></TextField>
                    <RadioSingle
                        options={options3}
                        legend="Keputusan"
                        bind:userSelected={radioValue3}
                        {disabled}
                    />
                    <LongTextField
                        label="Ulasan / Tindakan"
                        value="Disokong untuk dinaikan pangkat."
                        {disabled}
                    ></LongTextField>
                    <p class="h-[35px] text-sm text-system-primary">
                        Urus Setia Integriti
                    </p>

                    <LongTextField
                        label="Ulasan"
                        value="Borang lengkap dan kakitangan setuju."
                        disabled
                    ></LongTextField>
                    <TextField label="Pengesahan" value="SAH" disabled
                    ></TextField>

                    <p class="h-[35px] text-sm text-system-primary">Pelulus</p>
                    <p class="h-[35px] text-sm italic text-system-accent">
                        * Menunggu Keputusan dari Penyokong
                    </p>
                    <TextField label="Nama" value="Ramli bin Mat" disabled
                    ></TextField>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 4 -->
    <StepperContent>
        <StepperContentHeader
            title="Semak Keputusan Kenaikan Pangkat Kakitangan (Akhir)"
        >
            {#if detailsPromotionInfo == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 3;
                    }}
                /><FormButton
                    type="done"
                    onClick={() => {
                        window.history.back();
                    }}
                />
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        detailsPromotionInfo = false;
                        disabled = false;
                    }}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                {#if detailsPromotionInfo == false}
                    <DynamicTable
                        tableItems={mockPromotionCandidateDetail.filter(
                            (record) =>
                                record.secretariatConfirmation !==
                                'Sedang Diproses',
                        )}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            detailsPromotionInfo = true;
                            disabled = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'employeeName',
                            'identityDocumentNumber',
                            'secretariatConfirmation',
                            'supporterSupport',
                            'approverApproval',
                        ]}
                    ></DynamicTable>{:else}
                    <p class="h-[35px] text-sm text-system-primary">
                        Urus Setia Integriti
                    </p>

                    <LongTextField
                        label="Ulasan"
                        value="Borang lengkap dan kakitangan setuju."
                        disabled
                    ></LongTextField>
                    <TextField label="Pengesahan" value="SAH" disabled
                    ></TextField>

                    <p class="h-[35px] text-sm text-system-primary">Pelulus</p>
                    <p class="h-[35px] text-sm italic text-system-accent">
                        * Menunggu Keputusan dari Penyokong
                    </p>
                    <TextField label="Nama" value="Ramli bin Mat" disabled
                    ></TextField>
                    <p class="h-[35px] text-sm text-system-primary">
                        Penyokong
                    </p>
                    <TextField label="Keputusan" value="SOKONG" disabled
                    ></TextField>
                    <LongTextField
                        label="Ulasan / Tindakan"
                        value="Disokong untuk dinaikan pangkat."
                        disabled
                    ></LongTextField>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
