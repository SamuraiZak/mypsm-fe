<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import type { PageData } from './$types';
    import { monthNumberLookup } from '$lib/constants/core/dropdown.constant';

    export let data: PageData;
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
            <StepperContentHeader
                title="Maklumat Invois"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="Klinik"
                    disabled
                    id="clinicName"
                    bind:val={data.claimDetail.clinicName}
                />
                <CustomTextField
                    label="Tarikh Invois"
                    disabled
                    id="invoiceDate"
                    bind:val={data.claimDetail.invoiceDate}
                />
                <CustomTextField
                    label="No. Invois"
                    disabled
                    id="invoiceNumber"
                    bind:val={data.claimDetail.invoiceNumber}
                />
                <CustomSelectField
                    label="Bulan Rawatan"
                    disabled
                    options={monthNumberLookup}
                    id="treatmentMonth"
                    bind:val={data.claimDetail.treatmentMonth}
                />
                <CustomTextField
                    label="Tahun Rawatan"
                    disabled
                    id="treatmentYear"
                    bind:val={data.claimDetail.treatmentYear}
                />
                <CustomTextField
                    label="Jumlah"
                    disabled
                    id="total"
                    bind:val={data.claimDetail.total}
                />
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Dokumen Sokongan Yang Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody></StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
