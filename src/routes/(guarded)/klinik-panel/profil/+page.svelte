<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { _editClinicProfileSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { _submit } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import XCard from '$lib/components/card/XCard.svelte';

    export let data: PageData;
    let notEditing: boolean = true;

    const { form, errors, enhance } = superForm(data.clinicPanelProfile, {
        SPA: true,
        taintedMessage: false,
        id: 'editClinicPanelProfileForm',
        validators: zod(_editClinicProfileSchema),
        resetForm: false,
        async onSubmit() {
            const editMode = await _submit($form);

            if (editMode?.status == 'success') {
                notEditing = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Profil"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full justify-start gap-3 p-3">
        <XCard
            title="Maklumat Klinik Panel"
            headerColor="bg-ios-labelColors-secondaryLabel-light"
        >
            <CustomTextField
                label="Kod Klinik"
                id="clinicCode"
                disabled
                isRequired={false}
                bind:val={$form.clinicCode}
            />
            <CustomTextField
                label="Nama Klinik"
                id="clinicName"
                disabled
                isRequired={false}
                bind:val={$form.clinicName}
            />
            <CustomTextField
                label="Alamat"
                id="address"
                disabled
                isRequired={false}
                bind:val={$form.address}
            />
            <CustomSelectField
                label="Daerah"
                id="districtId"
                disabled
                isRequired={false}
                options={data.lookup.districtLookup}
                bind:val={$form.districtId}
            />
            <CustomSelectField
                label="Bandar"
                id="cityId"
                disabled
                isRequired={false}
                options={data.lookup.cityLookup}
                bind:val={$form.cityId}
            />
            <CustomTextField
                label="Poskod"
                id="postcode"
                disabled
                isRequired={false}
                bind:val={$form.postcode}
            />
            <CustomTextField
                label="No. Telefon"
                id="contactNumber"
                disabled
                isRequired={false}
                bind:val={$form.contactNumber}
            />
        </XCard>

        <div class="flex w-full flex-col gap-3">
            <XCard
                title="Maklumat Bank"
                headerColor="bg-ios-labelColors-secondaryLabel-light"
            >
                <ContentHeader title="" borderClass="border-none" titlePadding={false}>
                    {#if notEditing}
                        <TextIconButton
                            label="Kemaskini"
                            type="neutral"
                            icon="reset"
                            onClick={() => (notEditing = false)}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            type="neutral"
                            icon="cancel"
                            onClick={() => (notEditing = true)}
                        />
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="editClinicPanelProfileForm"
                        />
                    {/if}
                </ContentHeader>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    method="POST"
                    id="editClinicPanelProfileForm"
                    use:enhance
                >
                    <CustomTextField
                        label="Nama Bank"
                        id="bankName"
                        bind:disabled={notEditing}
                        isRequired={!notEditing}
                        bind:val={$form.bankName}
                        errors={$errors.bankName}
                    />
                    <CustomTextField
                        label="No. Akaun"
                        id="bankAccount"
                        bind:disabled={notEditing}
                        isRequired={!notEditing}
                        bind:val={$form.bankAccount}
                        errors={$errors.bankAccount}
                    />
                </form>
            </XCard>

            <XCard
                title="Maklumat Lantikan"
                headerColor="bg-ios-labelColors-secondaryLabel-light"
            >
                <CustomTextField
                    label="Tarikh Mula Lantikan"
                    id="panelAppointedDate"
                    disabled
                    isRequired={false}
                    bind:val={$form.panelAppointedDate}
                />
                <CustomTextField
                    label="Tarikh Tamat"
                    id="panelContractEndDate"
                    disabled
                    isRequired={false}
                    bind:val={$form.panelContractEndDate}
                />
            </XCard>
        </div>
    </div>
</section>
<Toaster />
