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
    import { Accordion, AccordionItem } from 'flowbite-svelte';
    import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';
    import ScaleInput from '$lib/components/inputs/scale-input/ScaleInput.svelte';

    export let data: PageData;
    let totalVal: number = 0;
    let totalVal2: number = 0;
    let overallTotal: number = 0;
    const handleDownload = async (url: string) => {
        await ContractEmployeeServices.downloadContractAttachment(url);
    };

    $: overallTotal = totalVal + totalVal2;
    
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
                        val={data.getContractPersonalDetail.name}
                    />
                    <CustomSelectField
                        label="Gelaran Nama"
                        id="titleId"
                        disabled
                        options={data.inputOption.titleLookup}
                        val={data.getContractPersonalDetail.titleId}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        disabled
                        val={data.getContractPersonalDetail.alternativeName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        disabled
                        val={data.getContractPersonalDetail
                            .identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        disabled
                        options={data.inputOption.identityCardTypeLookup}
                        val={data.getContractPersonalDetail
                            .identityDocumentColor}
                    />
                    <CustomTextField
                        label="Emel"
                        id="email"
                        disabled
                        val={data.getContractPersonalDetail.email}
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        disabled
                        type="date"
                        val={data.getContractPersonalDetail.birthDate}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        disabled
                        options={data.inputOption.stateLookup}
                        val={data.getContractPersonalDetail.birthStateId}
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        disabled
                        options={data.inputOption.countryLookup}
                        val={data.getContractPersonalDetail.birthCountryId}
                    />
                    <CustomSelectField
                        label="Warganegara"
                        id="nationalityId"
                        disabled
                        options={data.inputOption.nationalityLookup}
                        val={data.getContractPersonalDetail.nationalityId}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        disabled
                        options={data.inputOption.raceLookup}
                        val={data.getContractPersonalDetail.raceId}
                    />
                    <CustomSelectField
                        label="Agama"
                        id="religionId"
                        disabled
                        options={data.inputOption.religionLookup}
                        val={data.getContractPersonalDetail.religionId}
                    />
                    <CustomSelectField
                        label="Etnik"
                        id="ethnicId"
                        disabled
                        options={data.inputOption.ethnicLookup}
                        val={data.getContractPersonalDetail.ethnicId}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        disabled
                        options={data.inputOption.genderLookup}
                        val={data.getContractPersonalDetail.genderId}
                    />
                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        disabled
                        options={data.inputOption.maritalLookup}
                        val={data.getContractPersonalDetail.maritalId}
                    />
                    <CustomTextField
                        label="Alamat Rumah"
                        id="homeAddress"
                        disabled
                        val={data.getContractPersonalDetail.homeAddress}
                    />
                    <CustomSelectField
                        label="Bandar Alamat Rumah"
                        id="homeCityId"
                        disabled
                        options={data.inputOption.cityLookup}
                        val={data.getContractPersonalDetail.homeCityId}
                    />
                    <CustomSelectField
                        label="Negeri Alamat Rumah"
                        id="homeStateId"
                        disabled
                        options={data.inputOption.stateLookup}
                        val={data.getContractPersonalDetail.homeStateId}
                    />
                    <CustomSelectField
                        label="Negara Alamat Rumah"
                        id="homeCountryId"
                        disabled
                        options={data.inputOption.countryLookup}
                        val={data.getContractPersonalDetail.homeCountryId}
                    />
                    <CustomTextField
                        label="Poskod Alamat Rumah"
                        id="homePostcode"
                        disabled
                        val={data.getContractPersonalDetail.homePostcode}
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
                            val={data.getContractPersonalDetail.mailAddress}
                        />
                        <CustomSelectField
                            label="Bandar Alamat Surat Menyurat"
                            disabled
                            options={data.inputOption.cityLookup}
                            id="mailCityId"
                            val={data.getContractPersonalDetail.mailCityId}
                        />
                        <CustomSelectField
                            label="Negeri Alamat Surat Menyurat"
                            disabled
                            options={data.inputOption.stateLookup}
                            id="mailStateId"
                            val={data.getContractPersonalDetail.mailStateId}
                        />
                        <CustomSelectField
                            label="Negara Alamat Surat Menyurat"
                            disabled
                            options={data.inputOption.countryLookup}
                            id="mailCountryId"
                            val={data.getContractPersonalDetail.mailCountryId}
                        />
                        <CustomTextField
                            label="Poskod Alamat Surat Menyurat"
                            disabled
                            id="mailPostcode"
                            val={data.getContractPersonalDetail.mailPostcode}
                        />
                    </div>
                    <CustomSelectField
                        id="assetDeclarationStatusId"
                        disabled
                        label="Status Pengikstiharan Harta"
                        val={data.getContractPersonalDetail
                            .assetDeclarationStatusId}
                        options={data.inputOption.assetDeclarationLookup}
                    />

                    <!-- {#if $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 12 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 14 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 15 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 17 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 18 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 22} -->
                    <CustomTextField
                        id="propertyDeclarationDate"
                        disabled
                        type="date"
                        label="Tarikh Pengikstiharan Harta"
                        val={data.getContractPersonalDetail
                            .propertyDeclarationDate}
                    />
                    <!-- {/if} -->
                    <CustomRadioBoolean
                        disabled
                        id="isExPoliceOrSoldier"
                        label="Bekas Polis/Tentera"
                        val={data.getContractPersonalDetail.isExPoliceOrSoldier}
                    />
                    <CustomRadioBoolean
                        disabled
                        id="isInternalRelationship"
                        label="Perhubungan Dengan Kakitangan LKIM"
                        val={data.getContractPersonalDetail
                            .isInternalRelationship}
                    />
                    {#if data.getContractPersonalDetail.isInternalRelationship}
                        <CustomTextField
                            label="Nama Kakitangan LKIM"
                            id="employeeName"
                            disabled
                            val={data.getContractPersonalDetail.employeeName}
                        />
                        <CustomTextField
                            label="Nombor Kakitangan LKIM"
                            id="employeeNumber"
                            disabled
                            val={data.getContractPersonalDetail.employeeNumber}
                        />
                        <CustomTextField
                            label="Jawatan Kakitangan LKIM"
                            id="employeePosition"
                            disabled
                            val={data.getContractPersonalDetail
                                .employeePosition}
                        />
                        <CustomSelectField
                            label="Hubungan Kakitangan LKIM"
                            id="relationshipId"
                            disabled
                            options={data.inputOption.meetingNameOption}
                            val={data.getContractPersonalDetail.relationshipId}
                        />
                    {/if}
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
                    <Accordion>
                        {#each data.getAcademicRecords.academicList as records, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomSelectField
                                    label="Jenis Jurusan"
                                    id="majorId{i}"
                                    options={data.inputOption.majorMinorLookup}
                                    val={records.majorId}
                                />
                                <CustomSelectField
                                    label="Jenis Bidang"
                                    id="minorId{i}"
                                    options={data.inputOption.majorMinorLookup}
                                    val={records.minorId}
                                />
                                <CustomSelectField
                                    label="Negara"
                                    id="countryId{i}"
                                    options={data.inputOption.countryLookup}
                                    val={records.countryId}
                                />
                                <CustomSelectField
                                    label="Institusi"
                                    id="institutionId{i}"
                                    options={data.inputOption.institutionLookup}
                                    val={records.institutionId}
                                />
                                <CustomSelectField
                                    label="Taraf Pendidikan"
                                    id="educationLevelId{i}"
                                    options={data.inputOption.educationLookup}
                                    val={records.educationLevelId}
                                />
                                <CustomSelectField
                                    label="Penajaan"
                                    id="sponsorshipId{i}"
                                    options={data.inputOption.sponsorshipLookup}
                                    val={records.sponsorshipId}
                                />
                                <CustomTextField
                                    label="Nama Pencapaian/Sijil"
                                    id="name{i}"
                                    val={records.name}
                                />
                                <CustomTextField
                                    label="Tarikh Kelulusan"
                                    id="completionDate{i}"
                                    type="date"
                                    val={records.completionDate}
                                />
                                <CustomTextField
                                    label="Pencapaian Akhir (Gred)"
                                    id="finalGrade{i}"
                                    val={records.finalGrade}
                                />
                                <CustomTextField
                                    label="Catatan"
                                    id="field{i}"
                                    val={records.field}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
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
                    <Accordion>
                        {#each data.getExperienceRecord.experienceList as records, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomTextField
                                    label="Nama Majikan"
                                    disabled
                                    id="company{i}"
                                    val={records.company}
                                />
                                <CustomTextField
                                    label="Alamat Majikan"
                                    disabled
                                    id="address{i}"
                                    val={records.address}
                                />
                                <CustomTextField
                                    label="Jawatan"
                                    disabled
                                    id="position{i}"
                                    val={records.position}
                                />
                                <CustomTextField
                                    label="Kod Jawatan (Jika Ada)"
                                    disabled
                                    id="positionCode{i}"
                                    val={records.positionCode}
                                />
                                <CustomTextField
                                    label="Tarikh Mula Bekerja"
                                    disabled
                                    id="startDate{i}"
                                    type="date"
                                    val={records.startDate}
                                />
                                <CustomTextField
                                    label="Tarikh Tamat Bekerja"
                                    disabled
                                    id="endDate{i}"
                                    type="date"
                                    val={records.endDate}
                                />
                                <CustomTextField
                                    label="Gaji (RM)"
                                    disabled
                                    id="salary{i}"
                                    val={records.salary}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
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
                    <Accordion>
                        {#each data.getActivityRecord.activityList as record, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomTextField
                                    label="Nama Kegiatan/Keahlian"
                                    disabled
                                    id="name{i}"
                                    val={record.name}
                                />
                                <CustomTextField
                                    label="Jawatan"
                                    disabled
                                    id="position{i}"
                                    val={record.position}
                                />
                                <CustomTextField
                                    label="Tarikh Penyertaan"
                                    disabled
                                    id="joinDate{i}"
                                    type="date"
                                    val={record.joinDate}
                                />
                                <CustomTextField
                                    label="Catatan"
                                    disabled
                                    id="description{i}"
                                    val={record.description}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
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
                    <Accordion>
                        {#each data.getFamilyRecord.dependenciesList as record, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="name{i}"
                                    val={record.name}
                                />
                                <CustomTextField
                                    label="Nama Lain"
                                    disabled
                                    id="alternativeName{i}"
                                    val={record.alternativeName}
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identityDocumentNumber"
                                    val={record.identityDocumentNumber}
                                />
                                <CustomSelectField
                                    label="Jenis Kad Pengenalan"
                                    disabled
                                    id="identityDocumentColor{i}"
                                    options={data.inputOption
                                        .identityCardTypeLookup}
                                    val={record.identityDocumentColor}
                                />
                                <CustomSelectField
                                    label="Jantina"
                                    disabled
                                    id="genderId{i}"
                                    options={data.inputOption.genderLookup}
                                    val={record.genderId}
                                />
                                <CustomTextField
                                    label="Tarikh Lahir"
                                    disabled
                                    id="birthDate{i}"
                                    type="date"
                                    val={record.birthDate}
                                />
                                <CustomSelectField
                                    label="Kewarganegaraan"
                                    disabled
                                    id="nationalityId{i}"
                                    options={data.inputOption.nationalityLookup}
                                    val={record.nationalityId}
                                />
                                <CustomSelectField
                                    label="Negeri Kelahiran"
                                    disabled
                                    id="birthStateId{i}"
                                    options={data.inputOption.stateLookup}
                                    val={record.birthStateId}
                                />
                                <CustomSelectField
                                    label="Negara Kelahiran"
                                    disabled
                                    id="birthCountryId{i}"
                                    options={data.inputOption.countryLookup}
                                    val={record.birthCountryId}
                                />
                                <CustomTextField
                                    label="Alamat"
                                    disabled
                                    id="address{i}"
                                    val={record.address}
                                />
                                <CustomTextField
                                    label="Poskod"
                                    disabled
                                    id="postcode{i}"
                                    val={record.postcode}
                                />
                                <CustomTextField
                                    label="No. Telefon"
                                    disabled
                                    id="phoneNumber{i}"
                                    val={record.phoneNumber}
                                />
                                <CustomSelectField
                                    label="Bangsa"
                                    disabled
                                    id="raceId{i}"
                                    options={data.inputOption.raceLookup}
                                    val={record.raceId}
                                />

                                <CustomSelectField
                                    label="Status"
                                    disabled
                                    id="maritalId{i}"
                                    options={data.inputOption.maritalLookup}
                                    val={record.maritalId}
                                />
                                {#if record.maritalId === 3}
                                    <CustomTextField
                                        label="Tarikh Perkahwinan"
                                        disabled
                                        id="marriageDate{i}"
                                        type="date"
                                        val={record.marriageDate}
                                    />
                                {/if}
                                <CustomSelectField
                                    label="Hubungan"
                                    disabled
                                    id="relationshipId{i}"
                                    options={data.inputOption
                                        .relationshipLookup}
                                    val={record.relationshipId}
                                />
                                <CustomSelectField
                                    label="Taraf Pendidikan"
                                    disabled
                                    id="educationLevelId{i}"
                                    options={data.inputOption.educationLookup}
                                    val={record.educationLevelId}
                                />
                                <CustomTextField
                                    label="Alamat Majikan"
                                    disabled
                                    id="workAddress{i}"
                                    val={record.workAddress}
                                />
                                <CustomTextField
                                    label="Poskod Alamat Majikan"
                                    disabled
                                    id="workPostcode{i}"
                                    val={record.workPostcode}
                                />
                                <CustomSelectField
                                    label="Bersekolah"
                                    disabled
                                    id="inSchool{i}"
                                    options={[
                                        { value: true, name: 'Ya' },
                                        { value: false, name: 'Tidak' },
                                    ]}
                                    val={record.inSchool}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
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
                    <Accordion>
                        {#each data.getNonFamilyRecord.dependenciesList as record, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="name{i}"
                                    val={record.name}
                                />
                                <CustomTextField
                                    label="Nama Lain"
                                    disabled
                                    id="alternativeName{i}"
                                    val={record.alternativeName}
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identityDocumentNumber{i}"
                                    val={record.identityDocumentNumber}
                                />
                                <CustomSelectField
                                    label="Jenis Kad Pengenalan"
                                    disabled
                                    id="identityDocumentColor{i}"
                                    options={data.inputOption
                                        .identityCardTypeLookup}
                                    val={record.identityDocumentColor}
                                />
                                <CustomSelectField
                                    label="Jantina"
                                    disabled
                                    id="genderId{i}"
                                    options={data.inputOption.genderLookup}
                                    val={record.genderId}
                                />
                                <CustomTextField
                                    label="Tarikh Lahir"
                                    disabled
                                    id="birthDate{i}"
                                    type="date"
                                    val={record.birthDate}
                                />
                                <CustomSelectField
                                    label="Kewarganegaraan"
                                    disabled
                                    id="nationalityId{i}"
                                    options={data.inputOption.nationalityLookup}
                                    val={record.nationalityId}
                                />
                                <CustomSelectField
                                    label="Negeri Kelahiran"
                                    disabled
                                    id="birthStateId{i}"
                                    options={data.inputOption.stateLookup}
                                    val={record.birthStateId}
                                />
                                <CustomSelectField
                                    label="Negara Kelahiran"
                                    disabled
                                    id="birthCountryId{i}"
                                    options={data.inputOption.countryLookup}
                                    val={record.birthCountryId}
                                />
                                <CustomTextField
                                    label="Alamat"
                                    disabled
                                    id="address{i}"
                                    val={record.address}
                                />
                                <CustomTextField
                                    label="Poskod"
                                    disabled
                                    id="postcode{i}"
                                    val={record.postcode}
                                />
                                <CustomTextField
                                    label="No. Telefon"
                                    disabled
                                    id="phoneNumber{i}"
                                    val={record.phoneNumber}
                                />
                                <CustomSelectField
                                    label="Bangsa"
                                    disabled
                                    id="raceId{i}"
                                    options={data.inputOption.raceLookup}
                                    val={record.raceId}
                                />

                                <CustomSelectField
                                    label="Status"
                                    disabled
                                    id="maritalId{i}"
                                    options={data.inputOption.maritalLookup}
                                    val={record.maritalId}
                                />
                                {#if record.maritalId === 3}
                                    <CustomTextField
                                        label="Tarikh Perkahwinan"
                                        disabled
                                        id="marriageDate{i}"
                                        type="date"
                                        val={record.marriageDate}
                                    />
                                {/if}
                                <CustomSelectField
                                    label="Hubungan"
                                    disabled
                                    id="relationshipId{i}"
                                    options={data.inputOption
                                        .relationshipLookup}
                                    val={record.relationshipId}
                                />
                                <CustomSelectField
                                    label="Taraf Pendidikan"
                                    disabled
                                    id="educationLevelId{i}"
                                    options={data.inputOption.educationLookup}
                                    val={record.educationLevelId}
                                />
                                <CustomTextField
                                    label="Alamat Majikan"
                                    disabled
                                    id="workAddress{i}"
                                    val={record.workAddress}
                                />
                                <CustomTextField
                                    label="Poskod Alamat Majikan"
                                    disabled
                                    id="workPostcode{i}"
                                    val={record.workPostcode}
                                />
                                <CustomSelectField
                                    label="Bersekolah"
                                    disabled
                                    id="inSchool{i}"
                                    options={[
                                        { value: true, name: 'Ya' },
                                        { value: false, name: 'Tidak' },
                                    ]}
                                    val={record.inSchool}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Waris"></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <Accordion>
                        {#each data.getNextOfKinRecord.nextOfKinList as record, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomTextField
                                    label="Nama"
                                    id="name{i}"
                                    disabled
                                    val={record.name}
                                />
                                <CustomTextField
                                    label="Nama Lain"
                                    id="alternativeName{i}"
                                    disabled
                                    val={record.alternativeName}
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    id="identityDocumentNumber{i}"
                                    disabled
                                    val={record.identityDocumentNumber}
                                />
                                <CustomSelectField
                                    label="Jenis Kad Pengenalan"
                                    id="identityDocumentColor{i}"
                                    options={data.inputOption
                                        .identityCardTypeLookup}
                                    disabled
                                    val={record.identityDocumentColor}
                                />
                                <CustomSelectField
                                    label="Jantina"
                                    id="genderId{i}"
                                    options={data.inputOption.genderLookup}
                                    disabled
                                    val={record.genderId}
                                />
                                <CustomTextField
                                    label="Tarikh Lahir"
                                    id="birthDate{i}"
                                    type="date"
                                    disabled
                                    val={record.birthDate}
                                />
                                <CustomSelectField
                                    label="Kewarganegaraan"
                                    id="nationalityId{i}"
                                    options={data.inputOption.nationalityLookup}
                                    disabled
                                    val={record.nationalityId}
                                />
                                <CustomSelectField
                                    label="Negeri Kelahiran"
                                    id="birthStateId{i}"
                                    options={data.inputOption.stateLookup}
                                    disabled
                                    val={record.birthStateId}
                                />
                                <CustomSelectField
                                    label="Negara Kelahiran"
                                    id="birthCountryId{i}"
                                    options={data.inputOption.countryLookup}
                                    disabled
                                    val={record.birthCountryId}
                                />
                                <CustomTextField
                                    label="Alamat"
                                    id="address{i}"
                                    disabled
                                    val={record.address}
                                />
                                <CustomTextField
                                    label="Poskod"
                                    id="postcode{i}"
                                    disabled
                                    val={record.postcode}
                                />
                                <CustomTextField
                                    label="No. Telefon"
                                    id="phoneNumber{i}"
                                    disabled
                                    val={record.phoneNumber}
                                />
                                <CustomSelectField
                                    label="Bangsa"
                                    id="raceId{i}"
                                    options={data.inputOption.raceLookup}
                                    disabled
                                    val={record.raceId}
                                />

                                <CustomSelectField
                                    label="Status"
                                    id="maritalId{i}"
                                    options={data.inputOption.maritalLookup}
                                    disabled
                                    val={record.maritalId}
                                />
                                {#if record.maritalId === 3}
                                    <CustomTextField
                                        label="Tarikh Perkahwinan"
                                        id="marriageDate{i}"
                                        type="date"
                                        disabled
                                        val={record.marriageDate}
                                    />
                                {/if}
                                <CustomSelectField
                                    label="Hubungan"
                                    id="relationshipId{i}"
                                    options={data.inputOption
                                        .relationshipLookup}
                                    disabled
                                    val={record.relationshipId}
                                />
                                <CustomSelectField
                                    label="Taraf Pendidikan"
                                    id="educationLevelId{i}"
                                    options={data.inputOption.educationLookup}
                                    disabled
                                    val={record.educationLevelId}
                                />
                                <CustomTextField
                                    label="Alamat Majikan"
                                    id="workAddress{i}"
                                    disabled
                                    val={record.workAddress}
                                />
                                <CustomTextField
                                    label="Poskod Alamat Majikan"
                                    id="workPostcode{i}"
                                    disabled
                                    val={record.workPostcode}
                                />
                                <CustomSelectField
                                    label="Bersekolah"
                                    id="inSchool{i}"
                                    options={data.inputOption.commonOption}
                                    disabled
                                    val={record.inSchool}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen-Dokumen Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 px-2">
                    <span
                        class="text-sm text-ios-labelColors-secondaryLabel-light"
                        >Borang-borang yang perlu diisi oleh kakitangan:</span
                    >
                    <DownloadAttachment
                        fileName={data.getContractDocument.templateName}
                        triggerDownload={() =>
                            handleDownload(data.getContractDocument.template)}
                    />
                    <span
                        class="text-sm text-ios-labelColors-secondaryLabel-light"
                        >Borang-borang yang telah dimuat naik oleh kakitangan:</span
                    >
                    <DownloadAttachment
                        fileName={data.getContractDocument.attachmentName}
                        triggerDownload={() =>
                            handleDownload(data.getContractDocument.attachment)}
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
                        disabled
                        id="startContract"
                        type="date"
                        val={data.getContractInfo.startContract}
                    />
                    <CustomTextField
                        label="Tarikh Tamat Kontrak"
                        disabled
                        id="endContract"
                        type="date"
                        val={data.getContractInfo.endContract}
                    />
                    <CustomTextField
                        label="Kadar Upah (RM)"
                        disabled
                        id="wageRate"
                        type="number"
                        val={data.getContractInfo.wageRate}
                    />
                    <CustomSelectField
                        label="Penempatan"
                        disabled
                        id="placementId"
                        options={data.inputOption.placementLookup}
                        val={data.getContractInfo.placementId}
                    />
                    <CustomTextField
                        label="Gelaran Tugas"
                        disabled
                        id="designation"
                        val={data.getContractInfo.designation}
                    />
                    <CustomTextField
                        label="Tarikh Lapor Diri"
                        disabled
                        id="reportDutyDate"
                        type="date"
                        val={data.getContractInfo.reportDutyDate}
                    />
                    <CustomTextField
                        label="No. KWSP"
                        disabled
                        id="kwspNo"
                        val={data.getContractInfo.kwspNo}
                    />
                    <CustomTextField
                        label="No. SOCSO"
                        disabled
                        id="socsoNo"
                        val={data.getContractInfo.socsoNo}
                    />
                    <CustomTextField
                        label="No. Cukai"
                        disabled
                        id="taxNo"
                        val={data.getContractInfo.taxNo}
                    />
                    <CustomTextField
                        label="Nama Bank"
                        disabled
                        id="bankName"
                        val={data.getContractInfo.bankName}
                    />
                    <CustomTextField
                        label="No. Akaun Bank"
                        disabled
                        id="bankAccount"
                        val={data.getContractInfo.bankAccount}
                    />
                    <CustomSelectField
                        label="Jenis Perkhidmatan"
                        disabled
                        id="serviceTypeId"
                        options={data.inputOption.serviceTypeLookup}
                        val={data.getContractInfo.serviceTypeId}
                    />
                    <CustomTextField
                        label="Kelayakan Cuti (Hari)"
                        disabled
                        id="leaveEntitlement"
                        type="number"
                        val={data.getContractInfo.leaveEntitlement}
                    />
                    <CustomTextField
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        disabled
                        id="effectiveDate"
                        type="date"
                        val={data.getContractInfo.effectiveDate}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        disabled
                        id="civilServiceStartDate"
                        type="date"
                        val={data.getContractInfo.civilServiceStartDate}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan LKIM"
                        disabled
                        id="lkimServiceStartDate"
                        type="date"
                        val={data.getContractInfo.lkimServiceStartDate}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Sekarang"
                        disabled
                        id="currentServiceStartDate"
                        type="date"
                        val={data.getContractInfo.currentServiceStartDate}
                    />
                    <CustomTextField
                        label="Disahkan Dalam Jawatan Pertama LKIM"
                        disabled
                        id="firstConfirmServiceDate"
                        type="date"
                        val={data.getContractInfo.firstConfirmServiceDate}
                    />
                    <CustomTextField
                        label="Tarikh Perkhidmatan Pengesahan Semasa"
                        disabled
                        id="currentConfirmServiceDate"
                        type="date"
                        val={data.getContractInfo.currentConfirmServiceDate}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Kontrak"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Tetapkan Keputusan Semakan Dan Hantar Untuk Dinilai"
                    borderClass="border-none"
                />
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
                <!-- <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <span
                        class="text-sm font-bold text-ios-labelColors-link-light"
                    >
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
                </div> -->
                <div class="flex w-full flex-col gap-10 px-3 pb-10">
                    <CustomSelectField
                        id="year"
                        label="Tahun"
                        val={0}
                        options={[{ name: '2024', value: '20024' }]}
                    />
                    <ScaleInput bind:totalVal={totalVal} />
                    <ScaleInput
                        title="Skala Penilaian Aspek Kualiti Peribadi"
                        bind:totalVal={totalVal2}
                        totalLabel="Jumlah Markah Aspek B ( / 50)"
                    />
                    <div class="flex w-full flex-col border-t">
                        <ContentHeader
                            title="Jumlah Keseluruhan ( / 100) :  {overallTotal}"
                            borderClass="border-none"
                        />
                    </div>
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
