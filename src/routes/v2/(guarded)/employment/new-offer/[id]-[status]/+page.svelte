<script lang="ts">
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import {
        _approverSchema,
        _letterDetailSchema,
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
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';
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
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _newOfferApproverResultForm,
        _newOfferLetterDetailForm,
        _newOfferSupporterResultForm,
        _setNewOfferSupporterApproverForm,
        _updateNewOfferMeetingResultForm,
        _updateNewOfferProcessForm,
    } from './+page';
    import { _meetingResultSchema } from '$lib/schemas/mypsm/employment/new-offer/schema';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { kgtMonthValueIsStringLookup } from '$lib/constants/core/dropdown.constant';
    export let data: PageData;

    let allNewOfferSupporterStatusAndRemarksNotNull = false;
    let allNewOfferApproverStatusAndRemarksNotNull = false;
    let newOfferMeetingResultsAreNotApproved = writable<boolean>(true);
    let newOfferSupporterIsApproved = writable<boolean>(false);
    let newOfferApproverIsApproved = writable<boolean>(false);
    let isReadOnlyNewOfferMeetingResult = writable<boolean>(false);
    let newOfferMeetingResultIsDraft = writable<boolean>(false);
    let isReadOnlyNewOfferProcess = writable<boolean>(false);
    let newOfferProcessIsDraft = writable<boolean>(false);
    let newOfferSetApproversIsDraft = writable<boolean>(false);
    let isReadOnlyNewOfferSetApprovers = writable<boolean>(false);
    let newOfferSupporterResultIsDraft = writable<boolean>(false);
    let isReadOnlyNewOfferSupporterResult = writable<boolean>(false);
    let newOfferApproverResultIsDraft = writable<boolean>(false);
    let isReadOnlyNewOfferApprovalResult = writable<boolean>(false);
    let newOfferLetterDetailIsDraft = writable<boolean>(false);

    $: {
        if (data.view.newOfferDetailView.meetingResult.isDraft === true) {
            newOfferMeetingResultIsDraft.set(true);
        } else {
            newOfferMeetingResultIsDraft.set(false);
        }

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

        if (data.view.newOfferDetailView.process.isDraft === true) {
            newOfferProcessIsDraft.set(true);
        } else {
            newOfferProcessIsDraft.set(false);
        }

        if (data.view.newOfferDetailView.process.isReadonly) {
            isReadOnlyNewOfferProcess.set(true);
        } else {
            isReadOnlyNewOfferProcess.set(false);
        }

        if (
            data.view.newOfferDetailView.setSupporterApprover.isDraft === true
        ) {
            newOfferSetApproversIsDraft.set(true);
        } else {
            newOfferSetApproversIsDraft.set(false);
        }

        if (data.view.newOfferDetailView.setSupporterApprover.isReadonly) {
            isReadOnlyNewOfferSetApprovers.set(true);
        } else {
            isReadOnlyNewOfferSetApprovers.set(false);
        }

        if (data.view.newOfferDetailView.supporter.isDraft === true) {
            newOfferSupporterResultIsDraft.set(true);
        } else {
            newOfferSupporterResultIsDraft.set(false);
        }

        newOfferSupporterIsApproved.set(
            data.view.newOfferDetailView.supporter.employees.every(
                (employee) => employee.status,
            ),
        );

        newOfferApproverIsApproved.set(
            data.view.newOfferDetailView.approver.employees.every(
                (employee) => employee.status,
            ),
        );

        if (allNewOfferSupporterStatusAndRemarksNotNull) {
            isReadOnlyNewOfferSupporterResult.set(true);
        } else {
            isReadOnlyNewOfferSupporterResult.set(false);
        }

        if (data.view.newOfferDetailView.approver.isDraft === true) {
            newOfferApproverResultIsDraft.set(true);
        } else {
            newOfferApproverResultIsDraft.set(false);
        }

        if (data.view.newOfferDetailView.document.isDraft === true) {
            newOfferLetterDetailIsDraft.set(true);
        } else {
            newOfferLetterDetailIsDraft.set(false);
        }

        if (allNewOfferApproverStatusAndRemarksNotNull) {
            isReadOnlyNewOfferApprovalResult.set(true);
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

            _updateNewOfferProcessForm(
                Number(data.params.id),
                $newOfferServiceDetailForm,
            );
        },
    });

    $newOfferServiceDetailForm.employees.forEach(
        (emp) => (emp.serviceTypeId = 2),
    );

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
        invalidateAll: false,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_approverSchema),
        taintedMessage: false,
        onSubmit() {
            $newOfferSupporterResultForm.employees =
                $newOfferSupporterResultForm.employees.filter((val, index) => {
                    if (!$newOfferMeetingDetailForm.employees[index].status) {
                        return (
                            val.employeeNumber !==
                            $newOfferMeetingDetailForm.employees[index]
                                .employeeNumber
                        );
                    }
                    return true; // Keep the element if the condition is not met
                });

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
            $newOfferApproverResultForm.employees =
                $newOfferApproverResultForm.employees.filter((val, index) => {
                    if (!$newOfferMeetingDetailForm.employees[index].status) {
                        return (
                            val.employeeNumber !==
                            $newOfferMeetingDetailForm.employees[index]
                                .employeeNumber
                        );
                    }
                    return true; // Keep the element if the condition is not met
                });

            _newOfferApproverResultForm(
                Number(data.params.id),
                $newOfferApproverResultForm,
            );
        },
    });

    const {
        form: newOfferLetterDetailForm,
        errors: newOfferLetterDetailFormErrors,
        enhance: newOfferLetterDetailFormEnhance,
    } = superForm(data.forms.newOfferLetterDetailForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_letterDetailSchema),
        taintedMessage: false,
        onSubmit() {
            _newOfferLetterDetailForm(
                Number(data.params.id),
                $newOfferLetterDetailForm,
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
        hiddenColumn: ['employeeId', 'eligibleLeaveCount', 'grade'],
        dictionary: [],
        url: '',
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

<ContentHeader title="Maklumat Tawaran Baru">
    <StatusPill status={data.params.status} slot="status" />

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../new-offer');
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
                                isRequired={false}
                                id="employeeNumber"
                                label={'Nombor Pekerja'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .employeeNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="workStatus"
                                label={'Status Pekerjaan'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .workStatus}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="employeeName"
                                label={'Nama Penuh'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .employeeName}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="alternativeName"
                                label={'Nama Lain'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .alternativeName}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .identityDocumentNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="email"
                                label={'Emel'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .email}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="homeNumber"
                                label={'Telefon Rumah'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .homeNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="phoneNumber"
                                label={'Telefon Bimbit'}
                                type="text"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .phoneNumber}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                type="date"
                                id="birthDate"
                                label="Tarikh Lahir"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .birthDate}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="birthState"
                                label="Tempat Lahir"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .birthState}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="birthCountry"
                                label="Negara Dilahir"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .birthCountry}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="nationality"
                                label="Warganegara"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .nationality}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="race"
                                label="Bangsa"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .race}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="religion"
                                label="Agama"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .religion}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="gender"
                                label="Jantina"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .gender}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="marital"
                                label="Status Perkahwinan"
                                placeholder="-"
                                bind:val={$employeeDetailForm.employees[index]
                                    .marital}
                            ></CustomTextField>

                            <CustomSelectField
                                disabled
                                isRequired={false}
                                id="isExPoliceOrSoldier"
                                label="Bekas Polis / Tentera"
                                placeholder="-"
                                options={data.lookups.generalLookup}
                                bind:val={$employeeDetailForm.employees[index]
                                    .isExPoliceOrSoldier}
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                isRequired={false}
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
                                    isRequired={false}
                                    id="relationEmployeeNumber"
                                    label="No. Pekerja LKIM"
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationEmployeeNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    isRequired={false}
                                    id="relationName"
                                    label={'Nama Kakitangan LKIM'}
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationName}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    isRequired={false}
                                    id="relationPosition"
                                    label="Jawatan Kakitangan LKIM"
                                    bind:val={$employeeDetailForm.employees[
                                        index
                                    ].relationPosition}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    isRequired={false}
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
            {#if (!$isReadOnlyNewOfferMeetingResult || $newOfferMeetingResultIsDraft) && data.roles.isEmploymentSecretaryRole}
                <TextIconButton
                    label="Simpan"
                    type="neutral"
                    form="newOfferMeetingDetailForm"
                    onClick={() => {
                        $newOfferMeetingDetailForm.isDraft = true;
                    }}
                />
                <TextIconButton
                    label="Hantar"
                    type="primary"
                    form="newOfferMeetingDetailForm"
                    onClick={() => {
                        $newOfferMeetingDetailForm.isDraft = false;
                    }}
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
                            disabled={$isReadOnlyNewOfferMeetingResult &&
                                !$newOfferMeetingResultIsDraft}
                            id="employees[index].remarks"
                            label="Catatan"
                            placeholder="-"
                            type="text"
                            bind:val={$newOfferMeetingDetailForm.employees[
                                index
                            ].remarks}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={$isReadOnlyNewOfferMeetingResult &&
                                !$newOfferMeetingResultIsDraft}
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
    {#if !$newOfferMeetingResultsAreNotApproved && !$newOfferMeetingResultIsDraft}
        <StepperContent>
            <StepperContentHeader title="Maklumat Tawaran Baru">
                {#if (!$isReadOnlyNewOfferProcess || $newOfferProcessIsDraft) && data.roles.isEmploymentSecretaryRole}
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        form="newOfferServiceDetailForm"
                        onClick={() => {
                            $newOfferServiceDetailForm.isDraft = true;
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        form="newOfferServiceDetailForm"
                        onClick={() => {
                            $newOfferServiceDetailForm.isDraft = false;
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    <Accordion>
                        {#each $newOfferServiceDetailForm.employees as _, index}
                            <AccordionItem
                                classActive={$newOfferMeetingDetailForm
                                    .employees[index].status
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-red-100 text-red-600'}
                                classInactive={$newOfferMeetingDetailForm
                                    .employees[index].status
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-red-100 text-red-600'}
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
                                            ? '[DITOLAK]'
                                            : ''}
                                        {$newOfferServiceDetailForm.employees[
                                            index
                                        ].employeeName} ({$newOfferServiceDetailForm
                                            .employees[index]
                                            .employeeNumber})</span
                                    >
                                </span>
                                <div slot="arrowup">
                                    <svg
                                        class="h-3 w-3 {$newOfferMeetingDetailForm
                                            .employees[index].status
                                            ? 'text-blue-600'
                                            : 'text-red-600'}"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </div>
                                <div slot="arrowdown">
                                    <svg
                                        class="h-3 w-3 {$newOfferMeetingDetailForm
                                            .employees[index].status
                                            ? 'text-blue-600'
                                            : 'text-red-600'}"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </div>
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
                                            disabled
                                            isRequired={false}
                                            id="gradeId"
                                            label="Gred Asal"
                                            placeholder="-"
                                            options={data.lookups.gradeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .currentGradeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess &&
                                                !$newOfferProcessIsDraft}
                                            id="gradeId"
                                            label="Gred Baru"
                                            placeholder="-"
                                            options={data.lookups.gradeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].gradeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess &&
                                                !$newOfferProcessIsDraft}
                                            id="maxGradeId"
                                            label="Gred Maksimum"
                                            placeholder="-"
                                            options={data.lookups.gradeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].maxGradeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess &&
                                                !$newOfferProcessIsDraft}
                                            id="placementId"
                                            label="Penempatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .placementLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].placementId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled
                                            id="serviceTypeId"
                                            label="Jenis Perkhidmatan"
                                            placeholder="-"
                                            options={data.lookups
                                                .serviceTypeLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].serviceTypeId}
                                        ></CustomSelectField>
                                        <CustomSelectField
                                            disabled={$isReadOnlyNewOfferProcess &&
                                                !$newOfferProcessIsDraft}
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
                                            disabled={$isReadOnlyNewOfferProcess &&
                                                !$newOfferProcessIsDraft}
                                            id="unitId"
                                            label="Bahagian"
                                            placeholder="-"
                                            options={data.lookups.unitLookup}
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].unitId}
                                        ></CustomSelectField>

                                        <CustomTextField
                                            type="date"
                                            disabled={$isReadOnlyNewOfferProcess &&
                                                !$newOfferProcessIsDraft}
                                            id="effectiveDate"
                                            label={'Tarikh Kuatkuasa Lantikan Semasa'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].effectiveDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled
                                            isRequired={false}
                                            id="civilServiceStartDate"
                                            label={'Mula Dilantik Perkhidmatan Kerajaan'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index]
                                                .civilServiceStartDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled
                                            isRequired={false}
                                            id="serviceDate"
                                            label={'Mula Dilantik Perkhidmatan LKIM'}
                                            placeholder="-"
                                            bind:val={$newOfferServiceDetailForm
                                                .employees[index].serviceDate}
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
                                                    disabled={$isReadOnlyNewOfferProcess &&
                                                        !$newOfferProcessIsDraft}
                                                    id="revisionMonth"
                                                    label={'Bulan Berkuatkuasa (Bulan KGT)'}
                                                    placeholder="-"
                                                    options={kgtMonthValueIsStringLookup}
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index]
                                                        .revisionMonth}
                                                ></CustomSelectField>

                                                <CustomTextField
                                                    disabled={true}
                                                    isRequired={false}
                                                    id="kgt"
                                                    type="number"
                                                    label={'KGT (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].kgt}
                                                ></CustomTextField>

                                                <CustomTextField
                                                    disabled={true}
                                                    isRequired={false}
                                                    id="maximumSalary"
                                                    type="number"
                                                    label={'Tangga Gaji (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index]
                                                        .maximumSalary}
                                                ></CustomTextField>

                                                <CustomTextField
                                                    disabled={true}
                                                    isRequired={false}
                                                    id="baseSalary"
                                                    type="number"
                                                    label={'Gaji Pokok (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index]
                                                        .baseSalary}
                                                ></CustomTextField>
                                            </div>
                                            <div class="space-y-2.5">
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess &&
                                                        !$newOfferProcessIsDraft}
                                                    id="ITKA"
                                                    isRequired={false}
                                                    type="number"
                                                    label={'ITKA (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].itka}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess &&
                                                        !$newOfferProcessIsDraft}
                                                    id="ITP"
                                                    isRequired={false}
                                                    type="number"
                                                    label={'ITP (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].itp}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess &&
                                                        !$newOfferProcessIsDraft}
                                                    id="EPW"
                                                    isRequired={false}
                                                    type="number"
                                                    label={'EPW (RM)'}
                                                    placeholder="-"
                                                    bind:val={$newOfferServiceDetailForm
                                                        .employees[index].epw}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={$isReadOnlyNewOfferProcess &&
                                                        !$newOfferProcessIsDraft}
                                                    id="COLA"
                                                    isRequired={false}
                                                    type="number"
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
        {#if $isReadOnlyNewOfferProcess && !$newOfferProcessIsDraft}
            <StepperContent>
                <StepperContentHeader title="Tetapan Penyokong Dan Pelulus">
                    {#if (!$isReadOnlyNewOfferSetApprovers || $newOfferSetApproversIsDraft) && data.roles.isEmploymentSecretaryRole}
                        <TextIconButton
                            label="Simpan"
                            type="neutral"
                            form="newOfferSetSupporterApproverDetailForm"
                            onClick={() => {
                                $newOfferSetSupporterApproverDetailForm.isDraft = true;
                            }}
                        />
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            form="newOfferSetSupporterApproverDetailForm"
                            onClick={() => {
                                $newOfferSetSupporterApproverDetailForm.isDraft = false;
                            }}
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
                            disabled={$isReadOnlyNewOfferSetApprovers &&
                                !$newOfferSetApproversIsDraft}
                            errors={$newOfferSetSupporterApproverDetailFormErrors.supporterId}
                            id="supporterId"
                            label="Penyokong"
                            placeholder="-"
                            options={data.lookups.employeesListLookup}
                            bind:val={$newOfferSetSupporterApproverDetailForm.supporterId}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadOnlyNewOfferSetApprovers &&
                                !$newOfferSetApproversIsDraft}
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
            {#if $isReadOnlyNewOfferSetApprovers && !$newOfferSetApproversIsDraft}
                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Pengesahan Dalam Perhidmatan Daripada Peranan - Peranan Bertanggungjawab"
                    >
                        {#if (!data.view.newOfferDetailView.supporter.isReadonly || $newOfferSupporterResultIsDraft) && data.roles.isSupporterRole}
                            {#if data.roles.layoutData.accountDetails.identityDocumentNumber === data.view.newOfferDetailView.supporter.identityDocumentNumber}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    form="newOfferSupporterResultForm"
                                    onClick={() => {
                                        $newOfferSupporterResultForm.isDraft = true;
                                    }}
                                ></TextIconButton>
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    form="newOfferSupporterResultForm"
                                    onClick={() => {
                                        $newOfferSupporterResultForm.isDraft = false;
                                    }}
                                ></TextIconButton>
                            {/if}
                        {:else if (!data.view.newOfferDetailView.approver.isReadonly || $newOfferApproverResultIsDraft) && data.roles.isApproverRole}
                            {#if data.roles.layoutData.accountDetails.identityDocumentNumber === data.view.newOfferDetailView.approver.identityDocumentNumber}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    form="newOfferApproverResultForm"
                                    onClick={() => {
                                        $newOfferApproverResultForm.isDraft = true;
                                    }}
                                ></TextIconButton>
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    form="newOfferApproverResultForm"
                                    onClick={() => {
                                        $newOfferApproverResultForm.isDraft = false;
                                    }}
                                ></TextIconButton>
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <div class="flex w-full flex-col gap-2.5">
                            {#if (!data.view.newOfferDetailView.supporter.isReadonly || $newOfferSupporterResultIsDraft) && data.roles.isSupporterRole}
                                {#if data.roles.layoutData.accountDetails.identityDocumentNumber === data.view.newOfferDetailView.supporter.identityDocumentNumber}
                                    <form
                                        id="newOfferSupporterResultForm"
                                        method="POST"
                                        use:newOfferSupporterResultFormEnhance
                                        class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                    >
                                        <div class="mb-5">
                                            <b
                                                class="text-sm text-system-primary"
                                                >Bahagian Penyokong</b
                                            >
                                        </div>
                                        <Accordion>
                                            {#each $newOfferSupporterResultForm.employees as _, i}
                                                <AccordionItem
                                                    classActive={$newOfferMeetingDetailForm
                                                        .employees[i].status
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-red-100 text-red-600'}
                                                    classInactive={$newOfferMeetingDetailForm
                                                        .employees[i].status
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-red-100 text-red-600'}
                                                    open={i == 0}
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
                                                        <span
                                                            class="font-semibold"
                                                        >
                                                            {!$newOfferMeetingDetailForm
                                                                .employees[i]
                                                                .status ||
                                                            !$newOfferSupporterResultForm
                                                                .employees[i]
                                                                .status
                                                                ? '[DITOLAK]'
                                                                : ''}
                                                            {$newOfferServiceDetailForm
                                                                .employees[i]
                                                                .employeeName} ({$newOfferServiceDetailForm
                                                                .employees[i]
                                                                .employeeNumber})</span
                                                        >
                                                    </span>
                                                    <div slot="arrowup">
                                                        <svg
                                                            class="h-3 w-3 {$newOfferMeetingDetailForm
                                                                .employees[i]
                                                                .status &&
                                                            $newOfferSupporterResultForm
                                                                .employees[i]
                                                                .status
                                                                ? 'text-blue-600'
                                                                : 'text-red-600'}"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M9 5 5 1 1 5"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div slot="arrowdown">
                                                        <svg
                                                            class="h-3 w-3 {$newOfferMeetingDetailForm
                                                                .employees[i]
                                                                .status &&
                                                            $newOfferSupporterResultForm
                                                                .employees[i]
                                                                .status
                                                                ? 'text-blue-600'
                                                                : 'text-red-600'}"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="m1 1 4 4 4-4"
                                                            />
                                                        </svg>
                                                    </div>
                                                    {#if !$newOfferMeetingDetailForm.employees[i].status}
                                                        <StepperFailStatement />
                                                    {:else}
                                                        <CustomTextField
                                                            disabled={true}
                                                            id="applicantId"
                                                            label="Nombor Kakitangan"
                                                            bind:val={$newOfferSupporterResultForm
                                                                .employees[i]
                                                                .employeeNumber}
                                                        ></CustomTextField>

                                                        <CustomTextField
                                                            disabled={true}
                                                            id="applicantName"
                                                            label="Nama Kakitangan"
                                                            bind:val={$newOfferSupporterResultForm
                                                                .employees[i]
                                                                .employeeName}
                                                        ></CustomTextField>

                                                        <CustomTextField
                                                            disabled={data.view
                                                                .newOfferDetailView
                                                                .supporter
                                                                .isReadonly &&
                                                                !$newOfferSupporterResultIsDraft}
                                                            id="supporterRemark"
                                                            label="Tindakan/Ulasan"
                                                            bind:val={$newOfferSupporterResultForm
                                                                .employees[i]
                                                                .remarks}
                                                        ></CustomTextField>

                                                        <CustomRadioBoolean
                                                            disabled={data.view
                                                                .newOfferDetailView
                                                                .supporter
                                                                .isReadonly &&
                                                                !$newOfferSupporterResultIsDraft}
                                                            id="supporterIsApproved"
                                                            options={supportOptions}
                                                            label={'Keputusan'}
                                                            bind:val={$newOfferSupporterResultForm
                                                                .employees[i]
                                                                .status}
                                                        ></CustomRadioBoolean>
                                                    {/if}
                                                </AccordionItem>
                                            {/each}
                                        </Accordion>
                                    </form>
                                {/if}
                            {:else if (!data.view.newOfferDetailView.approver.isReadonly || $newOfferApproverResultIsDraft) && data.roles.isApproverRole}
                                {#if data.roles.layoutData.accountDetails.identityDocumentNumber === data.view.newOfferDetailView.approver.identityDocumentNumber}
                                    <form
                                        id="newOfferApproverResultForm"
                                        method="POST"
                                        use:newOfferApproverResultFormEnhance
                                        class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                    >
                                        <div class="mb-5">
                                            <b
                                                class="text-sm text-system-primary"
                                                >Bahagian Pelulus</b
                                            >
                                        </div>
                                        <Accordion>
                                            {#each $newOfferApproverResultForm.employees as _, i}
                                                <AccordionItem
                                                    classActive={$newOfferMeetingDetailForm
                                                        .employees[i].status
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-red-100 text-red-600'}
                                                    classInactive={$newOfferMeetingDetailForm
                                                        .employees[i].status
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-red-100 text-red-600'}
                                                    open={i == 0}
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
                                                        <span
                                                            class="font-semibold"
                                                        >
                                                            {!$newOfferMeetingDetailForm
                                                                .employees[i]
                                                                .status ||
                                                            !$newOfferApproverResultForm
                                                                .employees[i]
                                                                .status
                                                                ? '[DITOLAK]'
                                                                : ''}
                                                            {$newOfferServiceDetailForm
                                                                .employees[i]
                                                                .employeeName} ({$newOfferServiceDetailForm
                                                                .employees[i]
                                                                .employeeNumber})</span
                                                        >
                                                    </span>
                                                    <div slot="arrowup">
                                                        <svg
                                                            class="h-3 w-3 {$newOfferMeetingDetailForm
                                                                .employees[i]
                                                                .status &&
                                                            $newOfferApproverResultForm
                                                                .employees[i]
                                                                .status
                                                                ? 'text-blue-600'
                                                                : 'text-red-600'}"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M9 5 5 1 1 5"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div slot="arrowdown">
                                                        <svg
                                                            class="h-3 w-3 {$newOfferMeetingDetailForm
                                                                .employees[i]
                                                                .status &&
                                                            $newOfferApproverResultForm
                                                                .employees[i]
                                                                .status
                                                                ? 'text-blue-600'
                                                                : 'text-red-600'}"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="m1 1 4 4 4-4"
                                                            />
                                                        </svg>
                                                    </div>
                                                    {#if !$newOfferMeetingDetailForm.employees[i].status}
                                                        <StepperFailStatement />
                                                    {:else}
                                                        <CustomTextField
                                                            disabled={true}
                                                            id="applicantId"
                                                            label="Nombor Kakitangan"
                                                            bind:val={$newOfferApproverResultForm
                                                                .employees[i]
                                                                .employeeNumber}
                                                        ></CustomTextField>

                                                        <CustomTextField
                                                            disabled={true}
                                                            id="applicantName"
                                                            label="Nama Kakitangan"
                                                            bind:val={$newOfferApproverResultForm
                                                                .employees[i]
                                                                .employeeName}
                                                        ></CustomTextField>

                                                        <CustomTextField
                                                            disabled={data.view
                                                                .newOfferDetailView
                                                                .approver
                                                                .isReadonly &&
                                                                !$newOfferApproverResultIsDraft}
                                                            id="approverRemark"
                                                            label="Tindakan/Ulasan"
                                                            bind:val={$newOfferApproverResultForm
                                                                .employees[i]
                                                                .remarks}
                                                        ></CustomTextField>

                                                        <CustomRadioBoolean
                                                            disabled={data.view
                                                                .newOfferDetailView
                                                                .approver
                                                                .isReadonly &&
                                                                !$newOfferApproverResultIsDraft}
                                                            id="approverIsApproved"
                                                            options={approveOptions}
                                                            label={'Keputusan'}
                                                            bind:val={$newOfferApproverResultForm
                                                                .employees[i]
                                                                .status}
                                                        ></CustomRadioBoolean>
                                                    {/if}
                                                </AccordionItem>
                                            {/each}
                                        </Accordion>
                                    </form>
                                {/if}
                            {/if}

                            <div
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-base text-black"
                                        >Rekod Keputusan peranan (-peranan)
                                        berkaitan</b
                                    >
                                </div>
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >1. Penyokong</b
                                    >
                                </div>
                                {#if data.view.newOfferDetailView.supporter.isReadonly && !$newOfferSupporterResultIsDraft}
                                    <Accordion>
                                        {#each $newOfferSupporterResultForm.employees as _, i}
                                            <AccordionItem
                                                classActive={$newOfferMeetingDetailForm
                                                    .employees[i].status &&
                                                $newOfferSupporterResultForm
                                                    .employees[i].status
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-red-100 text-red-600'}
                                                classInactive={$newOfferMeetingDetailForm
                                                    .employees[i].status &&
                                                $newOfferSupporterResultForm
                                                    .employees[i].status
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-red-100 text-red-600'}
                                                open={i == 0}
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
                                                        {!$newOfferMeetingDetailForm
                                                            .employees[i]
                                                            .status ||
                                                        !$newOfferSupporterResultForm
                                                            .employees[i].status
                                                            ? '[DITOLAK]'
                                                            : ''}
                                                        {$newOfferServiceDetailForm
                                                            .employees[i]
                                                            .employeeName} ({$newOfferServiceDetailForm
                                                            .employees[i]
                                                            .employeeNumber})</span
                                                    >
                                                </span>
                                                <div slot="arrowup">
                                                    <svg
                                                        class="h-3 w-3 {$newOfferMeetingDetailForm
                                                            .employees[i]
                                                            .status &&
                                                        $newOfferSupporterResultForm
                                                            .employees[i].status
                                                            ? 'text-blue-600'
                                                            : 'text-red-600'}"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 5 5 1 1 5"
                                                        />
                                                    </svg>
                                                </div>
                                                <div slot="arrowdown">
                                                    <svg
                                                        class="h-3 w-3 {$newOfferMeetingDetailForm
                                                            .employees[i]
                                                            .status &&
                                                        $newOfferSupporterResultForm
                                                            .employees[i].status
                                                            ? 'text-blue-600'
                                                            : 'text-red-600'}"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="m1 1 4 4 4-4"
                                                        />
                                                    </svg>
                                                </div>
                                                {#if !$newOfferMeetingDetailForm.employees[i].status}
                                                    <StepperFailStatement />
                                                {:else}
                                                    <CustomTextField
                                                        disabled={true}
                                                        id="applicantId"
                                                        label="Nombor Kakitangan"
                                                        bind:val={$newOfferSupporterResultForm
                                                            .employees[i]
                                                            .employeeNumber}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={true}
                                                        id="applicantName"
                                                        label="Nama Kakitangan"
                                                        bind:val={$newOfferSupporterResultForm
                                                            .employees[i]
                                                            .employeeName}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={true}
                                                        id="supporterRemark"
                                                        label="Tindakan/Ulasan"
                                                        bind:val={$newOfferSupporterResultForm
                                                            .employees[i]
                                                            .remarks}
                                                    ></CustomTextField>

                                                    <CustomRadioBoolean
                                                        disabled={true}
                                                        id="supporterIsApproved"
                                                        options={supportOptions}
                                                        label={'Keputusan'}
                                                        bind:val={$newOfferSupporterResultForm
                                                            .employees[i]
                                                            .status}
                                                    ></CustomRadioBoolean>
                                                {/if}
                                            </AccordionItem>
                                        {/each}
                                    </Accordion>
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                                <hr />
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >2. Pelulus</b
                                    >
                                </div>
                                {#if data.view.newOfferDetailView.approver.isReadonly && !$newOfferApproverResultIsDraft && data.view.newOfferDetailView.supporter.isReadonly}
                                    <Accordion>
                                        {#each $newOfferApproverResultForm.employees as _, i}
                                            <AccordionItem
                                                classActive={$newOfferMeetingDetailForm
                                                    .employees[i].status &&
                                                $newOfferApproverResultForm
                                                    .employees[i].status
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-red-100 text-red-600'}
                                                classInactive={$newOfferMeetingDetailForm
                                                    .employees[i].status &&
                                                $newOfferApproverResultForm
                                                    .employees[i].status
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-red-100 text-red-600'}
                                                open={i == 0}
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
                                                        {!$newOfferMeetingDetailForm
                                                            .employees[i]
                                                            .status ||
                                                        !$newOfferApproverResultForm
                                                            .employees[i].status
                                                            ? '[DITOLAK]'
                                                            : ''}
                                                        {$newOfferServiceDetailForm
                                                            .employees[i]
                                                            .employeeName} ({$newOfferServiceDetailForm
                                                            .employees[i]
                                                            .employeeNumber})</span
                                                    >
                                                </span>
                                                <div slot="arrowup">
                                                    <svg
                                                        class="h-3 w-3 {$newOfferMeetingDetailForm
                                                            .employees[i]
                                                            .status &&
                                                        $newOfferApproverResultForm
                                                            .employees[i].status
                                                            ? 'text-blue-600'
                                                            : 'text-red-600'}"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 5 5 1 1 5"
                                                        />
                                                    </svg>
                                                </div>
                                                <div slot="arrowdown">
                                                    <svg
                                                        class="h-3 w-3 {$newOfferMeetingDetailForm
                                                            .employees[i]
                                                            .status &&
                                                        $newOfferApproverResultForm
                                                            .employees[i].status
                                                            ? 'text-blue-600'
                                                            : 'text-red-600'}"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="m1 1 4 4 4-4"
                                                        />
                                                    </svg>
                                                </div>
                                                {#if !$newOfferMeetingDetailForm.employees[i].status}
                                                    <StepperFailStatement />
                                                {:else}
                                                    <CustomTextField
                                                        disabled={true}
                                                        id="applicantId"
                                                        label="Nombor Kakitangan"
                                                        bind:val={$newOfferApproverResultForm
                                                            .employees[i]
                                                            .employeeNumber}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={true}
                                                        id="applicantName"
                                                        label="Nama Kakitangan"
                                                        bind:val={$newOfferApproverResultForm
                                                            .employees[i]
                                                            .employeeName}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={true}
                                                        id="approverRemark"
                                                        label="Tindakan/Ulasan"
                                                        bind:val={$newOfferApproverResultForm
                                                            .employees[i]
                                                            .remarks}
                                                    ></CustomTextField>

                                                    <CustomRadioBoolean
                                                        disabled={true}
                                                        id="approverIsApproved"
                                                        options={approveOptions}
                                                        label={'Keputusan'}
                                                        bind:val={$newOfferApproverResultForm
                                                            .employees[i]
                                                            .status}
                                                    ></CustomRadioBoolean>
                                                {/if}
                                            </AccordionItem>
                                        {/each}
                                    </Accordion>
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                            </div>
                        </div>
                    </StepperContentBody>
                </StepperContent>
                {#if data.view.newOfferDetailView.supporter.isReadonly && !$newOfferSupporterResultIsDraft && data.view.newOfferDetailView.approver.isReadonly && !$newOfferApproverResultIsDraft}
                    <StepperContent>
                        <StepperContentHeader title="Tetapan Butiran Surat">
                            {#if (!$newOfferLetterDetailForm.isReadonly || $newOfferLetterDetailIsDraft) && data.roles.isEmploymentSecretaryRole}
                                <TextIconButton
                                    label="Simpan"
                                    type="neutral"
                                    form="newOfferLetterDetailForm"
                                    onClick={() => {
                                        $newOfferLetterDetailForm.isDraft = true;
                                    }}
                                />
                                <TextIconButton
                                    label="Hantar"
                                    type="primary"
                                    form="newOfferLetterDetailForm"
                                    onClick={() => {
                                        $newOfferLetterDetailForm.isDraft = false;
                                    }}
                                />
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <div class="flex w-full flex-col gap-2">
                                <Accordion>
                                    {#each $newOfferLetterDetailForm.employees as _, i}
                                        <AccordionItem
                                            classActive={$newOfferMeetingDetailForm
                                                .employees[i].status &&
                                            $newOfferSupporterResultForm
                                                .employees[i].status &&
                                            $newOfferApproverResultForm
                                                .employees[i].status
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-red-100 text-red-600'}
                                            classInactive={$newOfferMeetingDetailForm
                                                .employees[i].status &&
                                            $newOfferSupporterResultForm
                                                .employees[i].status &&
                                            $newOfferApproverResultForm
                                                .employees[i].status
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-red-100 text-red-600'}
                                            open={i == 0}
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
                                                    {!$newOfferMeetingDetailForm
                                                        .employees[i].status ||
                                                    !$newOfferSupporterResultForm
                                                        .employees[i].status ||
                                                    !$newOfferApproverResultForm
                                                        .employees[i].status
                                                        ? '[DITOLAK]'
                                                        : ''}
                                                    {$newOfferServiceDetailForm
                                                        .employees[i]
                                                        .employeeName} ({$newOfferServiceDetailForm
                                                        .employees[i]
                                                        .employeeNumber})</span
                                                >
                                            </span>
                                            <div slot="arrowup">
                                                <svg
                                                    class="h-3 w-3 {$newOfferMeetingDetailForm
                                                        .employees[i].status &&
                                                    $newOfferSupporterResultForm
                                                        .employees[i].status &&
                                                    $newOfferApproverResultForm
                                                        .employees[i].status
                                                        ? 'text-blue-600'
                                                        : 'text-red-600'}"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 5 5 1 1 5"
                                                    />
                                                </svg>
                                            </div>
                                            <div slot="arrowdown">
                                                <svg
                                                    class="h-3 w-3 {$newOfferMeetingDetailForm
                                                        .employees[i].status &&
                                                    $newOfferSupporterResultForm
                                                        .employees[i].status &&
                                                    $newOfferApproverResultForm
                                                        .employees[i].status
                                                        ? 'text-blue-600'
                                                        : 'text-red-600'}"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </div>
                                            {#if !$newOfferMeetingDetailForm.employees[i].status || !$newOfferSupporterResultForm.employees[i].status || !$newOfferApproverResultForm.employees[i].status}
                                                <StepperFailStatement />
                                            {:else if $newOfferMeetingDetailForm.employees[i].status && $newOfferSupporterResultForm.employees[i].status && $newOfferApproverResultForm.employees[i].status && !$newOfferLetterDetailForm.isReadonly && $newOfferLetterDetailIsDraft}
                                                <form
                                                    id="newOfferLetterDetailForm"
                                                    method="POST"
                                                    use:newOfferLetterDetailFormEnhance
                                                    class="flex w-full flex-col gap-2.5"
                                                >
                                                    <div class="mb-5">
                                                        <b
                                                            class="text-sm text-system-primary"
                                                            >Butiran surat
                                                            (-surat) berkaitan</b
                                                        >
                                                    </div>
                                                    <CustomTextField
                                                        disabled={true}
                                                        id="applicantId"
                                                        label="Nombor Kakitangan"
                                                        bind:val={$newOfferLetterDetailForm
                                                            .employees[i]
                                                            .employeeNumber}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={true}
                                                        id="applicantName"
                                                        label="Nama Kakitangan"
                                                        bind:val={$newOfferLetterDetailForm
                                                            .employees[i]
                                                            .employeeName}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={$newOfferLetterDetailForm.isReadonly &&
                                                            !$newOfferLetterDetailIsDraft}
                                                        id="refNumber"
                                                        label="No. Rujukan Surat"
                                                        bind:val={$newOfferLetterDetailForm
                                                            .employees[i]
                                                            .refNumber}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        type="date"
                                                        disabled={$newOfferLetterDetailForm.isReadonly &&
                                                            !$newOfferLetterDetailIsDraft}
                                                        id="letterDate"
                                                        label={'Tarikh Surat'}
                                                        placeholder="-"
                                                        bind:val={$newOfferLetterDetailForm
                                                            .employees[i].date}
                                                    ></CustomTextField>

                                                    <CustomTextField
                                                        disabled={$newOfferLetterDetailForm.isReadonly &&
                                                            !$newOfferLetterDetailIsDraft}
                                                        id="slogan"
                                                        label="Slogan Surat"
                                                        bind:val={$newOfferLetterDetailForm
                                                            .employees[i]
                                                            .slogan}
                                                    ></CustomTextField>
                                                </form>
                                            {:else if $newOfferMeetingDetailForm.employees[i].status && $newOfferSupporterResultForm.employees[i].status && $newOfferApproverResultForm.employees[i].status && $newOfferLetterDetailForm.isReadonly && !$newOfferLetterDetailIsDraft}
                                                <div
                                                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                                                >
                                                    <p
                                                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                                                    >
                                                        Dokumen (-dokumen)
                                                        berkaitan:
                                                    </p>

                                                    <div
                                                        class="flex w-full flex-row items-center justify-between"
                                                    >
                                                        <label
                                                            for=""
                                                            class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                                            >1.</label
                                                        >
                                                        <a
                                                            href={$newOfferLetterDetailForm
                                                                .employees[i]
                                                                .file.base64}
                                                            download={$newOfferLetterDetailForm
                                                                .employees[i]
                                                                .file.name}
                                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                                            >{$newOfferLetterDetailForm
                                                                .employees[i]
                                                                .file.name}</a
                                                        >
                                                    </div>
                                                </div>
                                            {/if}
                                        </AccordionItem>
                                    {/each}
                                </Accordion>
                            </div>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
        {/if}
    {/if}
</Stepper>

<Toaster />
