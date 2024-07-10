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
    import { _terminationCommonApproval } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
    import type { PageData } from './$types';
    import {
        _submitApproverApproval,
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

    export let data: PageData;
    let submitSecretary: boolean = false;
    let submitSuppApp: boolean = false;
    let submitSupporter: boolean = false;
    let submitApprover: boolean = false;

    if (data.secretaryDetail?.name !== '') {
        submitSecretary = true;
    }
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
                submitSecretary = true;
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
        validators: zod(_terminationCommonApproval),
        async onSubmit() {
            $suppAppForm.interimId = data.interimId.interimId;
            const res = await _submitSuppAppForm($suppAppForm);
            if (res?.response.status == 'success') {
                submitSuppApp = true;
            }
        },
    });
    if ($suppAppForm?.approver !== '') {
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
                submitSupporter = true;
            }
        },
    });
    if ($supporterApprovalForm?.remark !== '') {
        submitSupporter = true;
    }

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
            await _submitApproverApproval($approverApprovalForm).then((res) => {
                if (res?.response.status == 'success') {
                    submitApprover = true;
                }
            });
        },
    });
    if ($approverApprovalForm?.remark !== '') {
        submitApprover = true;
    }

    let editInterimDate: boolean = true;
    let inBetweenMonths: string = '';

    if(data.terminationDetail?.calculation.breakdown !== null){
        
        const startDate = new Date(data.terminationDetail?.applicationDetail.startDate);
        const endDate = new Date(data.terminationDetail?.applicationDetail.endDate);
    
        const months = [
        "Januari", "Februari", "Mar", "April", "May", "Jun", 
        "Julai", "Ogos", "September", "October", "November", "Disember"
        ];
    
        // Adjust start and end dates to exclude the actual start and end months
        const startMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        const endMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);

       
        
        const startMonthYear = months[startMonth.getMonth()] + ' ' + startMonth.getFullYear();
        const endMonthYear = months[endMonth.getMonth()] + ' ' + endMonth.getFullYear();

        inBetweenMonths = startMonthYear + ' - ' + endMonthYear;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Tanggung Kerja">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perjawatan/tanggung-kerja')}
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
                    <div
                        class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                    >
                    <CustomSelectField
                        label="Gred"
                        id="grade"
                        disabled
                        isRequired={false}
                        options={data.lookup.gradeLookup}
                        val={data.terminationDetail?.applicationDetail?.grade}
                    />
                    <CustomSelectField
                        label="Jawatan"
                        id="position"
                        disabled
                        isRequired={false}
                        options={data.lookup.positionLookup}
                        val={data.terminationDetail?.applicationDetail
                            ?.position}
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
                        val={data.terminationDetail?.applicationDetail?.endDate}
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
                        val={data.terminationDetail?.applicationDetail?.reason}
                    />
                </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pegawai Yang Menanggung Kerja" />
            <StepperContentBody>
                <div class="flex w-full items-start justify-start pb-10">
                    <div
                        class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                    >
                    <CustomTextField
                        label="Nama Pegawai"
                        id="name"
                        disabled
                        isRequired={false}
                        val={data.terminationDetail?.detail?.name}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityCardNumber"
                        disabled
                        isRequired={false}
                        val={data.terminationDetail?.detail?.identityCardNumber}
                    />
                    <CustomTextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        id="serviceDate"
                        disabled
                        isRequired={false}
                        type="date"
                        val={data.terminationDetail?.detail?.serviceDate}
                    />
                    <CustomTextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        id="effectiveDate"
                        disabled
                        isRequired={false}
                        type="date"
                        val={data.terminationDetail?.detail?.effectiveDate}
                    />
                    <CustomTextField
                        label="Jawatan/Gred"
                        id="positionWithGrade"
                        disabled
                        isRequired={false}
                        val={data.terminationDetail?.detail?.positionWithGrade}
                    />
                    <CustomTextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        id="confirmDate"
                        disabled
                        isRequired={false}
                        type="date"
                        val={data.terminationDetail?.detail?.confirmDate}
                    />
                    <CustomTextField
                        label="Tempat Bertugas Semasa"
                        id="placement"
                        disabled
                        isRequired={false}
                        val={data.terminationDetail?.detail?.placement}
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
                        label="Hantar"
                        icon="check"
                        form="secretaryApprovalForm"
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
                    {#if data.secretaryDetail?.name == ''}
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
                    {:else}
                        <CustomTextField
                            label="Nama"
                            id="name"
                            disabled
                            val={data.secretaryDetail?.name}
                        />
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            id="remark"
                            disabled
                            val={data.secretaryDetail?.remark}
                        />
                        <CustomTextField
                            label="Status"
                            id="status"
                            disabled
                            val={data.secretaryDetail?.statusDescription}
                        />
                    {/if}
                </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengiraan Elaun Tanggung Kerja" />
            <StepperContentBody>
                <div class="w-full flex flex-col justify-start items-start">

                    <div class="w-1/2 flex flex-col gap-3 pb-10 justify-start items-start">
                    <XCard title="Penyata Pelarasan Elaun Tanggung Kerja"   >
                        <CustomTextField
                            label="Nama Pegawai"
                            id="name"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .name}
                        />
                        <CustomTextField
                            label="No. Kad Pengenalan"
                            id="identityCardNumber"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .identityCardNumber}
                        />
                        <CustomTextField
                            label="No. Pekerja"
                            id="employeeNumber"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .employeeNumber}
                        />
                        <CustomTextField
                            label="Jawatan Hakiki Sekarang"
                            id="currentPosition"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .currentPosition}
                        />
                        <CustomTextField
                            label="Jawatan Yang Ditanggung Kerja"
                            id="interimPosition"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .interimPosition}
                        />
                        <CustomTextField
                            label="Gred dan Gaji Minima Jawatan yang Ditanggung Kerja"
                            id="interimMinimalSalary"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .interimMinimalSalary}
                        />
                        <CustomTextField
                            label="25% Daripada Gaji Minima"
                            id="twentyfivePercent"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .twentyfivePercent}
                        />
                        <div class="flex w-full flex-row justify-between items-center gap-5">
                            <CustomTextField
                                label="Tarikh Kuatkuasa Tanggung Kerja"
                                id="startEffectiveDate"
                                disabled={editInterimDate}
                                isRequired={false}
                                type="date"
                                val={data.terminationDetail?.calculation
                                    .personalDetail.startEffectiveDate}
                            />
                            <CustomTextField
                                label="Hingga"
                                id="endEffectiveDate"
                                disabled={editInterimDate}
                                isRequired={false}
                                type="date"
                                val={data.terminationDetail?.calculation
                                    .personalDetail.endEffectiveDate}
                            />
                            {#if !editInterimDate}
                            <TextIconButton
                                label=""
                                icon="check"
                                onClick={() => editInterimDate = true}
                            />
                            {/if}
                            {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                            <TextIconButton
                                label=""
                                icon="edit"
                                type="neutral"
                                onClick={() => editInterimDate = !editInterimDate}
                            />  
                            {/if}
                        </div>
                        <CustomTextField
                            label="Penempatan"
                            id="placement"
                            disabled
                            isRequired={false}
                            val={data.terminationDetail?.calculation.personalDetail
                                .placement}
                        />
                    </XCard>
                    <XCard title="Pengiraan Elaun Tanggung Kerja"   >
                        <CustomTextField
                            id="breakdownFirstMonth"
                            isRequired={false}
                            label="Bulan Pertama ({new Date(
                                data.terminationDetail?.calculation.personalDetail.startEffectiveDate,
                            ).toLocaleString('ms', { month: 'long', year: 'numeric' })})"
                            val="({data.terminationDetail?.calculation.breakdown.allowance} x {data.terminationDetail?.calculation.breakdown.startDay} hari) / {data.terminationDetail?.calculation.breakdown.NumberOfDaysForStartMonth} = {data.terminationDetail?.calculation.breakdown.firstMonthAllowance}"
                            disabled
                        />
                        <CustomTextField
                            id="breakdownFullMonth"
                            isRequired={false}
                            label="Bulan Pertengahan ({inBetweenMonths})"
                            val="({data.terminationDetail?.calculation.breakdown.firstMonthAllowance} x {data.terminationDetail?.calculation.breakdown.MonthInBetween} bulan) = {data.terminationDetail?.calculation.breakdown.calculateInBetween}"
                            disabled
                        />
                        <CustomTextField
                            id="breakdownEndMonth"
                            isRequired={false}
                            label="Bulan Terakhir ({new Date(
                                data.terminationDetail?.calculation.personalDetail.endEffectiveDate,
                            ).toLocaleString('ms', { month: 'long', year: 'numeric' })})"
                            val="({data.terminationDetail?.calculation.breakdown.lastMonthAllowance} x {data.terminationDetail?.calculation.breakdown.endDay} hari) / {data.terminationDetail?.calculation.breakdown.NumberOfDaysForEndMonth} = {data.terminationDetail?.calculation.breakdown.lastMonthAllowance}"
                            disabled
                        />
                        <CustomTextField
                            label="Jumlah Bayaran Tunggakkan ETK"
                            id="totalETK"
                            isRequired={false}
                            disabled
                            val={data.terminationDetail?.calculation.breakdown.totalETK}
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
                        label="Hantar"
                        icon="check"
                        form="suppAppForm"
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
                        label="Hantar"
                        icon="check"
                        form="supporterApprovalForm"
                    />
                {/if}
                {#if !submitApprover && data.currentRoleCode == UserRoleConstant.ketuaSeksyen.code}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="approverApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col items-start justify-start pb-10">
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
                    {#if $supporterApprovalForm.remark == '' && data.currentRoleCode !== UserRoleConstant.timbalanKetuaSeksyen.code}
                        <div class="flex w-full flex-col gap-10 px-3">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!
                                    </span>
                                    Menunggu keputusan daripada Timbalan Ketua Seksyen.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        {#if $supporterApprovalForm.name}
                            <CustomTextField
                                label="Nama"
                                id="name"
                                isRequired={false}
                                disabled={submitSupporter}
                                bind:val={$supporterApprovalForm.name}
                            />
                        {/if}
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
                    {#if $approverApprovalForm.remark == '' && data.currentRoleCode !== UserRoleConstant.ketuaSeksyen.code}
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
                        {#if $approverApprovalForm.name !== ''}
                            <CustomTextField
                                label="Nama"
                                id="name"
                                isRequired={false}
                                disabled={submitApprover}
                                bind:val={$approverApprovalForm.name}
                            />
                        {/if}
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
                    {/if}
                </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
