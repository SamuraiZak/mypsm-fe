<script lang="ts">
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import { writable } from 'svelte/store';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import { _addSecretaryApprovalForm } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { error } from '@sveltejs/kit';
    import type { CourseFundReimbursementDetailResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
    import {
        _fundReimbursementApprovalSchema,
        _fundReimbursementDetailResponseSchema,
    } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
    import { Badge } from 'flowbite-svelte';
    import StepperFileNotUploaded from '$lib/components/stepper/StepperFileNotUploaded.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service';
    export let data: PageData;

    let isReadonlySecretaryApprovalResult = writable<boolean>(false);

    let fundReimbursementIsFail = writable<boolean>(false);

    let fundReimbursementNotUploaded = writable<boolean>(false);
    $: {
        data.responses.fundReimbursementDocumentInfoResponse.data?.details.document === null
            ? fundReimbursementNotUploaded.set(true)
            : fundReimbursementNotUploaded.set(false);
        data.responses.fundReimbursementSecretaryApprovalResponse.data?.details
            .status === false
            ? fundReimbursementIsFail.set(true)
            : fundReimbursementIsFail.set(false);

        data.responses.fundReimbursementSecretaryApprovalResponse.data?.details
            .status !== null
            ? isReadonlySecretaryApprovalResult.set(true)
            : isReadonlySecretaryApprovalResult.set(false);
    }

    // Superforms
    const { form, enhance } = superForm(data.forms.fundReimbursementInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
    });

    const { form: reimbursementDocumentsForm } = superForm(
        data.forms.fundReimbursementDocumentForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const { form: personalInfoForm, enhance: personalInfoEnhance } = superForm(
        data.forms.fundReimbursementPersonalInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const { form: serviceInfoForm, enhance: serviceInfoEnhance } = superForm(
        data.forms.fundReimbursementServiceInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const {
        form: secretaryApprovalInfoForm,
        errors: secretaryApprovalInfoErrors,
        enhance: secretaryApprovalInfoEnhance,
        isTainted: secretaryApprovalInfoIsTainted,
    } = superForm(data.forms.fundReimbursementSecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundReimbursementApprovalSchema),
        onSubmit() {
            if (!secretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $secretaryApprovalInfoForm.id = (
                data.responses.fundReimbursementDetailResponse.data
                    ?.details as CourseFundReimbursementDetailResponseDTO
            ).id;
            _addSecretaryApprovalForm($secretaryApprovalInfoForm);
        },
    });

    const handleDownload = async (url: string) => {
        await CourseFundReimbursementServices.downloadAttachment(url);
    };
</script>

<ContentHeader title="Maklumat Tuntutan Pembiayaan Yuran Pembelajaran">
    {#if data.responses.fundReimbursementSecretaryApprovalResponse.data?.details && data.responses.fundReimbursementSecretaryApprovalResponse.data?.details.status === true}
        <Badge color="green">Permohonan LULUS</Badge>
    {:else if $fundReimbursementIsFail}
        <Badge color="red">Permohonan TIDAK BERJAYA</Badge>
    {/if}
    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../tuntutan-yuran');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi" />
        <StepperContentBody>
            <!-- Maklumat Peribadi -->
            <form
                id="personalInfoStepper"
                method="POST"
                use:personalInfoEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    disabled
                    id="employeeNo"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.employeeNo}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="identityCard"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.identityCard}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    id="identityCardColor"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    options={data.selectionOptions.identityCardColorLookup}
                    bind:val={$personalInfoForm.identityCardColor}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="dateOfBirth"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.dateOfBirth}
                ></CustomTextField>
                <CustomSelectField
                    disabled
                    id="placeOfBirth"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.placeOfBirth}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$personalInfoForm.nationality}
                    options={data.selectionOptions.nationalityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$personalInfoForm.race}
                    options={data.selectionOptions.raceLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$personalInfoForm.religion}
                    options={data.selectionOptions.religionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$personalInfoForm.gender}
                    options={data.selectionOptions.genderLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="status"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$personalInfoForm.status}
                    options={data.selectionOptions.maritalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="skim"
                    label="Skim Perkhidmatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.skim}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="grade"
                    label="Gred"
                    placeholder="-"
                    bind:val={$personalInfoForm.grade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="position"
                    label="Jawatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.position}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="currentPlacement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.currentPlacement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="group"
                    label="Kumpulan"
                    placeholder="-"
                    bind:val={$personalInfoForm.group}
                    options={data.selectionOptions.groupLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$personalInfoForm.mailAddress}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="homeNo"
                    label="Nombor Telefon Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeNo}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="mobileNo"
                    label="Nombor Telefon Bimbit"
                    placeholder="-"
                    bind:val={$personalInfoForm.mobileNo}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="housing"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.housing}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.houseLoan}
                />

                <CustomSelectField
                    disabled
                    id="isExPolice"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$personalInfoForm.isExPolice}
                    options={data.selectionOptions.generalLookup}
                ></CustomSelectField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan" />
        <StepperContentBody>
            <form
                id="serviceInfoStepper"
                method="POST"
                use:serviceInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <CustomSelectField
                    disabled
                    id="currentGrade"
                    label="Gred Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentGrade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="currentPosition"
                    label="Jawatan Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentPosition}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="placement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.placement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="serviceType"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.serviceType}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$serviceInfoForm.program}
                    options={data.selectionOptions.programLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="retirementBenefit"
                    label={'Faedah Persaraan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementBenefit}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="EPFNumber"
                    label={'No. KWSP'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.EPFNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="SOCSO"
                    label={'No. SOCSO'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.SOCSO}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="taxIncome"
                    label={'No. Cukai'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.taxIncome}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="bankName"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="accountNumber"
                    label={'No. Akaun'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.accountNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="confirmServiceDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.confirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="actingDate"
                    label={'Pemangkuan Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.actingDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="interimDate"
                    label={'Tanggung Kerja Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.interimDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="pastAttachmentDate"
                    label={'Tarikh Percantuman Perkhidmatan Lepas'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pastAttachmentDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="lastSalaryRaiseDate"
                    label={'Kenaikan Gaji Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastSalaryRaiseDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="lastPromotionDate"
                    label={'Kenaikan Pangkat Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastPromotionDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="pensionScheme"
                    label={'Skim Pencen'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pensionScheme}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementDate}
                ></CustomTextField>

                <ContentHeader title="Maklumat Gaji dan Elaun - Elaun" />
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            id="salaryEffectiveDate"
                            type="number"
                            label={'Tarikh Berkuatkuasa'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.salaryEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id="maximumSalary"
                            type="number"
                            label={'Tangga Gaji'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.maximumSalary}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id="baseSalary"
                            label={'Gaji Pokok'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.baseSalary}
                        ></CustomTextField>
                    </div>
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            id="ITKA"
                            label={'ITKA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITKA}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="ITP"
                            label={'ITP'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITP}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="EPW"
                            label={'EPW'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.EPW}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="COLA"
                            label={'COLA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.COLA}
                        ></CustomTextField>
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                        type="dark"
                        triggeredBy="[id^='type-']"
                        on:show={assignContent}>"{tooltipContent}"</Tooltip
                    > -->
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pembelajaran Diikuti" />
        <StepperContentBody>
            <form
                id="examReimbursementInfoStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <CustomSelectField
                    disabled={true}
                    id="academicLevel"
                    label="Peringkat Kursus Pengajian"
                    placeholder="-"
                    bind:val={$form.academicLevel}
                    options={data.lookups.educationLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={true}
                    id="courseName"
                    label="Nama Kursus Pengajian"
                    type="text"
                    placeholder="-"
                    bind:val={$form.courseName}
                ></CustomTextField>

                <CustomSelectField
                    disabled={true}
                    id="institution"
                    label="Tempat Pengajian"
                    placeholder="-"
                    bind:val={$form.institution}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={true}
                    id="learningInstitution"
                    label="Institusi/Pusat Pembelajaran"
                    placeholder="-"
                    bind:val={$form.learningInstitution}
                    options={data.lookups.institutionLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={true}
                    id="studyDuration"
                    label="Tempoh Pengajian (Tahun)"
                    type="number"
                    placeholder="-"
                    bind:val={$form.studyDuration}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="courseApplicationDate"
                    label="Tarikh Kemasukan Ke IPTA"
                    type="date"
                    placeholder="-"
                    bind:val={$form.courseApplicationDate}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="finishedStudyDate"
                    label="Tamat Pada"
                    type="date"
                    placeholder="-"
                    bind:val={$form.finishedStudyDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled={true}
                    id="semester"
                    label="Tuntutan Untuk Semester"
                    placeholder="-"
                    bind:val={$form.semester}
                    options={[
                        {
                            value: 4,
                            name: 'Empat',
                        },
                        {
                            value: 5,
                            name: 'Lima',
                        },
                        {
                            value: 6,
                            name: 'Enam',
                        },
                    ]}
                ></CustomSelectField>

                <CustomTextField
                    disabled={true}
                    id="finalResult"
                    label="Keputusan Akhir (CGPA/skema pemarkahan berkaitan)"
                    type="text"
                    placeholder="-"
                    bind:val={$form.finalResult}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="totalClaim"
                    label="Jumlah Tuntutan (RM)"
                    type="number"
                    placeholder="-"
                    bind:val={$form.totalClaim}
                ></CustomTextField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody>
            {#if $fundReimbursementNotUploaded}
                <StepperFileNotUploaded />
            {:else}
                <div class="flex w-full flex-col gap-2">
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                    >
                        <p
                            class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                        >
                            Fail-fail yang dimuat naik:
                        </p>

                        {#each $reimbursementDocumentsForm.document as _, i}
                            <div
                                class="flex w-full flex-row items-center justify-between"
                            >
                                <label
                                    for=""
                                    class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    >{i + 1}.</label
                                >
                                <a
                                    href={$reimbursementDocumentsForm.document[
                                        i
                                    ].document}
                                    download={$reimbursementDocumentsForm
                                        .document[i].name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{$reimbursementDocumentsForm.document[i]
                                        .name}</a
                                >
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>

    {#if !$fundReimbursementNotUploaded}
        <StepperContent>
            <StepperContentHeader title="Pengesahan Semakan Urus Setia Latihan">
                {#if !$isReadonlySecretaryApprovalResult && data.role.isCourseSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="examReimbursementSecretaryApprovalForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="examReimbursementSecretaryApprovalForm"
                    method="POST"
                    use:secretaryApprovalInfoEnhance
                    class="flex w-full flex-col gap-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Keputusan Urus Setia Latihan</b
                        >
                    </div>

                    {#if $isReadonlySecretaryApprovalResult || data.role.isCourseSecretaryRole}
                        <input
                            hidden
                            bind:value={$secretaryApprovalInfoForm.id}
                        />

                        <CustomTextField
                            disabled={$isReadonlySecretaryApprovalResult ||
                                !data.role.isCourseSecretaryRole}
                            errors={$secretaryApprovalInfoErrors.remark}
                            id="remark"
                            label="Tindakan/Ulasan"
                            placeholder="-"
                            bind:val={$secretaryApprovalInfoForm.remark}
                        ></CustomTextField>

                        <CustomSelectField
                            disabled={$isReadonlySecretaryApprovalResult ||
                                !data.role.isCourseSecretaryRole}
                            errors={$secretaryApprovalInfoErrors.status}
                            id="status"
                            label="Keputusan"
                            placeholder="-"
                            bind:val={$secretaryApprovalInfoForm.status}
                            options={certifyOptions}
                        ></CustomSelectField>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </form>
                <hr />
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
