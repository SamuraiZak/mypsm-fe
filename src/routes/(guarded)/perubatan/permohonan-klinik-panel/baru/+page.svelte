<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import {
        _addClinicApplicationSchema,
        _addClinicContractSchema,
        _clinicCommonResultSchema,
        _clinicSupporterApproverSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submitClinicApplicationForm } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    export let data: PageData;

    let newClinicApplicationId: number = 0;

    const {
        form: clinicApplicationForm,
        errors: clinicApplicationError,
        enhance: clinicApplicationEnhance,
    } = superForm(data.clinicApplicationForm, {
        SPA: true,
        taintedMessage: false,
        id: 'clinicDetailForm',
        validators: zod(_addClinicApplicationSchema),
        resetForm: false,
        async onSubmit() {
            const editMode = await _submitClinicApplicationForm(
                $clinicApplicationForm,
            );

            if (editMode?.response.status == 'success') {
                newClinicApplicationId =
                    editMode.response.data?.details.clinicId;

                goto('/perubatan/permohonan-klinik-panel/butiran/' + newClinicApplicationId)
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Klinik">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => goto('/perubatan/permohonan-klinik-panel')}
        />
        <TextIconButton
            icon="check"
            type="primary"
            label="Daftar"
            form="clinicDetailForm"
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col gap-2.5 border-b pb-2.5">
        <div class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2">
            <form
                class="flex w-full flex-col justify-start gap-2.5 px-5 py-5"
                id="clinicDetailForm"
                method="POST"
                use:clinicApplicationEnhance
            >
                <CustomTextField
                    label="Nama Klinik"
                    id="name"
                    bind:val={$clinicApplicationForm.name}
                    errors={$clinicApplicationError.name}
                />
                <CustomTextField
                    label="Emel Klinik"
                    id="email"
                    bind:val={$clinicApplicationForm.email}
                    errors={$clinicApplicationError.email}
                />
                <CustomTextField
                    label="Alamat"
                    id="address"
                    bind:val={$clinicApplicationForm.address}
                    errors={$clinicApplicationError.address}
                />
                <CustomTextField
                    label="Poskod"
                    id="postcode"
                    bind:val={$clinicApplicationForm.postcode}
                    errors={$clinicApplicationError.postcode}
                />
                <CustomSelectField
                    label="Bandar"
                    id="cityId"
                    options={data.lookup.cityLookup}
                    bind:val={$clinicApplicationForm.cityId}
                    errors={$clinicApplicationError.cityId}
                />
                <CustomSelectField
                    label="Daerah"
                    id="districtId"
                    options={data.lookup.districtLookup}
                    bind:val={$clinicApplicationForm.districtId}
                    errors={$clinicApplicationError.districtId}
                />
                <CustomTextField
                    label="No. Telefon"
                    id="contactNumber"
                    bind:val={$clinicApplicationForm.contactNumber}
                    errors={$clinicApplicationError.contactNumber}
                />
                <CustomTextField
                    label="Nama Bank"
                    id="bankName"
                    bind:val={$clinicApplicationForm.bankName}
                    errors={$clinicApplicationError.bankName}
                />
                <CustomTextField
                    label="No. Akaun Bank"
                    id="bankAccount"
                    bind:val={$clinicApplicationForm.bankAccount}
                    errors={$clinicApplicationError.bankAccount}
                />
                <CustomTextField
                    label="Tarikh Pendaftaran Klinik"
                    id="foundationDate"
                    type="date"
                    bind:val={$clinicApplicationForm.foundationDate}
                    errors={$clinicApplicationError.foundationDate}
                />
                <CustomTextField
                    label="Jenis Klinik"
                    id="clinicType"
                    bind:val={$clinicApplicationForm.clinicType}
                    errors={$clinicApplicationError.clinicType}
                />
                <CustomTextField
                    label="Status Pemilikan"
                    id="ownershipStatus"
                    bind:val={$clinicApplicationForm.ownershipStatus}
                    errors={$clinicApplicationError.ownershipStatus}
                />
                <CustomTextField
                    label="Doktor Berdaftar"
                    id="registeredMedicalPractitioner"
                    bind:val={$clinicApplicationForm.registeredMedicalPractitioner}
                    errors={$clinicApplicationError.registeredMedicalPractitioner}
                />
                <CustomTextField
                    label="Bilangan Cawangan"
                    id="branchCount"
                    bind:val={$clinicApplicationForm.branchCount}
                    errors={$clinicApplicationError.branchCount}
                />
                <CustomTextField
                    label="Jarak Klinik Dari Pejabat"
                    id="clinicOfficeDistance"
                    bind:val={$clinicApplicationForm.clinicOfficeDistance}
                    errors={$clinicApplicationError.clinicOfficeDistance}
                />
                <CustomTextField
                    label="Jarak Klinik Terdekat Dari Pejabat"
                    id="nearestClinicDistance"
                    bind:val={$clinicApplicationForm.nearestClinicDistance}
                    errors={$clinicApplicationError.nearestClinicDistance}
                />
                <CustomTextField
                    label="Jam Operasi"
                    id="operationHours"
                    bind:val={$clinicApplicationForm.operationHours}
                    errors={$clinicApplicationError.operationHours}
                />
            </form>
        </div>
    </div>
</section>
<Toaster />
