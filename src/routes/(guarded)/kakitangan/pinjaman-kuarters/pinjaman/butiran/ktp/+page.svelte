<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockLookupServiceGroups } from '$lib/mocks/database/mockLookupServiceGroups';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockFinalSalary } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalary';
    import { loanPaybackMonthsOptions } from '$lib/mocks/pinjaman-kuarters/loanPaybackDurationOptions';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';

    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    let disabled = true;
    let labelBlack = false;
    let selectedLoanPayback = '12 Bulan';
    let infoTrue = true;
    let activeStepper = 0;
    let currRecord = mockRekodPinjaman.filter(
        (rec) => rec.id == $selectedRecordId, //to be repalced with $selectedRecordId
    )[0];
    let currentEmployee = mockEmployees.filter((rec) => rec.id == 1)[0];

    let currEmpSalary = mockFinalSalary.filter(
        (rec) => rec.employeeNumber == currentEmployee.employeeNumber,
    )[0];

    let currEmpService = mockCurrentService.filter(
        (e) => e.employeeId == currentEmployee.id,
    );

    let currEmpPosition = mockLookupPositions.filter(
        (e) => e.id == currEmpService[0].positionId,
    );

    let currEmpServiceGroup = mockLookupServiceGroups.filter(
        (e) => e.id == currEmpService[0].serviceGroupId,
    );

    let currEmpGrade = mockLookupGrades.filter(
        (e) => e.id == currEmpService[0].gradeId,
    );

    let currEmpPensions = mockEmploymentPensions.filter((e) => e.id == 1)[0];

    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
    })!;
    let currentEmployeeBirthState = mockLookupStates.find((state) => {
        return state.id === currentEmployee.birthStateId;
    })!;

    let isExPoliceSoldier = currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }
    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
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

    //function to get current age
    function getAge(birthday: string) {
        let formattedBday = dateConvertor(birthday).replaceAll('-', ',');
        const today = new Date();
        const birthDate = new Date(formattedBday);
        var age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
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
        title="Butiran Rekod Permohonan Pinjaman Komputer dan Telefon Pintar"
        description="Butiran permohonan pinjaman"
        ><FormButton
            type="close"
            onClick={() => {
                window.history.back();
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
        <StepperContentHeader title="Maklumat Peribadi Kakitangan">
            <FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <SectionHeader title="Butiran Peminjam"></SectionHeader>
            <TextField
                {disabled}
                {labelBlack}
                label={'Nama Penuh'}
                value={currentEmployee.name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'No. K/P'}
                value={currentEmployee.identityDocumentNumber}
            ></TextField>
            <DateSelector
                handleDateChange
                {disabled}
                {labelBlack}
                label={'Tarikh Lahir'}
                selectedDate={dateConvertor(currentEmployee.birthDate)}
            ></DateSelector>
            <TextField
                {disabled}
                {labelBlack}
                label={'Umur Pada Tarikh Memohon'}
                value={getAge(currentEmployee.birthDate)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jawatan Sekarang'}
                value={currEmpPosition[0].name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Kumpulan Perkhidmatan'}
                value={currEmpServiceGroup[0].name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Gred Jawatan'}
                value={currEmpGrade[0].code}
            ></TextField>
            <TextField {disabled} {labelBlack} label={'Kementerian'} value={'-'}
            ></TextField>
            <TextField {disabled} {labelBlack} label={'Jabatan'} value={'-'}
            ></TextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label={'Alamat Penuh Tempat Bertugas'}
                value={'-'}
            ></LongTextField>
            <DateSelector
                handleDateChange
                {disabled}
                {labelBlack}
                label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                selectedDate={dateFormatter(currEmpService[0].firstServiceDate)}
            ></DateSelector>
            <DateSelector
                handleDateChange
                {disabled}
                {labelBlack}
                label={'Tarikh Persaraan Wajib'}
                selectedDate={dateFormatter(currEmpPensions.retiredDate)}
            ></DateSelector>
            <TextField
                {disabled}
                {labelBlack}
                label={'Gaji Pokok'}
                value={CurrencyHelper.formatCurrency(currEmpSalary.grossSalary)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jumlah Elaun-elaun'}
                value={CurrencyHelper.formatCurrency(currEmpSalary.allowances)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jumlah Potongan'}
                value={CurrencyHelper.formatCurrency(currEmpSalary.salaryDeduction)}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pinjaman">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton>

            <FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <TextField
                {labelBlack}
                {disabled}
                label={'Jumlah yang Dipohon (RM)'}
                value={CurrencyHelper.formatCurrency(1699)}
            ></TextField>
            <DropdownSelect
                {labelBlack}
                {disabled}
                dropdownType="label-left-full"
                label={'Tempoh Pembayaran'}
                options={loanPaybackMonthsOptions}
                value={selectedLoanPayback}
            ></DropdownSelect>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Dokumen Berkaitan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>

            <FormButton
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton>
        </StepperContentHeader>
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

                <DownloadAttachment fileName="Dokumen_Sokongan_1.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="Dokumen_Sokongan_2.pdf"
                ></DownloadAttachment>
            </div>
            <SectionHeader title="Pengesahan"></SectionHeader>
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
        <StepperContentHeader title="Semak Status Sokongan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <SectionHeader title="Semakan Status Sokongan"></SectionHeader>
            <TextField
                {disabled}
                {labelBlack}
                label={'Status Sokongan'}
                value={'DISOKONG'}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Surat Tawaran"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 5;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <SectionHeader title="Surat Tawaran"></SectionHeader>
            <div class="flex w-full flex-col items-start justify-start gap-2.5">
                <p class="text-sm text-txt-secondary">
                    Sila muat turun dan pastikan dokumen diisi dengan lengkap
                    dan ditandatangani sebelum dihantar kepada Urus Setia
                </p>
                <a href="/" class="text-sm text-system-primary underline"
                    >Surat Tawaran Opsyen</a
                >
                <a href="/" class="text-sm text-system-primary underline"
                    >Surat Perjanjian Pinjaman Komputer dan Telefon Pintar</a
                >
                <p class="text-sm italic text-system-danger">
                    *Kegagalan melengkapkan dokumen akan menyebabkan permohonan
                    tidak akan diproses.
                </p>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Surat Perjanjian">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton>
            <FormButton
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody
            ><!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Surat Perjanjian"
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

                <DownloadAttachment fileName="SURAT PERJANJIAN.pdf"
                ></DownloadAttachment>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Keputusan Permohonan">
            <FormButton
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
        <StepperContentBody
            ><TextField
                {disabled}
                {labelBlack}
                label={'Keputusan Permohonan'}
                value={'LULUS'}
            ></TextField></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Resit Pembelian"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton><FormButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Resit Pembelian"
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

                <DownloadAttachment fileName="RESIT PEMBELIAN.pdf"
                ></DownloadAttachment>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
