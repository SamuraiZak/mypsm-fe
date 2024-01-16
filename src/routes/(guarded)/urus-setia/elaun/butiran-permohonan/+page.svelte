<script lang="ts">
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormTable from '$lib/components/form-table/FormTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { areaTypes } from '$lib/mocks/elaun/areas';
    import { mockAllEmployeeAllowances } from '$lib/mocks/elaun/mockAllEmployeeAllowances';
    import { mockEmployeeAllowanceDocList } from '$lib/mocks/elaun/mockEmployeeAllowanceDocList';
    import { superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import {
        _stepperSupporterApprover,
        _submitFormStepperSupporterApprover,
    } from './+page';
    import {
        _stepperAllowanceApplicationValidation,
        _submitFormStepperAllowanceApplicationValidation,
    } from './+page';

    export let data: PageData;

    let currentDataId = 1;
    let disabled = true;
    let activeStepper = 0;
    let labelBlack = false;
    let selectedAreaType: string = 'Kawasan 1';
    let numberOfDays: number = 25;
    let reasonVal: string = 'Boleh diteruskan';
    let currRecord = mockAllEmployeeAllowances.filter(
        (rec) => rec.id == currentDataId, //to be repalced with $selectedRecordId
    )[0];
    let currentEmployee = mockEmployees.filter((rec) => rec.id == 1)[0];
    console.log(currRecord);
    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
    })!;
    let currentEmployeeBirthState = mockLookupStates.find((state) => {
        return state.id === currentEmployee.birthStateId;
    })!;
    let currentEmployeeUploadedDocuments = mockEmployeeAllowanceDocList.filter(
        (document) => {
            return document.id === 1;
        },
    )!;

    let isExPoliceSoldier = currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Ya',
        },
        {
            value: 'false',
            label: 'Tidak',
        },
    ];

    let pengesahanVal: any = 'true';
    const pengesahan: RadioOption[] = [
        {
            value: 'true',
            label: 'SAH',
        },
        {
            value: 'false',
            label: 'TIDAK SAH',
        },
    ];
    let famInfo = {
        name: 'Nur Arisha Binti Mohd Irfan',
        age: 6,
        relationship: 'Anak',
    };

    // let data: any[] = [{ ...famInfo }];

    //Supporter Approver
    const {
        form: supporterApproverForm,
        errors: supporterApproverErrors,
        enhance: supporterApproverEnhance,
    } = superForm(data.stepperSupporterApprover, {
        SPA: true,
        validators: _stepperSupporterApprover,
        onSubmit() {
            _submitFormStepperSupporterApprover($supporterApproverForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: allowanceApplicationValidationForm,
        errors: allowanceApplicationValidationErrors,
        enhance: allowanceApplicationValidationEnhance,
    } = superForm(data.stepperAllowanceApplicationValidation, {
        SPA: true,
        validators: _stepperAllowanceApplicationValidation,
        onSubmit() {
            _submitFormStepperAllowanceApplicationValidation(
                $allowanceApplicationValidationForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Elaun {currRecord.employeeNumber}"
        description="Maklumat Permohonan Elaun {currRecord.employeeNumber}"
        ><FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>

<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan">
            <FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <TextField
                {disabled}
                label={'Nama Penuh'}
                value={currentEmployee.name}
            ></TextField>
            <TextField
                {disabled}
                label={'Nama Lain'}
                value={currentEmployee.alternativeName}
            ></TextField>
            <TextField
                {disabled}
                label={'No. K/P'}
                value={currentEmployee.identityDocumentNumber}
            ></TextField>
            <TextField
                {disabled}
                label={'Warna K/P'}
                value={isBlueOrRedIC(currentEmployee.isMalaysian)}
            ></TextField>
            <TextField
                {disabled}
                label={'No. Pekerja'}
                value={currentEmployee.employeeNumber}
            ></TextField>
            <DateSelector
                handleDateChange
                {disabled}
                label={'Tarikh Lahir'}
                selectedDate={dateConvertor(currentEmployee.birthDate)}
            ></DateSelector>
            <TextField
                {disabled}
                label={'Tempat Lahir'}
                value={currentEmployeeBirthState.name}
            ></TextField>
            <TextField
                {disabled}
                label={'Warganegara'}
                value={currentEmployee.isMalaysian ? 'Malaysia' : 'Bukan'}
            ></TextField>
            <TextField
                {disabled}
                label={'Bangsa'}
                value={currentEmployeeRace.name}
            ></TextField>
            <TextField
                {disabled}
                label={'Agama'}
                value={currentEmployeeReligion.name}
            ></TextField>
            <TextField
                {disabled}
                label={'Jantina'}
                value={currentEmployee.gender}
            ></TextField>
            <TextField
                {disabled}
                label={'Status'}
                value={currentEmployee.marital}
            ></TextField>
            <LongTextField
                {disabled}
                label={'Alamat Rumah'}
                value={currentEmployee.homeAddress}
            ></LongTextField>
            <LongTextField
                {disabled}
                label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                value={currentEmployee.mailAddress}
            ></LongTextField>
            <TextField
                {disabled}
                label={'No. Telefon rumah'}
                value={currentEmployee.homeNumber}
            ></TextField>
            <TextField
                {disabled}
                label={'No. Telefon Bimbit'}
                value={currentEmployee.mobileNumber}
            ></TextField>
            <TextField {disabled} id="perumahan" label={'Perumahan'} value={'-'}
            ></TextField>
            <TextField
                {disabled}
                id="pinjPerumahan"
                label={'Pinjaman Perumahan'}
                value={'-'}
            ></TextField>
            <TextField
                {disabled}
                id="pinjKenderaan"
                label={'Pinjaman Kenderaan'}
                value={'-'}
            ></TextField>
            <RadioSingle
                {disabled}
                {options}
                legend={'Bekas Polis / Tentera'}
                bind:userSelected={isExPoliceSoldier}
            ></RadioSingle>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Permohonan Elaun"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton>
        </StepperContentHeader>
        <!-- VARIES ON TYPE OF ALLOWANCE-->
        <StepperContentBody>
            {#if currRecord.allowanceType == 'Bantuan Pakaian Istiadat'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <LongTextField
                        label="Tujuan Permohonan"
                        {disabled}
                        {labelBlack}
                        value={'Menghadiri ucapan rasmi.'}
                    ></LongTextField>
                    <TextField
                        label="Sendiri"
                        {disabled}
                        {labelBlack}
                        value={450}
                    ></TextField>
                    <TextField
                        label="Pasangan"
                        {disabled}
                        {labelBlack}
                        value={450}
                    ></TextField>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Bantuan Pakaian Panas'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <LongTextField
                        label="Tujuan Permohonan"
                        {disabled}
                        {labelBlack}
                        value={'Badan sejuk.'}
                    ></LongTextField>
                    <TextField
                        label="Jumlah Tuntutan"
                        {disabled}
                        {labelBlack}
                        value={450}
                    ></TextField>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Tambang Mengunjungi Wilayah Asal'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Memohon Untuk'}
                        value={'Diri Sendiri dan Keluarga'}
                    ></TextField>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Wilayah Asal'}
                        value={'Seremban'}
                    ></TextField>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Keluarga"></SectionHeader>
                    <FormTable sampleData={famInfo} bind:data {disabled}
                    ></FormTable>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Bantuan Mengurus Jenazah'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <DateSelector
                        handleDateChange
                        selectedDate={'2022-05-16'}
                        {disabled}
                        {labelBlack}
                        label={'Tarikh Meninggal'}
                    ></DateSelector>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Masa Meninggal'}
                        value={'12:22:33'}
                    ></TextField>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Waris"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Nama'}
                        value={'Mohd. Musa Bin Ismail'}
                    ></TextField>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'No. K/P'}
                        value={'890401-11-1234'}
                    ></TextField>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Hubungan'}
                        value={'Bapa'}
                    ></TextField>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Tabung Kebajikan Kakitangan'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Sumbangan'}
                        value={'Rawatan Malam di Hospital'}
                    ></TextField>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Perpindahan Rumah'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <DateSelector
                        handleDateChange
                        selectedDate={'2022-05-16'}
                        {disabled}
                        {labelBlack}
                        label={'Tarikh Pindah Rumah'}
                    ></DateSelector>
                    <LongTextField
                        {disabled}
                        {labelBlack}
                        label="Alamat Rumah Lama"
                        value={'No. 12, Taman 3, Jalan 4, Batu 5, 55566'}
                    />
                    <LongTextField
                        {disabled}
                        {labelBlack}
                        label="Alamat Rumah Baru"
                        value={'No. 12, Taman 3, Jalan 4, Batu 5, 55566'}
                    />
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Pembayaran Balik Passport'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <DateSelector
                        handleDateChange
                        selectedDate={'2022-05-16'}
                        {disabled}
                        {labelBlack}
                        label={'Tarikh Pembaharuan'}
                    ></DateSelector>
                    <LongTextField
                        {disabled}
                        {labelBlack}
                        label="Tujuan"
                        value={'Untuk melangsaikan bayaran balik passpot'}
                    />
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Insurans Kesihatan'}
                <!-- Maklumat Elaun -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {labelBlack}
                        handleDateChange
                        label="Tarikh Perjalanan"
                        selectedDate={'2023-12-22'}
                    ></DateSelector>
                    <DateSelector
                        {disabled}
                        {labelBlack}
                        handleDateChange
                        label="Sehingga Tarikh"
                        selectedDate={'2023-12-22'}
                    ></DateSelector>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label="Bilangan Hari"
                        type="number"
                        bind:value={numberOfDays}
                    />
                    <LongTextField
                        {disabled}
                        {labelBlack}
                        label="Tujuan"
                        bind:value={reasonVal}
                    ></LongTextField>

                    <DropdownSelect
                        {disabled}
                        {labelBlack}
                        dropdownType="label-left-full"
                        label="Kawasan ( Kumpulan negara 1 atau 2 atau 3)"
                        options={areaTypes}
                        bind:value={selectedAreaType}
                    ></DropdownSelect>

                    <!-- nested read-only text -->
                    <div
                        class="ml-2.5 mt-5 font-sans text-sm italic text-txt-tertiary"
                    >
                        Nota:
                        <ul class="list-inside list-decimal">
                            <li>
                                Kawasan 1:
                                <ul class="list-inside list-disc pl-4">
                                    <li>
                                        Singapura, Brunei, Thailand, Indonesia,
                                        Filipina, Myanmar, Nepal, Kemboja, Laos,
                                        China, India, Jepun, Korea Selatan,
                                        Korea Utara, Pakistan, Sri Lanka,
                                        Taiwan, Vietnam, Hong Kong, Macau dan di
                                        dalam Malaysia
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Kawasan 2:
                                <ul class="list-inside list-disc pl-4">
                                    <li>
                                        Seluruh dunia kecuali USA/Kanada dan
                                        negara-negara di Kawasan 1.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Kawasan 3:
                                <ul class="list-inside list-disc pl-4">
                                    <li>USA/Kanada</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {:else if currRecord.allowanceType == 'Pengangkutan Barang - Barang Melalui Jalan Laut'}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Elaun"></SectionHeader>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label={'Jenis Elaun'}
                        value={currRecord.allowanceType}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {labelBlack}
                        handleDateChange
                        label="Tarikh Perjalanan"
                        selectedDate={'2023-12-21'}
                    ></DateSelector>
                    <DateSelector
                        {disabled}
                        {labelBlack}
                        handleDateChange
                        label="Sehingga Tarikh"
                        selectedDate={'2023-12-30'}
                    ></DateSelector>
                    <TextField
                        {disabled}
                        {labelBlack}
                        label="Bilangan Hari"
                        type="number"
                        bind:value={numberOfDays}
                    />
                    <TextField
                        {disabled}
                        {labelBlack}
                        label="Tempat Permulaan"
                        type="text"
                        value={'Malaysia'}
                    />
                    <TextField
                        {disabled}
                        {labelBlack}
                        label="Tempat Penamatan"
                        type="text"
                        value={'Singapura'}
                    />
                    <TextField
                        {disabled}
                        {labelBlack}
                        label="Anggaran Jarak (KM)"
                        type="text"
                        value={'100'}
                    />
                    <LongTextField
                        {disabled}
                        {labelBlack}
                        label="Tujuan"
                        value={'Tujuan lawatan ke tempak pengguna'}
                    ></LongTextField>
                </div>
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    ></SectionHeader>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokongan Permohonan Elaun"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm font-bold text-system-primary"
                >
                    Pengarah Bahagian / Negeri
                </p>
                <TextField
                    {disabled}
                    {labelBlack}
                    label={'Nama'}
                    value={'Salahudin Bin Ahmad'}
                ></TextField>
                <LongTextField
                    {disabled}
                    {labelBlack}
                    label={'Tindakan / Ulasan'}
                    value={'Layak Disokong.'}
                ></LongTextField>
                <TextField
                    {disabled}
                    {labelBlack}
                    label={'Keputusan'}
                    value={'SOKONG'}
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Elaun"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <TextIconButton
                primary
                label="Simpan"
                form="FormStepperAllowanceApplicationValidation"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <form
                    id="FormStepperAllowanceApplicationValidation"
                    class="flex w-full flex-col gap-2"
                    use:allowanceApplicationValidationEnhance
                    method="POST"
                >
                    <SectionHeader title="Ulasan Penyemakan daripada Urus Setia"
                    ></SectionHeader>
                    <LongTextField
                        hasError={$allowanceApplicationValidationErrors.actionRemark
                            ? true
                            : false}
                        name="actionRemark"
                        label="Tindakan / Ulasan"
                        bind:value={$allowanceApplicationValidationForm.actionRemark}
                    />
                    {#if $allowanceApplicationValidationErrors.actionRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$allowanceApplicationValidationErrors
                                .actionRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        options={pengesahan}
                        hasError={$allowanceApplicationValidationErrors.resultOption
                            ? true
                            : false}
                        name="resultOption"
                        bind:userSelected={$allowanceApplicationValidationForm.resultOption}
                    ></RadioSingle>
                    {#if $allowanceApplicationValidationErrors.resultOption}
                        <span
                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                            >{$allowanceApplicationValidationErrors
                                .resultOption[0]}</span
                        >
                    {/if}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <TextIconButton
                primary
                label="Simpan"
                form="FormStepperSupporterApprover"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <form
                    id="FormStepperSupporterApprover"
                    class="flex w-full flex-col gap-2"
                    use:supporterApproverEnhance
                    method="POST"
                >
                    <SectionHeader title="Nama Penyokong dan Pelulus (Jika Sah)"
                    ></SectionHeader>
                    <TextField
                        hasError={$supporterApproverErrors.supporterName
                            ? true
                            : false}
                        name="supporterName"
                        label={'Nama Penyokong'}
                        type="text"
                        bind:value={$supporterApproverForm.supporterName}
                    ></TextField>

                    {#if $supporterApproverErrors.supporterName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterApproverErrors.supporterName[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$supporterApproverErrors.approverName
                            ? true
                            : false}
                        name="approverName"
                        label={'Nama Pelulus'}
                        type="text"
                        bind:value={$supporterApproverForm.approverName}
                    ></TextField>

                    {#if $supporterApproverErrors.approverName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterApproverErrors.approverName[0]}</span
                        >
                    {/if}
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Keputusan Permohonan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton><FormButton type="done"
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm font-bold text-system-primary"
                >
                    Penyokong
                </p>
                <TextField
                    {disabled}
                    {labelBlack}
                    label={'Nama'}
                    value={'Mohd. Musa Bin Mat'}
                ></TextField>
                <TextField
                    {disabled}
                    {labelBlack}
                    label={'Keputusan'}
                    value={'DALAM PROSES'}
                ></TextField>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm font-bold text-system-primary"
                >
                    Pelulus
                </p>
                <TextField
                    {disabled}
                    {labelBlack}
                    label={'Nama'}
                    value={'Ramdan Bin Ismail'}
                ></TextField>
                <TextField
                    {disabled}
                    {labelBlack}
                    label={'Keputusan'}
                    value={'DALAM PROSES'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
