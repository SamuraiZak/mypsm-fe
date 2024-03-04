<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';

    import type { PageData } from './$types';

    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { Modal } from 'flowbite-svelte';

    export let openAcademicInfoModal: boolean = false;
    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';
</script>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="MaklumatPeribadi">
            <Stepper>
                <!------------------------------------------------------>
                <!---------------Maklumat Peribadi---------------------->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader title="Maklumat Peribadi">
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="personalFormStepper"
                        />
                    </StepperContentHeader>
                    <StepperContentBody
                        ><!-- Maklumat Peribadi -->
                        <!-- <form
                            id="personalFormStepper"
                            method="POST"
                            use:enhance
                            class="flex w-full flex-col gap-2"
                        > -->
                        <div
                            class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
                        >
                            <p class={stepperFormTitleClass}>
                                Maklumat Peribadi
                            </p>

                            <CustomTextField
                                disabled
                                id="employeeNumber"
                                label={'No. Pekerja'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="name"
                                label={'Nama Penuh'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                disabled
                                id="fullName"
                                label={'Nama Penuh'}
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                id="alternativeName"
                                label={'Nama Lain'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="statusPekerjaan"
                                label="Emel Pekerja"
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                disabled
                                id="identityDocumentColor"
                                label="Warna Kad Pengenalan"
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                disabled
                                type="date"
                                id="birthDate"
                                label="Tarikh Lahir"
                                val=""
                            ></CustomTextField>
                            <CustomSelectField
                                disabled
                                id="birthStateId"
                                label="Tempat Lahir"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="birthCountryId"
                                label="Tempat Lahir"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="nationalityId"
                                label="Warganegara"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="raceId"
                                label="Bangsa"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="ethnicId"
                                label="Etnik"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="religionId"
                                label="Agama"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="genderId"
                                label="Jantina"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="maritalId"
                                label="Status Perkahwinan"
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                disabled
                                id="email"
                                label={'Emel'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="homeAddress"
                                label="Alamat Rumah"
                                val=""
                            />

                            <CustomSelectField
                                disabled
                                id="homeCountryId"
                                label="Negara Kediaman"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="homeStateId"
                                label="Negeri Kediaman"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="homeCityId"
                                label="Daerah Kediaman"
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                disabled
                                id="homePostcode"
                                label="Poskod Rumah"
                                val=""
                            />

                            <CustomTextField
                                disabled
                                id="mailAddress"
                                label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                                val=""
                            />

                            <CustomSelectField
                                disabled
                                id="mailCountryId"
                                label="Negara Surat Menyurat"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="mailStateId"
                                label="Negeri Surat Menyurat"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="mailCityId"
                                label="Daerah Surat Menyurat"
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                disabled
                                id="mailPostcode"
                                label="Poskod Surat Menyurat"
                                val=""
                            />

                            <CustomSelectField
                                disabled
                                id="assetDeclarationStatusId"
                                label="Status Pengikstiharan Harta"
                                val=""
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                id="propertyDeclarationDate"
                                type="date"
                                label="Tarikh Pengikstiharan Harta"
                                val=""
                            />

                            <CustomSelectField
                                disabled
                                id="isExPoliceOrSoldier"
                                label="Bekas Polis / Tentera"
                                val=""
                            ></CustomSelectField>

                            <p class={stepperFormTitleClass}>
                                Maklumat Pertalian Dengan Kakitangan LKIM
                            </p>

                            <CustomSelectField
                                disabled
                                id="isInternalRelationship"
                                label="Perhubungan Dengan Kakitangan LKIM"
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                disabled
                                id="employeeNumber"
                                label={'No. Pekerja LKIM'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                disabled
                                id="employeeName"
                                label="Jawatan Kakitangan LKIM"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="relationDetailPosition"
                                label="Jawatan Kakitangan LKIM"
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled
                                id="relationDetailRelationship"
                                label="Hubungan"
                                val=""
                            ></CustomSelectField>
                        </div>
                        <!-- </form> -->
                    </StepperContentBody>
                </StepperContent>

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
                        <b class="text-sm text-system-primary"
                            >Maklumat Perkhidmatan</b
                        >
                        <CustomTextField
                            id="gradeId"
                            label={'Gred Semasa'}
                            type="text"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="positionId"
                            label={'Jawatan'}
                            type="text"
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="placementId"
                            label={'Penempatan'}
                            type="text"
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="serviceTypeId"
                            label={'Taraf Perkhidmatan'}
                            type="text"
                            val=""
                        ></CustomTextField>

                        <!-- <RadioButton
                            
                            options={faedahPersaraanOptions}
                            legend={'Faedah Persaraan'}
                            bind:userSelected={isFaedahKWSP}
                        ></RadioButton>  -->

                        <CustomRadioBoolean
                            id="retirementBenefit"
                            label="Faedah Persaraan"
                            val=""
                        />

                        <CustomTextField
                            id="epfNumber"
                            label={'No. KWSP'}
                            type="text"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="socsoNumber"
                            label={'No. SOCSO'}
                            type="text"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="incomeNumber"
                            label={'No. Cukai (LHDN)'}
                            type="text"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="bankName"
                            label={'Bank'}
                            type="text"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="bankAccount"
                            label={'No. Akaun'}
                            type="text"
                            val=""
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
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="civilServiceStartDate"
                            label={'Mula Dilantik Perkhidmatan Kerajaan'}
                            type="date"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="newRecruitEffectiveDate"
                            label={'Mula Dilantik Perkhidmatan LKIM'}
                            type="text"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="firstServiceDate"
                            label={'Mula Dilantik Perkhidmatan Sekarang'}
                            type="date"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="firstConfirmServiceDate"
                            label={'Disahkan Dalam Jawatan Pertama LKIM'}
                            type="date"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="confirmDate"
                            label={'Disahkan Dalam Jawatan Semasa LKIM'}
                            type="date"
                            val=""
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
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="retirementDate"
                            label={'Tarikh Bersara'}
                            type="text"
                            val=""
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
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="baseSalary"
                                    label={'Gaji Pokok'}
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </div>
                            <!-- hasTooltip={true}
                                    toolTipID="type-itka" -->
                            <div class="space-y-2.5">
                                <CustomTextField
                                    id="itka"
                                    label={'ITKA'}
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="itp"
                                    label={'ITP'}
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="epw"
                                    label={'EPW'}
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="cola"
                                    label={'COLA'}
                                    type="text"
                                    val=""
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
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------>
                <!---Maklumat Akademik / Kelayakan / Latihan yang Lalu-->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="FormStepperAkademik"
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                type="primary"
                                label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                                onClick={() => (openAcademicInfoModal = true)}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>

                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada maklumat.
                        </div>

                        
                            <CustomTabContent title={'Akademik #'}>
                                <CustomSelectField
                                    disabled
                                    id="majorId"
                                    label={'Jurusan'}
                                    val=""
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="minorId"
                                    label={'Bidang'}
                                    val=""
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="countryId"
                                    label={'Negara'}
                                    val=""
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="institutionId"
                                    label={'Institusi'}
                                    val=""
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="educationLevelId"
                                    label={'Taraf Pendidikan'}
                                    val=""
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="sponsorshipId"
                                    label={'Penajaan'}
                                    val=""
                                ></CustomSelectField>

                                <CustomTextField
                                    disabled
                                    id="certName"
                                    label={'Nama Sijil/Pencapaian'}
                                    type="text"
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="completionDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    type="date"
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="finalGrade"
                                    label={'Ijazah/ CGPA/ Gred'}
                                    type="text"
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="field"
                                    label={'Catatan'}
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </CustomTabContent>
                       
                    </StepperContentBody>
                </StepperContent>
            </Stepper>
        </CustomTabContent>

        <CustomTabContent title="AgendaSemasa"></CustomTabContent>

        <CustomTabContent title="GajiElaun"></CustomTabContent>
        <CustomTabContent title="RekodKesihatan"></CustomTabContent>
    </CustomTab>
</section>

<!-- <Modal
    title={'Tambah Maklumat Akademik / Kelayakan / Latihan yang Lalu'}
    bind:open={openAcademicInfoModal}
>
    <CustomSelectField id="majorId" label={'Jenis Jurusan'} val=""
    ></CustomSelectField>

    <CustomSelectField id="minorId" label={'Jenis Bidang'} val=""
    ></CustomSelectField>

    <CustomSelectField id="countryId" label={'Negara'} val=""
    ></CustomSelectField>

    <CustomSelectField id="institutionId" label={'Institusi'} val=""
    ></CustomSelectField>

    <CustomSelectField id="educationLevelId" label={'Taraf Pembelajaran'} val=""
    ></CustomSelectField>

    <CustomSelectField id="sponsorshipId" label={'Penajaan'} val=""
    ></CustomSelectField>

    <CustomTextField id="name" label={'Nama Pencapaian/Sijil'} val=""
    ></CustomTextField>
    <CustomTextField
        id="completionDate"
        label="Tarikh Kelulusan"
        type="date"
        val=""
    ></CustomTextField>
    <CustomTextField id="finalGrade" label={'Pencapaian Akhir (Gred)'} val=""
    ></CustomTextField>
    <CustomTextField id="field" label={'Catatan'} val=""></CustomTextField>
    <TextIconButton
        type="primary"
        label={'Simpan'}
        form="addAcademicModalForm"
    />
</Modal> -->
