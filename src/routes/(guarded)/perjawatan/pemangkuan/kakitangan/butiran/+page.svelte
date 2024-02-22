<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    let stepperIndex: number = 0;
    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Butiran Tawaran Pemangkuan" />
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId="PMGK-1234"
        dataStatus="Sedang Diproses"
    >
        <StepperContent>
            <StepperContentHeader title="Panggilan Temuduga">
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col gap-2.5 pb-10">
                    <ContentHeader
                        title="Butiran Temuduga"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Surat Panggilan Temuduga"
                        id="interviewCallingLetter"
                        type="text"
                        val="surat_panggilan_temuduga_irfan.pdf"
                    />
                    <CustomTextField
                        label="Borang Perakuan Pendidikan"
                        id="institutionDeclarationForm"
                        type="text"
                        val="borang_perakuan_pendidikan.pdf"
                    />
                    <CustomTextField
                        label="Dokumen Tambahan"
                        id="extraDocument"
                        type="text"
                        val="dokumen_tambahan.pdf"
                    />
                    <div class="flex flex-col pb-2.5">
                        <span
                            class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                            >Tahniah! Anda berjaya dipanggil untuk temuduga.</span
                        >
                        <span
                            class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                        >
                            Sila hadirkan diri ke temuduga mengikut butiran
                            temuduga seperti yang tertera di atas.
                        </span>
                        <span
                            class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                            >Sila bawa dokumen yang berkaitan ke temuduga
                            tersebut.</span
                        >
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col gap-2.5 pb-10">
                    <ContentHeader
                        title="Butiran Pemangkuan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Gred"
                        id="grade"
                        type="text"
                        val="N32"
                    />
                    <CustomTextField
                        label="Jawatan"
                        id="position"
                        type="text"
                        val="Setiausaha Pejabat"
                    />
                    <CustomTextField
                        label="Tarikh Berkuatkuasa"
                        id="effectiveDate"
                        type="text"
                        val="23/02/2024"
                    />
                    <CustomTextField
                        label="Penempatan Baru"
                        id="newPlacement"
                        type="text"
                        val="LKIM SARAWAK - KUCHING"
                    />

                    <ContentHeader
                        title="Dokumen-dokumen yang perlu dimuat turun dan diisi"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Surat Tawaran Pemangkuan"
                        id="actingOfferLetter"
                        type="text"
                        val="surat_tawaran_pemangkuan.pdf"
                    />
                    <CustomTextField
                        label="Surat Setuju Terima"
                        id="acceptanceLetter"
                        type="text"
                        val="surat_setuju_terima.pdf"
                    />
                    <CustomTextField
                        label="Surat Lapor Diri"
                        id="reportingForm"
                        type="text"
                        val="borang_lapor_diri.pdf"
                    />
                    <CustomTextField
                        label="Nota Serah Tugas"
                        id="assignTaskNote"
                        type="text"
                        val="nota_serah_tugas.pdf"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col gap-2.5 pb-10">
                    <ContentHeader
                        title="Permohonan Penangguhan/Pindaan Penempatan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Adakah anda memerlukan penangguhan/pindaan penempatan?"
                        id="amendmentRequest"
                        type="text"
                        val="Ya"
                    />
                    <CustomTextField
                        label="Tarikh Lapor Diri yang Dipohon"
                        id="requestedReportingDate"
                        type="text"
                        val="23/02/2024"
                    />
                    <CustomTextField
                        label="Pindaan Penempatan Dipohon"
                        id="requestedPlacementAmendment"
                        type="text"
                        val="dropdown here"
                    />
                    <ContentHeader
                        title="Dokumen-Dokumen yang Berkaitan"
                        borderClass="border-none"
                    />
                    <!-- upload file here -->
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            >
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col gap-2.5 pb-10">
                    <ContentHeader
                        title="Butiran Permohonan Penangguhan/Pindaan Penempatan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Adakah Anak Memerlukan Penangguhan?"
                        id="amendmentRequest"
                        type="text"
                        val="Ya"
                    />
                    <CustomTextField
                        label="Alasan Penangguhan"
                        id="postponeReason"
                        type="text"
                        val="Urusan pindah rumah dan hantar anak ke klinik"
                    />
                    <CustomTextField
                        label="Tarikh Lapor Diri Yang Dipohon"
                        id="requestedReportingDate"
                        type="text"
                        val="22/02/2024"
                    />
                    <CustomTextField
                        label="Pindaan Penempatan Dipohon"
                        id="requestedPlacementAmendment"
                        type="text"
                        val="Bahagian Teknologi"
                    />
                    <ContentHeader
                        title="Keputusan Mesyuarat"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Keputusan"
                        id="postponeResult"
                        type="text"
                        val="Lulus"
                    />
                    <CustomTextField
                        label="Kelulusan Pindaan Penempatan Dipohon"
                        id="approvedRequestedPlacementAmendment"
                        type="text"
                        val="Bahagian Teknologi"
                    />
                    <CustomTextField
                        label="Kelulusan Tarikh Lapor Diri Baru"
                        id="approvedNewReportingDate"
                        type="text"
                        val="22/02/2024"
                    />
                    <CustomTextField
                        label="Surat Penangguhan Rayuan"
                        id="postponeAppealLetter"
                        type="text"
                        val="surat_kelulusan_penangguhan_rayuan.pdf"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Akhir Pemangkuan">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Selesai"
                    icon="check"
                    onClick={() => {}}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col gap-2.5 pb-20">
                    <ContentHeader
                        title="Butiran Pemangkuan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Gred"
                        id="grade"
                        type="text"
                        val="N32"
                    />
                    <CustomTextField
                        label="Jawatan"
                        id="position"
                        type="text"
                        val="Setiausaha Pejabat"
                    />
                    <CustomTextField
                        label="Tarikh Berkuatkuasa"
                        id="effectiveDate"
                        type="text"
                        val="22/02/2024"
                    />
                    <CustomTextField
                        label="Penempatan Baru"
                        id="newPlacem,ent"
                        type="text"
                        val="LKIM SARAWAK - KUCHING"
                    />
                    <CustomTextField
                        label="Pengarah Baru"
                        id="newDirector"
                        type="text"
                        val="Lionel Messi"
                    />
                    <CustomTextField
                        label="Tarikh Lapor Diri"
                        id="reportingDate"
                        type="text"
                        val="23/02/2024"
                    />
                    <ContentHeader
                        title="Pengesahan Keputusan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Nama Penyokong"
                        id="supporterName"
                        type="text"
                        val="Cristiano Ronaldo"
                    />
                    <CustomTextField
                        label="Keputusan"
                        id="supporterResult"
                        type="text"
                        val="Disokong"
                    />
                    <CustomTextField
                        label="Nama Pelulus"
                        id="approverName"
                        type="text"
                        val="Gareth Bale"
                    />
                    <CustomTextField
                        label="Keputusan"
                        id="approverResult"
                        type="text"
                        val="Diluluskan"
                    />
                    <span
                        class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                        >Tahniah! Anda boleh menyemak perubahan pada gaji dan
                        buku rekod perkhidmatan anda. Sila hubungi Urus Setia
                        berkenaan jika ada sebarang pertanyaan mengenai
                        perubahan tersebut.</span
                    >
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
