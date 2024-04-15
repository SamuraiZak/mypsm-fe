<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { monthNumberLookup } from '$lib/constants/core/dropdown.constant';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import { _clinicClaimDetailSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _fileToBase64Object, _submitClaimDetailForm } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;
    let successSubmit: boolean = false;
    let files: FileList;

    const {
        form: claimDetailForm,
        errors: claimDetailError,
        enhance: claimDetailEnhance,
    } = superForm(data.claimDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'claimDetailForm',
        validators: zod(_clinicClaimDetailSchema),
        resetForm: false,
        onSubmit() {
            _fileToBase64Object(files)
                .then((result) => {
                    $claimDetailForm.documents = result;
                })
                .finally(async () => {
                    const editMode = await _submitClaimDetailForm($claimDetailForm);
                    if (editMode?.response.status == 'success') {
                        successSubmit = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Bil Tuntutan Klinik Panel">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/klinik-panel/bil-tuntutan-klinik')}
        />
        {#if !successSubmit}
            <TextIconButton
                label="Simpan"
                icon="check"
                form="claimDetailForm"
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 px-3 pb-10 pt-3">
        <div class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2">
            <ContentHeader title="Maklumat Invois" borderClass="border-none" />

            <form
                class="flex w-full flex-col justify-start gap-2.5"
                method="POST"
                id="claimDetailForm"
                use:claimDetailEnhance
            >
                <CustomTextField
                    label="Nama Klinik"
                    id="clinicName"
                    disabled
                    bind:val={data.profile.clinicName}
                />
                <CustomTextField
                    label="Tarikh Invois"
                    id="invoiceDate"
                    disabled={successSubmit}
                    type="date"
                    bind:val={$claimDetailForm.invoiceDate}
                    errors={$claimDetailError.invoiceDate}
                />
                <CustomTextField
                    label="No. Invois"
                    id="invoiceNumber"
                    disabled={successSubmit}
                    bind:val={$claimDetailForm.invoiceNumber}
                    errors={$claimDetailError.invoiceNumber}
                />
                <CustomSelectField
                    label="Bulan Rawatan"
                    options={monthNumberLookup}
                    id="treatmentMonth"
                    disabled={successSubmit}
                    bind:val={$claimDetailForm.treatmentMonth}
                    errors={$claimDetailError.treatmentMonth}
                />
                <CustomTextField
                    label="Tahun Rawatan"
                    id="treatmentYear"
                    disabled={successSubmit}
                    type="number"
                    bind:val={$claimDetailForm.treatmentYear}
                    errors={$claimDetailError.treatmentYear}
                />
                <CustomTextField
                    label="Jumlah (RM)"
                    id="total"
                    disabled={successSubmit}
                    type="number"
                    bind:val={$claimDetailForm.total}
                    errors={$claimDetailError.total}
                />
            </form>
            <ContentHeader
                title="Dokumen Sokongan Yang Berkaitan"
                borderClass="border-none"
            />
            <div class="flex h-fit w-full flex-col justify-center gap-2">
                <input
                    class="rounded-md bg-ios-systemColors-systemFill-light"
                    accept=".pdf"
                    type="file"
                    multiple
                    bind:files
                />
            </div>
        </div>
    </div>
</section>
<Toaster />
