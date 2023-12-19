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
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
    import { currencyFormatter } from '$lib/service/services';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    // Initialize Variables
    let activeStepper = 0;
    let labelBlack = false;
    let disabled = true;
    let isStaff = 'true';
    let infoTrue = false;
    let selectedService = 'true';
    let selectedApproval = 'true';
    let gredExceed = false;
    let under25km = true;
    let above25km = false;

    let allEmp: any[] = Object.keys(mockEmployees).map(function (keys) {
        return { value: keys[0], name: mockEmployees[parseInt(keys)].name };
    });
    let selectedApprover = '';
    let selectedSupporter = '';

    // Get Mock Data
    let currEmpQuartersRec = mockRekodKuarters.filter((rec) => rec.id == 1);

    let currRecord = mockRekodKuarters.filter((rec) => rec.id == 1)[0];
    let currentEmployee = mockEmployees.filter(
        (rec) => rec.employeeNumber == currRecord.employeeNumber,
    )[0];

    let currEmpService = mockCurrentService.filter(
        (e) => e.employeeId == currentEmployee.id,
    );

    let currEmpPosition = mockLookupPositions.filter(
        (e) => e.id == currEmpService[0].positionId,
    );

    let currEmpGrade = mockLookupGrades.filter(
        (e) => e.id == currEmpService[0].gradeId,
    );

    const options: RadioOption[] = [
        {
            value: 'false',
            label: 'Agensi / Jabatan Luar',
        },
    ];

    const approvalOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'LULUS',
        },
        {
            value: 'false',
            label: 'TIDAK LULUS',
        },
    ];
    const serviceOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'Persekutuan',
        },
        {
            value: 'false',
            label: 'Negeri',
        },
    ];

    // Functions

    //Function to Convert Date
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
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

<section class="flex w-full flex-row items-start justify-start">
    <ContentHeader
        title="Maklumat Permohonan Kuarter Agensi Luar/Jabatan Luar"
        description="Sila lengkapkan butiran berkaitan permohonan kuarters bukan kakitangan LKIM"
        ><FormButton
            type="back"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton></ContentHeader
    >
</section>

<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Jenis Pemohon"
            ><FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <RadioSingle legend="Jenis Pemohon" {options}></RadioSingle>
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
                label="No. Pekerja"
                value={currentEmployee.employeeNumber}
            ></TextField>
            <TextField label="Nama" value={currentEmployee.name}></TextField>
            <TextField
                label="No. K/P"
                value={currentEmployee.identityDocumentNumber}
            ></TextField>
            <TextField label="Gred" value={currEmpGrade[0].code}></TextField>
            <TextField
                label="Penempatan Semasa"
                value={currEmpService[0].placement}
            ></TextField>
            <TextField label="No. Telefon" value={currentEmployee.mobileNumber}
            ></TextField>
            <LongTextField
                label="Alamat Surat Menyurat"
                value={currentEmployee.mailAddress}
            ></LongTextField>
            <TextField label="Status" value={currentEmployee.marital}
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
            <TextField label="Nama Penuh" value={'Nur Afifah Farhan'}
            ></TextField>
            <TextField label="No. Telefon" value={'014-843557'}></TextField>
            <TextField label="Jabatan / Jawatan" value={'Pengurus'}></TextField>
            <TextField
                label="Gaji Sekarang yang Diterima (Gaji Pokok / Hakiki) (RM)"
                value={currencyFormatter(4123.22)}
            ></TextField>
            <TextField
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
            <TextField label="Nama Jawatan" value={currEmpPosition[0].name}
            ></TextField>
            <TextField label="Gred" value={currEmpGrade[0].code}></TextField>
            <RadioSingle
                options={serviceOptions}
                userSelected={selectedService}
                legend="Perkhidmatan"
            ></RadioSingle>
            <LongTextField
                label="Alamat Penuh Jabatan / Agensi"
                value={'D/A Lembaga Kemajuan Ikan Malaysia, Lot 329, Seksyen 9, Jalan Satok, Pelabuhan Senari, Sarawak, 93400 Kuching'}
            ></LongTextField>
            <LongTextField
                label="Alamat Penuh Jabatan / Agensi Pembayar Gaji"
                value={'D/A Lembaga Kemajuan Ikan Malaysia, Lot 329, Seksyen 9, Jalan Satok, Pelabuhan Senari, Sarawak, 93400 Kuching'}
            ></LongTextField>
            <TextField label="Bank Pembayar Gaji" value={'Maybank'}></TextField>
            <TextField
                label="Gaji Sekarang (Gaji Pokok / Hakiki) (RM)"
                value={currencyFormatter(3532.54)}
            ></TextField>
            <TextField label="ITP (RM)" value={currencyFormatter(100.0)}
            ></TextField>
            <TextField label="COLA (RM)" value={currencyFormatter(150.0)}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton><FormButton type="reset" onClick={() => {}}
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
                <div
                    class="flex h-fit w-full flex-col items-start justify-start"
                >
                    <p class="text-sm text-txt-tertiary">
                        Sila muat naik salinan:
                    </p>
                    <ul
                        class="list-inside list-disc pl-2 text-sm text-txt-tertiary"
                    >
                        <li>Kad Pengenalan Sendiri</li>
                        <li>Kad Pengenalan Pasangan (Jika Berkaitan)</li>
                        <li>Kad Nikah (Jika Berkaitan)</li>
                        <li>Kad Pekerja</li>
                        <li>Surat Pengesahan Jabatan / Majikan</li>
                        <li>Slip Gaji 3 bulan yang Terkini</li>
                        <li>Gambar dalaman Kuarters</li>
                        <li>Gambar luaran Kuarters</li>
                        <li>Lain - lain dokumen yang diperlukan</li>
                    </ul>
                </div>
            </div>

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
                <div class="flex flex-col items-center justify-center gap-2.5">
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
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton><FormButton type="reset" onClick={() => {}}
            ></FormButton><FormButton
                type="done"
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
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
                label="Tindakan / Ulasan"
                value={'Pemohon layak menduduki kuarters.'}
            ></LongTextField>
            <RadioSingle
                options={approvalOptions}
                userSelected={selectedApproval}
                legend="Perkhidmatan"
            ></RadioSingle>
        </StepperContentBody>
    </StepperContent><StepperContent>
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
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
            >
                <SectionHeader title="Nama Pelulus"></SectionHeader>
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Nama Pelulus"
                    options={allEmp}
                    value={selectedApprover}
                ></DropdownSelect>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
            >
                <SectionHeader title="Butiran Penempatan Kuarter"
                ></SectionHeader>
                <TextField label="Emel Pemohon" value={currentEmployee.email}
                ></TextField>
                <DateSelector
                    handleDateChange
                    label="Tarikh Masuk Kuarter"
                    selectedDate="2023-08-06"
                ></DateSelector>
                <TextField label="Unit Dan Kuarter" value={'Unit 5 Kuarter 10'}
                ></TextField>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
            >
                <SectionHeader
                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                ></SectionHeader>
                <TextField
                    label="Nilai Sewaan Bulanan"
                    value={currencyFormatter(900)}
                ></TextField>
                <TextField
                    label="Deposit (2 Bulan nilai sewaan)"
                    value={currencyFormatter(1800)}
                ></TextField>

                <TextField
                    label="Deposit (Air dan Elektrik)"
                    value={currencyFormatter(300)}
                ></TextField>
            </div>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Muat Naik Resit Bayaran"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div
                    class="flex h-fit w-full flex-col items-start justify-start"
                >
                    <p class="text-sm text-txt-tertiary">
                        Sila muat naik salinan:
                    </p>
                    <ul
                        class="list-inside list-disc pl-2 text-sm text-txt-tertiary"
                    >
                        <li>1. Resit Deposit Sewaan</li>
                        <li>2. Resit Utiliti</li>
                        <li>3. Penyata Bank (Standing Instruction)</li>
                        <li>Gambar Dalam Kuarters</li>
                        <li>Gambar luaran Kuarters</li>
                    </ul>
                </div>
            </div>

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
                <div class="flex flex-col items-center justify-center gap-2.5">
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
        </StepperContentBody>
    </StepperContent><StepperContent>
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
