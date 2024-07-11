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
    import { Accordion, AccordionItem, Alert } from 'flowbite-svelte';
    import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';
    import ScaleInput from '$lib/components/inputs/scale-input/ScaleInput.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import { zod } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _addContractCommonRoleResult,
        _addPerformanceSchema,
        _contractDocumentSchema,
        _contractMeetingSchema,
        _renewContractSecretaryUpdateSchema,
        _renewContractSupporterApproverSchema,
    } from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas';
    import {
        _fileToBase64Object,
        _submitAddPerformanceForm,
        _submitContractApproverApprovalForm,
        _submitContractDocument,
        _submitContractMeetingForm,
        _submitContractSecretaryApprovalForm,
        _submitContractSecretaryUpdateForm,
        _submitContractSupporterApprovalForm,
        _submitContractSupporterApproverForm,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        approveOptions,
        confirmOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { PrintHelper } from '$lib/helpers/print-helper/print-helper';

    export let data: PageData;

    let totalVal: number = 0;
    let totalVal2: number = 0;

    let files: FileList;
    $: $addPerformanceForm.performanceMark = totalVal + totalVal2;

    const {
        form: addPerformanceForm,
        errors: addPerformanceError,
        enhance: addPerformanceEnhance,
    } = superForm(data.addPerformanceForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        id: 'addPerformanceForm',
        validators: zod(_addPerformanceSchema),
        async onSubmit() {
            $addPerformanceForm.contractId = data.contractId.id;

            const readOnly =
                await _submitAddPerformanceForm($addPerformanceForm);
            if (readOnly?.response.status == 'success') {
                data.getContractPerformanceDetail.isReadonly = true;
            }
        },
    });
    const {
        form: contractMeetingForm,
        errors: contractMeetingError,
        enhance: contractMeetingEnhance,
    } = superForm(data.contractMeetingForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        id: 'contractMeetingForm',
        validators: zod(_contractMeetingSchema),
        async onSubmit() {
            $contractMeetingForm.id = data.contractId.id;
            const readOnly =
                await _submitContractMeetingForm($contractMeetingForm);

            if (readOnly?.response.status == 'success') {
                $contractMeetingForm.isReadonly = true;
                $contractSupporterApproverForm.isReadonly = false;
            }
        },
    });
    const {
        form: contractSupporterApproverForm,
        errors: contractSupporterApproverError,
        enhance: contractSupporterApproverEnhance,
    } = superForm(data.contractSupporterApproverForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        id: 'contractSupporterApproverForm',
        validators: zod(_renewContractSupporterApproverSchema),
        async onSubmit() {
            $contractSupporterApproverForm.contractId = data.contractId.id;
            const readOnly = await _submitContractSupporterApproverForm(
                $contractSupporterApproverForm,
            );
            if (readOnly?.response.status == 'success') {
                $contractSupporterApproverForm.isReadonly = true;
            }
        },
    });
    const {
        form: contractSupporterApprovalForm,
        errors: contractSupporterApprovalError,
        enhance: contractSupporterApprovalEnhance,
    } = superForm(data.contractSupporterApprovalForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        id: 'contractSupporterApprovalForm',
        validators: zod(_addContractCommonRoleResult),
        async onSubmit() {
            $contractSupporterApprovalForm.id = data.contractId.id;
            const readOnly = await _submitContractSupporterApprovalForm(
                $contractSupporterApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                $contractSupporterApprovalForm.isReadonly = true;
            }
        },
    });
    const {
        form: contractApproverApprovalForm,
        errors: contractApproverApprovalError,
        enhance: contractApproverApprovalEnhance,
    } = superForm(data.contractApproverApprovalForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        id: 'contractApproverApprovalForm',
        validators: zod(_addContractCommonRoleResult),
        async onSubmit() {
            $contractApproverApprovalForm.id = data.contractId.id;
            const readOnly = await _submitContractApproverApprovalForm(
                $contractApproverApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                $contractApproverApprovalForm.isReadonly = true;
            }
        },
    });
    const {
        form: contractSecretaryUpdateForm,
        errors: contractSecretaryUpdateError,
        enhance: contractSecretaryUpdateEnhance,
    } = superForm(data.contractSecretaryUpdateForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        id: 'contractSecretaryUpdateForm',
        validators: zod(_renewContractSecretaryUpdateSchema),
        async onSubmit() {
            $contractSecretaryUpdateForm.contractId = data.contractId.id;
            const readOnly = await _submitContractSecretaryUpdateForm(
                $contractSecretaryUpdateForm,
            );
            if (readOnly?.response.status == 'success') {
                $contractSecretaryUpdateForm.isReadonly = true;
            }
        },
    });
    const {
        form: contractSecretaryApprovalForm,
        errors: contractSecretaryApprovalError,
        enhance: contractSecretaryApprovalEnhance,
    } = superForm(data.contractSecretaryApprovalForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        id: 'contractSecretaryApprovalForm',
        validators: zod(_addContractCommonRoleResult),
        async onSubmit() {
            $contractSecretaryApprovalForm.id = data.contractId.id;
            const readOnly = await _submitContractSecretaryApprovalForm(
                $contractSecretaryApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                $contractSecretaryApprovalForm.isReadonly = true;
            }
        },
    });

    const {
        form: contractUploadDocument,
        errors: contractUploadDocumentError,
        enhance: contractUploadDocumentEnhance,
    } = superForm(data.contractUploadDocument, {
        SPA: true,
        taintedMessage: false,
        dataType: 'json',
        resetForm: false,
        validationMethod: 'oninput',
        id: 'contractUploadDocument',
        validators: zod(_contractDocumentSchema),
        onSubmit() {
            _fileToBase64Object(files[0])
                .then((resultObject) => {
                    _submitContractDocument(resultObject);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    });
    const handleDownload = async (url: string) => {
        await ContractEmployeeServices.downloadContractAttachment(url);
    };

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
                        label="Status Pengisytiharan Harta"
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
                            options={data.inputOption.relationshipLookup}
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
                                    disabled
                                    options={data.inputOption.majorMinorLookup}
                                    val={records.majorId}
                                />
                                <CustomSelectField
                                    label="Jenis Bidang"
                                    id="minorId{i}"
                                    disabled
                                    options={data.inputOption.majorMinorLookup}
                                    val={records.minorId}
                                />
                                <CustomSelectField
                                    label="Negara"
                                    id="countryId{i}"
                                    disabled
                                    options={data.inputOption.countryLookup}
                                    val={records.countryId}
                                />
                                <CustomSelectField
                                    label="Institusi"
                                    id="institutionId{i}"
                                    disabled
                                    options={data.inputOption.institutionLookup}
                                    val={records.institutionId}
                                />
                                <CustomSelectField
                                    label="Taraf Pendidikan"
                                    id="educationLevelId{i}"
                                    disabled
                                    options={data.inputOption.educationLookup}
                                    val={records.educationLevelId}
                                />
                                <CustomSelectField
                                    label="Penajaan"
                                    id="sponsorshipId{i}"
                                    disabled
                                    options={data.inputOption.sponsorshipLookup}
                                    val={records.sponsorshipId}
                                />
                                <CustomTextField
                                    label="Nama Pencapaian/Sijil"
                                    id="name{i}"
                                    disabled
                                    val={records.name}
                                />
                                <CustomTextField
                                    label="Tarikh Kelulusan"
                                    id="completionDate{i}"
                                    disabled
                                    type="date"
                                    val={records.completionDate}
                                />
                                <CustomTextField
                                    label="Pencapaian Akhir (Gred)"
                                    id="finalGrade{i}"
                                    disabled
                                    val={records.finalGrade}
                                />
                                <CustomTextField
                                    label="Catatan"
                                    id="field{i}"
                                    disabled
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
                    <ContentHeader
                        title="Dokumen Lama Untuk Rujukan"
                        borderClass="border-none"
                    />
                    <span
                        class="text-sm text-ios-labelColors-secondaryLabel-light"
                        >Borang-borang yang telah dimuat naik oleh kakitangan:</span
                    >

                    <a
                        href={data.getContractDocument.attachment}
                        target="_blank"
                        download={data.getContractDocument.attachmentName}
                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                        >{data.getContractDocument.attachmentName}</a
                    >
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kontrak Lama"
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
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penilaian Pengarah Bahagian/Negeri">
                {#if !data.getContractPerformanceDetail.isReadonly && (data.currentRoleCode == UserRoleConstant.pengarahBahagian.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code)}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="addPerformanceForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if !data.getContractPerformanceDetail.isReadonly && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu keputusan daripada pihak Pengarah Bahagian/Negeri.
                            </p>
                        </Alert>
                    </div>
                {:else if (data.currentRoleCode === UserRoleConstant.pengarahNegeri.code || data.currentRoleCode === UserRoleConstant.pengarahBahagian.code) && !data.getContractPerformanceDetail.isReadonly}
                    <form
                        class="flex w-full flex-col gap-10 px-3 pb-10"
                        id="addPerformanceForm"
                        method="POST"
                        use:addPerformanceEnhance
                    >
                        <div class="flex w-full flex-row justify-between gap-4">
                            <CustomTextField
                                id="year"
                                label="Tahun"
                                type="number"
                                bind:val={$addPerformanceForm.year}
                                errors={$addPerformanceError.year}
                            />
                            <CustomRadioBoolean
                                id="result"
                                label="Keputusan"
                                disabled={false}
                                options={data.inputOption.approveOption}
                                bind:val={$addPerformanceForm.result}
                            />
                        </div>
                        <ScaleInput bind:totalVal />
                        <ScaleInput
                            title="Skala Penilaian Aspek Kualiti Peribadi"
                            scaleLabel={data.inputOption.scaleLabel}
                            bind:totalVal={totalVal2}
                            totalLabel="Jumlah Markah Aspek B ( / 50)"
                        />
                        <div class="flex w-full flex-col border-t">
                            <ContentHeader
                                title="Jumlah Keseluruhan ( / 100) :  {$addPerformanceForm.performanceMark}"
                                borderClass="border-none"
                            />
                        </div>
                    </form>
                {:else if data.getContractPerformanceDetail.isReadonly}
                    <div
                        id="toExport"
                        class="flex w-full flex-col justify-start gap-2.5 px-2"
                    >
                        <div class="flex w-full items-center justify-between">
                            <span
                                class="text-sm font-bold text-ios-labelColors-link-light"
                            >
                                Penilaian dan Perakuan Kakitangan
                            </span>
                            <TextIconButton
                            label=""
                            icon="print"
                            onClick={() => {
                                PrintHelper.handleExportPDF("toExport")
                            }}
                        />
                        </div>
                        <CustomTextField
                            label="Nama Kakitangan Kontrak"
                            disabled
                            isRequired={false}
                            id="name"
                            bind:val={data.getContractPerformanceDetail.name}
                        />
                        <CustomTextField
                            label="Markah Penilaian"
                            disabled
                            isRequired={false}
                            placeholder="Sedang mengesan data..."
                            id="performanceMark"
                            bind:val={data.getContractPerformanceDetail
                                .performanceMark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan Pengarah Bahagian/Negeri"
                            options={confirmOptions}
                            isRequired={false}
                            id="status"
                            bind:val={data.getContractPerformanceDetail.status}
                        />
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    {#if !$contractMeetingForm.isReadonly && data.currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="contractMeetingForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.currentRoleCode == UserRoleConstant.kakitanganKontrak.code && $contractMeetingForm.remark == null}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu keputusan daripada pihak Urus Setia
                                    Khidmat Sokongan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="contractMeetingForm"
                            method="POST"
                            use:contractMeetingEnhance
                        >
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                disabled={$contractMeetingForm.isReadonly}
                                bind:val={$contractMeetingForm.remark}
                                errors={$contractMeetingError.remark}
                            />
                            <CustomRadioBoolean
                                id="status"
                                label="Keputusan"
                                disabled={$contractMeetingForm.isReadonly}
                                options={approveOptions}
                                bind:val={$contractMeetingForm.status}
                                errors={$contractMeetingError.status}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Penyokong dan Pelulus"
                    >{#if !$contractSupporterApproverForm.isReadonly && data.currentRoleCode == UserRoleConstant.urusSetiaKhidmatSokongan.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="contractSupporterApproverForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if (data.currentRoleCode == UserRoleConstant.kakitanganKontrak.code && $contractSupporterApproverForm.supporterId == null) || $contractMeetingForm.remark == null}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu Urus Setia Khidmat Sokongan untuk memilih
                                    Penyokong dan Pelulus.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="contractSupporterApproverForm"
                            method="POST"
                            use:contractSupporterApproverEnhance
                        >
                            <ContentHeader
                                title="Tetapkan Penyokong dan Pelulus"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Penyokong"
                                id="supporterId"
                                options={data.inputOption
                                    .supporterApproverLookup}
                                disabled={$contractSupporterApproverForm.isReadonly}
                                bind:val={$contractSupporterApproverForm.supporterId}
                                errors={$contractSupporterApproverError.supporterId}
                            />
                            <CustomSelectField
                                label="Pelulus"
                                id="approverId"
                                options={data.inputOption
                                    .supporterApproverLookup}
                                disabled={$contractSupporterApproverForm.isReadonly}
                                bind:val={$contractSupporterApproverForm.approverId}
                                errors={$contractSupporterApproverError.approverId}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Penyokong">
                    {#if !$contractSupporterApprovalForm.isReadonly && data.currentRoleCode === UserRoleConstant.penyokong.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="contractSupporterApprovalForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.currentRoleCode !== UserRoleConstant.penyokong.code && $contractSupporterApprovalForm.remark == ''}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu keputusan daripada pihak Penyokong.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="contractSupporterApprovalForm"
                            method="POST"
                            use:contractSupporterApprovalEnhance
                        >
                            <span
                                class="text-sm font-bold text-ios-labelColors-link-light"
                                >Penyokong</span
                            >
                            <CustomTextField
                                label="Nama"
                                id="name"
                                disabled
                                bind:val={$contractSupporterApprovalForm.name}
                                errors={$contractSupporterApprovalError.name}
                            />
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                disabled={$contractSupporterApprovalForm.isReadonly}
                                bind:val={$contractSupporterApprovalForm.remark}
                                errors={$contractSupporterApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                options={supportOptions}
                                disabled={$contractSupporterApprovalForm.isReadonly}
                                bind:val={$contractSupporterApprovalForm.status}
                                errors={$contractSupporterApprovalError.status}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Pelulus">
                    {#if !$contractApproverApprovalForm.isReadonly && data.currentRoleCode === UserRoleConstant.pelulus.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="contractApproverApprovalForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.currentRoleCode !== UserRoleConstant.pelulus.code && $contractApproverApprovalForm.remark == ''}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu keputusan daripada pihak Pelulus.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="contractApproverApprovalForm"
                            method="POST"
                            use:contractApproverApprovalEnhance
                        >
                            <span
                                class="text-sm font-bold text-ios-labelColors-link-light"
                                >Pelulus</span
                            >
                            <CustomTextField
                                label="Nama"
                                id="name"
                                disabled
                                bind:val={$contractApproverApprovalForm.name}
                                errors={$contractApproverApprovalError.name}
                            />
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                disabled={$contractApproverApprovalForm.isReadonly}
                                bind:val={$contractApproverApprovalForm.remark}
                                errors={$contractApproverApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                options={approveOptions}
                                disabled={$contractApproverApprovalForm.isReadonly}
                                bind:val={$contractApproverApprovalForm.status}
                                errors={$contractApproverApprovalError.status}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            {#if data.getApproverApproval.remark !== null && data.currentRoleCode !== UserRoleConstant.pelulus.code && data.currentRoleCode !== UserRoleConstant.penyokong.code}
                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Penyambungan Kontrak Kakitangan"
                    >
                        {#if !$contractSecretaryUpdateForm.isReadonly && data.currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="contractSecretaryUpdateForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Maklumat Kontrak Baru"
                            borderClass="border-b-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            method="POST"
                            id="contractSecretaryUpdateForm"
                            use:contractSecretaryUpdateEnhance
                        >
                            <CustomTextField
                                label="Tarikh Mula Kontrak"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="startContract"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.startContract}
                                errors={$contractSecretaryUpdateError.startContract}
                            />
                            <CustomTextField
                                label="Tarikh Tamat Kontrak"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="endContract"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.endContract}
                                errors={$contractSecretaryUpdateError.endContract}
                            />
                            <CustomTextField
                                label="Kadar Upah (RM)"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="wageRate"
                                type="number"
                                bind:val={$contractSecretaryUpdateForm.wageRate}
                                errors={$contractSecretaryUpdateError.wageRate}
                            />
                            <CustomSelectField
                                label="Penempatan"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="placementId"
                                options={data.inputOption.placementLookup}
                                bind:val={$contractSecretaryUpdateForm.placementId}
                                errors={$contractSecretaryUpdateError.placementId}
                            />
                            <CustomTextField
                                label="Gelaran Tugas"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="designation"
                                bind:val={$contractSecretaryUpdateForm.designation}
                                errors={$contractSecretaryUpdateError.designation}
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="reportDutyDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.reportDutyDate}
                                errors={$contractSecretaryUpdateError.reportDutyDate}
                            />
                            <CustomTextField
                                label="No. KWSP"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="kwspNo"
                                bind:val={$contractSecretaryUpdateForm.kwspNo}
                                errors={$contractSecretaryUpdateError.kwspNo}
                            />
                            <CustomTextField
                                label="No. SOCSO"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="socsoNo"
                                bind:val={$contractSecretaryUpdateForm.socsoNo}
                                errors={$contractSecretaryUpdateError.socsoNo}
                            />
                            <CustomTextField
                                label="No. Cukai"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="taxNo"
                                bind:val={$contractSecretaryUpdateForm.taxNo}
                                errors={$contractSecretaryUpdateError.taxNo}
                            />
                            <CustomTextField
                                label="Nama Bank"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="bankName"
                                bind:val={$contractSecretaryUpdateForm.bankName}
                                errors={$contractSecretaryUpdateError.bankName}
                            />
                            <CustomTextField
                                label="No. Akaun Bank"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="bankAccount"
                                bind:val={$contractSecretaryUpdateForm.bankAccount}
                                errors={$contractSecretaryUpdateError.bankAccount}
                            />
                            <CustomSelectField
                                label="Jenis Perkhidmatan"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="serviceTypeId"
                                options={data.inputOption.serviceTypeLookup}
                                bind:val={$contractSecretaryUpdateForm.serviceTypeId}
                                errors={$contractSecretaryUpdateError.serviceTypeId}
                            />
                            <CustomTextField
                                label="Kelayakan Cuti (Hari)"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="leaveEntitlement"
                                type="number"
                                bind:val={$contractSecretaryUpdateForm.leaveEntitlement}
                                errors={$contractSecretaryUpdateError.leaveEntitlement}
                            />
                            <CustomTextField
                                label="Tarikh Kuatkuasa Lantikan Semasa"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="effectiveDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.effectiveDate}
                                errors={$contractSecretaryUpdateError.effectiveDate}
                            />
                            <CustomTextField
                                label="Mula Dilantik Perkhidmatan Kerajaan"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="civilServiceStartDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.civilServiceStartDate}
                                errors={$contractSecretaryUpdateError.civilServiceStartDate}
                            />
                            <CustomTextField
                                label="Mula Dilantik Perkhidmatan LKIM"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="lkimServiceStartDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.lkimServiceStartDate}
                                errors={$contractSecretaryUpdateError.lkimServiceStartDate}
                            />
                            <CustomTextField
                                label="Mula Dilantik Perkhidmatan Sekarang"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="currentServiceStartDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.currentServiceStartDate}
                                errors={$contractSecretaryUpdateError.currentServiceStartDate}
                            />
                            <CustomTextField
                                label="Disahkan Dalam Jawatan Pertama LKIM"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="firstConfirmServiceDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.firstConfirmServiceDate}
                                errors={$contractSecretaryUpdateError.firstConfirmServiceDate}
                            />
                            <CustomTextField
                                label="Tarikh Perkhidmatan Pengesahan Semasa"
                                disabled={$contractSecretaryUpdateForm.isReadonly}
                                id="currentConfirmServiceDate"
                                type="date"
                                bind:val={$contractSecretaryUpdateForm.currentConfirmServiceDate}
                                errors={$contractSecretaryUpdateError.currentConfirmServiceDate}
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Borang Perjanjian Kontrak">
                        {#if data.getRenewContractDocument?.attachmentName == null && data.currentRoleCode == UserRoleConstant.kakitanganKontrak.code}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="contractUploadDocument"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.getRenewContractDocument?.attachmentName == null && data.currentRoleCode == UserRoleConstant.kakitanganKontrak.code}
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                                method="POST"
                                id="contractUploadDocument"
                                use:contractUploadDocumentEnhance
                            >
                                <span
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Muat naik dan isi dokumen berkenaan dan
                                    muat turun ke tempat yang disediakan.</span
                                >
                                <DownloadAttachment
                                    fileName="Surat Penerimaan Kontrak.pdf"
                                    triggerDownload={() =>
                                        handleDownload(data.contractDocLink)}
                                />
                                <!-- <a
                                    href={data.getRenewDocumentTemplate
                                        ?.template}
                                    download={data.getRenewDocumentTemplate
                                        ?.templateName}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{data.getRenewDocumentTemplate
                                        ?.templateName}</a
                                > -->
                                <div class="flex w-full flex-col gap-2 px-3">
                                    <CustomFileField
                                        label="Dokumen Sokongan"
                                        id="renewContractDocument"
                                        bind:files
                                    ></CustomFileField>
                                </div>
                            </form>
                        {:else if data.getRenewContractDocument?.attachmentName == null && data.currentRoleCode !== UserRoleConstant.kakitanganKontrak.code}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu kakitangan kontrak untuk muat naik
                                        dokumen yang berkaitan.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 px-2"
                            >
                                <ContentHeader
                                    title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan Kontrak"
                                    borderClass="border-none"
                                />
                                <span
                                    class="text-sm text-ios-labelColors-secondaryLabel-light"
                                    >Borang-borang yang telah dimuat naik oleh
                                    kakitangan:</span
                                >
                                <a
                                    href={data.getRenewContractDocument
                                        ?.attachment}
                                    download={data.getRenewContractDocument
                                        ?.attachmentName}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{data.getRenewContractDocument
                                        ?.attachmentName}</a
                                >
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Pengesahan Perjanjian Kontrak Baru"
                    >
                        {#if $contractSecretaryApprovalForm.isReadonly == false && data.currentRoleCode == UserRoleConstant.urusSetiaKhidmatSokongan.code}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="contractSecretaryApprovalForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.currentRoleCode !== UserRoleConstant.urusSetiaKhidmatSokongan.code && $contractSecretaryApprovalForm.remark == ''}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu pengesahan dokumen yang telah dimuat
                                        naik oleh kakitangan kontrak.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <ContentHeader
                                title="Tetapkan Pengesahan Perjanjian Kontrak Baru"
                                borderClass="border-b-none"
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                                id="contractSecretaryApprovalForm"
                                method="POST"
                                use:contractSecretaryApprovalEnhance
                            >
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="remark"
                                    disabled={$contractSecretaryApprovalForm.isReadonly}
                                    bind:val={$contractSecretaryApprovalForm.remark}
                                    errors={$contractSecretaryApprovalError.remark}
                                />
                                <CustomRadioBoolean
                                    id="status"
                                    label="Keputusan"
                                    disabled={$contractSecretaryApprovalForm.isReadonly}
                                    options={data.inputOption.verifyOption}
                                    bind:val={$contractSecretaryApprovalForm.status}
                                    errors={$contractSecretaryApprovalError.status}
                                />
                            </form>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    </Stepper>
</section>

<Toaster />
