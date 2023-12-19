<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters.js';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import { currencyFormatter } from '$lib/service/services';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    let disabled = true;
    let labelBlack = false;
    let infoTrue = true;
    let activeStepper = 0;
    let currRecord = mockRekodKuarters.filter(
        (rec) => rec.id == $selectedRecordId,
    )[0];
    let currentEmployee = mockEmployees.filter((rec) => rec.id == 1)[0];

    let currEmpService = mockCurrentService.filter(
        (e) => e.employeeId == currentEmployee.id,
    );

    let currEmpPosition = mockLookupPositions.filter(
        (e) => e.id == currEmpService[0].positionId,
    );

    let currEmpGrade = mockLookupGrades.filter(
        (e) => e.id == currEmpService[0].gradeId,
    );

    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Kakitangan LKIM',
        },
        {
            value: 'false',
            label: 'Bukan Kakitangan LKIM',
        },
    ];

    //function to get current age
    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });

    // Function to handle the file changes
    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Butiran Rekod Permohonan Kuarters"
        description="Butiran rekod permohonan kuarters"
        ><FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
        <FormButton
            type="new-application-exit-quarters"
            onClick={() => {
                goto('/kakitangan/pinjaman-kuarters/kuarters/keluar/baru');
            }}
        ></FormButton>
    </ContentHeader>
</section>

<Stepper
    activeIndex={activeStepper}
    dataId={'ID: ' + ' ' + currRecord.employeeNumber}
    dataStatus={'Status: ' + ' ' + currRecord.status}
>
    <StepperContent>
        <StepperContentHeader title="Jenis Pemohon"
            ><FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <RadioSingle
                userSelected={currRecord.typeOfRequestor == 'Kakitangan LKIM'
                    ? 'true'
                    : 'false'}
                {labelBlack}
                {disabled}
                {options}
                legend={'Jenis Pemohon'}
            ></RadioSingle>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <TextField
                {disabled}
                {labelBlack}
                label="No. Pekerja"
                value={currentEmployee.employeeNumber}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Nama"
                value={currentEmployee.name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. K/P"
                value={currentEmployee.identityDocumentNumber}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Gred"
                value={currEmpGrade[0].code}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Penempatan Semasa"
                value={currEmpService[0].placement}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. Telefon"
                value={currentEmployee.mobileNumber}
            ></TextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label="Alamat Surat Menyurat"
                value={currentEmployee.mailAddress}
            ></LongTextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Status"
                value={currentEmployee.marital}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pasangan (Jika Berkhawin)"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <TextField
                {disabled}
                {labelBlack}
                label="Nama Penuh"
                value={'Nur Afifah Farhan'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. Telefon"
                value={'014-843557'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Jabatan / Jawatan"
                value={'Pengurus'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Gaji Sekarang yang Diterima (Gaji Pokok / Hakiki) (RM)"
                value={currencyFormatter(4123.22)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Bilangan anak yang tinggal bersama pemohon yang berumur kurang 21 tahun"
                value={'2'}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan (Agensi/Jabatan)"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <TextField
                {disabled}
                {labelBlack}
                label="Nama Jawatan"
                value={currEmpPosition[0].name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Gred"
                value={currEmpGrade[0].code}
            ></TextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label="Alamat Penuh Jabatan / Agensi"
                value={'D/A Lembaga Kemajuan Ikan Malaysia, Lot 329, Seksyen 9, Jalan Satok, Pelabuhan Senari, Sarawak, 93400 Kuching'}
            ></LongTextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label="Alamat Penuh Jabatan / Agensi Pembayar Gaji"
                value={'D/A Lembaga Kemajuan Ikan Malaysia, Lot 329, Seksyen 9, Jalan Satok, Pelabuhan Senari, Sarawak, 93400 Kuching'}
            ></LongTextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Bank Pembayar Gaji"
                value={'Maybank'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Gaji Sekarang (Gaji Pokok / Hakiki) (RM)"
                value={currencyFormatter(3532.54)}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 5;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>

                <DownloadAttachment fileName="SALINAN KAD PENGENALAN.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SLIP GAJI TERKINI.pdf"
                ></DownloadAttachment>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2.5"
            >
                <Checkbox checked={infoTrue} {disabled}
                    ><p>
                        Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan berikut adalah benar
                    </p></Checkbox
                >
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Ulasan Kelulusan daripada Urus Setia"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 5;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 7;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <LongTextField
                {disabled}
                {labelBlack}
                label="Tindakan / Ulasan"
                value={'Pemohon layak menduduki kuarters.'}
            ></LongTextField>
            <TextField {disabled} {labelBlack} label="Keputusan" value="SAH"
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kuarters"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 8;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <CustomTab>
                <CustomTabContent title="Maklumat Kelayakan">
                    <SectionHeader title="Maklumat Kelayakan"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    >
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Gaji Pokok (RM)"
                            value={currencyFormatter(4672.56)}
                        ></TextField>
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Elaun - Elaun (RM)"
                            value={currencyFormatter(2000)}
                        ></TextField>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                    >
                        <SectionHeader title="Nama Pelulus"></SectionHeader>
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Nama Pelulus"
                            value={'Samat Bin Mat'}
                        ></TextField>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                    >
                        <SectionHeader title="Butiran Penempatan Kuarter"
                        ></SectionHeader>
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Emel Pemohon"
                            value={currentEmployee.email}
                        ></TextField>
                        <DateSelector
                            handleDateChange
                            {disabled}
                            {labelBlack}
                            label="Tarikh Masuk Kuarter"
                            selectedDate="2023-08-06"
                        ></DateSelector>
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Unit Dan Kuarter"
                            value={'Unit 5 Kuarter 10'}
                        ></TextField>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                    >
                        <SectionHeader
                            title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                        ></SectionHeader>
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Nilai Sewaan Bulanan"
                            value={currencyFormatter(900)}
                        ></TextField>
                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Deposit (2 Bulan nilai sewaan)"
                            value={currencyFormatter(1800)}
                        ></TextField>

                        <TextField
                            {disabled}
                            {labelBlack}
                            label="Deposit (Air dan Elektrik)"
                            value={currencyFormatter(300)}
                        ></TextField>
                    </div>
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Surat Tawaran Kuarters"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 7;
                }}
            ></FormButton><FormButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
            >
                <DownloadAttachment
                    fileName="SURAT TAWARAN PENEMPATAN KUARTERS.pdf"
                ></DownloadAttachment>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
