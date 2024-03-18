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
        title="Semak Maklumat Pinjaman "
   
        ><TextIconButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></TextIconButton></ContentHeader
    >
</section>

<Stepper
>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam"
            ><TextIconButton
             
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <CustomTextField
            id=""
              disabled
                label={'Nama Penuh'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'No. K/P'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Tarikh Lahir'}
               val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Umur Pada Tarikh Memohon'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Jawatan Sekarang'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Kumpulan Perkhidmatan'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Gred Jawatan'}
                val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Kementerian'} val={'-'}
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Jabatan'} val={'-'}
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Alamat Penuh Tempat Bertugas'}
                val={'-'}
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Tarikh Pengesahan Dalam Perkhidmatan'}
              val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Tarikh Persaraan Wajib'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Gaji Pokok'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Jumlah Elaun-elaun'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Jumlah Potongan'}
                val=""
            ></CustomTextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pinjaman"
            ><TextIconButton
                type="back"
                
            ></TextIconButton>

            <TextIconButton
                
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <CustomTextField
            id=""
              disabled
                label={'Jenis Permohonan'}
                val=""
            ></CustomTextField>
            <CustomTextField
            id=""
              disabled
                label={'Jumlah yang Dipohon (RM)'}
                val=""
            ></CustomTextField>
            <CustomSelectField
            id=""
              disabled
               
                label={'Tempoh Pembayaran'}
                val=""
            ></CustomSelectField></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan yang Berkaitan"
            ><TextIconButton
                type="back"
                
            ></TextIconButton>

            <TextIconButton
                
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Dokumen Sokongan"
                    >
                    <!-- <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div> -->
                    </ContentHeader
                >
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>
                <!-- <DownloadAttachment fileName="SALINAN SEBUT HARGA.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN KAD PENGENALAN.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SLIP GAJI TERKINI.pdf"
                ></DownloadAttachment> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus Peminjam"
            ><TextIconButton
                type="back"
               
            ></TextIconButton><TextIconButton
                type="save"
                
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Masukkan Nama Penyokong dan Pelulus"
                ></ContentHeader>
                <CustomSelectField
                  disabled
                  id=""
                    label={'Nama Penyokong'}
                   
                    val=""
                ></CustomSelectField>
                <CustomSelectField
                  disabled
                  id=""
                    label={'Nama Pelulus'}
                    
                    val=""
                ></CustomSelectField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pinjaman"
            ><TextIconButton
                type="back"
               
            ></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <CustomTab>
                <CustomTabContent title="Maklumat Kelayakan">
                    <ContentHeader title="Maklumat Kelayakan">
                        <TextIconButton
                           type= primary
                            label="Simpan"
                            form="qualificationDetailForm"
                            ></TextIconButton
                        >
                    </ContentHeader>
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <p class="text-sm text-system-primary">
                            Gaji Pokok Sahaja
                        </p>
                        <!-- <form
                            id="qualificationDetailForm"
                            method="POST"
                            use:qualificationDetailEnhance
                            class="flex w-full flex-col gap-2"
                        > -->
                            <CustomTextField
                              disabled
                              id=""
                               
                               
                                label={'Gaji Pokok (RM)'}
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                type="number"
                              
                                id="baseSalaryOnlyDeduction"
                                label={'Potongan (RM)'}
                               val=""
                            ></CustomTextField>
                         
                            <CustomTextField
                              disabled
                                type="number"
                                id=""
                                label={'Baki (RM)'}
                                val=""
                            ></CustomTextField>
                            <p class="text-sm text-system-primary">
                                Gaji Pokok dan Elaun
                            </p>
                            <CustomTextField
                              disabled
                              id=""
                                label={'Gaji Pokok dan Elaun (RM)'}
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                type="number"
                                id=""
                                label={'Potongan (RM)'}
                               val=""
                            ></CustomTextField>
                            <CustomTextField
                                type="number"
                                id=""
                                label={'Potongan Baru (RM)'}
                            val=""
                            ></CustomTextField>
                            
                            <CustomTextField
                              disabled
                                type="number"
                                id=""
                                label={'Baki (RM)'}
                                val=""
                            ></CustomTextField>
                        <!-- </form> -->
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                    <ContentHeader
                        title="Maskkan Maklumat Kelulusan dan Tawaran"
                    >
                        <TextIconButton
                            type=primary
                            label="Simpan"
                            form="approvalAndOfferForm"
                            > </TextIconButton
                        >
                    </ContentHeader>
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
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
                            ></CustomSelectField>
                           
                            <CustomTextField
                            id=""
                                type="number"
                                label="Harga Belian Dengan Kerajaan (RM)"
                                val=""
                            ></CustomTextField>
                            
                            <CustomTextField
                            id=""
                                type="number"
                                label="Bayaran Muka (RM)"
                               val=''
                            ></CustomTextField>
                        
                            <CustomTextField
                            id=""
                                type="number"
                                label="Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)"
                              val=""
                            ></CustomTextField>
                           
                            <CustomTextField
                            id=""
                                type="number"
                                label="Amaun Pembiayaan Kerajaan (RM)"
                              val=""
                            ></CustomTextField>
                          
                            <CustomTextField
                            id=""
                                type="number"
                                label="Harga Jualan Kepada Pegawai (RM)"
                               val=""
                            ></CustomTextField>
                          
                            <CustomTextField
                            id=""
                                type="number"
                                label="Ansuran Bulanan (RM)"
                                val=""
                            ></CustomTextField>
                           
                            <CustomTextField
                            id=""
                                label="Tarikh Mula"
            val=""
                            ></CustomTextField>
                           
                            <CustomTextField
                            id=""
                                label="Tempoh"
                               val=""
                            ></CustomTextField>
                           
                        <!-- </form> -->
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Jadual Pertama">
                    <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                        <ContentHeader
                            title="Masukkan Maklumat dan Perihal Kenderaan"
                        >
                            <TextIconButton
                                type=primary
                                label="Simpan"
                                form="vehicleDetailAndDescriptionForm"
                                ></TextIconButton
                            >
                        </ContentHeader>
                        <!-- <form
                            id="vehicleDetailAndDescriptionForm"
                            method="POST"
                            use:vehicleDetailAndDescriptionEnhance
                            class="flex w-full flex-col gap-2"
                        > -->
                            <CustomTextField
                             
                                id="engineNo"
                                label="No. Enjin"
                                val=""
                            />
                            <CustomTextField
                               
                                id="chasisNo"
                                label="No. Casis"
                                val=""
                            />
                            <CustomTextField
                                
                                id="brand"
                                label="Buatan"
                               val=""
                            />
                            <CustomTextField
                               
                                id="modelName"
                                label="Nama Model"
                             val=''
                            />
                            <CustomTextField
                              
                                id="enginePower"
                                label="Kuasa Enjin"
                                val=""
                            />
                            <CustomTextField
                                id="fuel"
                                label="Bahan Bakar"
                                val=""
                            />
                            <CustomTextField
                               
                                id="utilityClass"
                                label="Kelas Kegunaan"
                               val=""
                            />
                            <CustomTextField
                              
                                id="bodyType"
                                label="Jenis Badan"
                              val=''
                            />
                            <CustomTextField
                               
                                id="yearMade"
                                label="Tahun Dibuat"
                                val=""
                            />
                            <ContentHeader
                                title="Masukkan Butiran Penjualan/Tuan Asal"
                            ></ContentHeader>
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <CustomTextField
                                  
                                    id="previousOwnerName"
                                    label="Nama"
                                   val=""
                                />
                                <CustomTextField
                                   
                                    id="identificationNo"
                                    label="No. K/P"
                                    val=""
                                />
                                <CustomTextField
                                  
                                    id="address"
                                    label="Alamat"
                                   val=""
                                />
                            </div>
                            <ContentHeader
                                title="Masukkan Harga Belian Kenderaan"
                            ></ContentHeader>
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <CustomTextField
                                   
                                    id="totalPurchasePrice"
                                    label="Jumlah Harga Belian (RM)"
                                   val=""
                                />
                                <CustomTextField
                                  
                                    id="balancePayment"
                                    label="Bayaran Baki (RM)"
                                   val=""
                                />
                                <CustomTextField
                                   
                                    id="govermentFundingAmount"
                                    label="Amaun Pembiayaan Kerajaan (RM)"
                                    val=""
                                />
                            </div>
                        <!-- </form> -->
                    <!-- {:else} -->
                        <ContentHeader title="Masukkan Maklumat Pembekal">
                            <TextIconButton
                                type="add-supplier"
                                
                            ></TextIconButton>
                            <TextIconButton
                                type=primary
                                label="Simpan"
                                form="vehicleDetailAndDescriptionForm"
                                ></TextIconButton
                            >
                        </ContentHeader>

                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <!-- {#each suppliers as item, index} -->
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                                >
                                    <div
                                        class="flex w-full items-start justify-between"
                                    >
                                        <!-- <p class="text-sm text-system-primary">
                                            Pembekal #{index + 1}
                                        </p> -->
                                        <!-- {#if index != 0}
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
                                        {/if} -->
                                    </div>
                                    <CustomTextField
                                    id=""
                                        placeholder="Nama Pembekal"
                                        label="Nama Pembekal"
                                       val=""
                                    ></CustomTextField>
                                    <CustomTextField
                                    id=""
                                        placeholder="Alamat Pembekal"
                                        label="Alamat"
                                        val=""
                                    ></CustomTextField>
                                </div>
                            <!-- {/each} -->
                        </div>
                        <ContentHeader title="Masukkan Maklumat Pembelian"
                        ></ContentHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <!-- <form
                                id="vehicleDetailAndDescriptionForm"
                                method="POST"
                                use:vehicleDetailAndDescriptionEnhance
                                class="flex w-full flex-col gap-2"
                            > -->
                                <CustomTextField
                                id=""
                                    label="Jumlah Harga Belian (RM)"
                                  val=""
                                />
                               
                                <CustomTextField
                                    
                                    id="balancePayment"
                                    label="Bayaran Baki (RM)"
                                   val=""
                                />
                                
                                <CustomTextField
                                
                                    id="govermentFundingAmount"
                                    label="Amaun Pembiayaan Kerajaan (RM)"
                                   val=""
                                />
                                
                            <!-- </form> -->
                        </div>
                    <!-- {/if} -->
                </CustomTabContent>
                <CustomTabContent title="Jadual Kedua">
                    <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                        <ContentHeader
                            title="Masukkan Maklumat Harga Jualan (RM)"
                        >
                            <TextIconButton
                                type=primary
                                label="Simpan"
                                form="secondScheduleFormValidation"
                                ></TextIconButton
                            ></ContentHeader
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
                            
                            <ContentHeader
                                title="Masukkan Amaun dan Tempoh Bayaran Balik Harga Jualan"
                            ></ContentHeader>
                            <CustomTextField
                                
                                id="monthlyAmount"
                                label="Amaun Bulanan (RM)"
                               val=""
                            ></CustomTextField>
                           
                            <CustomSelectField
                                
                                id="paymentDuration"
                               
                                label={'Tempoh Pembayaran'}
                               val=""
                            ></CustomSelectField>
                          
                        <!-- </form> -->
                    <!-- {:else} -->
                        <ContentHeader
                            title="Masukkan Maklumat Harga Jualan (RM)"
                        >
                            <TextIconButton
                                type=primary
                                label="Simpan"
                                form="secondScheduleFormValidation"
                                ></TextIconButton
                            ></ContentHeader
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
                            />
                           
                            <CustomTextField
                              
                                id="balancePayment"
                                label="Bayaran Baki (RM)"
                                val=""
                            />
                           
                            <CustomTextField
                               
                                id="govermentFundingAndProfitAmount"
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                val=""
                            />
                            
                            <ContentHeader
                                title="Masukkan Maklumat Amaun dan Keuntungan Kerajaan (RM)"
                            ></ContentHeader>
                            <CustomTextField
                               
                                id="govermentFundingAndProfitAmountDetail"
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan"
                              val=""
                            />
                           
                            <CustomTextField
                              
                                id="govermentBalancePayment"
                                label="Bayaran Baki (RM)"
                                val=""
                            />
                           
                            <CustomSelectField
                               
                                id="paymentDuration"
                                
                                label={'Tempoh Pembayaran'}
                                val=""
                            />
                            
                        <!-- </form> -->
                    <!-- {/if} -->
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Senarai Semak Surat Perjanjian"
            ><TextIconButton
                type="back"
               
            ></TextIconButton>
            <TextIconButton
                type=primary
                label="Simpan"
                form="letterOfAgreementFormValidation"
                ></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <ContentHeader
                title="Masukkan Maklumat Senarai Semak Surat Perjanjian"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <!-- <form
                    id="letterOfAgreementFormValidation"
                    use:letterOfAgreementEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                > -->
                    <CustomRadioBoolean
                        id="received"
                        label="Diterima"
                       val=""
                    ></CustomRadioBoolean>
                    
                    <CustomRadioBoolean
                        id="checked"
                        label="Disemak"
                        val=""
                    ></CustomRadioBoolean>
                    
                <!-- </form> -->
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Resit dan Invois"
            ><TextIconButton
                type="back"
                
            ></TextIconButton><TextIconButton
                type="done"
              
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Dokumen Resit dan Invois"
                    >
                    <!-- <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div> -->
                    </ContentHeader
                >
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>
                <!-- <DownloadAttachment fileName="SALINAN RESIT.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN INVOIS.pdf"
                ></DownloadAttachment> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapan Pelulus"
            ><TextIconButton
                type="back"
               
            ></TextIconButton>
            <TextIconButton
                type=primary
                label="Simpan"
                form="supporterAndApproverFormValidation"
            >
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
            >
                <ContentHeader title="Keputusan Dari Pelulus"></ContentHeader>
                <!-- <form
                    id="supporterAndApproverFormValidation"
                    use:supporterAndApproverEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                > -->
                    <CustomTextField
                       
                        id="approverRemark"
                        label="Tindakan / Ulasan"
                        val=""
                    />
                   
                    <CustomRadioBoolean
                        id="approverService"
                       val=""
                        label="Perkhidmatan"
                    />
                 
                <!-- </form> -->
            </div>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
            >
                <ContentHeader title="Keputusan Dari Penyokong"></ContentHeader>

                <CustomTextField
                id=""
                  disabled
                    label="Nama Penyokong"
                    val={'Ramli bin Mat'}
                ></CustomTextField>
                <CustomTextField
                id=""
                  disabled
                    label="Tindakan / Ulasan"
                    val={'Pemohon layak menduduki kuarters.'}
                ></CustomTextField>

                <!-- <BadgeField {disabled} label="Keputusan"></BadgeField> -->
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
