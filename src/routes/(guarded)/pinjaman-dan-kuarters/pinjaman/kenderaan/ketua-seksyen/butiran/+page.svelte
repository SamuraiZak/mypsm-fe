
<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
</script>








<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Pinjaman K34221B"
        
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
           
        >
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper dataId="#01" dataStatus="Draf">
        <!-- =========================================================== -->
        <!-- Maklumat Peminjam -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Peminjam">
                <TextIconButton
                    label="Seterusnya"
                    type=primary
                    
                >

                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Butiran Peminjam"></ContentHeader>

                <ContentHeader title=" Maklumat Calon "></ContentHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomTextField
                        disabled
                        id=""
                        label={'Nama Penuh'}
                        val={'Mohd Irfan Bin Abu'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'No. K/P'}
                        val={'890707-13-5667'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Tarikh Lahir'}
                        val={'12/5/1991'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Umur Pada Tarikh Memohon'}
                        val={'32'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Jawatan Sekarang'}
                        val={'Jurutektik'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Kumpulan Perkhidmatan'}
                        val={'Teknologi Maklumat'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Gred Jawatan'}
                        val={'F41'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Kementerian'}
                        val={'-'}
                    ></CustomTextField>
                    <CustomTextField disabled id="" label={'Jabatan'} val={'-'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Alamat Penuh Tempat Bertugas'}
                        val={'-'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                        val={'-'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Tarikh Persaraan Wajib'}
                        val={'-'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Gaji Pokok (RM)'}
                        val={'0'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Jumlah Elaun-elaun (RM)'}
                        val={'0'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Jumlah Potongan'}
                        val={'0'}
                    ></CustomTextField>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Maklumat Pinjaman -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Pinjaman">
                <TextIconButton
                    label="Kembali"
                
                >
                 
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    type=primary
                    
                >
                   
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Dokumen Pinjaman "></ContentHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomTextField
                        disabled
                        id=""
                        label={'Jenis Permohonan'}
                        val={'komputer'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Jumlah Yang Dipohon(RM)'}
                        val={'6,999.00'}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id=""
                        label={'Tempoh Pembayaran'}
                        val={'12 Bulan'}
                    ></CustomTextField>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Dokumen Sokongan yang Berkaitan  -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan yang Berkaitan">
                <TextIconButton
                    label="Kembali"
                    
                >
                  
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    type=primary
                   
                >
                    
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Dokumen Pinjaman "></ContentHeader>
                <div class="flex w-full flex-col gap-2">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <!-- <p class={stepperFormTitleClass}>
                            Fail-fail yang dimuat naik:
                        </p>
                        <DownloadAttachment fileName="SALINAN SEBUT HARGA"
                        ></DownloadAttachment>
                        <DownloadAttachment fileName="SALINAN KAD PENGENALAN"
                        ></DownloadAttachment>
                        <DownloadAttachment fileName="SLIP GAJI TERKINI"
                        ></DownloadAttachment> -->
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
                    label="Kembali"
                    
                >
                   
                </TextIconButton>
                <TextIconButton
                    type=primary
                    label="Simpan"
                    form="supporterAndApproverFormValidation"
                >
                   
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Masukkan Nama Penyokong dan Pelulus "
                ></ContentHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <!-- <form
                        id="supporterAndApproverFormValidation"
                        use:supporterAndApproverEnhance
                        method="POST"
                        class="flex w-full flex-col gap-2"
                    > -->
                        <CustomSelectField
                            id="supporterName"
                            label={'Nama Penyokong'}
                            val=""
                        ></CustomSelectField>
                     
                        <CustomSelectField
                            id="approverName"
                        
                           
                            label={'Nama Pelulus'}
                            val=""
                        ></CustomSelectField>
                       
                    <!-- </form> -->
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Pinjaman -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Pinjaman">
                <TextIconButton
                    label="Kembali"
                    
                >
                </TextIconButton>
            </StepperContentHeader>
            <CustomTab>
                <!-- Maklumat Kelaykan -->
                <CustomTabContent title="Maklumat Kelaykan">
                    <ContentHeader title="Maklumat Kelayakan"></ContentHeader>
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <p class="text-sm text-system-primary">
                            Gaji Pokok Sahaja
                        </p>
                        <CustomTextField
                            disabled
                           id=""
                            label={'Gaji Pokok (RM)'}
                            val={'2672.56'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                          
                            label={'Potongan (RM)'}
                            val={'2,000.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Baki (RM)'}
                            val={'-'}
                        ></CustomTextField>
                    </div>

                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <p class="text-sm text-system-primary">
                            Gaji Pokok Sahaja
                        </p>
                        <CustomTextField
                            disabled
                            id=""
                           
                            label={'Gaji Pokok dan Elaun (RM)'}
                            val={'2672.56'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                           id=""
                            label={'Potongan (RM)'}
                            val={'2,000.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                         id=""
                            label={'Potongan Baru (RM)'}
                            val={'-'}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id=""
                            label={'Baki (RM)'}
                            val={'-'}
                        ></CustomTextField>
                    </div>
                </CustomTabContent>

                <!-- Maklumat Kelulusan dan Tawaran -->
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                    <ContentHeader title="Maklumat Kelulusan dan Tawaran"
                        ><TextIconButton
                            type=primary
                            label="Simpan"
                            form="approvalAndOfferForm"
                            ></TextIconButton
                        ></ContentHeader
                    >
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <!-- <form
                            id="approvalAndOfferForm"
                            method="POST"
                            use:approvalAndOfferDetailEnhance
                            class="flex w-full flex-col gap-2"
                        > -->
                            <CustomSelectField
                                id=""
                              
                                label="Jenis Belian"
                               val=""
                            />
                            
                        <!-- </form> -->
                        <CustomTextField
                            disabled
                            id=""
                            label={'Harga Belian Dengan Kerajaan (RM)'}
                            val={'10,000.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Bayaran Muka (RM)'}
                            val={'2,000.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)'}
                            val={'500.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Amaun Pembiayaan Kerajaan (RM)'}
                            val={'501.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Harga Jualan Kepada Pegawai(RM)'}
                            val={'6,999.00'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Ansuran Bulanan (RM)'}
                            val={'583.25'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Tempoh'}
                            val={'12 Bulan'}
                        ></CustomTextField>
                    </div>
                </CustomTabContent>

                <!-- Jadual Pertama -->
                <CustomTabContent title="Jadual Pertama">
                    <ContentHeader
                        title="Masukkan Maklumat dan Perihal Kenderaan "
                    ></ContentHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <CustomTextField
                                disabled
                                id=""
                                label={'No. Enjin'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'No. Casis'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Buatan'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Nama Model'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Kuasa Enjin'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Bahan Bakar'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Kelas Kegunaan'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Tahun Dibuat'}
                                val={'-'}
                            ></CustomTextField>
                        </div>

                        <ContentHeader
                            title="Masukkan Butiran Penjualan/Tuan Asal"
                        ></ContentHeader>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <CustomTextField
                                disabled
                                id=""
                                label={'Nama'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'No. K.P.'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Alamat'}
                                val={'-'}
                            ></CustomTextField>
                        </div>

                        <ContentHeader
                            title="Masukkan Masukkan Maklumat Pembelian"
                        ></ContentHeader>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <CustomTextField
                                disabled
                                id=""
                                label={'Jumlah Harga Belian (RM)'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Bayaran Baki (RM)'}
                                val={'-'}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id=""
                                label={'Amaun Pembiayaan Kerajaan (RM)'}
                                val={'-'}
                            ></CustomTextField>
                        </div>
                    </div>
                </CustomTabContent>

                <!-- Jadual Kedua -->
                <CustomTabContent title="Jadual Kedua">
                    <ContentHeader title="Masukkan Maklumat harga Jualan"
                        ><TextIconButton
                            type=primary
                            label="Simpan"
                            form="secondScheduleFormValidation"
                            ></TextIconButton
                        ></ContentHeader
                    >
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <!-- <form
                            id="secondScheduleFormValidation"
                            method="POST"
                            use:secondScheduleEnhance
                            class="flex w-full flex-col gap-2"
                        > -->
                            <CustomTextField
                               
                                id="purchasePrice"
                                label="Jumlah Harga Belian (RM)"
                                val=""
                            ></CustomTextField>
                            
                            <CustomTextField
                               
                                id="balancePayment"
                                label="Bayaran Baki (RM)"
                               val=""
                            ></CustomTextField>
                           
                            <CustomTextField
                                
                                id="govermentFundingAndProfitAmount"
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                             val=""
                            ></CustomTextField>
                        
                        <!-- </form> -->
                    </div>

                    <ContentHeader title="Masukkan Masukkan Maklumat Pembelian"
                    ></ContentHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <CustomTextField
                            disabled
                            id=""
                            label={'Ansuran Bulanan (RM)'}
                            val={'583.25'}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Tempoh'}
                            val={'12 bulan'}
                        ></CustomTextField>
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
                    label="Kembali"
                   
                >
                
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    type=primary
                  
                >
                   
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader
                    title=" Masukkan Maklumat Senarai Semak Surat Perjanjian "
                ></ContentHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomRadioBoolean disabled  label={'Disediakan'}
                    ></CustomRadioBoolean>
                    <CustomRadioBoolean disabled  label={'Disemak'}
                    ></CustomRadioBoolean>
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
                    label="Kembali"
                  
                >
                    
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    type=primary
                   
                >
                   
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Dokumen Pinjaman "></ContentHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomTextField disabled id="" label={'No. Chasis'} val={'-'}
                    ></CustomTextField>
                    <CustomTextField disabled id="" label={'No. Enjin'} val={'-'}
                    ></CustomTextField>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Muat Turun Resit dan Invois -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Muat Turun Resit dan Invois">
                <TextIconButton
                    label="Kembali"
                   
                >
                  
                </TextIconButton>
                <TextIconButton
                    label="Kembali"
                    
                >
                    
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    type=primary
                    
                >
                    
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Dokumen Pinjaman "></ContentHeader>
                <div class="flex w-full flex-col gap-2">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <!-- <p class={stepperFormTitleClass}>
                            Fail-fail yang dimuat naik:
                        </p>
                        <DownloadAttachment fileName="SALINAN RESIT"
                        ></DownloadAttachment>
                        <DownloadAttachment fileName="SALINAN INVOIS"
                        ></DownloadAttachment> -->
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
                    
                >
                  
                </TextIconButton>
                <TextIconButton
                    type=primary
                    label="Selesai"
                    form="sectionLeaderForm"
                >
                    
                </TextIconButton>
            </StepperContentHeader>

            <!-- Butiran -->
            <StepperContentBody>
                <ContentHeader title=" Keputusan daripada Penyokong "
                ></ContentHeader>
                <div class="flex w-full flex-col gap-2.5">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <!-- <form
                            id="sectionLeaderForm"
                            use:sectionLeaderEnhance
                            method="POST"
                            class="flex w-full flex-col gap-2"
                        > -->
                            <p >
                                Keputusan akan dihantar ke peranan - peranan
                                berkaitan:
                            </p>

                            <CustomTextField
                                id="sectionLeaderRemark"
                                label={'Tindakan/ Ulasan'}
                               val=""
                            />

                            <CustomRadioBoolean
                                id="sectionLeaderResult"
                               val=""
                            />
                            
                        <!-- </form> -->
                    </div>
                </div>

                <ContentHeader
                    title=" Keputusan Daripada Peranan - Peranan Lain "
                ></ContentHeader>
                <div class="flex w-full flex-col gap-2.5">
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <p>Pelulus:</p>

                        <CustomTextField
                            id="approverName"
                            disabled
                            label={'Nama'}
                            val={'Mustaqim Bin Ahmad.'}
                        ></CustomTextField>

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
