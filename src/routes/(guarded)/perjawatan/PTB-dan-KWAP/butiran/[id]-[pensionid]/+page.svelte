<!-- Add your changes to the commented parts -->

<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { onMount } from 'svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';

    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _PTBPensionInfoSchema,
        _approveInfoSchema,
        _assignRolesRelatedSchema,
        _personalInfoSchema,
        _rolesRelatedEditSchema,
        _serviceInfoSchema,
        _supporterInfoSchema,
    } from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import type { AddChosenActingEmployeeDTO } from '$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto';
    import { error } from '@sveltejs/kit';
    import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import {
        _editApproverDetailSubmit,
        _editSupporterDetailSubmit,
        // _editSupporterDetailSubmit,
        _editpensionDetailSubmit,
        _editrolesRelatedDetailSubmit,
        _pensionDetailSubmit,
        _tableInformation,
    } from './+page';
    import type { PersonalDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/ptb-kwap-dto';
    import { Toaster } from 'svelte-french-toast';
    import { approveOptions, supportOptions } from '$lib/constants/core/radio-option-constants';

    export let data: PageData;

    // let notpelulus: boolean = true;
    // let notketuaSeksyen: boolean = true;
    // let notloanDetail: boolean = true;
    // let noturusetia: boolean = true;
    // let notkakitangan: boolean = true;

    // if (data.props.userMode == 'pelulus') {
    //     notpelulus = false;
    // }

    // if (data.props.userMode == 'ketua Seksyen') {
    //     notketuaSeksyen = false;
    // }

    // if (data.props.userMode == 'urusetia') {
    //     noturusetia = false;
    // }

    // if (data.props.userMode == 'kakitangan') {
    //     notkakitangan = false;
    // }

    // if (
    //     data.props.userMode == 'kakitangan' ||
    //     data.props.userMode == 'urusetia'
    // ) {
    //     notloanDetail = false;
    // }

    let rowData: CommonEmployeeDTO;
    // table employee table
    let addActingTable: TableSettingDTO = {
        param: data.param,
        meta: data.actingEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.actingEmployeeList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'homeAddress'],
        dictionary: [],
        url: 'employment/acting/employee_lists/list',
        id: 'addActingTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    // import { _editpensionDetailSubmit } from './+page';

    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    // urusetia
    let urusetia = UserRoleConstant.urusSetiaPerjawatan.code;
    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;
    // penyokong
    let pelulus = UserRoleConstant.pelulus.code;
    // penyokong
    let penyokong = UserRoleConstant.penyokong.code;

    // export let data: PageData;
    let stepperIndex = 0;
    let status: string = 'LULUS';

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    let supporterResultOption: RadioDTO[] = [
        {
            value: true,
            name: 'YA',
        },
        {
            value: false,
            name: 'TIDAK',
        },
    ];

    let retirementBenefitOption: RadioDTO[] = [
        {
            value: true,
            name: 'EPF',
        },
        {
            value: false,
            name: 'PENCEN',
        },
    ];

    const {
        form: personalInfoForm,
        errors: personalInfoError,
        enhance: personalInfoEnhance,
        isTainted: personalDetailTainted,
    } = superForm(data.personalDetailForm, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_personalInfoSchema),
    });

    const {
        form: serviceInfoForm,
        errors: serviceInfoError,
        enhance: serviceInfoEnhance,
        isTainted: serviceDetailTainted,
    } = superForm(data.serviceDetailForm, {
        SPA: true,
        id: 'serviceDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_serviceInfoSchema),
    });

    const {
        form: PTBPensionInfoForm,
        errors: PTBPensionInfoError,
        enhance: PTBPensionInfoEnhance,
        isTainted: PTBPensionDetailTainted,
    } = superForm(data.pensionDetailForm, {
        SPA: true,
        id: 'PTBPensionDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_PTBPensionInfoSchema),
        async onSubmit() {
            if (data.isNewApplication) {
                let tempPensionId: number = 0;
                $PTBPensionInfoForm.employeeId = data.currentApplicationId;
                await _pensionDetailSubmit($PTBPensionInfoForm)
                    .then((res) => {
                        if (res?.response.status == 'success') {
                            tempPensionId =
                                res?.response.data?.details.pensionId;
                        }
                    })
                    .finally(() => {
                        setTimeout(
                            () =>
                                goto(
                                    '/perjawatan/PTB-dan-KWAP/butiran/' +
                                        data.currentApplicationId +
                                        '-' +
                                        tempPensionId,
                                ),
                            1000,
                        );
                    });
            } else if (!data.isNewApplication) {
                $PTBPensionInfoForm.id = data.currentApplicationId;
                _editpensionDetailSubmit($PTBPensionInfoForm);
            }
        },
    });
    const {
        form: assignRolesRelatedInfoForm,
        errors: assignRolesRelatedInfoError,
        enhance: assignRolesRelatedInfoEnhance,
        isTainted: assignRolesRelatedDetailTainted,
    } = superForm(data.assignrolesRelatedlForm, {
        SPA: true,
        id: 'assignRolesRelatedDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_assignRolesRelatedSchema),
        onSubmit() {
            $assignRolesRelatedInfoForm.id = data.currentApplicationId;
            _editrolesRelatedDetailSubmit($assignRolesRelatedInfoForm);
        },
    });
    const {
        form: rolesRelatedInfoForm,
        errors: rolesRelatedInfoError,
        enhance: rolesRelatedInfoEnhance,
        isTainted: rolesRelatedDetailTainted,
    } = superForm(data.rolesRelatedlForm, {
        SPA: true,
        id: 'rolesRelatedDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_rolesRelatedEditSchema),
        // onSubmit() {
        //     $rolesRelatedInfoForm.id = data.currentApplicationId
        // _editrolesRelatedDetailSubmit($rolesRelatedInfoForm);
        // }
    });

    const {
        form: supporterInfoForm,
        errors: supporterInfoError,
        enhance: supporterInfoEnhance,
        isTainted: supporterDetailTainted,
    } = superForm(data.supporterDetailForm, {
        SPA: true,
        id: 'supporterDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_supporterInfoSchema),
        onSubmit() {
            $supporterInfoForm.id = data.currentApplicationId;
            _editSupporterDetailSubmit($supporterInfoForm);
        },
    });

    const {
        form: approverInfoForm,
        errors: approverInfoError,
        enhance: approverInfoEnhance,
        isTainted: approverDetailTainted,
    } = superForm(data.approverDetailForm, {
        SPA: true,
        id: 'approverDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_approveInfoSchema),
        onSubmit() {
            rolesRelatedInfoForm;
            $approverInfoForm.id = data.currentApplicationId;
            _editApproverDetailSubmit($approverInfoForm);
        },
    });

    const getEmployee = async () => {
        _tableInformation(rowData.employeeId).then((res) => {
            $personalInfoForm = res.response.data?.details as PersonalDetailDTO;
        });
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Permohonan Pemberian Taraf Berpencen"
        ><TextIconButton
            type="close"
            label="Kembali"
            onClick={() => {
                goto('/perjawatan/PTB-dan-KWAP');
            }}
        /></ContentHeader
    >
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper bind:activeIndex={stepperIndex} dataId="Permohonan Pemberian Taraf Berpencen" >
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <!-- {#if editingCandidateList} -->
            <StepperContentBody>
                <!-- <b class="text-sm text-system-primary">Maklumat Peribadi</b>
                {#if data.isNewApplication}
                    <div class="h-fit w-full p-3">
                        <DataTable
                            title="Senarai Kakitangan"
                            bind:tableData={addActingTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                getEmployee();
                            }}
                        ></DataTable>
                    </div>
                {/if} -->
                <form
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    id="personalDetail"
                    method="POST"
                    use:personalInfoEnhance
                >
                    <CustomTextField
                        disabled
                        type="text"
                        id="employeeNo"
                        label="No. Pekerja"
                        errors={$personalInfoError.employeeNo}
                        bind:val={$personalInfoForm.employeeNo}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="name"
                        label="Nama Penuh"
                        errors={$personalInfoError.name}
                        bind:val={$personalInfoForm.name}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="otherName"
                        label="Nama Lain"
                        errors={$personalInfoError.otherName}
                        bind:val={$personalInfoForm.otherName}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="identityCard"
                        label="No. K/P"
                        errors={$personalInfoError.identityCard}
                        bind:val={$personalInfoForm.identityCard}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="identityCardColor"
                        label="Warna K/P"
                        errors={$personalInfoError.identityCardColor}
                        bind:val={$personalInfoForm.identityCardColor}
                    />
                    <CustomTextField
                        disabled
                        type="text"
                        id="dateOfBirth"
                        label="Tarikh Lahir"
                        errors={$personalInfoError.dateOfBirth}
                        bind:val={$personalInfoForm.dateOfBirth}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="placeOfBirth"
                        label="Tempat Lahir"
                        errors={$personalInfoError.placeOfBirth}
                        bind:val={$personalInfoForm.placeOfBirth}
                    />
                    <CustomTextField
                        disabled
                        id="nationality"
                        label="Warganegara"
                        errors={$personalInfoError.nationality}
                        bind:val={$personalInfoForm.nationality}
                    />
                    <CustomTextField
                        disabled
                        id="race-"
                        label="Bangsa"
                        errors={$personalInfoError.race}
                        bind:val={$personalInfoForm.race}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="religion"
                        label="Agama"
                        errors={$personalInfoError.religion}
                        bind:val={$personalInfoForm.religion}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="gender"
                        label="Jantina"
                        errors={$personalInfoError.gender}
                        bind:val={$personalInfoForm.gender}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="status"
                        label="Status"
                        errors={$personalInfoError.status}
                        bind:val={$personalInfoForm.status}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="homeAddress"
                        label="Alamat Rumah"
                        errors={$personalInfoError.homeAddress}
                        bind:val={$personalInfoForm.homeAddress}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="homeNo"
                        label="Telefon Rumah"
                        errors={$personalInfoError.homeNo}
                        bind:val={$personalInfoForm.homeNo}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="mobileNo"
                        label="Telefon Sendiri"
                        errors={$personalInfoError.mobileNo}
                        bind:val={$personalInfoForm.mobileNo}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="housing"
                        label="Perumahan"
                        errors={$personalInfoError.housing}
                        bind:val={$personalInfoForm.housing}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="houseLoan"
                        label="Pinjaman Rumah"
                        errors={$personalInfoError.houseLoan}
                        bind:val={$personalInfoForm.houseLoan}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="isExPoliceOrSoldier"
                        label="Bekas Polis/Tentera"
                        errors={$personalInfoError.isExPolice}
                        bind:val={$personalInfoForm.isExPolice}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <!-- Maklumat Perkhidmatan -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan">
                <TextIconButton
                    label="simpan"
                    type="primary"
                    icon="check"
                    form="serviceDetail"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    id="serviceDetail"
                    method="POST"
                    use:serviceInfoEnhance
                >
                    <b class="text-sm text-system-primary"
                        >Maklumat Perkhidmatan</b
                    >
                    <CustomTextField
                        disabled
                        id="grade"
                        label={'Gred Semasa'}
                        type="text"
                        errors={$serviceInfoError.grade}
                        bind:val={$serviceInfoForm.grade}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="position"
                        label={'Jawatan'}
                        type="text"
                        errors={$serviceInfoError.position}
                        bind:val={$serviceInfoForm.position}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="placement"
                        label={'Penempatan'}
                        type="text"
                        errors={$serviceInfoError.placement}
                        bind:val={$serviceInfoForm.placement}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="serviceLevel"
                        label={'Taraf Perkhidmatan'}
                        type="text"
                        errors={$serviceInfoError.serviceLevel}
                        bind:val={$serviceInfoForm.serviceLevel}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="retirementType"
                        label="Faedah Persaraan"
                        errors={$serviceInfoError.retirementType}
                        bind:val={$serviceInfoForm.retirementType}
                    />

                    <CustomTextField
                        disabled
                        id="EPFNumber"
                        label={'No. KWSP'}
                        type="text"
                        errors={$serviceInfoError.EPFNumber}
                        bind:val={$serviceInfoForm.EPFNumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="SOCSONumber"
                        label={'No. SOCSO'}
                        type="text"
                        errors={$serviceInfoError.SOCSONumber}
                        bind:val={$serviceInfoForm.SOCSONumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="incomeNumber"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        errors={$serviceInfoError.incomeNumber}
                        bind:val={$serviceInfoForm.incomeNumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="bankName"
                        label={'Bank'}
                        type="text"
                        errors={$serviceInfoError.bankName}
                        bind:val={$serviceInfoForm.bankName}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="bankAccount"
                        label={'No. Akaun'}
                        type="text"
                        errors={$serviceInfoError.bankAccount}
                        bind:val={$serviceInfoForm.bankAccount}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="program"
                        label={'Program'}
                        type="text"
                        errors={$serviceInfoError.program}
                        bind:val={$serviceInfoForm.program}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="leaveEntitlement"
                        label={'Kelayakan Cuti'}
                        type="text"
                        errors={$serviceInfoError.leaveEntitlement}
                        bind:val={$serviceInfoForm.leaveEntitlement}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="hireByGovermentDate"
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                        type="text"
                        errors={$serviceInfoError.hireByGovermentDate}
                        bind:val={$serviceInfoForm.hireByGovermentDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="hireByLKIMDate"
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                        type="text"
                        errors={$serviceInfoError.hireByLKIMDate}
                        bind:val={$serviceInfoForm.hireByLKIMDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="currentServiceStartDate"
                        label={'Mula Dilantik Perkhidmatan Sekarang'}
                        type="text"
                        errors={$serviceInfoError.currentServiceStartDate}
                        bind:val={$serviceInfoForm.currentServiceStartDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="firstServiceConfirmedDate"
                        label={'Disahkan Dalam Jawatan Pertama LKIM'}
                        type="text"
                        errors={$serviceInfoError.firstServiceConfirmedDate}
                        bind:val={$serviceInfoForm.firstServiceConfirmedDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="currentServiceConfirmedDate"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        type="text"
                        errors={$serviceInfoError.currentServiceConfirmedDate}
                        bind:val={$serviceInfoForm.currentServiceConfirmedDate}
                    ></CustomTextField>

                    <div class="grid grid-cols-2 gap-10">
                        <!-- <div class="space-y-2.5">
                             <CustomTextField
                                    id="tarikhBerkuatkuasa"
                                    label={'Tarikh Berkuatkuasa'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField> 
                            <CustomTextField
                                id="maximumSalary"
                                label={'Tangga Gaji'}
                                type="text"
                                errors={$serviceInfoError.maximumSalary}
                                bind:val={data.serviceDetails.maximumSalary}
                            ></CustomTextField>
                            <CustomTextField
                                id="baseSalary"
                                label={'Gaji Pokok'}
                                type="text"
                                errors={$serviceInfoError.baseSalary}
                                bind:val={data.serviceDetails.baseSalary}
                            ></CustomTextField>
                        </div> -->
                        <!-- hasTooltip={true}
                                toolTipID="type-itka" -->
                        <!-- <div class="space-y-2.5">
                            <CustomTextField
                                id="itka"
                                label={'ITKA'}
                                type="text"
                                errors={$serviceInfoError.itka}
                                bind:val={data.serviceDetails.itka}
                            ></CustomTextField>
                            <CustomTextField
                                id="itp"
                                label={'ITP'}
                                type="text"
                                errors={$serviceInfoError.itp}
                                bind:val={data.serviceDetails.itp}
                            ></CustomTextField>
                            <CustomTextField
                                id="epw"
                                label={'EPW'}
                                type="text"
                                errors={$serviceInfoError.epw}
                                bind:val={data.serviceDetails.epw}
                            ></CustomTextField>
                            <CustomTextField
                                id="cola"
                                label={'COLA'}
                                type="text"
                                errors={$serviceInfoError.cola}
                                bind:val={data.serviceDetails.cola}
                            ></CustomTextField> -->
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                                    type="dark"
                                    triggeredBy="[id^='type-']"
                                    on:show={assignContent}
                                    >"{tooltipContent}"</Tooltip
                                > -->
                        <!-- </div> -->
                    </div>
                </form></StepperContentBody
            >
        </StepperContent>

        <!-- Kemaskini Maklumat PTB dan KWAP -->
        {#if currentRoleCode === urusetia}
            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat PTB dan KWAP">
                    <TextIconButton
                        label="simpan"
                        type="primary"
                        icon="check"
                        form="PTBPensionDetail"
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        id="PTBPensionDetail"
                        method="POST"
                        use:PTBPensionInfoEnhance
                    >
                        <CustomTextField
                        disabled={currentRoleCode !== urusetia}
                            id="PTBdate"
                            type="date"
                            label="Tarikh Diberi PTB"
                            errors={$PTBPensionInfoError.PTBDate}
                            bind:val={$PTBPensionInfoForm.PTBDate}
                        ></CustomTextField>
                        <CustomTextField
                        disabled={currentRoleCode !== urusetia}
                            id="referenceNumber"
                            type="text"
                            label="No. Rujukan Surat JPA"
                            errors={$PTBPensionInfoError.referenceNumber}
                            bind:val={$PTBPensionInfoForm.referenceNumber}
                        ></CustomTextField>

                        <CustomTextField
                        disabled={currentRoleCode !== urusetia}
                            id="referenceDate"
                            type="date"
                            label="Tarikh Rujukan"
                            errors={$PTBPensionInfoError.referenceDate}
                            bind:val={$PTBPensionInfoForm.referenceDate}
                        ></CustomTextField>

                        <CustomTextField
                        disabled={currentRoleCode !== urusetia}
                            id="pensionNumber"
                            label="No. Pencen"
                            errors={$PTBPensionInfoError.pensionNumber}
                            bind:val={$PTBPensionInfoForm.pensionNumber}
                        ></CustomTextField>

                        <CustomTextField
                        disabled={currentRoleCode !== urusetia}
                            id="KWAPEmailDate"
                            type="date"
                            label="Tarikh Emel (KWAP)"
                            errors={$PTBPensionInfoError.KWAPEmailDate}
                            bind:val={$PTBPensionInfoForm.KWAPEmailDate}
                        ></CustomTextField>
                    </form></StepperContentBody
                >
            </StepperContent>
        {/if}

        <!-- Peranan -Peranan Berkaitan -->

        <StepperContent>
            <StepperContentHeader
                title="Masukkan Maklumat Peranan - Peranan Berkaitan"
            >
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="assignRolesRelatedDetail"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <form
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                id="assignRolesRelatedDetail"
                method="POST"
                use:assignRolesRelatedInfoEnhance
            >
                <StepperContentBody>
                    <ContentHeader
                        title="Masukkan nama Penyokong dan Pelulus (Jika Sah)"
                    ></ContentHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    ></div>
                    <CustomSelectField
                    disabled={currentRoleCode !== urusetia}
                        id="staffSupporter"
                        label="Nama Penyokong"
                        options={data.supporterApproverLookup}
                        bind:val={$assignRolesRelatedInfoForm.supporterName}
                    />

                    <CustomSelectField
                    disabled={currentRoleCode !== urusetia}
                        id="staffApprover"
                        label="Nama Pelulus"
                        options={data.supporterApproverLookup}
                        bind:val={$assignRolesRelatedInfoForm.approverName}
                    />
                </StepperContentBody>
            </form>
        </StepperContent>

        <!-- Keputusan Daripada Peranan - Peranan Berkaitan -->
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Daripada Peranan - Peranan Berkaitan"
            >
                <TextIconButton
                    label="simpan"
                    type="primary"
                    icon="check"
                    form="."
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    id="."
                    method="POST"
                    use:rolesRelatedInfoEnhance
                >
                    <div class="flex w-full flex-col gap-2.5">
                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Penyokong</b
                                >
                            </div>
                            <CustomTextField
                                disabled
                                type="text"
                                id="supporterName"
                                label="Nama"
                                errors={$rolesRelatedInfoError.supporterName}
                                bind:val={$rolesRelatedInfoForm.supporterName}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="supportedStatus"
                                label="Ulasan"
                                errors={$rolesRelatedInfoError.supportedStatus}
                                bind:val={$rolesRelatedInfoForm.supportedStatus}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="supportedRemark"
                                label="Tindakan"
                                errors={$rolesRelatedInfoError.supportedRemark}
                                bind:val={$rolesRelatedInfoForm.supportedRemark}
                            ></CustomTextField>
                            <!-- <CustomTextField
                                type="date"
                                id="supportedDate"
                                label="Tarikh"
                                errors={$rolesRelatedInfoError.supportedDate}
                                bind:val={$rolesRelatedInfoForm.supportedDate}
                            ></CustomTextField> -->

                            <!-- <div class="text-sm text-system-primary">
                                        <i class=""
                                            ><li>
                                                ● Menunggu keputusan daripada
                                                PENYOKONG.
                                            </li></i
                                        >
                                    </div> -->
                        </div>
                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pelulus</b
                                >
                            </div>
                            <CustomTextField
                                disabled
                                type="text"
                                id="approverName"
                                label="Nama"
                                errors={$rolesRelatedInfoError.approverName}
                                bind:val={$rolesRelatedInfoForm.approverName}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="approvedStatus"
                                label="Ulasan"
                                errors={$rolesRelatedInfoError.approvedStatus}
                                bind:val={$rolesRelatedInfoForm.approvedStatus}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="approvedRemark"
                                label="Tindakan"
                                errors={$rolesRelatedInfoError.approvedRemark}
                                bind:val={$rolesRelatedInfoForm.approvedRemark}
                            ></CustomTextField>
                            <!-- <CustomTextField
                                type="date"
                                id="approvedDate"
                                label="Tarikh"
                                errors={$rolesRelatedInfoError.approvedDate}
                                bind:val={$rolesRelatedInfoForm.approvedDate}
                            ></CustomTextField> -->
                        </div>
                    </div>
                </form></StepperContentBody
            >
        </StepperContent>

        {#if currentRoleCode === penyokong}
            <StepperContent>
                <StepperContentHeader
                    title="Sila Tetapkan Keputusan Anda - Penyokong"
                >
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="supporterDetail"
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Keputusan akan dihantar ke peranan - peranan berkaitan."
                    ></ContentHeader>
                    <form
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        id="supporterDetail"
                        method="POST"
                        use:supporterInfoEnhance
                    >
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <!-- Penyokong Card -->

                            <b class="text-sm text-system-primary"
                                >Keputusan Penyokong</b
                            >
                            <!-- <CustomTextField
                            id="supporterName"
                            label="Nama Penyokong"
                            errors={$supporterInfoError.supporterName}
                            bind:val={$supporterInfoForm.supporterName}
                        ></CustomTextField> -->
                            <CustomRadioBoolean
                                disabled={false}
                                id="status"
                                label="Status"
                                errors={$supporterInfoError.status}
                                options={supportOptions}
                                bind:val={$supporterInfoForm.status}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                id="remark"
                                label="Tindakan/Ulasan"
                                errors={$supporterInfoError.remark}
                                bind:val={$supporterInfoForm.remark}
                            ></CustomTextField>
                            <!-- <CustomTextField
                            id="supportedDate"
                            type="date"
                            label="Tarikh Diluluskan"
                            errors={$supporterInfoError.supportedDate}
                            bind:val={$supporterInfoForm.supportedDate}
                        ></CustomTextField> -->
                            <hr />
                        </div>
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}

        {#if currentRoleCode === pelulus}
            <StepperContent>
                <StepperContentHeader
                    title="Sila Tetapkan Keputusan Anda - Pelulus "
                >
                    <TextIconButton
                        label="simpan"
                        type="primary"
                        icon="check"
                        form="approverDetail"
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Keputusan akan dihantar ke peranan - peranan berkaitan."
                    ></ContentHeader>
                    <form
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        id="approverDetail"
                        method="POST"
                        use:approverInfoEnhance
                    >
                        <!-- Pelulus Card -->
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <div>
                                <b class="text-sm text-system-primary"
                                    >Pelulus</b
                                >
                            </div>
                            <!-- <CustomTextField
                            type="text"
                            id="approverName"
                            label="Nama"
                            errors={$approverInfoError.approverName}
                            bind:val={$approverInfoForm.approverName}
                        ></CustomTextField> -->
                            <CustomRadioBoolean
                                disabled={false}
                                id="status"
                                label="Status"
                                errors={$approverInfoError.status}
                                options={approveOptions}
                                bind:val={$approverInfoForm.status}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                id="remark"
                                label="Tindakan/Ulasan"
                                errors={$approverInfoError.remark}
                                bind:val={$approverInfoForm.remark}
                            ></CustomTextField>
                            <!-- <CustomTextField
                            id="approvedDate"
                            label="Tarikh Diluluskan"
                            errors={$approverInfoError.approvedDate}
                            bind:val={$approverInfoForm.approvedDate}
                        ></CustomTextField> -->
                            <div class="flex w-full flex-row text-sm"></div>
                        </div>
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
<Toaster></Toaster>
