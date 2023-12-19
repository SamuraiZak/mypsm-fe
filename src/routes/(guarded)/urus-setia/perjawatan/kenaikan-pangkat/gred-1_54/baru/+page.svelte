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

    let editMeetingResult = false;
    let editPlacementMeetingResult = false;
    let editPromotionInfo = false;
    let disabled = false;
    let selectedValue: any;
    let selectedMonth: any;

    function currencyFormatter(amount: number) {
        const formatter = new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        });
        return formatter.format(Number(amount)).toString();
    }
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

    let allEmployeeList: DtoCalonPemangkuan[] = [
        {
            idRekod: 1,
            idKakitangan: 1,
            nomborPekerja: '00001',
            namaKakitangan: 'Jon Bovi',
            nomborKP: '910821-13-5671',
            gredSemasa: 'E30',
            jawatanSemasa: 'Penolong Pegawai Perkhidmatan',
            // mesyuarat
            gredUntukDipangku: '',
            jawatanUntukDipangku: '',
            layakTemuduga: '',
            // temuduga
            tarikhTemuduga: '',
            masaTemuduga: '',
            pusatTemuduga: '',
            markahTemuduga: '',
            keputusanTemuduga: '',
            // semakan
            laporanTatatertib: '',
            laporanPrestasi: '',
            laporanSprm: '',
            perakuanKetuaJabatan: '',
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: '',

            tarikhKuatkuasaPemangkuan: '',
            tarikhCukupTempohPemangkuan: '',
            // mesyuarat penempatan
            penempatanBaru: '',
            tarikhLaporDiri: '',
            // permohonan penangguhan
            penempatanDipohon: '',
            tarikhLaporDiriDipohon: '',
            keputusanPenangguhanAtauPindaan: '',
            // keputusan akhir

            tarikhKuatKuasaPemangkuanAkhir: '',
            tarikhCukupTempohPemangkuanAkhir: '',
            penempatanBaruAkhir: '',
            tarikhLaporDiriAkhir: '',
        },
        {
            idRekod: 2,
            idKakitangan: 2,
            nomborPekerja: '00002',
            namaKakitangan: 'Teressa Teng',
            nomborKP: '930315-13-6188',
            gredSemasa: 'D41',
            jawatanSemasa: 'Penolong Pegawai Tadbir',
            // mesyuarat
            gredUntukDipangku: '',
            jawatanUntukDipangku: '',
            layakTemuduga: '',
            // temuduga
            tarikhTemuduga: '',
            masaTemuduga: '',
            pusatTemuduga: '',
            markahTemuduga: '',
            keputusanTemuduga: '',
            // semakan
            laporanTatatertib: '',
            laporanPrestasi: '',
            laporanSprm: '',
            perakuanKetuaJabatan: '',
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: '',

            tarikhKuatkuasaPemangkuan: '',
            tarikhCukupTempohPemangkuan: '',
            // mesyuarat penempatan
            penempatanBaru: '',
            tarikhLaporDiri: '',
            // permohonan penangguhan
            penempatanDipohon: '',
            tarikhLaporDiriDipohon: '',
            keputusanPenangguhanAtauPindaan: '',
            // keputusan akhir

            tarikhKuatKuasaPemangkuanAkhir: '',
            tarikhCukupTempohPemangkuanAkhir: '',
            penempatanBaruAkhir: '',
            tarikhLaporDiriAkhir: '',
        },
        {
            idRekod: 3,
            idKakitangan: 3,
            nomborPekerja: '00003',
            namaKakitangan: 'Xue Hua Piao',
            nomborKP: '851130-13-7747',
            gredSemasa: 'H12',
            jawatanSemasa: 'Penolong Pegawai Teknologi Maklumat',
            // mesyuarat
            gredUntukDipangku: '',
            jawatanUntukDipangku: '',
            layakTemuduga: '',
            // temuduga
            tarikhTemuduga: '',
            masaTemuduga: '',
            pusatTemuduga: '',
            markahTemuduga: '',
            keputusanTemuduga: '',
            // semakan
            laporanTatatertib: '',
            laporanPrestasi: '',
            laporanSprm: '',
            perakuanKetuaJabatan: '',
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: '',

            tarikhKuatkuasaPemangkuan: '',
            tarikhCukupTempohPemangkuan: '',
            // mesyuarat penempatan
            penempatanBaru: '',
            tarikhLaporDiri: '',
            // permohonan penangguhan
            penempatanDipohon: '',
            tarikhLaporDiriDipohon: '',
            keputusanPenangguhanAtauPindaan: '',
            // keputusan akhir

            tarikhKuatKuasaPemangkuanAkhir: '',
            tarikhCukupTempohPemangkuanAkhir: '',
            penempatanBaruAkhir: '',
            tarikhLaporDiriAkhir: '',
        },
    ];

    let selectedCandidatesList: DtoCalonPemangkuan[] = [];

    let selectTempCandidate: any = {};

    function saveSelected() {
        actingDetails.calonPemangkuan = selectedCandidatesList;
    }
    let radioValue: any = 'lulus';
    let radioValue2: any = 'sah';

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
    <!-- STEPPER 0 -->
    <StepperContent>
        <StepperContentHeader title="Senarai Kakitangan Untuk Kenaikan Pangkat">
            {#if editingCandidateList}
                <FormButton
                    type="cancel"
                    onClick={() => {
                        editingCandidateList = false;
                    }}
                />
                <FormButton
                    type="save"
                    onClick={() => {
                        saveSelected();
                        editingCandidateList = false;
                    }}
                />
            {:else}
                <FormButton
                    type="add"
                    onClick={() => {
                        editingCandidateList = true;
                    }}
                ></FormButton>
                <FormButton type="print"></FormButton>
                <FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 1;
                    }}
                ></FormButton>
            {/if}
        </StepperContentHeader>
        {#if editingCandidateList}
            <StepperContentBody paddingClass="p-0">
                <CustomTab>
                    <!-- Senarai semua kakitangan -->

                    <CustomTabContent title="Senarai Semua Kakitangan"
                        ><SectionHeader
                            title="Tekan butang '+' untuk masukkan ke dalam senarai kakitangan yang terpilih"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DynamicTable
                                bind:passData={selectTempCandidate}
                                bind:selectedItems={selectedCandidatesList}
                                tableItems={allEmployeeList}
                                selectAdd
                                withRowSelection
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaKakitangan',
                                    'nomborKP',
                                    'gredSemasa',
                                    'jawatanSemasa',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>

                    <!-- Senarai kakitangan yang dipilih -->

                    <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
                        <SectionHeader
                            title="Tekan butang '-' untuk keluarkan kakitangan daripada senarai yang terpilih"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DynamicTable
                                bind:passData={selectTempCandidate}
                                bind:selectedItems={selectedCandidatesList}
                                tableItems={selectedCandidatesList}
                                withRowSelection
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaKakitangan',
                                    'nomborKP',
                                    'gredSemasa',
                                    'jawatanSemasa',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            </StepperContentBody>
        {:else}
            <StepperContentBody>
                <SectionHeader
                    title="Sila cetak senarai kakitangan untuk dibawa ke mesyuarat"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={selectedCandidatesList}
                        columnKeys={[
                            'nomborPekerja',
                            'namaKakitangan',
                            'nomborKP',
                            'gredSemasa',
                            'jawatanSemasa',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        {/if}
    </StepperContent>
    <!-- STEPPER 1 -->
    <StepperContent>
        <StepperContentHeader title="Semak Status Perakuan">
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
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotionCandidate}
                    columnKeys={[
                        'employeeNumber',
                        'name',
                        'identityDocumentNumber',
                        'meetingResult',
                        'integritySecretariatCertification',
                        'districtOrStateDirectorCertification',
                    ]}
                ></DynamicTable>
            </div>
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 2 -->
    <StepperContent>
        <StepperContentHeader
            title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
        >
            {#if editMeetingResult == false}
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
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        editMeetingResult = false;
                        disabled = false;
                    }}
                ></FormButton><FormButton
                    type="done"
                    onClick={() => {
                        editMeetingResult = false;
                        disabled = false;
                    }}
                ></FormButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if editMeetingResult == false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidate}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editMeetingResult = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editMeetingResult = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'name',
                            'identityDocumentNumber',
                            'meetingResult',
                            'integritySecretariatCertification',
                            'districtOrStateDirectorCertification',
                        ]}
                    ></DynamicTable>
                </div>
            {:else}
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
                        {disabled}
                    ></TextField>
                    <DateSelector
                        handleDateChange
                        label="Tarikh Mesyuarat"
                        selectedDate="2023-08-23"
                        {disabled}
                    ></DateSelector>
                    <LongTextField
                        label="Tindakan / Ulasan Mesyuarat"
                        value="Layak untuk dinaikkan pangkat."
                        {disabled}
                    ></LongTextField>
                    <RadioSingle
                        {options}
                        legend="Keputusan Mesyuarat"
                        bind:userSelected={radioValue}
                        {disabled}
                    /><DateSelector
                        handleDateChange
                        label="Tarikh Pengesahan Kenaikan Pangkat (Jika LULUS)"
                        selectedDate="2023-08-23"
                        {disabled}
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
                        {disabled}
                    ></DateSelector>
                    <DateSelector
                        handleDateChange
                        label="Tarikh Kembali ke Gred Asal"
                        selectedDate="2023-08-23"
                        {disabled}
                    ></DateSelector>
                    <DropdownField
                        dropdownType="label-left-full"
                        label="Penempatan Baru"
                        bind:index={selectedValue}
                        id="dropdown"
                        options={placements}
                        {disabled}
                    />
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 3 -->
    <StepperContent>
        <StepperContentHeader
            title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
        >
            {#if editPlacementMeetingResult == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 2;
                    }}
                ></FormButton><FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 4;
                    }}
                ></FormButton>
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        editPlacementMeetingResult = false;
                        disabled = false;
                    }}
                ></FormButton><FormButton
                    type="done"
                    onClick={() => {
                        editPlacementMeetingResult = false;
                        disabled = false;
                    }}
                ></FormButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if editPlacementMeetingResult === false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidate}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editPlacementMeetingResult = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editPlacementMeetingResult = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'name',
                            'identityDocumentNumber',
                            'gradeId',
                            'positionId',
                            'currentPlacement',
                        ]}
                    ></DynamicTable>
                </div>
            {:else}
                <CustomTab>
                    <!-- Butiran Kenaikan Pangkat Kakitangan -->

                    <CustomTabContent
                        title="Butiran Kenaikan Pangkat Kakitangan"
                    >
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
                                {disabled}
                            ></TextField>
                            <SectionHeader title="Butiran Kenaikan Pangkat"
                            ></SectionHeader>
                            <TextField
                                label="No. Pekerja"
                                value="00001"
                                {disabled}
                            ></TextField>
                            <TextField
                                label="Nama Pkerja"
                                value="Mohd Irfan Bin Abu"
                                {disabled}
                            ></TextField>
                            <DateSelector
                                handleDateChange
                                label="Tarikh Kenaikan Pangkat"
                                selectedDate="2023-08-23"
                                {disabled}
                            ></DateSelector>
                            <DropdownField
                                dropdownType="label-left-full"
                                label="Tarikh Pergerakan Gaji Baru"
                                bind:index={selectedMonth}
                                id="dropdown"
                                options={months}
                                {disabled}
                            />
                            <TextField
                                label="Gaji Minimum - Gaji Maksimum E19"
                                value={currencyFormatter(1335) +
                                    ' - ' +
                                    currencyFormatter(4005)}
                                {disabled}
                            ></TextField>
                            <TextField
                                label="Kenaikan Gaji Tahunan E19"
                                value={currencyFormatter(100)}
                                {disabled}
                            ></TextField>
                            <TextField
                                label="Gaji Minimum - Gaji Maksimum E19"
                                value={currencyFormatter(2254) +
                                    ' - ' +
                                    currencyFormatter(4694)}
                                {disabled}
                            ></TextField>
                            <TextField
                                label="Kenaikan Gaji Tahunan E19"
                                value={currencyFormatter(115)}
                                {disabled}
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
                                {disabled}
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
                                {disabled}
                            ></TextField>
                            <SectionHeader title="Kemaskini Rekod Kenaikan Gaji"
                            ></SectionHeader>
                            <DateSelector
                                handleDateChange
                                label="Tarikh Kenaikan Pangkat"
                                selectedDate="2022-04-01"
                                {disabled}
                            ></DateSelector>
                            <TextField
                                label="Gaji Sekarang"
                                value={currencyFormatter(2269)}
                                {disabled}
                            ></TextField>
                            <TextField
                                label="Gaji Baru"
                                value={currencyFormatter(2369)}
                                {disabled}
                            ></TextField>
                            <LongTextField
                                rows={2}
                                label="Catatan"
                                value="TPG Gred Jawatan Baru Diberi Pergerakan Gaji Biasa Mengikut Keputusan PPSM Selaras Dengan Perlaksanaan Penambahbaikan Gaji Baru SSM. (Pergerakan Gaji Tahunan RM 115.00 Bagi Gred E22)"
                                {disabled}
                            ></LongTextField>
                            <SectionHeader title="Senarai Rekod Kenaikan Gaji"
                            ></SectionHeader>
                            <DynamicTable
                                tableItems={mockSalaryIncrementRecord.filter(
                                    (record) => record.id != '3',
                                )}
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
            {/if}
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 4 -->
    <StepperContent>
        <StepperContentHeader title="Kemaskini Kenaikan Pangkat Kakitangan">
            {#if editPromotionInfo == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 3;
                    }}
                />
                <FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 5;
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
            {#if editPromotionInfo === false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidateDetail}
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
                </div>
            {:else}
                <DateSelector
                    label="Tarikh Pengesahan"
                    handleDateChange
                    selectedDate="2023-08-23"
                    {disabled}
                ></DateSelector>
                <LongTextField
                    label="Ulasan"
                    value="Borang lengkap dan kakitangan setuju."
                    {disabled}
                ></LongTextField>
                <RadioSingle
                    options={options2}
                    legend="Pengesahan"
                    bind:userSelected={radioValue2}
                    {disabled}
                />
                <TextField label="Nama Pelulus" value="Ramli bin Mat" {disabled}
                ></TextField>
                <TextField
                    label="Nama Penyokong"
                    value="Mohd. Ikhwan Bin Ali"
                    {disabled}
                ></TextField>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 5 -->
    <StepperContent>
        <StepperContentHeader
            title="Semak Keputusan Kenaikan Pangkat Kakitangan (Akhir)"
        >
            {#if editPromotionInfo == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 4;
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
                        editPromotionInfo = false;
                        disabled = false;
                    }}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if editPromotionInfo == false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidateDetail.filter(
                            (record) =>
                                record.secretariatConfirmation !==
                                'Sedang Diproses',
                        )}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            editPromotionInfo = true;
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
                    ></DynamicTable>
                </div>
            {:else}
                <DateSelector
                    label="Tarikh Pengesahan"
                    handleDateChange
                    selectedDate="2023-08-23"
                    {disabled}
                ></DateSelector>
                <LongTextField
                    label="Ulasan"
                    value="Borang lengkap dan kakitangan setuju."
                    {disabled}
                ></LongTextField>
                <TextField label="Pengesahan" value="SAH" {disabled}
                ></TextField>
                <TextField label="Nama Pelulus" value="Ramli bin Mat" {disabled}
                ></TextField>
                <TextField
                    label="Nama Penyokong"
                    value="Mohd. Ikhwan Bin Ali"
                    {disabled}
                ></TextField>
            {/if}
        </StepperContentBody>
    </StepperContent>
</Stepper>
