<script lang="ts">
    import { goto } from '$app/navigation';
    import { Toaster } from 'svelte-french-toast';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { ServiceAllowanceTypeConstant } from '$lib/constants/core/service-allowance.constant';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zod, zodClient } from 'sveltekit-superforms/adapters';
    import {
        _addTambangMengunjungiWilayahAsalSchemaSchema,
        _serviceAllowanceApproverFeedbackSchema,
        _serviceAllowanceSuppAppDetailSchema,
        _serviceAllowanceSupporterFeedbackSchema,
        _serviceAllowanceVerificationSchema,
    } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
    import {
        _submitAllowanceDetail,
        _submitApproverFeedbackForm,
        _submitSuppAppDetailsForm,
        _submitSupporterFeedbackForm,
        _submitVerificationForm,
    } from './+page';
    import { Alert } from 'flowbite-svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';

    export let data: PageData;

    function _handleAllowanceTypeChange(allowanceTypeCode: string) {
        const tempAllowanceType: LookupDTO =
            ServiceAllowanceTypeConstant.list.find(
                (item) => item.code === allowanceTypeCode,
            ) ?? ServiceAllowanceTypeConstant.bantuanPakaianIstiadat;

        const newUrl: string =
            '/elaun-elaun-perkhidmatan/permohonan/' +
            data.props.applicationId +
            '/' +
            tempAllowanceType.url;
        goto(newUrl, { replaceState: true });
    }

    // application detail form
    const {
        form: detailForm,
        errors: detailErrors,
        enhance: detailEnhance,
    } = superForm(data.props.allowanceDetailForm, {
        id: 'detailForm',
        SPA: true,
        validators: zodClient(_addTambangMengunjungiWilayahAsalSchemaSchema),
        onSubmit(input) {
            _submitAllowanceDetail($detailForm);
        },
    });

    // verification form
    const {
        form: verificationForm,
        errors: verificationErrors,
        enhance: verificationEnhance,
    } = superForm(data.props.verificationForm, {
        id: 'verificationForm',
        SPA: true,
        validators: zodClient(_serviceAllowanceVerificationSchema),
        onSubmit(input) {
            $verificationForm.allowanceTypeCode =
                data.props.currentAllowanceType;
            $verificationForm.allowanceId = data.props.allowanceId;
            _submitVerificationForm($verificationForm);
        },
    });

    // supporter n approver form
    const {
        form: suppAppDetailsForm,
        errors: suppAppDetailsErrors,
        enhance: suppAppDetailsEnhance,
    } = superForm(data.props.suppporterApproverDetailForm, {
        id: 'suppAppDetailForm',
        SPA: true,
        validators: zodClient(_serviceAllowanceSuppAppDetailSchema),
        onSubmit(input) {
            $suppAppDetailsForm.allowanceTypeCode =
                data.props.currentAllowanceType;
            $suppAppDetailsForm.allowanceId = data.props.allowanceId;
            _submitSuppAppDetailsForm($suppAppDetailsForm);
        },
    });
    // supporter feedback form
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.props.supporterFeedbackForm, {
        id: 'supportForm',
        SPA: true,
        validators: zodClient(_serviceAllowanceSupporterFeedbackSchema),
        onSubmit(input) {
            _submitSupporterFeedbackForm($supporterFeedbackForm);
        },
    });
    // approver feedback form
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.props.approverFeedbackForm, {
        id: 'approveForm',
        SPA: true,
        validators: zodClient(_serviceAllowanceApproverFeedbackSchema),
        onSubmit(input) {
            _submitApproverFeedbackForm($approverFeedbackForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Elaun-elaun Perkhidmatan">
        <TextIconButton
            type="neutral"
            label="Kembali"
            icon="previous"
            onClick={() => {
                goto('/elaun-elaun-perkhidmatan/permohonan');
            }}
        ></TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper activeIndex={0}>
        <StepperContent stepperId="allowanceDetail">
            <StepperContentHeader title="Butiran Permohonan">
                {#if data.props.currentRoleCode == UserRoleConstant.kakitangan.code && data.props.allowanceId == 0}
                    <TextIconButton
                        type="primary"
                        form="allowanceForm"
                        label="Hantar"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="allowanceForm"
                        method="POST"
                        use:detailEnhance
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                disabled={data.props.applicationId !== 'baru'}
                                id="allowanceType"
                                label={'Jenis Elaun'}
                                errors={$detailErrors.allowanceTypeCode}
                                bind:val={$detailForm.allowanceTypeCode}
                                onValueChange={() => {
                                    _handleAllowanceTypeChange(
                                        $detailForm.allowanceTypeCode,
                                    );
                                }}
                                options={data.props.allowanceTypeDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                disabled={data.props.applicationId !== 'baru'}
                                id="applyCode"
                                label={'Permohonan Untuk'}
                                errors={$detailErrors.applyCode}
                                bind:val={$detailForm.applyCode}
                                options={data.props.applyOnBehalfDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                disabled={data.props.applicationId !== 'baru'}
                                id="stateCode"
                                label={'Wilayah Asal'}
                                errors={$detailErrors.stateCode}
                                bind:val={$detailForm.stateCode}
                                options={data.props.stateDropdown}
                            ></CustomSelectField>
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- **************************************************** -->
        <!-- Verification Form -->
        <!-- **************************************************** -->
        <StepperContent stepperId="allowanceVerification">
            <StepperContentHeader title="Pengesahan Permohonan"
                >{#if data.props.currentRoleCode == UserRoleConstant.urusSetiaElaunElaunPerkhidmatan.code && data.props.fullApplicationDetail.verification === null}
                    <TextIconButton
                        type="primary"
                        form="verificationForm"
                        label="Hantar"
                    ></TextIconButton>
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="verificationForm"
                        method="POST"
                        use:verificationEnhance
                        class="flex w-full flex-col items-center justify-start space-y-4 p-2 lg:w-1/2"
                    >
                        <Alert
                            color="blue"
                            defaultClass="p-2 gap-3 text-sm w-full text-ios-systemColors-systemBlue-light rounded"
                        >
                            <SvgInfoSolid slot="icon"></SvgInfoSolid>
                            <span
                                class="font-medium text-ios-systemColors-systemBlue-light"
                                >Perhatian!</span
                            >
                            Bahagian ini untuk diisi oleh Urus Setia
                        </Alert>
                        <fieldset
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                {$verificationForm.status}
                                <CustomRadioField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant
                                            .urusSetiaElaunElaunPerkhidmatan
                                            .code ||
                                        data.props.fullApplicationDetail
                                            .verification !== null}
                                    id="status"
                                    label={'Pengesahan Permohonan'}
                                    options={data.props
                                        .verificationStatusOption}
                                    bind:val={$verificationForm.status}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant
                                            .urusSetiaElaunElaunPerkhidmatan
                                            .code ||
                                        data.props.fullApplicationDetail
                                            .verification !== null}
                                    id="remark"
                                    label={'Ulasan'}
                                    bind:val={$verificationForm.remark}
                                ></CustomTextField>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- **************************************************** -->
        <!-- Maklumat Penyokong Dan Pelulus Form -->
        <!-- **************************************************** -->
        <StepperContent stepperId="allowanceSuppAppDetail">
            <StepperContentHeader title="Maklumat Penyokong Dan Pelulus">
                {#if data.props.currentRoleCode == UserRoleConstant.urusSetiaElaunElaunPerkhidmatan.code && data.props.fullApplicationDetail.supportApprover === null}
                    <TextIconButton
                        type="primary"
                        form="suppAppDetailForm"
                        label="Hantar"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="suppAppDetailForm"
                        method="POST"
                        use:suppAppDetailsEnhance
                        class="flex w-full flex-col items-center justify-start space-y-4 p-2 lg:w-1/2"
                    >
                        <Alert
                            color="blue"
                            defaultClass="p-2 gap-3 text-sm w-full text-ios-systemColors-systemBlue-light rounded"
                        >
                            <SvgInfoSolid slot="icon"></SvgInfoSolid>
                            <span
                                class="font-medium text-ios-systemColors-systemBlue-light"
                                >Perhatian!</span
                            >
                            Bahagian ini untuk diisi oleh Urus Setia
                        </Alert>
                        <fieldset
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant
                                            .urusSetiaElaunElaunPerkhidmatan
                                            .code ||
                                        data.props.fullApplicationDetail
                                            .supportApprover !== null}
                                    id="supporter"
                                    label={'Nama Penyokong'}
                                    errors={$suppAppDetailsErrors.supporter}
                                    bind:val={$suppAppDetailsForm.supporter}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant
                                            .urusSetiaElaunElaunPerkhidmatan
                                            .code ||
                                        data.props.fullApplicationDetail
                                            .supportApprover !== null}
                                    id="approver"
                                    label={'Nama Pelulus'}
                                    errors={$suppAppDetailsErrors.approver}
                                    bind:val={$suppAppDetailsForm.approver}
                                ></CustomTextField>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- **************************************************** -->
        <!-- Supporter Feedback Form -->
        <!-- **************************************************** -->
        <StepperContent stepperId="allowanceSupport">
            <StepperContentHeader title="Maklum Balas Daripada Penyokong">
                {#if data.props.currentRoleCode == UserRoleConstant.penyokong.code && data.props.fullApplicationDetail.support === null}
                    <TextIconButton
                        type="primary"
                        form="supporterFeedbackForm"
                        label="Hantar"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="supporterFeedbackForm"
                        method="POST"
                        use:supporterFeedbackEnhance
                        class="flex w-full flex-col items-center justify-start space-y-4 p-2 lg:w-1/2"
                    >
                        <Alert
                            color="blue"
                            defaultClass="p-2 gap-3 text-sm w-full text-ios-systemColors-systemBlue-light rounded"
                        >
                            <SvgInfoSolid slot="icon"></SvgInfoSolid>
                            <span
                                class="font-medium text-ios-systemColors-systemBlue-light"
                                >Perhatian!</span
                            >
                            Bahagian ini untuk diisi oleh penyokong yang telah dipilih.
                        </Alert>
                        <fieldset
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant.penyokong.code ||
                                        data.props.fullApplicationDetail
                                            .support !== null}
                                    id="status"
                                    label={'Penyokongan Permohonan'}
                                    options={data.props.supportStatusOption}
                                    errors={$supporterFeedbackErrors.status}
                                    bind:val={$supporterFeedbackForm.status}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant.penyokong.code ||
                                        data.props.fullApplicationDetail
                                            .support !== null}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$supporterFeedbackErrors.remark}
                                    bind:val={$supporterFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- **************************************************** -->
        <!-- Approver Feedback Form -->
        <!-- **************************************************** -->
        <StepperContent stepperId="allowanceApprove">
            <StepperContentHeader title="Maklum Balas Daripada Pelulus">
                {#if data.props.currentRoleCode == UserRoleConstant.penyokong.code && data.props.fullApplicationDetail.approval === null}
                    <TextIconButton
                        type="primary"
                        form="approverFeedbackForm"
                        label="Hantar"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="approverFeedbackForm"
                        method="POST"
                        use:approverFeedbackEnhance
                        class="flex w-full flex-col items-center justify-start space-y-4 p-2 lg:w-1/2"
                    >
                        <Alert
                            color="blue"
                            defaultClass="p-2 gap-3 text-sm w-full text-ios-systemColors-systemBlue-light rounded"
                        >
                            <SvgInfoSolid slot="icon"></SvgInfoSolid>
                            <span
                                class="font-medium text-ios-systemColors-systemBlue-light"
                                >Perhatian!</span
                            >
                            Bahagian ini untuk diisi oleh pelulus yang telah dipilih.
                        </Alert>
                        <fieldset
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant.pelulus.code ||
                                        data.props.fullApplicationDetail
                                            .approval !== null}
                                    id="status"
                                    label={'Pelulusan Permohonan'}
                                    options={data.props.approvalStatusOption}
                                    errors={$approverFeedbackErrors.status}
                                    bind:val={$approverFeedbackForm.status}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props.currentRoleCode !==
                                        UserRoleConstant.pelulus.code ||
                                        data.props.fullApplicationDetail
                                            .approval !== null}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$approverFeedbackErrors.remark}
                                    bind:val={$approverFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster></Toaster>
