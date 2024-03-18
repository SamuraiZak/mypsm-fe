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
    import { kgtMonthLookup } from '$lib/constants/core/dropdown.constant';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Gaji Dan Elaun" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="No. Pekerja"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Nama"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="No. Kad Pengenalan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Gred"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Penempatan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Kumpulan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Tarikh Lantikan Gred Semasa"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Status Semasa Kakitangan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Elaun Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="Tangga Gaji (RM)"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Gaji Pokok (RM)"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="ITKA"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="ITP"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="COLA"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomSelectField
                    label="Bulan"
                    id=""
                    disabled
                    options={kgtMonthLookup}
                    val={4}
                    errors={[]}
                />
                <CustomTextField
                    label="Jumlah (RM)"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lain-Lain"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="refer to figma once endpoints are done"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Perubahan Gaji"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="refer to figma once endpoints are done"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
