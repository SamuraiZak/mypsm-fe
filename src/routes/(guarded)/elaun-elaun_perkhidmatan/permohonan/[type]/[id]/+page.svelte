<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
    import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';
    import {
        AllowanceCeremonyClothingSchema,
        AllowanceEndorsementSchema,
        AllowanceEndorserDetailSchema,
        AllowanceFuneralArrangementSchema,
        AllowanceHouseMovingSchema,
        AllowanceInsurancePaymentSchema,
        AllowancePassportPaymentSchema,
        AllowanceWelfareFundSchema,
        AllowanceWinterClothingSchema,
    } from '$lib/schemas/mypsm/allowance/allowance.schema';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import {
        _submitApproverEndorsementForm,
        _submitDirectorEndorsementForm,
        _submitEndorserDetailForm,
        _submitSecretaryCheckForm,
        _submitSupporterEndorsementForm,
    } from './+page';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import { Alert } from 'flowbite-svelte';

    export let data: PageData;

    let currentAllowanceTypeCode: string = data.props.currentAllowanceType.code;

    // variable to store the files
    let files: FileList;

    function _handleAllowanceTypeChange(allowanceTypeCode: string) {
        let currentType: AllowanceTypeDTO =
            AllowanceTypeConstant.list.find(
                (item) => item.code == allowanceTypeCode,
            ) ?? AllowanceTypeConstant.ceremonyClothing;

        let url =
            '/elaun-elaun_perkhidmatan/permohonan/' +
            currentType.description +
            '/Baru';

        goto(url);
    }

    //  1. ceremonyClothing form
    const {
        form: ceremonyClothingForm,
        errors: ceremonyClothingErrors,
        enhance: ceremonyClothingEnhance,
    } = superForm(data.forms.ceremonyClothingForm, {
        id: 'ceremonyClothingForm',
        SPA: true,
        validators: zodClient(AllowanceCeremonyClothingSchema),
        onSubmit(input) {},
    });

    //  2. winterClothing form
    const {
        form: winterClothingForm,
        errors: winterClothingErrors,
        enhance: winterClothingEnhance,
    } = superForm(data.forms.winterClothingForm, {
        id: 'winterClothingForm',
        SPA: true,
        validators: zodClient(AllowanceWinterClothingSchema),
        onSubmit(input) {},
    });

    //  3. state visit

    //  4. funeralArrangement form
    const {
        form: funeralArrangementForm,
        errors: funeralArrangementErrors,
        enhance: funeralArrangementEnhance,
    } = superForm(data.forms.funeralArrangementForm, {
        id: 'funeralArrangementForm',
        SPA: true,
        validators: zodClient(AllowanceFuneralArrangementSchema),
        onSubmit(input) {},
    });

    //  5. welfareFund form
    const {
        form: welfareFundForm,
        errors: welfareFundErrors,
        enhance: welfareFundEnhance,
    } = superForm(data.forms.welfareFundForm, {
        id: 'welfareFundForm',
        SPA: true,
        validators: zodClient(AllowanceWelfareFundSchema),
        onSubmit(input) {},
    });

    //  6. houseMoving
    const {
        form: houseMovingForm,
        errors: houseMovingErrors,
        enhance: houseMovingEnhance,
    } = superForm(data.forms.houseMovingForm, {
        id: 'houseMovingForm',
        SPA: true,
        validators: zodClient(AllowanceHouseMovingSchema),
        onSubmit(input) {},
    });

    //  7. passportPayment form
    const {
        form: passportPaymentForm,
        errors: passportPaymentErrors,
        enhance: passportPaymentEnhance,
    } = superForm(data.forms.passportPaymentForm, {
        id: 'passportPaymentForm',
        SPA: true,
        validators: zodClient(AllowancePassportPaymentSchema),
        onSubmit(input) {},
    });

    //  8. insurancePayment form
    const {
        form: insurancePaymentForm,
        errors: insurancePaymentErrors,
        enhance: insurancePaymentEnhance,
    } = superForm(data.forms.insurancePaymentForm, {
        id: 'insurancePaymentForm',
        SPA: true,
        validators: zodClient(AllowanceInsurancePaymentSchema),
        onSubmit(input) {},
    });

    // directorEndorsement form
    const {
        form: directorEndorsementForm,
        errors: directorEndorsementErrors,
        enhance: directorEndorsementEnhance,
    } = superForm(data.forms.directorEndorsementForm, {
        id: 'directorEndorsementForm',
        SPA: true,
        validators: zodClient(AllowanceEndorsementSchema),
        onSubmit(input) {
            _submitDirectorEndorsementForm($directorEndorsementForm).then(
                (value) => {
                    if (value.detailResponse.status == 'success') {
                        // $directorEndorsementForm = {
                        //     ...value.detail.applicationDetail.directorSupport,
                        // };

                        $directorEndorsementForm.status =
                            value.detail.directorSupport?.status ?? false;

                        $directorEndorsementForm.remark =
                            value.detail.directorSupport?.remark ?? '';
                    }
                },
            );
        },
    });

    // secretaryCheck form
    const {
        form: secretaryCheckForm,
        errors: secretaryCheckErrors,
        enhance: secretaryCheckEnhance,
    } = superForm(data.forms.secretaryCheckForm, {
        id: 'secretaryCheckForm',
        SPA: true,
        validators: zodClient(AllowanceEndorsementSchema),
        onSubmit(input) {
            _submitSecretaryCheckForm($secretaryCheckForm).then((value) => {
                if (value.detailResponse.status == 'success') {
                    // $secretaryCheckForm = {
                    //     ...value.detail.applicationDetail.verification,
                    // };

                    $secretaryCheckForm.status =
                        value.detail.directorSupport?.status ?? false;

                    $secretaryCheckForm.remark =
                        value.detail.directorSupport?.remark ?? '';
                }
            });
        },
    });

    // endorserDetail form
    const {
        form: endorserDetailForm,
        errors: endorserDetailErrors,
        enhance: endorserDetailEnhance,
    } = superForm(data.forms.endorserDetailForm, {
        id: 'endorserDetailForm',
        SPA: true,
        validators: zodClient(AllowanceEndorserDetailSchema),
        onSubmit(input) {
            console.log($endorserDetailForm);
            _submitEndorserDetailForm($endorserDetailForm);
        },
    });

    // supporterEndorsement form
    const {
        form: supporterEndorsementForm,
        errors: supporterEndorsementErrors,
        enhance: supporterEndorsementEnhance,
    } = superForm(data.forms.supporterEndorsementForm, {
        id: 'supporterEndorsementForm',
        SPA: true,
        validators: zodClient(AllowanceEndorsementSchema),
        onSubmit(input) {
            _submitSupporterEndorsementForm($supporterEndorsementForm).then(
                (value) => {
                    if (value.detailResponse.status == 'success') {
                        $supporterEndorsementForm = {
                            ...value.detail.applicationDetail.support,
                        };
                    }
                },
            );
        },
    });

    // approverEndorsement form
    const {
        form: approverEndorsementForm,
        errors: approverEndorsementErrors,
        enhance: approverEndorsementEnhance,
    } = superForm(data.forms.approverEndorsementForm, {
        id: 'approverEndorsementForm',
        SPA: true,
        validators: zodClient(AllowanceEndorsementSchema),
        onSubmit(input) {
            _submitApproverEndorsementForm($approverEndorsementForm).then(
                (value) => {
                    if (value.detailResponse.status == 'success') {
                        $approverEndorsementForm = {
                            ...value.detail.applicationDetail.approval,
                        };
                    }
                },
            );
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/elaun-elaun_perkhidmatan/permohonan');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Permohonan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    {#if currentAllowanceTypeCode == AllowanceTypeConstant.ceremonyClothing.code}
                        <!-- ===================================================================== -->
                        <!-- CEREMONY CLOTHING -->
                        <!-- ===================================================================== -->
                        <form
                            id="ceremonyClothingForm"
                            method="POST"
                            use:ceremonyClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$ceremonyClothingErrors.reason}
                                    bind:val={$ceremonyClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$ceremonyClothingErrors.personal}
                                    bind:val={$ceremonyClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$ceremonyClothingErrors.partner}
                                    bind:val={$ceremonyClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.winterClothing.code}
                        <!-- ===================================================================== -->
                        <!-- WINTER CLOTHING -->
                        <!-- ===================================================================== -->
                        <form
                            id="winterClothingForm"
                            method="POST"
                            use:winterClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$winterClothingErrors.partner}
                                    bind:val={$winterClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                            
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.stateVisit.code}
                        <!-- ===================================================================== -->
                        <!-- STATE VISIT -->
                        <!-- ===================================================================== -->
                        <form
                            id="winterClothingForm"
                            method="POST"
                            use:winterClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$winterClothingErrors.partner}
                                    bind:val={$winterClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.funeralArrangement.code}
                        <!-- ===================================================================== -->
                        <!-- FUNERAL ARRANGMENT -->
                        <!-- ===================================================================== -->
                        <form
                            id="funeralArrangementForm"
                            method="POST"
                            use:funeralArrangementEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="deathDate"
                                    label={'Tarikh Kematian'}
                                    type="date"
                                    errors={$funeralArrangementErrors.deathDate}
                                    bind:val={$funeralArrangementForm.deathDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="text"
                                    id="deathTime"
                                    label={'Masa Kematian'}
                                    placeholder="hh:mm"
                                    errors={$funeralArrangementErrors.deathTime}
                                    bind:val={$funeralArrangementForm.deathTime}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.welfareFund.code}
                        <!-- ===================================================================== -->
                        <!-- WELFARE FUND -->
                        <!-- ===================================================================== -->
                        <form
                            id="welfareFundForm"
                            method="POST"
                            use:welfareFundEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="welfareTypeCode"
                                    label={'Jenis Tabung Kebajikan'}
                                    errors={$welfareFundErrors.welfareTypeCode}
                                    bind:val={$welfareFundForm.welfareTypeCode}
                                    options={data.props.welfareTypeOptions}
                                ></CustomSelectField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.houseMoving.code}
                        <!-- ===================================================================== -->
                        <!-- HOUSE MOVING -->
                        <!-- ===================================================================== -->
                        <form
                            id="houseMovingForm"
                            method="POST"
                            use:houseMovingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="movingDate"
                                    label={'Tarikh Perpindahan'}
                                    type="date"
                                    errors={$houseMovingErrors.movingDate}
                                    bind:val={$houseMovingForm.movingDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="text"
                                    id="oldAddress"
                                    label={'Alamat Lama'}
                                    errors={$houseMovingErrors.oldAddress}
                                    bind:val={$houseMovingForm.oldAddress}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="text"
                                    id="newAddress"
                                    label={'Alamat Baru'}
                                    errors={$houseMovingErrors.newAddress}
                                    bind:val={$houseMovingForm.newAddress}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.passportPayment.code}
                        <!-- ===================================================================== -->
                        <!-- PASSPORT PAYMENT -->
                        <!-- ===================================================================== -->
                        <form
                            id="passportPaymentForm"
                            method="POST"
                            use:passportPaymentEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="renewDate"
                                    label={'Tarikh Pembaharuan Passport'}
                                    type="date"
                                    errors={$passportPaymentErrors.renewDate}
                                    bind:val={$passportPaymentForm.renewDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="text"
                                    id="reason"
                                    label={'Alasan'}
                                    errors={$passportPaymentErrors.reason}
                                    bind:val={$passportPaymentForm.reason}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.insurancePayment.code}
                        <!-- ===================================================================== -->
                        <!-- INSURANCE PAYMENT -->
                        <!-- ===================================================================== -->
                        <form
                            id="insurancePaymentForm"
                            method="POST"
                            use:insurancePaymentEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="text"
                                    id="insuranceType"
                                    label={'Jenis Insurans'}
                                    errors={$insurancePaymentErrors.insuranceType}
                                    bind:val={$insurancePaymentForm.insuranceType}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="regionCode"
                                    label={'Destinasi'}
                                    bind:val={$insurancePaymentForm.regionCode}
                                    options={data.props.areaOptions}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="startDate"
                                    label={'Tarikh Mula Perjalanan'}
                                    type="date"
                                    errors={$insurancePaymentErrors.startDate}
                                    bind:val={$insurancePaymentForm.startDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="endDate"
                                    label={'Tarikh Tamat Perjalanan'}
                                    type="date"
                                    errors={$insurancePaymentErrors.endDate}
                                    bind:val={$insurancePaymentForm.endDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="text"
                                    id="reason"
                                    label={'Alasan'}
                                    errors={$insurancePaymentErrors.reason}
                                    bind:val={$insurancePaymentForm.reason}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.cargoShipping.code}
                        <!-- ===================================================================== -->
                        <!-- CARGO SHIPPING -->
                        <!-- ===================================================================== -->
                        <form
                            id="winterClothingForm"
                            method="POST"
                            use:winterClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={true}
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={true}
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$winterClothingErrors.partner}
                                    bind:val={$winterClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Dokumen Sokongan
                                </p>
                                {#each data.props.currentApplicationDetail.applicationDetail.documents as document}
                                    <a
                                        href={document.document}
                                        target="_blank"
                                        download={document.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{document.name}</a
                                    >
                                {/each}
                            </div>
                        </form>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- director endorsment stepper -->
        {#if data.props.currentAllowanceType.stepper.directorFeedback}
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Pengarah">
                    {#if data.props.currentApplicationDetail.directorSupport == null && data.props.mode == 'pengarah'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="directorEndorsementForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.directorSupport == null && data.props.mode !== 'pengarah'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="directorEndorsementForm"
                                method="POST"
                                use:directorEndorsementEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .directorSupport !== null ||
                                            data.props.mode != 'pengarah'}
                                        id="directorApprove"
                                        label={'Adakah Permohonan Ini Sah?'}
                                        bind:val={$directorEndorsementForm.status}
                                        options={data.props
                                            .allowanceEndorsementOption}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .directorSupport !== null ||
                                            data.props.mode != 'pengarah'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$directorEndorsementErrors.remark}
                                        bind:val={$directorEndorsementForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
        <!-- Secretary Check stepper -->
        {#if data.props.currentAllowanceType.stepper.secretaryCheck}
            <StepperContent>
                <StepperContentHeader title="Semakan Oleh Urus Setia">
                    {#if data.props.currentApplicationDetail.verification == null && data.props.mode == 'urusetia'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="secretaryCheckForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.verification == null && data.props.mode !== 'urusetia'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="secretaryCheckForm"
                                method="POST"
                                use:secretaryCheckEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .verification !== null ||
                                            data.props.mode != 'urusetia'}
                                        id="directorApprove"
                                        label={'Adakah Permohonan Ini Sah?'}
                                        bind:val={$secretaryCheckForm.status}
                                        options={data.props
                                            .allowanceEndorsementOption}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .verification !== null ||
                                            data.props.mode != 'urusetia'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$secretaryCheckErrors.remark}
                                        bind:val={$secretaryCheckForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
        <!-- Endorser Detail stepper -->
        {#if data.props.currentAllowanceType.stepper.endorserDetail}
            <StepperContent>
                <StepperContentHeader title="Maklumat Penyokong dan Pelulus">
                    {#if data.props.currentApplicationDetail.supportApprover == null && data.props.mode == 'urusetia'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="endorserDetailForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.supportApprover == null && data.props.mode !== 'urusetia'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="endorserDetailForm"
                                method="POST"
                                use:endorserDetailEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .supportApprover !== null ||
                                            data.props.mode != 'urusetia'}
                                        id="supporter"
                                        label={'Pilih Nama Penyokong'}
                                        bind:val={$endorserDetailForm.supporter}
                                        options={data.props
                                            .supporterApproverLookup}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .supportApprover !== null ||
                                            data.props.mode != 'urusetia'}
                                        id="approver"
                                        label={'Pilih Nama Pelulus'}
                                        bind:val={$endorserDetailForm.approver}
                                        options={data.props
                                            .supporterApproverLookup}
                                    ></CustomSelectField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
        <!-- Supporter Endorsement stepper -->
        {#if data.props.currentAllowanceType.stepper.supporterFeedback}
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Penyokong">
                    {#if data.props.currentApplicationDetail.support == null && data.props.mode == 'penyokong'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="supporterEndorsementForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.support == null && data.props.mode !== 'penyokong'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="supporterEndorsementForm"
                                method="POST"
                                use:supporterEndorsementEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .support !== null ||
                                            data.props.mode != 'penyokong'}
                                        id="directorApprove"
                                        label={'Adakah Anda Sokong Permohonan Ini?'}
                                        bind:val={$supporterEndorsementForm.status}
                                        options={data.props
                                            .allowanceEndorsementOption}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .support !== null ||
                                            data.props.mode != 'penyokong'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$supporterEndorsementErrors.remark}
                                        bind:val={$supporterEndorsementForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
        <!-- Approver Endorsement stepper -->
        {#if data.props.currentAllowanceType.stepper.approverFeedback}
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Pelulus">
                    {#if data.props.currentApplicationDetail.approval == null && data.props.mode == 'pelulus'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="approverEndorsementForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.approval == null && data.props.mode !== 'pelulus'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="approverEndorsementForm"
                                method="POST"
                                use:approverEndorsementEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .approval !== null ||
                                            data.props.mode != 'pelulus'}
                                        id="directorApprove"
                                        label={'Adakah Permohonan Ini Sah?'}
                                        bind:val={$approverEndorsementForm.status}
                                        options={data.props
                                            .allowanceEndorsementOption}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .approval !== null ||
                                            data.props.mode != 'pelulus'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$approverEndorsementErrors.remark}
                                        bind:val={$approverEndorsementForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster></Toaster>
