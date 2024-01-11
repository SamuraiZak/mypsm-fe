<script lang="ts">
    import SvgTrash from '$lib/assets/svg/SvgTrash.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
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
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupServiceGroups } from '$lib/mocks/database/mockLookupServiceGroups';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockFinalSalary } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalary';
    import { loanOptions } from '$lib/mocks/pinjaman-kuarters/loanOptions';
    import { loanPaybackMonthsOptions } from '$lib/mocks/pinjaman-kuarters/loanPaybackDurationOptions';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import FormButton from './../../../../../../lib/components/buttons/FormButton.svelte';
    import BadgeField from '$lib/components/input/BadgeField.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';

    let currEmpLoanRec = mockRekodPinjaman.filter(
        (rec) => rec.id == $selectedRecordId,
    );

    let disabled = true;
    let deductionVal = 0;
    let salaryAndAllowanceDeductionVal = 0;
    let newDeductionVal = 0;
    let labelBlack = false;
    let selectedAccepted = 'true';
    let selectedChecked = 'true';
    let selectedApproval = 'true';

    //THIS IS FOR CAR PAYMENT
    let downPayment = 2000;
    let governmentFundAndProfitAmount = 500;
    let governmentFundAmount = 501;
    let saleValue =
        downPayment + governmentFundAndProfitAmount + governmentFundAmount;

    let suppliers: any[] = [
        {
            name: '',
            address: '',
        },
    ];
    const addPembekal = () => {
        suppliers = [...suppliers, { name: '', address: '' }];
    };

    let activeStepper = 0;
    let currentEmployee = mockEmployees.filter(
        (rec) => rec.employeeNumber == currEmpLoanRec[0].employeeNumber,
    )[0];

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

    let allEmp: any[] = Object.keys(mockEmployees).map(function (keys) {
        return { value: keys[0], name: mockEmployees[parseInt(keys)].name };
    });

    let selectedApprover = '0';
    let selectedSupporter = '0';

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

    // Function to get months
    function getMonths(date1: string, date2: string) {
        var firstDate = new Date(date1);
        var secondDate = new Date(date2);
        var months =
            secondDate.getMonth() -
            firstDate.getMonth() +
            12 * (secondDate.getFullYear() - firstDate.getFullYear());
        var duration = months + ' Bulan';
        return duration;
    }
    // Function to get months
    function getMonthsNumber(date1: string, date2: string) {
        var firstDate = new Date(date1);
        var secondDate = new Date(date2);
        var months =
            secondDate.getMonth() -
            firstDate.getMonth() +
            12 * (secondDate.getFullYear() - firstDate.getFullYear());
        return months;
    }
    // Function to get percentage
    function percentage(partialValue: number, totalValue: number) {
        var res = ((partialValue / totalValue) * 100).toFixed(2);
        return res;
    }
    // Function to get monthly payment
    function monthly(total: number, month: number) {
        var res = total / month;
        return res;
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Pinjaman {currEmpLoanRec[0].typeOfLoan ==
        'Kenderaan'
            ? 'K-' + currEmpLoanRec[0].employeeNumber
            : 'KTP-' + currEmpLoanRec[0].employeeNumber}"
        description="Hal-hal berkaitan menguruskan pinjaman kakitangan LKIM"
        ><FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton></ContentHeader
    >
</section>

<Stepper
    activeIndex={activeStepper}
    dataId={currEmpLoanRec[0].typeOfLoan == 'Kenderaan'
        ? 'ID: K-' + currEmpLoanRec[0].employeeNumber
        : 'ID: KTP-' + currEmpLoanRec[0].employeeNumber}
    dataStatus={'Status: ' + currEmpLoanRec[0].status}
>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam"
            ><FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
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
        <StepperContentHeader title="Maklumat Pinjaman"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton>

            <FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <TextField
                {labelBlack}
                {disabled}
                label={'Jenis Permohonan'}
                value={currEmpLoanRec[0].typeOfLoan}
            ></TextField>
            <TextField
                {labelBlack}
                {disabled}
                label={'Jumlah yang Dipohon (RM)'}
                value={CurrencyHelper.formatCurrency(currEmpLoanRec[0].total)}
            ></TextField>
            <DropdownSelect
                {labelBlack}
                {disabled}
                dropdownType="label-left-full"
                label={'Tempoh Pembayaran'}
                options={loanPaybackMonthsOptions}
                value={getMonths(
                    currEmpLoanRec[0].loanStartDate,
                    currEmpLoanRec[0].loanEndDate,
                )}
            ></DropdownSelect></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan yang Berkaitan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>

            <FormButton
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
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
                <DownloadAttachment fileName="SALINAN SEBUT HARGA.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN KAD PENGENALAN.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SLIP GAJI TERKINI.pdf"
                ></DownloadAttachment>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus Peminjam"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton
                type="save"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Masukkan Nama Penyokong dan Pelulus"
                ></SectionHeader>
                <DropdownSelect
                    {disabled}
                    dropdownType="label-left-full"
                    label={'Nama Penyokong'}
                    options={allEmp}
                    value={selectedSupporter}
                ></DropdownSelect>
                <DropdownSelect
                    {disabled}
                    dropdownType="label-left-full"
                    label={'Nama Pelulus'}
                    options={allEmp}
                    value={selectedApprover}
                ></DropdownSelect>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pinjaman"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton><FormButton
                type="save"
                onClick={() => {
                    activeStepper = 5;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <CustomTab>
                <CustomTabContent title="Maklumat Kelayakan">
                    <SectionHeader title="Maklumat Kelayakan"></SectionHeader>
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <p class="text-sm text-system-primary">
                            Gaji Pokok Sahaja
                        </p>
                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'100.00' + '%'}
                            label={'Gaji Pokok (RM)'}
                            value={currEmpSalary.grossSalary}
                        ></TextField>
                        <TextField
                            type="number"
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={percentage(
                                deductionVal,
                                currEmpSalary.grossSalary,
                            ) + '%'}
                            label={'Potongan (RM)'}
                            bind:value={deductionVal}
                        ></TextField>
                        <TextField
                            {disabled}
                            type="number"
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={percentage(
                                currEmpSalary.grossSalary - deductionVal,
                                currEmpSalary.grossSalary,
                            ) + '%'}
                            label={'Baki (RM)'}
                            value={+(
                                currEmpSalary.grossSalary - deductionVal
                            ).toFixed(2)}
                        ></TextField>
                        <p class="text-sm text-system-primary">
                            Gaji Pokok dan Elaun
                        </p>
                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'100.00' + '%'}
                            label={'Gaji Pokok dan Elaun (RM)'}
                            value={currEmpSalary.grossSalary +
                                currEmpSalary.allowances}
                        ></TextField>
                        <TextField
                            type="number"
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={percentage(
                                salaryAndAllowanceDeductionVal,
                                currEmpSalary.grossSalary,
                            ) + '%'}
                            label={'Potongan (RM)'}
                            bind:value={salaryAndAllowanceDeductionVal}
                        ></TextField>
                        <TextField
                            type="number"
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={percentage(
                                newDeductionVal,
                                currEmpSalary.grossSalary,
                            ) + '%'}
                            label={'Potongan Baru (RM)'}
                            bind:value={newDeductionVal}
                        ></TextField>
                        <TextField
                            {disabled}
                            type="number"
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={percentage(
                                currEmpSalary.grossSalary -
                                    salaryAndAllowanceDeductionVal -
                                    newDeductionVal,
                                currEmpSalary.grossSalary,
                            ) + '%'}
                            label={'Baki (RM)'}
                            value={+(
                                currEmpSalary.grossSalary -
                                salaryAndAllowanceDeductionVal -
                                newDeductionVal
                            ).toFixed(2)}
                        ></TextField>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                    <SectionHeader
                        title="Maskkan Maklumat Kelulusan dan Tawaran"
                    ></SectionHeader>
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <DropdownSelect
                            dropdownType="label-left-full"
                            label="Jenis Belian"
                            options={loanOptions}
                            bind:value={currEmpLoanRec[0].typeOfLoan}
                        ></DropdownSelect>
                        <TextField
                            type="number"
                            label="Harga Belian Dengan Kerajaan (RM)"
                            value={currEmpLoanRec[0].total}
                        ></TextField>
                        <TextField
                            type="number"
                            label="Bayaran Muka (RM)"
                            value={downPayment}
                        ></TextField>
                        <TextField
                            type="number"
                            label="Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)"
                            value={governmentFundAndProfitAmount}
                        ></TextField>
                        <TextField
                            type="number"
                            label="Amaun Pembiayaan Kerajaan (RM)"
                            value={governmentFundAmount}
                        ></TextField>
                        <TextField
                            type="number"
                            label="Harga Jualan Kepada Pegawai (RM)"
                            value={currEmpLoanRec[0].total - saleValue}
                        ></TextField>
                        <TextField
                            type="number"
                            label="Ansuran Bulanan (RM)"
                            value={monthly(
                                currEmpLoanRec[0].total - saleValue,
                                getMonthsNumber(
                                    currEmpLoanRec[0].loanStartDate,
                                    currEmpLoanRec[0].loanEndDate,
                                ),
                            )}
                        ></TextField>
                        <DateSelector handleDateChange selectedDate="2023-08-03"
                        ></DateSelector>
                        <TextField
                            label="Tempoh"
                            value={getMonths(
                                currEmpLoanRec[0].loanStartDate,
                                currEmpLoanRec[0].loanEndDate,
                            )}
                        ></TextField>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Jadual Pertama">
                    {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'}
                        <SectionHeader
                            title="Masukkan Maklumat dan Perihal Kenderaan"
                        ></SectionHeader>
                        <TextField label="No. Enjin" value="-"></TextField>
                        <TextField label="No. Casis" value="-"></TextField>
                        <TextField label="Buatan" value="-"></TextField>
                        <TextField label="Nama Model" value="-"></TextField>
                        <TextField label="Kuasa Enjin" value="-"></TextField>
                        <TextField label="Bahan Bakar" value="-"></TextField>
                        <TextField label="Kelas Kegunaan" value="-"></TextField>
                        <TextField label="Jenis Badan" value="-"></TextField>
                        <TextField label="Tahun Dibuat" value="-"></TextField>
                        <SectionHeader
                            title="Masukkan Butiran Penjualan/Tuan Asal"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField label="Nama" value="-"></TextField>
                            <TextField label="No. K/P" value="-"></TextField>
                            <LongTextField label="Alamat" value="-"
                            ></LongTextField>
                        </div>
                        <SectionHeader title="Masukkan Harga Belian Kenderaan"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField
                                label="Jumlah Harga Belian (RM)"
                                value="4000.00"
                            ></TextField>
                            <TextField label="Bayaran Baki (RM)" value="-"
                            ></TextField>
                            <TextField
                                label="Amaun Pembiayaan Kerajaan (RM)"
                                value="-"
                            ></TextField>
                        </div>
                    {:else}
                        <SectionHeader title="Masukkan Maklumat Pembekal">
                            <FormButton
                                type="add-supplier"
                                onClick={addPembekal}
                            ></FormButton>
                        </SectionHeader>

                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            {#each suppliers as item, index}
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                                >
                                    <div
                                        class="flex w-full items-start justify-between"
                                    >
                                        <p class="text-sm text-system-primary">
                                            Pembekal #{index + 1}
                                        </p>
                                        {#if index != 0}
                                            <button
                                                on:click={() => {
                                                    suppliers.splice(index, 1);
                                                    suppliers = suppliers;
                                                }}
                                            >
                                                <div class="text-system-danger">
                                                    <SvgTrash></SvgTrash>
                                                </div></button
                                            >
                                        {/if}
                                    </div>
                                    <TextField
                                        placeholder="Nama Pembekal"
                                        label="Nama Pembekal"
                                        bind:value={item.name}
                                    ></TextField>
                                    <TextField
                                        placeholder="Alamat Pembekal"
                                        label="Alamat"
                                        bind:value={item.address}
                                    ></TextField>
                                </div>
                            {/each}
                        </div>
                        <SectionHeader title="Masukkan Maklumat Pembelian"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField
                                label="Jumlah Harga Belian (RM)"
                                value="4000.00"
                            ></TextField>
                            <TextField label="Bayaran Baki (RM)" value="-"
                            ></TextField>
                            <TextField
                                label="Amaun Pembiayaan Kerajaan (RM)"
                                value="-"
                            ></TextField>
                        </div>
                    {/if}
                </CustomTabContent>
                <CustomTabContent title="Jadual Kedua">
                    {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'}
                        <SectionHeader
                            title="Masukkan Maklumat Harga Jualan (RM)"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField
                                label="Jumlah Harga Belian (RM)"
                                value="4000.00"
                            ></TextField>
                            <TextField label="Bayaran Baki (RM)" value="-"
                            ></TextField>
                            <TextField
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                value="-"
                            ></TextField>
                        </div>
                        <SectionHeader
                            title="Masukkan Amaun dan Tempoh Bayaran Balik Harga Jualan"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField label="Amaun Bulanan (RM)" value={'-'}
                            ></TextField>
                            <DropdownSelect
                                dropdownType="label-left-full"
                                label={'Tempoh Pembayaran'}
                                options={loanPaybackMonthsOptions}
                                value={getMonths(
                                    currEmpLoanRec[0].loanStartDate,
                                    currEmpLoanRec[0].loanEndDate,
                                )}
                            ></DropdownSelect>
                        </div>
                    {:else}
                        <SectionHeader
                            title="Masukkan Maklumat Harga Jualan (RM)"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField
                                label="Jumlah Harga Belian (RM)"
                                value="4000.00"
                            ></TextField>
                            <TextField label="Bayaran Baki (RM)" value="-"
                            ></TextField>
                            <TextField
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                value="-"
                            ></TextField>
                        </div>
                        <SectionHeader
                            title="Masukkan Maklumat Amaun dan Keuntungan Kerajaan (RM)"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan"
                                value="-"
                            ></TextField>
                            <TextField label="Bayaran Baki (RM)" value={'-'}
                            ></TextField>
                            <DropdownSelect
                                dropdownType="label-left-full"
                                label={'Tempoh Pembayaran'}
                                options={loanPaybackMonthsOptions}
                                value={getMonths(
                                    currEmpLoanRec[0].loanStartDate,
                                    currEmpLoanRec[0].loanEndDate,
                                )}
                            ></DropdownSelect>
                        </div>
                    {/if}
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Senarai Semak Surat Perjanjian"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton><FormButton
                type="save"
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <SectionHeader
                title="Masukkan Maklumat Senarai Semak Surat Perjanjian"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <RadioSingle
                    legend="Diterima"
                    {options}
                    bind:userSelected={selectedAccepted}
                ></RadioSingle>
                <RadioSingle
                    legend="Disemak"
                    {options}
                    bind:userSelected={selectedChecked}
                ></RadioSingle>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Resit dan Invois"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 5;
                }}
            ></FormButton><FormButton
                type="done"
                onClick={() => {
                    activeStepper = 7;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Dokumen Resit dan Invois"
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
                <DownloadAttachment fileName="SALINAN RESIT.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN INVOIS.pdf"
                ></DownloadAttachment>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapan Pelulus"
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
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Keputusan Dari Pelulus"></SectionHeader>
                <LongTextField
                    label="Tindakan / Ulasan"
                    value={'Pemohon layak menduduki kuarters.'}
                ></LongTextField>
                <RadioSingle
                    options={approvalOptions}
                    userSelected={selectedApproval}
                    legend="Perkhidmatan"
                ></RadioSingle>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Keputusan Dari Penyokong"></SectionHeader>

                <TextField
                    {disabled}
                    label="Nama Penyokong"
                    value={'Ramli bin Mat'}
                ></TextField>
                <LongTextField
                    {disabled}
                    label="Tindakan / Ulasan"
                    value={'Pemohon layak menduduki kuarters.'}
                ></LongTextField>

                <BadgeField {disabled} label="Keputusan"></BadgeField>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
