<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import {
        _submitVerifyMeetingResultDetailForm,
        _submitUpdateMeetingDetailForm,
        _updateTable,
        _submitUpdateMeetingResultForm,
        _submitUpdatePromotionMeetingResultForm,
        _submitUpdateEmployeePlacementMeetingResultForm,
        _submitUpdatePlacementAmendmentApplicationResultForm,
        _submitUpdateActingResultForm,
        _submitUpdateMainPromotionMeetingResultForm,
        _submitUpdateMainPromotionMeetingResultDetailForm,
        _submitUpdateMainActingEmployeeDetailForm,
        _submitMainSupporterAndApproverForm,
        _submitSupporterResultForm,
        _submitApproverResultForm,
        _submitDirectorResultForm,
        _submitEmployeeNeedPlacementAmendmentForm,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { goto } from '$app/navigation';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';
    import { superForm } from 'sveltekit-superforms/client';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import {
        _verifyMeetingResultDetailSchema,
        _updateMeetingDetailSchema,
        _updateMeetingResultSchema,
        _updatePromotionMeetingResultSchema,
        _updateEmployeePlacementMeetingResultSchema,
        _updatePlacementAmendmentApplicationResultSchema,
        _updateActingResultSchema,
        _mainUpdatePromotionMeetingResultSchema,
        _mainUpdatePromotionMeetingResultDetailSchema,
        _mainUpdateActingEmployeeDetailSchema,
        _mainSupporterAndApproverSchema,
        _supporterResultSchema,
        _approverResultSchema,
        _directorResultSchema,
        _placementAmendmentApplication,
    } from '$lib/schemas/mypsm/employment/acting/acting-schemas';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import { Toaster } from 'svelte-french-toast';

    let currentRoleCode: string | null;
    let employeeRoleCode: string = UserRoleConstant.kakitangan.code;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;
    let supporterRoleCode: string = UserRoleConstant.penyokong.code;
    let approverRoleCode: string = UserRoleConstant.pelulus.code;
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;

    currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    let isNotUrusSetia: boolean =
        currentRoleCode !== secretaryRoleCode ? true : false;

    let stepperIndex: number = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    let detailOpen: boolean = false;
    let param: CommonListRequestDTO = data.param;
    let table: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
        selectedData: [],
    };

    let fifthStepperTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList2 ?? [],
        selectedData: [],
    };

    let actingResultTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList3 ?? [],
        selectedData: [],
    };

    let selectedStaffTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: [],
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            console.log(value);
            table.data = value.response?.dataList ?? [];
            table.meta = value.response?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
    $: selectedStaffTable.data = table.selectedData ?? [];

    let dropdownOptions: DropdownDTO[] = [
        {
            name: 'Kim Jong Kook',
            value: 'Kim Jong Kook',
        },
        {
            name: 'Yoo Jae Suk',
            value: 'Yoo Jae Suk',
        },
    ];

    let meetingResultOption: DropdownDTO[] = [
        { value: 'Berjaya', name: 'Berjaya' },
        { value: 'Tidak Berjaya', name: 'Tidak Berjaya' },
    ];
    let isNeedPlacementAmendmentOption: DropdownDTO[] = [
        { value: true, name: 'Ya' },
        { value: false, name: 'Tidak' },
    ];
    let supporterResultOption: RadioDTO[] = [
        {
            value: true,
            name: 'Sokong',
        },
        {
            value: false,
            name: 'Tidak Sokong',
        },
    ];
    let promotionMeetingResultOptions: RadioDTO[] = [
        {
            value: true,
            name: 'Lulus',
        },
        {
            value: false,
            name: 'Tidak Lulus',
        },
    ];
    let directorResultOption: RadioDTO[] = [
        { value: true, name: 'Peraku' },
        { value: false, name: 'Tidak Peraku' },
    ];
    let dropdownVal: string;

    // ======================= validation
    let result: string | undefined = 'Pending';
    const {
        form: verifyMeetingResultDetailForm,
        errors: verifyMeetingResultDetailError,
        enhance: verifyMeetingResultDetailEnhance,
    } = superForm(data.verifyMeetingResultDetailForm, {
        SPA: true,
        validators: _verifyMeetingResultDetailSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitVerifyMeetingResultDetailForm(
                $verifyMeetingResultDetailForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: directorResultForm,
        errors: directorResultError,
        enhance: directorResultEnhance,
    } = superForm(data.directorResultForm, {
        SPA: true,
        validators: _directorResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitDirectorResultForm($directorResultForm).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: updateMeetingDetailForm,
        errors: updateMeetingDetailErrors,
        enhance: updateMeetingDetailEnhance,
    } = superForm(data.updateMeetingDetailForm, {
        SPA: true,
        id: 'updateMeetingDetailForm',
        validators: _updateMeetingDetailSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdateMeetingDetailForm($updateMeetingDetailForm).then(
                (value) => {
                    result = value?.result;
                    if (result == 'success') {
                        getLoginSuccessToast();
                    } else {
                        getErrorToast();
                    }
                },
            );
        },
    });
    const {
        form: updateMeetingResultForm,
        errors: updateMeetingResultError,
        enhance: updateMeetingResultEnhance,
    } = superForm(data.updateMeetingResultForm, {
        SPA: true,
        id: 'updateMeetingResultForm',
        validators: _updateMeetingResultSchema,
        onUpdate(event) {},
        onSubmit() {
            if (data.actingType == '1_54') {
                $updateMeetingResultForm.interviewCenter = null;
                $updateMeetingResultForm.interviewDate = null;
                $updateMeetingResultForm.panelName = null;
            } else if (data.actingType == 'flexi_41') {
                $updateMeetingResultForm.totalMark = null;
            }
            _submitUpdateMeetingResultForm($updateMeetingResultForm).then(
                (value) => {
                    result = value?.result;
                    if (result == 'success') {
                        getLoginSuccessToast();
                    } else {
                        getErrorToast();
                    }
                },
            );
        },
    });
    const {
        form: updatePromotionMeetingResultForm,
        errors: updatePromotionMeetingResultError,
        enhance: updatePromotionMeetingResultEnhance,
    } = superForm(data.updatePromotionMeetingResultForm, {
        SPA: true,
        id: 'updatePromotionMeetingResultForm',
        validators: _updatePromotionMeetingResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdatePromotionMeetingResultForm(
                $updatePromotionMeetingResultForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: updateEmployeePlacementMeetingResultForm,
        errors: updateEmployeePlacementMeetingResultError,
        enhance: updateEmployeePlacementMeetingResultEnhance,
    } = superForm(data.updateEmployeePlacementMeetingResultForm, {
        SPA: true,
        id: 'updateEmployeePlacementMeetingResultForm',
        validators: _updateEmployeePlacementMeetingResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdateEmployeePlacementMeetingResultForm(
                $updateEmployeePlacementMeetingResultForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: updatePlacementAmendmentApplicationResultForm,
        errors: updatePlacementAmendmentApplicationResultError,
        enhance: updatePlacementAmendmentApplicationResultEnhance,
    } = superForm(data.updatePlacementAmendmentApplicationResultForm, {
        SPA: true,
        id: 'updatePlacementAmendmentApplicationResultForm',
        validators: _updatePlacementAmendmentApplicationResultSchema,
        onUpdate(event) {},
        onSubmit() {
            if (data.actingType == '1_54') {
                $updatePlacementAmendmentApplicationResultForm.originalPlacementDate =
                    null;
                $updatePlacementAmendmentApplicationResultForm.placementRequestedAmendmentDate =
                    null;
                $updatePlacementAmendmentApplicationResultForm.placementAmendmentReason =
                    null;
                $updatePlacementAmendmentApplicationResultForm.approverName =
                    null;
            } else if (data.actingType == 'flexi_41') {
                $updatePlacementAmendmentApplicationResultForm.placementAmendmentResult =
                    null;
                $updatePlacementAmendmentApplicationResultForm.approvedNewReportingDate =
                    null;
                $updatePlacementAmendmentApplicationResultForm.approvedRequestedPlacementAmendment =
                    null;
            }
            _submitUpdatePlacementAmendmentApplicationResultForm(
                $updatePlacementAmendmentApplicationResultForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: updateActingResultForm,
        errors: updateActingResultError,
        enhance: updateActingResultEnhance,
    } = superForm(data.updateActingResultForm, {
        SPA: true,
        id: 'updateActingResultForm',
        validators: _updateActingResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdateActingResultForm($updateActingResultForm).then(
                (value) => {
                    result = value?.result;
                    if (result == 'success') {
                        getLoginSuccessToast();
                    } else {
                        getErrorToast();
                    }
                },
            );
        },
    });
    const {
        form: supporterResultForm,
        errors: supporterResultError,
        enhance: supporterResultEnhance,
    } = superForm(data.supporterResultForm, {
        SPA: true,
        id: 'supporterResultForm',
        validators: _supporterResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitSupporterResultForm($supporterResultForm).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: approverResultForm,
        errors: approverResultError,
        enhance: approverResultEnhance,
    } = superForm(data.approverResultForm, {
        SPA: true,
        id: 'approverResultForm',
        validators: _approverResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitApproverResultForm($approverResultForm).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });

    // =============== gred utama validation
    const {
        form: updateMainPromotionMeetingResultForm,
        errors: updateMainPromotionMeetingResultError,
        enhance: updateMainPromotionMeetingResultEnhance,
    } = superForm(data.updateMainPromotionMeetingResultForm, {
        SPA: true,
        id: 'updateMainPromotionMeetingResultForm',
        validators: _mainUpdatePromotionMeetingResultSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdateMainPromotionMeetingResultForm(
                $updateMainPromotionMeetingResultForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: updateMainPromotionMeetingResultDetailForm,
        errors: updateMainPromotionMeetingResultDetailError,
        enhance: updateMainPromotionMeetingResultDetailEnhance,
    } = superForm(data.updateMainPromotionMeetingResultDetailForm, {
        SPA: true,
        id: 'updateMainPromotionMeetingResultDetailForm',
        validators: _mainUpdatePromotionMeetingResultDetailSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdateMainPromotionMeetingResultDetailForm(
                $updateMainPromotionMeetingResultDetailForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: updateMainActingEmployeeDetailForm,
        errors: updateMainActingEmployeeDetailError,
        enhance: updateMainActingEmployeeDetailEnhance,
    } = superForm(data.updateMainActingEmployeeDetailForm, {
        SPA: true,
        id: 'updateMainActingEmployeeDetailForm',
        validators: _mainUpdateActingEmployeeDetailSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitUpdateMainActingEmployeeDetailForm(
                $updateMainActingEmployeeDetailForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    const {
        form: mainSupporterAndApproverForm,
        errors: mainSupporterAndApproverError,
        enhance: mainSupporterAndApproverEnhance,
    } = superForm(data.mainSupporterAndApproverForm, {
        SPA: true,
        id: 'mainSupporterAndApproverForm',
        validators: _mainSupporterAndApproverSchema,
        onUpdate(event) {},
        onSubmit() {
            _submitMainSupporterAndApproverForm(
                $mainSupporterAndApproverForm,
            ).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });

    // ======================= kakitangan form
    const {
        form: employeeNeedPlacementAmendmentForm,
        errors: employeeNeedPlacementAmendmentError,
        enhance: employeeNeedPlacementAmendmentEnhance,
    } = superForm(data.employeeNeedPlacementAmendmentForm, {
        SPA: true,
        id: 'employeeNeedPlacementAmendmentForm',
        validators: _placementAmendmentApplication,
        onUpdate(event) {},
        taintedMessage: false,
        dataType: 'json',
        invalidateAll: true,
        multipleSubmits: 'prevent',
        onSubmit(formData) {
            _submitEmployeeNeedPlacementAmendmentForm(formData.formData).then(
                (value) => {
                    result = value?.result;
                    if (result == 'success') {
                        getLoginSuccessToast();
                    } else {
                        getErrorToast();
                    }
                },
            );
        },
    });

    // file upload functions
    const handleOnInput = (e: Event) => {
        $employeeNeedPlacementAmendmentForm.document = Array.from(
            (e.currentTarget as HTMLInputElement).files ?? [],
        );
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId="PMGK-1234"
        dataStatus="Sedang Diproses"
    >
        <!-- For Gred Utama (New) Only -->
        {#if currentRoleCode === secretaryRoleCode && data.actingType === 'gred_utama'}
            <StepperContent>
                <StepperContentHeader title="Pemilihan Calon">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody paddingClass="py-2.5">
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 border-b px-2.5 pb-5"
                    >
                        <CustomTable
                            title="Senarai Kakitangan untuk Pemilihan"
                            enableAdd
                            onUpdate={_search}
                            bind:tableData={table}
                        />
                    </div>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2.5 pb-10"
                    >
                        <CustomTable
                            title="Senarai Calon yang Dipilih"
                            bind:tableData={selectedStaffTable}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Perakuan Pemangkuan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex h-full w-full flex-col gap-2.5 px-2">
                        <ContentHeader
                            title="Tindakan: Tetapkan untuk semua kakitangan yang berkaitan."
                            borderClass="border-none"
                        >
                            <TextIconButton
                                type="primary"
                                label="Peraku"
                                icon="check"
                                onClick={() => {}}
                            />
                            <TextIconButton
                                type="danger"
                                label="Tidak Peraku"
                                icon="cancel"
                                onClick={() => {}}
                            />
                        </ContentHeader>
                        <CustomTable
                            title="Senarai Kakitangan Yang Dipilih"
                            bind:tableData={selectedStaffTable}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Borang Berkaitan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <DownloadAttachment></DownloadAttachment>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label={!detailOpen ? 'Kembali' : 'Batal'}
                        icon={!detailOpen ? 'previous' : 'block'}
                        type="neutral"
                        onClick={() => {
                            !detailOpen ? goPrevious() : (detailOpen = false);
                        }}
                    />
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        type="primary"
                        form={!detailOpen
                            ? 'updateMainPromotionMeetingResultForm'
                            : 'updateMainPromotionMeetingResultDetailForm'}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <ContentHeader
                            title="Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 border-b pb-5"
                            id="updateMainPromotionMeetingResultForm"
                            method="POST"
                            use:updateMainPromotionMeetingResultEnhance
                        >
                            <CustomSelectField
                                label="Name Mesyuarat"
                                id="meetingName"
                                errors={$updateMainPromotionMeetingResultError.meetingName}
                                bind:val={$updateMainPromotionMeetingResultForm.meetingName}
                                options={data.selectionOptions
                                    .meetingNameLookup}
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                type="date"
                                errors={$updateMainPromotionMeetingResultError.meetingDate}
                                bind:val={$updateMainPromotionMeetingResultForm.meetingDate}
                            />
                            <CustomSelectField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                options={data.selectionOptions.positionLookup}
                                errors={$updateMainPromotionMeetingResultError.actingPosition}
                                bind:val={$updateMainPromotionMeetingResultForm.actingPosition}
                            />
                            <CustomSelectField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                options={data.selectionOptions.gradeLookup}
                                errors={$updateMainPromotionMeetingResultError.actingGrade}
                                bind:val={$updateMainPromotionMeetingResultForm.actingGrade}
                            />
                            <CustomSelectField
                                label="Penempatan"
                                id="placement"
                                errors={$updateMainPromotionMeetingResultError.placement}
                                bind:val={$updateMainPromotionMeetingResultForm.placement}
                                options={data.selectionOptions.placementLookup}
                            />
                            <CustomTextField
                                label="Tarikh Kuatkuasa Lapor Diri"
                                id="reportingDate"
                                type="date"
                                errors={$updateMainPromotionMeetingResultError.reportingDate}
                                bind:val={$updateMainPromotionMeetingResultForm.reportingDate}
                            />
                            <CustomTextField
                                label="No. Rujukan Surat"
                                id="referenceNameLetter"
                                type="text"
                                errors={$updateMainPromotionMeetingResultError.referenceNameLetter}
                                bind:val={$updateMainPromotionMeetingResultForm.referenceNameLetter}
                            />
                            <CustomTextField
                                label="Tarikh Surat"
                                id="letterDate"
                                type="date"
                                errors={$updateMainPromotionMeetingResultError.letterDate}
                                bind:val={$updateMainPromotionMeetingResultForm.letterDate}
                            />
                            <CustomTextField
                                label="Tajuk Surat"
                                id="letterTitle"
                                type="text"
                                errors={$updateMainPromotionMeetingResultError.letterTitle}
                                bind:val={$updateMainPromotionMeetingResultForm.letterTitle}
                            />
                        </form>
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 px-2.5 pb-10"
                        >
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                                borderClass="border-none"
                            />
                            <CustomTable
                                title=""
                                enableDetail
                                detailActions={() => {
                                    detailOpen = true;
                                }}
                                bind:tableData={table}
                            />
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start px-2.5 pb-10"
                            id="updateMainPromotionMeetingResultDetailForm"
                            method="POST"
                            use:updateMainPromotionMeetingResultDetailEnhance
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                disabled
                                id="employeeNumber"
                                type="text"
                                val="001023"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                disabled
                                type="text"
                                val="Ismail bin Ramdan"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                disabled
                                id="identificationNumber"
                                type="text"
                                val="890701-13-5667"
                            />
                            <CustomTextField
                                label="Program"
                                disabled
                                id="program"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Skim"
                                disabled
                                id="skim"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Gred"
                                disabled
                                id="grade"
                                type="text"
                                val="F41"
                            />
                            <CustomTextField
                                label="Nama Jawatan"
                                disabled
                                id="positionName"
                                type="text"
                                val="F41 - Pegawai Teknologi Maklumat"
                            />
                            <CustomTextField
                                label="Penempatan Sekarang"
                                disabled
                                id="currentPlacement"
                                type="text"
                                val="00105 - Bhgn. Teknologi Maklumat"
                            />
                            <CustomTextField
                                label="Kumpulan"
                                disabled
                                id="group"
                                type="text"
                                val="PP1 - Pengurusan dan Professional - A"
                            />
                            <CustomTextField
                                label="Akuan Pinjaman Pendidikan / Institusi"
                                disabled
                                id="loanDeclaration"
                                type="text"
                                val="-"
                            />
                            <ContentHeader
                                title="Keputusan Mesyuarat Kenaikan Pangkat"
                                borderClass="border-none"
                            />
                            <CustomRadioBoolean
                                id="promotionMeetingResult"
                                label="Keputusan"
                                disabled={false}
                                bind:val={$updateMainPromotionMeetingResultDetailForm.promotionMeetingResult}
                                errors={$updateMainPromotionMeetingResultDetailError.promotionMeetingResult}
                                options={promotionMeetingResultOptions}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Maklumat Pemangkuan Kakitangan"
                >
                    <TextIconButton
                        label={!detailOpen ? 'Kembali' : 'Batal'}
                        icon={!detailOpen ? 'previous' : 'block'}
                        type="neutral"
                        onClick={() => {
                            !detailOpen ? goPrevious() : (detailOpen = false);
                        }}
                    />
                    <TextIconButton
                        label={!detailOpen ? 'Seterusnya' : 'Simpan'}
                        icon={!detailOpen ? 'next' : 'check'}
                        type="primary"
                        onClick={() => {
                            !detailOpen ? goNext() : {};
                        }}
                        form={!detailOpen
                            ? ''
                            : 'updateMainActingEmployeeDetailForm'}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <CustomTable
                            title="Senarai Calon"
                            enableDetail
                            detailActions={() => (detailOpen = true)}
                            bind:tableData={fifthStepperTable}
                        />
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start px-2.5 pb-10"
                            id="updateMainActingEmployeeDetailForm"
                            method="POST"
                            use:updateMainActingEmployeeDetailEnhance
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                disabled
                                id="employeeNumber"
                                type="text"
                                val="001023"
                            />
                            <CustomTextField
                                label="Nama"
                                disabled
                                id="employeeName"
                                type="text"
                                val="Rosli bin Ramdan"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                disabled
                                id="identificationNumber"
                                type="text"
                                val="890701-13-2215"
                            />
                            <ContentHeader
                                title="Butiran Pemangkuan"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                >Sekiranya tidak lulus, jawatan dan gred akan
                                dikembalikan ke butiran asal.</span
                            >
                            <CustomSelectField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                options={data.selectionOptions.positionLookup}
                                errors={$updateMainActingEmployeeDetailError.actingPosition}
                                bind:val={$updateMainActingEmployeeDetailForm.actingPosition}
                            />
                            <CustomSelectField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                options={data.selectionOptions.gradeLookup}
                                errors={$updateMainActingEmployeeDetailError.actingGrade}
                                bind:val={$updateMainActingEmployeeDetailForm.actingGrade}
                            />
                            <CustomSelectField
                                label="Penempatan Baru"
                                id="newPlacement"
                                options={data.selectionOptions.placementLookup}
                                errors={$updateMainActingEmployeeDetailError.newPlacement}
                                bind:val={$updateMainActingEmployeeDetailForm.newPlacement}
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportingDate"
                                type="date"
                                errors={$updateMainActingEmployeeDetailError.reportingDate}
                                bind:val={$updateMainActingEmployeeDetailForm.reportingDate}
                            />
                            <ContentHeader
                                title="Pengesah Keputusan"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Penyokong"
                                id="supporterName"
                                errors={$updateMainActingEmployeeDetailError.supporterName}
                                bind:val={$updateMainActingEmployeeDetailForm.supporterName}
                                options={meetingResultOption}
                            />
                            <CustomSelectField
                                label="Nama Pelulus"
                                id="approverName"
                                errors={$updateMainActingEmployeeDetailError.approverName}
                                bind:val={$updateMainActingEmployeeDetailForm.approverName}
                                options={meetingResultOption}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Penyokong & Pelulus">
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        form="mainSupporterAndApproverForm"
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start px-2.5 pb-10"
                        id="mainSupporterAndApproverForm"
                        method="POST"
                        use:mainSupporterAndApproverEnhance
                    >
                        <CustomTextField
                            label="Nama Penyokong"
                            id="supporterName"
                            type="text"
                            errors={$mainSupporterAndApproverError.supporterName}
                            bind:val={$mainSupporterAndApproverForm.supporterName}
                        />
                        <CustomTextField
                            label="Nama Pelulus"
                            id="approverName"
                            type="text"
                            errors={$mainSupporterAndApproverError.approverName}
                            bind:val={$mainSupporterAndApproverForm.approverName}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>
            <!-- End Of For Gred Utama (New) Only -->

            <!-- All involved role except for kakitangan -->
        {:else if currentRoleCode !== employeeRoleCode}
            <!-- Views will vary based on roles -->
            <StepperContent>
                <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        type="primary"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <FilterCard onSearch={_search}>
                            <FilterTextField
                                bind:inputValue={table.param.filter.grade}
                                label="Gred"
                            ></FilterTextField>
                            <FilterTextField
                                bind:inputValue={table.param.filter.position}
                                label="Jawatan"
                            ></FilterTextField>
                            <FilterTextField
                                bind:inputValue={table.param.filter.name}
                                label="Nama"
                            ></FilterTextField>
                            <FilterTextField
                                bind:inputValue={table.param.filter
                                    .identityCard}
                                label="No. Kad Pengenalan"
                            ></FilterTextField>
                        </FilterCard>
                        <CustomTable
                            title="Senarai Kakitangan Yang Dipilih"
                            bind:tableData={selectedStaffTable}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
                >
                    <TextIconButton
                        label="Kembali"
                        icon="previous"
                        type="neutral"
                        onClick={() => goPrevious()}
                    />
                    {#if currentRoleCode !== approverRoleCode && currentRoleCode !== supporterRoleCode}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            form={currentRoleCode !== depDirectorRoleCode &&
                            currentRoleCode !== stateDirectorRoleCode
                                ? 'verifyMeetingResultDetailForm'
                                : 'directorResultForm'}
                        />
                    {:else}
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <!-- Director Only -->
                    {#if currentRoleCode === stateDirectorRoleCode || currentRoleCode === depDirectorRoleCode}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="directorResultForm"
                            method="POST"
                            use:directorResultEnhance
                        >
                            <ContentHeader
                                title="Keputusan daripada Pengarah Bahagian atau Negeri"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.
                            </span>
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="directorRemark"
                                type="text"
                                errors={$directorResultError.directorRemark}
                                bind:val={$directorResultForm.directorRemark}
                            />
                            <CustomRadioBoolean
                                id="directorResult"
                                label="Keputusan"
                                disabled={currentRoleCode !==
                                    depDirectorRoleCode &&
                                currentRoleCode !== stateDirectorRoleCode
                                    ? true
                                    : false}
                                bind:val={$directorResultForm.directorResult}
                                errors={$directorResultError.directorResult}
                                options={directorResultOption}
                            />
                        </form>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="verifyMeetingResultDetailForm"
                            method="POST"
                            use:verifyMeetingResultDetailEnhance
                        >
                            <!-- Urus Setia and Penyokong POV-->
                            <ContentHeader
                                title="Maklumat Peraku Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Nama Urus Setia Integriti"
                                id="integritySecretaryName"
                                errors={$verifyMeetingResultDetailError.integritySecretaryName}
                                bind:val={$verifyMeetingResultDetailForm.integritySecretaryName}
                                options={dropdownOptions}
                            />

                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Nama Pengarah Bahagian / Negeri"
                                id="directorName"
                                errors={$verifyMeetingResultDetailError.directorName}
                                bind:val={$verifyMeetingResultDetailForm.directorName}
                                options={dropdownOptions}
                            />

                            <ContentHeader
                                title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <FilterCard onSearch={_search}>
                                <FilterTextField
                                    bind:inputValue={table.param.filter.grade}
                                    label="Gred"
                                ></FilterTextField>
                                <FilterTextField
                                    bind:inputValue={table.param.filter
                                        .position}
                                    label="Jawatan"
                                ></FilterTextField>
                                <FilterTextField
                                    bind:inputValue={table.param.filter.name}
                                    label="Nama"
                                ></FilterTextField>
                                <FilterTextField
                                    bind:inputValue={table.param.filter
                                        .identityCard}
                                    label="No. Kad Pengenalan"
                                ></FilterTextField>
                            </FilterCard>
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua calon yang berkaitan."
                                borderClass="border-none"
                            >
                                <TextIconButton
                                    type="danger"
                                    label="Tidak Lulus"
                                    icon="cancel"
                                    onClick={() => {}}
                                />
                                <TextIconButton
                                    type="primary"
                                    label="Lulus"
                                    icon="check"
                                    onClick={() => {}}
                                />
                            </ContentHeader>
                            <CustomTable
                                onUpdate={_search}
                                title=""
                                bind:tableData={table}
                                enableAdd
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            {#if currentRoleCode !== depDirectorRoleCode && currentRoleCode !== stateDirectorRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label={isNotUrusSetia ? 'Seterusnya' : 'Simpan'}
                            icon={isNotUrusSetia ? 'next' : 'check'}
                            type="primary"
                            form={isNotUrusSetia
                                ? ''
                                : 'updateMeetingDetailForm'}
                            onClick={() => {
                                isNotUrusSetia ? goNext() : {};
                            }}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateMeetingDetailForm"
                            method="POST"
                            use:updateMeetingDetailEnhance
                        >
                            <ContentHeader
                                title="Butiran Tawaran dan Temuduga"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Nama Mesyuarat"
                                id="meetingName"
                                errors={$updateMeetingDetailErrors.meetingName}
                                options={data.selectionOptions
                                    .meetingNameLookup}
                                bind:val={$updateMeetingDetailForm.meetingName}
                            />
                            <CustomTextField
                                disabled={isNotUrusSetia}
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                errors={$updateMeetingDetailErrors.meetingDate}
                                type="date"
                                bind:val={$updateMeetingDetailForm.meetingDate}
                            />
                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Gred"
                                id="grade"
                                errors={$updateMeetingDetailErrors.grade}
                                options={data.selectionOptions.gradeLookup}
                                bind:val={$updateMeetingDetailForm.grade}
                            />
                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Jawatan"
                                id="position"
                                errors={$updateMeetingDetailErrors.position}
                                options={data.selectionOptions.positionLookup}
                                bind:val={$updateMeetingDetailForm.position}
                            />
                            <CustomTextField
                                disabled={isNotUrusSetia}
                                label="Tarikh Temuduga"
                                id="interviewDate"
                                errors={$updateMeetingDetailErrors.interviewDate}
                                bind:val={$updateMeetingDetailForm.interviewDate}
                                type="date"
                            />
                            <CustomTextField
                                disabled={isNotUrusSetia}
                                label="Masa Temuduga"
                                id="meetingTime"
                                errors={$updateMeetingDetailErrors.meetingTime}
                                type="text"
                                val="10.00pagi - 11.00pagi"
                            />
                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Negeri"
                                id="state"
                                errors={$updateMeetingDetailErrors.state}
                                options={data.selectionOptions.stateLookup}
                                bind:val={$updateMeetingDetailForm.state}
                            />
                            <CustomSelectField
                                disabled={isNotUrusSetia}
                                label="Pusat Temuduga"
                                id="interviewCenter"
                                errors={$updateMeetingDetailErrors.interviewCenter}
                                bind:val={$updateMeetingDetailForm.interviewCenter}
                                options={data.selectionOptions.placementLookup}
                            />

                            <ContentHeader
                                title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomTable title="" bind:tableData={table} />
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                        {#if !detailOpen}
                            <TextIconButton
                                label="Kembali"
                                icon="previous"
                                type="neutral"
                                onClick={() => goPrevious()}
                            />
                            {#if currentRoleCode !== approverRoleCode && currentRoleCode !== supporterRoleCode}
                                <TextIconButton
                                    label={data.actingType == '1_54'
                                        ? 'Simpan'
                                        : 'Seterusnya'}
                                    icon={data.actingType == '1_54'
                                        ? 'check'
                                        : 'next'}
                                    type="primary"
                                    onClick={() =>
                                        data.actingType == '1_54'
                                            ? {}
                                            : goNext()}
                                    form={data.actingType == '1_54'
                                        ? 'updateMeetingResultForm'
                                        : ''}
                                />
                            {:else}
                                <TextIconButton
                                    label="Seterusnya"
                                    icon="next"
                                    type="primary"
                                    onClick={() => goNext()}
                                />
                            {/if}
                        {:else}
                            <TextIconButton
                                label="Batal"
                                icon="block"
                                type="neutral"
                                onClick={() => (detailOpen = false)}
                            />
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                type="primary"
                                form="updateMeetingResultForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateMeetingResultForm"
                            method="POST"
                            use:updateMeetingResultEnhance
                        >
                            {#if data.actingType === '1_54'}
                                <ContentHeader
                                    title="Maklumat Markah Keseluruhan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    disabled={isNotUrusSetia}
                                    label="Markah Keseluruhan"
                                    id="totalMark"
                                    type="text"
                                    errors={$updateMeetingResultError.totalMark}
                                    placeholder="83%"
                                    bind:val={$updateMeetingResultForm.totalMark}
                                />
                                <FilterCard onSearch={_search}>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .grade}
                                        label="Gred"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .position}
                                        label="Jawatan"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .name}
                                        label="Nama"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .identityCard}
                                        label="No. Kad Pengenalan"
                                    ></FilterTextField>
                                </FilterCard>
                                <ContentHeader
                                    title="Tindakan: Tetapkan untuk semua kakitangan berkaitan"
                                    borderClass="border-none"
                                />
                                <CustomTable title="" bind:tableData={table} />
                            {:else if !detailOpen}
                                <FilterCard onSearch={_search}>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .grade}
                                        label="Gred"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .position}
                                        label="Jawatan"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .name}
                                        label="Nama"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .identityCard}
                                        label="No. Kad Pengenalan"
                                    ></FilterTextField>
                                </FilterCard>
                                <CustomTable
                                    title="Senarai Calon Yang Terpilih"
                                    enableDetail
                                    detailActions={() => (detailOpen = true)}
                                    bind:tableData={table}
                                />
                            {:else}
                                <ContentHeader
                                    title="Maklumat Calon"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    type="text"
                                    val="6764"
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    type="text"
                                    val="Gareth Bale"
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identificationNumber"
                                    type="text"
                                    val="991122-13-4749"
                                />
                                <ContentHeader
                                    title="Keputusan Temuduga"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tarikh Temuduga"
                                    id="interviewDate"
                                    type="date"
                                    bind:val={$updateMeetingResultForm.interviewDate}
                                    errors={$updateMeetingResultError.interviewDate}
                                />
                                <CustomSelectField
                                    label="Pusat Temuduga"
                                    id="interviewCenter"
                                    options={data.selectionOptions
                                        .placementLookup}
                                    bind:val={$updateMeetingResultForm.interviewCenter}
                                    errors={$updateMeetingResultError.interviewCenter}
                                />
                                <CustomTextField
                                    label="Nama Panel"
                                    id="panelName"
                                    type="text"
                                    bind:val={$updateMeetingResultForm.panelName}
                                    errors={$updateMeetingResultError.panelName}
                                />
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                    >
                        <TextIconButton
                            label={!detailOpen ? 'Kembali' : 'Batal'}
                            icon={!detailOpen ? 'previous' : 'block'}
                            type="neutral"
                            onClick={() => {
                                !detailOpen
                                    ? goPrevious()
                                    : (detailOpen = false);
                            }}
                        />
                        {#if isNotUrusSetia}
                        <TextIconButton
                            label={!detailOpen ? 'Seterusnya' : 'Simpan'}
                            icon={!detailOpen ? 'next' : 'check'}
                            type="primary"
                            onClick={() => {
                                !detailOpen ? goNext() : {};
                            }}
                            form={!detailOpen
                                ? ''
                                : 'updatePromotionMeetingResultForm'}
                        />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updatePromotionMeetingResultForm"
                            method="POST"
                            use:updatePromotionMeetingResultEnhance
                        >
                            {#if !detailOpen}
                                {#if data.actingType === '1_54'}
                                    <CustomTextField
                                        label="Nama Mesyuarat"
                                        disabled
                                        id="meetingName"
                                        type="text"
                                        val="Mesyuarat 1/2"
                                    />
                                    <CustomTextField
                                        label="Tarikh Mesyuarat"
                                        disabled
                                        id="meetingDate"
                                        type="text"
                                        val="21/02/2024"
                                    />
                                    <CustomTextField
                                        label="Keputusan Mesyuarat"
                                        disabled
                                        id="meetingResult"
                                        type="text"
                                        val="Berjaya"
                                    />
                                    <CustomTextField
                                        label="Jawatan Pemangkuan"
                                        disabled
                                        id="actingPosition"
                                        type="text"
                                        val="Setiausaha Pejabat"
                                    />
                                    <CustomTextField
                                        label="Gred Pemangkuan"
                                        disabled
                                        id="actingGrade"
                                        type="text"
                                        val="N32"
                                    />
                                {/if}
                                <FilterCard onSearch={_search}>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .grade}
                                        label="Gred"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .position}
                                        label="Jawatan"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .name}
                                        label="Nama"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .identityCard}
                                        label="No. Kad Pengenalan"
                                    ></FilterTextField>
                                </FilterCard>
                                <CustomTable
                                    title="Senarai Calon Yang Terpilih"
                                    enableDetail
                                    detailActions={() => (detailOpen = true)}
                                    bind:tableData={table}
                                />
                            {:else}
                                <ContentHeader
                                    title="Maklumat Calon"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    type="text"
                                    val="4701"
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    type="text"
                                    val="Cristiano Ronaldo"
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identificationNumber"
                                    type="text"
                                    val="901222-13-6445"
                                />
                                <ContentHeader
                                    title="Keputusan Mesyuarat"
                                    borderClass="border-none"
                                />
                                <CustomSelectField
                                disabled={isNotUrusSetia}
                                    label="Keputusan"
                                    id="promotionMeetingResult"
                                    errors={$updatePromotionMeetingResultError.promotionMeetingResult}
                                    bind:val={$updatePromotionMeetingResultForm.promotionMeetingResult}
                                    options={meetingResultOption}
                                />
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                    >
                        <TextIconButton
                            label={!detailOpen ? 'Kembali' : 'Batal'}
                            icon={!detailOpen ? 'previous' : 'block'}
                            type="neutral"
                            onClick={() => {
                                !detailOpen
                                    ? goPrevious()
                                    : (detailOpen = false);
                            }}
                        />
                        {#if !isNotUrusSetia}
                        <TextIconButton
                            label={!detailOpen ? 'Seterusnya' : 'Simpan'}
                            icon={!detailOpen ? 'next' : 'check'}
                            type="primary"
                            onClick={() => {
                                !detailOpen ? goNext() : {};
                            }}
                            form={!detailOpen
                                ? ''
                                : 'updateEmployeePlacementMeetingResultForm'}
                        />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateEmployeePlacementMeetingResultForm"
                            method="POST"
                            use:updateEmployeePlacementMeetingResultEnhance
                        >
                            {#if !detailOpen}
                                <ContentHeader
                                    title="Keputusan Mesyuarat"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Nama Mesyuarat"
                                    disabled
                                    id="meetingName"
                                    type="text"
                                    val="Mesyuarat 1/2"
                                />
                                <CustomTextField
                                    label="Tarikh Mesyuarat"
                                    disabled
                                    id="meetingDate"
                                    type="text"
                                    val="21/02/2024"
                                />
                                <FilterCard onSearch={_search}>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .grade}
                                        label="Gred"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .position}
                                        label="Jawatan"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .name}
                                        label="Nama"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .identityCard}
                                        label="No. Kad Pengenalan"
                                    ></FilterTextField>
                                </FilterCard>
                                <CustomTable
                                    title=""
                                    bind:tableData={table}
                                    enableDetail
                                    detailActions={() => (detailOpen = true)}
                                />
                            {:else}
                                <ContentHeader
                                    title="Maklumat Calon"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    type="text"
                                    val="4701"
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    type="text"
                                    val="Gareth Bale"
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identificationNumber"
                                    type="text"
                                    val="950626-13-6445"
                                />
                                <ContentHeader
                                    title="Keputusan Mesyuarat"
                                    borderClass="border-none"
                                />
                                <CustomSelectField
                                disabled={isNotUrusSetia}
                                    label="Penempatan Baru"
                                    id="newPlacement"
                                    errors={$updateEmployeePlacementMeetingResultError.newPlacement}
                                    bind:val={$updateEmployeePlacementMeetingResultForm.newPlacement}
                                    options={data.selectionOptions
                                        .placementLookup}
                                />
                                <CustomSelectField
                                disabled={isNotUrusSetia}
                                    label="Pengarah Baru"
                                    id="newDirector"
                                    errors={$updateEmployeePlacementMeetingResultError.newDirector}
                                    bind:val={$updateEmployeePlacementMeetingResultForm.newDirector}
                                    options={dropdownOptions}
                                />
                                <CustomTextField
                                disabled={isNotUrusSetia}
                                    label="Tarikh Lapor Diri"
                                    id="reportingDate"
                                    type="date"
                                    errors={$updateEmployeePlacementMeetingResultError.reportingDate}
                                    bind:val={$updateEmployeePlacementMeetingResultForm.reportingDate}
                                />
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
                    >
                        <TextIconButton
                            label={!detailOpen ? 'Kembali' : 'Batal'}
                            icon={!detailOpen ? 'previous' : 'block'}
                            type="neutral"
                            onClick={() => {
                                !detailOpen
                                    ? goPrevious()
                                    : (detailOpen = false);
                            }}
                        />
                        <TextIconButton
                            label={!detailOpen ? 'Seterusnya' : 'Simpan'}
                            icon={!detailOpen ? 'next' : 'check'}
                            type="primary"
                            onClick={() => {
                                !detailOpen ? goNext() : {};
                            }}
                            form={!detailOpen
                                ? ''
                                : 'updatePlacementAmendmentApplicationResultForm'}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updatePlacementAmendmentApplicationResultForm"
                            method="POST"
                            use:updatePlacementAmendmentApplicationResultEnhance
                        >
                            {#if !detailOpen}
                                <FilterCard onSearch={_search}>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .employeeNumber}
                                        label="No. Pekerja"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .name}
                                        label="Nama"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .identityCard}
                                        label="No. Kad Pengenalan"
                                    ></FilterTextField>
                                </FilterCard>
                                <CustomTable
                                    title="Senarai Calon Yang Terpilih"
                                    enableDetail
                                    detailActions={() => {
                                        detailOpen = true;
                                    }}
                                    tableData={table}
                                />
                            {:else}
                                <ContentHeader
                                    title="Maklum Balas Kakitangan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Kakitangan Memerlukan Penangguhan/Pindaan Penempatan?"
                                    disabled
                                    id="amendmentRequest"
                                    type="text"
                                    val="Ya"
                                />
                                <DownloadAttachment
                                    label="Dokumen-Dokumen Berkaitan"
                                />
                                <div class="flex flex-row gap-2 pb-2.5">
                                    <span
                                        class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                                        >Sekiranya kakitangan memilih untuk
                                        tidak membuat Permohonan
                                        Penangguhan/Pindaan Penempatan sila
                                        terus ke langkah berikut:</span
                                    >
                                    <span
                                        class="text-sm italic text-ios-activeColors-activeBlue-light"
                                    >
                                        Kemaskini Keputusan Pemangkuan
                                    </span>
                                </div>
                                <span
                                    class="pb-2.5 text-sm italic text-ios-labelColors-secondaryLabel-light"
                                    >Sekiranya kakitangan memilih untuk membuat
                                    Permohonan Penangguhan/Pindaan Penempatan
                                    sila isi butiran penangguhan berikut
                                    mengikut surat penangguhan yang disediakan
                                    oleh kakitangan.</span
                                >
                                <ContentHeader
                                    title="Butiran Penangguhan/Pindaan Penempatan"
                                    borderClass="border-none"
                                />
                                {#if data.actingType === '1_54'}
                                    <CustomTextField
                                        label="Tarikh Asal Lapor Diri"
                                        disabled
                                        id="originalReportingDate"
                                        type="text"
                                        val="21/02/2024"
                                    />
                                    <CustomTextField
                                        label="Penempatan Asal"
                                        disabled
                                        id="originalPlacement"
                                        type="text"
                                        val="Bahagian Pengurusan"
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri Baru Dipohon"
                                        disabled
                                        id="requestedReportingDate"
                                        type="text"
                                        val="22/02/2024"
                                    />
                                    <CustomTextField
                                        label="Pindaan Penempatan Dipohon"
                                        disabled
                                        id="requestedPlacementAmendment"
                                        type="text"
                                        val="Bahagian Teknologi"
                                    />
                                    <CustomSelectField
                                        label="Keputusan"
                                        id="placementAmendmentResult"
                                        errors={$updatePlacementAmendmentApplicationResultError.placementAmendmentResult}
                                        bind:val={$updatePlacementAmendmentApplicationResultForm.placementAmendmentResult}
                                        options={meetingResultOption}
                                    />
                                    <CustomTextField
                                        label="Kelulusan Tarikh Lapor Diri Baru"
                                        id="approvedNewReportingDate"
                                        errors={$updatePlacementAmendmentApplicationResultError.approvedNewReportingDate}
                                        type="date"
                                        bind:val={$updatePlacementAmendmentApplicationResultForm.approvedNewReportingDate}
                                    />
                                    <CustomSelectField
                                        label="Kelulusan Pindaan Penempatan Dipohon"
                                        id="approvedRequestedPlacementAmendment"
                                        errors={$updatePlacementAmendmentApplicationResultError.approvedRequestedPlacementAmendment}
                                        bind:val={$updatePlacementAmendmentApplicationResultForm.approvedRequestedPlacementAmendment}
                                        options={data.selectionOptions
                                            .departmentLookup}
                                    />
                                {:else}
                                    <CustomTextField
                                        label="Tarikh Asal Penempatan"
                                        id="originalPlacementDate"
                                        errors={$updatePlacementAmendmentApplicationResultError.originalPlacementDate}
                                        type="text"
                                        bind:val={$updatePlacementAmendmentApplicationResultForm.originalPlacementDate}
                                    />
                                    <CustomTextField
                                        label="Tarikh Pertukaran Yang Dipohon"
                                        id="placementRequestedAmendmentDate"
                                        errors={$updatePlacementAmendmentApplicationResultError.placementRequestedAmendmentDate}
                                        type="text"
                                        bind:val={$updatePlacementAmendmentApplicationResultForm.placementRequestedAmendmentDate}
                                    />
                                    <CustomTextField
                                        label="Alasan Penangguhan"
                                        id="placementAmendmentReason"
                                        errors={$updatePlacementAmendmentApplicationResultError.placementAmendmentReason}
                                        type="text"
                                        bind:val={$updatePlacementAmendmentApplicationResultForm.placementAmendmentReason}
                                    />
                                    <CustomSelectField
                                        label="Nama Pelulus"
                                        id="approverName"
                                        errors={$updatePlacementAmendmentApplicationResultError.approverName}
                                        options={dropdownOptions}
                                        val={$updatePlacementAmendmentApplicationResultForm.approverName}
                                    />
                                {/if}
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                    >
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <FilterCard onSearch={_search}>
                                <FilterTextField
                                    bind:inputValue={table.param.filter
                                        .employeeNumber}
                                    label="No. Pekerja"
                                ></FilterTextField>
                                <FilterTextField
                                    bind:inputValue={table.param.filter.name}
                                    label="Nama"
                                ></FilterTextField>
                                <FilterTextField
                                    bind:inputValue={table.param.filter
                                        .identityCard}
                                    label="No. Kad Pengenalan"
                                ></FilterTextField>
                            </FilterCard>
                            <CustomTable
                                title="Senarai Calon Yang Terpilih"
                                bind:tableData={actingResultTable}
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Kemaskini Keputusan Pemangkuan"
                    >
                        <TextIconButton
                            label={!detailOpen ? 'Kembali' : 'Batal'}
                            icon={!detailOpen ? 'previous' : 'block'}
                            type="neutral"
                            onClick={() => {
                                !detailOpen
                                    ? goPrevious()
                                    : (detailOpen = false);
                            }}
                        />
                        <TextIconButton
                            label={!detailOpen ? 'Seterusnya' : 'Simpan'}
                            icon={!detailOpen ? 'next' : 'check'}
                            type="primary"
                            onClick={() => {
                                !detailOpen ? goNext() : {};
                            }}
                            form={!detailOpen ? '' : 'updateActingResultForm'}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateActingResultForm"
                            method="POST"
                            use:updateActingResultEnhance
                        >
                            {#if !detailOpen}
                                <FilterCard onSearch={_search}>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .employeeNumber}
                                        label="No. Pekerja"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .name}
                                        label="Nama"
                                    ></FilterTextField>
                                    <FilterTextField
                                        bind:inputValue={table.param.filter
                                            .identityCard}
                                        label="No. Kad Pengenalan"
                                    ></FilterTextField>
                                </FilterCard>
                                <CustomTable
                                    title="Senarai Calon Yang Terpilih"
                                    enableDetail
                                    detailActions={() => (detailOpen = true)}
                                    tableData={actingResultTable}
                                />
                            {:else}
                                <ContentHeader
                                    title="Maklumat Calon"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    type="text"
                                    val="4701"
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    type="text"
                                    val="Gareth Bale"
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identificationNumber"
                                    type="text"
                                    val="920625-13-6447"
                                />
                                <ContentHeader
                                    title="Butiran Pemangkuan"
                                    borderClass="border-none"
                                />
                                <span
                                    class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                    >Sekiranya tidak lulus, jawatan dan gred
                                    akan dikembalikan ke butiran asal.</span
                                >
                                <CustomSelectField
                                    label="Keputusan Pemangkuan"
                                    id="actingResult"
                                    disabled={isNotUrusSetia}
                                    bind:val={$updateActingResultForm.actingResult}
                                    errors={$updateActingResultError.actingResult}
                                    options={meetingResultOption}
                                />
                                <CustomSelectField
                                    label="Jawatan Pemangkuan"
                                    id="actingPosition"
                                    options={data.selectionOptions
                                        .positionLookup}
                                    errors={$updateActingResultError.actingPosition}
                                    bind:val={$updateActingResultForm.actingPosition}
                                />
                                <CustomSelectField
                                    label="Gred Pemangkuan"
                                    id="actingGrade"
                                    options={data.selectionOptions.gradeLookup}
                                    errors={$updateActingResultError.actingGrade}
                                    bind:val={$updateActingResultForm.actingGrade}
                                />
                                <CustomSelectField
                                    label="Penempatan Baru"
                                    id="newPlacement"
                                    options={data.selectionOptions
                                        .placementLookup}
                                    errors={$updateActingResultError.newPlacement}
                                    bind:val={$updateActingResultForm.newPlacement}
                                />
                                <CustomTextField
                                    label="Tarikh Lapor Diri"
                                    id="reportingDate"
                                    type="date"
                                    errors={$updateActingResultError.reportingDate}
                                    bind:val={$updateActingResultForm.reportingDate}
                                />
                                <ContentHeader
                                    title="Pengesah Keputusan"
                                    borderClass="border-none"
                                />
                                <CustomSelectField
                                    label="Nama Penyokong"
                                    id="supporterId"
                                    bind:val={$updateActingResultForm.supporterId}
                                    errors={$updateActingResultError.supporterId}
                                    options={dropdownOptions}
                                />
                                <CustomSelectField
                                    label="Nama Pelulus"
                                    id="approverId"
                                    bind:val={$updateActingResultForm.approverId}
                                    errors={$updateActingResultError.approverId}
                                    options={dropdownOptions}
                                />
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!-- Stepper for supporter and approver only -->
                {#if currentRoleCode === supporterRoleCode || currentRoleCode === approverRoleCode}
                    <StepperContent>
                        <StepperContentHeader
                            title="Penyokongan & Pelulusan Pemangkuan"
                        >
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                type="primary"
                                form={currentRoleCode === supporterRoleCode
                                    ? 'supporterResultForm'
                                    : 'approverResultForm'}
                            />
                        </StepperContentHeader>
                        <StepperContentBody>
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id="supporterResultForm"
                                method="POST"
                                use:supporterResultEnhance
                            >
                                <span
                                    class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                                >
                                    Keputusan akan dihantar ke emel klinik dan
                                    Urus Setia berkaitan.
                                </span>
                                <ContentHeader
                                    title="Keputusan daripada Penyokong"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="supporterRemark"
                                    type="text"
                                    disabled={currentRoleCode !==
                                    supporterRoleCode
                                        ? true
                                        : false}
                                    errors={$supporterResultError.supporterRemark}
                                    bind:val={$supporterResultForm.supporterRemark}
                                />
                                <CustomRadioBoolean
                                    id="supporterResult"
                                    label="Keputusan"
                                    disabled={currentRoleCode !==
                                    supporterRoleCode
                                        ? true
                                        : false}
                                    bind:val={$supporterResultForm.supporterResult}
                                    errors={$supporterResultError.supporterResult}
                                    options={supporterResultOption}
                                />
                            </form>
                            {#if currentRoleCode === approverRoleCode}
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5"
                                    id="approverResultForm"
                                    method="POST"
                                    use:approverResultEnhance
                                >
                                    <ContentHeader
                                        title="Keputusan daripada Penyokong"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Tindakan/Ulasan"
                                        id="approverRemark"
                                        type="text"
                                        bind:val={$approverResultForm.approverRemark}
                                        errors={$approverResultError.approverRemark}
                                    />
                                    <CustomRadioBoolean
                                        id="approverResult"
                                        label="Keputusan"
                                        disabled={currentRoleCode !==
                                        approverRoleCode
                                            ? true
                                            : false}
                                        bind:val={$approverResultForm.approverResult}
                                        errors={$approverResultError.approverResult}
                                        options={supporterResultOption}
                                    />
                                </form>
                            {/if}
                        </StepperContentBody>
                    </StepperContent>
                {/if}

                {#if currentRoleCode === secretaryRoleCode}
                    <StepperContent>
                        <StepperContentHeader
                            title="Semak Pengesahan Keputusan Pemangkuan"
                        >
                            {#if !detailOpen}
                                <TextIconButton
                                    label="Kembali"
                                    icon="previous"
                                    type="neutral"
                                    onClick={() => goPrevious()}
                                />
                                <TextIconButton
                                    label="Selesai"
                                    icon="check"
                                    type="primary"
                                    onClick={() => goto('./')}
                                />
                            {:else}
                                <TextIconButton
                                    label="Selesai"
                                    icon="check"
                                    type="primary"
                                    onClick={() => (detailOpen = false)}
                                />
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                {#if !detailOpen}
                                    <FilterCard onSearch={_search}>
                                        <FilterTextField
                                            bind:inputValue={table.param.filter
                                                .employeeNumber}
                                            label="No. Pekerja"
                                        ></FilterTextField>
                                        <FilterTextField
                                            bind:inputValue={table.param.filter
                                                .name}
                                            label="Nama"
                                        ></FilterTextField>
                                        <FilterTextField
                                            bind:inputValue={table.param.filter
                                                .identityCard}
                                            label="No. Kad Pengenalan"
                                        ></FilterTextField>
                                    </FilterCard>
                                    <CustomTable
                                        title="Senarai Calon Yang Terpilih"
                                        bind:tableData={table}
                                        enableDetail
                                        detailActions={() =>
                                            (detailOpen = true)}
                                    />
                                {:else}
                                    <ContentHeader
                                        title="Maklumat Calon"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="No. Pekerja"
                                        disabled
                                        id="employeeNumber"
                                        type="text"
                                        val="4701"
                                    />
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="employeeName"
                                        type="text"
                                        val="Gareth Bale"
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        disabled
                                        id="identificationNumber"
                                        type="text"
                                        val="920625-13-6447"
                                    />
                                    <ContentHeader
                                        title="Butiran Pemangkuan"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Nama Jawatan Baru"
                                        disabled
                                        id="newPosition"
                                        type="text"
                                        val="Jurutera"
                                    />
                                    <CustomTextField
                                        label="Gred Baru"
                                        disabled
                                        id="newGrade"
                                        type="text"
                                        val="E24"
                                    />
                                    <CustomTextField
                                        label="Penempatan Baru"
                                        disabled
                                        id="newPlacement"
                                        type="text"
                                        val="LKIM SARAWAK - KUCHING"
                                    />
                                    <CustomTextField
                                        label="Pengarah Baru"
                                        disabled
                                        id="newDirector"
                                        type="text"
                                        val="Pep Guardiola"
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri"
                                        disabled
                                        id="reportingDate"
                                        type="text"
                                        val="23/02/2024"
                                    />
                                    <ContentHeader
                                        title="Pengesah Keputusan"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Nama Penyokong"
                                        disabled
                                        id="supporterName"
                                        type="text"
                                        val="Taylor Swift"
                                    />
                                    <CustomTextField
                                        label="Keputusan"
                                        disabled
                                        id="supporterResult"
                                        type="text"
                                        val="Sokong"
                                    />
                                    <CustomTextField
                                        label="Nama Pelulus"
                                        disabled
                                        id="approverName"
                                        type="text"
                                        val="Luis Suarez"
                                    />
                                    <CustomTextField
                                        label="Keputusan"
                                        disabled
                                        id="approverResult"
                                        type="text"
                                        val="Lulus"
                                    />
                                {/if}
                            </form>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
            <!-- For kakitangan only -->
        {:else if currentRoleCode === employeeRoleCode}
            <StepperContent>
                <StepperContentHeader title="Panggilan Temuduga">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5">
                        <ContentHeader
                            title="Butiran Temuduga"
                            borderClass="border-none"
                        />
                        <DownloadAttachment
                            label="Surat Panggilan Temuduga"
                            fileName="surat_panggilan_temuduga_irfan.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Borang Perakuan Pendidikan"
                            fileName="borang_perakuan_pendidikan.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Dokumen Tambahan"
                            fileName="dokumen_tambahan.pdf"
                            triggerDownload={() => {}}
                        />
                        <div
                            class="flex flex-col pb-2.5 text-sm italic text-ios-labelColors-secondaryLabel-light"
                        >
                            <span
                                >Tahniah! Anda berjaya dipanggil untuk temuduga.</span
                            >
                            <span>
                                Sila hadirkan diri ke temuduga mengikut butiran
                                temuduga seperti yang tertera di atas.
                            </span>
                            <span
                                >Sila bawa dokumen yang berkaitan ke temuduga
                                tersebut.</span
                            >
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5 pb-12">
                        <ContentHeader
                            title="Butiran Pemangkuan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Gred"
                            disabled
                            id="grade"
                            type="text"
                            val="N32"
                        />
                        <CustomTextField
                            label="Jawatan"
                            disabled
                            id="position"
                            type="text"
                            val="Setiausaha Pejabat"
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            disabled
                            id="effectiveDate"
                            type="text"
                            val="23/02/2024"
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            disabled
                            id="newPlacement"
                            type="text"
                            val="LKIM SARAWAK - KUCHING"
                        />

                        <ContentHeader
                            title="Dokumen-dokumen yang perlu dimuat turun dan diisi"
                            borderClass="border-none"
                        />
                        <DownloadAttachment
                            label="Surat Tawaran Pemangkuan"
                            fileName="surat_tawaran_pemangkuan.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Surat Setuju Terima"
                            fileName="surat_setuju_terima.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Surat Lapor Diri"
                            fileName="borang_lapor_diri.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Nota Serah Tugas"
                            fileName="nota_serah_tugas.pdf"
                            triggerDownload={() => {}}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        icon="check"
                        form="employeeNeedPlacementAmendmentForm"
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col gap-2.5 pb-10"
                        id="employeeNeedPlacementAmendmentForm"
                        method="POST"
                        enctype="multipart/form-data"
                        use:employeeNeedPlacementAmendmentEnhance
                    >
                        <ContentHeader
                            title="Permohonan Penangguhan/Pindaan Penempatan"
                            borderClass="border-none"
                        />
                        <CustomSelectField
                            label="Adakah anda memerlukan penangguhan/pindaan penempatan?"
                            id="isNeedPlacementAmendment"
                            options={isNeedPlacementAmendmentOption}
                            bind:val={$employeeNeedPlacementAmendmentForm.isNeedPlacementAmendment}
                            errors={$employeeNeedPlacementAmendmentError.isNeedPlacementAmendment}
                        />
                        {#if $employeeNeedPlacementAmendmentForm.isNeedPlacementAmendment}
                            <CustomTextField
                                label="Tarikh Lapor Diri yang Dipohon"
                                id="requestedReportingDate"
                                type="date"
                                bind:val={$employeeNeedPlacementAmendmentForm.requestedReportingDate}
                                errors={$employeeNeedPlacementAmendmentError.requestedReportingDate}
                            />
                            <CustomSelectField
                                label="Pindaan Penempatan Dipohon"
                                id="requestedPlacement"
                                errors={$employeeNeedPlacementAmendmentError.requestedPlacement}
                                bind:val={$employeeNeedPlacementAmendmentForm.requestedPlacement}
                                options={data.selectionOptions.placementLookup}
                            />
                            <ContentHeader
                                title="Dokumen-Dokumen yang Berkaitan"
                                borderClass="border-none"
                            />
                            <!-- upload file here -->
                            <input
                                type="file"
                                name="document"
                                accept=".pdf"
                                on:input={(e) =>
                                    ($employeeNeedPlacementAmendmentForm.document =
                                        Array.from(
                                            e.currentTarget.files ?? [],
                                        ))}
                            />
                            {#if $employeeNeedPlacementAmendmentError.document}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >{$employeeNeedPlacementAmendmentError.document}</span
                                >
                            {/if}
                            <ContentHeader
                                title="Dokumen Sokongan"
                                borderClass="border-none"
                            >
                                <div
                                    hidden={$employeeNeedPlacementAmendmentForm
                                        .document.length < 1}
                                >
                                    <FileInputField
                                        id="document"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            </ContentHeader>
                            <div
                                class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                            >
                                <div class="flex flex-wrap gap-3">
                                    {#each $employeeNeedPlacementAmendmentForm.document as item, index}
                                        <FileInputFieldChildren
                                            childrenType="grid"
                                            fileName={item.name}
                                        />
                                    {/each}
                                </div>
                                <div
                                    class="flex flex-col items-center justify-center gap-2.5"
                                >
                                    <p
                                        class=" text-sm text-txt-tertiary"
                                        hidden={$employeeNeedPlacementAmendmentForm
                                            .document.length > 0}
                                    >
                                        Pilih fail dari peranti anda.
                                    </p>
                                    <div
                                        class="text-txt-tertiary"
                                        hidden={$employeeNeedPlacementAmendmentForm
                                            .document.length > 0}
                                    >
                                        <svg
                                            width={40}
                                            height={40}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        hidden={$employeeNeedPlacementAmendmentForm
                                            .document.length > 0}
                                    >
                                        <FileInputField id="document"
                                        ></FileInputField>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5 pb-12">
                        <ContentHeader
                            title="Butiran Permohonan Penangguhan/Pindaan Penempatan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Adakah Anak Memerlukan Penangguhan?"
                            disabled
                            id="amendmentRequest"
                            type="text"
                            val="Ya"
                        />
                        <CustomTextField
                            label="Alasan Penangguhan"
                            disabled
                            id="postponeReason"
                            type="text"
                            val="Urusan pindah rumah dan hantar anak ke klinik"
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri Yang Dipohon"
                            disabled
                            id="requestedReportingDate"
                            type="text"
                            val="22/02/2024"
                        />
                        <CustomTextField
                            label="Pindaan Penempatan Dipohon"
                            disabled
                            id="requestedPlacementAmendment"
                            type="text"
                            val="Bahagian Teknologi"
                        />
                        <ContentHeader
                            title="Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Keputusan"
                            disabled
                            id="postponeResult"
                            type="text"
                            val="Lulus"
                        />
                        <CustomTextField
                            label="Kelulusan Pindaan Penempatan Dipohon"
                            disabled
                            id="approvedRequestedPlacementAmendment"
                            type="text"
                            val="Bahagian Teknologi"
                        />
                        <CustomTextField
                            label="Kelulusan Tarikh Lapor Diri Baru"
                            disabled
                            id="approvedNewReportingDate"
                            type="text"
                            val="22/02/2024"
                        />
                        <DownloadAttachment
                            label="Surat Penangguhan Rayuan"
                            fileName="surat_kelulusan_penangguhan_rayuan.pdf"
                            triggerDownload={() => {}}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Akhir Pemangkuan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        onClick={() => {}}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 pb-20">
                        <ContentHeader
                            title="Butiran Pemangkuan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Gred"
                            disabled
                            id="grade"
                            type="text"
                            val="N32"
                        />
                        <CustomTextField
                            label="Jawatan"
                            disabled
                            id="position"
                            type="text"
                            val="Setiausaha Pejabat"
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            disabled
                            id="effectiveDate"
                            type="text"
                            val="22/02/2024"
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            disabled
                            id="newPlacem,ent"
                            type="text"
                            val="LKIM SARAWAK - KUCHING"
                        />
                        <CustomTextField
                            label="Pengarah Baru"
                            disabled
                            id="newDirector"
                            type="text"
                            val="Lionel Messi"
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri"
                            disabled
                            id="reportingDate"
                            type="text"
                            val="23/02/2024"
                        />
                        <ContentHeader
                            title="Pengesahan Keputusan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Nama Penyokong"
                            disabled
                            id="supporterName"
                            type="text"
                            val="Cristiano Ronaldo"
                        />
                        <CustomTextField
                            label="Keputusan"
                            disabled
                            id="supporterResult"
                            type="text"
                            val="Disokong"
                        />
                        <CustomTextField
                            label="Nama Pelulus"
                            disabled
                            id="approverName"
                            type="text"
                            val="Gareth Bale"
                        />
                        <CustomTextField
                            label="Keputusan"
                            disabled
                            id="approverResult"
                            type="text"
                            val="Diluluskan"
                        />
                        <span
                            class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                            >Tahniah! Anda boleh menyemak perubahan pada gaji
                            dan buku rekod perkhidmatan anda. Sila hubungi Urus
                            Setia berkenaan jika ada sebarang pertanyaan
                            mengenai perubahan tersebut.</span
                        >
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />
