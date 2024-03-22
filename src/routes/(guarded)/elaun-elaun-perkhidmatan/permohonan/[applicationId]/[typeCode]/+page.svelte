<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import {
        ServiceAllowanceEndorsementSchema,
        ServiceAllowanceInfoCeremonyDressSchema,
        type ServiceAllowanceDocument,
        type ServiceAllowanceInfoCeremonyDress,
    } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import {
        ServiceAllowanceTypeConstant,
        ServiceAllowanceStepperConstant,
    } from '$lib/constants/core/service-allowance.constant';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { FileHelper } from '$lib/helpers/core/file.helper';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type {
        DocumentList,
        ServiceAllowanceDocumentDTO,
        ServiceAllowanceInfoCeremonyDressDTO,
    } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto';
    import { _submitCeremonyDressForm } from './+page';
    import { z } from 'zod';
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';

    export let data: PageData;

    let files: FileList;

    function removeFile(fileToRemove: File) {
        const dt = new DataTransfer();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (file.name !== fileToRemove.name) dt.items.add(file);
            }
        }
        files = dt.files;
    }

    // detail form
    const {
        form: ceremonyDressDetailForm,
        errors: ceremonyDressDetailErrors,
        enhance: ceremonyDressDetailEnhance,
    } = superForm(data.props.detailFormCeremonyDress, {
        id: 'ceremonyDressDetailForm',
        SPA: true,
        validators: zodClient(ServiceAllowanceInfoCeremonyDressSchema),
        onSubmit() {

            const detailFormCeremonyDressData: ServiceAllowanceInfoCeremonyDressDTO = {
                documents: [],
                allowanceId: null,
                allowanceTypeCode: $ceremonyDressDetailForm.allowanceTypeCode,
                allowanceType: null,
                reason: $ceremonyDressDetailForm.reason,
                personal: $ceremonyDressDetailForm.personal,
                partner: $ceremonyDressDetailForm.partner,
            }

            _submitCeremonyDressForm(detailFormCeremonyDressData, files);
        },
    });

    // director feedback form
    const {
        form: directorFeedbackForm,
        errors: directorFeedbackErrors,
        enhance: directorFeedbackEnhance,
    } = superForm(data.props.directorFeedbackForm, {
        id: 'directorFeedbackForm',
        SPA: true,
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        onSubmit(input) {},
    });

    // secretary feedback form
    const {
        form: secretaryCheckForm,
        errors: secretaryCheckErrors,
        enhance: secretaryCheckEnhance,
    } = superForm(data.props.secretaryCheckForm, {
        id: 'secretaryCheckForm',
        SPA: true,
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        onSubmit(input) {},
    });

    // supporter feedback form
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.props.supporterFeedbackForm, {
        id: 'supporterFeedbackForm',
        SPA: true,
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        onSubmit(input) {},
    });

    // approver feedback form
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.props.approverFeedbackForm, {
        id: 'approverFeedbackForm',
        SPA: true,
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        onSubmit(input) {},
    });

    function _handleAllowanceTypeChange(currentAllowanceTypeCode: string) {
        switch (currentAllowanceTypeCode) {
            case ServiceAllowanceTypeConstant.bantuanPakaianIstiadat.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.ceremonyDress;
                break;
            case ServiceAllowanceTypeConstant.bantuanPakaianPanas.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.warmClothes;
                break;
            case ServiceAllowanceTypeConstant.tambangMengunjungiWilayahAsal
                .code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.hometownVisit;
                break;
            case ServiceAllowanceTypeConstant.bantuanMengurusJenazah.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.funeral;
                break;
            case ServiceAllowanceTypeConstant.tabungKebajikanKakitangan.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.welfareFund;
                break;
            case ServiceAllowanceTypeConstant.perpindahanRumah.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.houseMoving;
                break;
            case ServiceAllowanceTypeConstant.pembayaranBalikPassport.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.passportClaim;
                break;
            case ServiceAllowanceTypeConstant.insuransKesihatan.code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.healthInsurance;
                break;
            case ServiceAllowanceTypeConstant.bayaranBalikPengangkutanBarang
                .code:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.shippingClaim;
                break;

            default:
                data.props.currentStepperSet =
                    ServiceAllowanceStepperConstant.ceremonyDress;
                break;
        }

        data.props.currentAllowanceTypeCode = currentAllowanceTypeCode;
    }
</script>
<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tambah Rekod Sejarah Anugerah Perkhidmatan Cemerlang (APC)"
        ><TextIconButton
        type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/elaun-elaun-perkhidmatan/permohonan');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Permohonan">
                {#if data.props.currentApplicationId == 0}
                    
                <TextIconButton
                    type="primary"
                    form="ceremonyDressDetailForm"
                    label="Hantar"
                ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    {#if data.props.currentAllowanceTypeCode == ServiceAllowanceTypeConstant.bantuanPakaianIstiadat.code}
                        <form
                            id="ceremonyDressDetailForm"
                            method="POST"
                            use:ceremonyDressDetailEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={$ceremonyDressDetailForm.allowanceTypeCode}
                                    onValueChange={() => {
                                        _handleAllowanceTypeChange(
                                            $ceremonyDressDetailForm.allowanceTypeCode,
                                        );
                                    }}
                                    options={data.props.dropdownAllowanceType}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props
                                    .currentApplicationId !== 0}
                                    id="reason"
                                    label={'Sebab'}
                                    errors={$ceremonyDressDetailErrors.reason}
                                    bind:val={$ceremonyDressDetailForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props
                                    .currentApplicationId !== 0}
                                type="number"
                                    id="personal"
                                    label={'Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$ceremonyDressDetailErrors.personal}
                                    bind:val={$ceremonyDressDetailForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props
                                    .currentApplicationId !== 0}
                                    id="partner"
                                    type="number"
                                    label={'Jumlah Untuk Pasangan (RM)'}
                                    errors={$ceremonyDressDetailErrors.partner}
                                    bind:val={$ceremonyDressDetailForm.partner}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <input type="file" multiple bind:files />
                                {#if files}
                                    {#each Array.from(files) as file}
                                        <div>
                                            <button
                                                class="contrast outline"
                                                on:click={() =>
                                                    removeFile(file)}>❌</button
                                            >
                                            {file.name}
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </form>
                    {:else if data.props.currentAllowanceTypeCode == ServiceAllowanceTypeConstant.bantuanPakaianPanas.code}
                        <form
                            id="allowanceForm"
                            method="POST"
                            use:ceremonyDressDetailEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={$ceremonyDressDetailForm.allowanceTypeCode}
                                    onValueChange={() => {
                                        _handleAllowanceTypeChange(
                                            $ceremonyDressDetailForm.allowanceTypeCode,
                                        );
                                    }}
                                    options={data.props.dropdownAllowanceType}
                                ></CustomSelectField>
                            </div>
                        </form>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- DIRECTOR FEEDBACK FORM -->
        {#if data.props.currentStepperSet.directorFeedback}
            <StepperContent>
                <StepperContentHeader title="Keputusan Pengarah"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="directorFeedbackForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="directorApprove"
                                    label={'Pengesahan Permohonan'}
                                    bind:val={$directorFeedbackForm.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$directorFeedbackErrors.remark}
                                    bind:val={$directorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- SECRETARY CHECK FORM -->
        {#if data.props.currentStepperSet.secretaryCheck}
            <StepperContent>
                <StepperContentHeader title="Semakan Urus Setia"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="secretaryCheckForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="secretaryCheck"
                                    label={'Adakah Permohonan Ini Sah dan Lengkap?'}
                                    bind:val={$secretaryCheckForm.status}
                                    errors={$secretaryCheckErrors.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$secretaryCheckErrors.remark}
                                    bind:val={$secretaryCheckForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ENDORSER DETAIL FORM -->
        {#if data.props.currentStepperSet.endorserDetail}
            <StepperContent>
                <StepperContentHeader title="Maklumat Penyokong dan Pelulus"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="directorFeedbackForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="directorApprove"
                                    label={'Pengesahan Permohonan'}
                                    bind:val={$directorFeedbackForm.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$directorFeedbackErrors.remark}
                                    bind:val={$directorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- SUPPORTER FEEDBACK FORM -->
        {#if data.props.currentStepperSet.supporterFeedback}
            <StepperContent>
                <StepperContentHeader title="Keputusan Penyokong"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="supporterFeedbackForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="directorApprove"
                                    label={'Adakah Anda Menyokong Permohonan Ini?'}
                                    bind:val={$supporterFeedbackForm.status}
                                    errors={$supporterFeedbackErrors.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$supporterFeedbackErrors.remark}
                                    bind:val={$supporterFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- APPROVER FEEDBACK FORM -->
        {#if data.props.currentStepperSet.approverFeedback}
            <StepperContent>
                <StepperContentHeader title="Keputusan Pelulus"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="approverFeedbackForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="approverApprove"
                                    label={'Adakah Anda Meluluskan Permohonan Ini?'}
                                    bind:val={$approverFeedbackForm.status}
                                    errors={$approverFeedbackErrors.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$approverFeedbackErrors.remark}
                                    bind:val={$approverFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- SECRETARY VERIFICATION FORM -->
        {#if data.props.currentStepperSet.secretaryVerification}
            <StepperContent>
                <StepperContentHeader title="Pengesahan Urus Setia"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="directorFeedbackForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="directorApprove"
                                    label={'Pengesahan Permohonan'}
                                    bind:val={$directorFeedbackForm.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$directorFeedbackErrors.remark}
                                    bind:val={$directorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- CONFIRMATION FORM -->
        {#if data.props.currentStepperSet.confirmation}
            <StepperContent>
                <StepperContentHeader title="Pengesahan Permohonan"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="directorFeedbackForm"
                            method="POST"
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationId !== 0}
                                    id="directorApprove"
                                    label={'Pengesahan Permohonan'}
                                    bind:val={$directorFeedbackForm.status}
                                    options={data.props
                                        .dropdownEndorsementOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$directorFeedbackErrors.remark}
                                    bind:val={$directorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
