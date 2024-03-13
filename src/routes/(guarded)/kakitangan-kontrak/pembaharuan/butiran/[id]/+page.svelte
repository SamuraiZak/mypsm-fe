<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import type { PageData } from './$types';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/kakitangan-kontrak/pembaharuan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Peribadi Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTextField
                        label="Nama Penuh"
                        id="name"
                        disabled
                        val=""
                    />
                    <CustomSelectField
                        label="Gelaran Nama"
                        id="titleId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        disabled
                        placeholder="Fiq"
                        val=""
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        disabled
                        val=""
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomTextField label="Emel" id="email" disabled val="" />
                    <CustomTextField
                        label="No. Telefon Bimbit"
                        disabled
                        id="phoneNumber"
                        val=""
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        disabled
                        type="date"
                        val=""
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Warganegara"
                        id="nationalityId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Agama"
                        id="religionId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Etnik"
                        id="ethnicId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomTextField
                        label="Alamat Rumah"
                        id="homeAddress"
                        disabled
                        val=""
                    />
                    <CustomSelectField
                        label="Bandar Alamat Rumah"
                        id="homeCityId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Negeri Alamat Rumah"
                        id="homeStateId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomSelectField
                        label="Negara Alamat Rumah"
                        id="homeCountryId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <CustomTextField
                        label="Poskod Alamat Rumah"
                        id="homePostcode"
                        disabled
                        val=""
                    />
                    <div class="flex w-full flex-col justify-items-start gap-2">
                        <!-- {#if !data.viewOnly}
                            <Checkbox
                                bind:checked={sameAddress}
                                class="text-ios-labelColors-secondaryLabel-light"
                                >Sama dengan Alamat Rumah</Checkbox
                            >
                        {/if} -->
                        <CustomTextField
                            label="Alamat Surat Menyurat"
                            disabled
                            id="mailAddress"
                            val=""
                        />
                        <CustomSelectField
                            label="Bandar Alamat Surat Menyurat"
                            disabled
                            options={data.inputOption.meetingNameOption}
                            id="mailCityId"
                            val=""
                        />
                        <CustomSelectField
                            label="Negeri Alamat Surat Menyurat"
                            disabled
                            options={data.inputOption.meetingNameOption}
                            id="mailStateId"
                            val=""
                        />
                        <CustomSelectField
                            label="Negara Alamat Surat Menyurat"
                            disabled
                            options={data.inputOption.meetingNameOption}
                            id="mailCountryId"
                            val=""
                        />
                        <CustomTextField
                            label="Poskod Alamat Surat Menyurat"
                            disabled
                            id="mailPostcode"
                            val=""
                        />
                    </div>
                    <CustomSelectField
                        id="assetDeclarationStatusId"
                        disabled
                        label="Status Pengikstiharan Harta"
                        val=""
                        options={data.inputOption.meetingNameOption}
                    />

                    <!-- {#if $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 12 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 14 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 15 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 17 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 18 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 22} -->
                    <CustomTextField
                        id="propertyDeclarationDate"
                        disabled
                        type="date"
                        label="Tarikh Pengikstiharan Harta"
                        val=""
                    />
                    <!-- {/if} -->
                    <CustomRadioBoolean
                        disabled
                        id="isExPoliceOrSoldier"
                        label="Bekas Polis/Tentera"
                        val=""
                    />
                    <CustomRadioBoolean
                        disabled
                        id="isInternalRelationship"
                        label="Perhubungan Dengan Kakitangan LKIM"
                        val=""
                    />
                    <!-- {#if $editNewContractEmployeeDetailForm.isInternalRelationship} -->
                    <CustomTextField
                        label="Nama Kakitangan LKIM"
                        id="employeeNumber"
                        disabled
                        val=""
                    />
                    <CustomSelectField
                        label="Hubungan Kakitangan LKIM"
                        id="relationshipId"
                        disabled
                        options={data.inputOption.meetingNameOption}
                        val=""
                    />
                    <!-- {/if} -->
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Akademik/Kelayakan/Latihan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTab>
                        <CustomTabContent title="Maklumat 1">
                            <CustomTextField
                                label="Institusi/Sekolah"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Tahun"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Gred/Pencapaian"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Bidang"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Catatan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                        </CustomTabContent>
                    </CustomTab>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pengalaman"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTab>
                        <CustomTabContent title="Maklumat 1">
                            <CustomTextField
                                label="Nama Majikan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Alamat Majikan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Jawatan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Kod Jawatan (Jika Ada)"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Gaji"
                                id=""
                                type="number"
                                val={''}
                                errors={['']}
                            />
                        </CustomTabContent>
                    </CustomTab>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kegiatan/Keahlian"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTab>
                        <CustomTabContent title="Maklumat 1">
                            <CustomTextField
                                label="Nama Pertubuhan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Tarikh Masuk"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Keterangan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                        </CustomTabContent>
                    </CustomTab>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Keluarga"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTab>
                        <CustomTabContent title="Keluarga 1">
                            <CustomTextField
                                label="Nama"
                                id="name"
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Tarikh Lahir"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomSelectField
                                label="Jantina"
                                id=""
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomRadioBoolean label="Bersekolah" id="" />
                        </CustomTabContent>
                    </CustomTab>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Maklumat Tanggungan Selain Pasangan dan Anak"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTab>
                        <CustomTabContent title="Tanggungan 1">
                            <CustomTextField
                                label="Nama"
                                id="name"
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Tarikh Lahir"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomSelectField
                                label="Jantina"
                                id=""
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomRadioBoolean label="Bersekolah" id="" />
                        </CustomTabContent>
                    </CustomTab>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Waris"></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTab>
                        <CustomTabContent title="Waris 1">
                            <CustomTextField
                                label="Nama"
                                id="name"
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identityDocumentNumber"
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Tarikh Lahir"
                                id="birthDate"
                                type="date"
                                val={''}
                                errors={['']}
                            />
                            <!-- {#if $nextOfKinDetailForm.maritalId === 3} -->
                            <CustomTextField
                                label="Tarikh Perkahwinan"
                                id="marriageDate"
                                type="date"
                                val={''}
                                errors={['']}
                            />
                            <!-- {/if} -->
                            <CustomSelectField
                                label="Kewarganegaraan"
                                id="nationalityId"
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomSelectField
                                label="Jenis Kad Pengenalan"
                                id="identityDocumentColor"
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="No. Telefon"
                                id="phoneNumber"
                                val={''}
                                errors={['']}
                            />
                            <CustomSelectField
                                label="Jantina"
                                id="genderId"
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Pekerjaan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Nama Majikan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="Alamat Majikan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomTextField
                                label="No. Cukai Pendapatan"
                                id=""
                                val={''}
                                errors={['']}
                            />
                            <CustomRadioBoolean
                                label="Pertalian Dengan Kakitangan LKIM"
                                id=""
                            />
                            <CustomSelectField
                                label="Nama Kakitangan LKIM"
                                id=""
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomSelectField
                                label="Jawatan Kakitangan LKIM"
                                id=""
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                            <CustomSelectField
                                label="Hubungan"
                                id="relationshipId"
                                options={data.inputOption.meetingNameOption}
                                val={''}
                                errors={['']}
                            />
                        </CustomTabContent>
                    </CustomTab>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen-Dokumen Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span class="text-sm text-ios-labelColors-link-light"
                        >Dokumen-dokumen yang perlu diisi oleh kakitangan:</span
                    >
                    <DownloadAttachment
                        fileName="Surat perjanjian kontrak.pdf"
                    />
                    <DownloadAttachment
                        fileName="Surat sumpah bukan penagih dadah.pdf"
                    />
                    <DownloadAttachment fileName="Akuan berkanun.pdf" />
                    <DownloadAttachment fileName="Surat aku janji.pdf" />
                    <DownloadAttachment fileName="Borang perubatan.pdf" />
                    <DownloadAttachment
                        fileName="Perakuan untuk ditandatangani oleh penjawat awam berkenaan dengan akta rahsia rasmi, 1972.pdf"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kontrak"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTextField
                        label="Tarikh Mula Kontrak"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tarikh Tamat Kontrak"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tempoh Kontrak (Bulan)"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Kadar Upah (RM)"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Penempatan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Gelaran Tugas"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tarikh Lapor Diri"
                        id=""
                        type="text"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="No. KWSP"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="No. Akaun Bank"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Kelayakan Cuti (Hari)"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan LKIM"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Sekarang"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Disahkan Dalam Jawatan Pertama LKIM"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Kontrak"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader title="Tetapkan Keputusan Semakan Dan Hantar Untuk Dinilai" borderClass="border-none"/>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span class="text-sm text-ios-labelColors-link-light">
                        Keputusan akan dihantar ke peranan-peranan berkaitan.
                    </span>
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomRadioBoolean
                        id=""
                        label="Keputusan"
                        options={data.inputOption.verifyOption}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penilaian Pengarah Bahagian/Negeri"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span class="text-sm font-bold text-ios-labelColors-link-light">
                        Penilaian dan Perakuan Kakitangan
                    </span>
                    <CustomTextField label="Nama" id="" val="" errors={['']} />
                    <CustomTextField
                        label="Markah Penilaian"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Keputusan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <span
                        class="text-sm text-ios-labelColors-link-light underline"
                    >
                        Cetak Markah Penilaian: Link here
                    </span>
                    <CustomTextField
                        label="Tindakan/Ulasan Mesyuarat"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomRadioBoolean
                        id=""
                        label="Keputusan"
                        options={data.inputOption.verifyOption}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span class="text-sm text-ios-labelColors-link-light"
                        >Sekiranya keputusan mesyuarat tidak diluluskan, sistem
                        MyPSM akan menjana surat penamatan kontrak dan emel
                        surat berkenaan ke emel kakitangan.</span
                    >
                    <CustomSelectField
                        label="Nama dan Bilangan Mesyuarat"
                        id=""
                        options={data.inputOption.meetingNameOption}
                        val={1}
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tarikh Mesyuarat"
                        id=""
                        type="date"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomRadioBoolean
                        id=""
                        label="Keputusan"
                        options={data.inputOption.approveOption}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span
                        class="text-sm font-bold text-ios-labelColors-link-light"
                        >Penyokong</span
                    >
                    <CustomTextField
                        label="Nama"
                        id="supporterId"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        options={data.inputOption.supportOption}
                    />
                    <span
                        class="text-sm font-bold text-ios-labelColors-link-light"
                        >Pelulus</span
                    >
                    <CustomTextField
                        label="Nama"
                        id="supporterId"
                        val=""
                        errors={['']}
                    />
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        options={data.inputOption.approveOption}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Borang Perjanjian Kontrak"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span class="text-sm text-ios-labelColors-link-light"
                        >Dokumen-dokumen yang telah dimuat naik:</span
                    >
                    <DownloadAttachment
                        fileName="Surat perjanjian kontrak.pdf"
                    />
                    <DownloadAttachment
                        fileName="Surat sumpah bukan penagih dadah.pdf"
                    />
                    <DownloadAttachment fileName="Akuan berkanun.pdf" />
                    <DownloadAttachment fileName="Surat aku janji.pdf" />
                    <DownloadAttachment fileName="Borang perubatan.pdf" />
                    <DownloadAttachment
                        fileName="Perakuan untuk ditandatangani oleh penjawat awam berkenaan dengan akta rahsia rasmi, 1972.pdf"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Perjanjian Kontrak Baru"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Tetapkan Pengesahan Perjanjian Kontrak Baru"
                    borderClass="border-b-none"
                />
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        val=""
                        errors={['']}
                    />
                    <CustomRadioBoolean
                        id=""
                        label="Keputusan"
                        options={data.inputOption.verifyOption}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
