<script lang="ts">
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import {
        _approverSchema,
        _supporterApproverSchema,
    } from '$lib/schemas/mypsm/employment/new-offer/schema';
    import { _processSchema } from '$lib/schemas/mypsm/employment/new-offer/schema';
    import {
        approveOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Accordion, AccordionItem, Badge } from 'flowbite-svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
    import {
        _proceedingAppealSchema,
        _proceedingApproverSchema,
        _proceedingSentencingMeetingSchema,
        _proceedingSuspensionCriminalCancelSchema,
        _proceedingSuspensionCriminalDetailSchema,
        _proceedingSuspensionViewSchema,
        _sentenceSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _newOfferApproverResultForm,
        _newOfferSupporterResultForm,
        _setNewOfferSupporterApproverForm,
        _updateNewOfferMeetingResultForm,
        _updateNewOfferProcessForm,
    } from './+page';
    import { _meetingResultSchema } from '$lib/schemas/mypsm/employment/new-offer/schema';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { RetirementBenefitDropdownConstant } from '$lib/constants/dropdown/retirement-benefit.constant';
    export let data: PageData;

    let newOfferMeetingResultsAreNotApproved = writable<boolean>(true);
    let newOfferSupporterIsApproved = writable<boolean>(false);
    let newOfferApproverIsApproved = writable<boolean>(false);
    let isReadOnlyNewOfferMeetingResult = writable<boolean>(false);
    let isReadOnlyNewOfferProcess = writable<boolean>(false);
    let isReadOnlyNewOfferSetApprovers = writable<boolean>(false);
    let isReadOnlyNewOfferSupporterResult = writable<boolean>(false);
    let isReadOnlyNewOfferApprovalResult = writable<boolean>(false);

    $: {
        if (
            data.view.newOfferDetailView.meetingResult.employees.every(
                (data) =>
                    data.status !== undefined && data.remarks !== undefined,
            )
        ) {
            isReadOnlyNewOfferMeetingResult.set(true);
        } else {
            isReadOnlyNewOfferMeetingResult.set(false);
        }

        if ($isReadOnlyNewOfferMeetingResult) {
            data.view.newOfferDetailView.meetingResult.employees.every(
                (data) => data.status === false,
            )
                ? newOfferMeetingResultsAreNotApproved.set(true)
                : newOfferMeetingResultsAreNotApproved.set(false);
        }

        if (data.view.newOfferDetailView.process.isReadonly) {
            isReadOnlyNewOfferProcess.set(true);
        } else {
            isReadOnlyNewOfferProcess.set(false);
        }

        if (data.view.newOfferDetailView.setSupporterApprover.isReadonly) {
            isReadOnlyNewOfferSetApprovers.set(true);
        } else {
            isReadOnlyNewOfferSetApprovers.set(false);
        }

        if (
            data.view.newOfferDetailView.supporter.status !== null &&
            data.view.newOfferDetailView.supporter.remark !== null
        ) {
            isReadOnlyNewOfferSupporterResult.set(true);

            data.view.newOfferDetailView.supporter.status
                ? newOfferSupporterIsApproved.set(true)
                : newOfferSupporterIsApproved.set(false);
        } else {
            isReadOnlyNewOfferSupporterResult.set(false);
        }

        if (
            data.view.newOfferDetailView.approver.status !== null &&
            data.view.newOfferDetailView.approver.remark !== null
        ) {
            isReadOnlyNewOfferApprovalResult.set(true);

            data.view.newOfferDetailView.approver.status
                ? newOfferApproverIsApproved.set(true)
                : newOfferApproverIsApproved.set(false);
        } else {
            isReadOnlyNewOfferApprovalResult.set(false);
        }
    }

    // Superforms
    const { form } = superForm(data.forms.includedEmployeesForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const { form: employeeDetailForm } = superForm(
        data.forms.employeeDetailForm,
        {
            SPA: true,
            dataType: 'json',
            validators: false,
        },
    );

    const {
        form: newOfferMeetingDetailForm,
        errors: newOfferMeetingDetailFormErrors,
        enhance: newOfferMeetingDetailFormEnhance,
    } = superForm(data.forms.newOfferMeetingForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_meetingResultSchema),
        taintedMessage: false,
        onSubmit() {
            _updateNewOfferMeetingResultForm(
                Number(data.params.id),
                $newOfferMeetingDetailForm,
            );
        },
    });

    const {
        form: newOfferServiceDetailForm,
        errors: newOfferServiceDetailFormErrors,
        enhance: newOfferServiceDetailFormEnhance,
    } = superForm(data.forms.newOfferServiceDetailForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_processSchema),
        taintedMessage: false,
        onSubmit() {
            $newOfferServiceDetailForm.employees =
                $newOfferServiceDetailForm.employees.filter((val, index) => {
                    if (!$newOfferMeetingDetailForm.employees[index].status) {
                        return (
                            val.employeeNumber !==
                            $newOfferMeetingDetailForm.employees[index]
                                .employeeNumber
                        );
                    }
                    return true; // Keep the element if the condition is not met
                });

            console.log($newOfferServiceDetailForm);

            _updateNewOfferProcessForm(
                Number(data.params.id),
                $newOfferServiceDetailForm,
            );
        },
    });

    const {
        form: newOfferSetSupporterApproverDetailForm,
        errors: newOfferSetSupporterApproverDetailFormErrors,
        enhance: newOfferSetSupporterApproverDetailFormEnhance,
    } = superForm(data.forms.newOfferSetSupporterApproverDetailForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_supporterApproverSchema),
        taintedMessage: false,
        onSubmit() {
            _setNewOfferSupporterApproverForm(
                Number(data.params.id),
                $newOfferSetSupporterApproverDetailForm,
            );
        },
    });

    const {
        form: newOfferSupporterResultForm,
        errors: newOfferSupporterResultFormErrors,
        enhance: newOfferSupporterResultFormEnhance,
    } = superForm(data.forms.newOfferSupporterResultForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_approverSchema),
        taintedMessage: false,
        onSubmit() {
            _newOfferSupporterResultForm(
                Number(data.params.id),
                $newOfferSupporterResultForm,
            );
        },
    });

    const {
        form: newOfferApproverResultForm,
        errors: newOfferApproverResultFormErrors,
        enhance: newOfferApproverResultFormEnhance,
    } = superForm(data.forms.newOfferApprovalResultForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_approverSchema),
        taintedMessage: false,
        onSubmit() {
            _newOfferApproverResultForm(
                Number(data.params.id),
                $newOfferApproverResultForm,
            );
        },
    });

    // Table list
    let includedEmployeesListTable: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: $form.employees ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [],
        url: 'employment/new_offer/detail',
        id: 'includedEmployeesListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<ContentHeader title="Maklumat Prosiding Tatatertib">
    {#if $isReadOnlyNewOfferApprovalResult && $newOfferApproverIsApproved}
        <Badge color="dark">Proses Tawaran Baru Tamat</Badge>
    {/if}
    {#if ($isReadOnlyNewOfferMeetingResult && $newOfferMeetingResultsAreNotApproved) || ($isReadOnlyNewOfferSupporterResult && !$newOfferSupporterIsApproved) || ($isReadOnlyNewOfferApprovalResult && !newOfferApproverIsApproved)}
        <Badge color="red">Proses Tawaran Baru Diberhentikan</Badge>
    {/if}

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../tawaran-baru');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Senarai Kakitangan Terlibat"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peperiksaan -->
            <div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col gap-2.5">
                    <DataTable
                        title="Senarai Kakitangan Di Dalam Mesyuarat"
                        bind:tableData={includedEmployeesListTable}
                    />
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan Terlibat" />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <Accordion>
                    {#each $employeeDetailForm.employees as _, index}
                        <AccordionItem
                            activeClass="outline-none bg-blue-100 text-blue-600 dark:text-white"
                            inactiveClasses="text-gray-500 hover:bg-blue-100"
                            open={index == 0}
                        >
                            <span
                                slot="header"
                                class="flex items-center gap-2 text-base"
                            >
                                <svg
                                    width="11"
                                    height="10"
                                    viewBox="0 0 11 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.2656 6.03906L6.51562 9.78906C6.375 9.92969 6.1875 10 6 10C5.78906 10 5.60156 9.92969 5.46094 9.78906C5.15625 9.50781 5.15625 9.01562 5.46094 8.73438L7.92188 6.25H0.75C0.328125 6.25 0 5.92188 0 5.5C0 5.10156 0.328125 4.75 0.75 4.75H7.92188L5.46094 2.28906C5.15625 2.00781 5.15625 1.51562 5.46094 1.23438C5.74219 0.929688 6.23438 0.929688 6.51562 1.23438L10.2656 4.98438C10.5703 5.26562 10.5703 5.75781 10.2656 6.03906Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span class="font-semibold"
                                    >{$employeeDetailForm.employees[index]
                                        .employeeName} ({$employeeDetailForm
                                        .employees[index].employeeNumber})</span
                                >
                            </span>

                            <CustomTextField
                                disabled
                                id="employeeNumber"
                                label={'Nombor Pekerja'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .employeeNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="workStatus"
                                label={'Status Pekerjaan'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .workStatus}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="employeeName"
                                label={'Nama Penuh'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .employeeName}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="alternativeName"
                                label={'Nama Lain'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .alternativeName}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .identityDocumentNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="email"
                                label={'Emel'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .email}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="homeNumber"
                                label={'Telefon Rumah'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .homeNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="phoneNumber"
                                label={'Telefon Bimbit'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .phoneNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                type="date"
                                id="birthDate"
                                label="Tarikh Lahir"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .birthDate}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="birthState"
                                label="Tempat Lahir"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .birthState}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="birthCountry"
                                label="Negara Dilahir"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .birthCountry}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="nationality"
                                label="Warganegara"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .nationality}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="race"
                                label="Bangsa"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .race}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="religion"
                                label="Agama"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .religion}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="gender"
                                label="Jantina"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .gender}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="marital"
                                label="Status Perkahwinan"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .marital}
                            ></CustomTextField>

                            <CustomSelectField
                                disabled
                                id="isExPoliceOrSoldier"
                                label="Bekas Polis / Tentera"
                                placeholder="-"
                                options={data.lookups.generalLookup}
                                bind:val={$employeeDetailForm.employees[index]
                                    .isExPoliceOrSoldier}
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="isInternalRelationship"
                                label="Perhubungan Dengan Kakitangan LKIM"
                                placeholder="-"
                                options={data.lookups.generalLookup}
                                bind:val={$employeeDetailForm.employees[index]
                                    .isInternalRelationship}
                            ></CustomSelectField>

                            {#if $employeeDetailForm.employees[index].isInternalRelationship}
                                <CustomTextField
                                    disabled
                                    id="relationEmployeeNumber"
                                    label="No. Pekerja LKIM"
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationEmployeeNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="relationName"
                                    label={'Nama Kakitangan LKIM'}
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationName}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="relationPosition"
                                    label="Jawatan Kakitangan LKIM"
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationPosition}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="relationship"
                                    label="Hubungan"
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationship}
                                ></CustomTextField>
                            {/if}
                        </AccordionItem>
                    {/each}
                </Accordion>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Mesyuarat">
            {#if !$isReadOnlyNewOfferMeetingResult && data.roles.isEmploymentSecretaryRole}
                <TextIconButton
                    label="Simpan"
                    type="primary"
                    form="newOfferMeetingDetailForm"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="newOfferMeetingDetailForm"
                method="POST"
                use:newOfferMeetingDetailFormEnhance
                class="flex w-full flex-col items-center gap-2"
            >
                <CustomTextField
                    disabled={true}
                    errors={$newOfferMeetingDetailFormErrors.meetingName}
                    id="meetingName"
                    label="Kumpulan Mesyuarat"
                    placeholder="-"
                    bind:val={$newOfferMeetingDetailForm.meetingName}
                ></CustomTextField>
                <CustomTextField
                    disabled={true}
                    errors={$newOfferMeetingDetailFormErrors.meetingNo}
                    id="meetingNo"
                    label="No. Mesyuarat"
                    placeholder="-"
                    type="text"
                    bind:val={$newOfferMeetingDetailForm.meetingNo}
                ></CustomTextField>
                <CustomTextField
                    disabled={true}
                    errors={$newOfferMeetingDetailFormErrors.totalEmployee}
                    id="totalEmployee"
                    label="Jumlah Kakitangan Terlibat"
                    placeholder="-"
                    type="number"
                    bind:val={$newOfferMeetingDetailForm.totalEmployee}
                ></CustomTextField>
                <CustomTextField
                    disabled={true}
                    errors={$newOfferMeetingDetailFormErrors.meetingDate}
                    id="meetingDate"
                    label="Tarikh Mesyuarat"
                    type="date"
                    bind:val={$newOfferMeetingDetailForm.meetingDate}
                ></CustomTextField>

                {#each $newOfferMeetingDetailForm.employees as _, index}
                    <div
                        class="mb-2.5 h-fit w-full space-y-3 rounded-[3px] border p-2.5"
                    >
                        <b class="w-full text-base text-system-primary"
                            >{index + 1}. {$newOfferMeetingDetailForm.employees[
                                index
                            ].employeeName} ({$newOfferMeetingDetailForm
                                .employees[index].employeeNumber})</b
                        >
                        <CustomTextField
                            disabled={$isReadOnlyNewOfferMeetingResult}
                            id="employees[index].remarks"
                            label="Catatan"
                            placeholder="-"
                            type="text"
                            bind:val={$newOfferMeetingDetailForm.employees[
                                index
                            ].remarks}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={$isReadOnlyNewOfferMeetingResult}
                            id="employees[index].status"
                            label="Keputusan Mesyuarat"
                            options={approveOptions}
                            bind:val={$newOfferMeetingDetailForm.employees[
                                index
                            ].status}
                        ></CustomRadioBoolean>
                    </div>
                {/each}
            </form>
        </StepperContentBody>
    </StepperContent>
    {#if !$newOfferMeetingResultsAreNotApproved}
        <StepperContent>
            <StepperContentHeader title="Maklumat Tawaran Baru">
                {#if !$isReadOnlyNewOfferProcess && data.roles.isEmploymentSecretaryRole}
                    <TextIconButton
                        label="Simpan"
                        type="primary"
                        form="newOfferServiceDetailForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    <Accordion>
                        {#each $newOfferServiceDetailForm.employees as _, index}
                            <AccordionItem
                                activeClass="outline-none bg-blue-100 text-blue-600 dark:text-white"
                                inactiveClasses="text-gray-500 hover:bg-blue-100"
                                open={index == 0}
                            >
                                <span
                                    slot="header"
                                    class="flex items-center gap-2 text-base"
                                >
                                    <svg
                                        width="11"
                                        height="10"
                                        viewBox="0 0 11 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.2656 6.03906L6.51562 9.78906C6.375 9.92969 6.1875 10 6 10C5.78906 10 5.60156 9.92969 5.46094 9.78906C5.15625 9.50781 5.15625 9.01562 5.46094 8.73438L7.92188 6.25H0.75C0.328125 6.25 0 5.92188 0 5.5C0 5.10156 0.328125 4.75 0.75 4.75H7.92188L5.46094 2.28906C5.15625 2.00781 5.15625 1.51562 5.46094 1.23438C5.74219 0.929688 6.23438 0.929688 6.51562 1.23438L10.2656 4.98438C10.5703 5.26562 10.5703 5.75781 10.2656 6.03906Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span class="font-semibold">
                                        {!$newOfferMeetingDetailForm.employees[
                                            index
                                        ].status
                                            ? '[TIDAK LULUS]'
                                            : ''}
                                        {$newOfferServiceDetailForm.employees[
                                            index
                                        ].employeeName} ({$newOfferServiceDetailForm
                                            .employees[index]
                                            .employeeNumber})</span
                                    >
                                </span>
                                <form
                                    id="newOfferServiceDetailForm"
                                    method="POST"
                                    use:newOfferServiceDetailFormEnhance
                                    class="flex w-full flex-col gap-2.5"
                                >
                                    {#if !$newOfferMeetingDetailForm.employees[index].status}
                                        <StepperFailStatement />
                                    {:else}
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="gradeId"
                                            label="Gred"
                                            placeholder="-"
                                            options={data.lookups.gradeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].gradeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="maxGradeId"
                                            label="Gred Maksimum"
                                            placeholder="-"
                                            options={data.lookups.gradeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].maxGradeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="positionId"
                                            label="Jawatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .positionLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].positionId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="placementId"
                                            label="Penempatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .placementLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].placementId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="serviceTypeId"
                                            label="Jenis Perkhidmatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .serviceTypeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].serviceTypeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="serviceGroupId"
                                            label="Kumpulan Perkhidmatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .serviceGroupLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .serviceGroupId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="employmentStatusId"
                                            label="Sektor Perkhidmatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .employmentStatusLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .employmentStatusId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="unitId"
                                            label="Bahagian"
                                            placeholder="-"
                                            options={data.lookups.unitLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].unitId}
                                        ></CustomSelectField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            type="number"
                                            id="eligibleLeaveCount"
                                            label={'Kelayakan Cuti'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .eligibleLeaveCount}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="effectiveDate"
                                            label={'Tarikh Kuatkuasa Lantikan Semasa'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].effectiveDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="newRecruitEffectiveDate"
                                            label={'Tarikh Berkuatkuasa Lantikan Baru'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .newRecruitEffectiveDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="firstEffectiveDate"
                                            label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .firstEffectiveDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="civilServiceStartDate"
                                            label={'Mula Dilantik Perkhidmatan Kerajaan'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .civilServiceStartDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="serviceDate"
                                            label={'Mula Dilantik Perkhidmatan LKIM'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].serviceDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="firstServiceDate"
                                            label={'Mula Dilantik Perkhidmatan Pertama'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .firstServiceDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="confirmDate"
                                            label={'Mula Disahkan Perkhidmatan Semasa'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].confirmDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            placeholder="-"
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="confirmServiceDate"
                                            label={'Disahkan Dalam Jawatan Semasa LKIM'}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .confirmServiceDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            placeholder="-"
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="firstEffectiveServiceDate"
                                            label={'Mula Berkuatkuasa Perkhidmatan Pertama'}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .firstEffectiveServiceDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            placeholder="-"
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="firstConfirmServiceDate"
                                            label={'Disahkan Dalam Jawatan Pertama LKIM'}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .firstConfirmServiceDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="retirementDate"
                                            label={'Tarikh Bersara'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .retirementDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="bankName"
                                            type="text"
                                            label={'Bank'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].bankName}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="bankAccount"
                                            type="number"
                                            label={'Akaun Bank'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].bankAccount}
                                        ></CustomTextField>

                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="retirementBenefit"
                                            label={'Kemudahan Persaraan'}
                                            options={RetirementBenefitDropdownConstant.list}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .retirementBenefit}
                                        ></CustomSelectField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="epfNumber"
                                            type="number"
                                            label={'Nombor EPF'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].epfNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="incomeNumber"
                                            type="number"
                                            label={'Nombor Pendapatan'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].incomeNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="pensionNumber"
                                            type="number"
                                            label={'Nombor Pencen'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].pensionNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={$isReadOnlyNewOfferProcess}
                                            id="socsoNumber"
                                            type="number"
                                            label={'Nombor SOCSO'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].socsoNumber}
                                        ></CustomTextField>

                                        <ContentHeader
                                            title="Maklumat Gaji dan Elaun - Elaun"
                                            fontSize="small"
                                            color="system-primary"
                                            fontWeight="bold"
                                            borderClass="border-none"
                                            titlePadding={false}
                                        />

                                        <div class="grid grid-cols-2 gap-10">
                                            <div class="space-y-2.5">
                                                <CustomSelectField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="revisionMonth"
                                                    label={'Bulan Berkuatkuasa'}
                                                    placeholder="-"
                                                    options={data.lookups
                                                        .sentencingMonthLookup}
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index]
                                                        .revisionMonth}
                                                ></CustomSelectField>

                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="kgt"
                                                    type="number"
                                                    label={'KGT (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].kgt}
                                                ></CustomTextField>

                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="maximumSalary"
                                                    type="number"
                                                    label={'Tangga Gaji (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index]
                                                        .maximumSalary}
                                                ></CustomTextField>

                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="baseSalary"
                                                    label={'Gaji Pokok (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index]
                                                        .baseSalary}
                                                ></CustomTextField>
                                            </div>
                                            <div class="space-y-2.5">
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="ITKA"
                                                    label={'ITKA (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].itka}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="ITP"
                                                    label={'ITP (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].itp}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="EPW"
                                                    label={'EPW (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].epw}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess}
                                                    id="COLA"
                                                    label={'COLA (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].cola}
                                                ></CustomTextField>
                                            </div>
                                        </div>
                                    {/if}
                                </form>
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </div>
            </StepperContentBody>
        </StepperContent>
        {#if $isReadOnlyNewOfferProcess}
            <StepperContent>
                <StepperContentHeader title="Maklumat Penyokong Dan Pelulus">
                    {#if !$isReadOnlyNewOfferSetApprovers && data.roles.isEmploymentSecretaryRole}
                        <TextIconButton
                            label="Simpan"
                            type="primary"
                            form="newOfferSetSupporterApproverDetailForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        id="newOfferSetSupporterApproverDetailForm"
                        method="POST"
                        use:newOfferSetSupporterApproverDetailFormEnhance
                        class="flex w-full flex-col items-center gap-2"
                    >
                        <CustomSelectField
                            disabled={$isReadOnlyNewOfferSetApprovers}
                            errors={$newOfferSetSupporterApproverDetailFormErrors.supporterId}
                            id="supporterId"
                            label="Penyokong"
                            placeholder="-"
                            options={data.lookups.employeesListLookup}
                            bind:val={$newOfferSetSupporterApproverDetailForm.supporterId}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadOnlyNewOfferSetApprovers}
                            errors={$newOfferSetSupporterApproverDetailFormErrors.approverId}
                            id="approverId"
                            label="Pelulus"
                            placeholder="-"
                            options={data.lookups.employeesListLookup}
                            bind:val={$newOfferSetSupporterApproverDetailForm.approverId}
                        ></CustomSelectField>
                    </form>
                </StepperContentBody>
            </StepperContent>
            {#if $isReadOnlyNewOfferSetApprovers}
                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Pengesahan Dalam Perhidmatan Daripada Peranan - Peranan Bertanggungjawab"
                    >
                        {#if !data.view.newOfferDetailView.supporter.isReadonly && data.roles.isSupporterRole}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="newOfferSupporterResultForm"
                            ></TextIconButton>
                        {:else if !data.view.newOfferDetailView.approver.isReadonly && data.roles.isApproverRole}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="newOfferApproverResultForm"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <div class="flex w-full flex-col gap-2.5">
                            {#if !data.view.newOfferDetailView.supporter.isReadonly && data.roles.isSupporterRole}
                                <form
                                    id="newOfferSupporterResultForm"
                                    method="POST"
                                    use:newOfferSupporterResultFormEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Penyokong</b
                                        >
                                    </div>
                                    <CustomTextField
                                        disabled={data.view.newOfferDetailView
                                            .supporter.isReadonly}
                                        errors={$newOfferSupporterResultFormErrors.remark}
                                        id="approverRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$newOfferSupporterResultForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={data.view.newOfferDetailView
                                            .supporter.isReadonly}
                                        errors={$newOfferSupporterResultFormErrors.status}
                                        id="approverIsApproved"
                                        options={supportOptions}
                                        label={'Keputusan'}
                                        bind:val={$newOfferSupporterResultForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {:else if !data.view.newOfferDetailView.approver.isReadonly && data.roles.isApproverRole}
                                <form
                                    id="newOfferApproverResultForm"
                                    method="POST"
                                    use:newOfferApproverResultFormEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Pelulus</b
                                        >
                                    </div>
                                    <CustomTextField
                                        disabled={data.view.newOfferDetailView
                                            .approver.isReadonly}
                                        errors={$newOfferApproverResultFormErrors.remark}
                                        id="approverRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$newOfferApproverResultForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={data.view.newOfferDetailView
                                            .approver.isReadonly}
                                        errors={$newOfferApproverResultFormErrors.status}
                                        id="approverIsApproved"
                                        options={approveOptions}
                                        label={'Keputusan'}
                                        bind:val={$newOfferApproverResultForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {/if}

                            <div
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >1. Penyokong</b
                                    >
                                </div>
                                {#if $isReadOnlyNewOfferSupporterResult}
                                    <CustomTextField
                                        disabled
                                        id="remark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$newOfferSupporterResultForm.remark}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        disabled
                                        id="status"
                                        options={supportOptions}
                                        label={'Keputusan'}
                                        bind:val={$newOfferSupporterResultForm.status}
                                    ></CustomSelectField>
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                                <hr />
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >2. Pelulus</b
                                    >
                                </div>
                                {#if $isReadOnlyNewOfferApprovalResult}
                                    <CustomTextField
                                        disabled
                                        id="remark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$newOfferApproverResultForm.remark}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        disabled
                                        id="status"
                                        options={approveOptions}
                                        label={'Keputusan'}
                                        bind:val={$newOfferApproverResultForm.status}
                                    ></CustomSelectField>
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                            </div>
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    {/if}
</Stepper>

<Toaster />
