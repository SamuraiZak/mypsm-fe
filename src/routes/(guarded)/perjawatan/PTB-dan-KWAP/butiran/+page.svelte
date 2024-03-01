<!-- Add your changes to the commented parts -->

<script lang="ts">
    import { goto } from '$app/navigation';

    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import {
        Dropdown,
        RadioButton,
        Badge,
        type SelectOptionType,
    } from 'flowbite-svelte';
    import { _personalInfoSubmit, _serviceInfoSubmit } from './+page';
    import {
        _personalInfoSchema,
        _serviceInfoSchema,
        _PTBInfoSchema,
    } from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
    import { superForm } from 'sveltekit-superforms/client';

    import { onMount } from 'svelte';

    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    // import type { PageData } from '../tambah-rekod/$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { PageData } from './$types';
    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';

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
            <StepperContentHeader title="Maklumat Kakitangan">
                <TextIconButton
                    label="simpan"
                    type="primary"
                    icon="check"
                    form="personalDetail"
                ></TextIconButton>
            </StepperContentHeader>
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
                        type="text"
                        id="id"
                        label="No. Pekerja"
                        errors={$personalInfoError.id}
                        bind:val={$personalInfoForm.id}
                    ></CustomTextField>
                    <CustomTextField
                        type="date"
                        id="service-status"
                        label="Status Pekerjaan"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="date"
                        id="inactive-date-"
                        label="Tarikh Kuatkuasa Tidak Aktif"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="name"
                        label="Nama Penuh"
                        errors={$personalInfoError.name}
                        bind:val={$personalInfoForm.name}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="alternativeName"
                        label="Nama Lain"
                        errors={$personalInfoError.alternativeName}
                        bind:val={$personalInfoForm.alternativeName}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="identityDocumentNumber"
                        label="No. K/P"
                        errors={$personalInfoError.identityDocumentNumber}
                        bind:val={$personalInfoForm.identityDocumentNumber}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="identityDocumentColor"
                        label="Warna K/P"
                        errors={$personalInfoError.identityDocumentColor}
                        bind:val={$personalInfoForm.identityDocumentColor}
                    ></CustomTextField>
                    <CustomTextField
                        type="date"
                        id="birthDate"
                        label="Tarikh Lahir"
                        errors={$personalInfoError.birthDate}
                        bind:val={$personalInfoForm.birthDate}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="birthStateId"
                        label="Tempat Lahir"
                        errors={$personalInfoError.birthStateId}
                        bind:val={$personalInfoForm.birthStateId}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="nationalityId"
                        label="Warganegara"
                        errors={$personalInfoError.nationalityId}
                        bind:val={$personalInfoForm.nationalityId}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="raceId-"
                        label="Bangsa"
                        errors={$personalInfoError.raceId}
                        bind:val={$personalInfoForm.raceId}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="religionId"
                        label="Agama"
                        errors={$personalInfoError.religionId}
                        bind:val={$personalInfoForm.religionId}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="genderId"
                        label="Jantina"
                        errors={$personalInfoError.genderId}
                        bind:val={$personalInfoForm.genderId}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="titleId"
                        label="Status"
                        errors={$personalInfoError.titleId}
                        bind:val={$personalInfoForm.titleId}
                    ></CustomTextField>
                    <CustomTextField
                        type="email"
                        id="email"
                        label="Emel"
                        errors={$personalInfoError.email}
                        bind:val={$personalInfoForm.email}
                    ></CustomTextField>
                    <CustomTextField
                        id="homeAddress"
                        label="Alamat Rumah"
                        errors={$personalInfoError.homeAddress}
                        bind:val={$personalInfoForm.homeAddress}
                    ></CustomTextField>
                    <CustomTextField
                        id="mailAddress"
                        label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                        errors={$personalInfoError.mailAddress}
                        bind:val={$personalInfoForm.mailAddress}
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
                    <CustomRadioBoolean
                        id="isExPoliceOrSoldier"
                        options={supporterResultOption}
                        label="Bekas Polis/Tentera"
                        errors={$personalInfoError.isExPoliceOrSoldier}
                        bind:val={$personalInfoForm.isExPoliceOrSoldier}
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
                    <CustomRadioBoolean
                        id="isInternalRelationship"
                        options={supporterResultOption}
                        label="Pertalian Dengan Kakitangan LKIM"
                        errors={$personalInfoError.isInternalRelationship}
                        bind:val={$personalInfoForm.isInternalRelationship}
                    />
                    <CustomTextField
                        type="text"
                        id="employeeNumber"
                        label="No. Pekerja Kakitangan LKIM"
                        errors={$personalInfoError.employeeNumber}
                        bind:val={$personalInfoForm.employeeNumber}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="employeeName"
                        label="Nama Kakitangan LKIM"
                        errors={$personalInfoError.employeeName}
                        bind:val={$personalInfoForm.employeeName}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="employeePosition"
                        label="Jawatan Kakitangan LKIM"
                        errors={$personalInfoError.employeePosition}
                        bind:val={$personalInfoForm.employeePosition}
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="relationshipId"
                        label="Hubungan dengan Kakitangan LKIM"
                        errors={$personalInfoError.relationshipId}
                        bind:val={$personalInfoForm.relationshipId}
                    ></CustomTextField>
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
                        id="gradeId"
                        label={'Gred Semasa'}
                        type="text"
                        errors={$serviceInfoError.gradeId}
                        bind:val={$serviceInfoForm.gradeId}
                    ></CustomTextField>
                    <CustomTextField
                        id="positionId"
                        label={'Jawatan'}
                        type="text"
                        errors={$serviceInfoError.positionId}
                        bind:val={$serviceInfoForm.positionId}
                    ></CustomTextField>

                    <CustomTextField
                        id="placementId"
                        label={'Penempatan'}
                        type="text"
                        errors={$serviceInfoError.placementId}
                        bind:val={$serviceInfoForm.placementId}
                    ></CustomTextField>

                    <CustomTextField
                        id="serviceTypeId"
                        label={'Taraf Perkhidmatan'}
                        type="text"
                        errors={$serviceInfoError.serviceTypeId}
                        bind:val={$serviceInfoForm.serviceTypeId}
                    ></CustomTextField>

                    <!-- <RadioButton
                        
                        options={faedahPersaraanOptions}
                        legend={'Faedah Persaraan'}
                        bind:userSelected={isFaedahKWSP}
                    ></RadioButton>  -->

                    <CustomRadioBoolean
                        id="retirementBenefit"
                        options={retirementBenefitOption}
                        label="Faedah Persaraan"
                        errors={$serviceInfoError.retirementBenefit}
                        bind:val={$serviceInfoForm.retirementBenefit}
                    />

                    <CustomTextField
                        id="epfNumber"
                        label={'No. KWSP'}
                        type="text"
                        errors={$serviceInfoError.epfNumber}
                        bind:val={$serviceInfoForm.epfNumber}
                    ></CustomTextField>
                    <CustomTextField
                        id="socsoNumber"
                        label={'No. SOCSO'}
                        type="text"
                        errors={$serviceInfoError.socsoNumber}
                        bind:val={$serviceInfoForm.socsoNumber}
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
                    <!-- <CustomTextField
                            id="program"
                            label={'Program'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField> -->
                    <CustomTextField
                        id="eligibleLeaveCount"
                        label={'Kelayakan Cuti'}
                        type="text"
                        errors={$serviceInfoError.eligibleLeaveCount}
                        bind:val={$serviceInfoForm.eligibleLeaveCount}
                    ></CustomTextField>
                    <CustomTextField
                        id="civilServiceStartDate"
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                        type="date"
                        errors={$serviceInfoError.civilServiceStartDate}
                        bind:val={$serviceInfoForm.civilServiceStartDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="newRecruitEffectiveDate"
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                        type="text"
                        errors={$serviceInfoError.newRecruitEffectiveDate}
                        bind:val={$serviceInfoForm.newRecruitEffectiveDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="firstServiceDate"
                        label={'Mula Dilantik Perkhidmatan Sekarang'}
                        type="date"
                        errors={$serviceInfoError.firstServiceDate}
                        bind:val={$serviceInfoForm.firstServiceDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="firstConfirmServiceDate"
                        label={'Disahkan Dalam Jawatan Pertama LKIM'}
                        type="date"
                        errors={$serviceInfoError.firstConfirmServiceDate}
                        bind:val={$serviceInfoForm.firstConfirmServiceDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="confirmDate"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        type="date"
                        errors={$serviceInfoError.confirmDate}
                        bind:val={$serviceInfoForm.confirmDate}
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
                            id="pemangkuanSekarang"
                            label={'Pemangkuan Sekarang'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
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
                            id="kenaikanGajiAkhir"
                            label={'Kenaikan Gaji Akhir'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="kenaikanPangkatAkhir"
                            label={'Kenaikan Pangkat Akhir'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField> -->
                    <CustomTextField
                        id="kgt"
                        label={'Bulan KGT'}
                        type="text"
                        errors={$serviceInfoError.kgt}
                        bind:val={$serviceInfoForm.kgt}
                    ></CustomTextField>
                    <CustomTextField
                        id="retirementDate"
                        label={'Tarikh Bersara'}
                        type="text"
                        errors={$serviceInfoError.retirementDate}
                        bind:val={$serviceInfoForm.retirementDate}
                    ></CustomTextField>
                    <b class="text-sm text-system-primary"
                        >Maklumat Gaji dan Elaun - Elaun</b
                    >
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <!-- <CustomTextField
                                    id="tarikhBerkuatkuasa"
                                    label={'Tarikh Berkuatkuasa'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField> -->
                            <CustomTextField
                                id="maximumSalary"
                                label={'Tangga Gaji'}
                                type="text"
                                errors={$serviceInfoError.maximumSalary}
                                bind:val={$serviceInfoForm.maximumSalary}
                            ></CustomTextField>
                            <CustomTextField
                                id="baseSalary"
                                label={'Gaji Pokok'}
                                type="text"
                                errors={$serviceInfoError.baseSalary}
                                bind:val={$serviceInfoForm.baseSalary}
                            ></CustomTextField>
                        </div>
                        <!-- hasTooltip={true}
                                toolTipID="type-itka" -->
                        <div class="space-y-2.5">
                            <CustomTextField
                                id="itka"
                                label={'ITKA'}
                                type="text"
                                errors={$serviceInfoError.itka}
                                bind:val={$serviceInfoForm.itka}
                            ></CustomTextField>
                            <CustomTextField
                                id="itp"
                                label={'ITP'}
                                type="text"
                                errors={$serviceInfoError.itp}
                                bind:val={$serviceInfoForm.itp}
                            ></CustomTextField>
                            <CustomTextField
                                id="epw"
                                label={'EPW'}
                                type="text"
                                errors={$serviceInfoError.epw}
                                bind:val={$serviceInfoForm.epw}
                            ></CustomTextField>
                            <CustomTextField
                                id="cola"
                                label={'COLA'}
                                type="text"
                                errors={$serviceInfoError.cola}
                                bind:val={$serviceInfoForm.cola}
                            ></CustomTextField>
                            <!-- Tooltip body -->
                            <!-- <Tooltip
                                    type="dark"
                                    triggeredBy="[id^='type-']"
                                    on:show={assignContent}
                                    >"{tooltipContent}"</Tooltip
                                > -->
                        </div>
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
                            id="PTBDate"
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
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    ></div>

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
                                    id="passer-name"
                                    label="Nama"
                                    val="Mohd Safwan Adam"
                                ></CustomTextField>
                                <CustomTextField
                                    id="supporter-remark"
                                    label="Tindakan/Ulasan"
                                    val="Layak"
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
                                    id="passer-name"
                                    label="Nama"
                                    val=""
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
                                    id="supporter-name"
                                    label="Nama"
                                    val="Mohd Safwan Adam"
                                ></CustomTextField>
                                <CustomTextField
                                    id="supporter-remark"
                                    label="Tindakan/Ulasan"
                                    val="Layak"
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
                                    id="approver-name"
                                    label="Nama"
                                    val="Mohd Safwan Adam"
                                ></CustomTextField>
                                <CustomTextField
                                    id="approver-remark"
                                    label="Tindakan/Ulasan"
                                    val="Layak"
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
                </StepperContentBody>
            </StepperContent>

            <!-- Kemaskini Maklumat Temuduga -->
            <StepperContent>
                <StepperContentHeader title="Maklumat PTB dan KWAP"
                ></StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Semak dan kemaskini maklumat temuduga bagi calon-calon berikut untuk menjana surat tawaran temuduga"
                    ></ContentHeader>
                    <StepperContent>
                        <StepperContentBody>
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            ></div>

                            <CustomTextField
                                id="PTBDate"
                                type="date"
                                label="Tarikh Diberi PTB"
                                val=""
                                placeholder=""
                            ></CustomTextField>

                            <CustomTextField
                                id="referenceNumber"
                                type="text"
                                label="No. Rujukan Surat JPA"
                                placeholder="contoh: 81672178"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="referenceDate"
                                type="date"
                                label="Tarikh Rujukan"
                                val=""
                                placeholder=""
                            ></CustomTextField>

                            <CustomTextField
                                id="pensionNumber"
                                type="date"
                                label="No. Pencen"
                                val=""
                                placeholder=""
                            ></CustomTextField>

                            <CustomTextField
                                id="KWAPEmailDate"
                                type="date"
                                label="Tarikh Emel (KWAP)"
                                val=""
                                placeholder=""
                            ></CustomTextField>
                        </StepperContentBody>
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
                        ></ContentHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            >
                                <div
                                    class="flex max-h-full w-full flex-col items-start justify-start"
                                >
                                    <!-- Penyokong Card -->

                                    <b class="text-sm text-system-primary"
                                        >Keputusan Penyokong</b
                                    >

                                    <CustomTextField
                                        id="supporterResult"
                                        label="Tindakan/Ulasan"
                                        val="Ali bin ABu"
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="supporter-remark"
                                        label="Tindakan/Ulasan"
                                        val=""
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
                                        id="passer-name"
                                        label="Nama"
                                        val=""
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
                            </form>
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            {#if currentRoleCode === pelulus}
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
                        ></ContentHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            >
                                <div
                                    class="flex max-h-full w-full flex-col items-start justify-start"
                                >
                                    <!-- Penyokong Card -->

                                    <b class="text-sm text-system-primary"
                                        >Keputusan Penyokong</b
                                    >

                                    <CustomTextField
                                        id="supporterResult"
                                        label="Tindakan/Ulasan"
                                        val="Ali bin ABu"
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="supporter-remark"
                                        label="Tindakan/Ulasan"
                                        val=""
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
                                        id="passer-name"
                                        label="Nama"
                                        val="Mohd Safwan Adam"
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="supporter-remark"
                                        label="Tindakan/Ulasan"
                                        val="Layak"
                                    ></CustomTextField>
                                    <div class="flex w-full flex-row text-sm">
                                        <label
                                            for="supporter-result"
                                            class="w-[220px]">Keputusan</label
                                        >
                                    </div>
                                </div>
                            </form>
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    </Stepper>
</section>
