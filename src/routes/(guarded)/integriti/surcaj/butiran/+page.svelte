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

    export let data: PageData;


    
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

                <!-- <CustomTextField
                          disabled={isReadonlyPersonalFormStepper
                            id="employeeNumber"
                            label={'No. Pekerja'}
                            type="text"
                            errors={$personalInfoError.employeeNo}
                            bind:val={editMode ? data.personalDetails.employeeNo : $personalInfoForm.employeeNumber}
                        ></CustomTextField> -->

                <CustomTextField
                    disabled
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    val=""
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    val=""
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    val=""
                ></CustomTextField>
                <!--      -->
                <!-- <CustomSelectField
                    disabled
                    id="titleId"
                    label="Gelaran"
                    options={data.selectionOptions.titleLookup}
                    val=""
                ></CustomSelectField> -->

                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    val=""
                ></CustomTextField>

                <CustomTextField disabled id="email" label="Emel Pekerja" val=""
                ></CustomTextField>
                <!-- options={data.selectionOptions
                                .identityCardColorLookup} -->
                <CustomSelectField
                    disabled
                    id="icColour"
                    label="Jenis Kad Pengenalan"
                    options={data.selectionOptions.identityCardColorLookup}
                    val=""
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    val=""
                ></CustomTextField>
                <!--   -->
                <CustomSelectField
                    disabled
                    id="birthplace"
                    label="Tempat Lahir"
                    options={data.selectionOptions.stateLookup}
                    val=""
                ></CustomSelectField>
                <!--  -->
                <!-- <CustomSelectField
                    disabled
                    id="birthCountryId"
                    label="Tempat Lahir"
                    options={data.selectionOptions.countryLookup}
                    val=""
                ></CustomSelectField> -->
                <!--   -->
                <CustomSelectField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    options={data.selectionOptions.nationalityLookup}
                    val=""
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="race"
                    label="Bangsa"
                    options={data.selectionOptions.raceLookup}
                    val=""
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="ethnic"
                    label="Etnik"
                    options={data.selectionOptions.ethnicityLookup}
                    val=""
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="religion"
                    label="Agama"
                    options={data.selectionOptions.religionLookup}
                    val=""
                ></CustomSelectField>
                <!--   -->
                <CustomSelectField
                    disabled
                    id="gender"
                    label="Jantina"
                    options={data.selectionOptions.genderLookup}
                    val=""
                ></CustomSelectField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="marital"
                    label="Status Perkahwinan"
                    options={data.selectionOptions.maritalLookup}
                    val=""
                ></CustomSelectField>

                <!-- <CustomTextField
                         disabled
                            errors={$personalInfoError.identityCardNumber}
                        id="email"
                        label={'Emel'}
                        type="text"
                        val=""
                    ></CustomTextField> -->

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    val=""
                />
                <!--   -->
                <!-- <CustomSelectField
                    disabled
                    id="homeCountryId"
                    label="Negara Kediaman"
                    options={data.selectionOptions.countryLookup}
                    val=""
                ></CustomSelectField> -->
                <!--   -->
                <!-- <CustomSelectField
                    disabled
                    id="homeStateId"
                    label="Negeri Kediaman"
                    options={data.selectionOptions.stateLookup}
                    val=""
                ></CustomSelectField> -->
                <!--    -->
                <!-- <CustomSelectField
                    disabled
                    id="homeCityId"
                    label="Daerah Kediaman"
                    options={data.selectionOptions.cityLookup}
                    val=""
                ></CustomSelectField> -->

                <!-- <CustomTextField
                    disabled
                    id="homePostcode"
                    label="Poskod Rumah"
                    val=""
                /> -->

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    val=""
                />
                <!--  -->
                <!-- <CustomSelectField
                    disabled
                    id="mailCountryId"
                    label="Negara Surat Menyurat"
                    options={data.selectionOptions.countryLookup}
                    val=""
                ></CustomSelectField> -->
                <!--  -->
                <!-- <CustomSelectField
                    disabled
                    id="mailStateId"
                    label="Negeri Surat Menyurat"
                    options={data.selectionOptions.stateLookup}
                    val=""
                ></CustomSelectField> -->
                <!--  -->
                <!-- <CustomSelectField
                    disabled
                    id="mailCityId"
                    label="Daerah Surat Menyurat"
                    options={data.selectionOptions.cityLookup}
                    val=""
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="mailPostcode"
                    label="Poskod Surat Menyurat"
                    val=""
                /> -->
                <!-- <CustomSelectField
                            disabled
                            errors={$personalInfoError.houseLoanType}
                            id="houseLoanType"
                            label="Jenis Pinjaman Rumah"
                            bind:val={$personalInfoForm.houseLoanType}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled
                            errors={$personalInfoError.houseloan}
                            id="houseloan"
                            label="Pinjaman Rumah"
                            bind:val={$personalInfoForm.houseloan}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled
                            errors={$personalInfoError.assetDeclarationStatusId}
                            id="assetDeclarationStatusId"
                            label="Status Pengikstiharan Harta"
                            bind:val={$personalInfoForm.assetDeclarationStatusId}
                            options={data.selectionOptions
                                .assetDeclarationLookup}
                        ></CustomSelectField>
                        <CustomTextField
                            disabled
                            errors={$personalInfoError.propertyDeclarationDate}
                            id="propertyDeclarationDate"
                            type="date"
                            label="Tarikh Pengikstiharan Harta"
                            bind:val={$personalInfoForm.propertyDeclarationDate}
                        /> -->
                <!--  options={data.selectionOptions
                                .generalLookup} -->
                <CustomSelectField
                    disabled
                    id="isExPoliceOrSoldier"
                    label="Bekas Polis / Tentera"
                    val=""
                ></CustomSelectField>

                <!-- <p class={stepperFormTitleClass}>
                            Maklumat Pertalian Dengan Kakitangan LKIM
                        </p> -->
                <!--   options={data.selectionOptions
                                .generalLookup} -->
                <CustomSelectField
                    disabled
                    id="isInternalRelationship"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    val=""
                ></CustomSelectField>

                <!-- <CustomSelectField
                             disabled
                            errors={$personalInfoError.identityCardNumber}
                            id="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            bind:val={$personalInfoForm.employeeNumber}
                            options={data.selectionOptions
                                .employeeLookup}
                        ></CustomSelectField> -->

                <CustomTextField
                    disabled
                    id="employeeNumber"
                    label="ID Kakitangan LKIM"
                    val=""
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeeName"
                    label="Nama Kakitangan LKIM"
                    val=""
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeePosition"
                    label="Jawatan Kakitangan LKIM"
                    val=""
                ></CustomTextField>
                <!--  -->
                <CustomSelectField
                    disabled
                    id="relationshipId"
                    label="Hubungan"
                    options={data.selectionOptions.relationshipLookup}
                    val=""
                ></CustomSelectField>
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
            <!-- <form
                    id="serviceFormStepper"
                    method="POST"
                    use:serviceInfoEnhance
                    class="flex w-full flex-col gap-2"
                > -->

            <!-- options={data.selectionOptions.gradeLookup} -->
            <CustomSelectField
                disabled
                id="currentGrade"
                label={'Gred Semasa'}
                val=""
            ></CustomSelectField>
            <!--  -->
            <CustomSelectField
                disabled
                id="currentPosition"
                label={'Jawatan'}
                options={data.selectionOptions.positionLookup}
                val=""
            ></CustomSelectField>
            <!-- -->
            <CustomSelectField
                disabled
                id="placement"
                label={'Penempatan'}
                options={data.selectionOptions.placementLookup}
                val=""
            ></CustomSelectField>
            <!--  -->
            <CustomSelectField
                disabled
                id="serviceType"
                label={'Taraf Perkhidmatan'}
                options={data.selectionOptions.serviceTypeLookup}
                val=""
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
                val=""
            ></CustomTextField>
            <!--   -->

            <CustomSelectField
                disabled
                id="retirementBenefit"
                label="Faedah Persaraan"
                options={data.selectionOptions.retirementBenefitLookup}
                val=""
            />

            <CustomTextField
                disabled
                id="EPFNumber"
                label={'No. KWSP'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="SOCSO"
                label={'No. SOCSO'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="taxIncome"
                label={'No. Cukai (LHDN)'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="bankName"
                label={'Bank'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="accountNumber"
                label={'No. Akaun'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="program"
                label={'Program'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="eligibleLeaveCount"
                label={'Kelayakan Cuti'}
                type="text"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="civilServiceStartDate"
                label={'Mula Dilantik Perkhidmatan Kerajaan'}
                type="date"
                val=""
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
                val=""
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
                val=""
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
                val=""
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
                val=""
            ></CustomTextField>

            <CustomTextField
                disabled
                id="salaryEffectiveDate"
                label={'Tarikh Kuatkuasa Gaji'}
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
                                 bind:val={$serviceInfoForm.gradeId}
                                placeholder=""
                            ></CustomTextField> -->
                    <CustomTextField
                        disabled
                        id="maximumSalary"
                        label={'Tangga Gaji'}
                        type="text"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        disabled
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
                        disabled
                        id="ITKA"
                        label={'ITKA'}
                        type="text"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="ITP"
                        label={'ITP'}
                        type="text"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="EPW"
                        label={'EPW'}
                        type="text"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="COLA"
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
            <!-- </form> -->
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Butiran Surcaj"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <CustomTextField
                    type="date"
                    id=""
                    disabled={true}
                    label={'Tarikh Dilaporkan'}
                    val=""
                ></CustomTextField>
                <CustomTextField
                    disabled={true}
                    id="surcharge-action"
                    label={'Tindakan Surcaj'}
                    val=""
                ></CustomTextField>
                <CustomTextField
                    disabled={true}
                    id="remark"
                    label={'Ulasan'}
                    val=""
                ></CustomTextField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Mesyuarat"></StepperContentHeader>
        <StepperContentBody>
            <CustomSelectField
                disabled={true}
                id="meetingType"
                label="Nama dan Bil Mesyuarat"
                val=""
            ></CustomSelectField>
            <CustomTextField
                type="date"
                disabled={true}
                id="meetingDate"
                label="Tarikh Mesyuarat"
                val=""
            />
            <CustomTextField
                disabled={true}
                id="amount"
                type="number"
                label={'Jumlah Bayaran (RM)'}
                val=""
            ></CustomTextField>
            <CustomSelectField
                disabled={true}
                id="paymentType"
                label="Cara Bayaran Balik"
                val=""
                options={[
                    { value: 'paycut', name: 'Potongan Gaji' },
                    { value: 'transfer', name: 'Bayaran Atas Talian' },
                ]}
            ></CustomSelectField>
            <CustomSelectField
                disabled
                id="duration"
                label="Tempoh Bayaran Balik (bulan)"
                val=""
                options={[
                    { value: '1', name: '1 Bulan' },
                    { value: '2', name: '2 Bulan' },
                    { value: '3', name: '3 Bulan' },
                    { value: '4', name: '4 Bulan' },
                    { value: '5', name: '5 Bulan' },
                    { value: '6', name: '6 Bulan' },
                ]}
            ></CustomSelectField>
            <CustomTextField
                id="effectiveDate"
                label="Tarikh Berkuatkuasa"
                val=""
            />
            <CustomTextField
                id="meetingResult"
                label="Keputusan Mesyuarat"
                val=""
            />
            <CustomTextField
                id="remark"
                label="Ulasan"
                val=""
            />
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
                    id="integrity-director-name"
                    label="Nama"
                    val=""
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="integrity-director-remark"
                    label="Tindakan/Ulasan"
                    val=""
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

                <CustomTextField
                    disabled
                    type="text"
                    id="passer-name"
                    label="Nama"
                    val=""
                ></CustomTextField>
                <div class="text-sm text-system-primary">
                    <i class=""><li>● Menunggu keputusan...</li></i>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
