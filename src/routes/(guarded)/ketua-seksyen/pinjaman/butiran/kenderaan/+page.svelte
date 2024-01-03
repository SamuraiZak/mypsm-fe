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
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { loanOptions } from '$lib/mocks/pinjaman-kuarters/loanOptions';
    import type { DtoCalonPemangkuan } from '$lib/interfaces/database/actingApplication';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { onMount } from 'svelte';

    export let disabled: boolean = true;

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

    const supportOptions: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
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

    //Date Selector for Tarikh Lapor Diri
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

    let selectedCandidatesList: DtoCalonPemangkuan[] = [];

    let tempSelectedCandidatesList: DtoCalonPemangkuan[] = [];

    let currentData: any = {};

    let placeholderData: any = {};

    let editMode: boolean = false;

    //===================== Step 1 =====================
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

                <SectionHeader title=" Maklumat Calon "></SectionHeader>
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
                <SectionHeader title=" Dokumen Pinjaman "></SectionHeader>
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
                        <DropdownSelect
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
                </CustomTabContent>

                <!-- Jadual Pertama -->
                <CustomTabContent title="Jadual Pertama">
                    <SectionHeader
                        title="Masukkan Maklumat dan Perihal Kenderaan "
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <TextField
                                {disabled}
                                id=""
                                label={'No. Enjin'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'No. Casis'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Buatan'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Nama Model'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Kuasa Enjin'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Bahan Bakar'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Kelas Kegunaan'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Tahun Dibuat'}
                                value={'-'}
                            ></TextField>
                        </div>

                        <SectionHeader
                            title="Masukkan Butiran Penjualan/Tuan Asal"
                        ></SectionHeader>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <TextField
                                {disabled}
                                id=""
                                label={'Nama'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'No. K.P.'}
                                value={'-'}
                            ></TextField>
                            <TextField
                                {disabled}
                                id=""
                                label={'Alamat'}
                                value={'-'}
                            ></TextField>
                        </div>

                        <SectionHeader
                            title="Masukkan Masukkan Maklumat Pembelian"
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
                            id=""
                            label={'Jumlah Harga Belian (RM)'}
                            value={'-'}
                        ></TextField>
                        <TextField id="" label={'Bayaran Baki (RM)'} value={'-'}
                        ></TextField>
                        <TextField
                            id=""
                            label={'Amaun Pembiayaan dan Keuntungan Kerajaan (RM)'}
                            value={'-'}
                        ></TextField>
                    </div>

                    <SectionHeader title="Masukkan Masukkan Maklumat Pembelian"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
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
                            value={'12 bulan'}
                        ></TextField>
                    </div>
                </CustomTabContent>
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
        <!-- Kemaskini No. Chasis dan No. Enjin untuk Kenderaan Baru -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Kemaskini No. Chasis dan No. Enjin untuk Kenderaan Baru"
            >
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
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField {disabled} id="" label={'No. Chasis'} value={'-'}
                    ></TextField>
                    <TextField {disabled} id="" label={'No. Enjin'} value={'-'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Pemangkuan -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader
                title="Kemaskini No. Chasis dan No. Enjin untuk Kenderaan Baru"
            >
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
                <FormButton
                    type="done"
                    onClick={() => {
                        window.history.back();
                    }}
                ></FormButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <SectionHeader title=" Keputusan daripada Penyokong "
                ></SectionHeader>
                <div class="flex w-full flex-col gap-2.5">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <p class={stepperFormTitleClass}>
                            Keputusan akan dihantar ke peranan - peranan
                            berkaitan:
                        </p>

                        <LongTextField
                            id="tindakanUlasan"
                            label={'Tindakan/ Ulasan'}
                            value={'Butiran lengkap..'}
                        ></LongTextField>

                        <RadioSingle options={supportOptions} disabled />
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
                            id=""
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
