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
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import { currencyFormatter } from '$lib/service/services';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox, Radio } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    let disabled = true;
    let labelBlack = false;
    let isStaff = 'true';
    let infoTrue = true;
    let activeStepper = 0;
    let rentRate = 'more25km';
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
        title="Butiran Rekod Permohonan Keluar Kuarters"
        description="Butiran rekod permohonan keluar kuarters"
        ><FormButton
            type="close"
            onClick={() => {
                goto('../');
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
        <StepperContentHeader title="Maklumat Penempatan Kuarters"
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
                <div class="flex flex-col gap-5">
                    <ul
                        class="bg-white dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"
                    >
                        <li>
                            <Radio
                                class="p-3"
                                bind:group={rentRate}
                                value="under25km"
                            >
                                <div
                                    class="flex flex-col pl-10 text-sm italic {rentRate ==
                                    'under25km'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>Dalam Jarak 25 KM:</p>
                                    <ul class="list-inside list-disc pl-2">
                                        <li>Potongan ITP 75%</li>
                                        <li>Potongan COLA 50%</li>
                                    </ul>
                                </div></Radio
                            >
                        </li>
                        <li>
                            <Radio
                                class="p-3"
                                bind:group={rentRate}
                                value="more25km"
                                ><div
                                    class="flex flex-col pl-10 text-sm italic {rentRate ==
                                    'more25km'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>Jarak Melebihi 25 KM:</p>
                                    <ul class="list-inside list-disc pl-2">
                                        <li>Potongan COLA 50%</li>
                                    </ul>
                                </div></Radio
                            >
                        </li>
                        <li>
                            <Radio
                                class="p-3"
                                bind:group={rentRate}
                                value="gredExceed"
                                ><div
                                    class="flex flex-col pl-10 text-sm italic {rentRate ==
                                    'gredExceed'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>
                                        Gred Jawatan Melebihi Kategori Kuarters:
                                    </p>
                                    <ul class="list-inside list-disc pl-2">
                                        <li>
                                            Potongan ITP Mengikut Nilar Sewaan
                                            Gred Tertinggi Kuarters yang
                                            Diperuntukkan (RM)
                                        </li>
                                        <TextField
                                            labelBlack
                                            disabled={rentRate != 'gredExceed'}
                                            label=""
                                            value={currencyFormatter(0)}
                                        ></TextField>
                                    </ul>
                                </div></Radio
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluar Kuarters"
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
            <SectionHeader title="Butiran Keluar Kuarter"></SectionHeader>
            <DateSelector
                {labelBlack}
                {disabled}
                handleDateChange
                label="Tarikh Keluar Kuarter"
                selectedDate="2023-08-06"
            ></DateSelector>
            <TextField
                {disabled}
                {labelBlack}
                label="Unit Dan Kuarter"
                value={'Unit 5 Kuarter 10'}
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

                <DownloadAttachment fileName="Borang Akuan Keluar Kuarters.pdf"
                ></DownloadAttachment>
                <DownloadAttachment
                    fileName="Borang Pemeriksaan Keluar Kuarters.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="Gambar dalaman Kuarters.png"
                ></DownloadAttachment>
                <DownloadAttachment fileName="Gambar luaran Kuarters.png"
                ></DownloadAttachment>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
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
</Stepper>
