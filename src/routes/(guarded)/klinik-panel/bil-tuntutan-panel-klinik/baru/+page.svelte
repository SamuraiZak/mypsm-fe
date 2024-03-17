<script lang="ts">
    import { goto } from "$app/navigation";
    import TextIconButton from "$lib/components/button/TextIconButton.svelte";
    import ContentHeader from "$lib/components/headers/ContentHeader.svelte";
    import CustomTextField from "$lib/components/inputs/text-field/CustomTextField.svelte";
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from "$lib/components/stepper/Stepper.svelte";
    import StepperContent from "$lib/components/stepper/StepperContent.svelte";
    import StepperContentBody from "$lib/components/stepper/StepperContentBody.svelte";
    import StepperContentHeader from "$lib/components/stepper/StepperContentHeader.svelte";
    import { monthNumberLookup } from "$lib/constants/core/dropdown.constant";


</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Bil Tuntutan Klinik Panel">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/klinik-panel/bil-tuntutan-panel-klinik')}
        />
    </ContentHeader>
</section>


<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Invois">
                <TextIconButton label="Simpan" icon="check" form=""/>
            </StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                label="Klinik"
                id="clinicName"
                val=""
                />
            <CustomTextField
                label="Tarikh Invois"
                id="invoiceDate"
                val=""
                />
            <CustomTextField
                label="No. Invois"
                id="invoiceNumber"
                val=""
                />
            <CustomSelectField
                label="Bulan Rawatan"
                options={monthNumberLookup}
                id="treatmentMonth"
                val=""
                />
            <CustomTextField
                label="Tahun Rawatan"
                id="treatmentYear"
                val=""
                />
            <CustomTextField
                label="Jumlah"
                id="total"
                val=""
                />
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan Yang Berkaitan">

            </StepperContentHeader>
            <StepperContentBody>

            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>