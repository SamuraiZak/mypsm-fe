<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
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
    import { currencyFormatter } from '$lib/service/services';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    let disabled = true;
    let labelBlack = false;
    let selectedLoanPayback = '';
    let editing = false;
    let infoTrue = false;
    let activeStepper = 0;
    let currRecord = mockRekodPinjaman.filter(
        (rec) => rec.id == 1, //to be repalced with $selectedRecordId
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
        title="Permohonan Pinjaman Komputer dan Telefon Pintar"
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
                value={currencyFormatter(currEmpSalary.grossSalary)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jumlah Elaun-elaun'}
                value={currencyFormatter(currEmpSalary.allowances)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jumlah Potongan'}
                value={currencyFormatter(currEmpSalary.salaryDeduction)}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pinjaman">
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <TextField
                label={'Jumlah yang Dipohon (RM)'}
                value={currencyFormatter(0)}
            ></TextField>
            <DropdownSelect
                dropdownType="label-left-full"
                label={'Tempoh Pembayaran'}
                options={loanPaybackMonthsOptions}
                value={selectedLoanPayback}
            ></DropdownSelect>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Dokumen Berkaitan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <FormButton
                type="send"
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
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div
                    class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                >
                    <div class="flex flex-wrap gap-3">
                        {#each $fileSelectionList as item, index}
                            <FileInputFieldChildren
                                childrenType="grid"
                                handleDelete={() => handleDelete(index)}
                                fileName={item.name}
                            />
                        {/each}
                    </div>
                    <div
                        class="flex flex-col items-center justify-center gap-2.5"
                    >
                        <p
                            class=" text-sm text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        >
                            Pilih fail dari peranti anda.
                        </p>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        >
                            <svg
                                width={40}
                                height={40}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                            </svg>
                        </div>
                        <div hidden={$fileSelectionList.length > 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div>
                    </div>
                </div>
            </div>
            <SectionHeader title="Pengesahan"></SectionHeader>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2.5"
            >
                <Checkbox checked={infoTrue}
                    ><p>
                        Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan berikut adalah benar
                    </p></Checkbox
                >
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
