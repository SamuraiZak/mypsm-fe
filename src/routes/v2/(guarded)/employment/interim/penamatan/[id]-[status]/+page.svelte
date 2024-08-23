<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import {
        _interimDate,
        _referenceNumber,
        _terminationCommonApproval,
        _terminationSuppApp,
    } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
    import type { PageData } from './$types';
    import {
        _submitApproverApproval,
        _submitInterimDate,
        _submitReferenceNumber,
        _submitSecretaryApproval,
        _submitSuppAppForm,
        _submitSupporterApproval,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        approveOptions,
        supportOptions,
        certifyOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import XCard from '$lib/components/card/XCard.svelte';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';

    export let data: PageData;
    let submitSecretary: boolean = false;
    let submitSuppApp: boolean = false;
    let submitSupporter: boolean = false;
    let submitApprover: boolean = false;
    let submitInterimDate: boolean = false;
    let submitReferenceNumber: boolean = false;
    let editInterimDate: boolean = true;

    const {
        form: InterimDateForm,
        errors: InterimDateError,
        enhance: InterimDateEnhance,
    } = superForm(data.interimDateForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'InterimDateForm',
        validators: zod(_interimDate),
        async onSubmit() {
            $InterimDateForm.interimId = data.interimId.interimId;
            const res = await _submitInterimDate($InterimDateForm);
            if (res?.response.status == 'success') {
                if ($InterimDateForm.isDraft == false) {
                    submitInterimDate = true;
                    editInterimDate = !editInterimDate;
                }
            }
        },
    });

    const {
        form: referenceNumberForm,
        errors: referenceNumberError,
        enhance: referenceNumberEnhance,
    } = superForm(data.interimReferenceNumberForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'referenceNumberForm',
        validators: zod(_referenceNumber),
        async onSubmit() {
            $referenceNumberForm.interimId = data.interimId.interimId;
            const res = await _submitReferenceNumber($referenceNumberForm);
            if (res?.response.status == 'success') {
                if ($referenceNumberForm.isDraft == true) {
                    submitReferenceNumber = true;
                }
            }
        },
    });

    const {
        form: secretaryApprovalForm,
        errors: secretaryApprovalError,
        enhance: secretaryApprovalEnhance,
    } = superForm(data.secretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'secretaryApprovalForm',
        validators: zod(_terminationCommonApproval),
        async onSubmit() {
            $secretaryApprovalForm.interimId = data.interimId.interimId;
            const res = await _submitSecretaryApproval($secretaryApprovalForm);
            if (res?.response.status == 'success') {
                if ($secretaryApprovalForm.isDraft == false) {
                    submitSecretary = true;
                }
            }
        },
    });

    const {
        form: suppAppForm,
        errors: suppAppError,
        enhance: suppAppEnhance,
    } = superForm(data.suppAppForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'suppAppForm',
        validators: zod(_terminationSuppApp),
        async onSubmit() {
            $suppAppForm.interimId = data.interimId.interimId;
            const res = await _submitSuppAppForm($suppAppForm);
            if (res?.response.status == 'success') {
                if ($suppAppForm.isDraft == false) {
                    submitSuppApp = true;
                }
            }
        },
    });
    if ($suppAppForm?.approver !== '' && !$suppAppForm.isDraft) {
        console.log('SHHSHSH');
        submitSuppApp = true;
    }
    const {
        form: supporterApprovalForm,
        errors: supporterApprovalError,
        enhance: supporterApprovalEnhance,
    } = superForm(data.supporterApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'supporterApprovalForm',
        validators: zod(_terminationCommonApproval),
        async onSubmit() {
            $supporterApprovalForm.interimId = data.interimId.interimId;
            const res = await _submitSupporterApproval($supporterApprovalForm);
            if (res?.response.status == 'success') {
                if ($supporterApprovalForm.isDraft == false) {
                    submitSupporter = true;
                }
            }
        },
    });

    const {
        form: approverApprovalForm,
        errors: approverApprovalError,
        enhance: approverApprovalEnhance,
    } = superForm(data.approverApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'approverApprovalForm',
        validators: zod(_terminationCommonApproval),
        async onSubmit() {
            $approverApprovalForm.interimId = data.interimId.interimId;
            const res = await _submitApproverApproval($approverApprovalForm);
            if (res?.response.status == 'success') {
                if ($approverApprovalForm.isDraft == false) {
                    submitApprover = true;
                }
            }
        },
    });
    if (
        data.secretaryDetail.employeeId !== '' &&
        $secretaryApprovalForm.isDraft == false
    ) {
        submitSecretary = true;
    }

    if (
        $supporterApprovalForm.isDraft == false &&
        $supporterApprovalForm.status !== null
    ) {
        console.log($supporterApprovalForm.isDraft);
        submitSupporter = true;
    } else if (
        data.currentRoleCode !== UserRoleConstant.timbalanKetuaSeksyen.code
    ) {
        submitSupporter = true;
    }

    if (
        $approverApprovalForm.isDraft == false &&
        $approverApprovalForm.isDraft !== null
    ) {
        submitApprover = true;
    }

    let inBetweenMonths: string = '';

    if (data.terminationDetail?.calculation?.breakdown !== null) {
        const startDate = new Date(
            data.terminationDetail?.applicationDetail.startDate,
        );
        const endDate = new Date(
            data.terminationDetail?.applicationDetail.endDate,
        );

        const months = [
            'Januari',
            'Februari',
            'Mar',
            'April',
            'May',
            'Jun',
            'Julai',
            'Ogos',
            'September',
            'October',
            'November',
            'Disember',
        ];

        // Adjust start and end dates to exclude the actual start and end months
        const startMonth = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            1,
        );
        const endMonth = new Date(
            endDate.getFullYear(),
            endDate.getMonth() - 1,
            1,
        );

        const startMonthYear =
            months[startMonth.getMonth()] + ' ' + startMonth.getFullYear();
        const endMonthYear =
            months[endMonth.getMonth()] + ' ' + endMonth.getFullYear();

        inBetweenMonths = startMonthYear + ' - ' + endMonthYear;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Tanggung Kerja">
        <StatusPill status={data.params.status} slot="status" />
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/v2/employment/interim')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Butiran Penanggungan Kerja" />
            <StepperContentBody>
                <div class="flex w-full items-start justify-start pb-10">
                    <div class="flex w-1/2 flex-col justify-start gap-2.5 p-3">
                        <CustomSelectField
                            label="Gred dan Jawatan"
                            id="grade"
                            disabled
                            isRequired={false}
                            options={data.lookup.positionAndGradeLookup}
                            val={data.terminationDetail?.applicationDetail
                                ?.grade}
                        />
                        <CustomSelectField
                            label="Kementrian/Jabatan"
                            id="placement"
                            disabled
                            isRequired={false}
                            options={data.lookup.placementLookup}
                            val={data.terminationDetail?.applicationDetail
                                ?.placement}
                        />
                        <CustomTextField
                            label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                            id="referenceNumber"
                            disabled
                            placeholder={data.terminationDetail
                                ?.applicationDetail?.referenceNumber == null
                                ? 'Tiada'
                                : ''}
                            isRequired={false}
                            val={data.terminationDetail?.applicationDetail
                                ?.referenceNumber}
                        />
                        <CustomTextField
                            label="Tarikh Mula"
                            id="startDate"
                            disabled
                            isRequired={false}
                            type="date"
                            val={data.terminationDetail?.applicationDetail
                                ?.startDate}
                        />
                        <CustomTextField
                            label="Tarikh Tamat"
                            id="endDate"
                            disabled
                            isRequired={false}
                            type="date"
                            val={data.terminationDetail?.applicationDetail
                                ?.endDate}
                        />
                        <CustomSelectField
                            label="Tempat Kekosongan"
                            id="newPlacement"
                            disabled
                            isRequired={false}
                            options={data.lookup.placementLookup}
                            val={data.terminationDetail?.applicationDetail
                                ?.newPlacement}
                        />
                        <CustomTextField
                            label="Sebab-sebab Kekosongan"
                            id="reason"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.applicationDetail
                                ?.reason}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pegawai Yang Menanggung Kerja" />
            <StepperContentBody>
                <div class="flex w-full items-start justify-start pb-10">
                    <div class="flex w-1/2 flex-col justify-start gap-2.5 p-3">
                        <CustomTextField
                            label="Nama Pegawai"
                            id="name"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.employeeDetail.details
                                ?.name}
                        />
                        <CustomTextField
                            label="No. Kad Pengenalan"
                            id="identityDocumentNumber"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.employeeDetail.details
                                ?.identityDocumentNumber}
                        />
                        <CustomTextField
                            label="Tarikh Sah Dalam Jawatan Sekarang"
                            id="effectiveDate"
                            disabled
                            isRequired={false}
                            type="date"
                            val={data.terminationDetail?.employeeDetail.details
                                ?.effectiveDate}
                        />
                        <CustomTextField
                            label="Jawatan/Gred"
                            id="positionWithGrade"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.employeeDetail.details
                                ?.positionWithGrade}
                        />
                        <CustomTextField
                            label="Tarikh Mula Bertugas di Jawatan Sekarang"
                            id="confirmServiceDate"
                            disabled
                            isRequired={false}
                            type="date"
                            val={data.terminationDetail?.employeeDetail.details
                                ?.confirmServiceDate}
                        />
                        <CustomTextField
                            label="Tempat Bertugas Semasa"
                            id="placement"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.employeeDetail.details
                                ?.placement}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Semakan Maklumat Tanggung Kerja"
            >
                {#if !submitSecretary && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        icon="save"
                        form="secretaryApprovalForm"
                        onClick={() => ($secretaryApprovalForm.isDraft = true)}
                    />
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="secretaryApprovalForm"
                        onClick={() => ($secretaryApprovalForm.isDraft = false)}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full items-start justify-start pb-10">
                    <form
                        class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        method="POST"
                        use:secretaryApprovalEnhance
                        id="secretaryApprovalForm"
                    >
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            id="remark"
                            isRequired={false}
                            disabled={submitSecretary}
                            bind:val={$secretaryApprovalForm.remark}
                            errors={$secretaryApprovalError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id="status"
                            options={certifyOptions}
                            disabled={submitSecretary}
                            bind:val={$secretaryApprovalForm.status}
                        />
                        <CustomTextField
                            label="Tarikh Pengesahan"
                            id="verifyDate"
                            isRequired={false}
                            type="date"
                            disabled={submitSecretary}
                            bind:val={$secretaryApprovalForm.approvalDate}
                            errors={$secretaryApprovalError.approvalDate}
                        />
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengiraan Elaun Tanggung Kerja" />
            <StepperContentBody>
                <div class="flex w-full flex-col items-start justify-start">
                    <div
                        class="flex w-1/2 flex-col items-start justify-start gap-3 pb-10"
                    >
                        <XCard title="Penyata Pelarasan Elaun Tanggung Kerja">
                            <CustomTextField
                                label="Nama Pegawai"
                                id="name"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.name}
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identityDocumentNumber"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.identityDocumentNumber}
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.employeeNumber}
                            />
                            <CustomTextField
                                label="Jawatan Hakiki Sekarang"
                                id="currentPosition"
                                placeholder="Tiada Maklumat"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.currentPosition}
                            />
                            <CustomTextField
                                label="Jawatan Yang Ditanggung Kerja"
                                id="interimPosition"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.interimPosition}
                            />
                            <CustomTextField
                                label="Gred dan Gaji Minima Jawatan yang Ditanggung Kerja"
                                id="interimMinimalSalary"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.interimMinimalSalary}
                            />
                            <CustomTextField
                                label="25% Daripada Gaji Minima"
                                id="twentyfivePercent"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.twentyfivePercent}
                            />
                            <div
                                class="flex w-full flex-row items-center justify-between gap-5"
                            >
                                <!-- new form -->
                                <form
                                    class="flex w-full justify-start items-center gap-2.5"
                                    method="POST"
                                    id="InterimDateForm"
                                    use:InterimDateEnhance
                                >
                                    <CustomTextField
                                        label="Tarikh Kuatkuasa Tanggung Kerja"
                                        id="startEffectiveDate"
                                        disabled={editInterimDate}
                                        isRequired={false}
                                        type="date"
                                        bind:val={$InterimDateForm.startDate}
                                        errors={$InterimDateError.startDate}
                                    />
                                    <!-- val={data.terminationDetail?.calculation
                                    ?.personalDetail?.startEffectiveDate} -->
                                    <CustomTextField
                                        label="Hingga"
                                        id="endEffectiveDate"
                                        disabled={editInterimDate}
                                        isRequired={false}
                                        type="date"
                                        bind:val={$InterimDateForm.endDate}
                                        errors={$InterimDateError.endDate}
                                    />
                                    <!-- val={data.terminationDetail?.calculation
                                    ?.personalDetail?.endEffectiveDate} -->
                                    {#if !editInterimDate}
                                        <TextIconButton
                                            label=""
                                            form="InterimDateForm"
                                            icon="check"
                                            onClick={() =>
                                                ($InterimDateForm.isDraft = false)}
                                        />
                                    {/if}
                                    <!-- {#if editInterimDate= true}
                                    <TextIconButton
                                        label=""
                                        icon="check"
                                        onClick={() => (editInterimDate = true)}
                                    />
                                {/if} -->
                                    {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                        <TextIconButton
                                            label=""
                                            icon={!editInterimDate
                                                ? 'cancel'
                                                : 'action'}
                                            type="neutral"
                                            onClick={() =>
                                                (editInterimDate =
                                                    !editInterimDate)}
                                        />
                                    {/if}
                                </form>
                            </div>
                            <CustomTextField
                                label="Penempatan"
                                id="placement"
                                disabled
                                isRequired={false}
                                val={data.terminationDetail?.calculation
                                    ?.personalDetail?.placement}
                            />
                        </XCard>
                        <XCard title="Pengiraan Elaun Tanggung Kerja">
                            <CustomTextField
                                id="breakdownFirstMonth"
                                isRequired={false}
                                label="Bulan Pertama ({new Date(
                                    data.terminationDetail?.calculation.personalDetail.startEffectiveDate,
                                ).toLocaleString('ms', {
                                    month: 'long',
                                    year: 'numeric',
                                })})"
                                val="({data.terminationDetail?.calculation
                                    ?.breakdown?.allowance} x {data
                                    .terminationDetail?.calculation?.breakdown
                                    ?.startDay} hari) / {data.terminationDetail
                                    ?.calculation.breakdown
                                    .NumberOfDaysForStartMonth} = {data
                                    .terminationDetail?.calculation.breakdown
                                    .firstMonthAllowance}"
                                disabled
                            />

                            {#if data.terminationDetail?.calculation?.breakdown?.startYearMonthInBetween}
                                <CustomTextField
                                    id="startYearMonthInBetween"
                                    isRequired={false}
                                    label="Bulan Pertengahan (Tahun Pertama)"
                                    val="({data.terminationDetail?.calculation
                                        .breakdown.allowance} x {data
                                        .terminationDetail?.calculation
                                        .breakdown
                                        .startYearMonthInBetween} bulan) = {data
                                        .terminationDetail?.calculation
                                        .breakdown.startCalculateInBetween}"
                                    disabled
                                />
                                <CustomTextField
                                    id="endYearMonthInBetween"
                                    isRequired={false}
                                    label="Bulan Pertengahan (Tahun Kedua)"
                                    val="({data.terminationDetail?.calculation
                                        .breakdown.allowance} x {data
                                        .terminationDetail?.calculation
                                        .breakdown
                                        .endYearMonthInBetween} bulan) = {data
                                        .terminationDetail?.calculation
                                        .breakdown.endCalculateInBetween}"
                                    disabled
                                />
                            {:else}
                                <CustomTextField
                                    id="breakdownFullMonth"
                                    isRequired={false}
                                    label="Bulan Pertengahan ({inBetweenMonths})"
                                    val="({data.terminationDetail?.calculation
                                        .breakdown.allowance} x {data
                                        .terminationDetail?.calculation
                                        .breakdown
                                        .MonthInBetween} bulan) = {data
                                        .terminationDetail?.calculation
                                        .breakdown.calculateInBetween}"
                                    disabled
                                />
                            {/if}

                            <CustomTextField
                                id="breakdownEndMonth"
                                isRequired={false}
                                label="Bulan Terakhir ({new Date(
                                    data.terminationDetail?.calculation.personalDetail.endEffectiveDate,
                                ).toLocaleString('ms', {
                                    month: 'long',
                                    year: 'numeric',
                                })})"
                                val="({data.terminationDetail?.calculation
                                    .breakdown.allowance} x {data
                                    .terminationDetail?.calculation.breakdown
                                    .endDay} hari) / {data.terminationDetail
                                    ?.calculation.breakdown
                                    .NumberOfDaysForEndMonth} = {data
                                    .terminationDetail?.calculation.breakdown
                                    .lastMonthAllowance}"
                                disabled
                            />
                            <CustomTextField
                                label="Jumlah Bayaran Tunggakkan ETK"
                                id="totalETK"
                                isRequired={false}
                                disabled
                                val={data.terminationDetail?.calculation
                                    .breakdown.totalETK}
                            />
                        </XCard>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus">
                {#if !submitSuppApp && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        icon="save"
                        form="suppAppForm"
                        onClick={() => ($suppAppForm.isDraft = true)}
                    />
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="suppAppForm"
                        onClick={() => ($suppAppForm.isDraft = false)}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full items-start justify-start pb-10">
                    <form
                        class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        method="POST"
                        id="suppAppForm"
                        use:suppAppEnhance
                    >
                        <CustomSelectField
                            label="Penyokong (Timbalan Ketua Seksyen)"
                            id="supporter"
                            disabled={submitSuppApp}
                            options={data.lookup.supporterApproverLookup}
                            bind:val={$suppAppForm.supporter}
                            errors={$suppAppError.supporter}
                        />
                        <CustomSelectField
                            label="Pelulus (Ketua Seksyen)"
                            id="approver"
                            disabled={submitSuppApp}
                            options={data.lookup.supporterApproverLookup}
                            bind:val={$suppAppForm.approver}
                            errors={$suppAppError.approver}
                        />
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Penyokong dan Pelulus">
                {#if !submitSupporter && data.currentRoleCode == UserRoleConstant.timbalanKetuaSeksyen.code}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        icon="save"
                        form="supporterApprovalForm"
                        onClick={() => ($supporterApprovalForm.isDraft = true)}
                    />
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="supporterApprovalForm"
                        onClick={() => ($supporterApprovalForm.isDraft = false)}
                    />
                {/if}
                {#if !submitApprover && data.currentRoleCode == UserRoleConstant.ketuaSeksyen.code}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        icon="save"
                        form="approverApprovalForm"
                        onClick={() => ($approverApprovalForm.isDraft = true)}
                    />
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="approverApprovalForm"
                        onClick={() => ($approverApprovalForm.isDraft = false)}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col items-start justify-start pb-10"
                >
                    <ContentHeader
                        title="Timbalan Ketua Seksyen"
                        borderClass="border-none"
                    />
                    <form
                        class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        method="POST"
                        id="supporterApprovalForm"
                        use:supporterApprovalEnhance
                    >
                        {#if ($supporterApprovalForm.remark == '' || $supporterApprovalForm.remark == null) && data.currentRoleCode !== UserRoleConstant.timbalanKetuaSeksyen.code}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!
                                        </span>
                                        Menunggu keputusan daripada Timbalan Ketua
                                        Seksyen.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                isRequired={false}
                                disabled={submitSupporter}
                                bind:val={$supporterApprovalForm.remark}
                                errors={$supporterApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                options={supportOptions}
                                disabled={submitSupporter}
                                bind:val={$supporterApprovalForm.status}
                            />
                            <CustomTextField
                                label="Tarikh Disokong"
                                id="approvalDate"
                                type="date"
                                isRequired={false}
                                disabled={submitSupporter}
                                bind:val={$supporterApprovalForm.approvalDate}
                                errors={$supporterApprovalError.approvalDate}
                            />
                        {/if}
                    </form>

                    <ContentHeader
                        title="Ketua Seksyen"
                        borderClass="border-none"
                    />
                    <form
                        class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        method="POST"
                        id="approverApprovalForm"
                        use:approverApprovalEnhance
                    >
                        {#if ($approverApprovalForm.remark == '' || $approverApprovalForm.remark == null) && data.currentRoleCode !== UserRoleConstant.ketuaSeksyen.code}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!
                                        </span>
                                        Menunggu keputusan daripada Ketua Seksyen.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                isRequired={false}
                                disabled={submitApprover}
                                bind:val={$approverApprovalForm.remark}
                                errors={$approverApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                options={approveOptions}
                                disabled={submitApprover}
                                bind:val={$approverApprovalForm.status}
                            />
                            <CustomTextField
                                label="Tarikh Disokong"
                                id="approvalDate"
                                type="date"
                                isRequired={false}
                                disabled={submitApprover}
                                bind:val={$approverApprovalForm.approvalDate}
                                errors={$approverApprovalError.approvalDate}
                            />
                        {/if}
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
        {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
        <StepperContent>
            <StepperContentHeader title="Tetapan Butiran Surat">
                {#if !submitReferenceNumber && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        icon="save"
                        form="referenceNumberForm"
                        onClick={() => ($referenceNumberForm.isDraft = true)}
                    />
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="referenceNumberForm"
                        onClick={() => ($referenceNumberForm.isDraft = false)}
                    />
                {/if}
            </StepperContentHeader>
            <div class="flex w-full flex-col items-start justify-start pb-10">
                <form
                    class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                    method="POST"
                    use:referenceNumberEnhance
                    id="referenceNumberForm"
                >
                    <CustomTextField
                        id="referenceNumber"
                        label="Nombor Rujukan"
                        bind:val={$referenceNumberForm.referenceNumber}
                        errors={$referenceNumberError.referenceNumber}
                    />
                    <CustomRadioBoolean
                        disabled={false}
                        id="status"
                        label="Status"
                        bind:val={$referenceNumberForm.status}
                        errors={$referenceNumberError.status}
                    />
                    <CustomTextField
                        id="slogan"
                        label="Slogan"
                        bind:val={$referenceNumberForm.slogan}
                        errors={$referenceNumberError.slogan}
                    />
                    <CustomTextField
                        id="date"
                        type="date"
                        label="Tarikh"
                        bind:val={$referenceNumberForm.date}
                        errors={$referenceNumberError.date}
                    />
                </form>
            </div></StepperContent
        >
        {/if}
    </Stepper>
</section>

<Toaster />
