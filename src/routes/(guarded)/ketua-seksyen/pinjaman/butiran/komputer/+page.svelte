<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';

    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import { loanOptions } from '$lib/mocks/pinjaman-kuarters/loanOptions';
    import type {
        CalonPemangkuan,
        DtoCalonPemangkuan,
        IntActingApplication,
        MesyuaratPemilihanCalonPemangkuan,
    } from '$lib/interfaces/database/actingApplication';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import SvgTrash from '$lib/assets/svg/SvgTrash.svelte';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _submitSectionLeaderForm,
        _sectionLeaderSchema,
    } from './+page';

    export let data: PageData;

    export let disabled: boolean = true;

    let suppliers: any[] = [
        {
            name: '',
            address: '',
        },
    ];
    const addPembekal = () => {
        suppliers = [...suppliers, { name: '', address: '' }];
    };

    let selectedMeetingType: string = meetings[0].value;
    let selectedSalaryMonth: string = '1';
    let selectedGred: string = greds[0].value;

    const options: RadioOption[] = [
        {
            value: true,
            label: 'Ya',
        },
        {
            value: false,
            label: 'Tidak',
        },
    ];

    const supportOptions: RadioOption[] = [
        {
            value: true,
            label: 'Sokong',
        },
        {
            value: false,
            label: 'Tidak Sokong',
        },
    ];

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

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    //===================== Page Init Data =====================

    //Date Selector
    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const {
        form: sectionLeaderForm,
        errors: sectionLeaderError,
        enhance: sectionLeaderEnhance,
    } = superForm(data.sectionLeaderForm, {
        SPA: true,
        validators: _sectionLeaderSchema,
        id: 'sectionLeaderForm',
        onSubmit() {
            _submitSectionLeaderForm($sectionLeaderForm);
        },
        taintedMessage: false,
    });
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Pinjaman K34221B"
        description="Hal - hal berkaitan menguruskan pinjaman kakitangan LKIM"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/ketua-seksyen/halaman-utama');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
        <!-- =========================================================== -->
        <!-- Maklumat Peminjam -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Peminjam">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Butiran Peminjam"></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id=""
                        label={'Nama Penuh'}
                        value={'Mohd Irfan Bin Abu'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'No. K/P'}
                        value={'890707-13-5667'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Tarikh Lahir'}
                        value={'12/5/1991'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Umur Pada Tarikh Memohon'}
                        value={'32'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Jawatan Sekarang'}
                        value={'Jurutektik'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Kumpulan Perkhidmatan'}
                        value={'Teknologi Maklumat'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Gred Jawatan'}
                        value={'F41'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Kementerian'}
                        value={'-'}
                    ></TextField>
                    <TextField {disabled} id="" label={'Jabatan'} value={'-'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Alamat Penuh Tempat Bertugas'}
                        value={'-'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                        value={'-'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Tarikh Persaraan Wajib'}
                        value={'-'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Gaji Pokok (RM)'}
                        value={'0'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Jumlah Elaun-elaun (RM)'}
                        value={'0'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Jumlah Potongan'}
                        value={'0'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Maklumat Pinjaman -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Pinjaman">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Maklumat Pinjaman "></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id=""
                        label={'Jenis Permohonan'}
                        value={'komputer'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Jumlah Yang Dipohon(RM)'}
                        value={'6,999.00'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id=""
                        label={'Tempoh Pembayaran'}
                        value={'12 Bulan'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Dokumen Sokongan yang Berkaitan  -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan yang Berkaitan">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Dokumen Pinjaman "></SectionHeader>
                <div class="flex w-full flex-col gap-2">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <p class={stepperFormTitleClass}>
                            Fail-fail yang dimuat naik:
                        </p>
                        <DownloadAttachment fileName="SALINAN SEBUT HARGA"
                        ></DownloadAttachment>
                        <DownloadAttachment fileName="SALINAN KAD PENGENALAN"
                        ></DownloadAttachment>
                        <DownloadAttachment fileName="SLIP GAJI TERKINI"
                        ></DownloadAttachment>
                    </div>
                </div></StepperContentBody
            >
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Pengesahan Permohonan Pinjaman -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Pengesahan Permohonan Pinjaman">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Masukkan Nama Penyokong dan Pelulus "
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <DropdownSelect
                        dropdownType="label-left-full"
                        label="Nama Penyokong"
                        options={meetings}
                    />
                    <DropdownSelect
                        dropdownType="label-left-full"
                        label="Nama Pelulus"
                        options={meetings}
                    />
                </div></StepperContentBody
            >
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Pinjaman -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Pinjaman">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>
            <CustomTab>
                <!-- Maklumat Kelaykan -->
                <CustomTabContent title="Maklumat Kelaykan">
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
                            value={'2672.56'}
                        ></TextField>
                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'0.00' + '%'}
                            label={'Potongan (RM)'}
                            value={'2,000.00'}
                        ></TextField>
                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'0.00' + '%'}
                            label={'Baki (RM)'}
                            value={'-'}
                        ></TextField>
                    </div>

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
                            label={'Gaji Pokok dan Elaun (RM)'}
                            value={'2672.56'}
                        ></TextField>
                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'0.00' + '%'}
                            label={'Potongan (RM)'}
                            value={'2,000.00'}
                        ></TextField>
                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'0.00' + '%'}
                            label={'Potongan Baru (RM)'}
                            value={'-'}
                        ></TextField>

                        <TextField
                            {disabled}
                            labelType="auto-calculate-percentage"
                            hasTooltip
                            percentageVal={'0.00' + '%'}
                            label={'Baki (RM)'}
                            value={'-'}
                        ></TextField>
                    </div>
                </CustomTabContent>

                <!-- Maklumat Kelulusan dan Tawaran -->
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                    <SectionHeader title="Maklumat Kelulusan dan Tawaran"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <DropdownSelect
                                disabled
                                dropdownType="label-left-full"
                                label="Jenis Pembelian"
                                options={loanOptions}
                            />
                            <TextField
                                {disabled}
                                id=""
                                label={'Harga Belian Dengan Kerajaan (RM)'}
                                value={'10,000.00'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Bayaran Muka (RM)'}
                                value={'2,000.00'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)'}
                                value={'500.00'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Amaun Pembiayaan Kerajaan (RM)'}
                                value={'501.00'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Harga Jualan Kepada Pegawai(RM)'}
                                value={'6,999.00'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Ansuran Bulanan (RM)'}
                                value={'583.25'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Tempoh'}
                                value={'12 Bulan'}
                            ></TextField>
                        </div>
                    </div>
                </CustomTabContent>

                <!-- Jadual Pertama -->
                <CustomTabContent title="Jadual Pertama">
                    <SectionHeader title="Masukkan Maklumat Pembekal">
                        <FormButton type="add-supplier" onClick={addPembekal}
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
                                    disabled
                                    placeholder="Nama Pembekal"
                                    label="Nama Pembekal"
                                    bind:value={item.name}
                                ></TextField>
                                <TextField
                                    disabled
                                    placeholder="Alamat Pembekal"
                                    label="Alamat"
                                    bind:value={item.address}
                                ></TextField>
                            </div>
                        {/each}
                    </div>

                    <SectionHeader title="Masukkan Masukkan Maklumat Pembelian"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <TextField
                            {disabled}
                            id=""
                            label={'Jumlah Harga Belian (RM)'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Bayaran Baki (RM)'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Amaun Pembiayaan Kerajaan (RM)'}
                            value={'-'}
                        ></TextField>
                    </div>
                </CustomTabContent>

                <!-- Jadual Kedua -->
                <CustomTabContent title="Jadual Kedua">
                    <SectionHeader title="Masukkan Maklumat harga Jualan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <TextField
                            disabled
                            label={'Jumlah Harga Belian (RM)'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            disabled
                            label={'Bayaran Baki (RM)'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            disabled
                            label={'Amaun Pembiayaan dan Keuntungan Kerajaan (RM)'}
                            value={'-'}
                        ></TextField>
                    </div>

                    <SectionHeader
                        title="Masukkan Masukkan Amaun dan Keuntungan Kerajaan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <TextField
                            disabled
                            label="Amaun Pembiayaan dan Keuntungan Kerajaan"
                            value="-"
                        ></TextField>
                        <TextField
                            disabled
                            label={'Ansuran Bulanan (RM)'}
                            value={'583.25'}
                        ></TextField>
                        <TextField disabled label={'Tempoh'} value={'12 bulan'}
                        ></TextField>
                    </div></CustomTabContent
                >
            </CustomTab>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Senarai Semak Surat Perjanjian -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Senarai Semak Surat Perjanjian">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader
                    title=" Masukkan Maklumat Senarai Semak Surat Perjanjian "
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <RadioSingle {disabled} {options} legend={'Disediakan'}
                    ></RadioSingle>
                    <RadioSingle {disabled} {options} legend={'Disemak'}
                    ></RadioSingle>
                </div></StepperContentBody
            >
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Muat Turun Resit dan Invois -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title=" Muat Turun Resit dan Invois">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Dokumen Resit dan Invois "
                ></SectionHeader>
                <div class="flex w-full flex-col gap-2">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <p class={stepperFormTitleClass}>
                            Fail-fail yang dimuat naik:
                        </p>
                        <DownloadAttachment fileName="SALINAN RESIT"
                        ></DownloadAttachment>
                        <DownloadAttachment fileName="SALINAN INVOIS"
                        ></DownloadAttachment>
                    </div>
                </div></StepperContentBody
            >
        </StepperContent>
        <!-- =========================================================== -->
        <!-- Tetapan Sokongan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Tetapan Sokongan">
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft />
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Selesai"
                    form="sectionLeaderForm"
                >
                    <SvgCheck />
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Keputusan daripada Penyokong "
                ></SectionHeader>
                <div class="flex w-full flex-col gap-2.5">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <form
                            id="sectionLeaderForm"
                            use:sectionLeaderEnhance
                            method="POST"
                            class="flex w-full flex-col gap-2"
                        >
                            <p class={stepperFormTitleClass}>
                                Keputusan akan dihantar ke peranan - peranan
                                berkaitan:
                            </p>

                            <LongTextField
                                hasError={!!$sectionLeaderError.sectionLeaderRemark}
                                name="sectionLeaderRemark"
                                label={'Tindakan/ Ulasan'}
                                bind:value={$sectionLeaderForm.sectionLeaderRemark}
                            />
                            {#if $sectionLeaderError.sectionLeaderRemark}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$sectionLeaderError
                                        .sectionLeaderRemark[0]}</span
                                >
                            {/if}

                            <RadioSingle
                                name="sectionLeaderResult"
                                options={supportOptions}
                                bind:userSelected={$sectionLeaderForm.sectionLeaderResult}
                            />
                            {#if $sectionLeaderError.sectionLeaderResult}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$sectionLeaderError
                                        .sectionLeaderResult[0]}</span
                                >
                            {/if}
                        </form>
                    </div>
                </div>

                <SectionHeader
                    title=" Keputusan Daripada Peranan - Peranan Lain "
                ></SectionHeader>
                <div class="flex w-full flex-col gap-2.5">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <p class={stepperFormTitleClass}>Pelulus:</p>

                        <TextField
                            disabled
                            name="approverName"
                            label={'Nama'}
                            value={'Mustaqim Bin Ahmad.'}
                        ></TextField>

                        <p
                            class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                        >
                            ● Menunggu keputusan daripada PENYOKONG..
                        </p>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
