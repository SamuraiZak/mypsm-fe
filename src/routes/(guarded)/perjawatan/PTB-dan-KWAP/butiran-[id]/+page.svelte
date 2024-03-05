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
        _personalInfoSubmit,
        _serviceInfoSubmit,
        _resultInfoSubmit,
        _PTBInfoSubmit,
        _meetingInfoSubmit,
        _supporterInfoSubmit,
        _passerInfoSubmit,
    } from './+page';
    import {
        _personalInfoSchema,
        _serviceInfoSchema,
        _PTBInfoSchema,
        _resultInfoSchema,
        _meetingInfoSchema,
        _supporterInfoSchema,
        _passerInfoSchema,
    } from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';

    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';

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
    export let data: PageData;

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
    } = superForm(data.personalInfoForm, {
        SPA: true,
        id: 'personalDetail',
        validators: _personalInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _personalInfoSubmit($personalInfoForm).then((value) => {
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
        form: serviceInfoForm,
        errors: serviceInfoError,
        enhance: serviceInfoEnhance,
    } = superForm(data.serviceInfoForm, {
        SPA: true,
        id: 'serviceDetail',
        validators: _serviceInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _serviceInfoSubmit($serviceInfoForm).then((value) => {
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
        form: PTBInfoForm,
        errors: PTBInfoError,
        enhance: PTBInfoEnhance,
    } = superForm(data.PTBInfoForm, {
        SPA: true,
        id: 'PTBDetail',
        validators: _PTBInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _PTBInfoSubmit($PTBInfoForm).then((value) => {
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
        form: resultInfoForm,
        errors: resultInfoError,
        enhance: resultInfoEnhance,
    } = superForm(data.resultInfoForm, {
        SPA: true,
        id: 'resultDetail',
        validators: _resultInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _resultInfoSubmit($resultInfoForm).then((value) => {
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
        form: meetingInfoForm,
        errors: meetingInfoError,
        enhance: meetingInfoEnhance,
    } = superForm(data.meetingInfoForm, {
        SPA: true,
        id: 'meetingDetail',
        validators: _meetingInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _meetingInfoSubmit($meetingInfoForm).then((value) => {
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
        form: supporterInfoForm,
        errors: supporterInfoError,
        enhance: supporterInfoEnhance,
    } = superForm(data.supporterInfoForm, {
        SPA: true,
        id: 'supporterDetail',
        validators: _supporterInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _supporterInfoSubmit($supporterInfoForm).then((value) => {
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
        form: passerInfoForm,
        errors: passerInfoError,
        enhance: passerInfoEnhance,
    } = superForm(data.passerInfoForm, {
        SPA: true,
        id: 'passerDetail',
        validators: _passerInfoSchema,
        onUpdate(event) {},
        onSubmit() {
            _passerInfoSubmit($passerInfoForm).then((value) => {
                result = value?.result;
                if (result == 'success') {
                    getLoginSuccessToast();
                } else {
                    getErrorToast();
                }
            });
        },
    });
    console.log(data.serviceDetails);
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Permohonan Pemberian Taraf Berpencen"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('../PTB-dan-KWAP');
            }}
        /></ContentHeader
    >
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <!-- {#if editingCandidateList} -->
            <StepperContentBody>
                <form
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                    id="personalDetail"
                    method="POST"
                    use:personalInfoEnhance
                >
                    <b class="text-sm text-system-primary">Maklumat Peribadi</b>

                    <CustomTextField
                        disabled
                        type="text"
                        id="employeeNo"
                        label="No. Pekerja"
                        errors={$personalInfoError.employeeNo}
                        val={data.personalDetails.employeeNo}
                    ></CustomTextField>
                    <!-- <CustomTextField
                        type="date"
                        id="service-status"
                        label="Status Pekerjaan"
                        val=""
                    ></CustomTextField> -->
                    <!-- <CustomTextField
                        type="date"
                        id="inactive-date-"
                        label="Tarikh Kuatkuasa Tidak Aktif"
                        val=""
                    ></CustomTextField> -->
                    <CustomTextField
                        disabled
                        type="text"
                        id="name"
                        label="Nama Penuh"
                        errors={$personalInfoError.name}
                        bind:val={data.personalDetails.name}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="otherName"
                        label="Nama Lain"
                        errors={$personalInfoError.otherName}
                        bind:val={data.personalDetails.otherName}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="identityCard"
                        label="No. K/P"
                        errors={$personalInfoError.identityCard}
                        bind:val={data.personalDetails.identityCard}
                    ></CustomTextField>
                    <CustomSelectField
                        disabled
                        id="identityCardColor"
                        label="Warna K/P"
                        errors={$personalInfoError.identityCardColor}
                        bind:val={data.personalDetails.identityCardColor}
                        options={data.selectionOptions.identityCardColorLookup}
                    ></CustomSelectField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="dateOfBirth"
                        label="Tarikh Lahir"
                        errors={$personalInfoError.dateOfBirth}
                        bind:val={data.personalDetails.dateOfBirth}
                    ></CustomTextField>

                    <CustomSelectField
                        disabled
                        id="placeOfBirth"
                        label="Tempat Lahir"
                        errors={$personalInfoError.placeOfBirth}
                        bind:val={data.personalDetails.placeOfBirth}
                        options={data.selectionOptions.stateLookup}
                    ></CustomSelectField>
                    <CustomSelectField
                        disabled
                        id="nationality"
                        label="Warganegara"
                        errors={$personalInfoError.nationality}
                        bind:val={data.personalDetails.nationality}
                        options={data.selectionOptions.nationalityLookup}
                    ></CustomSelectField>
                    <CustomSelectField
                        disabled
                        id="race-"
                        label="Bangsa"
                        errors={$personalInfoError.race}
                        bind:val={data.personalDetails.race}
                        options={data.selectionOptions.raceLookup}
                    ></CustomSelectField>
                    <CustomSelectField
                        disabled
                        id="religion"
                        label="Agama"
                        errors={$personalInfoError.religion}
                        bind:val={data.personalDetails.religion}
                        options={data.selectionOptions.religionLookup}
                    ></CustomSelectField>
                    <CustomSelectField
                        disabled
                        id="gender"
                        label="Jantina"
                        errors={$personalInfoError.gender}
                        bind:val={data.personalDetails.gender}
                        options={data.selectionOptions.genderLookup}
                    ></CustomSelectField>
                    <CustomTextField
                        disabled
                        type="text"
                        id="status"
                        label="Status"
                        errors={$personalInfoError.status}
                        bind:val={data.personalDetails.status}
                    ></CustomTextField>
                    <!-- <CustomTextField
                        type="email"
                        id="email"
                        label="Emel"
                        errors={$personalInfoError.email}
                        bind:val={data.personalDetails.email}
                    ></CustomTextField> -->
                    <CustomTextField
                        disabled
                        id="homeAddress"
                        label="Alamat Rumah"
                        errors={$personalInfoError.homeAddress}
                        bind:val={data.personalDetails.homeAddress}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="homeNo"
                        label="Telefon Rumah"
                        errors={$personalInfoError.homeNo}
                        bind:val={data.personalDetails.homeNo}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="mobileNo"
                        label="Telefon Sendiri"
                        errors={$personalInfoError.mobileNo}
                        bind:val={data.personalDetails.mobileNo}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="housing"
                        label="Perumahan"
                        errors={$personalInfoError.housing}
                        bind:val={data.personalDetails.housing}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="houseLoan"
                        label="Pinjaman Rumah"
                        errors={$personalInfoError.houseLoan}
                        bind:val={data.personalDetails.houseLoan}
                    ></CustomTextField>
                    <!-- <CustomTextField
                        type="text"
                        id="home-phone-"
                        label="No. Telefon Rumah"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="mobile-phone-"
                        label="No. Telefon Bimbit"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="home-"
                        label="Perumahan"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="loaned-home-"
                        label="Pinjaman Perumahan"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="loaned-vehicle-"
                        label="Pinjaman Kenderaam"
                        val=""
                    ></CustomTextField> -->
                    <CustomSelectField
                        disabled
                        id="isExPoliceOrSoldier"
                        label="Bekas Polis/Tentera"
                        errors={$personalInfoError.isExPoliceOrSoldier}
                        bind:val={data.personalDetails.isExPoliceOrSoldier}
                        options={data.selectionOptions.generalLookup}
                    />
                    <div class="pt-5">
                        <b class="text-sm text-system-primary"
                            >Maklumat Pertalian Dengan Kakitangan LKIM
                        </b>
                    </div>
                    <!-- <RadioSingle
        
        {options}
        legend="Pertalian Dengan Kakitangan LKIM"
        bind:userSelected={radioValueRelationToStaff}
    /> -->
                    <CustomSelectField
                        disabled
                        id="isInternalRelationship"
                        label="Pertalian Dengan Kakitangan LKIM"
                        errors={$personalInfoError.isInternalRelationship}
                        bind:val={data.personalDetails.isInternalRelationship}
                        options={data.selectionOptions.generalLookup}
                    />
                    <CustomTextField
                        disabled
                        type="text"
                        id="employeeNumber"
                        label="No. Pekerja Kakitangan LKIM"
                        errors={$personalInfoError.employeeNumber}
                        bind:val={data.personalDetails.employeeNumber}
                    ></CustomTextField>
                    <CustomSelectField
                        disabled
                        id="employeeName"
                        label="Nama Kakitangan LKIM"
                        errors={$personalInfoError.employeeName}
                        bind:val={data.personalDetails.employeeName}
                        options={data.selectionOptions.employeeLookup}
                    ></CustomSelectField>
                    <CustomSelectField
                        disabled
                        id="employeePosition"
                        label="Jawatan Kakitangan LKIM"
                        errors={$personalInfoError.employeePosition}
                        bind:val={data.personalDetails.employeePosition}
                        options={data.selectionOptions.positionLookup}
                    ></CustomSelectField>
                    <CustomSelectField
                        disabled
                        id="relationshipId"
                        label="Hubungan dengan Kakitangan LKIM"
                        errors={$personalInfoError.relationshipId}
                        bind:val={data.personalDetails.relationshipId}
                        options={data.selectionOptions.relationshipLookup}
                    ></CustomSelectField>
                </form>
            </StepperContentBody>
            <!-- {:else} -->

            <!-- {/if} -->
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
                        id="grade"
                        label={'Gred Semasa'}
                        type="text"
                        errors={$serviceInfoError.grade}
                        bind:val={$serviceInfoForm.grade}
                    ></CustomTextField>
                    <CustomTextField
                        id="position"
                        label={'Jawatan'}
                        type="text"
                        errors={$serviceInfoError.position}
                        bind:val={$serviceInfoForm.position}
                    ></CustomTextField>

                    <CustomTextField
                        id="placement"
                        label={'Penempatan'}
                        type="text"
                        errors={$serviceInfoError.placement}
                        bind:val={$serviceInfoForm.placement}
                    ></CustomTextField>

                    <CustomTextField
                        id="serviceLevel"
                        label={'Taraf Perkhidmatan'}
                        type="text"
                        errors={$serviceInfoError.serviceLevel}
                        bind:val={$serviceInfoForm.serviceLevel}
                    ></CustomTextField>

                    <!-- <RadioButton
                        
                        options={faedahPersaraanOptions}
                        legend={'Faedah Persaraan'}
                        bind:userSelected={isFaedahKWSP}
                    ></RadioButton>  -->

                    <CustomRadioBoolean
                        id="retirementType"
                        options={retirementBenefitOption}
                        label="Faedah Persaraan"
                        errors={$serviceInfoError.retirementType}
                        bind:val={$serviceInfoForm.retirementType}
                    />

                    <CustomTextField
                        id="EPFNumber"
                        label={'No. KWSP'}
                        type="text"
                        errors={$serviceInfoError.EPFNumber}
                        bind:val={$serviceInfoForm.EPFNumber}
                    ></CustomTextField>
                    <CustomTextField
                        id="SOCSONumber"
                        label={'No. SOCSO'}
                        type="text"
                        errors={$serviceInfoError.SOCSONumber}
                        bind:val={$serviceInfoForm.SOCSONumber}
                    ></CustomTextField>
                    <CustomTextField
                        id="incomeNumber"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        errors={$serviceInfoError.incomeNumber}
                        bind:val={$serviceInfoForm.incomeNumber}
                    ></CustomTextField>
                    <CustomTextField
                        id="bankName"
                        label={'Bank'}
                        type="text"
                        errors={$serviceInfoError.bankName}
                        bind:val={$serviceInfoForm.bankName}
                    ></CustomTextField>
                    <CustomTextField
                        id="bankAccount"
                        label={'No. Akaun'}
                        type="text"
                        errors={$serviceInfoError.bankAccount}
                        bind:val={$serviceInfoForm.bankAccount}
                    ></CustomTextField>
                    <CustomTextField
                        id="program"
                        label={'Program'}
                        type="text"
                        errors={$serviceInfoError.program}
                        bind:val={$serviceInfoForm.program}
                    ></CustomTextField>
                    <CustomTextField
                        id="leaveEntitlement"
                        label={'Kelayakan Cuti'}
                        type="text"
                        errors={$serviceInfoError.leaveEntitlement}
                        bind:val={$serviceInfoForm.leaveEntitlement}
                    ></CustomTextField>
                    <CustomTextField
                        id="hireByGovermentDate"
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                        type="text"
                        errors={$serviceInfoError.hireByGovermentDate}
                        bind:val={$serviceInfoForm.hireByGovermentDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="hireByLKIMDate"
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                        type="text"
                        errors={$serviceInfoError.hireByLKIMDate}
                        bind:val={$serviceInfoForm.hireByLKIMDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="currentServiceStartDate"
                        label={'Mula Dilantik Perkhidmatan Sekarang'}
                        type="text"
                        errors={$serviceInfoError.currentServiceStartDate}
                        bind:val={$serviceInfoForm.currentServiceStartDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="firstServiceConfirmedDate"
                        label={'Disahkan Dalam Jawatan Pertama LKIM'}
                        type="text"
                        errors={$serviceInfoError.firstServiceConfirmedDate}
                        bind:val={$serviceInfoForm.firstServiceConfirmedDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="currentServiceConfirmedDate"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        type="text"
                        errors={$serviceInfoError.currentServiceConfirmedDate}
                        bind:val={$serviceInfoForm.currentServiceConfirmedDate}
                    ></CustomTextField>

                    <!-- <AccordianField
                        disabled={editable}
                        label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
                        header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
                    > 

                        <{#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->

                    <!-- <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                                ? 'text-txt-tertiary'
                                : 'text-txt-primary'}
                                                    hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            >{'i + 1'}. {'val'}</label
                        > -->
                    <!-- {/each} -->
                    <!-- </AccordianField>
                             -->
                    <!-- <CustomTextField
                            id="tarikhKelulusanPercantumanPerkhidmatanLepas"
                            label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField> -->
                    <!-- <CustomTextField
                        id="currentActing"
                        label={'Pemangkuan Sekarang'}
                        type="text"
                        errors={$serviceInfoError.currentActing}
                        bind:val={data.serviceDetails.currentActing}
                    ></CustomTextField>
                    <CustomTextField
                        id="confirmDate"
                        label={'Tarikh Disahkan'}
                        type="text"
                        errors={$serviceInfoError.confirmDate}
                        bind:val={data.serviceDetails.confirmDate}
                    ></CustomTextField> -->
                    <!-- <CustomTextField
                            id="tanggungKerjaSekarang"
                            label={'Tanggung Kerja Sekarang'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField> -->
                    <!-- <CustomTextField
                            id="skimPencen"
                            label={'Skim Pencen'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField> -->
                    <!-- <CustomTextField
                            id="lastSalary"
                            label={'Kenaikan Gaji Akhir'}
                            type="text"
                            errors={$serviceInfoError.lastSalary}
                            bind:val={data.serviceDetails.lastSalary}
                        ></CustomTextField>
                        <CustomTextField
                            id="lastPromotion"
                            label={'Kenaikan Pangkat Akhir'}
                            type="text"
                            errors={$serviceInfoError.lastPromotion}
                            bind:val={data.serviceDetails.lastPromotion}
                        ></CustomTextField>
                    <CustomTextField
                        id="kgt"
                        label={'Bulan KGT'}
                        type="text"
                        errors={$serviceInfoError.kgt}
                        bind:val={data.serviceDetails.kgt}
                    ></CustomTextField>
                    <CustomTextField
                        id="retirementDate"
                        label={'Tarikh Bersara'}
                        type="text"
                        errors={$serviceInfoError.retirementDate}
                        bind:val={data.serviceDetails.retirementDate}
                    ></CustomTextField>
                    <b class="text-sm text-system-primary"
                        >Maklumat Gaji dan Elaun - Elaun</b
                    > -->
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
                        form="PTBDetail"
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        id="PTBDetail"
                        method="POST"
                        use:PTBInfoEnhance
                    >
                        <CustomTextField
                            id="applicationDate"
                            type="date"
                            label="Tarikh Permohonan"
                            errors={$PTBInfoError.applicationDate}
                            bind:val={$PTBInfoForm.applicationDate}
                        ></CustomTextField>
                        <CustomTextField
                            id="PTBdate"
                            type="date"
                            label="Tarikh Diberi PTB"
                            errors={$PTBInfoError.PTBdate}
                            bind:val={$PTBInfoForm.PTBdate}
                        ></CustomTextField>
                        <CustomTextField
                            id="referenceNumber"
                            type="text"
                            label="No. Rujukan Surat JPA"
                            errors={$PTBInfoError.referenceNumber}
                            bind:val={$PTBInfoForm.referenceNumber}
                        ></CustomTextField>

                        <CustomTextField
                            id="referenceDate"
                            type="date"
                            label="Tarikh Rujukan"
                            errors={$PTBInfoError.refrenceDate}
                            bind:val={$PTBInfoForm.refrenceDate}
                        ></CustomTextField>
                        <CustomTextField
                            id="status"
                            type="date"
                            label="Status"
                            errors={$PTBInfoError.status}
                            bind:val={$PTBInfoForm.status}
                        ></CustomTextField>
                        <CustomTextField
                            id="remark"
                            type="date"
                            label="Catatan"
                            errors={$PTBInfoError.remark}
                            bind:val={$PTBInfoForm.remark}
                        ></CustomTextField>

                        <CustomTextField
                            id="pensionNumber"
                            type="date"
                            label="No. Pencen"
                            errors={$PTBInfoError.pensionNumber}
                            bind:val={$PTBInfoForm.pensionNumber}
                        ></CustomTextField>

                        <CustomTextField
                            id="KWAPEmailDate"
                            type="date"
                            label="Tarikh Emel (KWAP)"
                            errors={$PTBInfoError.KWAPEmailDate}
                            bind:val={$PTBInfoForm.KWAPEmailDate}
                        ></CustomTextField>
                    </form></StepperContentBody
                >
            </StepperContent>

            <!-- Peranan -Peranan Berkaitan -->
            <StepperContent>
                <StepperContentHeader
                    title="Masukkan Maklumat Peranan - Peranan Berkaitan"
                >
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="newEmploymentAssignApproverSupporterForm"
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Masukkan nama Penyokong dan Pelulus (Jika Sah)"
                    ></ContentHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    ></div>
                    <CustomSelectField
                        id="staffSupporter"
                        label="Nama Penyokong"
                        val=" "
                    />

                    <CustomSelectField
                        id="staffApprover"
                        label="Nama Pelulus"
                        val=" "
                    />
                </StepperContentBody>
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
                        form="resultDetail"
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        id="resultDetail"
                        method="POST"
                        use:resultInfoEnhance
                    >
                        <div class="flex w-full flex-col gap-2.5">
                            {#if status === 'SOKONG'}
                                <div
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Penyokong</b
                                        >
                                    </div>
                                    <CustomTextField
                                        type="text"
                                        id="supporterName"
                                        label="Nama"
                                        errors={$resultInfoError.supporterName}
                                        bind:val={$resultInfoForm.supporterName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="supportedStatus"
                                        label="TUlasan"
                                        errors={$resultInfoError.supportedStatus}
                                        bind:val={$resultInfoForm.supportedStatus}
                                    ></CustomTextField>
                                    <CustomTextField
                                    id="supportedRemark"
                                    label="Tindakan"
                                    errors={$resultInfoError.supportedRemark}
                                    bind:val={$resultInfoForm.supportedRemark}
                                ></CustomTextField>
                                    <div class="flex w-full flex-row text-sm">
                                        <label
                                            for="supporter-result"
                                            class="w-[220px]">Keputusan</label
                                        >
                                    </div>
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
                                        type="text"
                                        id="approverName"
                                        label="Nama"
                                        errors={$resultInfoError.approverName}
                                        bind:val={$resultInfoForm.approverName}
                                    ></CustomTextField>
                                    <div class="text-sm text-system-primary">
                                        <i class=""
                                            ><li>
                                                ● Menunggu keputusan daripada
                                                PENYOKONG.
                                            </li></i
                                        >
                                    </div>
                                </div>
                            {:else if status === 'LULUS'}
                                <div
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Penyokong</b
                                        >
                                    </div>
                                    <CustomTextField
                                        type="text"
                                        id="supporterName"
                                        label="Nama"
                                        errors={$resultInfoError.supporterName}
                                        bind:val={$resultInfoForm.supporterName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="supportedStatus"
                                        label="Tindakan/Ulasan"
                                        errors={$resultInfoError.supportedStatus}
                                        bind:val={$resultInfoForm.supportedStatus}
                                    ></CustomTextField>
                                    <div class="flex w-full flex-row text-sm">
                                        <label
                                            for="supporter-result"
                                            class="w-[220px]">Keputusan</label
                                        >
                                    </div>
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
                                        type="text"
                                        id="approverName"
                                        label="Nama"
                                        errors={$resultInfoError.approverName}
                                        bind:val={$resultInfoForm.approverName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="approvedStatus"
                                        label="Ulasan"
                                        errors={$resultInfoError.approvedStatus}
                                        bind:val={$resultInfoForm.approvedStatus}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="approvedRemark"
                                        label="Tindakan"
                                        errors={$resultInfoError.approvedRemark}
                                        bind:val={$resultInfoForm.approvedRemark}
                                    ></CustomTextField>
                                    <div class="flex w-full flex-row text-sm">
                                        <label
                                            for="approver-result"
                                            class="w-[220px]">Keputusan</label
                                        >
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </form></StepperContentBody
                >
            </StepperContent>

            <!-- Kemaskini Maklumat Temuduga -->
            <StepperContent>
                <StepperContentHeader title="Maklumat PTB dan KWAP">
                    <TextIconButton
                        label="simpan"
                        type="primary"
                        icon="check"
                        form="meetingDetail"
                    ></TextIconButton></StepperContentHeader
                >
                <StepperContentBody>
                    <ContentHeader
                        title="Semak dan kemaskini maklumat temuduga bagi calon-calon berikut untuk menjana surat tawaran temuduga"
                    ></ContentHeader>
                    <StepperContent>
                        <StepperContentBody>
                            <form
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                                id="meetingDetail"
                                method="POST"
                                use:meetingInfoEnhance
                            >
                                <CustomTextField
                                    id="PTBDate"
                                    type="date"
                                    label="Tarikh Diberi PTB"
                                    errors={$meetingInfoError.PTBDate}
                                    bind:val={$meetingInfoForm.PTBDate}
                                ></CustomTextField>

                                <CustomTextField
                                    id="referenceNumber"
                                    type="text"
                                    label="No. Rujukan Surat JPA"
                                    errors={$meetingInfoError.referenceNumber}
                                    bind:val={$meetingInfoForm.referenceNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    id="referenceDate"
                                    type="date"
                                    label="Tarikh Rujukan"
                                    errors={$meetingInfoError.referenceDate}
                                    bind:val={$meetingInfoForm.referenceDate}
                                ></CustomTextField>

                                <CustomTextField
                                    id="pensionNumber"
                                    type="date"
                                    label="No. Pencen"
                                    errors={$meetingInfoError.pensionNumber}
                                    bind:val={$meetingInfoForm.pensionNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    id="KWAPEmailDate"
                                    type="date"
                                    label="Tarikh Emel (KWAP)"
                                    errors={$meetingInfoError.KWAPEmailDate}
                                    bind:val={$meetingInfoForm.KWAPEmailDate}
                                ></CustomTextField>
                            </form></StepperContentBody
                        >
                    </StepperContent>
                </StepperContentBody>
            </StepperContent>
            {#if currentRoleCode === penyokong}
                <StepperContent>
                    <StepperContentHeader
                        title="Sila Tetapkan Keputusan Anda - Penyokong"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="supporterResultForm"
                        >
                            <SvgCheck></SvgCheck>
                        </TextIconButton>
                    </StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Keputusan akan dihantar ke peranan - peranan berkaitan."
                        >
                            <TextIconButton
                                label="simpan"
                                type="primary"
                                icon="check"
                                form="supporterDetail"
                            ></TextIconButton></ContentHeader
                        >
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
                                <CustomTextField
                                    id="supporterName"
                                    label="Nama Penyokong"
                                    errors={$supporterInfoError.supporterName}
                                    bind:val={$supporterInfoForm.supporterName}
                                ></CustomTextField>
                                <CustomTextField
                                    id="supportedStatus"
                                    label="Status"
                                    errors={$supporterInfoError.supportedStatus}
                                    bind:val={$supporterInfoForm.supportedStatus}
                                ></CustomTextField>
                                <CustomTextField
                                    id="supportedRemark"
                                    label="Tindakan/Ulasan"
                                    errors={$supporterInfoError.supportedRemark}
                                    bind:val={$supporterInfoForm.supportedRemark}
                                ></CustomTextField>
                                <CustomTextField
                                    id="supportedDate"
                                    label="Tindakan/Ulasan"
                                    errors={$supporterInfoError.supportedDate}
                                    bind:val={$supporterInfoForm.supportedDate}
                                ></CustomTextField>
                                <!-- <RadioSingle
                        name="supporterResult"
                        disabled={!editable}
                        options={supportOptions}
                        legend={'Keputusan'}
                        bind:userSelected={isSupported}
                        ></RadioSingle> -->

                                <hr />
                            </div>
                            <!-- Pelulus Card -->
                            <!-- <div
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            >
                                <div>
                                    <b class="text-sm text-system-primary"
                                        >Pelulus</b
                                    >
                                </div>
                                <CustomTextField
                                    type="text"
                                    id="passerName"
                                    label="Nama"
                                    errors={$supporterInfoError.supporterName}
                                    bind:val={$supporterInfoForm.supporterName}
                                ></CustomTextField>
                                <div class="text-sm text-system-primary">
                                    <i class=""
                                        ><li>
                                            ● Menunggu keputusan daripada
                                            PENYOKONG.
                                        </li></i
                                    >
                                </div>
                            </div> -->
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            {#if currentRoleCode === pelulus}
                <StepperContent>
                    <StepperContentHeader
                        title="Sila Tetapkan Keputusan Anda - Penyokong"
                    >
                        <TextIconButton
                            label="simpan"
                            type="primary"
                            icon="check"
                            form="supporterDetail"
                        ></TextIconButton>
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

                                <!-- <b class="text-sm text-system-primary"
                                    >Keputusan Penyokong</b
                                > -->

                                <!-- <CustomTextField
                                    id="supporterResult"
                                    label="Tindakan/Ulasan"
                                    errors={$passerInfoError.supporterResult}
                                    bind:val={$passerInfoForm.supporterResult}
                                ></CustomTextField>
                                <CustomTextField
                                    id="supporterRemark"
                                    label="Tindakan/Ulasan"
                                    errors={$passerInfoError.supporterRemark}
                                    bind:val={$passerInfoForm.supporterRemark}
                                ></CustomTextField> -->
                                <!-- <RadioSingle
                        name="supporterResult"
                        disabled={!editable}
                        options={supportOptions}
                        legend={'Keputusan'}
                        bind:userSelected={isSupported}
                        ></RadioSingle> -->

                                <hr />
                            </div>
                            <!-- Pelulus Card -->
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            >
                                <div>
                                    <b class="text-sm text-system-primary"
                                        >Pelulus</b
                                    >
                                </div>
                                <CustomTextField
                                    type="text"
                                    id="approverName"
                                    label="Nama"
                                    errors={$passerInfoError.approverName}
                                    bind:val={$passerInfoForm.approverName}
                                ></CustomTextField>
                                <CustomTextField
                                    id="approvedStatus"
                                    label="Status"
                                    errors={$passerInfoError.approvedStatus}
                                    bind:val={$passerInfoForm.approvedStatus}
                                ></CustomTextField>

                                <CustomTextField
                                    id="approvedRemark"
                                    label="Tindakan/Ulasan"
                                    errors={$passerInfoError.approvedRemark}
                                    bind:val={$passerInfoForm.approvedRemark}
                                ></CustomTextField>
                                <CustomTextField
                                    id="approvedDate"
                                    label="Tarikh Diluluskan"
                                    errors={$passerInfoError.approvedDate}
                                    bind:val={$passerInfoForm.approvedDate}
                                ></CustomTextField>
                                <div class="flex w-full flex-row text-sm">
                                    <label
                                        for="supporter-result"
                                        class="w-[220px]">Keputusan</label
                                    >
                                </div>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    </Stepper>
</section>
