<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import SalaryField from '$lib/components/inputs/salary-field/SalaryField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { _finalCertSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _generatePayslip, _submitForm } from './+page';
    import type { FinalSalaryCert } from '$lib/dto/mypsm/gaji/gaji-akhir/final-salary-detail.dto';

    export let data: PageData;
    let totalAllowance: number = 0;
    let totalDeduction: number = 0;
    let overallTotal: number = 0;
    let submittedSalaryDetail: boolean = true;
    let hidePayslip: boolean = true;
    $: {
        overallTotal = totalAllowance + totalDeduction;
    }

    let payslip: FinalSalaryCert = {
        id: 0,
        document: '',
    };

    const { form, enhance } = superForm(data.form.form, {
        SPA: true,
        taintedMessage: false,
        id: 'salaryDetailForm',
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_finalCertSchema),
        async onSubmit() {
            $form.employeeId = data.props.currentId.id;
            await _submitForm($form).then(() => {
                if($form.isDraft){
                    submittedSalaryDetail = false;
                } else {
                    submittedSalaryDetail = true;
                }
            });
        },
    });

    if((data.form.employeeSalaryDetail.isDraft == true) || (data.form.employeeSalaryDetail.isDraft == null)){
        submittedSalaryDetail = false;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sijil Gaji Akhir">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => goto('/v2/salary/final-salary-cert')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat  Kakitangan" />
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col">
                        <CustomTextField
                            id="name"
                            label="Nama Penuh"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail.name}
                        />
                        <CustomTextField
                            id="alternativeName"
                            label="Nama Lain"
                            placeholder="Tiada"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail
                                .alternativeName}
                        />
                        <CustomTextField
                            id="email"
                            label="Emel"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail.email}
                        />
                        <CustomTextField
                            id="identityDocumentNumber"
                            label="No. Kad Pengenalan"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail
                                .identityDocumentNumber}
                        />
                        <CustomSelectField
                            id="identityDocumentColor"
                            label="Jenis Kad Pengenalan"
                            isRequired={false}
                            options={data.props.lookup.identityCardTypeLookup}
                            disabled
                            val={data.form.employeePersonalDetail
                                .identityDocumentColor}
                        />
                        <CustomTextField
                            id="birthDate"
                            label="Tarikh Lahir"
                            type="date"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail.birthDate}
                        />
                        <CustomSelectField
                            id="birthCountryId"
                            label="Negara Tempat Lahir"
                            isRequired={false}
                            options={data.props.lookup.countryLookup}
                            disabled
                            val={data.form.employeePersonalDetail
                                .birthCountryId}
                        />
                        <CustomSelectField
                            id="nationalityId"
                            label="Kewarganegaraan"
                            isRequired={false}
                            options={data.props.lookup.nationalityLookup}
                            disabled
                            val={data.form.employeePersonalDetail.nationalityId}
                        />
                        <CustomSelectField
                            id="raceId"
                            label="Bangsa"
                            isRequired={false}
                            options={data.props.lookup.raceLookup}
                            disabled
                            val={data.form.employeePersonalDetail.raceId}
                        />
                        <CustomSelectField
                            id="religionId"
                            label="Agama"
                            isRequired={false}
                            options={data.props.lookup.religionLookup}
                            disabled
                            val={data.form.employeePersonalDetail.religionId}
                        />
                        <CustomSelectField
                            id="genderId"
                            label="Jantina"
                            isRequired={false}
                            options={data.props.lookup.genderLookup}
                            disabled
                            val={data.form.employeePersonalDetail.genderId}
                        />
                        <CustomTextField
                            id="propertyDeclarationDate"
                            label="Tarikh Pengisytiharan Harta"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail
                                .propertyDeclarationDate}
                        />
                        <CustomSelectField
                            id="assetDeclarationStatusId"
                            label="Status Pengisytiharan Harta"
                            isRequired={false}
                            options={data.props.lookup.assetDeclarationLookup}
                            disabled
                            val={data.form.employeePersonalDetail
                                .assetDeclarationStatusId}
                        />
                        <CustomTextField
                            id="homeAddress"
                            label="Alamat Rumah"
                            isRequired={false}
                            type="textarea"
                            disabled
                            val={data.form.employeePersonalDetail.homeAddress}
                        />
                        <CustomRadioBoolean
                            id="isExPoliceOrSoldier"
                            isRequired={false}
                            label="Bekas Polis/Tentera"
                            val={data.form.employeePersonalDetail
                                .isExPoliceOrSoldier}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat  Perkhidmatan" />
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col">
                        <CustomSelectField
                            id="gradeId"
                            label="Gred dan Jawatan"
                            isRequired={false}
                            options={data.props.lookup.gradeLookup}
                            disabled
                            val={data.form.employeeServiceDetail.gradeId}
                        />
                        <CustomSelectField
                            id="placementId"
                            label="Penempatan"
                            isRequired={false}
                            disabled
                            options={data.props.lookup.placementLookup}
                            val={data.form.employeeServiceDetail.placementId}
                        />
                        <CustomSelectField
                            id="serviceTypeId"
                            label="Jenis Perkhidmatan"
                            isRequired={false}
                            options={data.props.lookup.serviceTypeLookup}
                            disabled
                            val={data.form.employeeServiceDetail.serviceTypeId}
                        />
                        <CustomSelectField
                            id="serviceGroupId"
                            label="Kumpulan Perkhidmatan"
                            isRequired={false}
                            options={data.props.lookup.serviceGroupLookup}
                            disabled
                            val={data.form.employeeServiceDetail.serviceGroupId}
                        />
                        <CustomSelectField
                            id="name"
                            label="Unit Perkhidmatan"
                            isRequired={false}
                            options={data.props.lookup.serviceUnitLookup}
                            disabled
                            val={data.form.employeeServiceDetail.unitId}
                        />
                        <!-- <CustomTextField
                            id="name"
                            label="Faedah Persaraan"
                            isRequired={false}
                            disabled
                            val="-"
                        /> -->
                        <CustomTextField
                            id="epfNumber"
                            label="No. KWSP"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.epfNumber}
                        />
                        <CustomTextField
                            id="socsoNumber"
                            label="No. SOCSO"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.socsoNumber}
                        />
                        <CustomTextField
                            id="incomeNumber"
                            label="No. Cukai"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.incomeNumber}
                        />
                        <CustomTextField
                            id="bankAccount"
                            label="No. Akaun Bank"
                            placeholder="-"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.bankAccount}
                        />
                        <CustomTextField
                            id="bankName"
                            label="Nama Bank"
                            placeholder="-"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.bankName}
                        />
                        <!-- <CustomTextField
                            id="name"
                            label="Kelayakan Cuti (Hari)"
                            isRequired={false}
                            disabled
                            val="-"
                        /> -->
                        <CustomTextField
                            id="name"
                            label="Tarikh Kuatkuasa Lantikan Semasa"
                            isRequired={false}
                            disabled
                            type="date"
                            val={data.form.employeeServiceDetail.effectiveDate}
                        />
                        <CustomTextField
                            id="civilServiceStartDate"
                            label="Mula Dilantik Perkhidmatan Kerajaan"
                            type="date"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail
                                .civilServiceStartDate}
                        />
                        <CustomTextField
                            id="name"
                            label="Mula Dilantik Perkhidmatan LKIM"
                            type="date"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail
                                .firstServiceDate}
                        />
                        <CustomTextField
                            id="name"
                            label="Mula Dilantik Perkhidmatan Sekarang"
                            type="date"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.serviceDate}
                        />
                        <CustomTextField
                            id="name"
                            label="Disahkan Dalam Jawatan Pertama LKIM"
                            type="date"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail
                                .firstConfirmServiceDate}
                        />
                        <!-- <CustomTextField
                            id="name"
                            label="Pemangkuan Sekarang"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Tanggung Kerja Sekarang"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Masuk Skim Pencen"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Kenaikan Gaji Akhir"
                            isRequired={false}
                            disabled
                            val="-"
                        /> -->
                        <CustomTextField
                            id="pensionNumber"
                            label="No. Pencen"
                            isRequired={false}
                            disabled
                            val={data.form.employeeServiceDetail.pensionNumber}
                        />
                        <CustomTextField
                            id="name"
                            label="Tarikh Bersara"
                            isRequired={false}
                            disabled
                            type="date"
                            val={data.form.employeeServiceDetail.retirementDate}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Potongan">
                {#if !submittedSalaryDetail}
                <TextIconButton
                    label="Draf"
                    type="draft"
                    icon="save"
                    form="salaryDetailForm"
                    onClick={() => ($form.isDraft = true)}
                />
                <TextIconButton
                    label="Hantar"
                    icon="check"
                    form="salaryDetailForm"
                    onClick={() => ($form.isDraft = false)}
                />
                {/if}
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full border-b">
                    <div class="flex w-1/2 flex-col">
                        <CustomTextField
                            id="name"
                            label="Nama Kakitangan"
                            isRequired={false}
                            disabled
                            val={data.form.employeeSalaryDetail.name}
                        />
                        <CustomTextField
                            id="identityDocumentNumber"
                            label="No. Kad Pengenalan"
                            isRequired={false}
                            disabled
                            val={data.form.employeePersonalDetail
                                .identityDocumentNumber}
                        />
                        <CustomTextField
                            id="grade"
                            label="Gred"
                            isRequired={false}
                            disabled
                            val={data.form.employeeSalaryDetail.grade}
                        />
                        <!-- <CustomSelectField
                            id="serviceTypeId"
                            label="Lantikan"
                            isRequired={false}
                            options={data.props.lookup.serviceTypeLookup}
                            disabled
                            val={data.form.employeeServiceDetail.serviceTypeId}
                        /> -->
                        <CustomTextField
                            id="annualSalary"
                            label="Gaji atau Pencen Setahun (RM)"
                            isRequired={false}
                            disabled
                            val={data.form.employeeSalaryDetail.annualSalary?.toFixed(
                                2,
                            )}
                        />
                        <CustomTextField
                            id="untilDate"
                            label="Tarikh Sehingga dan Termasuk Dimana Bayaran Telah Dibuat"
                            isRequired={false}
                            disabled
                            val={data.form.employeeSalaryDetail.untilDate}
                        />
                    </div>
                </div>
                <form
                    class="flex w-full flex-col items-end gap-5"
                    id="salaryDetailForm"
                    method="POST"
                    use:enhance
                >
                    <SalaryField
                        title="Kadar Elaun-Elaun"
                        disabled={submittedSalaryDetail}
                        bind:rowData={$form.allowance}
                        bind:total={totalAllowance}
                    />
                    <SalaryField
                        title="Tolakan Khas"
                        disabled={submittedSalaryDetail}
                        footer="Jumlah Tolakan"
                        bind:rowData={$form.deduction}
                        bind:total={totalDeduction}
                    />
                    <div
                        class="hidden w-2/6 rounded-md border p-2 text-base font-medium text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Jumlah Keseluruhan (RM): {overallTotal.toFixed(
                                2,
                            )}</span
                        >
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Cetak Sijil Gaji Akhir Kakitangan" />
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col gap-5">
                        {#if !hidePayslip}
                            <div class="w-full">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Arahan:
                                        </span>
                                        Klik di ruangan yang disediakan untuk muat
                                        naik Sijil Gaji Akhir kakitangan.
                                    </p>
                                </Alert>
                            </div>
                            <a
                                href={payslip.document}
                                target="_blank"
                                download={'Sijil Gaji Akhir - ' +
                                    data.form.employeeSalaryDetail.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >Sijil Gaji Akhir - {data.form
                                    .employeeSalaryDetail.name}</a
                            >
                        {:else if !submittedSalaryDetail}
                        <div class="w-full">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Maklumat:
                                    </span>
                                    Menunggu maklumat gaji dan potongan kakitangan dikemaskini.
                                </p>
                            </Alert>
                        </div>     
                        {:else}
                            <div class="w-full">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Arahan:
                                        </span>
                                        Klik pada butang yang disediakan untuk menjana
                                        Sijil Gaji Akhir Kakitangan.
                                    </p>
                                </Alert>
                            </div>
                            <TextIconButton
                                label="Jana"
                                icon="print"
                                onClick={async () => {
                                    await _generatePayslip(data.props.currentId)
                                        .then((res) => {
                                            if (
                                                res.response.status == 'success'
                                            ) {
                                                payslip =
                                                    res.response.data?.details;
                                                    hidePayslip = false
                                            }
                                        })
                                }}
                            />
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
