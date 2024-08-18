<script lang="ts">
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import DocumentInput from '$lib/components/document-input/DocumentInput.svelte';
    import SuratPertukaran from '$lib/components/letter/SuratPertukaran.svelte';
    import SingleChoiceInput from '$lib/components/inputs/single-choice-input/SingleChoiceInput.svelte';

    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import type { PageData } from './$types';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveAltOptions,
        approveOptions,
        commonOptions,
        supportAltOptions,
    } from '$lib/constants/core/radio-option-constants';
    import CustomBanner from '$lib/components/banner/CustomBanner.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        TransferApplicationAcceptanceLetterDetailSchema,
        TransferApplicationAssignDirectorSchema,
        TransferApplicationAssignPostponeApproverSchema,
        TransferApplicationConfirmationSchema,
        TransferApplicationDirectorSupportSchema,
        TransferApplicationEmployeeDetailSchema,
        TransferApplicationEndorsementSchema,
        TransferApplicationEndorserDetailSchema,
        TransferApplicationMeetingResultSchema,
        TransferApplicationPostponeDetailSchema,
        TransferApplicationPostponeLetterDetailSchema,
        TransferApplicationServiceDetailSchema,
        TransferApplicationTransferDetailSchema,
        TransferApplicationTransferDocumentSchema,
        type EthicalIssueType,
        type TransferApplicationAcceptanceLetterDetailType,
        type TransferApplicationConfirmationType,
        type TransferApplicationTransferDetailType,
    } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
    import {
        _applicationConfirmationSubmit,
        _applicationDetailSubmit,
    } from './+page';
    import MultiChoiceInput from '$lib/components/inputs/multiple-choice-input/MultiChoiceInput.svelte';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
    import { LookupHelper } from '$lib/helpers/core/lookup.helper';
    import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';

    export let data: PageData;

    // employee detail
    const {
        form: employeeDetailForm,
        errors: employeeDetailErrors,
        enhance: employeeDetailEnhance,
    } = superForm(data.forms.employeeDetailForm, {
        id: 'employeeDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationEmployeeDetailSchema),
        onSubmit(input) {},
    });

    // service detail
    const {
        form: serviceDetailForm,
        errors: serviceDetailErrors,
        enhance: serviceDetailEnhance,
    } = superForm(data.forms.serviceDetailForm, {
        id: 'serviceDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationServiceDetailSchema),
        onSubmit(input) {},
    });

    // transfer detail
    const {
        form: transferDetailForm,
        errors: transferDetailErrors,
        enhance: transferDetailEnhance,
    } = superForm(data.forms.transferDetailForm, {
        dataType: 'json',
        id: 'transferDetailForm',
        SPA: true,
        resetForm: false,
        invalidateAll: true,
        validators: zodClient(TransferApplicationTransferDetailSchema),
        onSubmit(input) {
            $transferDetailForm.applicationId = null;
            $transferDetailForm.transferType = 'Permohonan Sendiri';
            _applicationDetailSubmit($transferDetailForm).then((value) => {
                const response = value as CommonResponseDTO;

                if (response.status == 'success') {
                    let tempTransferDetails: TransferApplicationTransferDetailType =
                        response.data
                            ?.details as TransferApplicationTransferDetailType;

                    goto(
                        '/v2/employment/transfer/application/self/' +
                            tempTransferDetails.applicationId,
                    );
                }
            });
        },
    });

    // applicationConfirmation
    const {
        form: applicationConfirmationForm,
        errors: applicationConfirmationErrors,
        enhance: applicationConfirmationEnhance,
    } = superForm(data.forms.applicationConfirmationForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationConfirmationSchema),
        onSubmit() {
            _applicationConfirmationSubmit(
                $applicationConfirmationForm,
            ).then((res) => {
                if(res.status == 'success'){
                    $applicationConfirmationForm = data.props.currentApplicationDetails.confirmation;
                    $transferDetailForm = data.props.currentApplicationDetails.transferDetails;
                }
            })
        },
    });

    
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader
        title="Permohonan Pertukaran - Permohonan Sendiri {data.props
            .currentApplicationId}"
    >
        <TextIconButton
            type="draft"
            label="Kembali"
            onClick={() => {
                goto('/v2/employment/transfer');
            }}
        >
            <SvgChevronLeft></SvgChevronLeft>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <!-- ======================================================================= -->
        <!-- PERSONAL DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Peribadi">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="employeeDetailForm"
                                method="POST"
                                use:employeeDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1 p-5"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    bind:val={$employeeDetailForm.name}
                                    bind:errors={$employeeDetailErrors.name}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label="No. Kad Pengenalan"
                                    type="text"
                                    bind:val={$employeeDetailForm.identityDocumentNumber}
                                    bind:errors={$employeeDetailErrors.identityDocumentNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="employeeNumber"
                                    label="No. Pekerja"
                                    type="text"
                                    bind:val={$employeeDetailForm.employeeNumber}
                                    bind:errors={$employeeDetailErrors.employeeNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="phone"
                                    label="No. Telefon Bimbit"
                                    type="text"
                                    bind:val={$employeeDetailForm.phone}
                                    bind:errors={$employeeDetailErrors.phone}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="maritalStatus"
                                    label="Status"
                                    type="text"
                                    bind:val={$employeeDetailForm.maritalStatus}
                                    bind:errors={$employeeDetailErrors.maritalStatus}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childCount"
                                    label="Bilangan Anak"
                                    type="text"
                                    bind:val={$employeeDetailForm.childCount}
                                    bind:errors={$employeeDetailErrors.childCount}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childInSchoolCount"
                                    label="Bilangan Anak Bersekolah"
                                    type="text"
                                    bind:val={$employeeDetailForm.childInSchoolCount}
                                    bind:errors={$employeeDetailErrors.childInSchoolCount}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- SERVICE DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="serviceDetailForm"
                                method="POST"
                                use:serviceDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1 p-5"
                            >
                                <CustomTextField
                                    disabled
                                    id="position"
                                    label="Nama Jawatan"
                                    type="text"
                                    bind:val={$serviceDetailForm.position}
                                    bind:errors={$serviceDetailErrors.position}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="grade"
                                    label="Gred"
                                    type="text"
                                    bind:val={$serviceDetailForm.grade}
                                    bind:errors={$serviceDetailErrors.grade}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="hiringDate"
                                    label="Tarikh Lantikan"
                                    type="text"
                                    bind:val={$serviceDetailForm.hiringDate}
                                    bind:errors={$serviceDetailErrors.hiringDate}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="officeName"
                                    label="Nama Jabatan"
                                    type="text"
                                    bind:val={$serviceDetailForm.officeName}
                                    bind:errors={$serviceDetailErrors.officeName}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="officeAddress"
                                    label="Alamat Jabatan"
                                    type="text"
                                    bind:val={$serviceDetailForm.officeAddress}
                                    bind:errors={$serviceDetailErrors.officeAddress}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="department"
                                    label="Bahagian/ Unit"
                                    type="text"
                                    bind:val={$serviceDetailForm.department}
                                    bind:errors={$serviceDetailErrors.department}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="servicePeriod"
                                    label="Tempoh Perkhidmatan Di Penempatan Sekarang"
                                    type="text"
                                    bind:val={$serviceDetailForm.servicePeriod}
                                    bind:errors={$serviceDetailErrors.servicePeriod}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- APPLICATION DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan">
                <TextIconButton
                    label="Simpan"
                    type="draft"
                    icon="save"
                    form="transferDetailForm"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- notes starts here -->
                        <div
                            class="flex w-full flex-col items-center justify-start bg-slate-50 p-2"
                        >
                            <p
                                class="w-full text-wrap text-start text-base font-medium text-slate-500"
                            >
                                Sila baca keterangan yang berikut sebelum
                                mengisi borang:
                            </p>
                            <ol
                                class="w-full list-decimal px-4 text-start text-base text-slate-500"
                            >
                                <li class="w-full">
                                    Borang ini hendaklah diisi dalam dua (2)
                                    salinan.
                                </li>
                                <li>
                                    Sebarang perubahan maklumat kepada
                                    permohonan pertukaran yang telah didaftarkan
                                    hendaklah dimaklumkan secara bertulis.
                                </li>
                                <li>
                                    Bagi permohonan kerana mengikut pasangan
                                    (suami/isteri), salinan Sijil Nikah dan
                                    Surat Akuan Majikan pasangan hendaklah
                                    disertakan.
                                </li>
                                <li>
                                    Permohonan ini sah dan berkuatkuasa bagi
                                    tempoh satu (1) tahun dari tarikh
                                    permohonan. Selepas tempoh tersebut,
                                    permohonan ini akan terbatal dengan
                                    sendirinya dan sekiranya tuan dan puan masih
                                    berminat untuk bertukar, sila kemukakan
                                    permohonan baharu.
                                </li>
                            </ol>
                        </div>
                        <!-- notes ends here -->

                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <p>
                                {$transferDetailForm.isDraft}
                            </p>
                            <form
                                id="transferDetailForm"
                                method="POST"
                                use:transferDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1 px-5"
                            >
                                <MultiChoiceInput
                                    id="category"
                                    label="Jenis Pertukaran"
                                    choices={data.lookup.transferCategoryOption}
                                    bind:val={$transferDetailForm.category}
                                    disabled={!$transferDetailForm.isDraft}
                                ></MultiChoiceInput>
                                <CustomSelectField
                                    id="appliedLocation"
                                    label={'Pilihan Penempatan'}
                                    bind:val={$transferDetailForm.appliedLocation}
                                    bind:errors={$transferDetailErrors.appliedLocation}
                                    options={data.lookup.placementDropdown}
                                    disabled={!$transferDetailForm.isDraft}
                                ></CustomSelectField>
                                <MultiChoiceInput
                                    id="reason"
                                    label="Alasan Pertukaran"
                                    choices={data.lookup.transferReasonOption}
                                    bind:val={$transferDetailForm.reason}
                                    disabled={!$transferDetailForm.isDraft}
                                ></MultiChoiceInput>

                                {#if $transferDetailForm.reason.includes('Lain-lain (sila nyatakan)')}
                                    <CustomTextField
                                        id="remark"
                                        label="Sila Berikan Penjelasan Sekiranya Anda Memilih Lain-lain Sebagai Alasan Pertukaran"
                                        bind:val={$transferDetailForm.remark}
                                        bind:errors={$transferDetailErrors.remark}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                {/if}

                                {#if $transferDetailForm.reason.includes('Mengikut Pasangan')}
                                    <p
                                        class="text-base font-medium text-slate-700"
                                    >
                                        Sekiranya Alasan Pertukaran Pemohon
                                        Kerana Mengikut Pasangan Sila Isikan
                                        Maklumat Pasangan Seperti Berikut:
                                    </p>

                                    <CustomTextField
                                        id="workPlaceDistance"
                                        label="Jarak Tempat Kerja (KM) Pasangan Dari Penempatan Anda Sekarang"
                                        type="number"
                                        bind:val={$transferDetailForm.workPlaceDistance}
                                        bind:errors={$transferDetailErrors.workPlaceDistance}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="employerName"
                                        type="text"
                                        label="Nama Majikan Pasangan"
                                        bind:val={$transferDetailForm.employerName}
                                        bind:errors={$transferDetailErrors.employerName}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label="Tarikh Pasangan Mula Berkhidmat Di Penempatan Sekarang"
                                        isRequired={false}
                                        bind:val={$transferDetailForm.startDate}
                                        bind:errors={$transferDetailErrors.startDate}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                {/if}

                                <DocumentInput
                                    bind:documents={$transferDetailForm.documents}
                                    label="Surat Permohonan Pertukaran"
                                    disabled={!$transferDetailForm.isDraft}
                                ></DocumentInput>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- EMPLOYEE CONFIRMATION -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pemohon">
                <TextIconButton
                    label="Hantar"
                    type="primary"
                    icon="check"
                    form="applicationConfirmationForm"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 xl:w-1/2"
                    >
                        <CustomBanner
                            text="Sila buat perakuan anda di bawah dan klik butang Hantar untuk menghantar permohonan ini ke Urus Setia Perjawatan dan diproses."
                        ></CustomBanner>
                        <form
                            id="applicationConfirmationForm"
                            method="POST"
                            use:applicationConfirmationEnhance
                            class="flex w-full flex-col items-start justify-start gap-4 p-5"
                        >
                            <div
                                class="flex w-full flex-row items-start justify-start gap-2"
                            >
                                <div
                                    class="flex h-6 w-fit flex-col items-center justify-center"
                                >
                                    <input
                                        id="status"
                                        type="checkbox"
                                        bind:checked={$applicationConfirmationForm.status}
                                        class="rounded focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <p
                                    class="text-justify text-base font-normal leading-loose tracking-wide text-slate-700"
                                >
                                    Saya sesungguhnya mengakui bahawa semua
                                    keterangan di atas adalah benar. Lembaga
                                    Kemajuan Ikan Malaysia (LKIM) berhak
                                    membatalkan permohonan saya jika didapati
                                    ada maklumat yang tidak benar. Saya faham
                                    bahawa pertukaran ini hanyalah ke Ibu
                                    Pejabat/Negeri/Wilayah yang saya nyatakan di
                                    atas sahaja. Saya juga faham bahawa
                                    penempatan saya ke mana-mana tempat di dalam
                                    Ibu Pejabat/Negeri/Wilayah itu adalah
                                    terpulang kepada pertimbangan dan sokongan
                                    Pengarah Bahagian/Negeri berkenaan. Saya
                                    juga mengambil maklum bahawa sekiranya saya
                                    membatalkan pertukaran yang telah diluluskan
                                    oleh Jawatankuasa Penyelarasan Penempatan
                                    Pegawai dan Kakitangan LKIM, saya tidak
                                    layak beri sebarang pertimbangan pertukaran
                                    ke tempat yang sama dalam tempoh satu (1)
                                    tahun dari tarikh pembatalan dilakukan.
                                </p>
                            </div>
                            <CustomTextField
                                disabled
                                id="date"
                                type="date"
                                label="Tarikh Perakuan"
                                bind:val={$applicationConfirmationForm.date}
                                bind:errors={$applicationConfirmationErrors.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
