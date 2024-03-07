<script lang="ts">
    import { goto } from '$app/navigation';
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
    import { zod } from 'sveltekit-superforms/adapters';
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
        SPA: true,
        validators: zod(_addTambangMengunjungiWilayahAsalSchemaSchema),
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
        SPA: true,
        validators: zod(_serviceAllowanceVerificationSchema),
        onSubmit(input) {
            _submitVerificationForm($verificationForm);
        },
    });

    // supporter n approver form
    const {
        form: suppAppDetailsForm,
        errors: suppAppDetailsErrors,
        enhance: suppAppDetailsEnhance,
    } = superForm(data.props.suppporterApproverDetailForm, {
        SPA: true,
        validators: zod(_serviceAllowanceSuppAppDetailSchema),
        onSubmit(input) {
            _submitSuppAppDetailsForm($suppAppDetailsForm);
        },
    });
    // supporter feedback form
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.props.supporterFeedbackForm, {
        SPA: true,
        validators: zod(_serviceAllowanceSupporterFeedbackSchema),
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
        SPA: true,
        validators: zod(_serviceAllowanceApproverFeedbackSchema),
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
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan"
            ></StepperContentHeader>
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
                                id="applyCode"
                                label={'Permohonan Untuk'}
                                errors={$detailErrors.applyCode}
                                bind:val={$detailForm.applyCode}
                                options={data.props.applyOnBehalfDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
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
        <StepperContent>
            <StepperContentHeader title="Pengesahan Permohonan"
            ></StepperContentHeader>
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
                            disabled={data.props.currentRoleCode ===
                                UserRoleConstant.urusSetiaElaunElaunPerkhidmatan
                                    .code}
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    id="status"
                                    label={'Adakah Pengesah Ini Sah?'}
                                    options={data.props
                                        .verificationStatusOption}
                                    val={false}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
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
        <StepperContent>
            <StepperContentHeader title="Maklumat Penyokong Dan Pelulus"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="suppAppDetailForm"
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
                            Bahagian ini untuk diisi oleh Urus Setia
                        </Alert>
                        <fieldset
                            disabled={data.props.currentRoleCode ===
                                UserRoleConstant.urusSetiaElaunElaunPerkhidmatan
                                    .code}
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="supporter"
                                    label={'Nama Penyokong'}
                                    errors={$suppAppDetailsErrors.supporter}
                                    bind:val={$suppAppDetailsForm.supporter}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
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
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Daripada Penyokong"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="supporterFeedbackForm"
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
                            Bahagian ini untuk diisi oleh penyokong yang telah dipilih.
                        </Alert>
                        <fieldset
                            disabled={data.props.currentRoleCode ===
                                UserRoleConstant.penyokong.code}
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    id="status"
                                    label={'Penyokongan Permohonan'}
                                    options={data.props.supportStatusOption}
                                    errors={$supporterFeedbackErrors.status}
                                    bind:val={$supporterFeedbackForm.status}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
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
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Daripada Pelulus"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="approverFeedbackForm"
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
                            Bahagian ini untuk diisi oleh pelulus yang telah dipilih.
                        </Alert>
                        <fieldset
                            disabled={data.props.currentRoleCode ===
                                UserRoleConstant.penyokong.code}
                            class="flex w-full flex-col items-center justify-start space-y-2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    id="status"
                                    label={'Pelulusan Permohonan'}
                                    options={data.props.approvalStatusOption}
                                    errors={$approverFeedbackErrors.status}
                                    bind:val={$approverFeedbackForm.status}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
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
