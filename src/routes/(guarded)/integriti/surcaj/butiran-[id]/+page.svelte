<script lang="ts">
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { Checkbox, Modal } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SuperDebug, { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _applicationDetail, _surcajEmployeeResponseSchema } from '$lib/schemas/mypsm/integrity/surcaj-scheme';
    import toast from 'svelte-french-toast';
    import { error } from '@sveltejs/kit';
    import { _applicationDetailSubmit } from './+page';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { Toaster } from 'svelte-french-toast';
    export let data: PageData;

    let isReadonlyActionFormStepper: boolean = true;

    const { form, errors, enhance ,isTainted,
    } = superForm(data.applicationDetail, {
        SPA: true,
        id: 'serviceDetail',
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_applicationDetail),

        async onSubmit() {
            if (!isTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _applicationDetailSubmit($form);
            if (result.response.status === 'success')
            isReadonlyActionFormStepper = true;
        },
        taintedMessage: false,
    });
</script>

<!------------------------------------------------------>
<!---------------Maklumat Kakitangan---------------------->
<!------------------------------------------------------>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <!-- <form
                    id="personalFormStepper"
                    method="POST"
                    use:personalInfoEnhance
                    class="flex w-full flex-col gap-2"
                > -->
            <div
                class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
            >
                <!-- stepperFormTitleClass -->

                <CustomTextField
                    disabled
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .employeeNumber}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .identityCardNumber}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .fullName}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="email"
                    label="Emel Pekerja"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .email}
                ></CustomTextField>
                <CustomSelectField
                    disabled
                    id="icColour"
                    label="Jenis Kad Pengenalan"
                    options={data.selectionOptions.identityCardColorLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .icColour}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .birthDate}
                ></CustomTextField>
                <CustomSelectField
                    disabled
                    id="birthplace"
                    label="Tempat Lahir"
                    options={data.selectionOptions.stateLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .birthplace}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    options={data.selectionOptions.nationalityLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .nationality}
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="race"
                    label="Bangsa"
                    options={data.selectionOptions.raceLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .race}
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="ethnic"
                    label="Etnik"
                    options={data.selectionOptions.ethnicityLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .ethnic}
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="religion"
                    label="Agama"
                    options={data.selectionOptions.religionLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .religion}
                ></CustomSelectField>
                <!--   -->
                <CustomSelectField
                    disabled
                    id="gender"
                    label="Jantina"
                    options={data.selectionOptions.genderLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .gender}
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="marital"
                    label="Status Perkahwinan"
                    options={data.selectionOptions.maritalLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .marital}
                ></CustomSelectField>


                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .mailAddress}
                />
                <!--  -->
               
                <!-- <CustomSelectField
                    disabled
                    id="isExPoliceOrSoldier"
                    label="Bekas Polis / Tentera"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .isExPoliceOrSoldier}
                ></CustomSelectField> -->

                <!-- <p class={stepperFormTitleClass}>
                            Maklumat Pertalian Dengan Kakitangan LKIM
                        </p> -->
                <!--   options={data.selectionOptions
                                .generalLookup} -->
                <!-- <CustomSelectField
                    disabled
                    id="isInternalRelationship"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .isInternalRelationship}
                ></CustomSelectField> -->

                <!-- <CustomSelectField
                             disabled
                            errors={$personalInfoError.identityCardNumber}
                            id="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            bind:val={$personalInfoForm.employeeNumber}
                            options={data.selectionOptions
                                .employeeLookup}
                        ></CustomSelectField> -->

                <!-- <CustomTextField
                    disabled
                    id="employeeNumber"
                    label="ID Kakitangan LKIM"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .employeeNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeeName"
                    label="Nama Kakitangan LKIM"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .employeeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeePosition"
                    label="Jawatan Kakitangan LKIM"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .employeePosition}
                ></CustomTextField> -->
                <!--  -->
                <!-- <CustomSelectField
                    disabled
                    id="relationshipId"
                    label="Hubungan"
                    options={data.selectionOptions.relationshipLookup}
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .relationshipId}
                ></CustomSelectField> -->
            </div>
            <!-- </form> -->
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------>
    <!--------------- Maklumat Perkhidmatan ---------------->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody>
            <CustomSelectField
                disabled
                id="currentGrade"
                label={'Gred Semasa'}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .currentGrade}
            ></CustomSelectField>
            <!--  -->
            <CustomSelectField
                disabled
                id="currentPosition"
                label={'Jawatan'}
                options={data.selectionOptions.positionLookup}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .currentPosition}
            ></CustomSelectField>
            <!-- -->
            <CustomSelectField
                disabled
                id="placement"
                label={'Penempatan'}
                options={data.selectionOptions.placementLookup}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .placement}
            ></CustomSelectField>
            <!--  -->
            <CustomSelectField
                disabled
                id="serviceType"
                label={'Taraf Perkhidmatan'}
                options={data.selectionOptions.serviceTypeLookup}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .serviceType}
            ></CustomSelectField>

            <!-- <RadioButton
                    
                    options={faedahPersaraanOptions}
                    label={'Faedah Persaraan'}
                    bind:userSelected={isFaedahKWSP}
                ></RadioButton>  -->
            <CustomTextField
                disabled
                id="effectiveDate"
                label={'Tarikh Berkuatkuasa'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .effectiveDate}
            ></CustomTextField>
            <!--   -->

            <CustomSelectField
                disabled
                id="retirementBenefit"
                label="Faedah Persaraan"
                options={data.selectionOptions.retirementBenefitLookup}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .retirementBenefit}
            />

            <CustomTextField
                disabled
                id="EPFNumber"
                label={'No. KWSP'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .EPFNumber}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="SOCSO"
                label={'No. SOCSO'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .SOCSO}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="taxIncome"
                label={'No. Cukai (LHDN)'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .taxIncome}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="bankName"
                label={'Bank'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .bankName}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="accountNumber"
                label={'No. Akaun'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .accountNumber}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="program"
                label={'Program'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .program}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="eligibleLeaveCount"
                label={'Kelayakan Cuti'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .eligibleLeaveCount}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="civilServiceStartDate"
                label={'Mula Dilantik Perkhidmatan Kerajaan'}
                type="date"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .civilServiceStartDate}
            ></CustomTextField>

            <!-- <CustomTextField
                disabled
                id="confirmServiceDate"
                label={'Tarikh Disahkan Jawatan'}
                type="date"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="newRecruitEffectiveDate"
                label={'Mula Dilantik Perkhidmatan LKIM'}
                type="date"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="firstServiceDate"
                label={'Mula Dilantik Perkhidmatan Sekarang'}
                type="date"
                val=""
            ></CustomTextField> -->
            <CustomTextField
                disabled
                id="firstEffectiveDate"
                label={'Disahkan Dalam Jawatan Pertama LKIM'}
                type="date"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .firstEffectiveDate}
            ></CustomTextField>
            <!-- <CustomTextField
                       disabled
                        errors={$serviceInfoError.confirmDate}
                        id="confirmDate"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        type="date"
                        bind:val={$serviceInfoForm.confirmDate}
                    ></CustomTextField> -->

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
            <CustomTextField
                disabled
                id="pastAttachmentDate"
                label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                type="date"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .pastAttachmentDate}
            ></CustomTextField>
            <!-- <CustomTextField
                disabled
                id="actingDate"
                label={'Pemangkuan Sekarang'}
                type="text"
                val=""
                placeholder=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="interimDate"
                label={'Tanggung Kerja Sekarang'}
                type="text"
                val=""
            ></CustomTextField> -->
            <CustomTextField
                disabled
                id="pensionScheme"
                label={'Skim Pencen'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .pensionScheme}
            ></CustomTextField>
            <!-- <CustomTextField
                disabled
                id="lastSalaryRaiseDate"
                label={'Kenaikan Gaji Akhir'}
                type="text"
                val=""
            ></CustomTextField>

            <CustomSelectField
                disabled
                id="salaryMovementMonth"
                label={'Bulan KGT'}
                options={[
                    {
                        value: 'undefined',
                        name: 'Tiada Maklumat',
                    },
                    {
                        value: 1,
                        name: 'January',
                    },
                    {
                        value: 4,
                        name: 'April',
                    },
                    {
                        value: 7,
                        name: 'Julai',
                    },
                    {
                        value: 10,
                        name: 'Oktober',
                    },
                ]}
                val=""
            ></CustomSelectField> -->

            <!-- <CustomTextField
                disabled
                id="lastPromotionDate"
                label={'Kenaikan Pangkat Akhir'}
                type="text"
                val=""
            ></CustomTextField> -->

            <CustomTextField
                disabled
                id="retirementDate"
                label={'Tarikh Bersara'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .retirementDate}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="salaryEffectiveDate"
                label={'Tarikh Kuatkuasa Gaji'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .salaryEffectiveDate}
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
                                 bind:val={$serviceInfoForm.gradeId}
                                placeholder=""
                            ></CustomTextField> -->
                    <CustomTextField
                        disabled
                        id="maximumSalary"
                        label={'Tangga Gaji'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .maximumSalary}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="baseSalary"
                        label={'Gaji Pokok'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .baseSalary}
                    ></CustomTextField>
                </div>
                <!-- hasTooltip={true}
                            toolTipID="type-itka" -->
                <div class="space-y-2.5">
                    <CustomTextField
                        disabled
                        id="ITKA"
                        label={'ITKA'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .ITKA}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="ITP"
                        label={'ITP'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .ITP}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="EPW"
                        label={'EPW'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .EPW}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="COLA"
                        label={'COLA'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .COLA}
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
            <!-- </form> -->
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Butiran Surcaj">
        {#if isReadonlyActionFormStepper}
        <TextIconButton
            type="neutral"
            label="Kemaskini"
            onClick={() =>
                (isReadonlyActionFormStepper = false)}
        />
    {:else}
        <TextIconButton
            type="primary"
            label="Simpan"
            onClick={() =>
                (isReadonlyActionFormStepper = false)}
            form="personalFormStepper"
        />
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() =>
                (isReadonlyActionFormStepper = true)}
        />
    {/if}
        
        </StepperContentHeader>
        <StepperContentBody>

            <form
            id="form"
            method="POST"
            use:enhance
            class="flex w-full flex-col gap-2"
        >

            <div class="flex w-full flex-col gap-2.5">
                <CustomTextField
                    type="reportDate"
                    id=""
                    disabled={isReadonlyActionFormStepper}
                    label={'Tarikh Dilaporkan'}
                    bind:val={$form
                        .reportDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyActionFormStepper}
                    id="surchargeAction"
                    label={'Tindakan Surcaj'}
                    bind:val={$form
                        .surchargeAction}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyActionFormStepper}
                    id="remark"
                    label={'Ulasan'}
                    bind:val={$form
                        .remark}
                ></CustomTextField>
            </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Mesyuarat"></StepperContentHeader>
        <StepperContentBody>
            <CustomSelectField
                disabled={true}
                id="meetingType"
                label="Nama dan Bil Mesyuarat"
                bind:val={data.personalInfoForm.meetingDetail
                    .meetingType}
            ></CustomSelectField>
            <CustomSelectField
                disabled={true}
                id="meetingCount"
                label="Bilangan Mesyuarat"
                bind:val={data.personalInfoForm.meetingDetail
                    .meetingCount}
            ></CustomSelectField>
            <CustomTextField
                type="date"
                disabled={true}
                id="meetingDate"
                label="Tarikh Mesyuarat"
                bind:val={data.personalInfoForm.meetingDetail
                    .meetingDate}
            />
            <CustomTextField
                disabled={true}
                id="amount"
                type="number"
                label={'Jumlah Bayaran (RM)'}
                bind:val={data.personalInfoForm.meetingDetail
                    .amount}
            ></CustomTextField>
            <CustomSelectField
                disabled={true}
                id="paymentType"
                label="Cara Bayaran Balik"
                options={[
                    { value: '1', name: 'Potongan Gaji' },
                    { value: '2', name: 'Bayaran Atas Talian' },
                ]}
                bind:val={data.personalInfoForm.meetingDetail
                    .paymentType}
               
            ></CustomSelectField>
            <CustomSelectField
                disabled
                id="duration"
                label="Tempoh Bayaran Balik (bulan)"
                options={[
                    { value: '1', name: '1 Bulan' },
                    { value: '2', name: '2 Bulan' },
                    { value: '3', name: '3 Bulan' },
                    { value: '4', name: '4 Bulan' },
                    { value: '5', name: '5 Bulan' },
                    { value: '6', name: '6 Bulan' },
                ]}
                bind:val={data.personalInfoForm.meetingDetail
                    .duration}
               
            ></CustomSelectField>
            <CustomTextField
                id="effectiveDate"
                label="Tarikh Berkuatkuasa"
                bind:val={data.personalInfoForm.meetingDetail
                    .effectiveDate}
            />
            <CustomTextField
                id="meetingResult"
                label="Keputusan Mesyuarat"
                bind:val={data.personalInfoForm.meetingDetail
                    .meetingResult}
            />
            <CustomTextField id="remark" label="Ulasan" bind:val={data.personalInfoForm.meetingDetail
                    .remark} />
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Pengarah Integriti"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5">
                <div class="mb-5">
                    <b class="text-sm text-system-primary">Pengarah Integriti</b
                    >
                </div>

                <CustomTextField
                    disabled
                    type="text"
                    id="name"
                    label="Nama"
                    bind:val={data.personalInfoForm.confirmation.details
                        .name}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="remark"
                    label="Tindakan/Ulasan"
                    bind:val={data.personalInfoForm.confirmation.details
                        .remark}
                ></CustomTextField>
                <div class="flex w-full flex-row text-sm">
                    <label for="integrity-director-result" class="w-[220px]"
                        >Keputusan</label
                    >
                    <!-- <Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            > -->
                </div>

                <CustomSelectField
                    disabled
                    id="status"
                    label="status"
                    bind:val={data.personalInfoForm.confirmation.details
                        .status}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="statusDescription"
                    label="Ulasan status"
                    bind:val={data.personalInfoForm.confirmation.details
                        .statusDescription}
                ></CustomTextField>
                <div class="text-sm text-system-primary">
                    <i class=""><li>● Menunggu keputusan...</li></i>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />