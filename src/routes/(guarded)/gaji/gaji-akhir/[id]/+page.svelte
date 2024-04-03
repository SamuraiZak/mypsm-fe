<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import type { PageData } from './$types';
    import SalaryAllowanceField from '$lib/components/inputs/salary-allowance-field/SalaryAllowanceField.svelte';
    import { goto } from '$app/navigation';
    import { _finalPayslipSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { _submitAddEmployeePayslip } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let total: number = data.rowData.reduce((acc, curr) => acc + curr.total, 0);
    let deductTotal: number = data.specialDeduction.reduce(
        (acc, curr) => acc + curr.totalDeduct,
        0,
    );
    let totalRates: number = total - deductTotal;
    let submitSuccess: boolean = false;
    const {
        form,
        enhance,
    } = superForm(data.form,{
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: 'finalpayslipForm',
        validators: zod(_finalPayslipSchema),
        async onSubmit() {
           const result = await _submitAddEmployeePayslip($form)

           if(result?.response.status == "success"){
            submitSuccess = true;
           }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Gaji Akhir">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => goto('/gaji/gaji-akhir')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTextField
                        label="Nama Penuh"
                        id="name"
                        disabled
                        val={data.employeePersonalDetail.name}
                    />
                    {#if data.employeePersonalDetail.alternativeName !== ''}
                        <CustomTextField
                            label="Nama Lain"
                            id="alternativeName"
                            disabled
                            val={data.employeePersonalDetail.alternativeName}
                        />
                    {/if}
                    <CustomSelectField
                        label="Gelaran"
                        id="titleId"
                        options={data.lookup.titleLookup}
                        disabled
                        val={data.employeePersonalDetail.titleId}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        disabled
                        val={data.employeePersonalDetail.identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        options={data.lookup.identityCardTypeLookup}
                        disabled
                        val={data.employeePersonalDetail.identityDocumentColor}
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        disabled
                        type="date"
                        val={data.employeePersonalDetail.birthDate}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        options={data.lookup.stateLookup}
                        disabled
                        val={data.employeePersonalDetail.birthStateId}
                    />
                    <CustomSelectField
                        label="Warganegara"
                        id="nationalityId"
                        options={data.lookup.nationalityLookup}
                        disabled
                        val={data.employeePersonalDetail.nationalityId}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        options={data.lookup.raceLookup}
                        disabled
                        val={data.employeePersonalDetail.raceId}
                    />
                    <CustomSelectField
                        label="Etnik"
                        id="ethnicId"
                        options={data.lookup.ethnicLookup}
                        disabled
                        val={data.employeePersonalDetail.ethnicId}
                    />
                    <CustomSelectField
                        label="Agama"
                        id="religionId"
                        options={data.lookup.religionLookup}
                        disabled
                        val={data.employeePersonalDetail.religionId}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        options={data.lookup.genderLookup}
                        disabled
                        val={data.employeePersonalDetail.genderId}
                    />
                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        options={data.lookup.maritalLookup}
                        disabled
                        val={data.employeePersonalDetail.maritalId}
                    />
                    <CustomTextField
                        label="Emel"
                        id="email"
                        disabled
                        val={data.employeePersonalDetail.email}
                    />
                    <CustomTextField
                        label="Alamat Rumah"
                        id="homeAddress"
                        disabled
                        val={data.employeePersonalDetail.homeAddress}
                    />
                    <CustomSelectField
                        label="Negara Alamat Rumah"
                        id="homeCountryId"
                        options={data.lookup.countryLookup}
                        disabled
                        val={data.employeePersonalDetail.homeCountryId}
                    />
                    <CustomSelectField
                        label="Negeri Alamat Rumah"
                        id="homeStateId"
                        options={data.lookup.stateLookup}
                        disabled
                        val={data.employeePersonalDetail.homeStateId}
                    />
                    <CustomSelectField
                        label="Bandar Alamat Rumah"
                        id="homeCityId"
                        options={data.lookup.cityLookup}
                        disabled
                        val={data.employeePersonalDetail.homeCityId}
                    />
                    <CustomTextField
                        label="Poskod Alamat Rumah"
                        id="homePostcode"
                        disabled
                        val={data.employeePersonalDetail.homePostcode}
                    />
                    <CustomTextField
                        label="Alamat Surat Menyurat"
                        id="mailAdress"
                        disabled
                        val={data.employeePersonalDetail.mailAddress}
                    />
                    <CustomSelectField
                        label="Negara Alamat Surat Menyurat"
                        id="mailCountryId"
                        options={data.lookup.countryLookup}
                        disabled
                        val={data.employeePersonalDetail.mailCountryId}
                    />
                    <CustomSelectField
                        label="Negeri Alamat Surat Menyurat"
                        id="mailStateId"
                        options={data.lookup.stateLookup}
                        disabled
                        val={data.employeePersonalDetail.mailStateId}
                    />
                    <CustomSelectField
                        label="Bandar Alamat Surat Menyurat"
                        id="mailCityId"
                        options={data.lookup.cityLookup}
                        disabled
                        val={data.employeePersonalDetail.mailCityId}
                    />
                    <CustomTextField
                        label="Poskod Alamat Surat Menyurat"
                        id="mailPostcode"
                        disabled
                        val={data.employeePersonalDetail.mailPostcode}
                    />
                    <CustomRadioBoolean
                        label="Bekas Polis / Tentera"
                        id="isExPoliceOrSoldier"
                        val={data.employeePersonalDetail.isExPoliceOrSoldier}
                    />
                    <CustomRadioBoolean
                        label="Pertalian dengan Kakitangan LKIM"
                        id="isInternalRelationship"
                        disabled
                        val={data.employeePersonalDetail.isInternalRelationship}
                    />
                    {#if data.employeePersonalDetail.isInternalRelationship}
                        <CustomTextField
                            label="Nama Kakitangan"
                            id="employeeName"
                            disabled
                            val={data.employeePersonalDetail.employeeName}
                        />
                        <CustomTextField
                            label="No. Pekerja Kakitangan"
                            id="employeeNumber"
                            disabled
                            val={data.employeePersonalDetail.employeeNumber}
                        />
                        <CustomTextField
                            label="Jawatan Kakitangan"
                            id="employeePosition"
                            disabled
                            val={data.employeePersonalDetail.employeePosition}
                        />
                        <CustomSelectField
                            label="Hubungan"
                            id="relationshipId"
                            options={data.lookup.relationshipLookup}
                            disabled
                            val={data.employeePersonalDetail.relationshipId}
                        />
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col items-start justify-start gap-2.5 px-2 pb-10"
                >
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                    >
                        <CustomSelectField
                            label="Gred Semasa"
                            id="gradeId"
                            options={data.lookup.gradeLookup}
                            disabled
                            val={data.employeeServiceDetail.gradeId}
                        />
                        <CustomSelectField
                            label="Gred Tertinggi"
                            id="maxGradeId"
                            options={data.lookup.gradeLookup}
                            disabled
                            val={data.employeeServiceDetail.maxGradeId}
                        />
                        <CustomSelectField
                            label="Jawatan"
                            id="positionId"
                            options={data.lookup.positionLookup}
                            disabled
                            val={data.employeeServiceDetail.positionId}
                        />
                        <CustomSelectField
                            label="Penempatan"
                            id="placementId"
                            options={data.lookup.placementLookup}
                            disabled
                            val={data.employeeServiceDetail.placementId}
                        />
                        <CustomSelectField
                            label="Taraf Perkhidmatan"
                            id="serviceTypeId"
                            options={data.lookup.serviceTypeLookup}
                            disabled
                            val={data.employeeServiceDetail.serviceTypeId}
                        />
                        <CustomSelectField
                            label="Kumpulan Perkhidmatan"
                            id="serviceGroupId"
                            options={data.lookup.serviceGroupLookup}
                            disabled
                            val={data.employeeServiceDetail.serviceGroupId}
                        />
                        <CustomSelectField
                            label="Unit"
                            id="unitId"
                            options={data.lookup.unitLookup}
                            disabled
                            val={data.employeeServiceDetail.unitId}
                        />
                        <CustomSelectField
                            label="Status Pekerjaan"
                            id="employmentStatusId"
                            options={data.lookup.employmentStatusLookup}
                            disabled
                            val={data.employeeServiceDetail.employmentStatusId}
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa Dalam Perkhidmatan"
                            id="effectiveDate"
                            type="date"
                            disabled
                            val={data.employeeServiceDetail.effectiveDate}
                        />
                        <CustomRadioBoolean
                            label="Faedah Persaraan"
                            id="retirementBenefit"
                            disabled
                            options={data.lookup.retirementBenefit}
                            val={data.employeeServiceDetail.retirementBenefit}
                        />
                        <CustomTextField
                            label="No. KWSP"
                            id="epfNumber"
                            disabled
                            val={data.employeeServiceDetail.epfNumber}
                        />
                        <CustomTextField
                            label="No. SOCSO"
                            id="socsoNumber"
                            disabled
                            val={data.employeeServiceDetail.socsoNumber}
                        />
                        <CustomTextField
                            label="No. Cukai Pendapatan"
                            id="incomeNumber"
                            disabled
                            val={data.employeeServiceDetail.incomeNumber}
                        />
                        <CustomTextField
                            label="Kelayakan Cuti (Hari)"
                            id="eligibleLeaveCount"
                            type="number"
                            disabled
                            val={data.employeeServiceDetail.eligibleLeaveCount}
                        />

                        <CustomTextField
                            label="Mula Dilantik Perkhidmatan Kerajaan"
                            disabled
                            id="civilServiceStartDate"
                            type="date"
                            val={data.employeeServiceDetail
                                .civilServiceStartDate}
                        />
                        <CustomTextField
                            label="Mula Dilantik Perkhidmatan LKIM"
                            disabled
                            id="newRecruitEffectiveDate"
                            type="date"
                            val={data.employeeServiceDetail
                                .newRecruitEffectiveDate}
                        />
                        <CustomTextField
                            label="Mula Dilantik Perkhidmatan LKIM"
                            disabled
                            id="serviceDate"
                            type="date"
                            val={data.employeeServiceDetail.serviceDate}
                        />
                        <CustomTextField
                            label="Mula Dilantik Perkhidmatan Sekarang"
                            disabled
                            id="firstServiceDate"
                            type="date"
                            val={data.employeeServiceDetail.firstServiceDate}
                        />
                        <CustomTextField
                            label="Disahkan Dalam Jawatan Pertama Kerajaan"
                            disabled
                            id="firstConfirmServiceDate"
                            type="date"
                            val={data.employeeServiceDetail
                                .firstConfirmServiceDate}
                        />
                        <CustomTextField
                            label="Disahkan Dalam Jawatan Pertama LKIM"
                            disabled
                            id="firstEffectiveDate"
                            type="date"
                            val={data.employeeServiceDetail.firstEffectiveDate}
                        />
                        <CustomTextField
                            label="Tarikh Perkhidmatan Pengesahan Semasa"
                            disabled
                            id="confirmDate"
                            type="date"
                            val={data.employeeServiceDetail.confirmDate}
                        />

                        <CustomTextField
                            label="No. Pencen"
                            disabled
                            id="pensionNumber"
                            val={data.employeeServiceDetail.pensionNumber}
                        />
                        <CustomTextField
                            label="Kenaikan Gaji Tahunan (RM)"
                            disabled
                            id="kgt"
                            type="number"
                            val={data.employeeServiceDetail.kgt}
                        />
                        <CustomTextField
                            label="Tarikh Persaraan"
                            disabled
                            id="retirementDate"
                            type="date"
                            val={data.employeeServiceDetail.retirementDate}
                        />
                        <CustomTextField
                            label="Bulan Penilaian"
                            disabled
                            id="revisionMonth"
                            val={data.employeeServiceDetail.revisionMonth}
                        />
                        <CustomTextField
                            label="Gaji Maksimum (RM)"
                            disabled
                            id="maximumSalary"
                            type="number"
                            val={data.employeeServiceDetail.maximumSalary}
                        />
                        <CustomTextField
                            label="Gaji Pokok (RM)"
                            disabled
                            id="baseSalary"
                            type="number"
                            val={data.employeeServiceDetail.baseSalary}
                        />
                        <CustomTextField
                            label="ITKA"
                            disabled
                            id="itka"
                            type="number"
                            val={data.employeeServiceDetail.itka}
                        />
                        <CustomTextField
                            label="ITP"
                            disabled
                            id="itp"
                            type="number"
                            val={data.employeeServiceDetail.itp}
                        />
                        <CustomTextField
                            label="EPW"
                            disabled
                            id="epw"
                            type="number"
                            val={data.employeeServiceDetail.epw}
                        />
                        <CustomTextField
                            label="COLA"
                            disabled
                            id="cola"
                            type="number"
                            val={data.employeeServiceDetail.cola}
                        />
                        <CustomTextField
                            label="Nama Bank"
                            disabled
                            id="bankName"
                            val={data.employeeServiceDetail.bankName}
                        />
                        <CustomTextField
                            label="No. Akaun Bank"
                            disabled
                            id="bankAccount"
                            val={data.employeeServiceDetail.bankAccount}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Potongan">
                {#if !submitSuccess}
                <TextIconButton label="Hantar" icon="check" form="finalpayslipForm" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="finalpayslipForm"
                    use:enhance
                    method="POST"
                >
                    <ContentHeader
                        title="Kemaskini Maklumat Gaji dan Potongan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Nama Kakitangan"
                        id="name"
                        disabled
                        val={data.employeePersonalDetail.name}
                    />
                    <CustomSelectField
                        label="Gred"
                        id="gradeId"
                        options={data.lookup.gradeLookup}
                        disabled
                        val={data.employeeServiceDetail.gradeId}
                    />
                    <CustomSelectField
                        label="Jawatan"
                        id="positionId"
                        options={data.lookup.positionLookup}
                        disabled
                        val={data.employeeServiceDetail.positionId}
                    />
                    <CustomTextField
                        label="Gaji Pokok (RM)"
                        id="baseSalary"
                        disabled
                        type="number"
                        val={data.employeeServiceDetail.baseSalary}
                    />

                    <div class="w-full rounded-md border">
                        <ContentHeader
                            title="Maklumat Gaji dan Kadar Elaun-elaun"
                            borderClass="border-none"
                        />
                        <SalaryAllowanceField rowData={data.rowData} {total} />
                    </div>

                    <div class="w-full rounded-md border">
                        <ContentHeader
                            title="Tolakan Khas"
                            borderClass="border-none"
                        />
                        <SalaryAllowanceField
                            columnLabel={data.specialDeductionHeading}
                            rowData={data.specialDeduction}
                            totalLabel="Jumlah Tolakan (RM)"
                            total={deductTotal}
                        />
                    </div>
                    <div class="flex w-full items-end justify-end">
                        <ContentHeader title="" borderClass="border-none"
                            ><span
                                class="text-md text-ios-labelColors-secondaryLabel-light"
                                >Jumlah Keseluruhan (RM): {totalRates}</span
                            ></ContentHeader
                        >
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Sijil Gaji Akhir Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <DownloadAttachment fileName="Gaji Akhir.pdf" />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster/>
